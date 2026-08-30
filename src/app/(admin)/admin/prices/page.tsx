import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth/session';
import { redirect } from 'next/navigation';

import { revalidatePath } from 'next/cache';
import { Button } from '@/components/ui/button';

export const dynamic = 'force-dynamic';

async function updatePriceConfig(formData: FormData) {
  'use strict';
  'use server';
  
  const user = await getCurrentUser();
  if (!user || !['ADMIN', 'SUPER_ADMIN'].includes(user.role)) throw new Error('Unauthorized');

  const buySpreadBp = Number(formData.get('buySpreadBp'));
  const sellSpreadBp = Number(formData.get('sellSpreadBp'));
  const feeBp = Number(formData.get('feeBp'));
  
  if (isNaN(buySpreadBp) || isNaN(sellSpreadBp) || isNaN(feeBp)) return;

  await db.priceConfig.updateMany({
    where: { isActive: true },
    data: { isActive: false }
  });

  await db.priceConfig.create({
    data: {
      goldType: '18K',
      buySpreadBp,
      sellSpreadBp,
      feeBp,
      minBuyRial: BigInt(1000000),
      maxBuyRial: BigInt(500000000),
      minSellNg: BigInt(10000000),
      isActive: true,
      updatedById: user.id
    }
  });

  revalidatePath('/admin/prices');
}

export default async function AdminPricesPage() {
  const user = await getCurrentUser();
  if (!user || !['ADMIN', 'SUPER_ADMIN'].includes(user.role)) redirect('/dashboard');

  let activeConfig = await db.priceConfig.findFirst({
    where: { isActive: true },
    orderBy: { createdAt: 'desc' }
  });

  if (!activeConfig) {
    activeConfig = {
      id: 'default',
      goldType: '18K',
      buySpreadBp: 150,
      sellSpreadBp: 150,
      feeBp: 50,
      minBuyRial: BigInt(1000000),
      maxBuyRial: BigInt(500000000),
      minSellNg: BigInt(10000000),
      isActive: true,
      updatedById: null,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="diamond-motif !w-2 !h-2" />
          <span className="text-xs tracking-brand font-semibold text-[#7D776C]">موتور مالی</span>
        </div>
        <h1 className="text-2xl font-bold text-[#141210] tracking-tight">تنظیمات اسپرد و کارمزد معاملات</h1>
        <p className="text-xs sm:text-sm text-[#4A463F] mt-1 font-light">
          تنظیم دقیق حاشیه خرید، فروش و کارمزد عملیاتی پلتفرم
        </p>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-[#E8E1D5] shadow-xs">
        <form action={updatePriceConfig} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-[#141210] mb-2">
                اسپرد خرید (Basis Points)
              </label>
              <input 
                name="buySpreadBp"
                type="number" 
                defaultValue={activeConfig.buySpreadBp}
                className="w-full rounded-2xl border border-[#E8E1D5] bg-[#FAF8F5] px-4 py-3 text-left font-num text-xs outline-none focus:border-[#C9A857] focus:bg-white transition-all"
              />
              <p className="text-[11px] text-[#7D776C] mt-1.5 font-light">۱۰۰ واحد = ۱٪ اضافه روی نرخ پایه خرید</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#141210] mb-2">
                اسپرد فروش (Basis Points)
              </label>
              <input 
                name="sellSpreadBp"
                type="number" 
                defaultValue={activeConfig.sellSpreadBp}
                className="w-full rounded-2xl border border-[#E8E1D5] bg-[#FAF8F5] px-4 py-3 text-left font-num text-xs outline-none focus:border-[#C9A857] focus:bg-white transition-all"
              />
              <p className="text-[11px] text-[#7D776C] mt-1.5 font-light">۱۰۰ واحد = ۱٪ کسر از نرخ پایه فروش</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#141210] mb-2">
                کارمزد ثابت معاملات (Basis Points)
              </label>
              <input 
                name="feeBp"
                type="number" 
                defaultValue={activeConfig.feeBp}
                className="w-full rounded-2xl border border-[#E8E1D5] bg-[#FAF8F5] px-4 py-3 text-left font-num text-xs outline-none focus:border-[#C9A857] focus:bg-white transition-all"
              />
              <p className="text-[11px] text-[#7D776C] mt-1.5 font-light">۵۰ واحد = ۰.۵٪ کارمزد تسویه شبکه</p>
            </div>
          </div>

          <div className="pt-4 border-t border-[#E8E1D5] flex justify-end">
            <Button 
              type="submit"
              variant="primary"
              className="px-8 py-3 rounded-full text-xs font-bold shadow-gold-glow"
            >
              ذخیره و اعمال در تابلوی نرخ‌ها
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
