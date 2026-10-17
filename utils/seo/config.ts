import { ANDROID_URL, IOS_URL, baseUrl } from "@/utils/constants";

/**
 * Single source of truth for everything SEO-related that describes the
 * business. Pages, structured data, the footer and the sitemap all read from
 * here so that a change (new phone number, new social profile…) is made once.
 */
export const SITE = {
  name: "Pickars",
  legalName: "Pickars Courier Limited",
  tagline: "Your doorstep deliveries, redefined.",
  url: baseUrl,
  locale: "en_NG",
  language: "en-NG",
  email: "support@pickars.com",
  phone: "+2349164860591",
  twitterHandle: "@pickars_app",
  foundingCompany: {
    name: "Boring Thinkers Limited",
    url: "https://www.boringthinkers.com",
  },
  geo: {
    latitude: 4.824167,
    longitude: 7.080833,
    region: "NG-RI",
    placename: "Port Harcourt",
  },
  address: {
    locality: "Port Harcourt",
    region: "Rivers",
    postalCode: "500001",
    country: "NG",
  },
  /** Neighbourhoods surfaced in local-business structured data. */
  serviceAreas: [
    "GRA Port Harcourt",
    "Trans Amadi",
    "Woji",
    "Rumuokoro",
    "Rumuola",
    "Mile 1",
    "Mile 3",
    "Diobu",
    "Rumuomasi",
    "Elelenwo",
  ],
  mapUrl: "https://share.google/rtYgzAMRGhKFzIHje",
} as const;

export const STORES = {
  ios: { url: IOS_URL, appId: "6746796884" },
  android: { url: ANDROID_URL, packageName: "com.pickars.app" },
} as const;

export const SOCIAL_LINKS = [
  { name: "Instagram", url: "https://www.instagram.com/pickars_official" },
  { name: "X (Twitter)", url: "https://x.com/pickars_app" },
  { name: "Facebook", url: "https://www.facebook.com/share/1cW4kyitrJ/" },
  { name: "LinkedIn", url: "https://www.linkedin.com/company/pickars/" },
] as const;

/**
 * Social-share (Open Graph / Twitter) images, relative to `/public`.
 * Run `npm run check:seo` to verify every file below exists.
 */
export const OG_IMAGES = {
  default: "/opengraphs/box.png",
  about: "/opengraphs/about-us.png",
  admin: "/opengraphs/admin.png",
  investors: "/opengraphs/investor-auth.png",
  features: "/opengraphs/app-features.png",
  faq: "/opengraphs/faq.png",
  privacy: "/opengraphs/privacy.png",
  terms: "/opengraphs/terms.png",
  track: "/opengraphs/track.png",
} as const;

export const OG_IMAGE_SIZE = { width: 1200, height: 630 } as const;

export const LOGO_PATH = "/logo.svg";
export const APP_SCREENSHOT_PATH = "/mockup.png";

/** Absolute URL for a site-relative path. */
export function absoluteUrl(path = "/"): string {
  return new URL(path, SITE.url).toString();
}
