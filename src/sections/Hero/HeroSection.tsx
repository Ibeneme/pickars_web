import React, { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { FaApple, FaMotorcycle, FaUserCircle, FaBox } from "react-icons/fa";
import { BiLogoPlayStore } from "react-icons/bi";
import { ComingSoonModal } from "../../components/Modals/ComingSoonModal";

const HeroSection: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  // Animation Variants
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
      {/* 1. Background Visuals */}
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
        {/* 2. Top Content: Centered Heading & Subtext */}
        <motion.div
          variants={itemVariants}
          className="mb-6 flex items-center gap-2 rounded-full border border-red-200 bg-white/50 px-4 py-2 backdrop-blur-sm"
        >
          <span className="flex h-2 w-2 animate-pulse rounded-full bg-red-600" />
          <span className="text-xs font-black uppercase tracking-widest text-red-600">
            Coming soon in Port Harcourt City
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="mb-6 text-5xl font-black leading-[0.95] tracking-tighter text-[#121212] md:text-8xl"
        >
          Get a Dispatch Rider
          <br />
          <motion.span
            animate={{
              backgroundPosition: ["0% 50%", "200% 50%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
            className="inline-block bg-gradient-to-r from-red-600 via-orange-500 to-red-600 bg-[length:200%_auto] bg-clip-text text-transparent"
          >
            Instantly.
          </motion.span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mb-10 max-w-2xl text-lg leading-relaxed text-gray-500 md:text-xl"
        >
          The smartest way to send and receive packages across the city. Fast,
          secure, and built for the{" "}
          <span className="text-[#121212] font-bold">heartbeat of PH.</span>
        </motion.p>

        {/* 3. Download Buttons */}
        <motion.div
          variants={itemVariants}
          className="mb-20 flex flex-wrap justify-center gap-4"
        >
          <button
            onClick={() => setShowModal(true)}
            className="group flex items-center gap-3 rounded-2xl bg-[#121212] px-10 py-4 text-white transition-all hover:scale-105 active:scale-95"
          >
            <FaApple
              size={28}
              className="transition-transform group-hover:rotate-12"
            />
            <div className="text-left">
              <p className="text-[10px] font-bold opacity-60">Get it on</p>
              <p className="text-lg font-black leading-none">App Store</p>
            </div>
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="group flex items-center gap-3 rounded-2xl border-2 border-gray-200 bg-white px-10 py-4 text-[#121212] transition-all hover:border-red-500 hover:scale-105 active:scale-95 "
          >
            <BiLogoPlayStore
              size={28}
              className="transition-transform group-hover:rotate-12"
            />
            <div className="text-left">
              <p className="text-[10px] font-bold opacity-60">Get it on</p>
              <p className="text-lg font-black leading-none">Play Store</p>
            </div>
          </button>
        </motion.div>

        {/* 4. Bottom Content: Centered Phone & Map Animation */}
        <motion.div
          variants={itemVariants}
          className="relative mt-12 w-full max-w-[340px] md:max-w-[400px]"
        >
          {/* Internal Phone Structure */}
          <div className="relative z-10 aspect-[9/18.5] w-full overflow-hidden rounded-[3.5rem] border-[12px] border-[#121212] bg-[#121212]">
            {/* The Animated Map View */}
            <div className="absolute inset-0 bg-[#f3f4f6]">
              {/* City Grid Background */}
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

              {/* Path and Rider */}
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
                <circle cx="200" cy="80" r="8" fill="#ef4444" />
                <circle
                  cx="200"
                  cy="80"
                  r="16"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="2"
                  className="animate-ping"
                />
              </svg>

              <motion.div
                style={{
                  offsetPath:
                    "path('M 80 650 Q 150 550, 100 400 T 250 250 T 200 80')",
                }}
                animate={{ offsetDistance: ["0%", "100%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white text-red-600  border-2 border-red-500"
              >
                <FaMotorcycle size={24} />
              </motion.div>
            </div>

            {/* App UI Elements */}
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white/90 to-transparent p-6 flex items-start justify-between">
              <div className="flex items-center gap-3 rounded-full bg-white/80 p-1 pr-4 backdrop-blur-md">
                <FaUserCircle size={30} className="text-gray-300" />
                <span className="text-xs font-black text-[#121212]">
                  John D. <span className="text-red-600">★ 5.0</span>
                </span>
              </div>
            </div>

            <div className="absolute bottom-6 left-4 right-4">
              <div className="rounded-3xl bg-[#121212] p-5 border border-white/10 ">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">
                      Estimated Time
                    </span>
                    <span className="text-xl font-black text-white">
                      4 Minutes Away
                    </span>
                  </div>
                  <div className="h-10 w-10 rounded-xl bg-red-600 flex items-center justify-center text-white">
                    <FaBox size={20} />
                  </div>
                </div>
              </div>
            </div>

            {/* Top Notch */}
            <div className="absolute top-0 left-1/2 h-7 w-36 -translate-x-1/2 rounded-b-3xl bg-[#121212]" />
          </div>

          {/* Background Glow */}
          <div className="absolute -inset-10 -z-10 rounded-full bg-red-600/10 blur-[120px]" />
        </motion.div>
      </motion.div>

      {showModal && (
        <ComingSoonModal show={showModal} onClose={() => setShowModal(false)} />
      )}
    </section>
  );
};

export default HeroSection;
