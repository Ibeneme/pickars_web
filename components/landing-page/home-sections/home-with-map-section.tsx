"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import DownloadButtons from "@/components/atoms/buttons/DownloadButtons";
import PortHarcourtAnimatedMap from "@/components/atoms/animated/maps/port-harcourt-animated-map";
import { Sparkle } from "lucide-react";

const PRIMARY_COLOR = "#ff0000";

const HomeWithMapSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-white font-['Lufga'] text-gray-900 py-12 sm:py-16 lg:py-24"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-0 lg:px-0">
        {/* Header Grid */}
        <div className="grid items-end gap-6  md:grid-cols-[1.6fr_1fr] md:gap-12 lg:gap-16">
          <h2 className="text-6xl font-black leading-none tracking-tight sm:text-8xl">
            Book a rider
            <span
              style={{ backgroundColor: PRIMARY_COLOR }}
              className="mx-1.5 sm:mx-2.5 inline-flex h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 items-center justify-center rounded-full align-middle text-white"
            >
              <Sparkle className="h-3.5 w-3.5 sm:h-5 sm:w-5 md:h-6 md:w-6" />
            </span>{" "}
            <span
              style={{ backgroundColor: PRIMARY_COLOR }}
              className="inline-block px-2 sm:px-3 text-white mt-1 sm:mt-0"
            >
              with Ease
            </span>
          </h2>

          <div className="flex flex-col items-start gap-4 sm:gap-5 md:pb-2">
            <p className="max-w-md text-sm sm:text-base leading-relaxed text-black/70">
              Need something picked up or delivered? Request a nearby Pickars
              rider in seconds, follow them live on the map, and have your
              package handed over at the door, quickly and safely.
            </p>
            <div className="w-full sm:w-auto">
              <DownloadButtons isHalf={true} alignLeft={true} />
            </div>
          </div>
        </div>

        {/* Responsive Map Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="relative w-full mt-16 overflow-hidden rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100"
        >
          <div className="w-full h-auto min-h-[350px] sm:min-h-[450px] lg:min-h-[550px]">
            <PortHarcourtAnimatedMap />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeWithMapSection;
