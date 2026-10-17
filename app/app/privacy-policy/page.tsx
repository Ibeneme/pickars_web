import type { Metadata } from "next";
import JsonLd from "@/components/seo/json-ld";
import PrivacyPolicy from "@/components/landing-page/legals-and-policies/privacy-policies";
import { OG_IMAGES } from "@/utils/seo/config";
import { createPageMetadata } from "@/utils/seo/metadata";
import { pageSchema } from "@/utils/seo/schema";

const PATH = "/app/privacy-policy";
const DESCRIPTION =
  "How Pickars Courier Limited collects, uses and protects your personal data in line with the Nigeria Data Protection Act (NDPA) 2023.";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy",
  description: DESCRIPTION,
  path: PATH,
  image: OG_IMAGES.privacy,
  imageAlt: "Pickars privacy policy",
});

const schema = pageSchema({
  path: PATH,
  name: "Pickars Privacy Policy",
  description: DESCRIPTION,
  image: OG_IMAGES.privacy,
  breadcrumbs: [{ name: "Privacy Policy", path: PATH }],
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd data={schema} />
      <PrivacyPolicy />
    </>
  );
}
