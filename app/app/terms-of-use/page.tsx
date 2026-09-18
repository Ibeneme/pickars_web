import TermsAndConditions from "@/components/landing-page/legals-and-policies/terms";
import { baseUrl } from "@/utils/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Terms of Service | Pickars Courier Limited",
  description:
    "Official Terms of Service for Pickars Courier Limited – the technology platform connecting customers with independent dispatch riders in Port Harcourt, Nigeria.",
  keywords: [
    "Pickars terms of service",
    "Pickars user agreement",
    "dispatch courier terms Nigeria",
  ],
  alternates: {
    canonical: `${baseUrl}/app/terms-of-use`,
  },
  openGraph: {
    type: "website",
    url: `${baseUrl}/app/terms-of-use`,
    siteName: "Pickars Logistics",
    locale: "en_NG",
    title: "Terms of Service | Pickars Courier Limited",
    description:
      "Read our official terms and conditions governing the use of the Pickars delivery platform.",
    images: [
      {
        url: `${baseUrl}/opengraphs/terms.png`,
        width: 1200,
        height: 630,
        alt: "Pickars Terms of Service",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@pickars_app",
    creator: "@pickars_app",
    title: "Terms of Service | Pickars Courier Limited",
    description:
      "Read our official terms and conditions for using the Pickars platform.",
    images: [`${baseUrl}/opengraphs/terms.png`],
  },
};

export default function TermsAndConditionsPage() {
  return <TermsAndConditions />;
}
