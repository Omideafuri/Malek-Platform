import Image from 'next/image';
import type { Metadata } from 'next';
import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import { getLatestPriceSnapshot } from '@/lib/financial/pricing';
import { calculateCashAmount, calculateFee } from '@/lib/financial/decimal';
import { formatNumber, toPersianDigits } from '@/lib/utils/format';
import { Button } from '@/components/ui/button';
import { buyProductAction } from '@/app/actions/products';

// Mapping categories to generated editorial photography
const productImages: Record<string, string> = {
  BAR: '/images/product_bar.jpg',
  COIN: '/images/product_coin.jpg',
  PLAQUE: '/images/product_plaque.jpg',
};

async function ensureMockProducts() {
  try {
    const count = await db.product.count();
    if (count === 0) {
      await db.product.createMany({
        data: [
          {
            nameFa: 'شمش ۵ گرمی ملک طلا',
            nameEn: 'Malek Talaa 5g Cast Gold Bar',
            category: 'BAR',
            goldType: '18K',
            weightNg: BigInt(5_000_000_000),
            premiumBp: 200,
            isAvailable: true,
            quantityAvailable: 15,
            imageUrl: '/images/product_bar.jpg',
          },
          {
            nameFa: 'سکه بهار آزادی طرح جدید',
            nameEn: 'Bahar Azadi Bullion Coin',
            category: 'COIN',
            goldType: '18K',
            weightNg: BigInt(2_033_000_000),
            premiumBp: 1500,
            isAvailable: true,
            quantityAvailable: 4,
            imageUrl: '/images/product_coin.jpg',
          },
          {
            nameFa: 'پلاک آویز معماری پارسیان',
            nameEn: 'Parsian Architectural Plaque 1g',
            category: 'PLAQUE',
            goldType: '18K',
            weightNg: BigInt(1_000_000_000),
            premiumBp: 300,
            isAvailable: true,
            quantityAvailable: 8,
            imageUrl: '/images/product_plaque.jpg',
          }
        ]
      });
    }
  } catch {
    // Database unreachable during build time
  }
}

export const metadata: Metadata = {
  title: 'گالری و تحویل فیزیکی',
};

