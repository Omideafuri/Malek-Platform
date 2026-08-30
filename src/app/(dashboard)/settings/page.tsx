import { Shield, Bell, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SettingsPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 pt-4 pb-16">
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="diamond-motif !w-2 !h-2" />
          <span className="text-xs tracking-brand font-semibold text-[#7D776C]">پیکربندی حساب</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#141210] tracking-tight">تنظیمات حساب کاربری</h1>
        <p className="text-xs sm:text-sm text-[#4A463F] mt-1 font-light">
          مدیریت لایه‌های امنیتی، رمز عبور، کانال‌های دریافت پیامک و ترجیحات شخصی
        </p>
      </div>

      <div className="space-y-4">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E1D5] shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-2xl bg-[#FAF8F5] border border-[#E8E1D5] flex items-center justify-center text-[#133827]">
              <Lock className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#141210]">تغییر رمز عبور</h3>
              <p className="text-xs text-[#7D776C] font-light">رمز عبور ورود به پنل کاربری</p>
            </div>
          </div>
          <Button variant="outline" className="rounded-full text-xs font-semibold px-5">
            ویرایش
          </Button>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E1D5] shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-2xl bg-[#FAF8F5] border border-[#E8E1D5] flex items-center justify-center text-[#133827]">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#141210]">ورود دو مرحله‌ای (2FA)</h3>
              <p className="text-xs text-[#7D776C] font-light">ارسال پیامک تأیید در هر ورود به حساب</p>
            </div>
          </div>
          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full">
            فعال
          </span>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E1D5] shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-2xl bg-[#FAF8F5] border border-[#E8E1D5] flex items-center justify-center text-[#133827]">
              <Bell className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#141210]">پیامک‌های تراکنش و معاملات</h3>
              <p className="text-xs text-[#7D776C] font-light">اطلاع‌رسانی آنی خرید، فروش و واریز وجه</p>
            </div>
          </div>
          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full">
            فعال
          </span>
        </div>
      </div>
    </div>
  );
}