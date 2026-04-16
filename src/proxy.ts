import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'de'];
const defaultLocale = 'de';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Skip if it already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  if (pathnameHasLocale) return;

  // 2. Skip for static files and internal Next.js paths
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return;
  }

  // 3. Redirect to default locale for root or unlocalized paths
  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    // Catch all paths that could be localized
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};
