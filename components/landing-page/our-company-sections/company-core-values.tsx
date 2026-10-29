"use client";

import React, { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { FiShield, FiZap, FiHeadphones, FiCompass } from "react-icons/fi";
import DownloadButtons from "@/components/atoms/buttons/DownloadButtons";

const PRIMARY_COLOR = "#ff0000";

interface ValueCardData {
  icon: React.ReactNode;
  title: string;
  description: string;
  spanClass?: string; // For customized bento sizing
}

export const CompanyCoreValues: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const values: ValueCardData[] = [
    {
      icon: <FiZap className="h-6 w-6 sm:h-7 sm:w-7" />,
      title: "Fast & Reliable",
      description:
        "No long waiting times. We match you with nearby riders so your items get delivered quickly and on time, every time.",
      spanClass: "lg:col-span-7",
    },
    {
      icon: <FiShield className="h-6 w-6 sm:h-7 sm:w-7" />,
      title: "Safe & Secure",
      description:
        "Your package is in good hands. We work only with trusted, verified riders who make sure your items arrive damage-free.",
      spanClass: "lg:col-span-5",
    },
    {
      icon: <FiCompass className="h-6 w-6 sm:h-7 sm:w-7" />,
      title: "Live GPS Tracking",
      description:
        "Know exactly where your package is. Follow your rider's journey on the map in real time from pickup to delivery.",
      spanClass: "lg:col-span-5",
    },
    {
      icon: <FiHeadphones className="h-6 w-6 sm:h-7 sm:w-7" />,
      title: "24/7 Helpful Support",
      description:
        "Have a question or run into an issue? Our friendly support team is always available to help you out immediately.",
      spanClass: "lg:col-span-7",
    },
  ];

  const headerVariant: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-white pb-20 pt-12 font-['Lufga'] text-gray-900 sm:pb-28 sm:pt-16"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* ---------- Header Section ---------- */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={headerVariant}
          className="mb-12 grid items-end gap-6 sm:mb-16 md:grid-cols-[1.4fr_1fr] md:gap-16"
        >
          <div>
            <div className="mb-4 flex items-center gap-3 sm:mb-5">
              <span
                className="h-0.5 w-8 sm:w-10"
                style={{ backgroundColor: PRIMARY_COLOR }}
              />
              <span
                className="text-xs font-bold uppercase tracking-[0.2em] sm:text-sm"
                style={{ color: PRIMARY_COLOR }}
              >
                Our core values
              </span>
            </div>
            <h2 className="text-3xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              Igniting and driving the ultimate{" "}
              <span style={{ color: PRIMARY_COLOR }}>goal</span>
            </h2>
          </div>

          <div className="flex flex-col items-start gap-5 md:pb-1">
            <p className="max-w-md text-sm leading-relaxed text-gray-600 sm:text-base">
              The values behind every Pickars delivery, and the reason Port
              Harcourt keeps sending with us.
            </p>
            <DownloadButtons alignLeft />
          </div>
        </motion.div>

        {/* ---------- Asymmetric Bento Values Grid ---------- */}
        <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-12">
          {values.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.55,
                delay: 0.15 + idx * 0.1,
                ease: "easeOut",
              }}
              className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-gray-100 bg-[#FAFAFA] p-8 transition-all duration-300  sm:p-10 ${
                item.spanClass || "lg:col-span-6"
              }`}
            >
              {/* Background Accent Glow on Hover */}
              <div
                className="absolute -right-12 -top-12 h-36 w-36 rounded-full opacity-0 blur-2xl transition-opacity duration-500"
                style={{ backgroundColor: PRIMARY_COLOR }}
              />

              {/* Top row: Icon + Index */}
              <div className="relative z-10 flex items-start justify-between">
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 sm:h-16 sm:w-16"
                  style={{
                    backgroundColor: "rgba(255, 0, 0, 0.08)",
                    color: PRIMARY_COLOR,
                  }}
                >
                  {item.icon}
                </div>
                <span
                  className="text-sm font-bold tracking-widest text-gray-300"
                  aria-hidden="true"
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Copy */}
              <div className="relative z-10 mt-12 sm:mt-16">
                <h3 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
                  {item.description}
                </p>
              </div>

              {/* Animated bottom indicator bar */}
              <span
                className="absolute bottom-0 left-0 h-1 w-0 transition-all duration-500 "
                style={{ backgroundColor: PRIMARY_COLOR }}
                aria-hidden="true"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyCoreValues;