import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AspectImage } from './AspectImage';
import { PriceDisplay } from './Typography';

export interface ProductCardProps {
  id?: string;
  title: string;
  category: string;
  description: string;
  imageSrc: string;
  priceToman: number;
  href?: string;
  className?: string;
}

export function ProductCard({
  title,
  category,
  description,
  imageSrc,
  priceToman,
  href = '/store',
  className,
}: ProductCardProps) {
  return (
    <div
      className={cn(
        'group bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E1D5] flex flex-col justify-between hover:border-[#C9A857]/40 hover:shadow-xl transition-all duration-500',
        className
      )}
    >
      <div>
        <AspectImage
          src={imageSrc}
          alt={title}
          ratio="square"
          rounded="sm"
          className="mb-6 bg-[#FAF8F5] p-4 border border-[#E8E1D5]/60"
        />

        <span className="text-[10px] tracking-brand font-bold text-[#C9A857] block mb-1 uppercase">
          {category}
        </span>

        <h3 className="text-lg md:text-xl font-bold text-[#141210] mb-2 group-hover:text-[#133827] transition-colors">
          {title}
        </h3>

        <p className="text-xs text-[#4A463F] leading-relaxed mb-6 font-light">
          {description}
        </p>
      </div>

      <div className="pt-4 border-t border-[#E8E1D5] flex items-end justify-between">
        <PriceDisplay toman={priceToman} size="sm" />

        <Link
          href={href}
          className="inline-flex items-center gap-1 text-xs font-bold text-[#133827] hover:text-[#C9A857] transition-colors"
        >
          <span>خرید و تحویل</span>
          <ArrowLeft className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
