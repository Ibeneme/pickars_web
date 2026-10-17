"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/main/Navbar";
import Footer from "@/components/main/Footer";
import ScrollProgressWrapper from "@/components/atoms/scrolls/ScrollProgressWrapper";
import { PRIVATE_PATHS } from "@/utils/seo/routes";

/** Private areas (admin, investors) render their own shell. */
const isPrivateRoute = (pathname: string | null) =>
  PRIVATE_PATHS.some((prefix) => pathname?.startsWith(prefix));

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (isPrivateRoute(pathname)) {
    return <>{children}</>;
  }

  return (
    <>
      {/* Visible only when focused with the keyboard. */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-black focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-white"
      >
        Skip to main content
      </a>
      <ScrollProgressWrapper />
      <Navbar />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
}
