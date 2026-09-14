import { useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import CompanyPage from "./OurCompany";

const Company = () => {
  const { scrollYProgress } = useScroll();
  const location = useLocation();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  // Smooth scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Dynamic canonical URL matching active path
  const canonicalUrl = `https://www.pickars.com${location.pathname}`;

  // Advanced AboutPage & Organization Schema Graph
  const companySchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: "About Pickars Logistics | Our Company & Journey",
        description:
          "Learn about Pickars Courier Limited, our mission to revolutionize last-mile parcel delivery and dispatch rider networks across Port Harcourt and Nigeria.",
        isPartOf: {
          "@type": "WebSite",
          "@id": "https://www.pickars.com/#website",
          url: "https://www.pickars.com/",
          name: "Pickars",
        },
        about: {
          "@id": "https://www.pickars.com/#organization",
        },
        inLanguage: "en-NG",
      },
      {
        "@type": "Organization",
        "@id": "https://www.pickars.com/#organization",
        name: "Pickars Courier Limited",
        url: "https://www.pickars.com",
        logo: {
          "@type": "ImageObject",
          url: "https://www.pickars.com/box.png",
          width: 512,
          height: 512,
        },
        foundingLocation: {
          "@type": "Place",
          name: "Port Harcourt, Rivers State, Nigeria",
        },
        slogan: "Fast & Reliable Dispatch Deliveries",
        description:
          "Pickars is a technology-driven logistics company providing fast dispatch riders, same-day parcel courier services, and urban delivery solutions.",
        sameAs: [
          "https://www.instagram.com/pickars_official",
          "https://x.com/pickars_app",
          "https://www.facebook.com/share/1cW4kyitrJ/",
          "https://www.linkedin.com/company/pickars/",
        ],
      },
    ],
  };

  return (
    <div className="relative bg-[#fff] selection:bg-red-600 selection:text-white">
      {/* Dynamic SEO Meta Data for the Company Page */}
      <Helmet>
        {/* Core SEO */}
        <title>Our Company & Mission | Pickars Logistics Port Harcourt</title>
        <meta
          name="description"
          content="Discover the Pickars journey. Building Port Harcourt's most reliable, tech-driven dispatch rider network and express parcel delivery ecosystem."
        />
        <meta
          name="keywords"
          content="about Pickars, Pickars logistics company, dispatch service company Port Harcourt, courier company Rivers State, urban last mile delivery Nigeria"
        />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href={canonicalUrl} />

        {/* Local Geo Signals */}
        <meta name="geo.region" content="NG-RI" />
        <meta name="geo.placename" content="Port Harcourt" />
        <meta name="geo.position" content="4.824167;7.080833" />
        <meta name="ICBM" content="4.824167, 7.080833" />

        {/* Open Graph / Facebook / WhatsApp */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="Pickars Logistics" />
        <meta property="og:locale" content="en_NG" />
        <meta
          property="og:title"
          content="Our Company & Mission | Pickars Logistics"
        />
        <meta
          property="og:description"
          content="Discover the Pickars story. We are building the most trusted dispatch rider and urban parcel delivery network across Port Harcourt and Nigeria."
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
          content="Our Company & Story | Pickars Logistics"
        />
        <meta
          name="twitter:description"
          content="Discover the Pickars journey and our core mission of speed, reliability, and tech-driven dispatch solutions."
        />
        <meta name="twitter:image" content="https://www.pickars.com/box.png" />

        {/* Structured Data Graph */}
        <script type="application/ld+json">
          {JSON.stringify(companySchema)}
        </script>
      </Helmet>

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[110] h-1 bg-red-600 origin-left"
        style={{ scaleX }}
      />

      <main>
        <CompanyPage />
      </main>
    </div>
  );
};

export default Company;
