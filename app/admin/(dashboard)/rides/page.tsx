import { Metadata } from "next";
import { baseUrl } from "@/utils/constants";
import RidesManagement from "@/components/admin/rides/page";

export const metadata: Metadata = {
  title: "Logistics Tracking | Pickars Admin",
  description:
    "Monitor live deliveries, ride statuses, rider assignments and transaction details in the Pickars Admin dashboard.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: `${baseUrl}/admin/rides`,
  },
  openGraph: {
    type: "website",
    url: `${baseUrl}/admin/rides`,
    siteName: "Pickars Admin",
    locale: "en_NG",
    title: "Logistics Tracking | Pickars Admin",
    description:
      "Monitor live deliveries, ride statuses, rider assignments and transaction details in the Pickars Admin dashboard.",
    images: [
      {
        url: `${baseUrl}/opengraphs/admin.png`,
        secureUrl: `${baseUrl}/opengraphs/admin.png`,
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Pickars Admin - Logistics Tracking",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Logistics Tracking | Pickars Admin",
    description:
      "Monitor live deliveries, ride statuses, rider assignments and transaction details in the Pickars Admin dashboard.",
    images: [`${baseUrl}/opengraphs/admin.png`],
  },
};

export default function Page() {
  return <RidesManagement />;
}
