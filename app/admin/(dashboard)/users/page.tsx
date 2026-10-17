import type { Metadata } from "next";
import UsersManagement from "@/components/admin/users/page";

// Private route: indexing is blocked by the /admin segment layout.
export const metadata: Metadata = { title: "User Directory" };

export default function Page() {
  return <UsersManagement />;
}
