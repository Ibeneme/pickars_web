import type { Metadata } from "next";
import JsonLd from "@/components/seo/json-ld";
import HeroSection from "@/components/landing-page/home-sections/hero";
import HomeTestimonialsSection from "@/components/landing-page/home-sections/home-testimonials-section";
import HomeWithMapSection from "@/components/landing-page/home-sections/home-with-map-section";
import PartnerWithUs from "@/components/landing-page/home-sections/partner-with-us";
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
import RiderPage from "@/components/landing-page/home-sections/rider-svg";
import FAQsClientPage from "@/components/landing-page/faqs/faq-section";

const TITLE = "Pickars: Your doorstep deliveries, redefined";
const DESCRIPTION =
  "Book trusted dispatch riders for same-day parcel and package delivery across Port Harcourt. Live GPS tracking, upfront pricing and instant rider matching.";

export const metadata: Metadata = createPageMetadata({
  title: TITLE,
  absoluteTitle: true,
  description: DESCRIPTION,
  path: "/",
  imageAlt: "Pickars – Your doorstep deliveries, redefined.",
  image: OG_IMAGES.about,
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
      url: absoluteUrl(OG_IMAGES.about),
    },
  },
  localBusinessSchema(),
  mobileAppSchema()
);

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 ">
      <JsonLd data={homeSchema} />
      <RiderPage />

      {/* <QualitiesSliderSection /> */}
      <div style={{ paddingTop: 64 }}>
        <HomeWithMapSection />
      </div>
      <QualitiesSliderSection />
      <PartnerWithUs />
      {/* <PackageDeliverySection /> */}

      <NeverLateSection />
      <HomeTestimonialsSection />
      <div style={{ marginTop: -120, marginBottom: -48 }}>
        {/* <RiderPage /> */}
        <FAQsClientPage />
      </div>
    </div>
  );
}
