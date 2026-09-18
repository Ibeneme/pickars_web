import PrivacyPolicy from "@/components/landing-page/legals-and-policies/privacy-policies";
import { baseUrl } from "@/utils/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Privacy Policy | Pickars Courier Limited",
  description:
    "Learn how Pickars Courier Limited collects, uses, and protects your personal data under the Nigeria Data Protection Act (NDPA) 2023.",
  keywords: [
    "Pickars privacy policy",
    "data protection NDPA Nigeria",
    "Pickars user data security",
  ],
  alternates: {
    canonical: `${baseUrl}/app/privacy-policy`,
  },
  openGraph: {
    type: "website",
    url: `${baseUrl}/app/privacy-policy`,
    siteName: "Pickars Logistics",
    locale: "en_NG",
    title: "Privacy Policy | Pickars Courier Limited",
    description:
      "Read our data protection practices and privacy commitments to our users in Port Harcourt and Nigeria.",
    images: [
      {
        url: `${baseUrl}/opengraphs/privacy.png`,
        width: 1200,
        height: 630,
        alt: "Pickars Privacy Policy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@pickars_app",
    creator: "@pickars_app",
    title: "Privacy Policy | Pickars Courier Limited",
    description:
      "Learn how Pickars Courier Limited protects your data and privacy.",
    images: [`${baseUrl}/opengraphs/privacy.png`],
  },
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicy />;
}
