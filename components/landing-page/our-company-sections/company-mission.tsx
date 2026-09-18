// components/about/Mission.tsx
"use client";

import React from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import phoneInPocket from "@/assets/landing-page-images/phone-in-pocket.svg";
import photo from "@/assets/landing-page-images/picking-a-package.svg";
import DownloadButtons from "@/components/atoms/buttons/DownloadButtons";

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const scaleInVariant: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

export const CompanyMission: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-[#fff]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6 md:space-y-8">
        {/* Top Grid: Mission Content & First Image */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
          {/* Left Column: Mission Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
            className="relative bg-black rounded-[32px] sm:rounded-[40px] p-4 sm:p-6 md:p-8 flex flex-col justify-between overflow-hidden min-h-[500px] sm:min-h-[580px]"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: -2 }}
              whileHover={{ scale: 1.08, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="mb-4 sm:mb-6 px-5 sm:px-6 py-2 max-w-[210px] sm:py-2.5 bg-[#FF0000] text-white font-black text-[11px] sm:text-xs md:text-sm uppercase tracking-widest cursor-default select-none"
              style={{
                maskImage:
                  "radial-gradient(circle 5px at calc(100% - 2.5px) 50%, #0000 99%, #000 100%)",
                WebkitMaskImage:
                  "conic-gradient(from -45deg at 50% 50%, #000 0 90deg, #0000 0) 0 0/10px 10px repeat",
              }}
            >
              Our Core Mission
            </motion.div>

            <div className="my-6">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.08]">
                The Pickars Mission
              </h2>
              <p className="mt-5 text-base sm:text-lg font-normal leading-relaxed text-zinc-300">
                We started Pickars out of a simple frustration: sending items
                across Port Harcourt shouldn't require countless phone calls,
                unreliable dispatchers, or endless tracking anxiety.
              </p>
              <p className="mt-4 text-base sm:text-lg font-normal leading-relaxed text-zinc-300">
                Today, we back your business and personal deliveries with
                state-of-the-art route tracking, elite vetted riders, and
                absolute accountability from pickup to doorstep.
              </p>
            </div>

            {/* App Download Buttons */}
            <DownloadButtons dark alignLeft />
          </motion.div>

          {/* Right Column: First Image */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={scaleInVariant}
            className="relative overflow-hidden rounded-[32px] sm:rounded-[40px] min-h-[500px] sm:min-h-[580px] h-full"
          >
            <Image
              src={phoneInPocket}
              alt="Delivery rider navigating city"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </motion.div>
        </div>

        {/* Bottom Banner Image */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariant}
          className="relative overflow-hidden rounded-[32px] sm:rounded-[40px] w-full h-[350px] sm:h-[450px] md:h-[500px]"
        >
          <Image
            src={photo}
            alt="Pickars service showcase"
            fill
            className="object-cover"
            sizes="100vw"
          />



          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Text Overlay */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 z-10"
          >
            <h3 className="text-white text-4xl sm:text-6xl font-black tracking-tighter font-['Lufga']">
              Pickars<span style={{ color: "#ff0000" }}>.</span>
            </h3>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
