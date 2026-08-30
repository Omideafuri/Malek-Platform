'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { dashboardNavItems } from '@/config/navigation';
import { logoutAction } from '@/app/(auth)/actions';

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 border-l border-white/10 bg-[#133827] text-[#FAF8F5] shadow-2xl z-30">
      {/* Logo Area */}
      <div className="flex h-20 items-center justify-between px-6 border-b border-white/10 bg-[#0A2218]/50">
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="diamond-motif !w-2 !h-2 group-hover:rotate-90 transition-transform duration-500 shadow-xs" />
          <div className="flex flex-col">
            <span className="text-sm tracking-brand font-bold text-white group-hover:text-[#E3CCAE] transition-colors leading-tight">
              MALEK TALAA
            </span>
            <span className="text-[9px] text-[#E3CCAE]">ملک طلا</span>
          </div>
        </Link>
        <span className="text-[10px] tracking-brand px-2 py-0.5 rounded-full bg-white/10 text-[#E3CCAE] font-mono border border-white/10">
          ATELIER
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto py-6 px-3.5 space-y-1">
        <div className="px-3 pb-2">
          <span className="text-[10px] tracking-brand font-semibold text-[#C5BFB4] uppercase block">
            میز معاملات و دارایی‌ها
          </span>
        </div>
        <ul className="space-y-1">
          {dashboardNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all duration-300 group ${
                    isActive
                      ? 'bg-[#0A2218] text-[#FAF8F5] border border-[#C9A857]/40 shadow-xs'
                      : 'text-[#C5BFB4] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon
                      className={`h-4 w-4 flex-shrink-0 transition-colors ${
                        isActive ? 'text-[#C9A857]' : 'text-[#C5BFB4] group-hover:text-[#E3CCAE]'
                      }`}
                    />
                    <span>{item.titleFa}</span>
                  </div>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9A857] shadow-gold-glow" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Account & Logout */}
      <div className="border-t border-white/10 p-4 bg-[#0A2218]/60">
        <form action={logoutAction}>
          <button
            type="submit"
            className="flex items-center gap-2.5 w-full px-3.5 py-2 rounded-xl text-xs text-[#C5BFB4] hover:text-[#FAF8F5] hover:bg-white/10 transition-colors duration-300 cursor-pointer"
          >
            <LogOut className="h-4 w-4 text-[#C9A857]" />
            <span>خروج از حساب کاربری</span>
          </button>
        </form>
      </div>
    </aside>
  );
}
