import React from "react";
import { motion, type Variants } from "framer-motion";
import sendVideo from "../../assets/send.mp4";

export const IOS_URL = "https://apps.apple.com/ng/app/pickars/id6746796884";
export const ANDROID_URL =
  "https://play.google.com/store/apps/details?id=com.pickars.app&hl=en";

const HeroSection: React.FC = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 18, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 110, damping: 16 },
    },
  };

  return (
    <section className="relative isolate overflow-hidden bg-[#FFF5F5] pt-36 pb-16 font-['Lufga'] text-gray-900 md:pt-48 md:pb-24">
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center gap-12 px-4 sm:px-6 lg:gap-16">
        {/* ——— TOP: Centered bold header ——— */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex w-full flex-col items-center text-center"
        >
          {/* Ticket-style badge */}
          <motion.div
            variants={itemVariants}
            className="mb-5 px-5 py-2 bg-[#FF0000] text-white font-black text-[11px] sm:text-xs uppercase tracking-widest cursor-default select-none"
            style={{
              maskImage:
                "radial-gradient(circle 5px at calc(100% - 2.5px) 50%, #0000 99%, #000 100%)",
              WebkitMaskImage:
                "conic-gradient(from -45deg at 50% 50%, #000 0 90deg, #0000 0) 0 0/10px 10px repeat",
            }}
          >
            LOGISTICS
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="mb-5 text-5xl font-black leading-[1.05] tracking-tight text-gray-900 sm:text-6xl md:text-7xl lg:text-8xl"
          >
            A Faster Way to Move What{" "}
            <span className="relative inline-block text-[#FF0000]">
              Matters.
              <span
                aria-hidden
                className="absolute -bottom-1 -right-1 h-3 w-3 bg-red-700 opacity-40 rotate-45 pointer-events-none"
              />
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mb-9 max-w-xl text-[16px] sm:text-[19px] font-medium leading-relaxed text-gray-600"
          >
            The smartest way to send and receive packages across Port Harcourt.
            Fast, secure, and built for you.
          </motion.p>

          {/* Download buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href={IOS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-w-[170px] items-center justify-center gap-3 rounded-2xl bg-black px-5 py-3.5 text-white transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-[#FF0000]"
            >
              <svg
                className="h-7 w-7 shrink-0 fill-current"
                viewBox="0 0 384 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 52.3-12 69.5-34.3z" />
              </svg>
              <div className="text-left">
                <p className="text-[10px] font-bold uppercase leading-none text-gray-300">
                  Download on the
                </p>
                <p className="text-base font-black leading-tight">App Store</p>
              </div>
            </a>

            <a
              href={ANDROID_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 rounded-2xl bg-black px-5 py-3.5 text-white transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-[#FF0000]"
            >
              <svg
                className="h-7 w-7 shrink-0 fill-current"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l220.7-221.3 60.1 60.1L104.6 499z" />
              </svg>
              <div className="text-left">
                <p className="text-[10px] font-bold uppercase leading-none text-gray-300">
                  Get it on
                </p>
                <p className="text-base font-black leading-tight">Play Store</p>
              </div>
            </a>
          </motion.div>
        </motion.div>

        {/* ——— BOTTOM: Video ——— */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-4xl"
        >
          <div className="relative overflow-hidden rounded-[1.75rem] border-[3px] border-black bg-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="aspect-[16/10] w-full object-cover sm:aspect-[16/9]"
            >
              <source src={sendVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Floating badge */}
          <div className="absolute -bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border-2 border-black bg-white px-4 py-2 text-xs font-black text-gray-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Logistics made easy
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
