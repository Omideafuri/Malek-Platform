import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { MobileNav } from '@/components/layout/MobileNav';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#141210] selection:bg-[#C9A857] selection:text-white">
      <DashboardSidebar />
      <main className="md:mr-64 pb-24 md:pb-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 md:px-10 md:py-10">
          {children}
        </div>
      </main>
      <MobileNav />
    </div>
  );
}
