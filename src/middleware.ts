import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/utils/supabase/middleware';

export async function middleware(request: NextRequest) {
  // Skip middleware for static files and images
  if (
    request.nextUrl.pathname.match(
      /(api|_next|.*\.(ico|png|jpg|jpeg|gif|webp)$)/
    )
  ) {
    return NextResponse.next();
  }

  console.log('Middleware running for path:', request.nextUrl.pathname);
  return await updateSession(request);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
