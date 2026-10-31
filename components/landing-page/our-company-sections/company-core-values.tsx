"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  type Variants,
} from "framer-motion";
import {
  FiShield,
  FiZap,
  FiHeadphones,
  FiCompass,
  FiPlus,
  FiMinus,
} from "react-icons/fi";
import DownloadButtons from "@/components/atoms/buttons/DownloadButtons";

const PRIMARY_COLOR = "#ff0000";

interface ValueCardData {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const CompanyCoreValues: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const values: ValueCardData[] = [
    {
      icon: <FiZap className="h-5 w-5" />,
      title: "Fast & Reliable",
      description:
        "No long waiting times. We match you with nearby riders so your items get delivered quickly and on time, every time.",
    },
    {
      icon: <FiShield className="h-5 w-5" />,
      title: "Safe & Secure",
      description:
        "Your package is in good hands. We work only with trusted, verified riders who make sure your items arrive damage-free.",
    },
    {
      icon: <FiCompass className="h-5 w-5" />,
      title: "Live GPS Tracking",
      description:
        "Know exactly where your package is. Follow your rider's journey on the map in real time from pickup to delivery.",
    },
    {
      icon: <FiHeadphones className="h-5 w-5" />,
      title: "24/7 Helpful Support",
      description:
        "Have a question or run into an issue? Our friendly support team is always available to help you out immediately.",
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
      className="relative overflow-x-clip bg-white pb-20 pt-12 font-['Lufga'] text-gray-900 sm:pb-28 sm:pt-16"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16">
        {/* ---------- LEFT: sticky header ---------- */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={headerVariant}
          className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start"
        >
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

          <h2 className="text-3xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-5xl xl:text-6xl">
            Igniting and driving the ultimate{" "}
            <span style={{ color: PRIMARY_COLOR }}>goal</span>
          </h2>

          <p className="mt-5 max-w-md text-sm leading-relaxed text-gray-600 sm:text-base">
            The values behind every Pickars delivery, and the reason Port
            Harcourt keeps sending with us.
          </p>

          <div className="mt-7">
            <DownloadButtons alignLeft />
          </div>
        </motion.div>

        {/* ---------- RIGHT: accordion ---------- */}
        <div className="lg:col-span-7">
          <div className="divide-y divide-gray-200 border-y border-gray-200">
            {values.map((item, idx) => {
              const isOpen = openIndex === idx;
              const panelId = `core-value-panel-${idx}`;
              const buttonId = `core-value-button-${idx}`;

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: 0.15 + idx * 0.1,
                    ease: "easeOut",
                  }}
                >
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      className="group flex w-full items-center gap-4 py-6 text-left sm:gap-5 sm:py-7"
                    >
                      {/* Icon */}
                      <span
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 sm:h-12 sm:w-12"
                        style={{
                          backgroundColor: isOpen
                            ? PRIMARY_COLOR
                            : "rgba(255, 0, 0, 0.08)",
                          color: isOpen ? "#fff" : PRIMARY_COLOR,
                        }}
                      >
                        {item.icon}
                      </span>

                      {/* Title */}
                      <span
                        className={`flex-1 text-lg font-bold tracking-tight transition-colors duration-300 sm:text-xl ${
                          isOpen
                            ? "text-gray-900"
                            : "text-gray-700 group-hover:text-gray-900"
                        }`}
                      >
                        {item.title}
                      </span>

                      {/* Plus / Minus */}
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
                          isOpen
                            ? "border-transparent text-white"
                            : "border-gray-200 text-gray-500 group-hover:border-gray-300"
                        }`}
                        style={isOpen ? { backgroundColor: PRIMARY_COLOR } : {}}
                        aria-hidden="true"
                      >
                        {isOpen ? (
                          <FiMinus className="h-4 w-4" />
                        ) : (
                          <FiPlus className="h-4 w-4" />
                        )}
                      </span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        {/* Indented to line up with the title (icon width + gap) */}
                        <p className="pb-6 pl-[3.75rem] pr-4 text-sm leading-relaxed text-gray-600 sm:pb-7 sm:pl-[4.25rem] sm:text-base">
                          {item.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyCoreValues;
