import React, { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { FiShield, FiZap, FiHeadphones, FiCompass } from "react-icons/fi";
import DownloadButtons from "../../components/buttons/DownloadButtons";

interface ValueCardData {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const CompanyCoreValues: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const values: ValueCardData[] = [
    {
      icon: <FiZap className="h-5 w-5 sm:h-6 sm:w-6" />,
      title: "Fast & Reliable",
      description:
        "No long waiting times. We match you with nearby riders so your items get delivered quickly and on time, every time.",
    },
    {
      icon: <FiShield className="h-5 w-5 sm:h-6 sm:w-6" />,
      title: "Safe & Secure",
      description:
        "Your package is in good hands. We work only with trusted, verified riders who make sure your items arrive damage-free.",
    },
    {
      icon: <FiHeadphones className="h-5 w-5 sm:h-6 sm:w-6" />,
      title: "24/7 Helpful Support",
      description:
        "Have a question or run into an issue? Our friendly support team is always available to help you out immediately.",
    },
    {
      icon: <FiCompass className="h-5 w-5 sm:h-6 sm:w-6" />,
      title: "Live GPS Tracking",
      description:
        "Know exactly where your package is. Follow your rider's journey on the map in real time from pickup to delivery.",
    },
  ];

  const headerVariant: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#fff] pb-24 pt-12 font-['Lufga']"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={headerVariant}
          className="flex flex-col items-center text-center max-w-2xl mx-auto mb-12 sm:mb-16"
        >
          <div
            className="mb-4 px-5 py-2 bg-[#FF0000] text-white font-black text-[11px] sm:text-xs uppercase tracking-widest cursor-default select-none"
            style={{
              maskImage:
                "radial-gradient(circle 5px at calc(100% - 2.5px) 50%, #0000 99%, #000 100%)",
              WebkitMaskImage:
                "conic-gradient(from -45deg at 50% 50%, #000 0 90deg, #0000 0) 0 0/10px 10px repeat",
            }}
          >
            OUR CORE VALUES
          </div>

          <h2 className="mb-5 text-4xl font-black leading-[1.05] tracking-tight text-gray-900 sm:text-6xl md:text-6xl lg:text-6xl">
            Igniting and driving the ultimate{" "}
            <span style={{ color: "#ff0000" }}>goal</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 font-medium">
            The core values that keep Pickars moving forward for Port
            Harcourt,What keeps Pickars moving: the values behind every
            delivery.
          </p>

          <div style={{ marginTop: 16 }}>
            <DownloadButtons />
          </div>
        </motion.div>

        {/* Values Grid */}
        <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
          {values.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.2 + idx * 0.1,
                type: "spring",
                stiffness: 100,
              }}
              className="relative overflow-hidden bg-white rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 border border-red-100 flex flex-col justify-between"
            >
              {/* Overflowing Background Arrows Pattern */}
              <div
                className="absolute inset-y-0 -left-10 -right-10 flex items-center justify-around pointer-events-none select-none overflow-hidden text-red-600 font-black text-6xl sm:text-7xl opacity-[0.04] tracking-widest uppercase whitespace-nowrap rotate-[-6deg]"
                aria-hidden="true"
              >
                <span>→ ← → ← → ← → ←</span>
              </div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6 sm:mb-8">
                  {/* Jagged Icon Badge */}
                  <div
                    className="w-12 h-12 sm:w-14 sm:h-14 bg-[#ff0000] text-[#fff] flex items-center justify-center shrink-0"
                    style={{
                      maskImage:
                        "radial-gradient(circle 6px at calc(100% - 3px) 50%, #0000 99%, #000 100%)",
                      WebkitMaskImage:
                        "conic-gradient(from -45deg at 50% 50%, #000 0 90deg, #0000 0) 0 0/12px 12px repeat",
                    }}
                  >
                    <motion.div
                      animate={{ y: [0, -2, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      {stat.icon}
                    </motion.div>
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-black text-gray-900 tracking-tight">
                  {stat.title}
                </h3>
              </div>

              <p className="relative z-10 mt-3 sm:mt-4 text-xs sm:text-sm text-gray-600 font-normal leading-relaxed">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
