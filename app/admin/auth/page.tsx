import type { Metadata } from "next";
import AdminLogin from "@/components/admin/auth/admin-login";

// Private route: indexing is blocked by the /admin segment layout.
export const metadata: Metadata = { title: "Sign In" };

export default function AdminAuthPage() {
  return (
    <main>
      <AdminLogin />
    </main>
  );
}
