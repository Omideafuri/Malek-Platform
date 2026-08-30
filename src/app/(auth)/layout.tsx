import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-atmospheric-forest px-4 sm:px-6 py-12 md:py-16 text-white relative overflow-hidden">
      {/* Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.03]">
        <span className="text-[clamp(6rem,22vw,20rem)] font-extrabold tracking-widest text-[#E3CCAE] leading-none">
          MALEK TALAA
        </span>
      </div>

      {/* Logo */}
      <Link href="/" className="relative z-10 flex flex-col items-center gap-3 mb-8 group">
        <span className="diamond-motif !w-3.5 !h-3.5 group-hover:rotate-90 transition-transform duration-500 shadow-gold-glow" />
        <span className="text-xl tracking-brand font-bold text-white group-hover:text-[#E3CCAE] transition-colors">
          MALEK TALAA
        </span>
        <span className="text-[11px] tracking-brand text-[#E3CCAE] uppercase font-light">
          ملک طلا — گالری و خانه مسکوکات فاخر و طلای ایران
        </span>
      </Link>

      {/* Auth Card (White elevated container with warm Champagne border) */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white text-[#141210] rounded-3xl p-6 sm:p-10 border border-[#E8E1D5] shadow-2xl">
          {children}
        </div>
      </div>

      {/* Footer */}
      <p className="relative z-10 mt-8 text-center text-xs text-[#C5BFB4] font-light">
        © تمامی حقوق مادی و معنوی برای گالری و مجموعه ملک طلا محفوظ است.
      </p>
    </div>
  );
}
