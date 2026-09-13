import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { CompanyHero } from "../sections/CompanyComponent/CompanyHero";
import { Mission } from "../sections/CompanyComponent/Mission";
import { CompanyCoreValues } from "../sections/CompanyComponent/CompanyCoreValues";

const CompanyPage: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="relative bg-[#fff] font-['Lufga'] text-black overflow-hidden">
      {/* Top Scroll Progress Bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed inset-x-0 top-0 z-50 h-1.5 origin-left bg-[#FF0000]"
      />

      <CompanyHero />
      <Mission />
      <CompanyCoreValues />
    </div>
  );
};

export default CompanyPage;
