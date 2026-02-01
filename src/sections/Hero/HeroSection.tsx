import React, { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { FaApple } from "react-icons/fa";
import { BiLogoPlayStore } from "react-icons/bi";
import heroImage1 from "../../assets/images/driver/driverc.jpg";
import { ComingSoonModal } from "../../components/Modals/ComingSoonModal";

const HeroSection: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  // Type-safe Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  };

  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden bg-[#fafafa] px-6 pt-32 md:pt-[180px] font-['Lufga']">
      {/* Background Glow Decor */}
      <div className="absolute top-0 -z-10 h-[500px] w-full bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-red-100/50 via-transparent to-transparent" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="z-10 flex max-w-[900px] flex-col items-center text-center"
      >
        {/* Refactored Location Badge with Glassmorphism */}
        <motion.div
          variants={itemVariants}
          className="mb-6 flex items-center gap-2 rounded-full border border-red-200 bg-white/40 px-4 py-1.5 backdrop-blur-md shadow-sm"
        >
          <span className="flex h-2 w-2 animate-pulse rounded-full bg-red-600" />
          <span className="text-[12px] font-bold uppercase tracking-widest text-red-600">
            Live in Port Harcourt
          </span>
        </motion.div>

        {/* High-Impact Heading */}
        <motion.h1
          variants={itemVariants}
          className="mb-6 text-5xl font-black leading-[1.1] tracking-tighter text-[#121212] md:text-8xl"
        >
          Send Packages. <br />
          <span className="bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
            Instantly.
          </span>
        </motion.h1>

        {/* Refactored Subtext */}
        <motion.p
          variants={itemVariants}
          className="mb-10 max-w-[550px] text-lg leading-relaxed text-gray-500 md:text-xl"
        >
          The smartest way to send and receive packages. Fast, secure, and built
          for the heartbeat of PH City.
        </motion.p>

        {/* Premium Store Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-4"
        >
          {[
            { icon: <FaApple />, small: "Download on", big: "App Store" },
            {
              icon: <BiLogoPlayStore />,
              small: "Get it on",
              big: "Google Play",
            },
          ].map((btn, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowModal(true)}
              className="group flex items-center gap-3 rounded-2xl bg-[#121212] px-6 py-3 text-white shadow-xl transition-all hover:bg-black hover:shadow-red-200/50"
            >
              <span className="text-3xl transition-transform group-hover:rotate-12">
                {btn.icon}
              </span>
              <div className="flex flex-col text-left">
                <span className="text-[10px] opacity-70">{btn.small}</span>
                <span className="text-base font-bold leading-none">
                  {btn.big}
                </span>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Hero Image with Tilt & Float */}
        <motion.div
          variants={itemVariants}
          animate={{
            y: [0, -20, 0],
            rotateZ: [0, 1, 0],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative mt-16 perspective-1000"
        >
          <div className="absolute -inset-4 rounded-[40px] bg-gradient-to-b from-red-500/20 to-transparent blur-3xl" />
          <img
            src={heroImage1}
            alt="App Interface"
            className="relative z-10 block h-[500px] w-full max-w-[400px] rounded-t-[40px] border-x-[8px] border-t-[8px] border-[#121212] bg-[#121212] object-cover shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] md:h-[700px] md:max-w-[450px]"
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
