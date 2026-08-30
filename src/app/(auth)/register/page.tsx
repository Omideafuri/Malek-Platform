'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { registerAction } from '../actions';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await registerAction(formData);
      if (result.success) {
        router.push('/dashboard');
        router.refresh();
      } else {
        setError(result.error || 'خطایی در ثبت‌نام رخ داد');
      }
    });
  }

  return (
    <>
      <div className="text-center mb-8">
        <span className="text-xs tracking-brand font-semibold text-[#C9A857] block mb-1.5 uppercase">عضویت در ملک طلا</span>
        <h1 className="text-2xl font-bold text-[#141210] tracking-tight">افتتاح حساب کاربری</h1>
      </div>

      <form action={onSubmit} className="space-y-4">
        {error && (
          <div className="p-3.5 text-xs text-rose-800 bg-rose-50 border border-rose-200 rounded-2xl text-center">
            {error}
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="reg-firstname" className="block text-xs font-bold text-[#141210] mb-1.5">نام</label>
            <input
              id="reg-firstname"
              type="text"
              name="firstName"
              required
              placeholder="نام"
              className="w-full rounded-2xl border border-[#E8E1D5] bg-[#FAF8F5] px-4 py-3 text-xs placeholder:text-[#7D776C] focus:border-[#C9A857] focus:bg-white outline-none transition-all"
            />
          </div>
          <div>
            <label htmlFor="reg-lastname" className="block text-xs font-bold text-[#141210] mb-1.5">نام خانوادگی</label>
            <input
              id="reg-lastname"
              type="text"
              name="lastName"
              required
              placeholder="نام خانوادگی"
              className="w-full rounded-2xl border border-[#E8E1D5] bg-[#FAF8F5] px-4 py-3 text-xs placeholder:text-[#7D776C] focus:border-[#C9A857] focus:bg-white outline-none transition-all"
            />
          </div>
        </div>

        <div>
          <label htmlFor="reg-mobile" className="block text-xs font-bold text-[#141210] mb-1.5">شماره موبایل</label>
          <input
            id="reg-mobile"
            type="tel"
            name="mobile"
            dir="ltr"
            required
            placeholder="09123456789"
            className="w-full rounded-2xl border border-[#E8E1D5] bg-[#FAF8F5] px-4 py-3 text-xs font-num placeholder:text-[#7D776C] focus:border-[#C9A857] focus:bg-white outline-none transition-all"
            maxLength={11}
          />
        </div>

        <div>
          <label htmlFor="reg-password" className="block text-xs font-bold text-[#141210] mb-1.5">رمز عبور</label>
          <input
            id="reg-password"
            type="password"
            name="password"
            dir="ltr"
            required
            placeholder="حداقل ۸ کاراکتر"
            className="w-full rounded-2xl border border-[#E8E1D5] bg-[#FAF8F5] px-4 py-3 text-xs placeholder:text-[#7D776C] focus:border-[#C9A857] focus:bg-white outline-none transition-all"
          />
        </div>

        <div>
          <label htmlFor="reg-confirm-password" className="block text-xs font-bold text-[#141210] mb-1.5">تکرار رمز عبور</label>
          <input
            id="reg-confirm-password"
            type="password"
            name="confirmPassword"
            dir="ltr"
            required
            placeholder="تکرار رمز عبور"
            className="w-full rounded-2xl border border-[#E8E1D5] bg-[#FAF8F5] px-4 py-3 text-xs placeholder:text-[#7D776C] focus:border-[#C9A857] focus:bg-white outline-none transition-all"
          />
        </div>

        <label className="flex items-start gap-2.5 cursor-pointer pt-2">
          <input type="checkbox" required className="mt-1 h-4 w-4 rounded border-[#E8E1D5] text-[#133827] focus:ring-0 accent-[#C9A857]" />
          <span className="text-xs text-[#4A463F] leading-relaxed">
            <Link href="/terms" className="underline hover:text-[#141210]">قوانین و مقررات</Link>
            {' '}و{' '}
            <Link href="/privacy" className="underline hover:text-[#141210]">حریم خصوصی</Link>
            {' '}مجموعه ملک طلا را می‌پذیرم.
          </span>
        </label>

        <div className="pt-2">
          <Button
            type="submit"
            isLoading={isPending}
            variant="primary"
            className="w-full py-4 rounded-full text-xs font-bold shadow-gold-glow flex items-center justify-center gap-2"
          >
            <span>افتتاح حساب کاربری</span>
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </div>
      </form>

      <p className="mt-8 text-center text-xs text-[#4A463F] border-t border-[#E8E1D5] pt-6">
        قبلاً حساب باز کرده‌اید؟{' '}
        <Link href="/login" className="font-bold text-[#133827] hover:text-[#C9A857] transition-colors">
          ورود به حساب
        </Link>
      </p>
    </>
  );
}
