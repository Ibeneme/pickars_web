import type { Metadata } from "next";
import JsonLd from "@/components/seo/json-ld";
import { CompanyCoreValues } from "@/components/landing-page/our-company-sections/company-core-values";
import { CompanyHero } from "@/components/landing-page/our-company-sections/company-hero";
import { CompanyMission } from "@/components/landing-page/our-company-sections/company-mission";
import { OG_IMAGES } from "@/utils/seo/config";
import { createPageMetadata } from "@/utils/seo/metadata";
import { pageSchema } from "@/utils/seo/schema";

const PATH = "/app/our-company";
const TITLE = "About Us: Logistics made Easy";
const DESCRIPTION =
  "Pickars Courier Limited is a Port Harcourt platform connecting individuals and businesses with independent dispatch riders for fast, reliable delivery.";

export const metadata: Metadata = createPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  image: OG_IMAGES.about,
  imageAlt: "Pickars Courier Limited company overview",
});

const schema = pageSchema({
  path: PATH,
  name: "About Pickars Courier Limited",
  description: DESCRIPTION,
  type: "AboutPage",
  image: OG_IMAGES.about,
  breadcrumbs: [{ name: "About Us", path: PATH }],
});

export default function OurCompanyPage() {
  return (
    <div>
      <JsonLd data={schema} />
      <CompanyHero />
      <CompanyMission />
      <CompanyCoreValues />
    </div>
  );
}
