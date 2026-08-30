import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import { formatNumber, toPersianDigits } from '@/lib/utils/format';
import { Users, TrendingUp, Wallet, ShieldAlert } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const user = await getCurrentUser();
  if (!user || !['ADMIN', 'SUPER_ADMIN'].includes(user.role)) {
    redirect('/dashboard');
  }

  const totalUsers = await db.user.count();
  
  const goldWallets = await db.goldWallet.aggregate({
    _sum: { balanceNg: true }
  });
  
  const totalGoldNg = goldWallets._sum.balanceNg || 0n;
  const totalGoldGrams = Number(totalGoldNg) / 1_000_000_000;

  const cashWallets = await db.cashWallet.aggregate({
    _sum: { balanceRial: true }
  });
  
  const totalCashRial = cashWallets._sum.balanceRial || 0n;
  const totalCashToman = Number(totalCashRial / 10n);

  const pendingKyc = await db.kycApplication.count({
    where: { status: 'PENDING' }
  });

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="diamond-motif !w-2 !h-2" />
          <span className="text-xs tracking-brand font-semibold text-[#7D776C]">مرکز پایش شاخص‌های کلیدی</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#141210] tracking-tight">داشبورد مدیریت و نظارت ملک طلا</h1>
        <p className="text-xs sm:text-sm text-[#4A463F] mt-1 font-light">
          وضعیت تراز خزانه‌های طلا، حساب‌های ریالی شتاب و صف‌های بررسی احراز هویت
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white rounded-3xl p-6 border border-[#E8E1D5] shadow-xs">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-[#FAF8F5] text-[#133827] rounded-2xl border border-[#E8E1D5]">
              <Users className="h-5 w-5" />
            </div>
            <p className="text-xs font-semibold text-[#7D776C]">کاربران عضو</p>
          </div>
          <p className="text-3xl font-extrabold font-num text-[#141210]">
            {formatNumber(totalUsers)}
          </p>
        </div>

        <div className="bg-[#E3CCAE] rounded-3xl p-6 border border-[#D1C7B7] shadow-xs text-[#141210]">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-white text-[#133827] rounded-2xl border border-[#D1C7B7]">
              <TrendingUp className="h-5 w-5" />
            </div>
            <p className="text-xs font-bold text-[#133827]">موجودی کل خزانه طلا</p>
          </div>
          <p className="text-3xl font-extrabold font-num text-[#141210]">
            {toPersianDigits(totalGoldGrams.toFixed(4))}
            <span className="text-xs font-bold text-[#4A463F] mr-1">گرم</span>
          </p>
        </div>

        <div className="bg-[#000000] text-white rounded-3xl p-6 border border-white/15 shadow-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-[#14162B] text-[#C9A857] rounded-2xl border border-white/10">
              <Wallet className="h-5 w-5" />
            </div>
            <p className="text-xs font-bold text-[#E3CCAE]">نقدینگی در گردش</p>
          </div>
          <p className="text-3xl font-extrabold font-num text-white">
            {formatNumber(totalCashToman)}
            <span className="text-xs font-normal text-[#C5BFB4] mr-1">تومان</span>
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-[#E8E1D5] shadow-xs">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-[#FAF8F5] text-[#C9A857] rounded-2xl border border-[#E8E1D5]">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <p className="text-xs font-semibold text-[#7D776C]">احراز هویت‌های در صف</p>
          </div>
          <p className="text-3xl font-extrabold font-num text-[#C9A857]">
            {formatNumber(pendingKyc)}
          </p>
        </div>
      </div>
    </div>
  );
}
