import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import FAQPage from "../../sections/Faqs/FAQ";
import { useScroll, useSpring, motion } from "framer-motion";

const FAQsPage = () => {
  const location = useLocation();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const canonicalUrl = `https://www.pickars.com${location.pathname}`;
  const ogImageUrl = "https://www.pickars.com/about-us.png";

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I book a dispatch rider in Port Harcourt with Pickars?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can quickly book a dispatch rider using the Pickars mobile app or website. Enter your pickup and delivery locations in Port Harcourt for instant rider matching and real-time tracking.",
        },
      },
      {
        "@type": "Question",
        name: "How fast are Pickars delivery pickups in Port Harcourt?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our nearby dispatch riders typically pick up parcels within minutes of booking and deliver on the same day across GRA, Trans Amadi, Woji, and other areas in Port Harcourt.",
        },
      },
      {
        "@type": "Question",
        name: "How can I track my parcel live?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Once a dispatch rider accepts your request, you can monitor their live GPS position and package progress on the Pickars tracking page or mobile app.",
        },
      },
      {
        "@type": "Question",
        name: "What items can be delivered using Pickars dispatch riders?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Pickars handles documents, food orders, e-commerce products, electronics, and small-to-medium packages securely across Rivers State.",
        },
      },
    ],
  };

  return (
    <div className="relative bg-[#fff] selection:bg-red-600 selection:text-white">
      <Helmet>
        {/* Core SEO */}
        <title>
          Frequently Asked Questions | Pickars Dispatch & Delivery Port Harcourt
        </title>
        <meta
          name="description"
          content="Get answers to FAQs on booking dispatch riders in Port Harcourt, delivery rates, live package tracking, rider signups, and customer support with Pickars."
        />
        <meta
          name="keywords"
          content="Pickars FAQs, dispatch rider questions Port Harcourt, courier delivery help, package tracking Port Harcourt, bike delivery rates PH"
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
          content="Frequently Asked Questions | Pickars Delivery"
        />
        <meta
          property="og:description"
          content="Find answers to common questions about booking dispatch riders, tracking shipments, pricing, and driver support in Port Harcourt."
        />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:image:secure_url" content={ogImageUrl} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="Pickars Frequently Asked Questions"
        />

        {/* Twitter (X) */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@pickars_app" />
        <meta name="twitter:creator" content="@pickars_app" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta
          name="twitter:title"
          content="Frequently Asked Questions | Pickars Delivery"
        />
        <meta
          name="twitter:description"
          content="Find answers to common questions about booking dispatch riders, tracking shipments, and pricing in Port Harcourt."
        />
        <meta name="twitter:image" content={ogImageUrl} />
        <meta
          name="twitter:image:alt"
          content="Pickars Frequently Asked Questions"
        />

        {/* Structured Data Graph */}
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* Scroll Progress Bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed inset-x-0 top-0 z-50 h-1.5 origin-left bg-[#ff0000]"
      />

      <main>
        <FAQPage />
      </main>
    </div>
  );
};

export default FAQsPage;
