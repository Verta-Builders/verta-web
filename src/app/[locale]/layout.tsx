import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Outfit, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import "../globals.css";
import LoadingProvider from "@/components/LoadingProvider";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  preload: true,
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  preload: true,
});

export const viewport: Viewport = {
  themeColor: "#020617",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    metadataBase: new URL("https://verta.com"),
    title: {
      default: t('title'),
      template: t('titleTemplate'),
    },
    description: t('description'),
    keywords: [
      "web development agency",
      "mobile app development",
      "web3 development",
      "blockchain development",
      "dapp development",
      "AI development",
      "digital agency Greece",
      "software development Thessaloniki",
      "Next.js development",
      "React development",
      "full-stack development",
      "custom web applications",
      "enterprise software",
      "MultiversX development",
      "smart contracts",
      "ecommerce development",
      "WordPress development",
      "UI/UX design",
      "startup development",
      "SaaS development",
    ],
    authors: [{ name: "Konstantinos Lepidas", url: "https://verta.com" }],
    creator: "VERTA Digital Agency",
    publisher: "VERTA",
    formatDetection: {
      email: true,
      address: true,
      telephone: true,
    },
    category: "Technology",
    classification: "Business",
    referrer: "origin-when-cross-origin",
    openGraph: {
      type: "website",
      locale: locale === 'el' ? 'el_GR' : 'en_US',
      url: "https://verta.com",
      title: t('ogTitle'),
      description: t('ogDescription'),
      siteName: "VERTA",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "VERTA Digital Excellence",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t('twitterTitle'),
      description: t('twitterDescription'),
      images: ["/og-image.png"],
      creator: "@verta",
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: "https://verta.com",
      languages: {
        'en': 'https://verta.com',
        'el': 'https://verta.com/el',
      },
    },
    verification: {
      google: "your-google-verification-code",
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/icon.svg", type: "image/svg+xml" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    },
    manifest: "/manifest.json",
    other: {
      "apple-mobile-web-app-capable": "yes",
      "apple-mobile-web-app-status-bar-style": "black-translucent",
      "apple-mobile-web-app-title": "VERTA",
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as typeof routing.locales[number])) {
    notFound();
  }

  // Providing all messages to the client side is the easiest way to get started
  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: 'metadata' });

  // JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://verta.com/#organization",
        name: "VERTA",
        alternateName: "VERTA Digital Agency",
        url: "https://verta.com",
        logo: {
          "@type": "ImageObject",
          url: "https://verta.com/logo.png",
          width: 512,
          height: 512,
        },
        description: t('jsonLd.organizationDescription'),
        foundingDate: "2018",
        founder: {
          "@type": "Person",
          name: "Konstantinos Lepidas",
          jobTitle: t('jsonLd.founderJobTitle'),
          alumniOf: {
            "@type": "CollegeOrUniversity",
            name: "University of Patras",
          },
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Thessaloniki",
          addressCountry: "Greece",
        },
        sameAs: [
          "https://github.com/verta",
          "https://linkedin.com/company/verta",
          "https://twitter.com/verta",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          email: "info@verta.builders",
          availableLanguage: ["English", "Greek"],
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://verta.com/#website",
        url: "https://verta.com",
        name: "VERTA Digital Agency",
        publisher: {
          "@id": "https://verta.com/#organization",
        },
        description: t('jsonLd.websiteDescription'),
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://verta.com/#service",
        name: "VERTA Digital Agency",
        image: "https://verta.com/og-image.png",
        url: "https://verta.com",
        telephone: "+30-XXX-XXX-XXXX",
        email: "info@verta.builders",
        priceRange: "€€€",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Thessaloniki",
          addressRegion: "Central Macedonia",
          addressCountry: "GR",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 40.6401,
          longitude: 22.9444,
        },
        areaServed: [
          { "@type": "Country", name: "Greece" },
          { "@type": "Continent", name: "Europe" },
          { "@type": "Place", name: "Worldwide" },
        ],
        serviceType: [
          "Web Development",
          "Mobile App Development",
          "Blockchain Development",
          "AI Development",
          "UI/UX Design",
          "E-commerce Development",
        ],
        knowsAbout: [
          "Next.js",
          "React",
          "TypeScript",
          "Node.js",
          "Swift",
          "Blockchain",
          "MultiversX",
          "Smart Contracts",
          "Machine Learning",
          "WordPress",
        ],
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "18:00",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "5",
          reviewCount: "30",
          bestRating: "5",
          worstRating: "1",
        },
      },
    ],
  };

  return (
    <html lang={locale} className="dark">
      <head>
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          strategy="beforeInteractive"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body
        className={`${outfit.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-SZE4DETTCE"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-SZE4DETTCE');
          `}
        </Script>
        <NextIntlClientProvider messages={messages}>
          <LoadingProvider>
            {children}
            <Analytics />
          </LoadingProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
