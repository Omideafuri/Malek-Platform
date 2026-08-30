'use client';

import { useState, useTransition, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { verifyOtpAction, sendOtpAction } from '../actions';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

function VerifyForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mobile = searchParams.get('mobile') || '';
  const purpose = (searchParams.get('purpose') || 'VERIFY') as 'LOGIN' | 'REGISTER' | 'VERIFY' | 'RESET';
  
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [timer, setTimer] = useState(120);

  useEffect(() => {
    if (!mobile) {
      router.push('/login');
    }
  }, [mobile, router]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleInputChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleResend = async () => {
    if (timer > 0) return;
    setError(null);
    const result = await sendOtpAction(mobile, purpose);
    if (result.success) {
      setTimer(120);
    } else {
      setError(result.error || 'خطا در ارسال مجدد کد');
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullCode = code.join('');
    if (fullCode.length < 6) return;

    setError(null);
    startTransition(async () => {
      const formData = new FormData();
      formData.append('mobile', mobile);
      formData.append('code', fullCode);
      formData.append('purpose', purpose);
      
      const result = await verifyOtpAction(formData);
      if (result.success) {
        router.push('/dashboard');
        router.refresh();
      } else {
        setError(result.error || 'کد وارد شده نامعتبر است');
      }
    });
  };

  const formattedTimer = `${Math.floor(timer / 60)}:${(timer % 60).toString().padStart(2, '0')}`;
  const maskedMobile = mobile ? `${mobile.slice(0, 4)}***${mobile.slice(-4)}` : '';

  return (
    <>
      <div className="text-center mb-8">
        <span className="text-xs tracking-brand font-semibold text-[#C9A857] block mb-1.5 uppercase">امنیت دوعاملی</span>
        <h1 className="text-2xl font-bold text-[#141210] tracking-tight">تأیید شماره موبایل</h1>
        <p className="mt-2 text-xs text-[#4A463F] font-light">
          کد ۶ رقمی ارسال شده به شماره زیر را وارد نمایید:
        </p>
        <p className="mt-1 text-sm font-num font-bold text-[#133827]" dir="ltr">
          {maskedMobile}
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        {error && (
          <div className="p-3.5 text-xs text-rose-800 bg-rose-50 border border-rose-200 rounded-2xl text-center">
            {error}
          </div>
        )}

        {/* OTP Input */}
        <div className="flex justify-center gap-2.5" dir="ltr">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="h-12 w-12 rounded-2xl border border-[#E8E1D5] bg-[#FAF8F5] text-center text-lg font-num font-bold text-[#141210] focus:border-[#C9A857] focus:bg-white outline-none transition-all shadow-xs"
            />
          ))}
        </div>

        {/* Timer & Resend */}
        <div className="text-center text-xs">
          {timer > 0 ? (
            <p className="text-[#7D776C]">
              ارسال مجدد کد تا {' '}
              <span className="font-num text-[#133827] font-bold">{formattedTimer}</span>
              {' '}دیگر
            </p>
          ) : (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleResend}
              className="rounded-full text-xs"
            >
              ارسال مجدد کد
            </Button>
          )}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={code.join('').length < 6}
          isLoading={isPending}
          variant="primary"
          className="w-full py-4 rounded-full text-xs font-bold shadow-gold-glow flex items-center justify-center gap-2"
        >
          <span>تأیید و ورود به پنل</span>
          <ArrowLeft className="w-4 h-4" />
        </Button>
      </form>
    </>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<div className="text-center text-xs text-[#7D776C] py-8">در حال فراخوانی سامانه پیامک...</div>}>
      <VerifyForm />
    </Suspense>
  );
}
