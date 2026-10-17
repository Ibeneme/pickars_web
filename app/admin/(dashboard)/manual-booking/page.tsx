import type { Metadata } from "next";
import ManualRideDispatch from "@/components/admin/manual-bookings/page";

// Private route: indexing is blocked by the /admin segment layout.
export const metadata: Metadata = { title: "Manual Booking Dispatch" };

export default function Page() {
  return <ManualRideDispatch />;
}
