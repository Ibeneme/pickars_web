import { CompanyCoreValues } from "@/components/landing-page/our-company-sections/company-core-values";
import { CompanyHero } from "@/components/landing-page/our-company-sections/company-hero";
import { CompanyMission } from "@/components/landing-page/our-company-sections/company-mission";
import { baseUrl } from "@/utils/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "About Our Company | Pickars Courier Limited Port Harcourt",
  description:
    "Learn about Pickars Courier Limited—Port Harcourt's leading logistics platform connecting individuals and businesses with vetted dispatch riders for fast, reliable delivery.",
  keywords: [
    "Pickars company",
    "about Pickars",
    "dispatch courier company Port Harcourt",
    "logistics startup Nigeria",
    "same day delivery company PH",
  ],
  alternates: {
    canonical: `${baseUrl}/app/our-company`,
  },
  openGraph: {
    type: "website",
    url: `${baseUrl}/app/our-company`,
    siteName: "Pickars Logistics",
    locale: "en_NG",
    title: "About Pickars Courier Limited | Our Mission & Core Values",
    description:
      "Discover how Pickars is transforming on-demand logistics and courier delivery across Port Harcourt and Rivers State.",
    images: [
      {
        url: `${baseUrl}/opengraphs/box.png`,
        width: 1200,
        height: 630,
        alt: "Pickars Courier Limited Company Overview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@pickars_app",
    creator: "@pickars_app",
    title: "About Pickars | Fast & Reliable Logistics",
    description:
      "Empowering seamless dispatch and delivery services across Port Harcourt.",
    images: [`${baseUrl}/about-us.png`],
  },
  other: {
    "geo.region": "NG-RI",
    "geo.placename": "Port Harcourt",
    "geo.position": "4.824167;7.080833",
    ICBM: "4.824167, 7.080833",
  },
};

const companySchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Pickars Courier Limited",
  url: baseUrl,
  logo: `${baseUrl}/about-us.png`,
  description:
    "On-demand dispatch delivery and courier platform in Port Harcourt, Nigeria.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Port Harcourt",
    addressRegion: "Rivers State",
    addressCountry: "NG",
  },
};

export default function OurCompany() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(companySchema) }}
      />
      <CompanyHero />
      <CompanyMission />
      <CompanyCoreValues />
    </div>
  );
}
