import type { Metadata } from "next";
import { OG_IMAGES, OG_IMAGE_SIZE } from "@/utils/seo/config";

/**
 * The admin area is private: keep every route under /admin out of search
 * engines. Individual pages only need to provide a `title`.
 */
export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | Pickars Admin" },
  description: "Private administration area. Authorised personnel only.",
  openGraph: {
    title: "Pickars Admin",
    images: [{ url: OG_IMAGES.admin, ...OG_IMAGE_SIZE, alt: "Pickars admin console" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pickars Admin",
    images: [{ url: OG_IMAGES.admin, alt: "Pickars admin console" }],
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
};

export default function AdminRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
