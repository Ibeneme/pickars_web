import type { Metadata } from "next";
import JsonLd from "@/components/seo/json-ld";
import FAQsClientPage from "@/components/landing-page/faqs/faq-section";
import { faqData } from "@/components/landing-page/faqs/faq-data";
import { OG_IMAGES } from "@/utils/seo/config";
import { createPageMetadata } from "@/utils/seo/metadata";
import { faqSchema, pageSchema } from "@/utils/seo/schema";

const PATH = "/app/faqs";
const TITLE = "FAQs: Booking, Pricing & Delivery in Port Harcourt";
const DESCRIPTION =
  "Answers to common questions about booking dispatch riders in Port Harcourt, what you can send, how delivery fees are calculated and how Pickars works.";

export const metadata: Metadata = createPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  image: OG_IMAGES.faq,
  imageAlt: "Pickars frequently asked questions",
});

// Built from the exact data the page renders, so markup always matches content.
const schema = pageSchema({
  path: PATH,
  name: "Pickars Frequently Asked Questions",
  description: DESCRIPTION,
  image: OG_IMAGES.faq,
  breadcrumbs: [{ name: "FAQs", path: PATH }],
  extra: [faqSchema(PATH, faqData)],
});

export default function FaqsPage() {
  return (
    <>
      <JsonLd data={schema} />
      <FAQsClientPage />
    </>
  );
}
