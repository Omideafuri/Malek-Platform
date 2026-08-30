import type { Metadata } from 'next';
import { BookOpen, Sparkles } from 'lucide-react';
import { InstagramIcon } from '@/components/ui/icons';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'گاهنامه و مجله ملک طلا',
  description: 'تحلیل‌های فاندامنتال بازار طلا، راهنمای نگهداری فلزات گرانبها و مقالات تخصصی معماری ثروت در ملک طلا.',
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#141210] selection:bg-[#C9A857] selection:text-white pt-28 pb-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E8E1D5] text-xs text-[#133827] mb-4 shadow-xs">
          <BookOpen className="w-3.5 h-3.5 text-[#C9A857]" />
          <span>مجلّه و تحلیل‌های گالری</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#141210] tracking-tight mb-3">گاهنامه زرین ملک طلا</h1>
        <p className="text-xs sm:text-sm text-[#4A463F] mb-12 font-light max-w-lg mx-auto">
          تحلیل‌های فاندامنتال بازار طلا، راهنمای نگهداری فلزات گرانبها و گزارش‌های زنده اینستاگرام
        </p>

        <div className="bg-white rounded-3xl p-12 sm:p-20 border border-[#E8E1D5] shadow-xs space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-[#FAF8F5] border border-[#E8E1D5] mx-auto flex items-center justify-center text-[#C9A857]">
            <Sparkles className="h-7 w-7" />
          </div>
          <h2 className="text-xl font-bold text-[#133827]">تحلیل‌های روزانه در پیج اینستاگرام</h2>
          <p className="text-xs sm:text-sm text-[#4A463F] max-w-md mx-auto leading-relaxed font-light">
            جدیدترین تحلیل‌های قیمت طلا، آموزش‌های تشخیص عیار و معرفی آثار فاخر زرگری روزانه در پیج رسمی منتشر می‌گردد.
          </p>
          <div className="pt-4">
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#133827] text-white px-6 py-3 rounded-full text-xs font-semibold hover:bg-[#0A2218] transition-colors"
            >
              <InstagramIcon className="w-4 h-4 text-[#E3CCAE]" />
              <span>مشاهده استوری‌ها و پست‌های آموزشی</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}