import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
  return (
    <div className="w-full space-y-6">
      <div className="text-center mb-6">
        <span className="text-xs tracking-brand font-semibold text-[#C9A857] block mb-1.5 uppercase">بازیابی دسترسی</span>
        <h2 className="text-2xl font-bold text-[#141210] tracking-tight">بازیابی رمز عبور</h2>
        <p className="mt-2 text-xs text-[#4A463F] font-light">شماره موبایل حساب خود را برای دریافت پیامک بازیابی وارد نمایید</p>
      </div>
      <form className="space-y-4">
        <div>
          <label htmlFor="forgot-mobile" className="block text-xs font-bold text-[#141210] mb-1.5">شماره موبایل</label>
          <input
            id="forgot-mobile"
            type="tel"
            dir="ltr" 
            placeholder="09123456789" 
            className="w-full rounded-2xl border border-[#E8E1D5] bg-[#FAF8F5] px-4 py-3 text-xs font-num placeholder:text-[#7D776C] focus:border-[#C9A857] focus:bg-white outline-none transition-all" 
          />
        </div>
        <Button variant="primary" className="w-full py-4 rounded-full text-xs font-bold shadow-gold-glow flex items-center justify-center gap-2">
          <span>ارسال کد تأیید بازیابی</span>
          <ArrowLeft className="w-4 h-4" />
        </Button>
      </form>
      <div className="text-center pt-4 border-t border-[#E8E1D5]">
        <Link href="/login" className="text-xs font-bold text-[#133827] hover:text-[#C9A857] transition-colors">
          بازگشت به صفحه ورود
        </Link>
      </div>
    </div>
  );
}