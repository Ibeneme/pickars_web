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
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const location = useLocation();

  const canonicalUrl = `https://www.pickars.com${
    location.pathname === "/" ? "" : location.pathname
  }`;

  const getPageMeta = () => {
    const path = location.pathname.toLowerCase();
    if (
      path.includes("dispatch-riders-in-port-harcourt") ||
      path.includes("dispatch-riders-port-harcourt") ||
      path.includes("quick-delivery/dispatch-rider-and-delivery/port-harcourt")
    ) {
      return {
        title:
          "Dispatch Riders in Port Harcourt | Same-Day Bike Couriers | PICKARS",
        description:
          "Book trusted dispatch riders in Port Harcourt with PICKARS. Fast same-day bike courier & parcel delivery across GRA, Trans Amadi, Woji, Rumuokoro and all of Rivers State.",
      };
    }

    // 2. Same-day delivery
    if (path.includes("same-day-delivery-port-harcourt")) {
      return {
        title:
          "Same-Day Delivery in Port Harcourt | Fast Parcel Delivery | PICKARS",
        description:
          "Need same-day delivery in Port Harcourt? Book a PICKARS dispatch rider for express parcel and package delivery across Rivers State.",
      };
    }

    // 3. Fast delivery
    if (path.includes("fast-delivery-port-harcourt")) {
      return {
        title: "Fast Delivery Port Harcourt | Express Bike Couriers | PICKARS",
        description:
          "Fast delivery in Port Harcourt with PICKARS. Reliable bike couriers for same-day parcel pickup and delivery in GRA, Trans Amadi, Woji & more.",
      };
    }

    // 4. Dispatch rider near me
    if (path.includes("dispatch-rider-near-me")) {
      return {
        title:
          "Dispatch Rider Near Me in Port Harcourt | Book Instantly | PICKARS",
        description:
          "Looking for a dispatch rider near you in Port Harcourt? Book a verified PICKARS bike courier in minutes for fast package delivery.",
      };
    }

    // 5. Get a rider
    if (path.includes("get-a-rider")) {
      return {
        title: "Get a Rider in Port Harcourt | Instant Dispatch | PICKARS",
        description:
          "Get a dispatch rider in Port Harcourt instantly with PICKARS. Fast, reliable bike couriers for same-day delivery across Rivers State.",
      };
    }

    // 6. Bike delivery services
    if (path.includes("bike-delivery-services")) {
      return {
        title: "Bike Delivery Services in Port Harcourt | PICKARS Couriers",
        description:
          "Professional bike delivery services in Port Harcourt. Book PICKARS for fast, affordable parcel and package delivery across Rivers State.",
      };
    }

    // 7. GRA specific
    if (path.includes("dispatch-rider-gra-port-harcourt")) {
      return {
        title:
          "Dispatch Riders in GRA Port Harcourt | Same-Day Delivery | PICKARS",
        description:
          "Need a dispatch rider in GRA Port Harcourt? Book PICKARS for fast same-day parcel delivery and bike courier services in GRA and surrounding areas.",
      };
    }

    // 8. Trans Amadi specific
    if (path.includes("dispatch-rider-trans-amadi")) {
      return {
        title: "Dispatch Riders in Trans Amadi | Fast Delivery | PICKARS",
        description:
          "Book reliable dispatch riders in Trans Amadi, Port Harcourt. Fast same-day parcel delivery and bike courier service with PICKARS.",
      };
    }

    // 9. Woji specific
    if (path.includes("dispatch-rider-woji")) {
      return {
        title:
          "Dispatch Riders in Woji Port Harcourt | Same-Day Delivery | PICKARS",
        description:
          "Looking for dispatch riders in Woji? Book PICKARS for fast, reliable same-day parcel and package delivery in Woji and across Port Harcourt.",
      };
    }

    // Default homepage
    return {
      title:
        "Dispatch Riders in Port Harcourt | Same-Day Bike Couriers & Delivery | PICKARS",
      description:
        "Book fast, affordable dispatch riders in Port Harcourt. Same-day parcel delivery, bike couriers near you in GRA, Trans Amadi, Woji, and across Rivers State.",
    };
  };

  const { title, description } = getPageMeta();

  // ---------- SCHEMAS ----------
  const webpageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: title,
    description: description,
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

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Dispatch Rider & Package Delivery Service",
    provider: {
      "@type": "LocalBusiness",
      name: "Pickars Logistics",
      image: "https://www.pickars.com/box.png",
      telephone: "+2349164860591",
      priceRange: "₦₦",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Port Harcourt",
        addressRegion: "Rivers State",
        addressCountry: "NG",
      },
    },
    areaServed: [
      { "@type": "City", name: "Port Harcourt" },
      { "@type": "Place", name: "GRA Port Harcourt" },
      { "@type": "Place", name: "Trans Amadi" },
      { "@type": "Place", name: "Woji" },
      { "@type": "Place", name: "Rumuokoro" },
      { "@type": "Place", name: "Rumuola" },
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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I book a dispatch rider in Port Harcourt with Pickars?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Download the Pickars app or visit pickars.com, enter your pickup and drop-off locations, and a nearby dispatch rider will be assigned to you within minutes.",
        },
      },
      {
        "@type": "Question",
        name: "Does Pickars offer same-day parcel delivery in Port Harcourt?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Pickars offers same-day and express bike courier services across Port Harcourt including GRA, Trans Amadi, Woji, Rumuokoro and surrounding areas.",
        },
      },
      {
        "@type": "Question",
        name: "Which areas do your dispatch riders cover in Rivers State?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our riders cover Port Harcourt city and major areas including GRA, Trans Amadi, Woji, Rumuokoro, Mile 1, Mile 3, Diobu, Rumuola, Elelenwo and more across Rivers State.",
        },
      },
    ],
  };

  return (
    <div className="relative bg-[#fff] selection:bg-red-600 selection:text-white">
      <Helmet>
        {/* Dynamic Title & Description */}
        <title>{title}</title>
        <meta name="description" content={description} />

        <meta
          name="keywords"
          content="dispatch riders Port Harcourt, dispatch rider near me, same day delivery Port Harcourt, bike courier Port Harcourt, fast delivery Port Harcourt, parcel delivery Rivers State, Pickars"
        />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href={canonicalUrl} />

        {/* Geo tags */}
        <meta name="geo.region" content="NG-RI" />
        <meta name="geo.placename" content="Port Harcourt" />
        <meta name="geo.position" content="4.824167;7.080833" />
        <meta name="ICBM" content="4.824167, 7.080833" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="Pickars" />
        <meta property="og:locale" content="en_NG" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="https://www.pickars.com/box.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@pickars_app" />
        <meta name="twitter:creator" content="@pickars_app" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://www.pickars.com/box.png" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(webpageSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(serviceSchema)}
        </script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* Progress bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed inset-x-0 top-0 z-50 h-1.5 origin-left bg-[#ff0000]"
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
