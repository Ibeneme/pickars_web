import HeroSection from "@/components/landing-page/home-sections/hero";
import HomeTestimonialsSection from "@/components/landing-page/home-sections/home-testimonials-section";
import HomeWithMapSection from "@/components/landing-page/home-sections/home-with-map-section";
import HowItWorks from "@/components/landing-page/home-sections/how-it-works";
import NeverLateSection from "@/components/landing-page/home-sections/never-late-section";
import PackageDeliverySection from "@/components/landing-page/home-sections/package-delivery-section";
import QualitiesSliderSection from "@/components/landing-page/home-sections/qualities-slider-section";
import type { Metadata } from "next";
import { baseUrl } from "@/utils/constants";



// Home Page Metadata (Open Graph, Twitter, Meta Tags)
export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Pickars: Your doorstep deliveries, redefined.",
  description:
    "Book fast, reliable dispatch riders for same-day package and parcel delivery anywhere in Port Harcourt.",
  keywords: [
    "Pickars",
    "dispatch riders",
    "Port Harcourt",
    "same-day delivery",
    "bike courier",
    "Rivers State",
    "logistics company Port Harcourt",
  ],
  authors: [{ name: "Pickars Courier Limited" }],
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
  alternates: {
    canonical: "/",
    languages: {
      "en-NG": "/",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Pickars Logistics",
    locale: "en_NG",
    title: "Pickars: Your doorstep deliveries, redefined.",
    description:
      "Book fast, reliable dispatch riders for same-day package and parcel delivery anywhere in Port Harcourt.",
    images: [
      {
        url: "/opengraphs/box.png",
        secureUrl: `${baseUrl}/opengraphs/box.png`,
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "PICKARS - Fast Dispatch Riders & Bike Couriers in Port Harcourt",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@pickars_app",
    creator: "@pickars_app",
    title:
      "Dispatch Riders in Port Harcourt | Same-Day Bike Couriers | PICKARS",
    description:
      "Book reliable dispatch riders near you in Port Harcourt. Fast same-day parcel delivery & bike courier service across Rivers State.",
    images: ["/opengraphs/box.png"],
  },
  appLinks: {
    ios: {
      url: `ios-app://6746796884/${baseUrl.replace(/^https?:\/\//, "")}`,
      app_store_id: "6746796884",
    },
    android: {
      url: `android-app://com.pickars.app/${baseUrl.replace(
        /^https?:\/\//,
        ""
      )}`,
      package: "com.pickars.app",
    },
  },
  other: {
    "apple-itunes-app": "app-id=6746796884",
    "geo.region": "NG-RI",
    "geo.placename": "Port Harcourt",
    "geo.position": "4.824167;7.080833",
    ICBM: "4.824167, 7.080833",
    language: "English",
    coverage: "Port Harcourt, Rivers State, Nigeria",
    distribution: "local",
    target: "all",
    HandheldFriendly: "True",
    MobileOptimized: "320",
    "format-detection": "telephone=no",
  },
};

// Home Page JSON-LD Structured Data
const jsonLdData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`,
      url: `${baseUrl}/`,
      name: "Pickars",
      alternateName: [
        "Pickars Logistics",
        "Pickars Dispatch",
        "Pickars Courier",
      ],
      description:
        "Fast & reliable dispatch riders and bike courier service in Port Harcourt and Rivers State.",
      inLanguage: "en-NG",
      potentialAction: {
        "@type": "SearchAction",
        target: `${baseUrl}/?s={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "WebPage",
      "@id": `${baseUrl}/#webpage`,
      url: `${baseUrl}/`,
      name: "Dispatch Riders in Port Harcourt | Same-Day Bike Couriers | Pickars",
      description:
        "Book trusted dispatch riders in Port Harcourt for same-day parcel delivery. Fast bike couriers across GRA, Trans Amadi, Woji and Rivers State.",
      isPartOf: {
        "@id": `${baseUrl}/#website`,
      },
    },
    {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      name: "Pickars Courier Limited",
      legalName: "Pickars Courier Limited",
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/opengraphs/box.png`,
        width: 1200,
        height: 630,
      },
      sameAs: [
        "https://apps.apple.com/ng/app/pickars/id6746796884",
        "https://play.google.com/store/apps/details?id=com.pickars.app&hl=en",
        "https://www.instagram.com/pickars_official",
        "https://x.com/pickars_app",
        "https://www.facebook.com/share/1cW4kyitrJ/",
        "https://www.linkedin.com/company/pickars/",
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+2349164860591",
          contactType: "customer service",
          areaServed: "NG",
          availableLanguage: ["English"],
        },
      ],
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${baseUrl}/#mobileapp`,
      name: "Pickars",
      operatingSystem: "iOS, Android",
      applicationCategory: "BusinessApplication",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "NGN",
      },
      screenshot: `${baseUrl}/opengraphs/box.png`,
      image: `${baseUrl}/opengraphs/box.png`,
    },
    {
      "@type": ["LocalBusiness", "CourierService", "DeliveryService"],
      "@id": `${baseUrl}/#localbusiness`,
      name: "PICKARS - Dispatch Riders Port Harcourt",
      alternateName: "PICKARS Bike Couriers",
      image: `${baseUrl}/opengraphs/box.png`,
      logo: `${baseUrl}/opengraphs/box.png`,
      description:
        "Professional dispatch riders and bike courier service in Port Harcourt. Same-day parcel delivery, express package pickup and last-mile logistics across Rivers State. Available in GRA, Trans Amadi, Woji, Rumuokoro, Mile 1, Rumuola and more.",
      url: baseUrl,
      telephone: "+2349164860591",
      priceRange: "₦₦",
      currenciesAccepted: "NGN",
      paymentAccepted: "Cash, Bank Transfer, Card, Mobile Money",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Port Harcourt",
        addressLocality: "Port Harcourt",
        addressRegion: "Rivers",
        postalCode: "500001",
        addressCountry: "NG",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 4.824167,
        longitude: 7.080833,
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "07:00",
        closes: "21:00",
      },
      areaServed: [
        { "@type": "City", name: "Port Harcourt" },
        { "@type": "AdministrativeArea", name: "Rivers State" },
        { "@type": "Place", name: "GRA Port Harcourt" },
        { "@type": "Place", name: "Trans Amadi" },
        { "@type": "Place", name: "Woji" },
        { "@type": "Place", name: "Rumuokoro" },
        { "@type": "Place", name: "Rumuola" },
        { "@type": "Place", name: "Mile 1" },
        { "@type": "Place", name: "Mile 3" },
        { "@type": "Place", name: "Diobu" },
        { "@type": "Place", name: "Rumuomasi" },
        { "@type": "Place", name: "Elelenwo" },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${baseUrl}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "How do I book a dispatch rider in Port Harcourt?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Download the PICKARS app on iOS or Android, enter your pickup and drop-off locations, and a nearby dispatch rider will be assigned to you within minutes.",
          },
        },
        {
          "@type": "Question",
          name: "Does PICKARS offer same-day delivery in Port Harcourt?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. PICKARS provides same-day and express bike courier services across Port Harcourt including GRA, Trans Amadi, Woji, Rumuokoro and surrounding areas.",
          },
        },
        {
          "@type": "Question",
          name: "Which areas do your dispatch riders cover in Rivers State?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Our riders cover Port Harcourt city and major areas including GRA, Trans Amadi, Woji, Rumuokoro, Mile 1, Mile 3, Diobu, Rumuola, Elelenwo and more across Rivers State.",
          },
        },
      ],
    },
  ],
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdData).replace(/</g, "\\u003c"),
        }}
      />
      <HeroSection />
      <QualitiesSliderSection />
      <HomeWithMapSection />
      <PackageDeliverySection />
      <HowItWorks />
      <NeverLateSection />
      <HomeTestimonialsSection />
    </main>
  );
}
