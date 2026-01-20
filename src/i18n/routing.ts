import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'el'],
  
  // Used when no locale matches
  defaultLocale: 'en',
  
  // Hide the default locale prefix from URLs (/ instead of /en/)
  localePrefix: 'as-needed'
});

export type Locale = (typeof routing.locales)[number];
