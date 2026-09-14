import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import AFHero from "../../sections/AppFeaturesSection/AF_Hero";
import AFNotifications from "../../sections/AppFeaturesSection/AFNotifications";
import UberDispatchFlow from "../../sections/CompanyComponent/PickarsDispatchMap";
import AFDeliveryOptions from "../../sections/AppFeaturesSection/AFDeliveryOptions";

const AppFeatures: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const location = useLocation();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Dynamic canonical URL targeting
  const canonicalUrl = `https://www.pickars.com${location.pathname}`;

  // SoftwareApplication Structured Data
  const appSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Pickars Mobile Delivery App",
    operatingSystem: "Android, iOS",
    applicationCategory: "LogisticsApplication",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "NGN",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "310",
    },
    description:
      "Pickars delivery app features real-time dispatch tracking, instant bike courier booking, flexible payment options, and automated notifications in Port Harcourt.",
  };

  // Feature List Structured Data
  const featureSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Pickars App Key Delivery Features",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Real-time Dispatch Map & GPS Tracking",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Instant Bike Courier Booking",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Automated Package Status Notifications",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Flexible Delivery Options & Express Dispatch",
      },
    ],
  };

  return (
    <div className="relative bg-[#fff] selection:bg-red-600 selection:text-white">
      {/* Advanced SEO & Helmet Metadata */}
      <Helmet>
        {/* Core Metadata */}
        <title>
          Pickars App Features | Real-Time Dispatch Tracking & Delivery App
        </title>
        <meta
          name="description"
          content="Explore Pickars delivery app features: live GPS rider tracking, instant dispatch bookings, automated notifications, and flexible package delivery in Port Harcourt."
        />
        <meta
          name="keywords"
          content="Pickars app features, dispatch rider app Port Harcourt, live delivery tracking app, bike courier booking app, logistics app Nigeria, same day parcel tracking"
        />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href={canonicalUrl} />

        {/* Local & Geographic SEO Signals */}
        <meta name="geo.region" content="NG-RI" />
        <meta name="geo.placename" content="Port Harcourt" />
        <meta name="geo.position" content="4.824167;7.080833" />
        <meta name="ICBM" content="4.824167, 7.080833" />

        {/* Open Graph (Social Sharing) */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="Pickars Logistics" />
        <meta property="og:locale" content="en_NG" />
        <meta
          property="og:title"
          content="Pickars App Features | Real-Time Dispatch Tracking & Delivery App"
        />
        <meta
          property="og:description"
          content="Track dispatch riders in real-time, schedule express package pickups, and enjoy instant order alerts with the Pickars app."
        />
        <meta property="og:image" content="https://www.pickars.com/box.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@pickars_app" />
        <meta name="twitter:creator" content="@pickars_app" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta
          name="twitter:title"
          content="Pickars App Features | Fast Dispatch & GPS Tracking"
        />
        <meta
          name="twitter:description"
          content="Experience fast dispatch booking, real-time rider tracking, and seamless parcel deliveries with the Pickars app."
        />
        <meta name="twitter:image" content="https://www.pickars.com/box.png" />

        {/* JSON-LD Structured Data Schema */}
        <script type="application/ld+json">{JSON.stringify(appSchema)}</script>
        <script type="application/ld+json">
          {JSON.stringify(featureSchema)}
        </script>
      </Helmet>

      {/* Top Scroll Progress Bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed inset-x-0 top-0 z-50 h-1.5 origin-left bg-[#FF0000]"
      />

      <main>
        <AFHero />
        <AFDeliveryOptions />
        <AFNotifications />
        <UberDispatchFlow />
      </main>
    </div>
  );
};

export default AppFeatures;
