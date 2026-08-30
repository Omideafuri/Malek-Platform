import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { ArrowLeft } from 'lucide-react';
import { InstagramIcon } from '@/components/ui/icons';

export const metadata: Metadata = {
  title: 'درباره گالری ملک طلا — اصالت، هنر زرگری و مهندسی ارزش',
  description: 'داستان پیدایش ملک طلا، استانداردهای ساخت، پیج رسمی اینستاگرام و منشور شفافیت در نگهداری طلای فیزیکی.',
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] text-[#141210] selection:bg-[#C9A857] selection:text-white pt-20">

      {/* Hero Statement (Deep Midnight Lapis #133827) */}
      <section className="section-editorial px-6 md:px-10 bg-atmospheric-forest text-white border-b border-white/10 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <span className="diamond-motif" />
            <span className="text-xs tracking-brand text-[#E3CCAE]">اصالت و منشور خانه ملک طلا</span>
          </div>

          <div className="max-w-4xl">
            <h1 className="text-[clamp(2.2rem,5vw,4.5rem)] font-bold text-white leading-[1.15] tracking-tight mb-8">
              پیوند میان خلوص هنر زرگری و شفافیت مدرن.
            </h1>
            <p className="text-base sm:text-xl text-[#C5BFB4] leading-relaxed font-light max-w-2xl">
              ملک طلا با تکیه بر سنت‌های اصیل طلاسازی و پیوند با فناوری مدرن دادوستد طلا، بستری امن و معتبر برای سرمایه‌گذاران و دوستداران طلا و مسکوکات پدید آورده است.
            </p>
          </div>
        </div>
      </section>

      {/* Image & Manifesto (Warm Champagne Canvas #FAF8F5) */}
      <section className="section-editorial px-6 md:px-10 bg-[#FAF8F5]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-[#E8E1D5] bg-white p-3 shadow-xl">
                <Image
                  src="/images/brand_story.jpg"
                  alt="فلسفه و اصالت ملک طلا"
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6 text-[#4A463F] leading-relaxed">
              <span className="text-xs tracking-brand font-bold text-[#C9A857] block uppercase">منشور ارزش‌ها</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#133827] tracking-tight">
                طلا؛ ذخیره ماندگار تلاش و زمان انسان
              </h2>
              <p className="text-sm sm:text-base font-light">
                در طول هزاره‌ها، طلا تنها استانداردی بوده که ارزش پایدار خود را حفظ کرده است. ما در ملک طلا این خلوص تاریخی را با قیمت‌گذاری لحظه‌ای، تسویه حساب آنی و دفاتر شفاف دارایی پیوند زده‌ایم.
              </p>
              <p className="text-sm sm:text-base font-light">
                هر میلی‌گرم طلایی که در حساب شما ثبت می‌شود، دارای پشتوانه فیزیکی کامل در خزانه‌های امن بانکی و تحت نظارت دقیق است.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Craftsmanship Section (Deep Obsidian Black #000000) */}
      <section className="section-editorial px-6 md:px-10 bg-atmospheric-black text-white border-t border-white/10">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 lg:order-2">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/15 bg-[#14162B] p-3 shadow-2xl">
                <Image
                  src="/images/craftsmanship.jpg"
                  alt="استادکاری و ریخته‌گری در ملک طلا"
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>
            </div>

            <div className="lg:col-span-6 lg:order-1 space-y-6 text-[#C5BFB4] leading-relaxed font-light">
              <div className="flex items-center gap-3 mb-4">
                <span className="diamond-motif" />
                <span className="text-xs tracking-brand text-[#E3CCAE]">هنر و استانداردهای گالری</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
                تعهد به خلوص عیار ۷۵۰ و ۹۹۹.۹
              </h2>
              <p className="text-sm sm:text-base">
                از عیارسنجی در آزمایشگاه‌های معتمد ری‌گیری تا ضرب شمش‌های استاندارد با هولوگرام‌های سه‌بعدی و بسته‌بندی پلمپ امنیتی، تک‌تک مراحل تولید تحت سخت‌گیرانه‌ترین رویه‌های کیفی انجام می‌پذیرد.
              </p>
              <p className="text-sm sm:text-base">
                شما می‌توانید در هر ساعت از شبانه‌روز، معادل طلای حساب خود را با فشردن یک دکمه به فرم فیزیکی سفارش داده و با بسته‌بندی اختصاصی در محل مورد نظر تحویل بگیرید.
              </p>

              <div className="pt-6 flex flex-wrap gap-4">
                <Link href="/register">
                  <Button variant="primary" className="px-8 py-3.5 rounded-full text-xs font-semibold shadow-gold-glow flex items-center gap-2">
                    <span>شروع همراهی با ملک طلا</span>
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                </Link>
                <a
                  href={siteConfig.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3.5 rounded-full text-xs font-semibold transition-colors"
                >
                  <InstagramIcon className="w-4 h-4 text-[#E3CCAE]" />
                  <span>پیج اینستاگرام</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}