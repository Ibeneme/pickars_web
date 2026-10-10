import { Metadata } from "next";
import { baseUrl } from "@/utils/constants";
import UsersManagement from "@/components/admin/users/page";

export const metadata: Metadata = {
  title: "User Directory | Pickars Admin",
  description:
    "Manage and audit registered customers, ranks, ride activity and account security in the Pickars Admin dashboard.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: `${baseUrl}/admin/users`,
  },
  openGraph: {
    type: "website",
    url: `${baseUrl}/admin/users`,
    siteName: "Pickars Admin",
    locale: "en_NG",
    title: "User Directory | Pickars Admin",
    description:
      "Manage and audit registered customers, ranks, ride activity and account security in the Pickars Admin dashboard.",
    images: [
      {
        url: `${baseUrl}/opengraphs/admin.png`,
        secureUrl: `${baseUrl}/opengraphs/admin.png`,
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Pickars Admin - User Directory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "User Directory | Pickars Admin",
    description:
      "Manage and audit registered customers, ranks, ride activity and account security in the Pickars Admin dashboard.",
    images: [`${baseUrl}/opengraphs/admin.png`],
  },
};

export default function Page() {
  return <UsersManagement />;
}
