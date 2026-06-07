import { useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Helmet } from "react-helmet-async"; // Imported Helmet
import CompanyComponent from "../sections/CompanyComponent/CompanyComponent";
import CoreValuesSection from "../sections/DeliverySteps/CoreValuesSection";
import PickarsJourney from "../sections/PickarsJourney/PickarsJourney";
import ProblemIdea from "../sections/ProblemIdea/ProblemIdea";

const Company = () => {
  // Smooth scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      {/* Dynamic SEO Meta Data for the Company Page */}
      <Helmet>
        <title>Our Company | Pickars - Modern Logistics & Delivery Story</title>
        <meta
          name="description"
          content="Discover the Pickars journey. From our humble beginnings in Abuja to building Nigeria's most reliable, tech-driven dispatch and parcel delivery ecosystem."
        />
        <link rel="canonical" href="https://pickars.com/app/our-company" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pickars.com/app/our-company" />
        <meta
          property="og:title"
          content="Our Company | Pickars - Modern Logistics"
        />
        <meta
          property="og:description"
          content="Discover the Pickars journey and our core values of innovation and reliability."
        />

        {/* Twitter */}
        <meta
          name="twitter:title"
          content="Our Company | Pickars - Modern Logistics"
        />
        <meta
          name="twitter:description"
          content="Discover the Pickars journey and our core values of innovation and reliability."
        />
      </Helmet>

      <div className="relative bg-[#0c0c0c] selection:bg-red-600 selection:text-white">
        {/* Reading Progress Indicator */}
        <motion.div
          className="fixed top-0 left-0 right-0 z-[110] h-1 bg-red-600 origin-left"
          style={{ scaleX }}
        />

        <main>
          {/* 1. The Big Picture (Dark Theme) */}
          <CompanyComponent />

          {/* 2. The Narrative Shift (White Theme) */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <ProblemIdea />
          </motion.div>

          <PickarsJourney />
          <CoreValuesSection />
        </main>
      </div>
    </>
  );
};

export default Company;
