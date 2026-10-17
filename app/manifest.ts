import type { MetadataRoute } from "next";
import { LOGO_PATH, SITE } from "@/utils/seo/config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: `${SITE.name}: ${SITE.tagline}`,
    short_name: SITE.name,
    description:
      "Book fast, reliable dispatch riders for same-day delivery in Port Harcourt.",
    lang: SITE.language,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f8fafc",
    theme_color: "#0F172A",
    categories: ["business", "utilities"],
    icons: [{ src: LOGO_PATH, sizes: "any", type: "image/svg+xml" }],
  };
}
