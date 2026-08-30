import type { Metadata } from 'next';
import { Lock, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'حریم خصوصی — ملک طلا',
  description: 'سیاست حفظ حریم خصوصی و نحوه مدیریت اطلاعات کاربران در پلتفرم و گالری ملک طلا.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#141210] selection:bg-[#C9A857] selection:text-white pt-28 pb-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E8E1D5] text-xs text-[#133827] mb-4 shadow-xs">
            <Lock className="w-3.5 h-3.5 text-[#C9A857]" />
            <span>صیانت از داده‌ها و حریم شخصی</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#141210] tracking-tight">سیاست حریم خصوصی ملک طلا</h1>
          <p className="text-xs sm:text-sm text-[#4A463F] mt-2 font-light max-w-lg mx-auto">
            تعهدات مجموعه ملک طلا در حفاظت از محرمانگی اطلاعات هویتی و تراکنش‌های مالی اعضا
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E8E1D5] shadow-xs space-y-6 text-xs sm:text-sm text-[#4A463F] leading-relaxed">
          <div className="flex items-center gap-2 text-sm font-bold text-[#133827]">
            <Shield className="w-5 h-5 text-[#C9A857]" />
            <span>ذخیره‌سازی رمزنگاری‌شده داده‌ها</span>
          </div>
          <p>
            کلیه اطلاعات هویتی، آدرس‌های پستی و سوابق معاملات کاربران با استانداردهای رمزنگاری سطح بالا (AES-256) ذخیره گردیده و تحت هیچ شرایطی در اختیار اشخاص ثالث یا نهادهای تبلیغاتی قرار نخواهد گرفت.
          </p>

          <div className="flex items-center gap-2 text-sm font-bold text-[#133827] pt-4 border-t border-[#E8E1D5]">
            <Shield className="w-5 h-5 text-[#C9A857]" />
            <span>امنیت بسته‌های ارسالی پستی</span>
          </div>
          <p>
            بسته‌بندی‌های تحویل فیزیکی طلا فاقد هرگونه نشان خارجی از محتوای طلا یا ارزش بسته بوده و به صورت کاملاً محرمانه توسط مأمورین امین شرکت پست به گیرنده تحویل می‌شود.
          </p>
        </div>
      </div>
    </div>
  );
}