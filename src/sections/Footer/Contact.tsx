import React from "react";
import { motion, type Variants } from "framer-motion";
import DownloadButtons from "../../components/buttons/DownloadButtons";

function DeliveryRider() {
  return (
    <g>
      <ellipse cx="70" cy="58" rx="46" ry="10" fill="#1f1f1f" opacity="0.18" />
      <circle
        cx="22"
        cy="45"
        r="9"
        fill="#1f1f1f"
        stroke="#1f1f1f"
        strokeWidth="1.5"
      />
      <circle
        cx="118"
        cy="45"
        r="9"
        fill="#1f1f1f"
        stroke="#1f1f1f"
        strokeWidth="1.5"
      />
      <rect
        x="18"
        y="40"
        width="104"
        height="10"
        rx="5"
        fill="#2b2b2b"
        stroke="#000"
        strokeWidth="1.5"
      />
      <g>
        <rect
          x="24"
          y="27"
          width="30"
          height="34"
          rx="7"
          fill="#e11d2e"
          stroke="#e11d2e"
          strokeWidth="2"
        />
        <path
          d="M 41 34 L 33 47 L 39 47 L 37 55 L 46 41 L 40 41 Z"
          fill="#ffffff"
        />
      </g>
      <ellipse
        cx="66"
        cy="45"
        rx="21"
        ry="15"
        fill="#111111"
        stroke="#111111"
        strokeWidth="1.5"
      />
      <path
        d="M 72 38 Q 95 30 112 32"
        stroke="#111111"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 72 52 Q 95 60 112 58"
        stroke="#111111"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      <circle
        cx="112"
        cy="32"
        r="5"
        fill="#111111"
        stroke="#111111"
        strokeWidth="1.5"
      />
      <circle
        cx="112"
        cy="58"
        r="5"
        fill="#111111"
        stroke="#111111"
        strokeWidth="1.5"
      />
      <circle
        cx="80"
        cy="45"
        r="12"
        fill="#e11d2e"
        stroke="#e11d2e"
        strokeWidth="2"
      />
      <circle cx="86" cy="45" r="6" fill="#e11d2e" opacity="0.85" />
      <g opacity="0.55">
        <line
          x1="-4"
          y1="38"
          x2="10"
          y2="38"
          stroke="#ff0000"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="-10"
          y1="45"
          x2="6"
          y2="45"
          stroke="#ff0000"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="-4"
          y1="52"
          x2="10"
          y2="52"
          stroke="#ff0000"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>
    </g>
  );
}

const AppDownloadCTA: React.FC = () => {
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

  const isDesktop = typeof window !== "undefined" && window.innerWidth >= 768;

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <section className="relative mx-auto mt-8 mb-16 w-full max-w-7xl overflow-hidden rounded-3xl bg-[#ff0000] font-['Lufga'] text-white sm:mt-12  lg:mt-16 shadow-2xl">
        {/* ========== VISIBLE DELIVERY BACKGROUND ANIMATIONS ========== */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* 1. Subtle Background Glowing Gradients */}
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-black/10 blur-5xl"
          />

          {/* 2. Enhanced Animated Road (Borders Removed) */}
          <div className="absolute bottom-0 left-0 z-0 w-full h-20 sm:h-24 bg-black/40 overflow-hidden">
            {/* Moving Center Lane Markings */}
            <motion.div
              animate={{ x: ["-50%", "0%"] }}
              transition={{
                duration: isDesktop ? 3 : 1.5,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute top-1/2 left-0 -translate-y-1/2 flex space-x-12 sm:space-x-16 w-[200%]"
            >
              {Array.from({ length: 30 }).map((_, i) => (
                <div
                  key={i}
                  className="w-12 sm:w-16 h-1.5 sm:h-2 bg-white/70 rounded-full shrink-0"
                />
              ))}
            </motion.div>
          </div>

          {/* 3. Animated Delivery Riders Crossing the Road */}
          <motion.div
            animate={{ x: ["-100px", "100vw"] }}
            transition={{
              duration: isDesktop ? 11 : 6,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute bottom-2 sm:bottom-3 z-10 scale-75 sm:scale-100 opacity-95"
          >
            <DeliveryRider />
          </motion.div>

          <motion.div
            animate={{ x: ["-100px", "100vw"] }}
            transition={{
              duration: isDesktop ? 7.5 : 4.2,
              repeat: Infinity,
              ease: "linear",
              delay: isDesktop ? 3.5 : 2.2,
            }}
            className="absolute bottom-8 sm:bottom-11 z-10 scale-60 sm:scale-75 opacity-90"
          >
            <DeliveryRider />
          </motion.div>

          {/* 4. Floating Abstract Logistics Elements */}
          <motion.div
            animate={{ y: [0, -35, 0], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-[15%] top-[20%] w-10 h-10 rounded-xl bg-black/20 border border-white/20 shadow-lg"
          />

          <motion.div
            animate={{ y: [0, 30, 0], opacity: [0.2, 0.6, 0.2] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute right-[20%] top-[25%] w-8 h-8 rounded-full border-2 border-white/30 bg-white/10"
          />

          <motion.div
            animate={{
              y: [0, -25, 0],
              x: [0, 15, 0],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="absolute left-[65%] top-[40%] w-6 h-6 rounded-lg bg-black/20 border border-white/15"
          />

          {/* Spark dots */}
          <motion.div
            animate={{ y: [0, -50, 0], opacity: [0.3, 0.9, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-[35%] top-[30%] h-2.5 w-2.5 rounded-full bg-white/70"
          />
          <motion.div
            animate={{ y: [0, 40, 0], opacity: [0.2, 0.8, 0.2] }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5,
            }}
            className="absolute right-[35%] top-[18%] h-2 w-2 rounded-full bg-white/60"
          />
        </div>
        {/* ========== END BACKGROUND ANIMATIONS ========== */}

        <div className="relative z-20 mx-auto flex max-w-7xl flex-col items-center justify-center px-4 pt-16 pb-28 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex w-full max-w-4xl flex-col items-center text-center"
          >
            {/* Ticket-style Badge */}
            <motion.div
              variants={itemVariants}
              className="mb-6 inline-block cursor-default select-none bg-black px-5 py-2 text-[11px] font-black uppercase tracking-widest text-white sm:text-xs shadow-md"
              style={{
                maskImage:
                  "radial-gradient(circle 5px at calc(100% - 2.5px) 50%, #0000 99%, #000 100%)",
                WebkitMaskImage:
                  "conic-gradient(from -45deg at 50% 50%, #000 0 90deg, #0000 0) 0 0/10px 10px repeat",
              }}
            >
              GET STARTED TODAY
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-6xl md:text-6xl drop-shadow-sm"
            >
              Download the app <br className="hidden sm:inline" /> to get
              started.
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-2xl text-base font-medium leading-relaxed text-white/90 sm:text-xl"
            >
              Book deliveries in seconds, track your dispatch rider in real
              time, and enjoy seamless package pickups right from your phone.
            </motion.p>

            {/* Download Buttons CTA */}
            <motion.div variants={itemVariants} className="mt-10">
              <DownloadButtons dark={true} />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AppDownloadCTA;
