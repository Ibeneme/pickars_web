import type { Metadata } from "next";
import JsonLd from "@/components/seo/json-ld";
import DeleteAccountPage from "@/components/landing-page/legals-and-policies/delete-account";
import { createPageMetadata } from "@/utils/seo/metadata";
import { pageSchema } from "@/utils/seo/schema";

const PATH = "/app/delete-account";
const DESCRIPTION =
  "Request permanent deletion of your Pickars account and associated personal data, in line with Google Play and App Store user-data requirements.";

export const metadata: Metadata = createPageMetadata({
  title: "Request Account Deletion",
  description: DESCRIPTION,
  path: PATH,
  imageAlt: "Pickars account deletion request",
});

const schema = pageSchema({
  path: PATH,
  name: "Pickars Account Deletion Request",
  description: DESCRIPTION,
  breadcrumbs: [{ name: "Delete Account", path: PATH }],
});

export default function DeleteAccountRoute() {
  return (
    <>
      <JsonLd data={schema} />
      <DeleteAccountPage />
    </>
  );
}
