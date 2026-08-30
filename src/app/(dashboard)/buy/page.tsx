'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { buyGoldAction } from '../actions';
import { ShoppingCart, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function BuyGoldPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  
  const [mode, setMode] = useState<'BY_AMOUNT' | 'BY_WEIGHT'>('BY_AMOUNT');
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue || isNaN(Number(inputValue))) return;

    setError(null);
    startTransition(async () => {
      const formData = new FormData();
      formData.append('mode', mode);
      formData.append('value', mode === 'BY_AMOUNT' ? String(Number(inputValue) * 10) : String(Number(inputValue) * 1000000000));
      formData.append('idempotencyKey', window.crypto.randomUUID());
      
      const result = await buyGoldAction(formData);
      if (result.success) {
        router.push('/dashboard');
        router.refresh();
      } else {
        setError(result.error || 'خطایی رخ داد');
      }
    });
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 pt-4 pb-16">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="diamond-motif !w-2 !h-2" />
          <span className="text-xs tracking-brand font-semibold text-[#7D776C]">میز معاملات برخط</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#141210] tracking-tight">خرید آنلاین طلای ۱۸ عیار</h1>
        <p className="text-xs sm:text-sm text-[#4A463F] mt-1 font-light">
          خرید آنی با نرخ رسمی لحظه‌ای و واریز فوری به خزانه امن ملک طلا
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E1D5] shadow-xs">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-4 text-xs font-semibold text-rose-800 bg-rose-50 border border-rose-200 rounded-2xl text-center">
              {error}
            </div>
          )}

          {/* Mode Selector */}
          <div className="flex p-1 bg-[#FAF8F5] border border-[#E8E1D5] rounded-2xl gap-1">
            <button
              type="button"
              onClick={() => { setMode('BY_AMOUNT'); setInputValue(''); }}
              className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
                mode === 'BY_AMOUNT'
                  ? 'bg-[#133827] text-white shadow-xs'
                  : 'text-[#7D776C] hover:text-[#141210]'
              }`}
            >
              خرید بر اساس مبلغ (تومان)
            </button>
            <button
              type="button"
              onClick={() => { setMode('BY_WEIGHT'); setInputValue(''); }}
              className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
                mode === 'BY_WEIGHT'
                  ? 'bg-[#133827] text-white shadow-xs'
                  : 'text-[#7D776C] hover:text-[#141210]'
              }`}
            >
              خرید بر اساس وزن (گرم)
            </button>
          </div>

          <div>
            <label htmlFor="buy-input" className="block text-xs font-bold text-[#141210] mb-2">
              {mode === 'BY_AMOUNT' ? 'مبلغ مورد نظر برای خرید' : 'وزن طلای درخواستی'}
            </label>
            <div className="relative">
              <input
                id="buy-input"
                type="text"
                dir="ltr"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value.replace(/[^0-9.]/g, ''))}
                placeholder={mode === 'BY_AMOUNT' ? '1,000,000' : '1.500'}
                className="w-full rounded-2xl border border-[#E8E1D5] bg-[#FAF8F5] px-4 py-3.5 text-lg font-num text-left placeholder:text-[#7D776C] focus:border-[#C9A857] focus:bg-white outline-none transition-all"
                required
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-[#7D776C]">
                {mode === 'BY_AMOUNT' ? 'تومان' : 'گرم'}
              </span>
            </div>
          </div>

          <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#E8E1D5] space-y-2 text-xs text-[#4A463F]">
            <div className="flex items-center gap-2 text-[#133827] font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#C9A857]" />
              <span>تضمین اصالت شمش و خلوص ۷۵۰</span>
            </div>
            <p className="text-[11px] text-[#7D776C] leading-relaxed">
              پس از تکمیل خرید، طلای شما بلافاصله در خزانه امن ثبت شده و در هر زمان قابل فروش لحظه‌ای یا تحویل فیزیکی است.
            </p>
          </div>

          <Button
            type="submit"
            disabled={!inputValue}
            isLoading={isPending}
            variant="primary"
            className="w-full py-4 rounded-full text-xs font-bold shadow-gold-glow flex items-center justify-center gap-2"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>تأیید و پرداخت نهایی</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
