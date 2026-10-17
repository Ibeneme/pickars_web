import type { Metadata } from "next";
import InvestorSignInPage from "@/components/investors/auth";

// Private route: indexing is blocked by the /investors segment layout.
export const metadata: Metadata = { title: "Sign In" };

export default function Page() {
  return <InvestorSignInPage />;
}
