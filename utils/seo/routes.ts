import type { MetadataRoute } from "next";

type SitemapRoute = {
  path: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority: number;
};

/**
 * Every public, indexable URL. Consumed by `app/sitemap.ts`.
 * Private areas (/admin, /investors) must never be listed here.
 */
export const PUBLIC_ROUTES: SitemapRoute[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/app/app-features", changeFrequency: "monthly", priority: 0.8 },
  { path: "/app/our-company", changeFrequency: "monthly", priority: 0.7 },
  { path: "/app/faqs", changeFrequency: "monthly", priority: 0.7 },
  { path: "/app/help-center", changeFrequency: "monthly", priority: 0.6 },
  { path: "/app/tracking", changeFrequency: "monthly", priority: 0.6 },
  { path: "/app/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/app/terms-of-use", changeFrequency: "yearly", priority: 0.3 },
  { path: "/app/delete-account", changeFrequency: "yearly", priority: 0.2 },
];

/** Paths that must be kept out of search results and crawlers. */
export const PRIVATE_PATHS = ["/admin", "/investors", "/auth", "/api"] as const;
