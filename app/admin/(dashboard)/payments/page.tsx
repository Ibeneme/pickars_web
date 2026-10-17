import type { Metadata } from "next";
import PaymentsManagement from "@/components/admin/payments/page";

// Private route: indexing is blocked by the /admin segment layout.
export const metadata: Metadata = { title: "Revenue Audit" };

export default function Page() {
  return <PaymentsManagement />;
}
