'use client';

import { useState, useEffect, useRef } from 'react';
import { TrendingUp, TrendingDown, Clock, Activity } from 'lucide-react';
import { toPersianDigits, formatNumber } from '@/lib/utils/format';

interface PriceCardProps {
  referencePriceToman: number;
  buyPriceToman: number;
  sellPriceToman: number;
  changeToman: number;
  changePct: number;
  isMarketOpen: boolean;
  lastUpdated: string;
}

export function PriceCard({
  referencePriceToman,
  buyPriceToman,
  sellPriceToman,
  changeToman,
  changePct,
  isMarketOpen,
  lastUpdated,
}: PriceCardProps) {
  const [flashClass, setFlashClass] = useState('');
  const prevPrice = useRef(referencePriceToman);

  useEffect(() => {
    if (referencePriceToman > prevPrice.current) {
      setFlashClass('animate-price-up');
    } else if (referencePriceToman < prevPrice.current) {
      setFlashClass('animate-price-down');
    }
    prevPrice.current = referencePriceToman;
    const timer = setTimeout(() => setFlashClass(''), 600);
    return () => clearTimeout(timer);
  }, [referencePriceToman]);

  const isPositive = changeToman >= 0;

  return (
    <div className={`card-surface p-5 ${flashClass}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-gold-500" />
          <span className="text-sm font-semibold text-text-primary">
            طلای ۱۸ عیار
          </span>
        </div>
        <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
          isMarketOpen
            ? 'bg-success-light text-success'
            : 'bg-bg-secondary text-text-muted'
        }`}>
          <Activity className="h-3 w-3" />
          {isMarketOpen ? 'بازار باز' : 'بازار بسته'}
        </div>
      </div>

      {/* Reference Price */}
      <div className="mb-4">
        <p className="text-xs text-text-muted mb-1">قیمت هر گرم</p>
        <p className="text-2xl font-bold font-num text-text-primary">
          {formatNumber(referencePriceToman)}
          <span className="text-sm font-normal text-text-muted mr-1">تومان</span>
        </p>
      </div>

      {/* Change */}
      <div className={`flex items-center gap-1 text-sm font-medium mb-5 ${
        isPositive ? 'text-success' : 'text-danger'
      }`}>
        {isPositive ? (
          <TrendingUp className="h-4 w-4" />
        ) : (
          <TrendingDown className="h-4 w-4" />
        )}
        <span className="font-num">
          {isPositive ? '+' : ''}{formatNumber(changeToman)}
        </span>
        <span className="font-num text-xs">
          ({isPositive ? '+' : ''}{toPersianDigits(changePct.toFixed(2))}٪)
        </span>
      </div>

      {/* Buy/Sell Prices */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-success-light/50 p-3">
          <p className="text-xs text-text-muted mb-1">قیمت خرید ملک طلا</p>
          <p className="text-sm font-bold font-num text-success">
            {formatNumber(buyPriceToman)}
            <span className="text-xs font-normal mr-0.5">ت</span>
          </p>
        </div>
        <div className="rounded-lg bg-danger-light/50 p-3">
          <p className="text-xs text-text-muted mb-1">قیمت فروش ملک طلا</p>
          <p className="text-sm font-bold font-num text-danger">
            {formatNumber(sellPriceToman)}
            <span className="text-xs font-normal mr-0.5">ت</span>
          </p>
        </div>
      </div>

      {/* Last Updated */}
      <div className="mt-4 flex items-center gap-1 text-xs text-text-muted">
        <Clock className="h-3 w-3" />
        <span>آخرین بهروزرسانی: {lastUpdated}</span>
      </div>
    </div>
  );
}
