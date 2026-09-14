import { motion, useScroll, useSpring } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import SlidingPage from "../../components/SlidingPgae/SlidingPage";
import HeroSection from "../../sections/Hero/HeroSection";
import PickarsTestimonialsSection from "../../sections/CommentsSection/CommentsSection";
import HowItWorks from "../../sections/HowItWorksSection/HowItWorksSection";
import PackageDeliverySection from "../../sections/HowItWorksSection/PackageDeliverySection";
import NeverLateBanner from "../../sections/HowItWorksSection/Planforlatersection";
import PerfectHeroSection from "../../sections/HowItWorksSection/PerfectHeroSection";

const Home = () => {
  const { scrollYProgress } = useScroll();
  const location = useLocation();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  // Dynamic canonical URL to preserve exact path indexing for landing page aliases
  const canonicalUrl = `https://www.pickars.com${
    location.pathname === "/" ? "" : location.pathname
  }`;

  // Advanced WebPage & Service Schema
  const webpageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: "Fast Dispatch Riders & Delivery Service in Port Harcourt | Pickars",
    description:
      "Book fast, reliable dispatch riders in Port Harcourt with Pickars. Same-day parcel delivery, bike courier, and local logistics in GRA, Trans Amadi, Woji, and across Rivers State.",
    publisher: {
      "@id": "https://www.pickars.com/#organization",
    },
    about: {
      "@id": "https://www.pickars.com/#localbusiness",
    },
    inLanguage: "en-NG",
    isPartOf: {
      "@id": "https://www.pickars.com/#website",
    },
  };

  // Local Logistics Service Schema
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Dispatch Rider & Package Delivery Service",
    provider: {
      "@type": "LocalBusiness",
      name: "Pickars Logistics",
      image: "https://www.pickars.com/box.png",
      telephone: "+2348000000000",
      priceRange: "₦",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Port Harcourt",
        addressRegion: "Rivers State",
        addressCountry: "NG",
      },
    },
    areaServed: [
      {
        "@type": "City",
        name: "Port Harcourt",
      },
      {
        "@type": "Place",
        name: "GRA Port Harcourt",
      },
      {
        "@type": "Place",
        name: "Trans Amadi",
      },
      {
        "@type": "Place",
        name: "Woji",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Delivery Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Same Day Dispatch Rider Delivery",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Express Bike Courier Service",
          },
        },
      ],
    },
  };

  // FAQ Schema for Search Snippets
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I book a dispatch rider in Port Harcourt with Pickars?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can easily book a dispatch rider by downloading the Pickars app or requesting a ride directly through pickars.com for fast pickup across Port Harcourt.",
        },
      },
      {
        "@type": "Question",
        name: "Does Pickars offer same-day parcel delivery in Port Harcourt?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Pickars offers instant and same-day bike courier pickup and parcel delivery across GRA, Trans Amadi, Woji, and all surrounding areas in Port Harcourt.",
        },
      },
    ],
  };

  return (
    <div className="relative bg-[#fff] selection:bg-red-600 selection:text-white">
      {/* Enhanced SEO & Social Meta Data */}
      <Helmet>
        {/* Core SEO */}
        <title>
          Get fast, affordable dispatch riders in Port Harcourt | Pickars
        </title>
        <meta
          name="description"
          content="Get fast, affordable dispatch riders in Port Harcourt. Same-day parcel delivery, bike couriers near you in GRA, Trans Amadi, Woji, and across Rivers State."
        />
        <meta
          name="keywords"
          content="dispatch rider Port Harcourt, dispatch riders near me, fast delivery Port Harcourt, get a rider, dispatch rider in PH city, bike delivery service Port Harcourt, same day delivery Port Harcourt, Pickars delivery app"
        />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href={canonicalUrl} />

        {/* Geo Targeting for Local Search */}
        <meta name="geo.region" content="NG-RI" />
        <meta name="geo.placename" content="Port Harcourt" />
        <meta name="geo.position" content="4.8156;7.0498" />
        <meta name="ICBM" content="4.8156, 7.0498" />

        {/* Open Graph / Facebook / LinkedIn / WhatsApp */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="Pickars" />
        <meta property="og:locale" content="en_NG" />
        <meta
          property="og:title"
          content="Fast Dispatch Riders & Express Delivery in Port Harcourt | Pickars"
        />
        <meta
          property="og:description"
          content="Need a dispatch rider fast? Book verified bike couriers in Port Harcourt for express package pickups, same-day delivery, and local logistics."
        />
        <meta property="og:image" content="https://www.pickars.com/box.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter (X) */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@pickars_app" />
        <meta name="twitter:creator" content="@pickars_app" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta
          name="twitter:title"
          content="Fast Dispatch Riders in Port Harcourt | Pickars"
        />
        <meta
          name="twitter:description"
          content="Book verified dispatch riders in Port Harcourt for fast, same-day delivery across GRA, Trans Amadi, and Woji."
        />
        <meta name="twitter:image" content="https://www.pickars.com/box.png" />

        {/* Structured Data Injections */}
        <script type="application/ld+json">
          {JSON.stringify(webpageSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(serviceSchema)}
        </script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[110] h-1 bg-red-600 origin-left"
        style={{ scaleX }}
      />

      <main>
        <HeroSection />

        <section className="relative z-10">
          <SlidingPage />
        </section>

        <PerfectHeroSection />
        <PackageDeliverySection />
        <HowItWorks />
        <NeverLateBanner />
        <PickarsTestimonialsSection />
      </main>
    </div>
  );
};

export default Home;
