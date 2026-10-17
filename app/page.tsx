import type { Metadata } from "next";
import JsonLd from "@/components/seo/json-ld";
import HeroSection from "@/components/landing-page/home-sections/hero";
import HomeTestimonialsSection from "@/components/landing-page/home-sections/home-testimonials-section";
import HomeWithMapSection from "@/components/landing-page/home-sections/home-with-map-section";
import HowItWorks from "@/components/landing-page/home-sections/how-it-works";
import NeverLateSection from "@/components/landing-page/home-sections/never-late-section";
import PackageDeliverySection from "@/components/landing-page/home-sections/package-delivery-section";
import QualitiesSliderSection from "@/components/landing-page/home-sections/qualities-slider-section";
import { createPageMetadata } from "@/utils/seo/metadata";
import {
  graph,
  ids,
  localBusinessSchema,
  mobileAppSchema,
} from "@/utils/seo/schema";
import { SITE, absoluteUrl, OG_IMAGES } from "@/utils/seo/config";

const TITLE = "Pickars: Dispatch Riders & Same-Day Delivery in Port Harcourt";
const DESCRIPTION =
  "Book trusted dispatch riders for same-day parcel and package delivery across Port Harcourt. Live GPS tracking, upfront pricing and instant rider matching.";

export const metadata: Metadata = createPageMetadata({
  title: TITLE,
  absoluteTitle: true,
  description: DESCRIPTION,
  path: "/",
  imageAlt: "Pickars – fast dispatch riders and bike couriers in Port Harcourt",
});

const homeSchema = graph(
  {
    "@type": "WebPage",
    "@id": `${absoluteUrl("/")}#webpage`,
    url: absoluteUrl("/"),
    name: TITLE,
    description: DESCRIPTION,
    inLanguage: SITE.language,
    isPartOf: { "@id": ids.website },
    about: { "@id": ids.localBusiness },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: absoluteUrl(OG_IMAGES.default),
    },
  },
  localBusinessSchema(),
  mobileAppSchema()
);

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <JsonLd data={homeSchema} />
      <HeroSection />
      <QualitiesSliderSection />
      <HomeWithMapSection />
      <PackageDeliverySection />
      <HowItWorks />
      <NeverLateSection />
      <HomeTestimonialsSection />
    </div>
  );
}
