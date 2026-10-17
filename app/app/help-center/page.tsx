import type { Metadata } from "next";
import JsonLd from "@/components/seo/json-ld";
import { categories } from "@/components/landing-page/help-center/faq-data";
import HelpCenterClient from "@/components/landing-page/help-center/help-center-client";
import { OG_IMAGES } from "@/utils/seo/config";
import { createPageMetadata } from "@/utils/seo/metadata";
import { faqSchema, pageSchema } from "@/utils/seo/schema";

const PATH = "/app/help-center";
const TITLE = "Help Center & Delivery Support";
const DESCRIPTION =
  "Get help with booking dispatch riders, live parcel tracking, payments, refunds and rider onboarding. Contact Pickars support any time.";

export const metadata: Metadata = createPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  image: OG_IMAGES.faq,
  imageAlt: "Pickars Help Center",
});

const helpEntries = categories.flatMap((category) =>
  category.faqs.map((faq) => ({
    question: faq.question,
    // Strip the lightweight **bold** markup used by the UI.
    answer: faq.answer.replace(/\*\*/g, ""),
  }))
);

const schema = pageSchema({
  path: PATH,
  name: "Pickars Help Center",
  description: DESCRIPTION,
  type: "ContactPage",
  image: OG_IMAGES.faq,
  breadcrumbs: [{ name: "Help Center", path: PATH }],
  extra: [faqSchema(PATH, helpEntries)],
});

export default function HelpCenterPage() {
  return (
    <>
      <JsonLd data={schema} />
      <HelpCenterClient />
    </>
  );
}
