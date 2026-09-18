import { Metadata } from "next";
import { baseUrl } from "@/utils/constants";
import MarketingCenter from "@/components/admin/marketing/page";

export const metadata: Metadata = {
  title: "Marketing Center | Pickars Admin",
  description:
    "Send targeted or broadcast push notifications and view transmission logs in the Pickars Admin dashboard.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: `${baseUrl}/admin/marketing`,
  },
  openGraph: {
    type: "website",
    url: `${baseUrl}/admin/marketing`,
    siteName: "Pickars Admin",
    locale: "en_NG",
    title: "Marketing Center | Pickars Admin",
    description:
      "Send targeted or broadcast push notifications and view transmission logs in the Pickars Admin dashboard.",
    images: [
      {
        url: `${baseUrl}/opengraphs/admin.png`,
        secureUrl: `${baseUrl}/opengraphs/admin.png`,
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Pickars Admin - Marketing Center",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Marketing Center | Pickars Admin",
    description:
      "Send targeted or broadcast push notifications and view transmission logs in the Pickars Admin dashboard.",
    images: [`${baseUrl}/opengraphs/admin.png`],
  },
};

export default function Page() {
  return <MarketingCenter />;
}
