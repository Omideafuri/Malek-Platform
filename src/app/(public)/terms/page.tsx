import type { Metadata } from 'next';
import { ShieldCheck, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'قوانین و مقررات — ملک طلا',
  description: 'قوانین و مقررات استفاده از پلتفرم ملک طلا برای خرید، فروش و نگهداری طلا و مسکوکات.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#141210] selection:bg-[#C9A857] selection:text-white pt-28 pb-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E8E1D5] text-xs text-[#133827] mb-4 shadow-xs">
            <FileText className="w-3.5 h-3.5 text-[#C9A857]" />
            <span>شرایط و ضوابط رسمی</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#141210] tracking-tight">قوانین و مقررات ملک طلا</h1>
          <p className="text-xs sm:text-sm text-[#4A463F] mt-2 font-light max-w-lg mx-auto">
            مقررات حاکم بر خرید، نگهداری در خزانه و تحویل فیزیکی طلای ۱۸ و ۲۴ عیار
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E8E1D5] shadow-xs space-y-6 text-xs sm:text-sm text-[#4A463F] leading-relaxed">
          <div className="flex items-center gap-2 text-sm font-bold text-[#133827]">
            <ShieldCheck className="w-5 h-5 text-[#C9A857]" />
            <span>ماده ۱: احراز هویت و انطباق قانونی</span>
          </div>
          <p>
            طبق ضوابط بانک مرکزی و دستورالعمل‌های مبارزه با پولشویی (AML)، انجام هرگونه معامله و تحویل فیزیکی منوط به تطابق کد ملی کاربر با اطلاعات حساب بانکی و مالکیت شماره تلفن همراه است.
          </p>

          <div className="flex items-center gap-2 text-sm font-bold text-[#133827] pt-4 border-t border-[#E8E1D5]">
            <ShieldCheck className="w-5 h-5 text-[#C9A857]" />
            <span>ماده ۲: استانداردهای خلوص و عیارسنجی</span>
          </div>
          <p>
            کلیه محصولات فیزیکی اعم از شمش و مسکوکات با گواهی رسمی ری‌گیری، هولوگرام ضدجعل و وکیوم امنیتی تحویل می‌گردند. مجموعه ملک طلا اصالت ۱۰۰٪ فیزیکی دارایی‌های ثبت‌شده در خزانه را تضمین می‌نماید.
          </p>

          <div className="flex items-center gap-2 text-sm font-bold text-[#133827] pt-4 border-t border-[#E8E1D5]">
            <ShieldCheck className="w-5 h-5 text-[#C9A857]" />
            <span>ماده ۳: تسویه حساب و تحویل مرسولات</span>
          </div>
          <p>
            تسویه ریالی فروش طلای دیجیتال به صورت لحظه‌ای در کیف پول اعمال شده و انتقال به حساب بانکی طبق چرخه‌های پایا انجام خواهد شد. ارسال فیزیکی شمش‌ها صرفاً از طریق پست بیمه‌شده و با احراز هویت در محل تحویل صورت می‌پذیرد.
          </p>
        </div>
      </div>
    </div>
  );
}