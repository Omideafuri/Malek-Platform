import {
  ComprehensiveMarketRates,
  DEFAULT_BENCHMARK_RATES,
  MarketItemRate,
} from '@/lib/financial/market-rates';

interface CacheEntry {
  data: ComprehensiveMarketRates;
  timestamp: number;
}

// In-memory server-side cache (20-second TTL)
let memoryCache: CacheEntry | null = null;
const CACHE_TTL_MS = 20 * 1000;

function parseNumeric(val: unknown, fallback: number): number {
  if (typeof val === 'number' && !isNaN(val)) return val;
  if (typeof val === 'string') {
    const cleaned = val.replace(/,/g, '').trim();
    const num = parseFloat(cleaned);
    return isNaN(num) ? fallback : num;
  }
  return fallback;
}

function normalizeItem(
  raw: Record<string, unknown> | null,
  key: string,
  titleFa: string,
  titleEn: string,
  symbol: string,
  unit: string,
  fallbackRate: MarketItemRate
): MarketItemRate {
  if (!raw) return fallbackRate;

  // Extract price, change, percent from AlanChand format
  const rawPrice = parseNumeric(
    raw.p ?? raw.price ?? raw.value ?? raw.rate ?? raw.last,
    fallbackRate.priceRial
  );
  const rawChange = parseNumeric(
    raw.c ?? raw.change ?? raw.diff,
    fallbackRate.changeToman * 10
  );
  const changePercent = parseNumeric(
    raw.cp ?? raw.change_percent ?? raw.changePercent ?? raw.percent ?? raw.p_change,
    fallbackRate.changePercent
  );

  let priceRial = Math.round(rawPrice);
  let priceToman = Math.floor(priceRial / 10);
  let changeToman = Math.round(rawChange / 10);

  // If AlanChand returned in Toman instead of Rial (e.g. for gold ounce or USD or localized Toman endpoints)
  if (key === 'goldOunce') {
    // For gold ounce, keep USD number
    priceToman = Math.round(rawPrice);
    priceRial = Math.round(rawPrice * 10);
    changeToman = Math.round(rawChange);
  } else if (rawPrice < 100_000_000 && rawPrice > 1_000_000 && key.startsWith('gold')) {
    // In case endpoint provides Toman directly:
    priceToman = Math.round(rawPrice);
    priceRial = Math.round(rawPrice * 10);
    changeToman = Math.round(rawChange);
  }

  return {
    key,
    titleFa,
    titleEn,
    symbol,
    priceToman,
    priceRial,
    changeToman,
    changePercent: Math.round(changePercent * 100) / 100,
    unit,
    isAvailable: true,
  };
}

