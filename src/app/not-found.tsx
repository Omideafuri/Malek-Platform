import Link from 'next/link';
import { Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-atmospheric-forest px-4 text-white relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.03]">
        <span className="text-[clamp(8rem,28vw,24rem)] font-extrabold tracking-widest text-[#E3CCAE] leading-none">
          404
        </span>
      </div>

      <div className="relative z-10 text-center max-w-md mx-auto">
        <span className="diamond-motif !w-3 !h-3 mx-auto block mb-6 shadow-gold-glow" />
        <p className="text-6xl sm:text-7xl font-extrabold font-num text-[#C9A857] mb-4">۴۰۴</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          صفحه مورد نظر یافت نشد
        </h1>
        <p className="text-xs sm:text-sm text-[#C5BFB4] mb-8 font-light leading-relaxed">
          نشانی وارد شده در نقشه گالری و خانه ملک طلا یافت نشد یا ممکن است به بخش دیگری منتقل شده باشد.
        </p>
        <Link href="/">
          <Button variant="primary" className="px-8 py-3.5 rounded-full text-xs font-semibold shadow-gold-glow flex items-center justify-center gap-2 mx-auto">
            <Home className="h-4 w-4" />
            <span>بازگشت به تالار اصلی</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
