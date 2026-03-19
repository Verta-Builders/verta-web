import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const host = request.headers.get('host');
  const url = request.nextUrl.clone();

  // Redirect non-www to www (e.g., verta.builders -> www.verta.builders)
  if (process.env.NODE_ENV === 'production' && host === 'verta.builders') {
    return NextResponse.redirect(`https://www.verta.builders${request.nextUrl.pathname}${request.nextUrl.search}`, 301);
  }

  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames except for
  // - API routes
  // - Static files (/_next, /images, /favicon.ico, etc.)
  // - Public assets
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ]
};
