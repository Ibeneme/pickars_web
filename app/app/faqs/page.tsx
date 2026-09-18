import FAQsClientPage from "@/components/landing-page/faqs/faq-section";
import { baseUrl } from "@/utils/constants";
import { Metadata } from "next";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I book a dispatch rider in Port Harcourt with Pickars?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can quickly book a dispatch rider using the Pickars mobile app or website. Enter your pickup and delivery locations in Port Harcourt for instant rider matching and real-time tracking.",
      },
    },
    {
      "@type": "Question",
      name: "How fast are Pickars delivery pickups in Port Harcourt?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our nearby dispatch riders typically pick up parcels within minutes of booking and deliver on the same day across GRA, Trans Amadi, Woji, and other areas in Port Harcourt.",
      },
    },
    {
      "@type": "Question",
      name: "How can I track my parcel live?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Once a dispatch rider accepts your request, you can monitor their live GPS position and package progress on the Pickars tracking page or mobile app.",
      },
    },
    {
      "@type": "Question",
      name: "What items can be delivered using Pickars dispatch riders?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pickars handles documents, food orders, e-commerce products, electronics, and small-to-medium packages securely across Rivers State.",
      },
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title:
    "Frequently Asked Questions | Pickars Dispatch & Delivery Port Harcourt",
  description:
    "Get answers to FAQs on booking dispatch riders in Port Harcourt, delivery rates, live package tracking, rider signups, and customer support with Pickars.",
  keywords: [
    "Pickars FAQs",
    "dispatch rider questions Port Harcourt",
    "courier delivery help",
    "package tracking Port Harcourt",
    "bike delivery rates PH",
  ],
  alternates: {
    canonical: `${baseUrl}/app/faqs`,
  },
  openGraph: {
    type: "website",
    url: `${baseUrl}/app/faqs`,
    siteName: "Pickars Logistics",
    locale: "en_NG",
    title: "Frequently Asked Questions | Pickars Delivery",
    description:
      "Find answers to common questions about booking dispatch riders, tracking shipments, pricing, and driver support in Port Harcourt.",
    images: [
      {
        url: `${baseUrl}/opengraphs/faq.png`,
        width: 1200,
        height: 630,
        alt: "Pickars Frequently Asked Questions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@pickars_app",
    creator: "@pickars_app",
    title: "Frequently Asked Questions | Pickars Delivery",
    description:
      "Find answers to common questions about booking dispatch riders, tracking shipments, and pricing in Port Harcourt.",
    images: [`${baseUrl}/opengraphs/faq.png`],
  },
  other: {
    "geo.region": "NG-RI",
    "geo.placename": "Port Harcourt",
    "geo.position": "4.824167;7.080833",
    ICBM: "4.824167, 7.080833",
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FAQsClientPage />
    </>
  );
}
