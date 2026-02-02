import React from "react";
import { motion } from "framer-motion";

const SlidingPage: React.FC = () => {
  const values = [
    "FAST & RELIABLE DELIVERIES",
    "TRUSTED DISPATCH RIDERS",
    "AFFORDABLE RATES",
    "SAFE & SECURE PACKAGES",
    "REAL-TIME TRACKING",
    "24/7 CUSTOMER SUPPORT",
    "ECO-FRIENDLY TRANSPORTATION",
    "ON-DEMAND SERVICE",
    "CITYWIDE COVERAGE",
    "SEAMLESS APP EXPERIENCE",
  ];

  // Doubling the array for a seamless loop
  const doubleValues = [...values, ...values];

  return (
    <div className="relative z-20  w-full overflow-hidden bg-[#ffffff]">
      {/* Skewed Container to create a "Dynamic" slant  rotate-[-2deg] scale-[1.02] */}
      <div className="flex  items-center bg-[#ff0000] py-3  md:py-5">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{
            duration: 40, // Adjust for speed
            ease: "linear",
            repeat: Infinity,
          }}
          className="flex whitespace-nowrap"
        >
          {doubleValues.map((sentence, idx) => (
            <div key={idx} className="flex items-center px-6 md:px-12">
              <span className="font-['Lufga'] text-sm font-black italic tracking-widest text-white md:text-xl">
                {sentence}
              </span>

              {/* Animated Separator - A white diamond */}
              <motion.div
                animate={{ rotate: [0, 90, 180, 270, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="ml-12 h-2 w-2 bg-white md:h-3 md:w-3"
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Decorative Shadow Overlay for Depth */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10" />
    </div>
  );
};

export default SlidingPage;
