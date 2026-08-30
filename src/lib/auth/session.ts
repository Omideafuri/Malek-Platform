import { db } from '@/lib/db';
import { randomBytes, createHash } from 'node:crypto';
import { cookies, headers } from 'next/headers';
import type { User } from '@prisma/client';

export const SESSION_COOKIE_NAME = 'malektalaa_session';
export const ROLE_COOKIE_NAME = 'malektalaa_role';
export const SESSION_MAX_AGE = 30 * 24 * 60 * 60; // 30 days in seconds

/**
 * Creates a new session in the database and sets the session cookie.
 */
export async function createSession(user: Pick<User, 'id' | 'role'>) {
  // Generate a random secure token
  const token = randomBytes(32).toString('base64url');
  
  // Hash the token before storing it in the database
  const tokenHash = createHash('sha256').update(token).digest('hex');
  
  const expiresAt = new Date(Date.now() + SESSION_MAX_AGE * 1000);
  
  // Get IP and User Agent from headers
  const headerList = await headers();
  const ipAddress = headerList.get('x-forwarded-for') || '127.0.0.1';
  const userAgent = headerList.get('user-agent') || 'Unknown';

  // Store session in database
  await db.session.create({
    data: {
      userId: user.id,
      tokenHash,
      expiresAt,
      ipAddress,
      userAgent,
    },
  });

  const cookieStore = await cookies();
  
  // Set the session cookie (secure, httpOnly)
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: expiresAt,
    path: '/',
  });

  // Set the role cookie (used by middleware for quick RBAC checks)
  cookieStore.set(ROLE_COOKIE_NAME, user.role, {
    httpOnly: false, // Middleware can read this, but it's not a security risk as the real check is on the server
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: expiresAt,
    path: '/',
  });
}

/**
 * Validates the current session from cookies.
 * Returns the user if valid, otherwise null.
 */
export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    
    if (!token) {
      return null;
    }

    const tokenHash = createHash('sha256').update(token).digest('hex');

    const session = await db.session.findUnique({
      where: { tokenHash },
      include: {
        user: {
          select: {
            id: true,
            mobile: true,
            role: true,
            status: true,
            profile: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });

    if (!session || session.expiresAt < new Date()) {
      return null;
    }

    // Check if user is still active
    if (session.user.status !== 'ACTIVE') {
      return null;
    }

    return session.user;
  } catch (error) {
    console.error('Error validating session:', error);
    return null;
  }
}

/**
 * Destroys the current session and clears cookies.
 */
export async function destroySession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  
  if (token) {
    const tokenHash = createHash('sha256').update(token).digest('hex');
    try {
      await db.session.delete({
        where: { tokenHash },
      });
    } catch {
      // Session might already be deleted or invalid
    }
  }

  cookieStore.delete(SESSION_COOKIE_NAME);
  cookieStore.delete(ROLE_COOKIE_NAME);
}
