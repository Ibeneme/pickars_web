import { motion, useScroll, useSpring } from "framer-motion";
import { Helmet } from "react-helmet-async";
import SlidingPage from "../../components/SlidingPgae/SlidingPage";
import HeroSection from "../../sections/Hero/HeroSection";
import PickarsTestimonialsSection from "../../sections/CommentsSection/CommentsSection";
import HowItWorks from "../../sections/HowItWorksSection/HowItWorksSection";
import PackageDeliverySection from "../../sections/HowItWorksSection/PackageDeliverySection";
import NeverLateBanner from "../../sections/HowItWorksSection/Planforlatersection";
import PerfectHeroSection from "../../sections/HowItWorksSection/PerfectHeroSection";

const Home = () => {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  return (
    <div className="relative bg-[#fff] selection:bg-red-600 selection:text-white">
      {/* Enhanced SEO & Social Meta Data */}
      <Helmet>
        <title>
          Pickars | Fast On-Demand Delivery & Urban Logistics in Port Harcourt
        </title>
        <meta
          name="description"
          content="Connect instantly with verified dispatch riders in Port Harcourt. Fast, reliable, and stress-free package delivery for individuals and online stores."
        />
        <meta
          name="keywords"
          content="delivery service Port Harcourt, dispatch riders, logistics ecosystem, send packages, online store delivery, Pickars"
        />
        <link rel="canonical" href="https://pickars.com" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pickars.com" />
        <meta
          property="og:title"
          content="Pickars | Fast On-Demand Delivery & Urban Logistics in Port Harcourt"
        />
        <meta
          property="og:description"
          content="Connect instantly with verified dispatch riders in Port Harcourt. Fast, reliable, and stress-free package delivery."
        />
        <meta property="og:image" content="https://pickars.com/box.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://pickars.com" />
        <meta
          name="twitter:title"
          content="Pickars | Fast On-Demand Delivery & Urban Logistics in Port Harcourt"
        />
        <meta
          name="twitter:description"
          content="Connect instantly with verified dispatch riders in Port Harcourt. Fast, reliable, and stress-free package delivery."
        />
        <meta name="twitter:image" content="https://pickars.com/box.png" />
      </Helmet>

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[110] h-1 bg-red-600 origin-left"
        style={{ scaleX }}
      />

      <main>
        <HeroSection />

        <section className="relative z-10">
          <SlidingPage />
        </section>

        <PerfectHeroSection />
        <PackageDeliverySection />
        <HowItWorks />
        <NeverLateBanner />
        <PickarsTestimonialsSection />
      </main>
    </div>
  );
};

export default Home;
