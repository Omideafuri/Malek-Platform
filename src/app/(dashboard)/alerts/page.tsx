import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import { createAlertAction, deleteAlertAction } from '@/app/actions/alerts';
import { getLatestPriceSnapshot } from '@/lib/financial/pricing';
import { Bell, BellRing, Trash2, TrendingDown, TrendingUp } from 'lucide-react';
import { formatNumber } from '@/lib/utils/format';
import { Button } from '@/components/ui/button';

export const dynamic = 'force-dynamic';

export default async function AlertsPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  const snapshot = await getLatestPriceSnapshot('18K');
  const currentPriceToman = Number(snapshot.buyPriceRial / BigInt(10));

  const alerts = await db.priceAlert.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="max-w-5xl mx-auto space-y-8 pt-4 pb-16">
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="diamond-motif !w-2 !h-2" />
          <span className="text-xs tracking-brand font-semibold text-[#7D776C]">پایش هوشمند بازار</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#141210] tracking-tight">هشدارهای قیمت طلا</h1>
        <p className="text-xs sm:text-sm text-[#4A463F] mt-1 font-light">
          تعیین اهداف قیمتی و دریافت پیامک آنی در زمان رسیدن طلا به نرخ دلخواه شما
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Create Alert Form */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E1D5] shadow-xs sticky top-24">
            <div className="flex items-center gap-2 mb-4">
              <Bell className="h-5 w-5 text-[#C9A857]" />
              <h2 className="font-bold text-base text-[#141210]">ثبت هشدار جدید</h2>
            </div>
            
            <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#E8E1D5] mb-5 text-center">
              <p className="text-[11px] text-[#7D776C] mb-1">قیمت فعلی بازار (خرید)</p>
              <p className="font-bold font-num text-lg text-[#133827]">{formatNumber(currentPriceToman)} تومان</p>
            </div>

            <form action={createAlertAction as unknown as string} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#141210] mb-1.5">شرط هشدار</label>
                <div className="grid grid-cols-2 gap-2">
                  <label className="relative flex cursor-pointer rounded-2xl border border-[#E8E1D5] bg-[#FAF8F5] p-3 hover:bg-white transition-all">
                    <input type="radio" name="conditionType" value="ABOVE" className="peer sr-only" defaultChecked />
                    <div className="flex w-full items-center justify-between text-xs">
                      <span className="font-bold text-[#141210]">بالاتر از</span>
                      <TrendingUp className="h-4 w-4 text-emerald-700" />
                    </div>
                    <div className="absolute inset-0 rounded-2xl border-2 border-transparent peer-checked:border-[#C9A857] pointer-events-none"></div>
                  </label>
                  <label className="relative flex cursor-pointer rounded-2xl border border-[#E8E1D5] bg-[#FAF8F5] p-3 hover:bg-white transition-all">
                    <input type="radio" name="conditionType" value="BELOW" className="peer sr-only" />
                    <div className="flex w-full items-center justify-between text-xs">
                      <span className="font-bold text-[#141210]">پایین‌تر از</span>
                      <TrendingDown className="h-4 w-4 text-rose-700" />
                    </div>
                    <div className="absolute inset-0 rounded-2xl border-2 border-transparent peer-checked:border-[#C9A857] pointer-events-none"></div>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#141210] mb-1.5">قیمت هدف (تومان)</label>
                <input 
                  type="text" 
                  name="targetPrice"
                  dir="ltr"
                  placeholder={formatNumber(currentPriceToman)}
                  className="w-full rounded-2xl border border-[#E8E1D5] bg-[#FAF8F5] px-4 py-3 font-num text-left text-sm outline-none focus:border-[#C9A857] focus:bg-white transition-all"
                  required 
                />
              </div>

              <Button 
                type="submit"
                variant="primary"
                className="w-full mt-2 py-3.5 rounded-full text-xs font-bold shadow-gold-glow"
              >
                ثبت و فعال‌سازی هشدار
              </Button>
            </form>
          </div>
        </div>

        {/* Alerts List */}
        <div className="lg:col-span-7 space-y-4">
          <h2 className="font-bold text-base text-[#141210]">هشدارهای فعال شما</h2>
          
          {alerts.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 sm:p-14 text-center border border-[#E8E1D5] shadow-xs space-y-3">
              <BellRing className="h-10 w-10 mx-auto text-[#C9A857] opacity-60" />
              <p className="text-sm font-semibold text-[#141210]">شما هنوز هشدار قیمتی تعریف نکرده‌اید.</p>
              <p className="text-xs text-[#7D776C] font-light max-w-sm mx-auto">
                با مشخص کردن قیمت هدف، به محض تغییرات بازار پیامک فوری برای شما ارسال می‌شود.
              </p>
            </div>
          ) : (
            alerts.map(alert => (
              <div key={alert.id} className="bg-white rounded-3xl p-5 border border-[#E8E1D5] shadow-xs flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className={`p-3 rounded-2xl ${
                    alert.isTriggered 
                      ? 'bg-[#FAF8F5] text-[#7D776C]' 
                      : alert.conditionType === 'ABOVE' ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'
                  }`}>
                    {alert.isTriggered ? <Bell className="h-5 w-5" /> : <BellRing className="h-5 w-5" />}
                  </div>
                  
                  <div>
                    <h3 className={`font-bold font-num text-base ${alert.isTriggered ? 'text-[#7D776C] line-through' : 'text-[#141210]'}`}>
                      {alert.targetPriceRial ? formatNumber(Number(alert.targetPriceRial / BigInt(10))) : 0} تومان
                    </h3>
                    <p className="text-xs text-[#4A463F] mt-0.5 font-light">
                      {alert.conditionType === 'ABOVE' ? 'در صورت افزایش نرخ به بالای این رقم' : 'در صورت کاهش نرخ به زیر این رقم'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    alert.isTriggered ? 'bg-[#FAF8F5] text-[#7D776C]' : 'bg-[#E3CCAE] text-[#133827]'
                  }`}>
                    {alert.isTriggered ? 'به هدف رسید' : 'فعال'}
                  </span>
                  
                  <form action={async () => {
                    'use server';
                    await deleteAlertAction(alert.id);
                  }}>
                    <Button
                      type="submit"
                      variant="outline"
                      size="icon"
                      className="rounded-full h-8 w-8 text-[#7D776C] hover:text-rose-700"
                      title="حذف هشدار"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
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
