import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import { createSavingsPlanAction, toggleSavingsPlanAction } from '@/app/actions/savings';
import { Plus, PiggyBank, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatNumber } from '@/lib/utils/format';

export const dynamic = 'force-dynamic';

export default async function SavingsPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  const plans = await db.savingsPlan.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="max-w-5xl mx-auto space-y-8 pt-4 pb-16">
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="diamond-motif !w-2 !h-2" />
          <span className="text-xs tracking-brand font-semibold text-[#7D776C]">مدیریت ثروت هوشمند</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#141210] tracking-tight">پس‌انداز خودکار طلا</h1>
        <p className="text-xs sm:text-sm text-[#4A463F] mt-1 font-light">
          تبدیل تدریجی و منظم نقدینگی به طلای استاندارد جهت حفظ بلندمدت ارزش سرمایه
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Create Plan Form */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E1D5] shadow-xs sticky top-24">
            <div className="flex items-center gap-2 mb-6">
              <PiggyBank className="h-5 w-5 text-[#C9A857]" />
              <h2 className="font-bold text-base text-[#141210]">ایجاد برنامه پس‌انداز جدید</h2>
            </div>
            
            <form action={createSavingsPlanAction as unknown as string} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#141210] mb-1.5">عنوان برنامه</label>
                <input 
                  type="text" 
                  name="name"
                  placeholder="مثال: پس‌انداز ماهانه فرزندم"
                  className="w-full rounded-2xl border border-[#E8E1D5] bg-[#FAF8F5] px-4 py-3 text-xs outline-none focus:border-[#C9A857] focus:bg-white transition-all"
                  required 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#141210] mb-1.5">دوره زمانی تکرار</label>
                <select 
                  name="frequency"
                  className="w-full rounded-2xl border border-[#E8E1D5] bg-[#FAF8F5] px-4 py-3 text-xs outline-none focus:border-[#C9A857] focus:bg-white transition-all"
                  required
                >
                  <option value="DAILY">خرید روزانه</option>
                  <option value="WEEKLY">خرید هفتگی</option>
                  <option value="MONTHLY">خرید ماهانه</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#141210] mb-1.5">مبلغ هر دوره (تومان)</label>
                <input 
                  type="text" 
                  name="amount"
                  dir="ltr"
                  placeholder="500,000"
                  className="w-full rounded-2xl border border-[#E8E1D5] bg-[#FAF8F5] px-4 py-3 font-num text-left text-sm outline-none focus:border-[#C9A857] focus:bg-white transition-all"
                  required 
                />
                <p className="text-[11px] text-[#7D776C] mt-1 font-light">حداقل ۱۰۰ هزار تومان</p>
              </div>

              <Button 
                type="submit"
                variant="primary"
                className="w-full mt-2 py-3.5 rounded-full text-xs font-bold shadow-gold-glow flex items-center justify-center gap-2"
              >
                <Plus className="h-4 w-4" />
                <span>ثبت و فعال‌سازی برنامه</span>
              </Button>
            </form>
          </div>
        </div>

        {/* Active Plans List */}
        <div className="lg:col-span-7 space-y-4">
          <h2 className="font-bold text-base text-[#141210]">برنامه‌های فعال شما</h2>
          
          {plans.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 sm:p-14 text-center border border-[#E8E1D5] shadow-xs space-y-3">
              <Layers className="h-10 w-10 mx-auto text-[#C9A857] opacity-60" />
              <p className="text-sm font-semibold text-[#141210]">شما هنوز برنامه پس‌اندازی تعریف نکرده‌اید.</p>
              <p className="text-xs text-[#7D776C] font-light max-w-sm mx-auto">
                با ایجاد برنامه پس‌انداز، سیستم به صورت دوره‌ای و خودکار از موجودی شما طلا خریداری می‌کند.
              </p>
            </div>
          ) : (
            plans.map(plan => (
              <div key={plan.id} className="bg-white rounded-3xl p-6 border border-[#E8E1D5] shadow-xs space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-base text-[#141210]">{plan.name}</h3>
                    <p className="text-xs text-[#4A463F] mt-1 font-light">
                      خرید <span className="font-bold font-num text-[#133827]">{formatNumber(Number(plan.amountRial) / 10)} تومان</span> به صورت{' '}
                      {plan.frequency === 'DAILY' ? 'روزانه' : plan.frequency === 'WEEKLY' ? 'هفتگی' : 'ماهانه'}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    plan.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-800'
                  }`}>
                    {plan.status === 'ACTIVE' ? 'فعال' : 'متوقف شده'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs bg-[#FAF8F5] p-4 rounded-2xl border border-[#E8E1D5]">
                  <div>
                    <span className="text-[#7D776C] block text-[11px] mb-1">کل پس‌انداز تا این لحظه</span>
                    <span className="font-bold font-num text-[#133827] text-sm">{formatNumber(Number(plan.totalSpentRial) / 10)} تومان</span>
                  </div>
                  <div>
                    <span className="text-[#7D776C] block text-[11px] mb-1">نوبت خرید بعدی</span>
                    <span className="font-bold font-num text-[#141210] text-sm" dir="ltr">
                      {new Intl.DateTimeFormat('fa-IR').format(plan.nextExecution)}
                    </span>
                  </div>
                </div>

                <div className="flex justify-end">
                  <form action={async () => {
                    'use server';
                    await toggleSavingsPlanAction(plan.id, plan.status);
                  }}>
                    <Button 
                      variant={plan.status === 'ACTIVE' ? 'outline' : 'primary'}
                      size="sm"
                      className="rounded-full text-xs font-semibold"
                    >
                      {plan.status === 'ACTIVE' ? 'توقف موقت برنامه' : 'فعال‌سازی مجدد'}
                    </Button>
                  </form>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
