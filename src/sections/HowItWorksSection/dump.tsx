import React, { useEffect, useState, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  FaTruckFast,
  FaClock,
  FaShieldHalved,
  FaStar,
  FaUserCheck,
  FaBolt,
  FaMotorcycle,
} from "react-icons/fa6";
import phoneImage from "../../assets/images/grup.png"; // Adjust path if needed
import { CheckCircle } from "lucide-react";

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
    numericValue: 1000,
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
  {
    numericValue: 4.9,
    suffix: "",
    decimals: 1,
    label: "Rating",
    description: "The highest rated dispatch in the city.",
    icon: <FaStar />,
  },
  {
    numericValue: 200,
    suffix: "+",
    label: "Active Riders",
    description: "Verified dispatchers on standby 24/7.",
    icon: <FaUserCheck />,
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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Scroll logic for the background marquee text
  const { scrollYProgress } = useScroll();
  const backgroundTextX = useTransform(scrollYProgress, [0.5, 1], [0, -200]);

  // Separate stats for the 3-top, 2-bottom web layout
  const topStats = statsData.slice(0, 3);
  const bottomStats = statsData.slice(3, 5);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#FAFAFA] py-24 md:py-32 font-sans border-b border-gray-100"
    >
      <div className="relative z-10 px-6 max-w-7xl mx-auto">
        {/* SECTION HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-20 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="mb-6 px-4 py-1.5 bg-rose-50 border border-rose-100 text-rose-600 font-bold text-xs uppercase tracking-widest rounded-full"
          >
            Track Record
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-gray-900"
          >
            Built for speed, trusted for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-red-600">
              reliability
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-base text-gray-500 font-medium leading-relaxed max-w-lg"
          >
            From Diobu market goods to Trans-Amadi gear, we keep packages moving
            fast—giving your local business good wings and going strong across
            PH!
          </motion.p>
        </div>

        {/* STATS LAYOUT */}
        <div className="flex flex-col gap-6 lg:gap-8 relative z-10">
          {/* TOP ROW: 3 Items on Web */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex gap-6 lg:gap-8 w-full">
            {topStats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.2 + idx * 0.1,
                }}
                className="group relative bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-400 ease-out hover:-translate-y-2 border border-gray-100 flex-1 flex flex-col justify-between overflow-hidden"
              >
                <div>
                  <div className="flex items-center justify-between mb-8 relative z-10">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-14 h-14 bg-gradient-to-br from-rose-100 to-rose-50 text-rose-600 flex items-center justify-center text-2xl rounded-2xl shadow-sm"
                    >
                      {stat.icon}
                    </motion.div>
                    <span className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight group-hover:text-rose-600 transition-colors duration-300">
                      <AnimatedCounter
                        target={stat.numericValue}
                        suffix={stat.suffix}
                        decimals={stat.decimals}
                        isInView={isInView}
                      />
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 relative z-10">
                    {stat.label}
                  </h3>
                </div>
                <p className="text-sm text-gray-500 font-medium leading-relaxed relative z-10">
                  {stat.description}
                </p>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-rose-50/50 rounded-full blur-2xl group-hover:bg-rose-100/50 transition-colors duration-500 pointer-events-none" />
              </motion.div>
            ))}
          </div>

          {/* BOTTOM ROW: 2 Items Centered on Web */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:max-w-4xl lg:mx-auto gap-6 lg:gap-8 w-full">
            {bottomStats.map((stat, idx) => (
              <motion.div
                key={idx + 3}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.2 + (idx + 3) * 0.1,
                }}
                className="group relative bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-400 ease-out hover:-translate-y-2 border border-gray-100 flex-1 flex flex-col justify-between overflow-hidden"
              >
                <div>
                  <div className="flex items-center justify-between mb-8 relative z-10">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-14 h-14 bg-gradient-to-br from-rose-100 to-rose-50 text-rose-600 flex items-center justify-center text-2xl rounded-2xl shadow-sm"
                    >
                      {stat.icon}
                    </motion.div>
                    <span className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight group-hover:text-rose-600 transition-colors duration-300">
                      <AnimatedCounter
                        target={stat.numericValue}
                        suffix={stat.suffix}
                        decimals={stat.decimals}
                        isInView={isInView}
                      />
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 relative z-10">
                    {stat.label}
                  </h3>
                </div>
                <p className="text-sm text-gray-500 font-medium leading-relaxed relative z-10">
                  {stat.description}
                </p>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-rose-50/50 rounded-full blur-2xl group-hover:bg-rose-100/50 transition-colors duration-500 pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* PROMO / CTA SECTION (Get Your Packages Moving) */}
        <div className="relative mt-64 overflow-hidden bg-[#0A0A0A] text-white rounded-[2.5rem] p-8 md:p-16 lg:p-20 shadow-2xl">
          {/* Subtle Grid Background */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />

          {/* Glowing Accents */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-600/20 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">
            {/* LEFT SIDE - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1]">
                Get Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600">
                  Packages
                </span>{" "}
                <br />
                Moving.
              </h2>

              <p className="text-lg text-gray-400 font-medium max-w-md">
                Experience the fastest dispatch network built for reliability
                across Port Harcourt.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 px-5 py-3 rounded-2xl text-sm font-semibold text-gray-200 shadow-inner">
                  <FaBolt className="text-yellow-400 text-lg" />
                  Ultra-Fast Dispatch
                </div>
                <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 px-5 py-3 rounded-2xl text-sm font-semibold text-gray-200 shadow-inner">
                  <CheckCircle className="text-green-400 text-lg" />
                  Verified Riders
                </div>
              </div>

              <div className="pt-6 flex items-center gap-4">
                <div className="h-[1px] w-12 bg-rose-500" />
                <p className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-gray-400">
                  Web booking coming soon
                </p>
              </div>
            </motion.div>

            {/* RIGHT SIDE - Enhanced Image Showcase */}
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

                {/* Floating Glass Widget 1 */}
                <motion.div
                  initial={{ opacity: 0, x: -30, y: 20 }}
                  whileInView={{ opacity: 1, x: -40, y: 0 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className="absolute bottom-12 -left-12 sm:-left-20 z-20 flex items-center gap-4 bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
                >
                  <div className="relative flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 border-2 border-white/20"></span>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                      Live Status
                    </p>
                    <p className="text-sm font-bold text-white">
                      Tracking Active
                    </p>
                  </div>
                </motion.div>

                {/* Floating Glass Widget 2 */}
                <motion.div
                  initial={{ opacity: 0, x: 30, y: -20 }}
                  whileInView={{ opacity: 1, x: 40, y: 0 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="absolute top-16 -right-12 sm:-right-16 z-20 flex items-center gap-4 bg-rose-600/90 backdrop-blur-xl border border-rose-400/30 p-4 rounded-2xl shadow-[0_8px_32px_rgba(225,29,72,0.4)]"
                >
                  <div className="bg-white/20 p-2 rounded-full">
                    <FaMotorcycle className="text-white text-lg" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-rose-200 uppercase tracking-wider mb-0.5">
                      ETA
                    </p>
                    <p className="text-sm font-bold text-white">2 mins away</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Marquee Text Background - Contained to the card */}
          <div className="absolute inset-x-0 bottom-0 overflow-hidden h-32 pointer-events-none rounded-b-[2.5rem]">
            <motion.div
              style={{ x: backgroundTextX }}
              className="text-[8rem] sm:text-[10rem] font-black text-white/[0.02] whitespace-nowrap leading-none mt-12"
            >
              PORT HARCOURT DISPATCH
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
