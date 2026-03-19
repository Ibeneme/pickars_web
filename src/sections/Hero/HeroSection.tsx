import React from "react";
import { motion, type Variants } from "framer-motion";
import { FaApple, FaMotorcycle } from "react-icons/fa";
import { BiLogoPlayStore } from "react-icons/bi";

export const IOS_URL = "https://apps.apple.com/ng/app/pickars/id6746796884";
export const ANDROID_URL =
  "https://play.google.com/store/apps/details?id=com.pickars.app&hl=en";

const HeroSection: React.FC = () => {
  // Your Store Links

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden bg-[#fafafa] px-6 pt-32 pb-20 font-['Lufga'] md:pt-48">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 h-[1000px] w-full -translate-x-1/2 bg-[radial-gradient(circle_at_top,_#fee2e2_0%,_transparent_60%)] opacity-40" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(#000 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="z-10 flex w-full max-w-5xl flex-col items-center text-center"
      >
        <motion.div
          variants={itemVariants}
          className="mb-6 flex items-center gap-2 rounded-full border border-red-200 bg-white/50 px-4 py-2 backdrop-blur-sm"
        >
          <span className="flex h-2 w-2 animate-pulse rounded-full bg-red-600" />
          <span className="text-xs font-black uppercase tracking-widest text-red-600">
            Live in Port Harcourt City
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="mb-6 text-5xl font-black leading-[0.95] tracking-tighter text-[#121212] md:text-8xl"
        >
          Get a Dispatch Rider
          <br />
          <motion.span
            animate={{ backgroundPosition: ["0% 50%", "200% 50%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="inline-block bg-gradient-to-r from-red-600 via-orange-500 to-red-600 bg-[length:200%_auto] bg-clip-text text-transparent"
          >
            Instantly.
          </motion.span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mb-10 max-w-2xl text-lg leading-relaxed text-gray-500 md:text-xl"
        >
          The smartest way to send and receive packages across PH. Fast, secure,
          and built for the{" "}
          <span className="text-[#121212] font-bold">Garden City.</span>
        </motion.p>

        {/* Updated Download Buttons with Links */}
        <motion.div
          variants={itemVariants}
          className="mb-20 flex flex-wrap justify-center gap-4"
        >
          <a
            href={IOS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 rounded-2xl bg-[#121212] px-10 py-4 text-white transition-all hover:scale-105 active:scale-95"
          >
            <FaApple
              size={28}
              className="transition-transform group-hover:rotate-12"
            />
            <div className="text-left">
              <p className="text-[10px] font-bold opacity-60">
                Download on the
              </p>
              <p className="text-lg font-black leading-none">App Store</p>
            </div>
          </a>

          <a
            href={ANDROID_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 rounded-2xl border-2 border-gray-200 bg-white px-10 py-4 text-[#121212] transition-all hover:border-red-500 hover:scale-105 active:scale-95"
          >
            <BiLogoPlayStore
              size={28}
              className="transition-transform group-hover:rotate-12"
            />
            <div className="text-left">
              <p className="text-[10px] font-bold opacity-60">Get it on</p>
              <p className="text-lg font-black leading-none">Google Play</p>
            </div>
          </a>
        </motion.div>

        {/* Phone Animation remains the same */}
        <motion.div
          variants={itemVariants}
          className="relative mt-12 w-full max-w-[340px] md:max-w-[400px]"
        >
          <div className="relative z-10 aspect-[9/18.5] w-full overflow-hidden rounded-[3.5rem] border-[12px] border-[#121212] bg-[#121212]">
            <div className="absolute inset-0 bg-[#f3f4f6]">
              {/* Map SVG Logic... */}
              <svg
                className="absolute inset-0 h-full w-full opacity-20"
                viewBox="0 0 400 800"
              >
                <path
                  d="M0 100 H400 M0 250 H400 M0 400 H400 M0 550 H400 M0 700 H400"
                  stroke="#000"
                  strokeWidth="1"
                  fill="none"
                />
                <path
                  d="M100 0 V800 M250 0 V800 M350 0 V800"
                  stroke="#000"
                  strokeWidth="1"
                  fill="none"
                />
              </svg>
              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 400 800"
              >
                <motion.path
                  d="M 80 650 Q 150 550, 100 400 T 250 250 T 200 80"
                  fill="transparent"
                  stroke="#ef4444"
                  strokeWidth="8"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
              </svg>
              <motion.div
                style={{
                  offsetPath:
                    "path('M 80 650 Q 150 550, 100 400 T 250 250 T 200 80')",
                }}
                animate={{ offsetDistance: ["0%", "100%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white text-red-600 border-2 border-red-500"
              >
                <FaMotorcycle size={24} />
              </motion.div>
            </div>
            <div className="absolute top-0 left-1/2 h-7 w-36 -translate-x-1/2 rounded-b-3xl bg-[#121212]" />
          </div>
          <div className="absolute -inset-10 -z-10 rounded-full bg-red-600/10 blur-[120px]" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