export async function fetchAlanChandMarketRates(): Promise<ComprehensiveMarketRates> {
  const now = Date.now();

  // Return fresh cached data if within 20s TTL
  if (memoryCache && now - memoryCache.timestamp < CACHE_TTL_MS) {
    return memoryCache.data;
  }

  const token = process.env.ALANCHAND_API_TOKEN || process.env.GOLD_PRICE_API_KEY;
  const baseUrl = process.env.ALANCHAND_API_URL || 'https://api.alanchand.com';
  
  // Format query according to AlanChand official API: ?type=gold&symbols=...
  const apiUrl = baseUrl.includes('?') 
    ? baseUrl 
    : `${baseUrl}?type=gold&symbols=geram18,geram24,mesghal,sekee,bahar,nim,rob,ons`;

  if (!token) {
    // Retain last successful price if available
    if (memoryCache) {
      return { ...memoryCache.data, isStale: true };
    }
    const fallback: ComprehensiveMarketRates = {
      ...DEFAULT_BENCHMARK_RATES,
      lastUpdated: new Date().toISOString(),
      source: 'AlanChand (بایگانی محلی)',
      isStale: false,
    };
    memoryCache = { data: fallback, timestamp: now };
    return fallback;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 7000);

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'User-Agent': 'MalekTalaa-Platform/1.0',
      },
      signal: controller.signal,
      next: { revalidate: 20 },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.warn(`AlanChand API returned status ${response.status}: ${response.statusText}`);
      if (memoryCache) {
        return { ...memoryCache.data, isStale: true };
      }
      return { ...DEFAULT_BENCHMARK_RATES, isStale: true, source: 'AlanChand (بایگانی)' };
    }

    const payload = await response.json();
    const items = payload?.data || payload?.rates || payload?.items || payload || {};

    // Match symbol / slug across AlanChand conventions
    const findItem = (possibleKeys: string[]) => {
      if (Array.isArray(items)) {
        return items.find((it: Record<string, unknown>) =>
          possibleKeys.some((k) =>
            it?.slug === k ||
            it?.symbol === k ||
            it?.key === k ||
            it?.name === k ||
            it?.id === k
          )
        );
      }
      for (const k of possibleKeys) {
        if (items[k]) return items[k];
      }
      return null;
    };

    const g18 = findItem(['geram18', 'gold_18k', '18k', 'geram_18', 'gold18']);
    const g24 = findItem(['geram24', 'gold_24k', '24k', 'geram_24', 'gold24']);
    const mesghal = findItem(['mesghal', 'gold_mesghal', 'mithqal']);
    const emami = findItem(['sekee', 'sekke_emami', 'emami', 'coin_emami', 'seke_emami']);
    const bahar = findItem(['bahar', 'sekke_bahar', 'azadi', 'coin_bahar', 'seke_bahar']);
    const nim = findItem(['nim', 'sekke_nim', 'half_coin', 'coin_half', 'seke_nim']);
    const rob = findItem(['rob', 'sekke_rob', 'quarter_coin', 'coin_quarter', 'seke_rob']);
    const ons = findItem(['ons', 'ounce', 'xau', 'gold_ounce', 'xau_usd']);

    // Extract exact timestamp from AlanChand payload
    const apiTimestamp = payload?.updated_at || payload?.timestamp || payload?.last_update || payload?.time || new Date().toISOString();

    const comprehensive: ComprehensiveMarketRates = {
      gold18k: normalizeItem(g18, 'gold18k', 'طلای ۱۸ عیار', '18K Gold (750)', 'GOLD-18K', 'گرم', DEFAULT_BENCHMARK_RATES.gold18k),
      gold24k: normalizeItem(g24, 'gold24k', 'طلای ۲۴ عیار (شمش)', '24K Gold (999)', 'GOLD-24K', 'گرم', DEFAULT_BENCHMARK_RATES.gold24k),
      mesghal: normalizeItem(mesghal, 'mesghal', 'مثقال طلا (۱۷ عیار)', 'Mesghal Gold', 'MESGHAL', 'مثقال', DEFAULT_BENCHMARK_RATES.mesghal),
      coinEmami: normalizeItem(emami, 'coinEmami', 'سکه تمام طرح جدید (امامی)', 'Imami Gold Coin', 'COIN-EMAMI', 'عدد', DEFAULT_BENCHMARK_RATES.coinEmami),
      coinBahar: normalizeItem(bahar, 'coinBahar', 'سکه تمام طرح قدیم (بهار آزادی)', 'Bahar Azadi Coin', 'COIN-BAHAR', 'عدد', DEFAULT_BENCHMARK_RATES.coinBahar),
      coinHalf: normalizeItem(nim, 'coinHalf', 'نیم سکه بهار آزادی', 'Half Gold Coin', 'COIN-HALF', 'عدد', DEFAULT_BENCHMARK_RATES.coinHalf),
      coinQuarter: normalizeItem(rob, 'coinQuarter', 'ربع سکه بهار آزادی', 'Quarter Gold Coin', 'COIN-QUARTER', 'عدد', DEFAULT_BENCHMARK_RATES.coinQuarter),
      goldOunce: normalizeItem(ons, 'goldOunce', 'انس جهانی طلا', 'Gold Ounce (USD)', 'XAU-USD', 'دلار / اونس', DEFAULT_BENCHMARK_RATES.goldOunce),
      lastUpdated: typeof apiTimestamp === 'string' ? apiTimestamp : new Date(apiTimestamp).toISOString(),
      isStale: false,
      source: 'AlanChand',
    };

    memoryCache = { data: comprehensive, timestamp: now };
    return comprehensive;
  } catch (error) {
    console.error('Error fetching AlanChand real-time rates:', error);
    if (memoryCache) {
      return { ...memoryCache.data, isStale: true };
    }
    return {
      ...DEFAULT_BENCHMARK_RATES,
      isStale: true,
      source: 'AlanChand (بایگانی)',
      lastUpdated: new Date().toISOString(),
    };
  }
}
