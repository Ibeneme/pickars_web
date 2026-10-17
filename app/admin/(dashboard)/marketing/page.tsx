import type { Metadata } from "next";
import MarketingCenter from "@/components/admin/marketing/page";

// Private route: indexing is blocked by the /admin segment layout.
export const metadata: Metadata = { title: "Marketing Center" };

export default function Page() {
  return <MarketingCenter />;
}
