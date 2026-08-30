import React from 'react';
import { cn } from '@/lib/utils';

export interface TerminalCardProps {
  children: React.ReactNode;
  className?: string;
}

export function TerminalCard({ children, className }: TerminalCardProps) {
  return (
    <div
      className={cn(
        'bg-[#133827] text-[#FAF8F5] rounded-3xl p-8 md:p-14 border border-white/15 shadow-2xl relative overflow-hidden',
        className
      )}
    >
      {/* Background Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#C9A857]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
