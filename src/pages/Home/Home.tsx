import { motion, useScroll, useSpring } from "framer-motion";
import SlidingPage from "../../components/SlidingPgae/SlidingPage";
import CommentsSection from "../../sections/CommentsSection/CommentsSection";
import CustomerRiderSection from "../../sections/CustomerRiderSection/CustomerRiderSection";
import HeroSection from "../../sections/Hero/HeroSection";
import HowItWorksSection from "../../sections/HowItWorksSection/HowItWorksSection";
import FinalBookingSection from "../../sections/HowItWorksSection/FinalBookingSection";


const Home = () => {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  return (
    <div className="relative bg-[#fff] selection:bg-red-600 selection:text-white">
      {/* 1. Global Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[110] h-1 bg-red-600 origin-left"
        style={{ scaleX }}
      />

      <main className="overflow-x-hidden">
        <HeroSection />

        <section className="relative z-10">
          <SlidingPage />
        </section>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <CustomerRiderSection />
        </motion.div>

        <HowItWorksSection />
        <CommentsSection />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ margin: "-100px" }}
        >
          <FinalBookingSection />
        </motion.div>
      </main>
    </div>
  );
};

export default Home;
