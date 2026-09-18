"use client";

import { usePathname } from "next/navigation";
import ScrollProgress from "./ScrollProgress";

export default function ScrollProgressWrapper() {
  const pathname = usePathname();

  // Hide ScrollProgress on any admin route
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return <ScrollProgress />;
}