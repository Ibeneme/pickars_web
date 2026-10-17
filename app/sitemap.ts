import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/utils/seo/config";
import { PUBLIC_ROUTES } from "@/utils/seo/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  return PUBLIC_ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: absoluteUrl(path),
    changeFrequency,
    priority,
  }));
}
