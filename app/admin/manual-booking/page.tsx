import { Metadata } from "next";
import { baseUrl } from "@/utils/constants";
import ManualRideDispatch from "@/components/admin/manual-bookings/page";

export const metadata: Metadata = {
  title: "Manual Booking Dispatch | Pickars Admin",
  description:
    "Create, manage and track manual ride bookings and dispatch requests in the Pickars Admin dashboard.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: `${baseUrl}/admin/manual-booking`,
  },
  openGraph: {
    type: "website",
    url: `${baseUrl}/admin/manual-booking`,
    siteName: "Pickars Admin",
    locale: "en_NG",
    title: "Manual Booking Dispatch | Pickars Admin",
    description:
      "Create, manage and track manual ride bookings and dispatch requests in the Pickars Admin dashboard.",
    images: [
      {
        url: `${baseUrl}/opengraphs/admin.png`,
        secureUrl: `${baseUrl}/opengraphs/admin.png`,
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Pickars Admin - Manual Booking Dispatch",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Manual Booking Dispatch | Pickars Admin",
    description:
      "Create, manage and track manual ride bookings and dispatch requests in the Pickars Admin dashboard.",
    images: [`${baseUrl}/opengraphs/admin.png`],
  },
};

export default function Page() {
  return <ManualRideDispatch />;
}