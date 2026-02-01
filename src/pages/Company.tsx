import { useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import CompanyComponent from "../sections/CompanyComponent/CompanyComponent";
import CoreValuesSection from "../sections/DeliverySteps/CoreValuesSection";
import PickarsJourney from "../sections/PickarsJourney/PickarsJourney";
import ProblemIdea from "../sections/ProblemIdea/ProblemIdea";
import TeamSection from "../sections/CompanyComponent/TeamSection";

const Company = () => {
  // Smooth scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="relative bg-[#0c0c0c] selection:bg-red-600 selection:text-white">
      {/* Reading Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[110] h-1 bg-red-600 origin-left"
        style={{ scaleX }}
      />

      <main>
        {/* 1. The Big Picture (Dark Theme) */}
        <CompanyComponent />

        {/* 2. The Narrative Shift (White Theme) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <ProblemIdea />
        </motion.div>

        <PickarsJourney />
        <TeamSection />
        <CoreValuesSection />
      </main>
    </div>
  );
};

export default Company;
