import type { Metadata } from "next";
import { OG_IMAGES, OG_IMAGE_SIZE } from "@/utils/seo/config";

/**
 * The investor portal is private: keep every route under /investors out of
 * search engines.
 */
export const metadata: Metadata = {
  title: { default: "Investor Portal", template: "%s | Pickars Investors" },
  description: "Private investor portal. Authorised investors only.",
  openGraph: {
    title: "Pickars Investors",
    images: [{ url: OG_IMAGES.investors, ...OG_IMAGE_SIZE, alt: "Pickars investor portal" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pickars Investors",
    images: [{ url: OG_IMAGES.investors, alt: "Pickars investor portal" }],
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
};

export default function InvestorsRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
