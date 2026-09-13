import React, { useState } from "react";
import { motion, useScroll, useSpring, type Variants } from "framer-motion";
import { FiSearch, FiTruck, FiClock } from "react-icons/fi";
import PortHarcourtMapComponent from "../../sections/HowItWorksSection/PortHarcourtMapComponent";

const TrackingPageMain: React.FC = () => {
  const [trackingId, setTrackingId] = useState("");
  const [showComingSoon, setShowComingSoon] = useState(false);

  // Top scroll progress spring animation
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim()) return;
    setShowComingSoon(true);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 18,
      },
    },
  };

  return (
    <section className="relative flex flex-col min-h-screen w-full bg-white text-gray-900 overflow-hidden">
      {/* Top Scroll Progress Bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed inset-x-0 top-0 z-50 h-1.5 origin-left bg-[#ff0000]"
      />

      {/* Main Flex Column Container */}
      <div className="flex flex-col w-full items-center pt-48 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex w-full flex-col items-center text-center"
          >
            {/* Major Header Items in a Flex Column */}
            <div className="flex w-full flex-col items-center">
              {/* Ticket-style Badge */}
              <motion.div
                variants={itemVariants}
                className="mb-6 inline-block cursor-default select-none bg-[#ff0000] px-5 py-2 text-[11px] font-black uppercase tracking-widest text-white sm:text-xs"
                style={{
                  maskImage:
                    "radial-gradient(circle 5px at calc(100% - 2.5px) 50%, #0000 99%, #000 100%)",
                  WebkitMaskImage:
                    "conic-gradient(from -45deg at 50% 50%, #000 0 90deg, #0000 0) 0 0/10px 10px repeat",
                }}
              >
                REAL-TIME LOGISTICS
              </motion.div>

              {/* Heading */}
              <motion.h1
                variants={itemVariants}
                className="text-4xl font-black leading-none tracking-tight text-gray-900 sm:text-6xl md:text-6xl"
              >
                Track your <span className="text-[#ff0000]">Delivery</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={itemVariants}
                className="mt-4 max-w-lg text-base font-medium text-gray-500 sm:text-lg"
              >
                Enter your tracking ID for live updates and rider location.
              </motion.p>

              {/* Search Input Bar */}
              <motion.form
                variants={itemVariants}
                onSubmit={handleSearch}
                className="mt-10 flex w-full max-w-2xl items-center gap-2 rounded-full border border-gray-200 bg-white p-2 transition-colors focus-within:border-gray-400 sm:p-2.5"
              >
                <div className="pl-4 text-gray-400">
                  <FiTruck className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>

                <input
                  type="text"
                  value={trackingId}
                  onChange={(e) => {
                    setTrackingId(e.target.value);
                    if (showComingSoon) setShowComingSoon(false);
                  }}
                  placeholder="Enter Tracking ID (e.g. RD-938472)"
                  className="w-full bg-transparent px-2 py-2 text-base font-medium text-gray-900 outline-none placeholder:text-gray-400 sm:text-lg"
                />

                <button
                  type="submit"
                  aria-label="Track delivery"
                  className="flex h-12 w-16 shrink-0 items-center justify-center rounded-full bg-[#ff0000] text-white transition-all hover:bg-[#32a852] active:scale-95 sm:h-14 sm:w-20 cursor-pointer"
                >
                  <FiSearch className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
              </motion.form>

              {/* Coming Soon Notice */}
              {showComingSoon ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 flex items-center gap-2 rounded-2xl border border-amber-200 bg-amber-50/50 px-5 py-3 text-sm font-semibold text-amber-800"
                >
                  <FiClock className="h-4 w-4 shrink-0 text-amber-600" />
                  <span>
                    Web tracking is <strong>Coming Soon</strong>. Please use the
                    Pickars mobile app for live updates!
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  variants={itemVariants}
                  className="mt-6 inline-flex items-center gap-2 rounded-full border border-gray-100 bg-gray-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-gray-400"
                >
                  <FiClock className="h-3.5 w-3.5" />
                  <span>Web Tracking Feature Coming Soon</span>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Map Component Container with max-width and bottom padding */}
      <div className="mx-auto w-full max-w-7xl mt-auto px-4 pb-20 sm:px-6 lg:px-8">
        <PortHarcourtMapComponent />
      </div>
    </section>
  );
};

export default TrackingPageMain;
