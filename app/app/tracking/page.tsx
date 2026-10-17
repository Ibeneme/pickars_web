import type { Metadata } from "next";
import JsonLd from "@/components/seo/json-ld";
import TrackComponent from "@/components/landing-page/track-sections/track";
import { OG_IMAGES } from "@/utils/seo/config";
import { createPageMetadata } from "@/utils/seo/metadata";
import { pageSchema } from "@/utils/seo/schema";

const PATH = "/app/tracking";
const TITLE = "Track Your Parcel & Dispatch Rider Live";
const DESCRIPTION =
  "Track your Pickars dispatch rider and parcel in real time. Get live GPS updates, pickup status and delivery progress anywhere in Port Harcourt.";

export const metadata: Metadata = createPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  image: OG_IMAGES.track,
  imageAlt: "Pickars live parcel and rider tracking",
});

const schema = pageSchema({
  path: PATH,
  name: "Pickars Live Tracking",
  description: DESCRIPTION,
  image: OG_IMAGES.track,
  breadcrumbs: [{ name: "Track", path: PATH }],
});

export default function TrackingPage() {
  return (
    <>
      <JsonLd data={schema} />
      <TrackComponent />
    </>
  );
}
