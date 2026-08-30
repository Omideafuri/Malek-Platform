'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ArrowLeft } from 'lucide-react';
import { logoutAction } from '@/app/(auth)/actions';
import { siteConfig } from '@/config/site';

type UserType = {
  id: string;
  role: string;
  profile?: { firstName: string | null; lastName: string | null } | null;
} | null;

const editorialNavItems = [
  { label: 'صفحه اصلی', href: '/' },
  { label: 'نرخ لحظه‌ای', href: '/prices' },
  { label: 'ویترین مسکوکات و شمش', href: '/store' },
  { label: 'درباره گالری ملک', href: '/about' },
  { label: 'اینستاگرام', href: siteConfig.instagramUrl, external: true },
  { label: 'تماس و مشاوره VIP', href: '/contact' },
];

export function Header({ user }: { user?: UserType }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
          isScrolled
            ? 'bg-[#06140D]/92 backdrop-blur-md border-b border-white/10 py-3.5 shadow-forest-glow'
            : 'bg-transparent border-b border-transparent py-6'
        }`}
      >
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 md:px-10">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="relative z-10 flex items-center gap-2.5 sm:gap-3 group">
              <Image 
                src="/images/malek_logo_transparent.png" 
                alt="MALEK" 
                width={40} 
                height={40} 
                className="w-8 h-8 sm:w-10 sm:h-10 object-contain drop-shadow-md transition-transform duration-500 group-hover:scale-105" 
              />
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl tracking-brand font-bold text-white group-hover:text-[#E3CCAE] transition-colors leading-tight">
                  MALEK
                </span>
                <span className="text-[9px] text-[#E3CCAE] tracking-widest font-light">
                  گالری ملک •
                </span>
              </div>
            </Link>

            {/* Desktop Navigation — Center Glass Pill */}
            <nav className="hidden lg:flex items-center gap-8 bg-[#133827]/80 backdrop-blur-md border border-white/15 px-8 py-2.5 rounded-full shadow-subtle">
              {editorialNavItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  className={`text-xs font-medium transition-colors duration-300 relative py-1 flex items-center gap-1.5 ${
                    item.external 
                      ? 'text-[#E3CCAE] hover:text-white font-semibold' 
                      : 'text-[#E3CCAE] hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions — Left (RTL layout) */}
            <div className="hidden lg:flex items-center gap-3">
              {user ? (
                <div className="flex items-center gap-3">
                  <Link
                    href="/dashboard"
                    className="text-xs font-medium bg-[#C9A857] text-white px-6 py-2.5 rounded-full hover:bg-[#9E5214] transition-all duration-300 flex items-center gap-2 shadow-gold-glow"
                  >
                    <span>داشبورد</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </Link>
                  <form action={logoutAction}>
                    <button
                      type="submit"
                      className="text-xs text-[#C5BFB4] hover:text-white transition-colors duration-300 px-2 py-1 cursor-pointer"
                    >
                      خروج
                    </button>
                  </form>
                </div>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-xs font-medium text-[#E3CCAE] hover:text-white transition-colors duration-300 px-4 py-2"
                  >
                    ورود
                  </Link>
                  <Link
                    href="/register"
                    className="text-xs font-medium bg-[#C9A857] text-white px-6 py-2.5 rounded-full hover:bg-[#9E5214] transition-all duration-300 flex items-center gap-2 shadow-gold-glow"
                  >
                    <span>افتتاح حساب</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden relative z-10 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-[#E3CCAE] bg-[#133827]/90 shadow-xs"
              aria-label={isMobileMenuOpen ? 'بستن منو' : 'باز کردن منو'}
            >
              {isMobileMenuOpen ? (
                <X className="h-4 w-4 text-white" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Immersive Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-[#0A2218]/98 backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] lg:hidden ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col justify-center items-center min-h-screen px-8">
          <nav className="flex flex-col items-center gap-8 stagger-children">
            {editorialNavItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-bold text-[#E3CCAE] hover:text-white transition-colors duration-300"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-14 flex flex-col items-center gap-3.5 w-full max-w-xs">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center bg-[#C9A857] text-white py-3.5 text-xs font-medium rounded-full hover:bg-[#9E5214] transition-colors shadow-gold-glow"
                >
                  ورود به داشبورد
                </Link>
                <form action={logoutAction} className="w-full">
                  <button
                    type="submit"
                    className="w-full text-center border border-white/20 text-[#C5BFB4] py-3.5 text-xs rounded-full hover:text-white transition-colors cursor-pointer"
                  >
                    خروج از حساب
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link
                  href="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center bg-[#C9A857] text-white py-3.5 text-xs font-medium rounded-full hover:bg-[#9E5214] transition-colors shadow-gold-glow"
                >
                  ساخت حساب رایگان
                </Link>
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center border border-[#E3CCAE] text-[#E3CCAE] py-3.5 text-xs rounded-full hover:bg-[#E3CCAE] hover:text-[#133827] transition-colors"
                >
                  ورود به حساب
                </Link>
              </>
            )}
          </div>

          <div className="mt-14 flex items-center gap-4">
            <div className="w-8 h-px bg-white/20" />
            <span className="diamond-motif" />
            <div className="w-8 h-px bg-white/20" />
          </div>
        </div>
      </div>
    </>
  );
}
