import AppFeaturesDeliveryOptions from "@/components/landing-page/app-features-section/app-features-delivery-section";
import AppFeaturesHero from "@/components/landing-page/app-features-section/app-features-hero";
import AppFeaturesMockup from "@/components/landing-page/app-features-section/app-features-mockups";
import AppFeaturesNotifications from "@/components/landing-page/app-features-section/app-features-notifications";
import { baseUrl } from "@/utils/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Pickars App Features | Real-Time Dispatch Tracking & Delivery App",
  description:
    "Explore Pickars delivery app features: live GPS rider tracking, instant dispatch bookings, automated notifications, and flexible package delivery in Port Harcourt.",
  keywords: [
    "Pickars app features",
    "dispatch rider app Port Harcourt",
    "live delivery tracking app",
    "bike courier booking app",
    "logistics app Nigeria",
    "same day parcel tracking",
  ],
  alternates: {
    canonical: `${baseUrl}/app-features`,
  },
  openGraph: {
    type: "website",
    url: `${baseUrl}/app/app-features`,
    siteName: "Pickars Logistics",
    locale: "en_NG",
    title: "Pickars App Features | Real-Time Dispatch Tracking & Delivery App",
    description:
      "Track dispatch riders in real-time, schedule express package pickups, and enjoy instant order alerts with the Pickars app.",
    images: [
      {
        url: `${baseUrl}/opengraphs/app-features.png`,
        width: 1200,
        height: 630,
        alt: "Pickars Mobile Delivery App Interface",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@pickars_app",
    creator: "@pickars_app",
    title: "Pickars App Features | Fast Dispatch & GPS Tracking",
    description:
      "Experience fast dispatch booking, real-time rider tracking, and seamless parcel deliveries with the Pickars app.",
    images: [`${baseUrl}/opengraphs/app-features.png`],
  },
  other: {
    "geo.region": "NG-RI",
    "geo.placename": "Port Harcourt",
    "geo.position": "4.824167;7.080833",
    ICBM: "4.824167, 7.080833",
  },
};

const appSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Pickars Mobile Delivery App",
  operatingSystem: "Android, iOS",
  applicationCategory: "LogisticsApplication",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "NGN",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    ratingCount: "310",
  },
  description:
    "Pickars delivery app features real-time dispatch tracking, instant bike courier booking, flexible payment options, and automated notifications in Port Harcourt.",
};

const featureSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Pickars App Key Delivery Features",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Real-time Dispatch Map & GPS Tracking",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Instant Bike Courier Booking",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Automated Package Status Notifications",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Flexible Delivery Options & Express Dispatch",
    },
  ],
};

export default function AppFeaturesPage() {
  return (
    <div className="relative bg-[#fff] selection:bg-red-600 selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(appSchema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(featureSchema).replace(/</g, "\\u003c"),
        }}
      />

      <main>
        <AppFeaturesHero />
        <AppFeaturesDeliveryOptions />
        <AppFeaturesNotifications />
        <AppFeaturesMockup />
      </main>
    </div>
  );
}
