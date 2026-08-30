import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpLeft, Shield, Clock, Mail } from 'lucide-react';
import { InstagramIcon } from '@/components/ui/icons';
import { siteConfig } from '@/config/site';

const footerLinks = {
  products: [
    { label: 'شمش طلای ۲۴ عیار استاندار', href: '/store' },
    { label: 'سکه تمام بهار آزادی', href: '/store' },
    { label: 'سکه طرح جدید (امامی)', href: '/store' },
    { label: 'پلاک و آویز زرین فاخر', href: '/store' },
    { label: 'تابلوی کامل نرخ‌ها', href: '/prices' },
  ],
  services: [
    { label: 'خرید آنی طلای آب‌شده', href: '/buy' },
    { label: 'فروش و تسویه فوری', href: '/sell' },
    { label: 'طرح‌های پس‌انداز دوره‌ای', href: '/savings' },
    { label: 'تحویل فیزیکی بیمه‌شده', href: '/delivery' },
    { label: 'مشاوره سفارشات اختصاصی', href: '/contact' },
  ],
  company: [
    { label: 'درباره گالری ملک', href: '/about' },
    { label: 'اینستاگرام رسمی', href: siteConfig.instagramUrl, external: true },
    { label: 'استانداردهای عیارسنجی ری‌گیری', href: '/about' },
    { label: 'سوالات متداول', href: '/faq' },
    { label: 'تماس با کارشناسان گالری', href: '/contact' },
  ],
  legal: [
    { label: 'قوانین و مقررات پلتفرم', href: '/terms' },
    { label: 'حریم خصوصی کاربران', href: '/privacy' },
    { label: 'منشور افشای ریسک', href: '/risk-disclosure' },
    { label: 'دستورالعمل تحویل و بیمه', href: '/delivery-policy' },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-[#163E2D] bg-gradient-to-b from-[#06140D] via-[#0B0C12] to-[#000000] text-[#FAF8F5] pt-24 pb-12 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">

        {/* Top Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-16 border-b border-white/10">
          <div className="flex items-start gap-4">
            <div className="p-3.5 rounded-2xl bg-[#0A2218] border border-white/10 text-[#D4AF37]">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#FAF8F5] mb-1">اصالت تضمین‌شده شمش و مسکوکات</h4>
              <p className="text-xs text-[#C5BFB4] leading-relaxed">
                تمام محصولات گالری ملک دارای کد شناسه رهگیری و عیار استاندارد ملی هستند.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3.5 rounded-2xl bg-[#0A2218] border border-white/10 text-[#D4AF37]">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#FAF8F5] mb-1">تسویه آنی و شفاف ۲۴/۷</h4>
              <p className="text-xs text-[#C5BFB4] leading-relaxed">
                واریز آنی موجودی فروش به کارت‌های بانکی عضو شبکه شتاب در ۲۴ ساعت شبانه‌روز.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3.5 rounded-2xl bg-[#0A2218] border border-white/10 text-[#D4AF37]">
              <InstagramIcon className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#FAF8F5] mb-1">فضای زنده اینستاگرام</h4>
              <p className="text-xs text-[#C5BFB4] leading-relaxed">
                مشاهده روزانه جدیدترین آثار، استوری‌های کارگاهی و تحلیل بازار در <a href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-[#E3CCAE] hover:underline font-bold">@malektalaa</a>.
              </p>
            </div>
          </div>
        </div>

        {/* Main Links Grid */}
        <div className="py-20 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">
          {/* Brand & Manifesto */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3 mb-4">
              <Image 
                src="/images/malek_logo_transparent.png" 
                alt="MALEK" 
                width={48} 
                height={48} 
                className="w-10 h-10 sm:w-12 sm:h-12 object-contain" 
              />
              <div className="flex flex-col">
                <span className="text-xl tracking-brand font-bold text-[#FAF8F5]">
                  MALEK
                </span>
                <span className="text-[10px] text-[#E3CCAE] tracking-widest font-light">
                  گالری طلا و جواهر ملک
                </span>
              </div>
            </Link>
            <p className="text-xs text-[#C5BFB4] leading-relaxed mb-6 font-light max-w-xs">
              گالری و خانه تخصصی طلا، مسکوکات بانکی و شمش‌های استاندارد با اصالت تضمین‌شده و شفافیت مطلق بازار.
            </p>
            <div className="flex flex-col gap-2.5 text-xs text-[#C5BFB4]">
              <a href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-[#E3CCAE] transition-colors">
                <InstagramIcon className="w-3.5 h-3.5 text-[#C9A857]" />
                <span className="font-mono">instagram.com/malektalaa</span>
              </a>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#C9A857]" />
                <span>{siteConfig.contact.email}</span>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-xs tracking-brand font-semibold text-[#E3CCAE] mb-6">
              مجموعه‌ها
            </h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs text-[#C5BFB4] hover:text-[#FAF8F5] transition-colors duration-300 flex items-center justify-between group"
                  >
                    <span>{link.label}</span>
                    <ArrowUpLeft className="w-3 h-3 text-[#C9A857] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs tracking-brand font-semibold text-[#E3CCAE] mb-6">
              خدمات مالی
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs text-[#C5BFB4] hover:text-[#FAF8F5] transition-colors duration-300 flex items-center justify-between group"
                  >
                    <span>{link.label}</span>
                    <ArrowUpLeft className="w-3 h-3 text-[#C9A857] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs tracking-brand font-semibold text-[#E3CCAE] mb-6">
              گالری ملک
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="text-xs text-[#C5BFB4] hover:text-[#FAF8F5] transition-colors duration-300 flex items-center justify-between group"
                  >
                    <span>{link.label}</span>
                    <ArrowUpLeft className="w-3 h-3 text-[#C9A857] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs tracking-brand font-semibold text-[#E3CCAE] mb-6">
              قوانین و شفافیت
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs text-[#C5BFB4] hover:text-[#FAF8F5] transition-colors duration-300 flex items-center justify-between group"
                  >
                    <span>{link.label}</span>
                    <ArrowUpLeft className="w-3 h-3 text-[#C9A857] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Monumental Footer Brand Typography */}
        <div className="py-12 border-t border-b border-white/10 flex justify-center items-center overflow-hidden">
          <span className="text-[clamp(3.2rem,13vw,13rem)] font-extrabold tracking-[0.16em] text-white/5 select-none pointer-events-none leading-none">
            MALEK
          </span>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#C5BFB4]">
          <p>© تمامی حقوق برای گالری و مجموعه ملک (MALEK) محفوظ است.</p>
          <div className="flex items-center gap-3">
            <span className="diamond-motif !w-1.5 !h-1.5" />
            <span>پلتفرم رسمی طلا و مسکوکات با پشتوانه ۱۰۰٪ شمش فیزیکی</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
