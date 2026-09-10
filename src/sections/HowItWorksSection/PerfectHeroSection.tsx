import React from "react";
import { motion, useInView } from "framer-motion";
import PortHarcourtMapComponent from "./PortHarcourtMapComponent";
import DownloadButtons from "../../components/buttons/DownloadButtons";

const PerfectHeroSection: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#fff] py-12 sm:py-16 md:py-32 font-['Lufga'] text-gray-900"
    >
      <div className="relative z-10 px-4 sm:px-6 max-w-7xl mx-auto">
        {/* ── HEADER / HERO COPY ─────────────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 md:mb-20 flex flex-col items-center">
          {/* Badge with stylized cutout edge effects */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={isInView ? { opacity: 1, scale: 1, rotate: -2 } : {}}
            whileHover={{ scale: 1.08, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="mb-4 sm:mb-6 px-5 sm:px-6 py-2 sm:py-2.5 bg-[#FF0000] text-white font-black text-[11px] sm:text-xs md:text-sm uppercase tracking-widest cursor-default select-none"
            style={{
              maskImage:
                "radial-gradient(circle 5px at calc(100% - 2.5px) 50%, #0000 99%, #000 100%)",
              WebkitMaskImage:
                "conic-gradient(from -45deg at 50% 50%, #000 0 90deg, #0000 0) 0 0/10px 10px repeat",
            }}
          >
            EVERYWHERE
          </motion.div>

          {/* Main Hero Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-5 text-5xl font-black leading-[1.05] tracking-tight text-gray-900 sm:text-6xl md:text-6xl lg:text-7xl"
          >
            Bringing Your Items Right to Your{" "}
            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#ff0000] via-[#ff0000] to-[#ff0000]">
              {" "}
              Doorstep
            </span>
          </motion.h1>

          {/* Subtitle / Value Proposition */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ lineHeight: 1.8 }}
            className="mt-4 sm:mt-5 text-[16px] sm:text-[20px] text-gray-600 font-medium leading-relaxed max-w-2xl px-2 sm:px-0"
          >
            Whether you run a busy online store or just need to drop a package
            across town, Pickars connects you with a verified rider in minutes.
          </motion.p>

          {/* Primary Action Buttons (App Store & Play Store) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-row items-center justify-center gap-4 w-full flex-wrap"
          >
            <DownloadButtons />
          </motion.div>
        </div>

        {/* ── INTERACTIVE PH MAP HERO VISUAL ────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="relative  rounded-3xl overflow-hidden"
        >
          <PortHarcourtMapComponent />
        </motion.div>
      </div>
    </section>
  );
};

export default PerfectHeroSection;
