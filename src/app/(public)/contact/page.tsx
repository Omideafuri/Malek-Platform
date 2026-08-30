import type { Metadata } from 'next';
import { Mail, Phone, MapPin, Send, Sparkles, MessageCircle } from 'lucide-react';
import { InstagramIcon } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'ارتباط با گالری ملک طلا',
  description: 'راه‌های ارتباط با پشتیبانی و گالری ملک طلا: تلفن، اینستاگرام، ایمیل و میز مشاوره اختصاصی سرمایه‌گذاران.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#141210] selection:bg-[#C9A857] selection:text-white pt-28 pb-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E8E1D5] text-xs text-[#133827] mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A857]" />
            <span>پشتیبانی و ارتباط مستقیم</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#141210] tracking-tight">ارتباط با خانه و گالری ملک طلا</h1>
          <p className="text-xs sm:text-sm text-[#4A463F] mt-2 font-light max-w-lg mx-auto">
            کارشناسان مدیریت دارایی و مشاوران گالری ملک طلا در تمامی روزهای هفته آماده پاسخگویی به شما هستند.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Info Card */}
          <div className="lg:col-span-5 bg-[#133827] text-white rounded-3xl p-8 border border-white/15 shadow-2xl space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#C9A857]/20 rounded-full blur-2xl pointer-events-none" />
            
            <div className="relative z-10">
              <span className="text-xs tracking-brand text-[#E3CCAE] uppercase block mb-2">میز پشتیبانی VIP</span>
              <h2 className="text-2xl font-bold text-white mb-2">همواره در کنار شما</h2>
              <p className="text-xs text-[#C5BFB4] font-light leading-relaxed">
                مشاوران ما برای سفارش‌های اختصاصی، خریدهای با حجم بالا و هماهنگی‌های تحویل فیزیکی شمش و مسکوکات پاسخگوی شما هستند.
              </p>
            </div>

            <div className="relative z-10 space-y-4 text-xs">
              <a 
                href={siteConfig.instagramUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#0A2218] border border-white/10 hover:border-[#C9A857] transition-colors"
              >
                <InstagramIcon className="h-5 w-5 text-[#C9A857] flex-shrink-0" />
                <div>
                  <span className="text-[10px] text-[#C5BFB4] block">پیج رسمی اینستاگرام</span>
                  <span className="font-mono text-xs font-bold text-white">@malektalaa</span>
                </div>
              </a>

              <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#0A2218] border border-white/10">
                <Phone className="h-5 w-5 text-[#C9A857] flex-shrink-0" />
                <div>
                  <span className="text-[10px] text-[#C5BFB4] block">تلفن پشتیبانی مرکزی</span>
                  <span className="font-num text-sm font-bold text-white" dir="ltr">{siteConfig.contact.phone}</span>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#0A2218] border border-white/10">
                <Mail className="h-5 w-5 text-[#C9A857] flex-shrink-0" />
                <div>
                  <span className="text-[10px] text-[#C5BFB4] block">پست الکترونیکی رسمی</span>
                  <span className="font-mono text-xs text-white">{siteConfig.contact.email}</span>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#0A2218] border border-white/10">
                <MapPin className="h-5 w-5 text-[#C9A857] flex-shrink-0" />
                <div>
                  <span className="text-[10px] text-[#C5BFB4] block">دفتر مرکزی و خزانه</span>
                  <span className="text-xs text-white leading-relaxed">تهران، خیابان ولیعصر، برج بین‌المللی طلای ایران</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-[#E8E1D5] shadow-xs">
            <h3 className="text-base font-bold text-[#141210] mb-6">ارسال پیام یا درخواست مشاوره اختصاصی</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#141210] mb-1.5">نام و نام خانوادگی</label>
                <input 
                  type="text" 
                  className="w-full rounded-2xl border border-[#E8E1D5] bg-[#FAF8F5] px-4 py-3 text-xs outline-none focus:border-[#C9A857] focus:bg-white transition-all" 
                  required 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#141210] mb-1.5">شماره موبایل</label>
                  <input 
                    type="tel" 
                    dir="ltr"
                    className="w-full rounded-2xl border border-[#E8E1D5] bg-[#FAF8F5] px-4 py-3 font-num text-left text-xs outline-none focus:border-[#C9A857] focus:bg-white transition-all" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#141210] mb-1.5">موضوع</label>
                  <input 
                    type="text" 
                    className="w-full rounded-2xl border border-[#E8E1D5] bg-[#FAF8F5] px-4 py-3 text-xs outline-none focus:border-[#C9A857] focus:bg-white transition-all" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#141210] mb-1.5">متن پیام یا مشخصات سفارش</label>
                <textarea 
                  rows={4} 
                  className="w-full rounded-2xl border border-[#E8E1D5] bg-[#FAF8F5] px-4 py-3 text-xs outline-none focus:border-[#C9A857] focus:bg-white resize-none transition-all"
                  required
                />
              </div>

              <Button 
                variant="primary" 
                className="w-full py-4 rounded-full text-xs font-bold shadow-gold-glow flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>ارسال پیام به کارشناس گالری</span>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}