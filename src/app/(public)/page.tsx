import Link from 'next/link';
import { ArrowLeft, ShieldCheck, RefreshCw, Sparkles, Scale, Lock, Award, ChevronLeft } from 'lucide-react';
import { fetchAlanChandMarketRates } from '@/lib/providers';
import { formatToman } from '@/lib/utils/format';

export const dynamic = 'force-dynamic';

interface PriceItem {
  title: string;
  buy: string;
  sell: string;
}

export default async function HomePage() {
  let displayPrices: PriceItem[] = [
    { title: 'طلای ۱۸ عیار (هر گرم)', buy: '۴,۸۵۰,۰۰۰', sell: '۴,۹۲۰,۰۰۰' },
    { title: 'طلای ۲۴ عیار (شمش استاندارد)', buy: '۶,۴۶۰,۰۰۰', sell: '۶,۵۵۰,۰۰۰' },
    { title: 'سکه تمام طرح جدید (امامی)', buy: '۵۴,۸۰۰,۰۰۰', sell: '۵۵,۵۰۰,۰۰۰' },
    { title: 'سکه بهار آزادی (طرح قدیم)', buy: '۵۰,۲۰۰,۰۰۰', sell: '۵۰,۹۰۰,۰۰۰' },
    { title: 'نیم سکه بهار آزادی', buy: '۲۸,۴۰۰,۰۰۰', sell: '۲۸,۹۰۰,۰۰۰' },
    { title: 'ربع سکه بهار آزادی', buy: '۱۸,۱۰۰,۰۰۰', sell: '۱۸,۵۰۰,۰۰۰' },
  ];

  try {
    const marketRates = await fetchAlanChandMarketRates();
    if (marketRates && marketRates.gold18k) {
      displayPrices = [
        {
          title: 'طلای ۱۸ عیار (هر گرم)',
          buy: formatToman(Math.floor(marketRates.gold18k.priceToman * 0.985)),
          sell: formatToman(marketRates.gold18k.priceToman),
        },
        {
          title: 'طلای ۲۴ عیار (شمش استاندارد)',
          buy: formatToman(Math.floor(marketRates.gold24k.priceToman * 0.985)),
          sell: formatToman(marketRates.gold24k.priceToman),
        },
        {
          title: 'سکه تمام طرح جدید (امامی)',
          buy: formatToman(Math.floor(marketRates.coinEmami.priceToman * 0.99)),
          sell: formatToman(marketRates.coinEmami.priceToman),
        },
        {
          title: 'سکه بهار آزادی (طرح قدیم)',
          buy: formatToman(Math.floor(marketRates.coinBahar.priceToman * 0.99)),
          sell: formatToman(marketRates.coinBahar.priceToman),
        },
        {
          title: 'نیم سکه بهار آزادی',
          buy: formatToman(Math.floor(marketRates.coinHalf.priceToman * 0.99)),
          sell: formatToman(marketRates.coinHalf.priceToman),
        },
        {
          title: 'ربع سکه بهار آزادی',
          buy: formatToman(Math.floor(marketRates.coinQuarter.priceToman * 0.99)),
          sell: formatToman(marketRates.coinQuarter.priceToman),
        },
      ];
    }
  } catch {
    // Graceful fallback to default live prices
  }

  return (
    <div className="bg-[#06140D] text-[#FAF8F5] selection:bg-[#C9A857] selection:text-[#06140D] min-h-screen">
      
      {/* ─────────────────────────────────────────────────────────────
          STAGE 1: THE MONUMENTAL HERO & ATELIER IDENTITY
      ───────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden pt-36 sm:pt-40 md:pt-44 pb-20">
        {/* Atmosphere Background Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(19, 56, 39,0.55),rgba(6,20,13,0.95)_75%)] pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#C9A857]/10 blur-[130px] rounded-full pointer-events-none" />
        
        {/* Structural Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.03] overflow-hidden">
          <span className="text-[28vw] font-black tracking-[0.2em] uppercase text-[#E3CCAE] leading-none">
            MALEK
          </span>
        </div>

        <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 md:px-10 z-10 text-center w-full">
          
          {/* Subtitle Badge */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-[#133827]/80 border border-white/15 text-xs sm:text-sm text-[#E3CCAE] font-medium tracking-wide mb-8 shadow-subtle backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#C9A857] animate-pulse" />
            <span>گالری طلا و جواهر ملک • مرجع تخصصی معاملات مسکوکات و شمش فاخر</span>
          </div>

          {/* Main Editorial Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-8 sm:mb-10 leading-[1.2] sm:leading-[1.18] md:leading-[1.15] max-w-5xl mx-auto">
            اصالت زرین، <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-[#E3CCAE] via-[#C9A857] to-[#E3CCAE] bg-clip-text text-transparent inline-block mt-2">
              شکوه ماندگار گالری ملک
            </span>
          </h1>

          {/* Refined Narrative Description with balanced padding */}
          <p className="mx-auto max-w-2xl px-4 text-base sm:text-lg md:text-xl text-[#C5BFB4] font-light leading-relaxed sm:leading-loose mb-12 sm:mb-14">
            معاملات هوشمند و لحظه‌ای شمش‌های استاندارد ۲۴ عیار، مسکوکات بانکی و گالری جواهرات فاخر با پشتوانه ۱۰۰٪ فیزیکی، تحویل بیمه‌شده و شفافیت قیمت.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-6">
            <Link
              href="/store"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#C9A857] text-[#06140D] font-bold text-sm hover:bg-[#E3CCAE] transition-all duration-300 shadow-gold-glow flex items-center justify-center gap-2.5"
            >
              <span>مشاهده ویترین محصولات</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <Link
              href="/prices"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#133827] text-white border border-white/20 font-medium text-sm hover:bg-[#133827]/80 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4 text-[#C9A857]" />
              <span>تابلوی زنده نرخ‌ها</span>
            </Link>
          </div>

          {/* Metric Highlights Strip */}
          <div className="mt-16 sm:mt-20 pt-10 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="flex flex-col items-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#E3CCAE] font-mono">100%</span>
              <span className="text-xs sm:text-sm text-[#C5BFB4] mt-1 font-light">پشتوانه فیزیکی شمش</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#E3CCAE] font-mono">24/7</span>
              <span className="text-xs sm:text-sm text-[#C5BFB4] mt-1 font-light">تسویه آنی شتابی</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#E3CCAE] font-mono">T+0</span>
              <span className="text-xs sm:text-sm text-[#C5BFB4] mt-1 font-light">تحویل سریع با بیمه نامه</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#E3CCAE] font-mono">Au 995+</span>
              <span className="text-xs sm:text-sm text-[#C5BFB4] mt-1 font-light">عیارسنجی رسمی اتحادیه</span>
            </div>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          STAGE 2: LIVE PRICING TERMINAL
      ───────────────────────────────────────────────────────────── */}
      <section className="py-20 relative bg-gradient-to-b from-[#06140D] via-[#0A2218]/50 to-[#06140D] border-y border-white/10">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 md:px-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#C9A857] font-semibold tracking-wider uppercase mb-2">
                <span className="w-2 h-2 rounded-full bg-[#C9A857]" />
                <span>سامانه تابلو معاملات گالری ملک</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                تابلوی زنده قیمت‌های طلا و مسکوکات
              </h2>
            </div>
            <Link
              href="/prices"
              className="inline-flex items-center gap-2 text-xs text-[#E3CCAE] hover:text-white transition-colors self-start md:self-auto font-medium"
            >
              <span>مشاهده آرشیو و تحلیل نموداری</span>
              <ChevronLeft className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayPrices.map((p, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-[#133827]/60 border border-white/10 hover:border-[#C9A857]/40 transition-all duration-300 shadow-subtle group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-bold text-[#E3CCAE]">{p.title}</span>
                  <span className="text-[10px] px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    لحظه‌ای
                  </span>
                </div>
                <div className="flex items-baseline justify-between mb-3">
                  <span className="text-xs text-[#C5BFB4]">خرید از کاربر</span>
                  <span className="text-base font-bold text-white font-mono">{p.buy} <span className="text-[11px] font-normal text-[#C5BFB4]">تومان</span></span>
                </div>
                <div className="flex items-baseline justify-between pt-3 border-t border-white/10">
                  <span className="text-xs text-[#C9A857] font-semibold">فروش به کاربر</span>
                  <span className="text-lg font-black text-[#C9A857] font-mono">{p.sell} <span className="text-[11px] font-normal text-[#C5BFB4]">تومان</span></span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          STAGE 3: CURATED PILLARS & PHYSICAL SHOWCASE
      ───────────────────────────────────────────────────────────── */}
      <section className="py-24 relative">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 md:px-10">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-5xl font-black text-white mb-4">
              مجموعه‌های زرین گالری ملک
            </h2>
            <p className="text-sm text-[#C5BFB4] font-light leading-relaxed">
              انتخابی اصیل از شمش‌های سوئیسی و ایرانی دارای کد رهگیری، مسکوکات بانکی پلمپ و خدمات سفارشی جواهرات
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Pillar 1 */}
            <div className="rounded-3xl bg-[#133827]/40 border border-white/10 p-8 flex flex-col justify-between hover:border-[#C9A857]/50 transition-all group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#C9A857]/20 border border-[#C9A857]/30 flex items-center justify-center text-[#C9A857] mb-6">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">شمش‌های استاندارد ۲۴ عیار</h3>
                <p className="text-xs text-[#C5BFB4] leading-relaxed mb-6 font-light">
                  شمش‌های معتبر با گواهی ری‌گیری، هولوگرام امنیتی و خلوص ۹۹۵ به بالا در اوزان ۱ گرم تا ۱ کیلوگرم ویژه سرمایه‌گذاری با کمترین اجرت.
                </p>
              </div>
              <Link
                href="/store"
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#E3CCAE] group-hover:text-white transition-colors"
              >
                <span>مشاهده شمش‌ها</span>
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>

            {/* Pillar 2 */}
            <div className="rounded-3xl bg-[#133827]/40 border border-white/10 p-8 flex flex-col justify-between hover:border-[#C9A857]/50 transition-all group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#C9A857]/20 border border-[#C9A857]/30 flex items-center justify-center text-[#C9A857] mb-6">
                  <Scale className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">مسکوکات بانکی بهار آزادی</h3>
                <p className="text-xs text-[#C5BFB4] leading-relaxed mb-6 font-light">
                  انواع سکه‌های تمام، نیم و ربع بهار آزادی با پلمپ رسمی معتبر و تضمین اصالت بانک مرکزی با قابلیت بازخرید آنی.
                </p>
              </div>
              <Link
                href="/store"
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#E3CCAE] group-hover:text-white transition-colors"
              >
                <span>ویترین مسکوکات</span>
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>

            {/* Pillar 3 */}
            <div className="rounded-3xl bg-[#133827]/40 border border-white/10 p-8 flex flex-col justify-between hover:border-[#C9A857]/50 transition-all group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#C9A857]/20 border border-[#C9A857]/30 flex items-center justify-center text-[#C9A857] mb-6">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">جواهرات و سفارشات اختصاصی</h3>
                <p className="text-xs text-[#C5BFB4] leading-relaxed mb-6 font-light">
                  طراحی و ساخت انواع سرویس‌ها، پلاک و مصنوعات طلا متناسب با سلیقه و بودجه اختصاصی شما با بالاترین ظرافت ساخت.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#E3CCAE] group-hover:text-white transition-colors"
              >
                <span>مشاوره و سفارش ساخت</span>
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          STAGE 4: SECURITY & CUSTODY ASSURANCE
      ───────────────────────────────────────────────────────────── */}
      <section className="py-20 border-t border-white/10 bg-[#0A1C14]/70">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div className="p-3.5 rounded-2xl bg-[#133827] border border-white/10 text-[#C9A857]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white mb-1">تضمین ۱۰۰٪ اصالت و عیار</h4>
                <p className="text-xs text-[#C5BFB4] leading-relaxed font-light">
                  تمام اقلام با فاکتور رسمی معتبر اتحادیه طلا و جواهر و گواهی سنجش اصالت تحویل داده می‌شوند.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3.5 rounded-2xl bg-[#133827] border border-white/10 text-[#C9A857]">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white mb-1">حمل ایمن و بیمه‌شده</h4>
                <p className="text-xs text-[#C5BFB4] leading-relaxed font-light">
                  تحویل فیزیکی محرمانه درب منزل یا محل کار در سراسر کشور با پوشش کامل بیمه حمل و نقل تا لحظه تحویل.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3.5 rounded-2xl bg-[#133827] border border-white/10 text-[#C9A857]">
                <RefreshCw className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white mb-1">تسویه حساب آنی و تضمینی</h4>
                <p className="text-xs text-[#C5BFB4] leading-relaxed font-light">
                  امکان فروش موجودی طلای آب‌شده یا فیزیکی در هر ساعت از شبانه‌روز با واریز فوری به شماره شبا.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          STAGE 5: VIP CALL TO ACTION
      ───────────────────────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-10">
          <div className="relative rounded-3xl bg-gradient-to-r from-[#133827] via-[#0A2218] to-[#133827] border border-[#C9A857]/30 p-10 sm:p-16 text-center shadow-gold-glow overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A857]/10 blur-3xl rounded-full pointer-events-none" />
            
            <h2 className="text-3xl sm:text-5xl font-black text-white mb-6">
              تجربه سرمایه‌گذاری مطمئن در گالری ملک
            </h2>
            <p className="max-w-xl mx-auto text-sm sm:text-base text-[#C5BFB4] font-light leading-relaxed mb-10">
              همین حالا حساب کاربری خود را افتتاح کنید و به صورت ۲۴ ساعته از خدمات خرید، فروش و تحویل فیزیکی طلا بهره‌مند شوید.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/register"
                className="w-full sm:w-auto px-10 py-4 rounded-full bg-[#C9A857] text-[#06140D] font-bold text-sm hover:bg-[#E3CCAE] transition-all shadow-gold-glow"
              >
                افتتاح حساب آنلاین
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/20 text-white font-medium text-sm hover:bg-white/10 transition-colors"
              >
                مشاوره با کارشناس گالری
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

