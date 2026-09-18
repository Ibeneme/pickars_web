import { Metadata } from "next";
import { baseUrl } from "@/utils/constants";
import PaymentsManagement from "@/components/admin/payments/page";

export const metadata: Metadata = {
  title: "Revenue Audit | Pickars Admin",
  description:
    "Verify Paystack settlements, transaction logs and platform revenue in the Pickars Admin dashboard.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: `${baseUrl}/admin/payments`,
  },
  openGraph: {
    type: "website",
    url: `${baseUrl}/admin/payments`,
    siteName: "Pickars Admin",
    locale: "en_NG",
    title: "Revenue Audit | Pickars Admin",
    description:
      "Verify Paystack settlements, transaction logs and platform revenue in the Pickars Admin dashboard.",
    images: [
      {
        url: `${baseUrl}/opengraphs/admin.png`,
        secureUrl: `${baseUrl}/opengraphs/admin.png`,
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Pickars Admin - Revenue Audit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Revenue Audit | Pickars Admin",
    description:
      "Verify Paystack settlements, transaction logs and platform revenue in the Pickars Admin dashboard.",
    images: [`${baseUrl}/opengraphs/admin.png`],
  },
};

export default function Page() {
  return <PaymentsManagement />;
}
