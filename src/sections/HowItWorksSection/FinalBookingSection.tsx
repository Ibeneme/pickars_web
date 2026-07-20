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
  // {
  //   numericValue: 4.9,
  //   suffix: "",
  //   decimals: 1,
  //   label: "Rating",
  //   description: "The highest rated dispatch in the city.",
  //   icon: <FaStar />,
  // },
  // {
  //   numericValue: 200,
  //   suffix: "+",
  //   label: "Active Riders",
  //   description: "Verified dispatchers on standby 24/7.",
  //   icon: <FaUserCheck />,
  // },
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

  // Separate stats for the 3-top, 2-bottom web layout
  const topStats = statsData.slice(0, 3);
  const bottomStats = statsData.slice(3, 5);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#FFF5F5] py-24 md:py-32 font-sans border-b border-red-100/60"
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
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-300 rounded-full blur-[120px] pointer-events-none -z-0"
      />

      <div className="relative z-10 px-6 max-w-7xl mx-auto">
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24 flex flex-col items-center">
          {/* RESTYLED TRACK RECORD BADGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={isInView ? { opacity: 1, scale: 1, rotate: -2 } : {}}
            whileHover={{ scale: 1.08, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="mb-6 px-6 py-2.5 bg-[#FF0000] text-white font-black text-xs md:text-sm uppercase tracking-widest cursor-default select-none"
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
            className="text-4xl md:text-6xl font-black leading-[1.15] tracking-tight text-gray-900"
          >
            Built for speed, trusted for{" "}
            <span className="text-[#FF0000]">reliability</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 text-sm md:text-base text-gray-600 font-medium leading-relaxed"
          >
            From Diobu market goods to Trans-Amadi gear, we keep packages moving
            fast—giving your local business good wings and going strong across
            PH!
          </motion.p>
        </div>

        {/* STATS LAYOUT: Mobile Grid (1-2 cols), Web Flex (Top 3, Bottom 2) */}
        <div className="flex flex-col gap-6">
          {/* TOP ROW: 3 Items on Web */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex gap-6 w-full">
            {topStats.map((stat, idx) => (
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
                  y: -8,
                  transition: { duration: 0.2, ease: "easeOut" },
                }}
                className="group relative bg-white rounded-[32px] p-8 border border-red-100 flex-1 flex flex-col justify-between transition-colors duration-300 hover:border-red-400"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    {/* Scalloped Starburst Badge */}
                    <motion.div
                      whileHover={{ rotate: 15, scale: 1.1 }}
                      className="w-14 h-14 bg-red-100 text-red-600 flex items-center justify-center text-xl transition-transform duration-300"
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
                    <span className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight group-hover:text-[#FF0000] transition-colors duration-300">
                      <AnimatedCounter
                        target={stat.numericValue}
                        suffix={stat.suffix}
                        decimals={stat.decimals}
                        isInView={isInView}
                      />
                    </span>
                  </div>

                  <h3 className="text-sm font-black text-[#FF0000] uppercase tracking-wider">
                    {stat.label}
                  </h3>
                </div>

                <p className="mt-4 text-xs md:text-sm text-gray-600 font-normal leading-relaxed">
                  {stat.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* BOTTOM ROW: 2 Items Centered on Web */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:max-w-4xl lg:mx-auto gap-6 w-full">
            {bottomStats.map((stat, idx) => (
              <motion.div
                key={idx + 3}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.2 + (idx + 3) * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.2, ease: "easeOut" },
                }}
                className="group relative bg-white rounded-[32px] p-8 border border-red-100 flex-1 flex flex-col justify-between transition-colors duration-300 hover:border-red-400"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    {/* Scalloped Starburst Badge */}
                    <motion.div
                      whileHover={{ rotate: 15, scale: 1.1 }}
                      className="w-14 h-14 bg-red-100 text-red-600 flex items-center justify-center text-xl transition-transform duration-300"
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
                    <span className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight group-hover:text-[#FF0000] transition-colors duration-300">
                      <AnimatedCounter
                        target={stat.numericValue}
                        suffix={stat.suffix}
                        decimals={stat.decimals}
                        isInView={isInView}
                      />
                    </span>
                  </div>

                  <h3 className="text-sm font-black text-[#FF0000] uppercase tracking-wider">
                    {stat.label}
                  </h3>
                </div>

                <p className="mt-4 text-xs md:text-sm text-gray-600 font-normal leading-relaxed">
                  {stat.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <section className="relative mt-16 overflow-hidden bg-[#000] font-['Lufga'] max-w-7xl mx-auto rounded-[0rem] md:rounded-[3rem]  py-16 md:py-24 px-6 md:px-12">
        {/* Pattern Backgrounds */}
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
            {/* LEFT SIDE - Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-white text-left"
            >
              <h2 className="text-6xl md:text-8xl font-black leading-[0.9] md:leading-[0.85] tracking-tighter">
                Get Your <br />
                <span className="text-white/30">Packages</span> <br />
                Moving.
              </h2>

              <div className="mt-8 md:mt-12 space-y-6">
                <p className="text-xl md:text-2xl font-bold max-w-md">
                  Experience the fastest dispatch network in Port Harcourt.
                </p>

                <div className="flex items-center justify-start gap-4">
                  <div className="hidden md:block h-[2px] w-12 bg-white" />
                  <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-white/70">
                    Web booking coming soon
                  </p>
                </div>
              </div>
            </motion.div>

            {/* RIGHT SIDE - Request Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative flex items-center justify-center lg:justify-end w-full"
            >
              <div className="relative w-full max-w-[320px] group perspective-[1000px]">
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
                    className="w-full h-auto object-cover rounded-[2rem] bg-black"
                  />
                </motion.div>


              </div>
            </motion.div>
          </div>
        </div>

        {/* BACKGROUND TEXT - Responsive sizing */}
        <motion.div
          style={{ x: backgroundTextX }}
          className="absolute -bottom-10 md:-bottom-20 left-0 text-[10rem] md:text-[20rem] font-black text-white/[0.11] whitespace-nowrap select-none pointer-events-none"
        >
         PICKARS
        </motion.div>
      </section>
    </section>
  );
};

export default StatsSection;
