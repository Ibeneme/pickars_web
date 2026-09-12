import { useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Helmet } from "react-helmet-async";
import CompanyPage from "./OurCompany";

const Company = () => {
  // Scroll progress for the top indicator bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  // Smooth scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative bg-[#fff] selection:bg-red-600 selection:text-white">
      {/* Dynamic SEO Meta Data for the Company Page */}
      <Helmet>
        <title>Our Company | Pickars - Modern Logistics & Delivery Story</title>
        <meta
          name="description"
          content="Discover the Pickars journey. From our beginnings in Port Harcourt to building Nigeria's most reliable, tech-driven dispatch and parcel delivery ecosystem."
        />
        <meta
          name="keywords"
          content="Pickars logistics, about Pickars, delivery company Port Harcourt, dispatch services Nigeria, our story"
        />
        <link rel="canonical" href="https://pickars.com/app/our-company" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pickars.com/app/our-company" />
        <meta
          property="og:title"
          content="Our Company | Pickars - Modern Logistics & Delivery Story"
        />
        <meta
          property="og:description"
          content="Discover the Pickars journey and our core values of innovation, speed, and reliability in urban logistics."
        />
        <meta property="og:image" content="https://pickars.com/box.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:url"
          content="https://pickars.com/app/our-company"
        />
        <meta
          name="twitter:title"
          content="Our Company | Pickars - Modern Logistics & Delivery Story"
        />
        <meta
          name="twitter:description"
          content="Discover the Pickars journey and our core values of innovation, speed, and reliability in urban logistics."
        />
        <meta name="twitter:image" content="https://pickars.com/box.png" />
      </Helmet>

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[110] h-1 bg-red-600 origin-left"
        style={{ scaleX }}
      />

      <CompanyPage />
    </div>
  );
};

export default Company;
