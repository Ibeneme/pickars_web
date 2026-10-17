import type { NextConfig } from "next";

const NO_INDEX = "noindex, nofollow, noarchive, nosnippet";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },

  async redirects() {
    return [
      // Legacy duplicates of the homepage → consolidate ranking signals on "/".
      { source: "/home", destination: "/", permanent: true },
      { source: "/app/home", destination: "/", permanent: true },
      // Stray copy of the admin login that used to live at /auth.
      { source: "/auth", destination: "/admin/auth", permanent: false },
    ];
  },

  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // Belt and braces: private areas are also blocked via HTTP header, which
      // covers any response the <meta robots> tag could not (e.g. redirects).
      ...["/admin/:path*", "/investors/:path*", "/auth"].map((source) => ({
        source,
        headers: [{ key: "X-Robots-Tag", value: NO_INDEX }],
      })),
      {
        source: "/opengraphs/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
