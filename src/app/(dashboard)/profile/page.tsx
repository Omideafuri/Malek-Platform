import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import { Shield } from 'lucide-react';
import { submitKycAction } from '@/app/actions/kyc';
import { Button } from '@/components/ui/button';

export const dynamic = 'force-dynamic';

export default async function ProfilePage() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  const profile = await db.profile.findUnique({ where: { userId: user.id } });
  const kyc = await db.kycApplication.findFirst({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="max-w-3xl mx-auto space-y-8 pt-4 pb-16">
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="diamond-motif !w-2 !h-2" />
          <span className="text-xs tracking-brand font-semibold text-[#7D776C]">شناسنامه و امنیت حساب</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#141210] tracking-tight">پروفایل کاربری و احراز هویت</h1>
        <p className="text-xs sm:text-sm text-[#4A463F] mt-1 font-light">
          مدیریت اطلاعات سجلی، انطباق با قوانین مبارزه با پولشویی و تأیید سطح دسترسی معاملات
        </p>
      </div>

      {/* KYC Status Badge */}
      <div className={`p-6 rounded-3xl border flex items-start gap-4 shadow-xs ${
        kyc?.status === 'VERIFIED' ? 'bg-emerald-50 border-emerald-200 text-emerald-900' :
        kyc?.status === 'PENDING' ? 'bg-amber-50 border-amber-200 text-amber-900' :
        kyc?.status === 'REJECTED' ? 'bg-rose-50 border-rose-200 text-rose-900' :
        'bg-white border-[#E8E1D5] text-[#141210]'
      }`}>
        <div className="w-10 h-10 rounded-2xl bg-white/80 flex items-center justify-center flex-shrink-0 shadow-xs">
          <Shield className="h-5 w-5 text-[#C9A857]" />
        </div>
        <div>
          <h2 className="font-bold text-base mb-1">
            سطح کاربری: {' '}
            {kyc?.status === 'VERIFIED' ? 'احراز هویت شده (سطح طلایی)' :
             kyc?.status === 'PENDING' ? 'در حال بررسی توسط کارشناسان' :
             kyc?.status === 'REJECTED' ? 'مدارک نیاز به بازنگری دارد' : 'احراز هویت پایه'}
          </h2>
          <p className="text-xs leading-relaxed opacity-90 font-light">
            {kyc?.status === 'VERIFIED' ? 'حساب شما با موفقیت تأیید شده است و محدودیتی برای خرید، فروش و تحویل فیزیکی طلا ندارید.' :
             kyc?.status === 'PENDING' ? 'مدارک هویتی شما دریافت شده و طبق ضوابط شاپرک و اتحادیه در حال تطبیق است.' :
             kyc?.status === 'REJECTED' ? `دلیل عدم تأیید: ${kyc.rejectionReason || 'عدم تطابق اطلاعات با ثبت احوال'}` : 
             'جهت افزایش سقف واریز و برداشت بانکی، لطفاً اطلاعات زیر را با دقت تکمیل فرمایید.'}
          </p>
        </div>
      </div>

      {/* KYC Form */}
      {kyc?.status !== 'VERIFIED' && kyc?.status !== 'PENDING' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E1D5] shadow-xs">
          <h3 className="text-base font-bold text-[#141210] mb-4">فرم درخواست تطبیق کد ملی</h3>
          <form action={submitKycAction as unknown as string} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#141210] mb-1.5">نام</label>
                <input 
                  type="text" 
                  name="firstName"
                  defaultValue={profile?.firstName || ''}
                  className="w-full rounded-2xl border border-[#E8E1D5] bg-[#FAF8F5] px-4 py-3 text-xs outline-none focus:border-[#C9A857] focus:bg-white transition-all"
                  required 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#141210] mb-1.5">نام خانوادگی</label>
                <input 
                  type="text" 
                  name="lastName"
                  defaultValue={profile?.lastName || ''}
                  className="w-full rounded-2xl border border-[#E8E1D5] bg-[#FAF8F5] px-4 py-3 text-xs outline-none focus:border-[#C9A857] focus:bg-white transition-all"
                  required 
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#141210] mb-1.5">کد ملی ۱۰ رقمی</label>
              <input 
                type="text" 
                name="nationalId"
                dir="ltr"
                defaultValue={profile?.nationalId || ''}
                className="w-full rounded-2xl border border-[#E8E1D5] bg-[#FAF8F5] px-4 py-3 font-num text-left text-xs outline-none focus:border-[#C9A857] focus:bg-white transition-all"
                maxLength={10}
                required 
              />
            </div>

            <div className="p-4 bg-[#FAF8F5] border border-[#E8E1D5] rounded-2xl text-xs text-[#4A463F] leading-relaxed">
              <span className="font-bold text-[#133827]">الزام قانونی:</span> نام صاحب حساب بانکی و دارنده سیم‌کارت باید با کد ملی ثبت‌شده تطابق کامل داشته باشد.
            </div>

            <Button 
              type="submit"
              variant="primary"
              className="w-full py-3.5 rounded-full text-xs font-bold shadow-gold-glow"
            >
              ثبت و ارسال اطلاعات هویتی
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
