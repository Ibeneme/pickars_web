import type { Metadata } from "next";
import JsonLd from "@/components/seo/json-ld";
import TermsAndConditions from "@/components/landing-page/legals-and-policies/terms";
import { OG_IMAGES } from "@/utils/seo/config";
import { createPageMetadata } from "@/utils/seo/metadata";
import { pageSchema } from "@/utils/seo/schema";

const PATH = "/app/terms-of-use";
const DESCRIPTION =
  "The terms of service for Pickars Courier Limited, the technology platform connecting customers with independent dispatch riders in Port Harcourt, Nigeria.";

export const metadata: Metadata = createPageMetadata({
  title: "Terms of Service",
  description: DESCRIPTION,
  path: PATH,
  image: OG_IMAGES.terms,
  imageAlt: "Pickars terms of service",
});

const schema = pageSchema({
  path: PATH,
  name: "Pickars Terms of Service",
  description: DESCRIPTION,
  image: OG_IMAGES.terms,
  breadcrumbs: [{ name: "Terms of Service", path: PATH }],
});

export default function TermsOfUsePage() {
  return (
    <>
      <JsonLd data={schema} />
      <TermsAndConditions />
    </>
  );
}
