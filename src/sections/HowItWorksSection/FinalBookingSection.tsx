import React, { useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  FaTruckFast,
  FaClock,
  FaShieldHalved,
  // FaStar,
  // FaUserCheck,
} from "react-icons/fa6";
import phoneImage from "../../assets/images/grup.png";

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
    description: "Successfully landed across Rivers State.",
    icon: <FaTruckFast />,
  },
  {
    numericValue: 12,
    suffix: "m",
    label: "Pickup",
    description: "Our average time to reach your doorstep.",
    icon: <FaClock />,
  },
  {
    numericValue: 100,
    suffix: "%",
    label: "Security",
    description: "Military-grade handling for every item.",
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
  const { scrollYProgress } = useScroll();
  const backgroundTextX = useTransform(scrollYProgress, [0.8, 1], [100, -100]);

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
          {/* RESTYLED TRACK RECORD BADGE */}
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
            Built for speed, trusted for{" "}
            <span className="text-[#FF0000]">reliability</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 sm:mt-5 text-sm sm:text-base text-gray-600 font-medium leading-relaxed max-w-2xl px-2 sm:px-0"
          >
            From Diobu market goods to Trans-Amadi gear, we keep packages moving
            fast—giving your local business good wings and going strong across
            PH!
          </motion.p>
        </div>

        {/* STATS LAYOUT: Fully Responsive Flex/Grid System */}
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
                  {/* Scalloped Starburst Badge */}
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

      <section className="relative mt-12 sm:mt-16 overflow-hidden bg-[#000] font-sans max-w-7xl mx-auto rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[3rem] py-12 sm:py-16 md:py-24 px-5 sm:px-8 md:px-12 mx-4 sm:mx-6 lg:mx-auto">
        {/* Pattern Backgrounds */}
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-20 items-center">
            {/* LEFT SIDE - Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-white text-left"
            >
              <h2 className="text-4xl sm:text-6xl md:text-8xl font-black leading-[0.95] md:leading-[0.85] tracking-tighter">
                {/* Get Your Packages{" "}
                <span className="text-white/30">Packages</span>{" "} */}
              Get Your Packages Dispatched.
              </h2>

              <div className="mt-2 sm:mt-8 md:mt-12 space-y-4 sm:space-y-6">
                <p className="text-lg sm:text-xl md:text-2xl  max-w-md text-[#ffffff85]">
                  Experience the fastest dispatch network in Port Harcourt.
                </p>


              </div>
            </motion.div>

            {/* RIGHT SIDE - Request Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative flex items-center justify-center lg:justify-end w-full"
            >
              <div className="relative w-full max-w-[280px] sm:max-w-[320px] group perspective-[1000px]">
                {/* CSS Mockup Frame for the Image */}
                <motion.div
                  whileHover={{ rotateY: -5, rotateX: 5, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative z-10 overflow-visible"
                >
                  {/* The Actual Image */}
                  <img
                    src={phoneImage}
                    alt="Dispatch App Preview"
                    className="w-full h-auto object-cover rounded-[1.5rem] sm:rounded-[2rem] bg-black shadow-2xl"
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* BACKGROUND TEXT - Responsive sizing */}
        <motion.div
          style={{ x: backgroundTextX }}
          className="absolute -bottom-6 sm:-bottom-10 md:-bottom-20 left-0 text-[6rem] sm:text-[10rem] md:text-[20rem] font-black text-white/[0.08] sm:text-white/[0.11] whitespace-nowrap select-none pointer-events-none"
        >
          PICKARS
        </motion.div>
      </section>
    </section>
  );
};

export default StatsSection;
