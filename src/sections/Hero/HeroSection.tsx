import React from "react";
import { motion, type Variants } from "framer-motion";
import { FaApple } from "react-icons/fa";
import { BiLogoPlayStore } from "react-icons/bi";
import sendVideo from "../../assets/send.mp4";

export const IOS_URL = "https://apps.apple.com/ng/app/pickars/id6746796884";
export const ANDROID_URL =
  "https://play.google.com/store/apps/details?id=com.pickars.app&hl=en";

const HeroSection: React.FC = () => {
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
    <section className="relative isolate flex flex-col items-center justify-center overflow-hidden px-6 pt-32 pb-20 font-['Lufga'] md:pt-48 min-h-screen bg-black">
      {/* Full-bleed video background */}
      <div className="absolute inset-0 -z-30 overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute h-full w-full object-cover object-center"
        >
          <source src={sendVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-black/60 via-black/45 to-black/55" />

      {/* Subtle red glow accent */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(239,68,68,0.18)_0%,_transparent_85%)]" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="z-10 flex w-full max-w-5xl flex-col items-center text-center"
      >
        <motion.div
          variants={itemVariants}
          className="mb-6 flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md"
        >
          <span className="flex h-2 w-2 animate-pulse rounded-full bg-red-500" />
          <span className="text-xs font-black uppercase tracking-widest text-white">
            Live in Port Harcourt City
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="mb-6 text-5xl font-black leading-[0.95] tracking-tighter text-white md:text-8xl"
        >
          Get a Dispatch Rider
          <br />
          <motion.span
            animate={{ backgroundPosition: ["0% 50%", "200% 50%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="inline-block bg-gradient-to-r from-red-400 via-orange-400 to-red-400 bg-[length:200%_auto] bg-clip-text text-transparent"
          >
            Instantly.
          </motion.span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mb-10 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl"
        >
          The smartest way to send and receive packages across Port Harcourt. Fast, secure,
          and built for you{" "}
      
        </motion.p>

        {/* Download Buttons */}
        <motion.div
          variants={itemVariants}
          className="mb-20 flex flex-wrap justify-center gap-4"
        >
          <a
            href={IOS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 rounded-2xl bg-white px-10 py-4 text-[#121212] transition-all hover:scale-105 active:scale-95"
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
            className="group flex items-center gap-3 rounded-2xl border-2 border-white/30 bg-white/10 px-10 py-4 text-white backdrop-blur-sm transition-all hover:border-red-400 hover:bg-white/15 hover:scale-105 active:scale-95"
          >
            <BiLogoPlayStore
              size={28}
              className="transition-transform group-hover:rotate-12"
            />
            <div className="text-left">
              <p className="text-[10px] font-bold opacity-70">Get it on</p>
              <p className="text-lg font-black leading-none">Google Play</p>
            </div>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
