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
    metadataBase: new URL("https://www.verta.builders"),
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
      "software development",
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
    authors: [{ name: "VERTA Digital Agency" }],
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
      url: "https://www.verta.builders",
      title: t('ogTitle'),
      description: t('ogDescription'),
      siteName: "VERTA",
      images: [
        {
          url: "brand/verta-image.png",
          width: 1359,
          height: 785,
          alt: "VERTA Digital Agency",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t('twitterTitle'),
      description: t('twitterDescription'),
      creator: "@verta",
      images: ["brand/verta-image.png"],
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
      canonical: locale === 'el' ? 'https://www.verta.builders/el' : 'https://www.verta.builders',
      languages: {
        'en': 'https://www.verta.builders',
        'el': 'https://www.verta.builders/el',
      },
    },
    verification: {
      google: "thfqbWL1pGnRUzQtNzP5Xhu9Ewwm626dWd52k7fP4yM",
    },
    icons: {
      icon: "/icon.png",
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
        "@id": "https://www.verta.builders/#organization",
        name: "VERTA",
        alternateName: "VERTA Digital Agency",
        url: "https://www.verta.builders",
        logo: {
          "@type": "ImageObject",
          url: "https://www.verta.builders/logo.png",
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
        "@id": "https://www.verta.builders/#website",
        url: "https://www.verta.builders",
        name: "VERTA",
        alternateName: "VERTA Digital Agency",
        publisher: {
          "@id": "https://www.verta.builders/#organization",
        },
        description: t('jsonLd.websiteDescription'),
        inLanguage: ["en", "el"],
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://www.verta.builders/#localbusiness",
        name: "VERTA Digital Agency - Zakynthos HQ",
        image: "https://www.verta.builders/og-image.png",
        url: "https://www.verta.builders",
        telephone: "+306982871389",
        email: "info@verta.builders",
        priceRange: "€€",
        address: {
          "@type": "PostalAddress",
          "streetAddress": "",
          "addressLocality": "Zakynthos",
          "postalCode": "29100",
          "addressCountry": "GR"
        },
        geo: {
          "@type": "GeoCoordinates",
          "latitude": "37.7833",
          "longitude": "20.9000"
        },
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "18:00",
        },
        areaServed: [
          { "@type": "City", "name": "Zakynthos" },
          { "@type": "City", "name": "Thessaloniki" },
          { "@type": "City", "name": "Patras" },
          { "@type": "Country", "name": "Greece" }
        ],
        serviceType: [
          "Web Development",
          "Mobile App Development",
          "Blockchain Development",
          "AI Development"
        ]
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://www.verta.builders/#thessaloniki",
        name: "VERTA Digital Agency - Thessaloniki Hub",
        url: "https://www.verta.builders",
        address: {
          "@type": "PostalAddress",
          "addressLocality": "Thessaloniki",
          "addressCountry": "GR"
        },
        telephone: "+306982871389"
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is the typical timeline for a custom web app?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Based on the project complexity, timelines typically range from 5 days to a few weeks for a production-ready MVP."
            }
          },
          {
            "@type": "Question",
            "name": "Do you provide blockchain consulting for startups?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, we specialize in blockchain engineering and strategic consulting for Web3 startups, particularly on the MultiversX ecosystem."
            }
          },
          {
            "@type": "Question",
            "name": "Where is VERTA Digital Agency located?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We are headquartered in Zakynthos, with a secondary engineering hub in Thessaloniki, Greece. We serve clients across Patras and throughout Greece and the world."
            }
          }
        ]
      }
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
