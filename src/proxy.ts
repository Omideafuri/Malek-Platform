import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Routes that require authentication
const protectedPaths = [
  '/dashboard',
  '/buy',
  '/sell',
  '/wallet',
  '/transactions',
  '/transfer',
  '/savings',
  '/alerts',
  '/delivery',
  '/profile',
  '/settings',
];

// Routes only for unauthenticated users
const authPaths = ['/login', '/register', '/verify', '/forgot-password'];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check for session cookie
  const sessionToken = request.cookies.get('malektalaa_session')?.value;
  const isAuthenticated = !!sessionToken;

  // Check admin role (stored in a separate cookie for proxy performance)
  const userRole = request.cookies.get('malektalaa_role')?.value;
  const isAdmin = ['ADMIN', 'SUPER_ADMIN'].includes(userRole || '');

  // Redirect authenticated users away from auth pages
  if (isAuthenticated && authPaths.some((p) => pathname.startsWith(p))) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Redirect unauthenticated users to login
  if (!isAuthenticated && protectedPaths.some((p) => pathname.startsWith(p))) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect non-admins from admin routes
  if (pathname.startsWith('/admin') && !isAdmin) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes
     * - _next (Next.js internals)
     * - static files (favicon, images, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|fonts|images|icons).*)',
  ],
};
