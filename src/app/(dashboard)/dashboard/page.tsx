import Link from 'next/link';
import type { Metadata } from 'next';
import {
  Wallet,
  ArrowUpRight,
  TrendingUp,
  RefreshCw,
  Sparkles,
  ArrowLeft,
  Coins,
  CreditCard,
  Truck,
  Layers,
} from 'lucide-react';
import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import { getLatestPriceSnapshot } from '@/lib/financial/pricing';
import { calculateCashAmount } from '@/lib/financial/decimal';
import { formatNumber, formatToman, toPersianDigits } from '@/lib/utils/format';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'میز اختصاصی معاملات و دارایی‌ها — ملک طلا',
};

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  const cashWallet = await db.cashWallet.findUnique({ where: { userId: user.id } });
  const goldWallet = await db.goldWallet.findUnique({ where: { userId: user.id } });
  const snapshot = await getLatestPriceSnapshot('18K');

  const cashBalanceRial = cashWallet?.balanceRial ?? 0n;
  const goldBalanceNg = goldWallet?.balanceNg ?? 0n;

  const goldGrams = Number(goldBalanceNg) / 1_000_000_000;
  const goldValueRial = calculateCashAmount(goldBalanceNg, snapshot.buyPriceRial);
  const goldValueToman = Number(goldValueRial / 10n);
  const cashBalanceToman = Number(cashBalanceRial / 10n);
  const totalPortfolioToman = goldValueToman + cashBalanceToman;

  const buyPriceToman = Number(snapshot.buyPriceRial / BigInt(10));
  const sellPriceToman = Number(snapshot.sellPriceRial / BigInt(10));

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">

      {/* Greeting & Atmospheric Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <span className="diamond-motif !w-2 !h-2" />
            <span className="text-xs tracking-brand font-semibold text-[#7D776C]">گالری اختصاصی سرمایه‌گذاری</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#141210] tracking-tight">
            خوش‌آمدید، {user.profile?.firstName || 'همراه گرامی'}
          </h1>
        </div>

        {/* Live Indicator Badge */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white border border-[#E8E1D5] shadow-xs text-xs self-start sm:self-auto">
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          <span className="text-[#133827] font-semibold">ارتباط مستقیم با خزانه</span>
          <span className="text-[#E8E1D5]">|</span>
          <span className="text-[11px] text-[#7D776C] font-mono">۲۴/۷</span>
        </div>
      </div>

      {/* ━━━ SECTION 1: TOTAL PORTFOLIO WEALTH CAPSULE (#133827 Midnight Lapis) ━━━ */}
      <div className="bg-gradient-to-br from-[#133827] via-[#0A2218] to-[#000000] text-white rounded-3xl p-8 sm:p-10 md:p-12 border border-white/15 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-[#C9A857]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <span className="text-[11px] sm:text-xs tracking-brand text-[#E3CCAE] block mb-3 font-semibold uppercase">
              ارزش کل سبد دارایی طلایی و ریالی
            </span>
            <div className="flex items-baseline gap-3">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-num text-white tracking-tight">
                {toPersianDigits(formatNumber(totalPortfolioToman))}
              </h2>
              <span className="text-sm sm:text-base text-[#E3CCAE] font-normal">تومان</span>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs">
              <span className="inline-flex items-center gap-1 text-emerald-400 font-num font-semibold bg-white/10 px-2.5 py-1 rounded-full border border-white/10">
                <ArrowUpRight className="h-3.5 w-3.5" />
                <span>پشتوانه صددرصد شمش فیزیکی</span>
              </span>
              <span className="text-[#C5BFB4] font-light">
                معادل {toPersianDigits(formatNumber(totalPortfolioToman * 10))} ریال
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Link href="/buy" className="w-full sm:w-auto">
              <Button variant="primary" className="w-full sm:w-auto px-7 py-3 rounded-full text-xs font-semibold shadow-gold-glow flex items-center justify-center gap-2">
                <span>خرید آنلاین طلا</span>
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/sell" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto px-6 py-3 rounded-full text-xs font-semibold border-white/30 text-white hover:bg-white hover:text-[#133827] justify-center">
                فروش موجودی
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* ━━━ SECTION 2: DUAL WALLET PODS (Champagne & Obsidian Multi-Surfaces) ━━━ */}
      <div className="grid md:grid-cols-2 gap-6">
        
        {/* Pod 1: Gold Vault (Champagne Canvas #E3CCAE) */}
        <div className="bg-[#E3CCAE] rounded-3xl p-6 sm:p-8 border border-[#D1C7B7] shadow-xs flex flex-col justify-between group hover:shadow-md transition-shadow">
          <div>
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-2">
                <span className="diamond-motif !w-2 !h-2" />
                <span className="text-[11px] tracking-brand font-bold text-[#133827] uppercase">خزانه طلای دیجیتال</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/70 text-[#133827] font-semibold">
                18K GOLD
              </span>
            </div>

            <div className="flex items-baseline gap-2 mb-2">
              <h3 className="text-3xl sm:text-4xl font-extrabold font-num text-[#141210] tracking-tight">
                {toPersianDigits(goldGrams.toFixed(4))}
              </h3>
              <span className="text-sm font-semibold text-[#4A463F]">گرم</span>
            </div>

            <p className="text-xs text-[#4A463F] font-light">
              ارزش روز: <span className="font-num font-bold text-[#133827]">{formatToman(goldValueToman)}</span>
            </p>
          </div>

          <div className="mt-8 pt-4 border-t border-[#D1C7B7] flex justify-between items-center text-xs">
            <Link href="/transfer" className="font-bold text-[#133827] hover:text-[#C9A857] flex items-center gap-1 transition-colors">
              <span>انتقال به دیگری</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </Link>
            <Link href="/delivery" className="font-bold text-[#133827] hover:text-[#C9A857] flex items-center gap-1 transition-colors">
              <span>درخواست تحویل فیزیکی</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Pod 2: Cash Rial Wallet (Deep Obsidian Black #000000) */}
        <div className="bg-[#000000] text-white rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl flex flex-col justify-between group hover:border-[#C9A857]/40 transition-colors">
          <div>
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-2">
                <Wallet className="h-4 w-4 text-[#C9A857]" />
                <span className="text-[11px] tracking-brand font-bold text-[#E3CCAE] uppercase">کیف پول نقدی (ریالی)</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-white font-semibold">
                SHETAB
              </span>
            </div>

            <div className="flex items-baseline gap-2 mb-2">
              <h3 className="text-3xl sm:text-4xl font-extrabold font-num text-white tracking-tight">
                {toPersianDigits(formatNumber(cashBalanceToman))}
              </h3>
              <span className="text-sm font-normal text-[#C5BFB4]">تومان</span>
            </div>

            <p className="text-xs text-[#C5BFB4] font-light">
              معادل بانکی: <span className="font-num text-white">{toPersianDigits(formatNumber(cashBalanceToman * 10))} ریال</span>
            </p>
          </div>

          <div className="mt-8 pt-4 border-t border-white/10 flex justify-between items-center text-xs">
            <Link href="/wallet" className="font-bold text-[#E3CCAE] hover:text-white flex items-center gap-1 transition-colors">
              <span>واریز شتابی</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </Link>
            <Link href="/wallet" className="font-bold text-[#E3CCAE] hover:text-white flex items-center gap-1 transition-colors">
              <span>برداشت پایا / ساتنا</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>

      {/* ━━━ SECTION 3: QUICK OPERATIONS MATRIX ━━━ */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E1D5] shadow-xs">
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="w-4 h-4 text-[#C9A857]" />
          <h3 className="text-xs tracking-brand font-bold text-[#133827] uppercase">دسترسی سریع به خدمات اختصاصی</h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {[
            { label: 'شارژ حساب ریالی', href: '/wallet', icon: CreditCard },
            { label: 'برداشت به حساب', href: '/wallet', icon: Wallet },
            { label: 'انتقال طلای دیجیتال', href: '/transfer', icon: Coins },
            { label: 'سفارش شمش و سکه', href: '/store', icon: Layers },
            { label: 'پیگیری تحویل پستی', href: '/delivery', icon: Truck },
          ].map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="bg-[#FAF8F5] p-4 sm:p-5 rounded-2xl border border-[#E8E1D5] flex flex-col items-center justify-center text-center hover:bg-white hover:border-[#C9A857] hover:shadow-xs transition-all duration-300 group"
            >
              <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-[#133827] group-hover:text-[#C9A857] mb-2.5 border border-[#E8E1D5] transition-colors">
                <action.icon className="h-4 w-4" />
              </div>
              <span className="text-xs font-semibold text-[#141210] group-hover:text-[#133827] transition-colors">
                {action.label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* ━━━ SECTION 4: REAL-TIME MARKET CAPSULE ━━━ */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E1D5] shadow-xs">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#C9A857]" />
            <h3 className="text-xs tracking-brand font-bold text-[#133827] uppercase">تابلوی برخط طلای ۱۸ عیار</h3>
          </div>
          <Link href="/prices" className="text-xs font-bold text-[#C9A857] hover:text-[#9E5214] flex items-center gap-1">
            <span>مشاهده تابلوی کامل بازار</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#E8E1D5]">
            <span className="text-[11px] text-[#7D776C] block mb-1">نرخ خرید ملک طلا از شما (فروش)</span>
            <p className="text-xl font-bold font-num text-[#141210]">{formatToman(sellPriceToman)}</p>
            <span className="text-[10px] text-[#7D776C] mt-1 block">تسویه آنی به کیف پول</span>
          </div>

          <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#E8E1D5]">
            <span className="text-[11px] text-[#7D776C] block mb-1">نرخ فروش ملک طلا به شما (خرید)</span>
            <p className="text-xl font-bold font-num text-[#141210]">{formatToman(buyPriceToman)}</p>
            <span className="text-[10px] text-[#7D776C] mt-1 block">واریز فوری به خزانه طلا</span>
          </div>

          <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#E8E1D5] flex flex-col justify-between">
            <span className="text-[11px] text-[#7D776C] block mb-1">منبع رسمی محاسبه</span>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#133827]">
              <RefreshCw className="w-3.5 h-3.5 text-[#C9A857]" />
              <span>AlanChand (الان چند)</span>
            </div>
            <span className="text-[10px] text-[#7D776C] font-mono">به‌روزرسانی هنگام بارگذاری صفحه</span>
          </div>
        </div>
      </div>

    </div>
  );
}
