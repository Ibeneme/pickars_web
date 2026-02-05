import React, { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { FaApple, FaMotorcycle, FaUserCircle, FaBox } from "react-icons/fa";
import { BiLogoPlayStore } from "react-icons/bi";
import { ComingSoonModal } from "../../components/Modals/ComingSoonModal";

const HeroSection: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  // Stagger container
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.5 },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 90, damping: 16 },
    },
  };

  // Premium floating phone (gentle, multi-axis, breathing)
  const phoneFloatVariants: Variants = {
    float: {
      y: [-14, 14, -14],
      rotateX: [-2, 2, -2],
      rotateY: [-3, 3, -3],
      scale: [1, 1.02, 1],
      transition: {
        duration: 8.5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    },
  };

  // Beautiful curved delivery path
  const path =
    "M 100 680 Q 120 520, 200 440 Q 280 360, 260 220 Q 240 120, 200 70";

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

        <motion.div
          variants={phoneFloatVariants}
          animate="float"
          className="relative mt-12 w-full max-w-[380px] sm:max-w-[400px] md:max-w-[440px]"
        >
          {/* Phone frame */}
          <div className="relative z-10 aspect-[9/19] w-full overflow-hidden rounded-[3.2rem] border-[16px] border-black bg-black ">
            {/* Map background */}
            <div className="relative h-full w-full bg-gray-50 overflow-hidden">
              {/* Light grid */}
              <svg
                className="absolute inset-0 h-full w-full opacity-10"
                viewBox="0 0 400 800"
              >
                <path
                  d="M0 100 H400 M0 300 H400 M0 500 H400 M0 700 H400"
                  stroke="#000"
                  strokeWidth="1"
                />
                <path
                  d="M100 0 V800 M200 0 V800 M300 0 V800"
                  stroke="#000"
                  strokeWidth="1"
                />
              </svg>

              {/* Route path */}
              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 400 800"
              >
                <defs>
                  <linearGradient
                    id="routeGrad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#dc2626" stopOpacity="0.4" />
                    <stop offset="50%" stopColor="#dc2626" stopOpacity="1" />
                    <stop offset="100%" stopColor="#f97316" stopOpacity="0.8" />
                  </linearGradient>
                </defs>

                {/* Main route - draws once then pulses */}
                <motion.path
                  d={path}
                  fill="none"
                  stroke="url(#routeGrad)"
                  strokeWidth="12"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    pathLength: { duration: 3, ease: "easeOut", delay: 0.8 },
                  }}
                />

                {/* Subtle glow behind path */}
                <motion.path
                  d={path}
                  fill="none"
                  stroke="#dc2626"
                  strokeWidth="20"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1, opacity: [0.15, 0.35, 0.15] }}
                  transition={{
                    pathLength: { duration: 3, ease: "easeOut", delay: 0.8 },
                    opacity: {
                      duration: 4,
                      repeat: Infinity,
                      repeatType: "reverse",
                    },
                  }}
                />

                {/* Destination pulse */}
                <motion.circle
                  cx="200"
                  cy="70"
                  r="12"
                  fill="#dc2626"
                  animate={{ scale: [1, 1.4, 1], opacity: [0.9, 0.4, 0.9] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </svg>

              {/* Rider following path + bounce */}
              <motion.div
                style={{
                  offsetPath: `path('${path}')`,
                  offsetRotate: "auto",
                }}
                animate={{
                  offsetDistance: ["0%", "100%"],
                  scale: [1, 1.08, 1],
                  y: [0, -6, 0],
                }}
                transition={{
                  offsetDistance: {
                    duration: 4.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatDelay: 1.5,
                  },
                  scale: {
                    duration: 1.2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  },
                  y: { duration: 0.8, repeat: Infinity, repeatType: "reverse" },
                }}
                className="absolute left-0 top-0 z-30 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white  border-4 border-red-600"
              >
                <FaMotorcycle className="text-red-600" size={32} />
              </motion.div>
            </div>

            {/* Top bar (rider profile) */}
            <motion.div
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.9, type: "spring" }}
              className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white/95 to-transparent px-6 pt-5 flex items-center justify-between"
            >
              <div className="flex items-center gap-3 rounded-full bg-white/90 px-4 py-2  backdrop-blur-md">
                <FaUserCircle size={38} className="text-gray-400" />
                <div className="text-sm font-black">
                  Chidi O. <span className="text-red-600">• 4.9</span>
                </div>
              </div>
            </motion.div>

            {/* Bottom delivery info card */}
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.9, duration: 1, type: "spring" }}
              className="absolute bottom-8 left-6 right-6"
            >
              <div className="rounded-3xl bg-black/95 p-6 border border-white/10  backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="block text-xs font-extrabold uppercase tracking-widest text-red-400">
                      Arriving
                    </span>
                    <span className="text-3xl font-black text-white">
                      2–3 min
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: [0, -15, 15, 0], scale: [1, 1.15, 1] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-red-600 to-orange-500 text-white "
                  >
                    <FaBox size={28} />
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* iPhone-style notch */}
            <div className="absolute top-0 left-1/2 h-8 w-44 -translate-x-1/2 rounded-b-3xl bg-black" />
          </div>

          {/* Outer glow + breathing */}
          <motion.div
            animate={{
              opacity: [0.2, 0.45, 0.2],
              scale: [0.95, 1.15, 0.95],
            }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 -z-10 rounded-[4.5rem] bg-gradient-to-br from-red-500/40 via-orange-400/30 to-transparent blur-3xl"
          />
        </motion.div>
      </motion.div>

      {showModal && (
        <ComingSoonModal show={showModal} onClose={() => setShowModal(false)} />
      )}
    </section>
  );
};

export default HeroSection;
