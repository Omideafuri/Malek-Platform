'use server';

import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth/session';
import { revalidatePath } from 'next/cache';
import { getLatestPriceSnapshot } from '@/lib/financial/pricing';
import { getNotificationProvider } from '@/lib/providers';

export async function createAlertAction(formData: FormData) {
  try {
    const user = await getCurrentUser();
    if (!user) return { success: false, error: 'Unauthorized' };

    const targetPriceStr = formData.get('targetPrice') as string;
    const conditionType = formData.get('conditionType') as 'ABOVE' | 'BELOW';

    if (!targetPriceStr || isNaN(Number(targetPriceStr))) {
      return { success: false, error: 'مبلغ وارد شده نامعتبر است' };
    }

    const targetPriceRial = BigInt(targetPriceStr) * BigInt(10); // Toman to Rial

    await db.priceAlert.create({
      data: {
        userId: user.id,
        goldType: '18K',
        conditionType,
        targetPriceRial,
        isActive: true,
        isTriggered: false,
      }
    });

    revalidatePath('/alerts');
    return { success: true };
  } catch (error: unknown) {
    if (error instanceof Error) console.error('Create alert error:', error);
    return { success: false, error: 'خطا در ثبت هشدار قیمت' };
  }
}

export async function deleteAlertAction(alertId: string) {
  try {
    const user = await getCurrentUser();
    if (!user) return { success: false, error: 'Unauthorized' };

    await db.priceAlert.delete({
      where: { 
        id: alertId,
        userId: user.id // Security check
      }
    });

    revalidatePath('/alerts');
    return { success: true };
  } catch {
    return { success: false, error: 'خطا در حذف هشدار' };
  }
}

/**
 * Note: This would typically be called by a background worker every minute
 * whenever a new price is fetched from the upstream provider.
 */
export async function checkPriceAlerts() {
  const snapshot = await getLatestPriceSnapshot('18K');
  const currentPriceRial = snapshot.buyPriceRial; // Base alert on our selling price (user buying price)

  const activeAlerts = await db.priceAlert.findMany({
    where: { isActive: true, isTriggered: false, goldType: '18K' },
    include: { user: true }
  });

  const notifications = getNotificationProvider();
  let triggeredCount = 0;

  for (const alert of activeAlerts) {
    if (!alert.targetPriceRial) continue;

    let isHit = false;
    if (alert.conditionType === 'ABOVE' && currentPriceRial >= alert.targetPriceRial) {
      isHit = true;
    } else if (alert.conditionType === 'BELOW' && currentPriceRial <= alert.targetPriceRial) {
      isHit = true;
    }

    if (isHit) {
      // Mark as triggered
      await db.priceAlert.update({
        where: { id: alert.id },
        data: {
          isTriggered: true,
          isActive: false,
          triggeredAt: new Date(),
        }
      });

      // Send SMS Notification
      const targetToman = Number(alert.targetPriceRial / BigInt(10)).toLocaleString();
      const conditionFa = alert.conditionType === 'ABOVE' ? 'بالاتر از' : 'پایین‌تر از';
      
      await notifications.sendSms(
        alert.user.mobile,
        `ملک طلا: هشدار قیمت طلا! قیمت طلا اکنون ${conditionFa} ${targetToman} تومان است.`
      );

      triggeredCount++;
    }
  }

  return { triggeredCount };
}
