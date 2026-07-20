
import { motion, useScroll, useSpring } from "framer-motion";
import { Helmet } from "react-helmet-async"; // Imported Helmet
import SlidingPage from "../../components/SlidingPgae/SlidingPage";
import CommentsSection from "../../sections/CommentsSection/CommentsSection";
//import CustomerRiderSection from "../../sections/CustomerRiderSection/CustomerRiderSection";
import HeroSection from "../../sections/Hero/HeroSection";
//import HowItWorksSection from "../../sections/HowItWorksSection/HowItWorksSection";
import FinalBookingSection from "../../sections/HowItWorksSection/FinalBookingSection";
import HowItWorksSection from "../../sections/HowItWorksSection/HowItWorksSection";
import CoreValuesSection from "../../sections/DeliverySteps/CoreValuesSection";
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


        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ margin: "-100px" }}
        >
          <FinalBookingSection />
        </motion.div>
        
        <CoreValuesSection />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <HowItWorksSection />
        </motion.div>
        <section className="relative z-10">
          <SlidingPage />
        </section>
        {/* <HowItWorksSection /> */}
        <CommentsSection />
        {/* <MidImage /> */}
      </main>
    </div>
  );
};

export default Home;
