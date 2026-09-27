import AdminLogin from "@/components/admin/auth/admin-login";
import { baseUrl } from "@/utils/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Admin Portal Access & Authentication | Pickars Control Center",
  description:
    "Secure administrative login and control system for Pickars Logistics operations, fleet dispatch management, and rider onboarding in Port Harcourt.",
  keywords: [
    "Pickars Admin",
    "Pickars Admin Login",
    "Dispatch Control System",
    "Pickars Logistics Admin",
    "Port Harcourt Logistics Portal",
  ],
  authors: [{ name: "Pickars Courier Limited" }],
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "none",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: `${baseUrl}/admin/auth`,
  },
  openGraph: {
    type: "website",
    url: `${baseUrl}/admin/auth`,
    siteName: "Pickars Logistics Control Center",
    locale: "en_NG",
    title: "Pickars Admin Portal | Secure Access",
    description:
      "Proprietary administrative access portal for Pickars Logistics operations, fleet, and dispatch management.",
    images: [
      {
        url: "/opengraphs/admin.png",
        secureUrl: `${baseUrl}/opengraphs/admin.png`,
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Pickars Admin Portal - Secure Access Control Center",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@pickars_app",
    creator: "@pickars_app",
    title: "Pickars Admin Portal | Secure Access",
    description:
      "Proprietary administrative access portal for Pickars Logistics operations and dispatch management.",
    images: ["/opengraphs/admin.png"],
  },
  other: {
    "geo.region": "NG-RI",
    "geo.placename": "Port Harcourt",
    "geo.position": "4.824167;7.080833",
    ICBM: "4.824167, 7.080833",
  },
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${baseUrl}/admin/auth#webpage`,
      url: `${baseUrl}/admin/auth`,
      name: "Pickars Admin Portal | Secure Access",
      description:
        "Secure administrative portal for Pickars Courier Limited dispatch management and system controls.",
      isPartOf: {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: baseUrl,
        name: "Pickars Logistics",
      },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${baseUrl}/opengraphs/admin.png`,
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${baseUrl}/admin/auth#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: baseUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Admin Portal",
          item: `${baseUrl}/admin/auth`,
        },
      ],
    },
  ],
};

export default function AdminAuthPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdData).replace(/</g, "\\u003c"),
        }}
      />
      <AdminLogin />
    </main>
  );
}
