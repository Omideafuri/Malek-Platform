'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { loginAction } from '../actions';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await loginAction(formData);
      if (result.success) {
        router.push('/dashboard');
        router.refresh();
      } else {
        setError(result.error || 'اطلاعات ورود نامعتبر است');
      }
    });
  }

  return (
    <>
      <div className="text-center mb-8">
        <span className="text-xs tracking-brand font-semibold text-[#C9A857] block mb-1.5 uppercase">میز معاملات</span>
        <h1 className="text-2xl font-bold text-[#141210] tracking-tight">ورود به حساب کاربری</h1>
      </div>

      <form action={onSubmit} className="space-y-5">
        {error && (
          <div className="p-3.5 text-xs text-rose-800 bg-rose-50 border border-rose-200 rounded-2xl text-center">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="login-mobile" className="block text-xs font-bold text-[#141210] mb-2">
            شماره موبایل
          </label>
          <input
            id="login-mobile"
            type="tel"
            name="mobile"
            dir="ltr"
            placeholder="09123456789"
            required
            className="w-full rounded-2xl border border-[#E8E1D5] bg-[#FAF8F5] px-4 py-3.5 text-sm font-num placeholder:text-[#7D776C] focus:border-[#C9A857] focus:bg-white outline-none transition-all"
            maxLength={11}
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="login-password" className="block text-xs font-bold text-[#141210]">
              رمز عبور
            </label>
            <Link
              href="/forgot-password"
              className="text-xs text-[#7D776C] hover:text-[#C9A857] transition-colors"
            >
              فراموشی رمز عبور
            </Link>
          </div>
          <input
            id="login-password"
            type="password"
            name="password"
            dir="ltr"
            required
            placeholder="••••••••"
            className="w-full rounded-2xl border border-[#E8E1D5] bg-[#FAF8F5] px-4 py-3.5 text-sm placeholder:text-[#7D776C] focus:border-[#C9A857] focus:bg-white outline-none transition-all"
          />
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            isLoading={isPending}
            variant="primary"
            className="w-full py-4 rounded-full text-xs font-bold shadow-gold-glow flex items-center justify-center gap-2"
          >
            <span>ورود به پنل ملک طلا</span>
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </div>
      </form>

      <p className="mt-8 text-center text-xs text-[#4A463F] border-t border-[#E8E1D5] pt-6">
        حساب کاربری ندارید؟{' '}
        <Link href="/register" className="font-bold text-[#133827] hover:text-[#C9A857] transition-colors">
          افتتاح حساب رایگان
        </Link>
      </p>
    </>
  );
}
