"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/main/Navbar";
import Footer from "@/components/main/Footer";
import ScrollProgressWrapper from "@/components/atoms/scrolls/ScrollProgressWrapper";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");
  const isInvestorRoute = pathname?.startsWith("/investors");

  if (isAdminRoute || isInvestorRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <ScrollProgressWrapper />
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
