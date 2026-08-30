'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { sellGoldAction } from '../actions';
import { ShieldCheck, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SellGoldPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  
  const [mode, setMode] = useState<'BY_AMOUNT' | 'BY_WEIGHT'>('BY_WEIGHT');
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue || isNaN(Number(inputValue))) return;

    setError(null);
    startTransition(async () => {
      const formData = new FormData();
      formData.append('idempotencyKey', window.crypto.randomUUID());
      formData.append('mode', mode);
      formData.append('value', mode === 'BY_AMOUNT' ? String(Number(inputValue) * 10) : String(Number(inputValue) * 1000000000));
      
      const result = await sellGoldAction(formData);
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
          <span className="text-xs tracking-brand font-semibold text-[#7D776C]">نقدشوندگی آنی</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#141210] tracking-tight">فروش طلای دیجیتال</h1>
        <p className="text-xs sm:text-sm text-[#4A463F] mt-1 font-light">
          فروش لحظه‌ای با بهترین نرخ بازخرید بازار و تسویه فوری به کیف پول
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
              onClick={() => { setMode('BY_WEIGHT'); setInputValue(''); }}
              className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
                mode === 'BY_WEIGHT'
                  ? 'bg-[#133827] text-white shadow-xs'
                  : 'text-[#7D776C] hover:text-[#141210]'
              }`}
            >
              فروش بر اساس وزن (گرم)
            </button>
            <button
              type="button"
              onClick={() => { setMode('BY_AMOUNT'); setInputValue(''); }}
              className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
                mode === 'BY_AMOUNT'
                  ? 'bg-[#133827] text-white shadow-xs'
                  : 'text-[#7D776C] hover:text-[#141210]'
              }`}
            >
              فروش بر اساس مبلغ (تومان)
            </button>
          </div>

          <div>
            <label htmlFor="sell-input" className="block text-xs font-bold text-[#141210] mb-2">
              {mode === 'BY_AMOUNT' ? 'مبلغ مورد نظر برای دریافت' : 'وزن طلای قابل فروش'}
            </label>
            <div className="relative">
              <input
                id="sell-input"
                type="text"
                dir="ltr"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value.replace(/[^0-9.]/g, ''))}
                placeholder={mode === 'BY_AMOUNT' ? '1,000,000' : '1.500'}
                className="w-full rounded-2xl border border-[#E8E1D5] bg-[#FAF8F5] px-4 py-3.5 text-lg font-num text-left placeholder:text-[#7D776C] focus:border-[#133827] focus:bg-white outline-none transition-all"
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
              <span>تسویه آنی و بدون کارمزد مخفی</span>
            </div>
            <p className="text-[11px] text-[#7D776C] leading-relaxed">
              وجه فروش بلافاصله به موجودی ریالی شما اضافه شده و می‌توانید در هر لحظه درخواست انتقال به حساب بانکی (پایا/ساتنا) ثبت نمایید.
            </p>
          </div>

          <Button
            type="submit"
            disabled={!inputValue}
            isLoading={isPending}
            variant="secondary"
            className="w-full py-4 rounded-full text-xs font-bold flex items-center justify-center gap-2"
          >
            <TrendingUp className="h-4 w-4 text-[#C9A857]" />
            <span>تأیید و فروش لحظه‌ای</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
