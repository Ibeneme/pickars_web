import React from "react";
import { motion, useInView } from "framer-motion";
import PortHarcourtMapComponent from "./PortHarcourtMapComponent";
// Constants provided for App download buttons
export const IOS_URL = "https://apps.apple.com/ng/app/pickars/id6746796884";
export const ANDROID_URL =
  "https://play.google.com/store/apps/details?id=com.pickars.app&hl=en";

  
const PackageDeliverySection: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#FFF5F5] py-16 sm:py-24 md:py-32 font-['Lufga'] text-gray-900"
    >
      <div className="relative z-10 px-4 sm:px-6 max-w-7xl mx-auto">
        {/* ── HEADER ─────────────────────────────────────────────────────── */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16 md:mb-20 flex flex-col items-center">
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
            Pickars Logistics • PH
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-8xl font-black leading-[1.15] tracking-tight text-gray-900"
          >
            Send packages starting at{" "}
            <span className="relative inline-block text-[#FF0000]">
              ₦3,000
              {/* Paper corner fold effect */}
              <span
                aria-hidden
                className="absolute -bottom-1 -right-1 w-3 h-3 bg-red-700 transform rotate-45 pointer-events-none opacity-40"
              />
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 sm:mt-5 text-[16px] sm:text-[20px] text-gray-600 font-medium leading-relaxed max-w-2xl px-2 sm:px-0"
          >
            Whether you run a busy online store or just need to drop a package
            across town, Pickars connects you with a verified rider in minutes.
          </motion.p>

          {/* ── DOWNLOAD BUTTONS ────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-2 flex flex-col sm:flex-row items-center justify-center gap-4 w-full"
          >
            {/* App Store Button (Forced longer on mobile using min-w, fit-content on sm+) */}
            <a
              href={IOS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto min-w-[185px] px-6 py-3.5 bg-black hover:bg-[#ff0000] text-white rounded-2xl hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center space-x-3 group shadow-md"
            >
              <svg
                className="w-7 h-7 fill-current shrink-0"
                viewBox="0 0 384 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 52.3-12 69.5-34.3z" />
              </svg>
              <div className="text-left">
                <p className="text-[10px] uppercase font-bold text-gray-300 leading-none">
                  Download on the
                </p>
                <p className="text-base font-black leading-tight">App Store</p>
              </div>
            </a>

            {/* Google Play Button */}
            <a
              href={ANDROID_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 bg-black hover:bg-[#ff0000] text-white rounded-2xl hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center space-x-3 group shadow-md"
            >
              <svg
                className="w-7 h-7 fill-current shrink-0"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l220.7-221.3 60.1 60.1L104.6 499z" />
              </svg>
              <div className="text-left">
                <p className="text-[10px] uppercase font-bold text-gray-300 leading-none">
                  Get it on
                </p>
                <p className="text-base font-black leading-tight">
                  Google Play
                </p>
              </div>
            </a>
          </motion.div>
        </div>

        {/* ── MAP CONTAINER ──────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.35 }}
        >
          <PortHarcourtMapComponent />
        </motion.div>
      </div>
    </section>
  );
};

export default PackageDeliverySection;
