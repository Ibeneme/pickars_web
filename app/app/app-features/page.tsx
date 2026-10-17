import type { Metadata } from "next";
import JsonLd from "@/components/seo/json-ld";
import AppFeaturesDeliveryOptions from "@/components/landing-page/app-features-section/app-features-delivery-section";
import AppFeaturesHero from "@/components/landing-page/app-features-section/app-features-hero";
import AppFeaturesMockup from "@/components/landing-page/app-features-section/app-features-mockups";
import AppFeaturesNotifications from "@/components/landing-page/app-features-section/app-features-notifications";
import { OG_IMAGES } from "@/utils/seo/config";
import { createPageMetadata } from "@/utils/seo/metadata";
import { mobileAppSchema, pageSchema } from "@/utils/seo/schema";

const PATH = "/app/app-features";
const TITLE = "App Features: Live Tracking & Instant Booking";
const DESCRIPTION =
  "Explore the Pickars delivery app: live GPS rider tracking, instant dispatch booking, status notifications and flexible pickup options in Port Harcourt.";

export const metadata: Metadata = createPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  image: OG_IMAGES.features,
  imageAlt: "Pickars mobile delivery app interface",
});

const schema = pageSchema({
  path: PATH,
  name: "Pickars App Features",
  description: DESCRIPTION,
  image: OG_IMAGES.features,
  breadcrumbs: [{ name: "App Features", path: PATH }],
  extra: [
    mobileAppSchema(),
    {
      "@type": "ItemList",
      name: "Pickars app key features",
      itemListElement: [
        "Real-time dispatch map & GPS tracking",
        "Instant bike courier booking",
        "Automated package status notifications",
        "Flexible delivery options & express dispatch",
      ].map((name, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name,
      })),
    },
  ],
});

export default function AppFeaturesPage() {
  return (
    <div className="relative bg-[#fff] selection:bg-red-600 selection:text-white">
      <JsonLd data={schema} />
      <AppFeaturesHero />
      <AppFeaturesDeliveryOptions />
      <AppFeaturesNotifications />
      <AppFeaturesMockup />
    </div>
  );
}
