import type { MetadataRoute } from "next";
import { baseUrl } from "@/utils/constants";
import { PRIVATE_PATHS } from "@/utils/seo/routes";

/** Only the production deployment should ever be crawled. */
const isProduction = process.env.VERCEL_ENV
  ? process.env.VERCEL_ENV === "production"
  : process.env.NODE_ENV === "production";

export default function robots(): MetadataRoute.Robots {
  if (!isProduction) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [...PRIVATE_PATHS],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
