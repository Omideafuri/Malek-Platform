import { FileText } from 'lucide-react';

export default function AdminAuditPage() {
  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="diamond-motif !w-2 !h-2" />
          <span className="text-xs tracking-brand font-semibold text-[#7D776C]">لاگ‌های حسابرسی</span>
        </div>
        <h1 className="text-2xl font-bold text-[#141210] tracking-tight">ردیابی و لاگ‌های امنیتی سیستم</h1>
        <p className="text-xs sm:text-sm text-[#4A463F] mt-1 font-light">
          ثبت لاگ‌های ورود، تغییرات وضعیت احراز هویت، اصلاحات قیمت و تراکنش‌های حساس
        </p>
      </div>

      <div className="bg-white rounded-3xl p-12 text-center border border-[#E8E1D5] shadow-xs space-y-3">
        <div className="w-14 h-14 rounded-2xl bg-[#FAF8F5] border border-[#E8E1D5] mx-auto flex items-center justify-center text-[#C9A857]">
          <FileText className="h-7 w-7" />
        </div>
        <h2 className="text-lg font-bold text-[#133827]">سامانه ثبت رویدادهای امنیتی</h2>
        <p className="text-xs text-[#4A463F] max-w-md mx-auto font-light">
          کلیه رخدادهای حساس با آدرس IP، شناسه کاربر و زمان دقیق در دیتابیس ثبت و بایگانی می‌گردند.
        </p>
      </div>
    </div>
  );
}