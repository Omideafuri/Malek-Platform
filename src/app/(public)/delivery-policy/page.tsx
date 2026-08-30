import type { Metadata } from 'next';
import { Truck, ShieldCheck, Package } from 'lucide-react';

export const metadata: Metadata = {
  title: 'دستورالعمل تحویل و بیمه — ملک طلا',
  description: 'دستورالعمل ارسال بیمه‌شده و تحویل فیزیکی شمش و مسکوکات در گالری ملک طلا.',
};

export default function DeliveryPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#141210] selection:bg-[#C9A857] selection:text-white pt-28 pb-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E8E1D5] text-xs text-[#133827] mb-4 shadow-xs">
            <Truck className="w-3.5 h-3.5 text-[#C9A857]" />
            <span>دستورالعمل تحویل محرمانه</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#141210] tracking-tight">سیاست‌های تحویل فیزیکی ملک طلا</h1>
          <p className="text-xs sm:text-sm text-[#4A463F] mt-2 font-light max-w-lg mx-auto">
            مراحل بسته‌بندی امنیتی، وکیوم ضدجعل و پست بیمه‌شده شمش و مسکوکات در سراسر کشور
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E8E1D5] shadow-xs space-y-6 text-xs sm:text-sm text-[#4A463F] leading-relaxed">
          <div className="flex items-center gap-2 text-sm font-bold text-[#133827]">
            <ShieldCheck className="w-5 h-5 text-[#C9A857]" />
            <span>احراز هویت در زمان تحویل</span>
          </div>
          <p>
            جهت حفظ امنیت دارایی‌های مشتریان، تحویل مرسولات طلای فیزیکی صرفاً به شخص صاحب حساب با ارائه اصل کارت ملی و تطابق با امضای دیجیتال مقدور خواهد بود.
          </p>

          <div className="flex items-center gap-2 text-sm font-bold text-[#133827] pt-4 border-t border-[#E8E1D5]">
            <Package className="w-5 h-5 text-[#C9A857]" />
            <span>پوشش بیمه تمام‌خطر مرسولات</span>
          </div>
          <p>
            تمامی بسته‌ها از مبدأ خزانه مرکزی ملک طلا تا لحظه تحویل به دست گیرنده تحت پوشش کامل بیمه حوادث و مفقودی شرکت‌های معتبر بیمه کشور قرار دارند.
          </p>
        </div>
      </div>
    </div>
  );
}