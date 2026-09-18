import { Metadata } from "next";
import { baseUrl } from "@/utils/constants";
import RidersManagement from "@/components/admin/riders/page";

export const metadata: Metadata = {
  title: "Rider Fleet | Pickars Admin",
  description:
    "Manage registered riders, vehicle credentials, verification status and earnings in the Pickars Admin dashboard.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: `${baseUrl}/admin/riders`,
  },
  openGraph: {
    type: "website",
    url: `${baseUrl}/admin/riders`,
    siteName: "Pickars Admin",
    locale: "en_NG",
    title: "Rider Fleet | Pickars Admin",
    description:
      "Manage registered riders, vehicle credentials, verification status and earnings in the Pickars Admin dashboard.",
    images: [
      {
        url: `${baseUrl}/opengraphs/admin.png`,
        secureUrl: `${baseUrl}/opengraphs/admin.png`,
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Pickars Admin - Rider Fleet Management",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rider Fleet | Pickars Admin",
    description:
      "Manage registered riders, vehicle credentials, verification status and earnings in the Pickars Admin dashboard.",
    images: [`${baseUrl}/opengraphs/admin.png`],
  },
};

export default function Page() {
  return <RidersManagement />;
}
