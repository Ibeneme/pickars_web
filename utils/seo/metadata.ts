import type { Metadata } from "next";
import {
  OG_IMAGES,
  OG_IMAGE_SIZE,
  SITE,
} from "@/utils/seo/config";

type PageMetadataInput = {
  /** Page-specific title. The root layout appends " | Pickars". */
  title: string;
  description: string;
  /** Site-relative path, e.g. "/app/faqs". Used for canonical + og:url. */
  path: string;
  /** Social image, relative to /public. Defaults to the brand card. */
  image?: string;
  imageAlt?: string;
  /** Set true to use `title` exactly as given (no brand suffix). */
  absoluteTitle?: boolean;
  /** Override the shorter title shown on X/Twitter and Open Graph. */
  socialTitle?: string;
  noIndex?: boolean;
};

/**
 * Builds a complete, consistent `Metadata` object for a public page.
 *
 * Next.js replaces (rather than deep-merges) `openGraph`, `twitter` and
 * `alternates` coming from the root layout, so every page must provide them
 * in full — this helper guarantees that nothing is forgotten.
 */
export function createPageMetadata({
  title,
  description,
  path,
  image = OG_IMAGES.default,
  imageAlt = `${SITE.name} – ${SITE.tagline}`,
  absoluteTitle = false,
  socialTitle,
  noIndex = false,
}: PageMetadataInput): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${SITE.name}`;
  const shareTitle = socialTitle ?? fullTitle;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    ...(noIndex && { robots: { index: false, follow: false } }),
    openGraph: {
      type: "website",
      url: path,
      siteName: SITE.name,
      locale: SITE.locale,
      title: shareTitle,
      description,
      images: [{ url: image, ...OG_IMAGE_SIZE, alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      site: SITE.twitterHandle,
      creator: SITE.twitterHandle,
      title: shareTitle,
      description,
      images: [{ url: image, alt: imageAlt }],
    },
  };
}