export default async function StorePage() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  await ensureMockProducts();

  const products = await db.product.findMany({
    orderBy: { weightNg: 'asc' }
  });

  const snapshot = await getLatestPriceSnapshot('18K');

  const cashWallet = await db.cashWallet.findUnique({ where: { userId: user.id } });
  const cashBalanceToman = Number((cashWallet?.balanceRial || BigInt(0)) / BigInt(10));

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-24">
      {/* Editorial Header */}
      <div className="pt-4">
        <div className="flex items-center gap-3 mb-4">
          <span className="diamond-motif" />
          <span className="text-xs tracking-brand text-[#7D776C]">گالری فیزیکی ملک طلا</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-[#E8E1D5] pb-10">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-bold text-[#141210] tracking-tight mb-4">گالری و تحویل فیزیکی</h1>
            <p className="text-base sm:text-lg text-[#4A463F] leading-relaxed font-light">
              محصولات فیزیکی استاندارد با بسته‌بندی امنیتی ضدجعل، هولوگرام اصالت و شناسنامه رسمی عیار.
            </p>
          </div>
          <div className="text-left border border-[#E8E1D5] rounded-2xl p-6 bg-white shadow-xs min-w-[240px]">
            <p className="text-xs tracking-brand text-[#7D776C] mb-2">موجودی کیف پول ریالی</p>
            <p className="text-2xl font-bold font-num text-[#133827]">
              {formatNumber(cashBalanceToman)} <span className="text-sm font-normal text-[#7D776C]">تومان</span>
            </p>
          </div>
        </div>
      </div>

      {/* Products — Editorial Gallery */}
      <div className="space-y-6">
        {products.map((product, idx) => {
          const weightGrams = Number(product.weightNg) / 1_000_000_000;
          const baseValueRial = calculateCashAmount(product.weightNg, snapshot.buyPriceRial);
          const premiumRial = calculateFee(baseValueRial, product.premiumBp);
          const makingChargeRial = product.makingChargeRial || BigInt(0);
          const totalPriceToman = Number((baseValueRial + premiumRial + makingChargeRial) / BigInt(10));
          const quantityAvailable = product.quantityAvailable ?? 0;
          const isAvailable = product.isAvailable && quantityAvailable > 0;
          const imageSrc = product.imageUrl || productImages[product.category] || '/images/product_bar.jpg';

          return (
            <div key={product.id} className="grid md:grid-cols-12 rounded-3xl border border-[#E8E1D5] bg-white overflow-hidden shadow-xs hover:border-[#C9A857]/40 hover:shadow-md transition-all duration-500 group">
              {/* Product Visual */}
              <div className={`md:col-span-6 bg-[#FAF8F5] flex items-center justify-center min-h-[340px] md:min-h-[420px] relative overflow-hidden p-8 image-hover-zoom ${idx % 2 === 1 ? 'md:order-2' : ''}`}>
                <div className="relative w-full h-full max-w-[320px] aspect-square rounded-2xl overflow-hidden border border-[#E8E1D5] bg-white p-4">
                  <Image
                    src={imageSrc}
                    alt={product.nameFa}
                    fill
                    sizes="(max-width: 768px) 100vw, 320px"
                    className="object-cover rounded-xl"
                  />
                </div>

                {/* Availability badge */}
                <div className="absolute top-6 right-6">
                  <span className={`text-xs tracking-brand px-3 py-1.5 rounded-full backdrop-blur-md ${isAvailable ? 'bg-white/90 text-emerald-800 border border-emerald-300' : 'bg-white/90 text-[#7D776C] border border-[#E8E1D5]'}`}>
                    {isAvailable ? `موجودی: ${toPersianDigits(quantityAvailable.toString())}` : 'اتمام موجودی'}
                  </span>
                </div>
              </div>

              {/* Product Details */}
              <div className={`md:col-span-6 p-8 md:p-12 flex flex-col justify-between ${idx % 2 === 1 ? 'md:order-1' : ''}`}>
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs tracking-brand font-bold text-[#C9A857]">
                      قطعه ۰{toPersianDigits((idx + 1).toString())}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#133827] uppercase">
                      {toPersianDigits(weightGrams.toString())} G
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-[#141210] tracking-tight mb-1">{product.nameFa}</h3>
                  <p className="text-xs text-[#7D776C] mb-8 tracking-wider uppercase font-mono">{product.nameEn}</p>

                  {/* Price breakdown */}
                  <div className="space-y-3.5 border-t border-[#E8E1D5] pt-6 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-[#4A463F]">ارزش خام طلا</span>
                      <span className="font-num text-[#141210]">{formatNumber(Number(baseValueRial / BigInt(10)))} تومان</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#4A463F]">اجرت ضرب / پریمیوم</span>
                      <span className="font-num text-[#141210]">{formatNumber(Number((premiumRial + makingChargeRial) / BigInt(10)))} تومان</span>
                    </div>
                    <div className="flex justify-between items-center border-t border-[#E8E1D5] pt-4">
                      <span className="font-bold text-[#141210]">مبلغ کل قابل پرداخت</span>
                      <span className="text-2xl font-bold font-num text-[#133827] tracking-tight">{formatNumber(totalPriceToman)} تومان</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4">
                  <form action={buyProductAction as unknown as string}>
                    <input type="hidden" name="productId" value={product.id} />
                    <input type="hidden" name="idempotencyKey" value={crypto.randomUUID()} />
                    <Button
                      type="submit"
                      disabled={cashBalanceToman < totalPriceToman || !isAvailable}
                      className="w-full"
                      size="lg"
                      variant={!isAvailable || cashBalanceToman < totalPriceToman ? 'secondary' : 'primary'}
                    >
                      {!isAvailable ? 'موقتاً ناموجود' : cashBalanceToman < totalPriceToman ? 'موجودی ناکافی کیف پول' : 'خرید و ثبت سفارش تحویل'}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
