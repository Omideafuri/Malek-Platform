import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import { updateDeliveryStatusAction } from '@/app/actions/delivery';
import { toPersianDigits } from '@/lib/utils/format';
import { Truck, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const dynamic = 'force-dynamic';

export default async function AdminDeliveryPage() {
  const user = await getCurrentUser();
  if (!user || !['ADMIN', 'SUPER_ADMIN'].includes(user.role)) redirect('/dashboard');

  const deliveries = await db.deliveryOrder.findMany({
    where: { 
      status: { in: ['REQUESTED', 'PROCESSING', 'PACKAGED', 'SHIPPED'] } 
    },
    include: {
      user: {
        include: { profile: true }
      }
    },
    orderBy: { createdAt: 'asc' }
  });

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="diamond-motif !w-2 !h-2" />
          <span className="text-xs tracking-brand font-semibold text-[#7D776C]">سامانه لجستیک</span>
        </div>
        <h1 className="text-2xl font-bold text-[#141210] tracking-tight">مدیریت سفارشات تحویل فیزیکی</h1>
        <p className="text-xs sm:text-sm text-[#4A463F] mt-1 font-light">
          نظارت بر بسته‌بندی امنیتی شمش و تحویل به مأمورین پست ویژه
        </p>
      </div>

      <div className="grid gap-4">
        {deliveries.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#E8E1D5] shadow-xs space-y-2">
            <Package className="w-8 h-8 text-[#C9A857] mx-auto opacity-60" />
            <p className="text-sm font-semibold text-[#141210]">هیچ درخواست ارسالی در انتظار پردازش نیست.</p>
            <p className="text-xs text-[#7D776C] font-light">سفارشات تحویل جدید به محض ثبت در این قسمت نمایش داده می‌شوند.</p>
          </div>
        ) : (
          deliveries.map(order => (
            <div key={order.id} className="bg-white rounded-3xl p-6 border border-[#E8E1D5] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="font-bold font-num text-base text-[#133827]">
                    {toPersianDigits((Number(order.weightNg) / 1_000_000_000).toFixed(2))} گرم طلا
                  </span>
                  <span className="text-xs bg-[#FAF8F5] border border-[#E8E1D5] px-2.5 py-0.5 rounded-full text-[#7D776C] font-medium">
                    وضعیت: {order.status}
                  </span>
                </div>
                <p className="text-xs text-[#4A463F]">
                  <span className="text-[#7D776C]">گیرنده:</span> <span className="font-semibold text-[#141210]">{order.recipientName}</span> ({order.recipientMobile})
                </p>
                <p className="text-xs text-[#4A463F] mt-1">
                  <span className="text-[#7D776C]">آدرس:</span> {order.city} - {order.deliveryAddress} (کد پستی: <span className="font-num">{order.postalCode}</span>)
                </p>
              </div>

              <div className="flex gap-2">
                {order.status === 'REQUESTED' && (
                  <form action={async () => {
                    'use server';
                    await updateDeliveryStatusAction(order.id, 'PROCESSING');
                  }}>
                    <Button variant="primary" size="sm" className="rounded-full text-xs font-bold shadow-gold-glow">
                      تأیید و صدور مجوز خروج
                    </Button>
                  </form>
                )}
                {order.status === 'PROCESSING' && (
                  <form action={async () => {
                    'use server';
                    await updateDeliveryStatusAction(order.id, 'SHIPPED', '123456789');
                  }}>
                    <Button variant="secondary" size="sm" className="rounded-full text-xs font-bold flex items-center gap-1">
                      <Truck className="h-3.5 w-3.5" />
                      <span>ثبت کد رهگیری پست</span>
                    </Button>
                  </form>
                )}
                {order.status === 'SHIPPED' && (
                  <form action={async () => {
                    'use server';
                    await updateDeliveryStatusAction(order.id, 'DELIVERED');
                  }}>
                    <Button variant="outline" size="sm" className="rounded-full text-xs font-bold">
                      تأیید تحویل به مشتری
                    </Button>
                  </form>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
