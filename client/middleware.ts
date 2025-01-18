import { cookies } from 'next/headers';
import { NextResponse, NextRequest } from 'next/server';

export default async function middleware(req: NextRequest) {
  const cookieStore = await cookies(); // Await the cookies promise

  // Check for the 'access' cookie
  if (cookieStore.has('access')) {
    if (req.nextUrl.pathname.includes('/sign-in') || req.nextUrl.pathname.includes('/sign-up') || req.nextUrl.pathname.includes('/landing') || req.nextUrl.pathname.includes('/activation/') || req.nextUrl.pathname === '/') {
        return NextResponse.redirect(new URL('/dashboard', req.url))
    } else {
        return NextResponse.next();
    }
  } else if (req.nextUrl.pathname.includes('/sign-in') || req.nextUrl.pathname.includes('/sign-up') || req.nextUrl.pathname.includes('/activation/')) {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL('/landing', req.url));
}

export const config = {
  matcher: ['/', '/dashboard/:path*', '/sign-in/:path*', '/onboarding/:path*', '/sign-up/:path*', '/activation/:path*'], // Apply middleware to this route
};
