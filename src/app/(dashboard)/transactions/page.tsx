import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import { formatNumber, toPersianDigits } from '@/lib/utils/format';
import { ArrowUpDown, ShieldCheck } from 'lucide-react';
import type { LedgerEntryType } from '@prisma/client';

export const dynamic = 'force-dynamic';

const entryTypeLabels: Record<LedgerEntryType, string> = {
  DEPOSIT: 'واریز به حساب ریالی',
  WITHDRAWAL: 'برداشت از حساب ریالی',
  BUY_DEBIT: 'پرداخت بابت خرید طلا',
  BUY_CREDIT: 'دریافت طلا بابت خرید',
  SELL_DEBIT: 'کسر طلا بابت فروش',
  SELL_CREDIT: 'دریافت وجه بابت فروش',
  TRANSFER_IN: 'دریافت طلا از دیگری',
  TRANSFER_OUT: 'انتقال طلا به دیگری',
  FEE: 'کارمزد شبکه',
  DELIVERY_DEBIT: 'کسر طلا بابت تحویل فیزیکی',
  REFUND: 'برگشت وجه / طلا',
  ADJUSTMENT: 'اصلاحیه سیستمی',
};

export default async function TransactionsPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  const transactions = await db.ledgerEntry.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
    take: 50,
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto pt-4 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="diamond-motif !w-2 !h-2" />
            <span className="text-xs tracking-brand font-semibold text-[#7D776C]">دفتر کل دارایی‌ها</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#141210] tracking-tight">تاریخچه رسمی تراکنش‌ها</h1>
          <p className="text-xs sm:text-sm text-[#4A463F] mt-1 font-light">
            ثبت زنجیره‌ای و تغییرات حساب‌های ریالی و خزانه طلای دیجیتال
          </p>
        </div>
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E8E1D5] text-xs text-[#133827] font-semibold self-start sm:self-auto shadow-xs">
          <ShieldCheck className="w-4 h-4 text-[#C9A857]" />
          <span>تضمین دفتر کل بدون دستکاری</span>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-[#E8E1D5] overflow-hidden shadow-xs">
        {transactions.length === 0 ? (
          <div className="p-12 text-center text-[#7D776C]">
            <ArrowUpDown className="w-8 h-8 text-[#C9A857] mx-auto mb-3 opacity-60" />
            <p className="text-sm font-semibold text-[#141210]">هنوز تراکنشی در این حساب ثبت نشده است.</p>
            <p className="text-xs text-[#7D776C] mt-1 font-light">پس از اولین خرید یا واریز، تراکنش‌های شما در این بخش نمایش داده می‌شوند.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-right">
              <thead>
                <tr className="bg-[#FAF8F5] text-[#7D776C] border-b border-[#E8E1D5] text-xs">
                  <th className="px-6 py-4 font-semibold">تاریخ و زمان</th>
                  <th className="px-6 py-4 font-semibold">شرح تراکنش</th>
                  <th className="px-6 py-4 font-semibold">نوع حساب</th>
                  <th className="px-6 py-4 font-semibold text-left">مبلغ / مقدار</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E1D5]">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-[#FAF8F5]/80 transition-colors">
                    <td className="px-6 py-4 text-[#7D776C] font-num text-xs" dir="ltr">
                      {new Intl.DateTimeFormat('fa-IR', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                      }).format(tx.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[#141210] font-semibold text-xs sm:text-sm">
                        {entryTypeLabels[tx.entryType] || tx.entryType}
                      </span>
                      {tx.description && (
                        <p className="text-[11px] text-[#7D776C] mt-0.5 font-light">{tx.description}</p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                        tx.walletType === 'CASH' 
                          ? 'bg-[#0A2218] text-[#E3CCAE]' 
                          : 'bg-[#E3CCAE] text-[#133827]'
                      }`}>
                        {tx.walletType === 'CASH' ? 'ریالی' : 'طلا'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-left">
                      <div className={`flex items-center justify-end gap-1 font-bold font-num text-sm sm:text-base ${
                        tx.direction === 'CREDIT' ? 'text-emerald-700' : 'text-rose-700'
                      }`}>
                        {tx.direction === 'CREDIT' ? '+' : '-'}
                        {tx.walletType === 'CASH' 
                          ? `${formatNumber(Number(tx.amount / 10n))} تومان` 
                          : `${toPersianDigits((Number(tx.amount) / 1_000_000_000).toFixed(4))} گرم`
                        }
                      </div>
                      <p className="text-[11px] text-[#7D776C] mt-0.5 text-left font-num" dir="ltr">
                        مانده: {tx.walletType === 'CASH' 
                          ? `${formatNumber(Number(tx.balanceAfter / 10n))} تومان` 
                          : `${toPersianDigits((Number(tx.balanceAfter) / 1_000_000_000).toFixed(4))} گرم`
                        }
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
