import React from "react";
import { motion } from "framer-motion";

const LoadingScreen: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#fafafa] font-['Lufga']"
    >
      {/* Background Glow to match Hero */}
      <div className="absolute top-0 -z-10 h-full w-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-100/40 via-transparent to-transparent" />

      <div className="relative flex flex-col items-center">
        {/* Animated Logo Placeholder / Icon */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [1, 0.8, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-[#121212] shadow-2xl shadow-red-200"
        >
          {/* Replace with your actual SVG logo */}
          <div className="h-8 w-8 rounded-full border-4 border-t-red-600 border-white/20 animate-spin" />
        </motion.div>

        {/* Brand Text */}
        <motion.h2
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-2xl font-black tracking-tighter text-[#121212]"
        >
          PICKARS <span className="text-red-600 ml-1">COURIER</span>
        </motion.h2>

        {/* Minimal Progress Bar */}
        <div className="mt-6 h-[2px] w-48 overflow-hidden rounded-full bg-gray-200">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut",
            }}
            className="h-full w-full bg-gradient-to-r from-transparent via-red-600 to-transparent"
          />
        </div>

        <p className="mt-4 text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">
          Setting up your delivery...
        </p>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
