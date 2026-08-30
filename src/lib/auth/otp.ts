import { db } from '@/lib/db';
import { createHash, randomInt } from 'node:crypto';
import { getNotificationProvider } from '@/lib/providers';
import type { OtpPurpose } from '@prisma/client';

/**
 * Generates a 6-digit OTP, saves it in the database, and sends it via SMS.
 */
export async function generateAndSendOtp(mobile: string, purpose: OtpPurpose) {
  // Rate limiting: max 1 OTP request per minute per mobile
  const recentOtp = await db.otpCode.findFirst({
    where: { 
      mobile, 
      createdAt: { gt: new Date(Date.now() - 60 * 1000) } 
    }
  });

  if (recentOtp) {
    throw new Error('لطفاً ۱ دقیقه صبر کنید و سپس دوباره تلاش کنید.');
  }

  // Generate 6-digit code securely
  const code = randomInt(100000, 999999).toString();
  const codeHash = createHash('sha256').update(code).digest('hex');
  const expiresAt = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes expiry

  // Invalidate any active OTPs for this mobile and purpose
  await db.otpCode.updateMany({
    where: {
      mobile,
      purpose,
      usedAt: null,
      expiresAt: { gt: new Date() },
    },
    data: {
      usedAt: new Date(), // Mark as used to invalidate
    },
  });

  // Save new OTP
  await db.otpCode.create({
    data: {
      mobile,
      codeHash,
      purpose,
      expiresAt,
    },
  });

  // Send via Notification Provider (Mocked currently)
  const notifier = getNotificationProvider();
  await notifier.sendSms(
    mobile,
    `کد تأیید شما در ملک طلا:\n${code}\nاین کد تا ۲ دقیقه معتبر است.`
  );

  return true;
}

/**
 * Verifies an OTP code against the database.
 */
export async function verifyOtp(mobile: string, code: string, purpose: OtpPurpose) {
  const codeHash = createHash('sha256').update(code).digest('hex');

  // Find the most recent active OTP
  const otp = await db.otpCode.findFirst({
    where: {
      mobile,
      purpose,
      usedAt: null,
      expiresAt: { gt: new Date() },
    },
    orderBy: { createdAt: 'desc' },
  });

  if (!otp) {
    return { success: false, error: 'کد نامعتبر یا منقضی شده است' };
  }

  if (otp.attempts >= otp.maxAttempts) {
    return { success: false, error: 'تعداد دفعات مجاز وارد کردن کد به پایان رسیده است' };
  }

  if (otp.codeHash !== codeHash) {
    // Increment attempts
    await db.otpCode.update({
      where: { id: otp.id },
      data: { attempts: { increment: 1 } },
    });
    return { success: false, error: 'کد وارد شده اشتباه است' };
  }

  // Mark as used
  await db.otpCode.update({
    where: { id: otp.id },
    data: { usedAt: new Date() },
  });

  return { success: true };
}
