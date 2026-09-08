import React from "react";
import { motion, useInView } from "framer-motion";
import PlaceOrderSection from "./PlaceOrderSection";

export const IOS_URL = "https://apps.apple.com/ng/app/pickars/id6746796884";
export const ANDROID_URL =
  "https://play.google.com/store/apps/details?id=com.pickars.app&hl=en";

const HowItWorks: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#FFF5F5] py-16 font-['Lufga'] text-gray-900"
    >
      <div className="relative z-10 px-4  max-w-7xl mx-auto">
        {/* SECTION HEADER */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16 md:mb-24 flex flex-col items-center">
          {/* TRACK RECORD BADGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={isInView ? { opacity: 1, scale: 1, rotate: -2 } : {}}
            whileHover={{ scale: 1.08, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="mb-4 sm:mb-6 px-5 sm:px-6 py-2 sm:py-2.5 bg-[#FF0000] text-white font-black text-[11px] sm:text-xs md:text-sm uppercase tracking-widest cursor-default select-none shadow-lg shadow-red-600/20"
            style={{
              maskImage:
                "radial-gradient(circle 5px at calc(100% - 2.5px) 50%, #0000 99%, #000 100%)",
              WebkitMaskImage:
                "conic-gradient(from -45deg at 50% 50%, #000 0 90deg, #0000 0) 0 0/10px 10px repeat",
            }}
          >
            Pickars Logistics • PH
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-8xl font-black leading-[1.15] tracking-tight text-gray-900"
          >
            Get a dispatch rider.{" "}
            <span className="text-[#FF0000]">Instantly.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 sm:mt-5 text-[16px] sm:text-[20px] text-gray-600 font-medium leading-relaxed max-w-2xl px-2 sm:px-0"
          >
            Download the Pickars app today for the smartest package delivery
            experience across Port Harcourt.
          </motion.p>
        </div>
        <div style={{ marginTop: 32 }}>
          <PlaceOrderSection />
        </div>
  
      </div>

    </section>
  );
};

export default HowItWorks;
