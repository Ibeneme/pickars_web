import React from "react";
import { Helmet } from "react-helmet-async"; // Imported Helmet
import FAQPage from "../../sections/Faqs/FAQ";

const FAQsPage = () => {
  return (
    <div>
      {/* Dynamic SEO Meta Data */}
      <Helmet>
        <title>Frequently Asked Questions | Pickars Logistics</title>
        <meta
          name="description"
          content="Find comprehensive answers to your questions about Pickars shipping options, billing details, live package tracking, and driver support."
        />
        <link rel="canonical" href="https://pickars.com/faqs" />
        <meta property="og:title" content="Frequently Asked Questions | Pickars" />
        <meta property="og:description" content="Explore documentation on delivery coverage, rates, driver requirements, and immediate support channels." />
      </Helmet>

      <FAQPage />
    </div>
  );
};

export default FAQsPage;