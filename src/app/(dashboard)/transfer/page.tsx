import type { Metadata } from 'next';
import { ArrowLeftRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'انتقال طلای دیجیتال',
};

export default function TransferPage() {
  return (
    <div className="max-w-xl mx-auto space-y-6 pt-4 pb-16">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="diamond-motif !w-2 !h-2" />
          <span className="text-xs tracking-brand font-semibold text-[#7D776C]">انتقال داخلی دارایی</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#141210] tracking-tight">انتقال طلای دیجیتال</h1>
        <p className="text-xs sm:text-sm text-[#4A463F] mt-1 font-light">انتقال آنی طلا با شماره همراه به کیف پول سایر اعضای ملک طلا</p>
      </div>

      <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-[#E8E1D5] shadow-xs space-y-5">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FAF8F5] border border-[#E8E1D5] mx-auto text-[#C9A857]">
          <ArrowLeftRight className="h-8 w-8" />
        </div>
        <div>
          <span className="text-[10px] tracking-brand font-bold text-[#C9A857] block mb-1">نسخه آزمایشی شبکه</span>
          <h2 className="text-xl font-bold text-[#133827]">زیرساخت انتقال همتا به همتا</h2>
        </div>
        <p className="text-xs sm:text-sm text-[#4A463F] max-w-md mx-auto leading-relaxed font-light">
          پروتکل انتقال امن طلای دیجیتال ملک طلا به زودی با قابلیت ایجاد فاکتور، هدیه طلایی و انتقال آنی فعال خواهد شد.
        </p>
        <div className="pt-2">
          <Button variant="outline" className="px-8 py-3 rounded-full text-xs font-semibold" disabled>
            به‌زودی در دسترس خواهد بود
          </Button>
        </div>
      </div>
    </div>
  );
}