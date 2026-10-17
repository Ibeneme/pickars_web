import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ReduxProvider from "@/components/providers/redux-provider";
import MainLayout from "@/components/layouts/MainLayout";
import JsonLd from "@/components/seo/json-ld";
import { baseUrl } from "@/utils/constants";
import {
  LOGO_PATH,
  OG_IMAGES,
  OG_IMAGE_SIZE,
  SITE,
  STORES,
} from "@/utils/seo/config";
import { graph, organizationSchema, websiteSchema } from "@/utils/seo/schema";

const lufga = localFont({
  src: [
    { path: "../public/fonts/LufgaLight.ttf", weight: "300", style: "normal" },
    { path: "../public/fonts/LufgaRegular.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/LufgaMedium.ttf", weight: "500", style: "normal" },
    { path: "../public/fonts/LufgaSemiBold.ttf", weight: "600", style: "normal" },
    { path: "../public/fonts/LufgaBold.ttf", weight: "700", style: "normal" },
    {
      path: "../public/fonts/LufgaExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-lufga",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#0F172A" },
  ],
};

const DEFAULT_TITLE =
  "Pickars: Dispatch Riders & Same-Day Delivery in Port Harcourt";
const DEFAULT_DESCRIPTION =
  "Book trusted dispatch riders for same-day parcel and package delivery across Port Harcourt. Live GPS tracking, upfront pricing and instant rider matching.";

/**
 * Site-wide defaults. Individual pages override title, description,
 * canonical, Open Graph and Twitter through `createPageMetadata`.
 * (Canonical is intentionally NOT set here, otherwise every page without its
 * own canonical would wrongly point to the homepage.)
 */
export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  applicationName: SITE.name,
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE.name}`,
  },
  description: DEFAULT_DESCRIPTION,
  authors: [{ name: SITE.legalName, url: SITE.url }],
  creator: SITE.foundingCompany.name,
  publisher: SITE.legalName,
  category: "logistics",
  formatDetection: { telephone: false, email: false, address: false },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
  icons: {
    icon: [{ url: LOGO_PATH, type: "image/svg+xml" }],
    shortcut: LOGO_PATH,
    apple: [{ url: LOGO_PATH }],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: SITE.name,
  },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: SITE.locale,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: OG_IMAGES.default,
        ...OG_IMAGE_SIZE,
        alt: `${SITE.name} – ${SITE.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: SITE.twitterHandle,
    creator: SITE.twitterHandle,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [OG_IMAGES.default],
  },
  other: {
    // iOS Safari "Smart App Banner"
    "apple-itunes-app": `app-id=${STORES.ios.appId}`,
    // Local-search hints (Bing and some directories still read these)
    "geo.region": SITE.geo.region,
    "geo.placename": SITE.geo.placename,
    "geo.position": `${SITE.geo.latitude};${SITE.geo.longitude}`,
    ICBM: `${SITE.geo.latitude}, ${SITE.geo.longitude}`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={SITE.language} dir="ltr" className={lufga.variable}>
      <body
        className={`${lufga.className} bg-slate-50 antialiased text-slate-900 selection:bg-amber-400 selection:text-slate-900`}
      >
        {/* Site-wide entities only; page-specific schema lives on each page. */}
        <JsonLd data={graph(organizationSchema(), websiteSchema())} />
        <ReduxProvider>
          <MainLayout>{children}</MainLayout>
        </ReduxProvider>
      </body>
    </html>
  );
}
