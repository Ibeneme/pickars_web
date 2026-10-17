import type { Metadata } from "next";
import RidersManagement from "@/components/admin/riders/page";

// Private route: indexing is blocked by the /admin segment layout.
export const metadata: Metadata = { title: "Rider Fleet" };

export default function Page() {
  return <RidersManagement />;
}
