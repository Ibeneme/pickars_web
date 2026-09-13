import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import AFHero from "../../sections/AppFeaturesSection/AF_Hero";
import AFNotifications from "../../sections/AppFeaturesSection/AFNotifications";
import UberDispatchFlow from "../../sections/CompanyComponent/PickarsDispatchMap";

const AppFeatures: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div>
      {/* Top Scroll Progress Bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed inset-x-0 top-0 z-50 h-1.5 origin-left bg-[#FF0000]"
      />

      <AFHero />
      <AFNotifications />
      <UberDispatchFlow />
    </div>
  );
};

export default AppFeatures;
