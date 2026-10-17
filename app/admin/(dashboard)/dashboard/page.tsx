import type { Metadata } from "next";
import Dashboard from "@/components/admin/dashboard/page";

// Private route: indexing is blocked by the /admin segment layout.
export const metadata: Metadata = { title: "Overview" };

export default function Page() {
  return <Dashboard />;
}
