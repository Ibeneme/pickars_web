import TrackComponent from "@/components/landing-page/track-sections/track";
import { baseUrl } from "@/utils/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Live Dispatch Rider & Parcel Tracking | Pickars Port Harcourt",
  description:
    "Track your Pickars dispatch rider in real-time. Enter your tracking ID for live GPS updates, estimated pickup times, and package status in Port Harcourt.",
  keywords: [
    "Pickars tracking",
    "track dispatch rider Port Harcourt",
    "live delivery tracking PH",
    "parcel status Nigeria",
    "bike courier tracking Port Harcourt",
    "Pickars order tracking",
  ],
  alternates: {
    canonical: `${baseUrl}/app/tracking`,
  },
  openGraph: {
    type: "website",
    url: `${baseUrl}/track`,
    siteName: "Pickars Logistics",
    locale: "en_NG",
    title: "Live Dispatch Rider & Parcel Tracking | Pickars Logistics",
    description:
      "Track your package and dispatch rider live in Port Harcourt. Get instant updates on pickup, transit status, and delivery completion.",
    images: [
      {
        url: "/opengraphs/track.png",
        secureUrl: `${baseUrl}/opengraphs/track.png`,
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Pickars Live Parcel Tracking",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@pickars_app",
    creator: "@pickars_app",
    title: "Live Dispatch Rider Tracking | Pickars",
    description:
      "Monitor your rider's live location and parcel status across Port Harcourt in real-time.",
    images: ["/opengraphs/track.png"],
  },
  other: {
    "geo.region": "NG-RI",
    "geo.placename": "Port Harcourt",
    "geo.position": "4.824167;7.080833",
    ICBM: "4.824167, 7.080833",
  },
};

export default function Page() {
  return <TrackComponent />;
}
