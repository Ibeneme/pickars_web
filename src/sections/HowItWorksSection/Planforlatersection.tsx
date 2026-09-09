import React, { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

// Constants provided for App download buttons
export const IOS_URL = "https://apps.apple.com/ng/app/pickars/id6746796884";
export const ANDROID_URL =
  "https://play.google.com/store/apps/details?id=com.pickars.app&hl=en";

const NeverLateBanner: React.FC = () => {
  const [seconds, setSeconds] = useState(new Date().getSeconds());
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => (prev + 1) % 60);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const secondDegrees = seconds * 6;

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-[#FFF5F5] py-12 px-6 md:px-12 font-['Lufga'] text-[#111111]"
    >
      {/* Background ambient red glow accents */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-red-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-red-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Container: Single Vertical Flex Column */}
      <div className="max-w-[1000px] mx-auto flex flex-col items-center text-center gap-16 relative z-10">
        {/* Top Section: Copy and Custom Download Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full flex flex-col items-center text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            whileHover={{ scale: 1.08, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="mb-4 sm:mb-6 px-5 sm:px-6 py-2 sm:py-2.5 bg-[#FF0000] text-white font-black text-[11px] sm:text-xs md:text-sm uppercase tracking-widest cursor-default select-none shadow-lg shadow-red-600/25"
            style={{
              maskImage:
                "radial-gradient(circle 5px at calc(100% - 2.5px) 50%, #0000 99%, #000 100%)",
              WebkitMaskImage:
                "conic-gradient(from -45deg at 50% 50%, #000 0 90deg, #0000 0) 0 0/10px 10px repeat",
            }}
          >
            Express Delivery Guarantee
          </motion.div>

          <h2 className="text-5xl sm:text-6xl md:text-8xl font-black leading-[1.15] tracking-tight text-gray-900">
            Your package can{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-rose-600">
              never be late
            </span>{" "}
          </h2>

          <p className="text-gray-700 text-lg sm:text-xl font-normal leading-relaxed max-w-2xl mb-8">
            We value your time as much as you do. Backed by real-time route
            tracking and an elite network of riders across Port Harcourt and
            beyond, your deliveries always arrive right on schedule.
          </p>

          {/* DOWNLOAD BUTTONS */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-2 flex flex-row items-center justify-center gap-4 w-full"
          >
            {/* App Store Button - Fit content, forced slightly longer */}
            <a
              href={IOS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-auto min-w-[170px] px-5 py-3.5 bg-black hover:bg-[#ff0000] text-white rounded-2xl hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center space-x-3 group "
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

            {/* Google Play Button - Fit content */}
            <a
              href={ANDROID_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-auto px-5 py-3.5 bg-black hover:bg-[#ff0000] text-white rounded-2xl hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center space-x-3 group "
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
                <p className="text-base font-black leading-tight">Play Store</p>
              </div>
            </a>
          </motion.div>
        </motion.div>

        {/* Bottom Section: Centered Tilted Larger Watch Graphic */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="w-full flex items-center justify-center mt-6"
        >
          {/* Added transform rotate to tilt the watch element */}
          <div className="relative w-full max-w-[420px] h-[520px] flex flex-col items-center justify-center overflow-hidden group rotate-12">
            <div className="relative z-10 flex flex-col items-center justify-center my-auto">
              <div className="relative w-64 h-64 rounded-full bg-gray-900 border-4 border-red-600/40 flex items-center justify-center shadow-2xl">
                {/* Top Extended Watch Strap */}
                <div className="absolute -top-32 w-28 h-36 bg-[#3d2314] rounded-t-2xl border-t border-x border-white/20 flex flex-col items-center pt-3 shadow-inner">
                  <div className="w-10 h-5 bg-gray-300 rounded-sm border border-gray-500" />
                </div>

                {/* Bottom Extended Watch Strap */}
                <div className="absolute -bottom-32 w-28 h-36 bg-[#3d2314] rounded-b-2xl border-b border-x border-white/20 flex flex-col items-center justify-end pb-3 shadow-inner">
                  <div className="w-5 h-16 bg-white/10 rounded-full" />
                </div>

                {/* Clock Face Ticks */}
                <div className="absolute inset-3 rounded-full border border-white/10 pointer-events-none">
                  <span className="absolute top-2 left-1/2 -translate-x-1/2 w-1.5 h-4 bg-red-500 rounded-full" />
                  <span className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-4 bg-white/40 rounded-full" />
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-1.5 bg-white/40 rounded-full" />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-1.5 bg-white/40 rounded-full" />
                </div>

                {/* Hour Hand */}
                <div className="absolute w-2 h-16 bg-white rounded-full origin-bottom bottom-1/2 left-[calc(50%-4px)] rotate-45 transition-transform" />

                {/* Minute Hand */}
                <div className="absolute w-1.5 h-22 bg-gray-300 rounded-full origin-bottom bottom-1/2 left-[calc(50%-3px)] -rotate-12 transition-transform" />

                {/* Live Second Hand */}
                <div
                  className="absolute w-0.5 h-24 bg-red-500 rounded-full origin-bottom bottom-1/2 left-[calc(50%-1px)] transition-transform duration-300"
                  style={{ transform: `rotate(${secondDegrees}deg)` }}
                />

                {/* Center Pin */}
                <div className="w-4 h-4 rounded-full bg-red-600 border-2 border-white z-20 shadow-md" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NeverLateBanner;
