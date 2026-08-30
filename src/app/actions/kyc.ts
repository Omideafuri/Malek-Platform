'use server';

import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth/session';
import { revalidatePath } from 'next/cache';

export async function submitKycAction(formData: FormData) {
  try {
    const user = await getCurrentUser();
    if (!user) return { success: false, error: 'Unauthorized' };

    const nationalId = formData.get('nationalId') as string;
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    
    // In a real app, we'd process files and upload to S3 here.
    // We'll mock the URLs for the MVP.
    const mockUrl = 'https://mock-storage.malektalaa.com/placeholder.jpg';

    // 1. Update Profile
    await db.profile.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        nationalId,
        firstName,
        lastName,
      },
      update: {
        nationalId,
        firstName,
        lastName,
      }
    });

    // 2. Create KYC Application
    await db.kycApplication.create({
      data: {
        userId: user.id,
        status: 'PENDING',
        nationalIdFrontUrl: mockUrl,
        nationalIdBackUrl: mockUrl,
        selfieUrl: mockUrl,
      }
    });

    revalidatePath('/profile');
    return { success: true };
  } catch (error: unknown) {
    console.error('KYC submit error:', error);
    return { success: false, error: 'خطا در ثبت اطلاعات احراز هویت' };
  }
}

export async function reviewKycAction(applicationId: string, action: 'VERIFIED' | 'REJECTED', reason?: string) {
  try {
    const admin = await getCurrentUser();
    if (!admin || !['ADMIN', 'SUPER_ADMIN'].includes(admin.role)) {
      return { success: false, error: 'Unauthorized' };
    }

    const application = await db.kycApplication.findUnique({
      where: { id: applicationId },
      include: { user: true }
    });

    if (!application) return { success: false, error: 'Application not found' };

    await db.$transaction(async (tx) => {
      // 1. Update Application only if it's currently PENDING or UNDER_REVIEW
      const result = await tx.kycApplication.updateMany({
        where: { id: applicationId, status: { in: ['PENDING', 'UNDER_REVIEW'] } },
        data: {
          status: action,
          rejectionReason: reason,
          reviewedById: admin.id,
          reviewedAt: new Date(),
        }
      });

      if (result.count === 0) {
        throw new Error('درخواست قبلاً بررسی شده است');
      }

      // 2. If VERIFIED, update user status to active (or mark KYC done)
      if (action === 'VERIFIED') {
        // Assume active if they pass KYC
        await tx.user.update({
          where: { id: application.userId },
          data: { status: 'ACTIVE' } // Depending on your business logic
        });
      }
    });

    revalidatePath('/admin/kyc');
    return { success: true };
  } catch (error: unknown) {
    if (error instanceof Error && error.message.includes('بررسی شده')) {
      return { success: false, error: error.message };
    }
    console.error('KYC review error:', error);
    return { success: false, error: 'خطا در بررسی احراز هویت' };
  }
}
