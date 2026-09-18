import { Metadata } from "next";
import { baseUrl } from "@/utils/constants";
import Dashboard from "@/components/admin/dashboard/page";

export const metadata: Metadata = {
  title: "Overview | Pickars Admin",
  description:
    "Live platform analytics, revenue growth, user ratios and payout readiness for the Pickars Admin dashboard.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: `${baseUrl}/admin/dashboard`,
  },
  openGraph: {
    type: "website",
    url: `${baseUrl}/admin/dashboard`,
    siteName: "Pickars Admin",
    locale: "en_NG",
    title: "Overview | Pickars Admin",
    description:
      "Live platform analytics, revenue growth, user ratios and payout readiness for the Pickars Admin dashboard.",
    images: [
      {
        url: `${baseUrl}/opengraphs/admin.png`,
        secureUrl: `${baseUrl}/opengraphs/admin.png`,
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Pickars Admin - Dashboard Overview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Overview | Pickars Admin",
    description:
      "Live platform analytics, revenue growth, user ratios and payout readiness for the Pickars Admin dashboard.",
    images: [`${baseUrl}/opengraphs/admin.png`],
  },
};

export default function Page() {
  return <Dashboard />;
}
