import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for
  // - API routes
  // - Static files (/_next, /images, /favicon.ico, etc.)
  // - Public assets
  matcher: [
    // Match all pathnames except for
    // - /api, /_next, /favicon.ico, etc.
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ]
};
