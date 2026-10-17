import type { Metadata } from "next";
import RidesManagement from "@/components/admin/rides/page";

// Private route: indexing is blocked by the /admin segment layout.
export const metadata: Metadata = { title: "Logistics Tracking" };

export default function Page() {
  return <RidesManagement />;
}
