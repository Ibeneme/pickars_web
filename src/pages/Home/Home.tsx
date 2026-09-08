import { motion, useScroll, useSpring } from "framer-motion";
import { Helmet } from "react-helmet-async"; // Imported Helmet
import SlidingPage from "../../components/SlidingPgae/SlidingPage";
//import CustomerRiderSection from "../../sections/CustomerRiderSection/CustomerRiderSection";
import HeroSection from "../../sections/Hero/HeroSection";
//import HowItWorksSection from "../../sections/HowItWorksSection/HowItWorksSection";
//import FinalBookingSection from "../../sections/HowItWorksSection/FinalBookingSection";
//import PickarsPricingStackingScrollSection from "../../components/templates/stack";
import PickarsTestimonialsSection from "../../sections/CommentsSection/CommentsSection";
import HowItWorks from "../../sections/HowItWorksSection/HowItWorksSection";
import PackageDeliverySection from "../../sections/HowItWorksSection/PackageDeliverySection";
import NeverLateBanner from "../../sections/HowItWorksSection/Planforlatersection";
//import PickarsQRCode from "../PickarsQRCode/PickarsQRCode";
// import PickarsFeaturesSection from "../../sections/HeroDelivery/MidImage";
//import MidImage from "../../sections/HeroDelivery/MidImage";

const Home = () => {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  return (
    <div className="relative bg-[#fff] selection:bg-red-600 selection:text-white">
      {/* Dynamic SEO Meta Data */}
      <Helmet>
        <title>
          Pickars | On-Demand Delivery &amp; Urban Logistics Ecosystem
        </title>
        <meta
          name="description"
          content="Ship packages across the city instantly. Pickars connects you with reliable independent delivery professionals for secure, real-time tracked, and cost-effective dispatch services."
        />
        <link rel="canonical" href="https://pickars.com" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Pickars | On-Demand Delivery &amp; Urban Logistics"
        />
        <meta
          property="og:description"
          content="Real-time bike and vehicular dispatch tracking across town. Fast onboarding for riders, transparent pricing structures for consumers."
        />
      </Helmet>

      <motion.div
        className="fixed top-0 left-0 right-0 z-[110] h-1 bg-red-600 origin-left"
        style={{ scaleX }}
      />

      <main className="overflow-x-hidden">
        <HeroSection />

        <section className="relative z-10">
          <SlidingPage />
        </section>
        <PackageDeliverySection />

        <HowItWorks />
        <NeverLateBanner />
        <PickarsTestimonialsSection />
      </main>
    </div>
  );
};

export default Home;
