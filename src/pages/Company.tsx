import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import CompanyPage from "./OurCompany";

const Company = () => {
  // Smooth scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

      <CompanyPage />
    </>
  );
};

export default Company;
