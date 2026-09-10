import { Helmet } from "react-helmet-async"; // Imported Helmet
//import FAQPage from "../../sections/Faqs/FAQ";
import PickarsTestimonialsSection from "../../sections/CommentsSection/CommentsSection";

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
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Frequently Asked Questions | Pickars"
        />
        <meta
          property="og:description"
          content="Explore documentation on delivery coverage, rates, driver requirements, and immediate support channels."
        />
        <meta property="og:image" content="http://pickars.com/box.png" />
      </Helmet>

      <PickarsTestimonialsSection />
    </div>
  );
};

export default FAQsPage;
