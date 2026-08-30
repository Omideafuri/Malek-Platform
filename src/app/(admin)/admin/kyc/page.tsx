import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import { reviewKycAction } from '@/app/actions/kyc';
import { Check, X, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const dynamic = 'force-dynamic';

export default async function AdminKycPage() {
  const user = await getCurrentUser();
  if (!user || !['ADMIN', 'SUPER_ADMIN'].includes(user.role)) redirect('/dashboard');

  const applications = await db.kycApplication.findMany({
    where: { status: 'PENDING' },
    include: {
      user: {
        include: { profile: true }
      }
    },
    orderBy: { createdAt: 'asc' }
  });

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="diamond-motif !w-2 !h-2" />
          <span className="text-xs tracking-brand font-semibold text-[#7D776C]">صف ارزیابی مدارک</span>
        </div>
        <h1 className="text-2xl font-bold text-[#141210] tracking-tight">بررسی درخواست‌های احراز هویت</h1>
        <p className="text-xs sm:text-sm text-[#4A463F] mt-1 font-light">
          تطبیق سجلی و صدور دسترسی معاملات سطح طلایی
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-[#E8E1D5] overflow-hidden shadow-xs">
        {applications.length === 0 ? (
          <div className="p-12 text-center text-[#7D776C] space-y-2">
            <ShieldCheck className="w-8 h-8 text-[#C9A857] mx-auto opacity-60" />
            <p className="text-sm font-semibold text-[#141210]">هیچ درخواستی در صف انتظار نیست.</p>
            <p className="text-xs font-light">تمامی پرونده‌های دریافتی تعیین تکلیف گردیده‌اند.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-right">
              <thead>
                <tr className="bg-[#FAF8F5] text-[#7D776C] border-b border-[#E8E1D5] text-xs">
                  <th className="px-6 py-4 font-semibold">شماره موبایل</th>
                  <th className="px-6 py-4 font-semibold">نام و نام خانوادگی</th>
                  <th className="px-6 py-4 font-semibold">کد ملی</th>
                  <th className="px-6 py-4 font-semibold text-center">عملیات تصمیم‌گیری</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E1D5]">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-[#FAF8F5]/80 transition-colors">
                    <td className="px-6 py-4 font-num text-[#141210] text-xs" dir="ltr">
                      {app.user.mobile}
                    </td>
                    <td className="px-6 py-4 font-semibold text-xs sm:text-sm text-[#141210]">
                      {app.user.profile?.firstName} {app.user.profile?.lastName}
                    </td>
                    <td className="px-6 py-4 font-num text-xs text-[#133827]">
                      {app.user.profile?.nationalId}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <form action={async () => {
                          'use server';
                          await reviewKycAction(app.id, 'VERIFIED');
                        }}>
                          <Button
                            type="submit"
                            variant="primary"
                            size="sm"
                            className="rounded-full text-xs"
                          >
                            <Check className="h-3.5 w-3.5 ml-1" />
                            تأیید
                          </Button>
                        </form>
                        <form action={async () => {
                          'use server';
                          await reviewKycAction(app.id, 'REJECTED', 'عدم تطابق اطلاعات');
                        }}>
                          <Button
                            type="submit"
                            variant="outline"
                            size="sm"
                            className="rounded-full text-xs text-rose-700 hover:bg-rose-50"
                          >
                            <X className="h-3.5 w-3.5 ml-1" />
                            رد
                          </Button>
                        </form>
                      </div>
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
