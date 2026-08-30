import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import { requestDeliveryAction } from '@/app/actions/delivery';
import { Info, Truck, Package } from 'lucide-react';
import { toPersianDigits } from '@/lib/utils/format';
import { Button } from '@/components/ui/button';

export const dynamic = 'force-dynamic';

export default async function DeliveryPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  const goldWallet = await db.goldWallet.findUnique({ where: { userId: user.id } });
  const goldBalanceNg = goldWallet?.balanceNg || 0n;
  const goldGrams = Number(goldBalanceNg) / 1_000_000_000;

  const deliveries = await db.deliveryOrder.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="max-w-5xl mx-auto space-y-8 pt-4 pb-16">
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="diamond-motif !w-2 !h-2" />
          <span className="text-xs tracking-brand font-semibold text-[#7D776C]">لجستیک و تحویل فیزیکی</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#141210] tracking-tight">درخواست تحویل فیزیکی طلا</h1>
        <p className="text-xs sm:text-sm text-[#4A463F] mt-1 font-light">
          تبدیل موجودی طلای دیجیتال به شمش استاندارد و ارسال محرمانه با پست بیمه‌شده به تمام نقاط کشور
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Request Form */}
        <div className="lg:col-span-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E1D5] shadow-xs">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E8E1D5]">
              <h2 className="font-bold text-base text-[#141210]">ثبت سفارش ارسال</h2>
              <div className="text-xs">
                موجودی: <span className="font-bold font-num text-[#133827]">{toPersianDigits(goldGrams.toFixed(4))} گرم</span>
              </div>
            </div>

            <form action={requestDeliveryAction as unknown as string} className="space-y-4">
              <input type="hidden" name="idempotencyKey" value={crypto.randomUUID()} />
              <div>
                <label className="block text-xs font-bold text-[#141210] mb-1.5">وزن درخواستی جهت تحویل (گرم)</label>
                <input 
                  type="text" 
                  name="weightGrams"
                  dir="ltr"
                  placeholder="حداقل ۱ گرم"
                  className="w-full rounded-2xl border border-[#E8E1D5] bg-[#FAF8F5] px-4 py-3 font-num text-left text-sm outline-none focus:border-[#C9A857] focus:bg-white transition-all"
                  required 
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#141210] mb-1.5">نام و نام خانوادگی گیرنده</label>
                  <input 
                    type="text" 
                    name="recipientName"
                    className="w-full rounded-2xl border border-[#E8E1D5] bg-[#FAF8F5] px-4 py-3 text-xs outline-none focus:border-[#C9A857] focus:bg-white transition-all"
                    required 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#141210] mb-1.5">شماره موبایل گیرنده</label>
                  <input 
                    type="text" 
                    name="recipientMobile"
                    dir="ltr"
                    maxLength={11}
                    placeholder="09XXXXXXXXX"
                    className="w-full rounded-2xl border border-[#E8E1D5] bg-[#FAF8F5] px-4 py-3 font-num text-left text-xs outline-none focus:border-[#C9A857] focus:bg-white transition-all"
                    required 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#141210] mb-1.5">آدرس کامل پستی</label>
                <textarea 
                  name="address"
                  rows={3}
                  className="w-full rounded-2xl border border-[#E8E1D5] bg-[#FAF8F5] px-4 py-3 text-xs outline-none focus:border-[#C9A857] focus:bg-white resize-none transition-all"
                  required 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#141210] mb-1.5">شهر مقصد</label>
                  <input 
                    type="text" 
                    name="city"
                    className="w-full rounded-2xl border border-[#E8E1D5] bg-[#FAF8F5] px-4 py-3 text-xs outline-none focus:border-[#C9A857] focus:bg-white transition-all"
                    required 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#141210] mb-1.5">کد پستی ۱۰ رقمی</label>
                  <input 
                    type="text" 
                    name="postalCode"
                    dir="ltr"
                    maxLength={10}
                    className="w-full rounded-2xl border border-[#E8E1D5] bg-[#FAF8F5] px-4 py-3 font-num text-left text-xs outline-none focus:border-[#C9A857] focus:bg-white transition-all"
                    required 
                  />
                </div>
              </div>

              <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#E8E1D5] flex gap-3 text-xs text-[#4A463F] mt-4">
                <Info className="h-5 w-5 flex-shrink-0 text-[#C9A857]" />
                <p className="leading-relaxed">
                  هزینه ثابت ارسال محرمانه (۵۰,۰۰۰ تومان) و بیمه مرسوله (۲۰,۰۰۰ تومان) از کیف پول نقدی کسر می‌گردد.
                </p>
              </div>

              <Button 
                type="submit"
                variant="primary"
                className="w-full mt-2 py-4 rounded-full text-xs font-bold shadow-gold-glow flex items-center justify-center gap-2"
              >
                <Truck className="h-4 w-4" />
                <span>ثبت درخواست و هماهنگی ارسال</span>
              </Button>
            </form>
          </div>
        </div>

        {/* History list */}
        <div className="lg:col-span-6 space-y-4">
          <h2 className="font-bold text-base text-[#141210]">پیگیری مرسوله‌ها</h2>
          {deliveries.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 sm:p-14 text-center border border-[#E8E1D5] shadow-xs space-y-3">
              <Package className="h-10 w-10 mx-auto text-[#C9A857] opacity-60" />
              <p className="text-sm font-semibold text-[#141210]">سفارش تحویلی ثبت نشده است.</p>
              <p className="text-xs text-[#7D776C] font-light max-w-sm mx-auto">
                پس از ثبت درخواست، اطلاعات رهگیری پستی و وضعیت بسته‌بندی در این بخش قابل پیگیری خواهد بود.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {deliveries.map(order => (
                <div key={order.id} className="bg-white rounded-3xl p-5 border border-[#E8E1D5] shadow-xs space-y-3">
                  <div className="flex justify-between items-center pb-3 border-b border-[#E8E1D5]">
                    <span className="font-bold text-base font-num text-[#133827]">
                      {toPersianDigits((Number(order.weightNg) / 1_000_000_000).toFixed(2))} گرم طلا
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      order.status === 'DELIVERED' ? 'bg-emerald-50 text-emerald-800' :
                      order.status === 'SHIPPED' ? 'bg-[#0A2218] text-[#E3CCAE]' :
                      'bg-amber-50 text-amber-800'
                    }`}>
                      {order.status === 'REQUESTED' ? 'درخواست شده' :
                       order.status === 'VERIFIED' ? 'تأیید شده' :
                       order.status === 'PROCESSING' ? 'در حال آماده‌سازی' :
                       order.status === 'PACKAGED' ? 'بسته‌بندی امنیتی' :
                       order.status === 'SHIPPED' ? 'تحویل به پست' :
                       order.status === 'DELIVERED' ? 'تحویل داده شد' : 'لغو شده'}
                    </span>
                  </div>
                  <div className="text-xs text-[#4A463F] space-y-1">
                    <p>گیرنده: <span className="font-semibold text-[#141210]">{order.recipientName}</span></p>
                    <p className="truncate">آدرس: {order.deliveryAddress}</p>
                    {order.trackingCode && (
                      <p className="mt-2 text-[#133827] font-semibold font-num">
                        کد رهگیری پستی: {order.trackingCode}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
