import React, { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { FaTruckFast, FaClock, FaShieldHalved } from "react-icons/fa6";

interface StatItem {
  numericValue: number;
  suffix: string;
  decimals?: number;
  label: string;
  description: string;
  icon: React.ReactNode;
}

const statsData: StatItem[] = [
  {
    numericValue: 50,
    suffix: "k+",
    label: "Deliveries",
    description: "Completed across Port Harcourt & Rivers State.",
    icon: <FaTruckFast />,
  },
  {
    numericValue: 12,
    suffix: " min",
    label: "Avg Pickup",
    description: "Average time for a rider to reach your door.",
    icon: <FaClock />,
  },
  {
    numericValue: 100,
    suffix: "%",
    label: "Safe Hands",
    description: "Every package handled with care and security.",
    icon: <FaShieldHalved />,
  },
];

// Animated Number Component that counts up when visible
const AnimatedCounter = ({
  target,
  suffix = "",
  decimals = 0,
  isInView,
}: {
  target: number;
  suffix?: string;
  decimals?: number;
  isInView: boolean;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    const duration = 2000;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setCount(easedProgress * target);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, target]);

  return (
    <span>
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
};

const StatsSection: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#FFF5F5] py-16 sm:py-24 md:py-32 font-sans border-b border-red-100/60"
    >
      {/* Background Animated Gradient Orb */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] md:h-[500px] bg-red-300 rounded-full blur-[90px] md:blur-[120px] pointer-events-none -z-0"
      />

      <div className="relative z-10 px-4 sm:px-6 max-w-7xl mx-auto">
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 md:mb-24 flex flex-col items-center">
          {/* TRACK RECORD BADGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={isInView ? { opacity: 1, scale: 1, rotate: -2 } : {}}
            whileHover={{ scale: 1.08, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="mb-4 sm:mb-6 px-5 sm:px-6 py-2 sm:py-2.5 bg-[#FF0000] text-white font-black text-[11px] sm:text-xs md:text-sm uppercase tracking-widest cursor-default select-none"
            style={{
              maskImage:
                "radial-gradient(circle 5px at calc(100% - 2.5px) 50%, #0000 99%, #000 100%)",
              WebkitMaskImage:
                "conic-gradient(from -45deg at 50% 50%, #000 0 90deg, #0000 0) 0 0/10px 10px repeat",
            }}
          >
            Track Record
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-6xl font-black leading-[1.15] tracking-tight text-gray-900"
          >
            Built for speed.{" "}
            <span className="text-[#FF0000]">Trusted every day.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 sm:mt-5 text-sm sm:text-base text-gray-600 font-medium leading-relaxed max-w-2xl px-2 sm:px-0"
          >
            From Diobu to Trans-Amadi, we move packages fast and safely across
            Port Harcourt.
          </motion.p>
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 w-full">
          {statsData.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.2 + idx * 0.1,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{
                y: -6,
                transition: { duration: 0.2, ease: "easeOut" },
              }}
              className="group relative bg-white rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 border border-red-100 flex flex-col justify-between transition-colors duration-300 hover:border-red-400 shadow-sm sm:shadow-none"
            >
              <div>
                <div className="flex items-center justify-between mb-6 sm:mb-8">
                  {/* Icon Badge */}
                  <motion.div
                    whileHover={{ rotate: 15, scale: 1.1 }}
                    className="w-12 h-12 sm:w-14 sm:h-14 bg-red-100 text-red-600 flex items-center justify-center text-lg sm:text-xl transition-transform duration-300 shrink-0"
                    style={{
                      maskImage:
                        "radial-gradient(circle 6px at calc(100% - 3px) 50%, #0000 99%, #000 100%)",
                      WebkitMaskImage:
                        "conic-gradient(from -45deg at 50% 50%, #000 0 90deg, #0000 0) 0 0/12px 12px repeat",
                    }}
                  >
                    <motion.div
                      animate={{ y: [0, -2, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      {stat.icon}
                    </motion.div>
                  </motion.div>

                  {/* Animated Number */}
                  <span className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight group-hover:text-[#FF0000] transition-colors duration-300 text-right">
                    <AnimatedCounter
                      target={stat.numericValue}
                      suffix={stat.suffix}
                      decimals={stat.decimals}
                      isInView={isInView}
                    />
                  </span>
                </div>

                <h3 className="text-xs sm:text-sm font-black text-[#FF0000] uppercase tracking-wider">
                  {stat.label}
                </h3>
              </div>

              <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-600 font-normal leading-relaxed">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
