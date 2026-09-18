import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Pickars: Your doorstep deliveries, redefined.",
        short_name: "Pickars: Your doorstep deliveries, redefined",
        description: "Book fast, reliable dispatch riders in Port Harcourt",
        start_url: "/",
        display: "standalone",
        background_color: "#f8fafc",
        theme_color: "#0F172A",
        icons: [
            {
                src: "/logo.svg",
                sizes: "any",
                type: "image/svg+xml",
            },
        ],
    };
}