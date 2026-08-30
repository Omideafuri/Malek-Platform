import Link from 'next/link';
import type { Metadata } from 'next';
import { getLatestPriceSnapshot } from '@/lib/financial/pricing';
import { fetchAlanChandMarketRates } from '@/lib/providers';
import { formatNumber, toPersianDigits, formatDate } from '@/lib/utils/format';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, Clock, ShieldCheck, RefreshCw, Database } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'تابلوی رسمی نرخ طلا و مسکوکات — ملک طلا',
  description: 'قیمت لحظه‌ای و رسمی بازار طلای ۱۸ و ۲۴ عیار، مثقال، مسکوکات بهار آزادی و انس طلا در گالری ملک طلا.',
};

export default async function PricesPage() {
  const [snapshot, marketRates] = await Promise.all([
    getLatestPriceSnapshot('18K'),
    fetchAlanChandMarketRates(),
  ]);

  const buyRial = snapshot.buyPriceRial;
  const sellRial = snapshot.sellPriceRial;
  const refRial = snapshot.referencePriceRial;

  const buyToman = Number(buyRial / BigInt(10));
  const sellToman = Number(sellRial / BigInt(10));
  const refToman = Number(refRial / BigInt(10));
  const spreadToman = buyToman - sellToman;
  const spreadRial = Number(refRial) > 0 ? Number(buyRial - sellRial) : spreadToman * 10;

  const allMarketItems = [
    marketRates.gold18k,
    marketRates.gold24k,
    marketRates.mesghal,
    marketRates.coinEmami,
    marketRates.coinBahar,
    marketRates.coinHalf,
    marketRates.coinQuarter,
    marketRates.goldOunce,
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#141210] selection:bg-[#E3CCAE] pt-24 pb-20">
      <div className="mx-auto max-w-5xl px-6 md:px-10">

        {/* Header */}
        <div className="border-b border-[#E8E1D5] pb-10 mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <span className="diamond-motif" />
              <span className="text-xs tracking-brand text-[#7D776C]">نرخ‌های رسمی و لحظه‌ای بازار ایران</span>
            </div>
            
            {/* Timestamp & Source Badge */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-[#7D776C] bg-white px-3.5 py-1.5 border border-[#E8E1D5] rounded-full self-start md:self-auto shadow-xs">
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              <span className="font-medium text-[#133827]">منبع: AlanChand</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#7D776C]" />
                <span className="font-num">
                  {formatDate(new Date(marketRates.lastUpdated), 'relative')}
                </span>
              </span>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-[#141210] tracking-tight mb-4">
            تابلوی معاملات ملک طلا
          </h1>
          <p className="text-base sm:text-lg text-[#4A463F] leading-relaxed font-light max-w-2xl">
            نرخ‌های اعلامی به صورت مستقیم از منبع رسمی AlanChand دریافت شده و قیمت‌ها بر پایه تومان (اصلی) و ریال (معادل بانکی) نمایش داده می‌شوند.
          </p>
        </div>

        {/* Primary 18K Live Trading Terminal Card */}
        <div className="border border-[#E8E1D5] bg-white rounded-3xl p-8 md:p-12 mb-12 shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-[#E8E1D5] pb-8 mb-8 gap-4">
            <div>
              <span className="text-xs tracking-brand text-[#C9A857] block mb-2 font-semibold">شاخص اصلی مبادلات پلتفرم</span>
              <h2 className="text-2xl md:text-3xl font-bold text-[#141210]">هر گرم طلای ۱۸ عیار (۷۵۰)</h2>
            </div>
            <div className="text-left">
              <span className="text-xs tracking-brand text-[#7D776C] block mb-1">قیمت مرجع بازار</span>
              <p className="text-3xl md:text-4xl font-bold font-num text-[#133827] tracking-tight">
                {toPersianDigits(formatNumber(refToman))} <span className="text-sm font-normal text-[#7D776C]">تومان</span>
              </p>
              <p className="text-xs font-num text-[#7D776C] mt-1">
                معادل {toPersianDigits(formatNumber(refToman * 10))} ریال
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="border border-[#E8E1D5] p-6 bg-[#FAF8F5] rounded-2xl">
              <span className="text-xs text-[#7D776C] block mb-2 font-medium">نرخ خرید ملک طلا از شما (فروش موجودی)</span>
              <p className="text-2xl md:text-3xl font-bold font-num text-[#141210]">
                {toPersianDigits(formatNumber(sellToman))} <span className="text-sm font-normal text-[#7D776C]">تومان</span>
              </p>
              <p className="text-xs font-num text-[#7D776C] mt-1">
                معادل {toPersianDigits(formatNumber(sellToman * 10))} ریال
              </p>
              <span className="text-xs text-[#7D776C] mt-2 block">تسویه آنی به کیف پول ریالی</span>
            </div>

            <div className="border border-[#E8E1D5] p-6 bg-[#FAF8F5] rounded-2xl">
              <span className="text-xs text-[#7D776C] block mb-2 font-medium">نرخ فروش ملک طلا به شما (خرید آنلاین)</span>
              <p className="text-2xl md:text-3xl font-bold font-num text-[#141210]">
                {toPersianDigits(formatNumber(buyToman))} <span className="text-sm font-normal text-[#7D776C]">تومان</span>
              </p>
              <p className="text-xs font-num text-[#7D776C] mt-1">
                معادل {toPersianDigits(formatNumber(buyToman * 10))} ریال
              </p>
              <span className="text-xs text-[#7D776C] mt-2 block">ثبت لحظه‌ای در خزانه با پشتوانه شمش</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center border-t border-[#E8E1D5] pt-6 gap-4 text-sm text-[#4A463F]">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-4 h-4 text-[#C9A857]" />
              <span>اسپرد معاملاتی:</span>
              <span className="font-num font-bold text-[#C9A857]">{toPersianDigits(formatNumber(spreadToman))} تومان</span>
              <span className="text-xs text-[#7D776C]">({toPersianDigits(formatNumber(spreadRial))} ریال)</span>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <Link href="/buy" className="flex-1 sm:flex-none">
                <Button variant="primary" className="w-full sm:w-auto">ورود به پنل خرید طلا</Button>
              </Link>
              <Link href="/sell" className="flex-1 sm:flex-none">
                <Button variant="outline" className="w-full sm:w-auto">فروش موجودی</Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Complete Bullion & Coin Market Board */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="diamond-motif" />
              <h2 className="text-xl md:text-2xl font-bold text-[#141210]">نرخ انواع طلا، مسکوکات و انس جهانی</h2>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#7D776C]">
              <Database className="w-3.5 h-3.5 text-[#C9A857]" />
              <span>منبع: AlanChand API</span>
            </div>
          </div>

          <div className="border border-[#E8E1D5] bg-white rounded-3xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-right text-sm">
                <thead>
                  <tr className="border-b border-[#E8E1D5] bg-[#FAF8F5] text-[#7D776C] text-xs tracking-wider">
                    <th className="py-4 px-6 font-medium">عنوان دارایی</th>
                    <th className="py-4 px-6 font-medium text-left">قیمت (تومان / اصلی)</th>
                    <th className="py-4 px-6 font-medium text-left">معادل ریال (IRR)</th>
                    <th className="py-4 px-6 font-medium text-left">تغییر ۲۴ ساعته</th>
                    <th className="py-4 px-6 font-medium text-left">درصد تغییر</th>
                    <th className="py-4 px-6 font-medium text-center">واحد</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8E1D5]">
                  {allMarketItems.map((item) => {
                    const isPositive = item.changePercent >= 0;
                    return (
                      <tr key={item.key} className="hover:bg-[#FAF8F5]/80 transition-colors">
                        <td className="py-4 px-6 font-medium text-[#141210]">
                          <div className="flex flex-col">
                            <span className="text-base font-semibold">{item.titleFa}</span>
                            <span className="text-xs text-[#7D776C] font-mono tracking-tight">{item.titleEn}</span>
                          </div>
                        </td>

                        {/* Primary Price: Toman */}
                        <td className="py-4 px-6 text-left font-num font-bold text-base text-[#141210]">
                          {toPersianDigits(formatNumber(item.priceToman))}{' '}
                          <span className="text-xs font-normal text-[#7D776C]">
                            {item.key === 'goldOunce' ? 'دلار' : 'تومان'}
                          </span>
                        </td>

                        {/* Secondary Price: Rial */}
                        <td className="py-4 px-6 text-left font-num text-xs text-[#7D776C]">
                          {item.key === 'goldOunce' ? (
                            '—'
                          ) : (
                            `${toPersianDigits(formatNumber(item.priceRial))} ریال`
                          )}
                        </td>

                        {/* 24h Change */}
                        <td className="py-4 px-6 text-left font-num text-xs">
                          <div className={`inline-flex items-center gap-1 font-medium ${isPositive ? 'text-emerald-700' : 'text-rose-700'}`}>
                            {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                            <span>{toPersianDigits(formatNumber(Math.abs(item.changeToman)))}</span>
                          </div>
                        </td>

                        {/* Change Percent */}
                        <td className="py-4 px-6 text-left font-num text-xs">
                          <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                            isPositive ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'
                          }`}>
                            {isPositive ? '+' : ''}{toPersianDigits(item.changePercent.toFixed(2))}٪
                          </span>
                        </td>

                        {/* Unit */}
                        <td className="py-4 px-6 text-center text-[#4A463F] text-xs">
                          {item.unit}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Table Footer */}
            <div className="border-t border-[#E8E1D5] p-4 bg-[#FAF8F5] text-xs text-[#7D776C] flex flex-col sm:flex-row justify-between items-center gap-2">
              <div className="flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 text-[#7D776C]" />
                <span>نرخ‌ها هنگام بارگذاری صفحه مستقیماً از AlanChand دریافت می‌شوند.</span>
              </div>
              <span className="font-num text-[#7D776C]">
                زمان به‌روزرسانی منبع: {formatDate(new Date(marketRates.lastUpdated), 'datetime')}
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}