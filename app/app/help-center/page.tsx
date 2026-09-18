import { categories } from "@/components/landing-page/help-center/faq-data";
import HelpCenterClient from "@/components/landing-page/help-center/help-center-client";
import { baseUrl } from "@/utils/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Help Center & FAQs | Pickars Delivery Support Port Harcourt",
  description:
    "Find fast answers to questions about booking dispatch riders, tracking parcels live, payments, refunds, and rider onboarding at the Pickars Help Center.",
  keywords: [
    "Pickars help center",
    "dispatch rider support Port Harcourt",
    "parcel tracking help",
    "logistics customer service PH",
    "Pickars support contact",
  ],
  alternates: {
    canonical: `${baseUrl}/app/help-center`,
  },
  openGraph: {
    type: "website",
    url: `${baseUrl}/app/help-center`,
    siteName: "Pickars Logistics",
    locale: "en_NG",
    title: "Help Center & Customer Support | Pickars Logistics",
    description:
      "Get instant answers on booking, payments, tracking, and customer support for dispatch rider services in Port Harcourt.",
    images: [
      {
        url: `${baseUrl}/opengraphs/faq.png`,
        width: 1200,
        height: 630,
        alt: "Pickars Help Center",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@pickars_app",
    creator: "@pickars_app",
    title: "Help Center & Support | Pickars Logistics",
    description:
      "Find instant answers on booking, payments, tracking, and rider onboarding.",
    images: [`${baseUrl}/opengraphs/faq.png`],
  },
  other: {
    "geo.region": "NG-RI",
    "geo.placename": "Port Harcourt",
    "geo.position": "4.824167;7.080833",
    ICBM: "4.824167, 7.080833",
  },
};

export default function HelpCenterPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: categories.flatMap((cat) =>
      cat.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer.replace(/\*\*/g, ""),
        },
      }))
    ),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HelpCenterClient />
    </>
  );
}
