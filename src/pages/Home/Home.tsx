import { motion, useScroll, useSpring } from "framer-motion";
import SlidingPage from "../../components/SlidingPgae/SlidingPage";
import CommentsSection from "../../sections/CommentsSection/CommentsSection";
import CustomerRiderSection from "../../sections/CustomerRiderSection/CustomerRiderSection";
import ServicesSection from "../../sections/DeliverySteps/OurServices";
import HeroSection from "../../sections/Hero/HeroSection";



const Home = () => {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  return (
    <div className="relative bg-[#0c0c0c] selection:bg-red-600 selection:text-white">
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
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ margin: "-100px" }}
        >
          <ServicesSection />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <CustomerRiderSection />
        </motion.div>

        <CommentsSection />
      </main>

      {/* 5. Subtle Grain Overlay (Optional but very 'Mind-Blowing') */}
      <div className="pointer-events-none fixed inset-0 z-[999] opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
};

export default Home;
