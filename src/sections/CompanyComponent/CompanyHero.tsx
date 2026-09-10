import React from "react";
import { motion, type Variants } from "framer-motion";
import DownloadButtons from "../../components/buttons/DownloadButtons";

export const CompanyHero: React.FC = () => {
  const itemVariants: Variants = {
    hidden: { y: 18, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 110, damping: 16 },
    },
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  return (
    <section className="relative isolate overflow-hidden bg-[#fff] pt-36 pb-0 font-['Lufga'] text-gray-900 md:pt-48 md:pb-0 mx-auto flex flex-col items-center justify-center text-center">
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center gap-12 px-4 sm:px-6 lg:gap-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex w-full flex-col items-center text-center"
        >
          <motion.div
            variants={itemVariants}
            className="mb-5 px-5 py-2 bg-[#ff0000] text-white font-black text-[11px] sm:text-xs uppercase tracking-widest cursor-default select-none"
            style={{
              maskImage:
                "radial-gradient(circle 5px at calc(100% - 2.5px) 50%, #0000 99%, #000 100%)",
              WebkitMaskImage:
                "conic-gradient(from -45deg at 50% 50%, #000 0 90deg, #0000 0) 0 0/10px 10px repeat",
            }}
          >
            ABOUT PICKARS
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="mb-5 text-4xl font-black leading-[1.05] tracking-tight text-gray-900 sm:text-6xl md:text-6xl lg:text-6xl"
          >
            get your goods{" "}
            <span className="relative inline-block text-[#FF0000]">going.</span>
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="mb-9 max-w-xl text-[16px] sm:text-[19px] font-medium leading-relaxed text-gray-600"
          >
            Built for the hustle of Garden City. Pickars eliminates the friction
            of traditional logistics, empowering vendors, creators, and everyday
            senders with instant, dependable doorstep dispatch.
          </motion.p>
          <DownloadButtons />
        </motion.div>
      </div>
    </section>
  );
};
