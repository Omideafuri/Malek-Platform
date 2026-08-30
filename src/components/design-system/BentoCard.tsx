import React from 'react';
import { cn } from '@/lib/utils';

export interface BentoCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  tag?: string;
  className?: string;
}

export function BentoCard({
  title,
  description,
  icon,
  tag,
  className,
}: BentoCardProps) {
  return (
    <div
      className={cn(
        'bg-white p-8 rounded-3xl border border-[#E8E1D5] shadow-xs hover:border-[#C9A857]/40 hover:shadow-md transition-all duration-500 flex flex-col justify-between',
        className
      )}
    >
      <div>
        <div className="w-12 h-12 rounded-2xl bg-[#F4EFE6] flex items-center justify-center text-[#133827] mb-6 border border-[#E8E1D5]">
          {icon}
        </div>

        {tag && (
          <span className="text-[10px] tracking-brand font-bold text-[#C9A857] block mb-1 uppercase">
            {tag}
          </span>
        )}

        <h3 className="text-lg font-bold text-[#141210] mb-2">{title}</h3>

        <p className="text-xs text-[#4A463F] leading-relaxed font-light">
          {description}
        </p>
      </div>
    </div>
  );
}
