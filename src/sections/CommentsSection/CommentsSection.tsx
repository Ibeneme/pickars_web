import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaInstagram,
  FaFacebookF,
  FaTiktok,
  FaXTwitter,
  FaQuoteLeft,
  // // FaBoxArchive,
  // // FaTruckFast,
  // // FaUsers,
} from "react-icons/fa6";

// --- Types & Data ---
interface Comment {
  name: string;
  text: string;
  icon: React.ReactNode;
  bg: string;
  color: string;
}

const row1Data: Comment[] = [
  {
    name: "Aishat R.",
    text: "Fastest delivery I've ever used in Lagos. My package arrived in under 2 hours!",
    icon: <FaInstagram />,
    bg: "#E1306C",
    color: "#fff",
  },
  {
    name: "Tunde O.",
    text: "The real-time tracking is a game changer for my small business. Highly recommended.",
    icon: <FaXTwitter />,
    bg: "#000",
    color: "#fff",
  },
  {
    name: "Chidi E.",
    text: "Affordable rates and very professional riders. 10/10 service.",
    icon: <FaFacebookF />,
    bg: "#1877F2",
    color: "#fff",
  },
];

const row2Data: Comment[] = [
  {
    name: "Blessing W.",
    text: "I love how easy it is to schedule a pickup. Makes my life so much easier!",
    icon: <FaTiktok />,
    bg: "#000",
    color: "#fff",
  },
  {
    name: "Sarah K.",
    text: "Reliable and safe. I never have to worry about my fragile items getting damaged.",
    icon: <FaInstagram />,
    bg: "#E1306C",
    color: "#fff",
  },
  {
    name: "Ibrahim M.",
    text: "Finally, a logistics company that actually respects delivery timelines.",
    icon: <FaXTwitter />,
    bg: "#000",
    color: "#fff",
  },
];

// --- Sub-components ---

// const StatCard = ({
//   icon: Icon,
//   label,
//   value,
// }: {
//   icon: any;
//   label: string;
//   value: string;
// }) => (
//   <div className="flex flex-col items-center p-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
//     <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-2xl text-2xl">
//       <Icon />
//     </div>
//     <span className="text-3xl font-black text-gray-900">{value}</span>
//     <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">
//       {label}
//     </span>
//   </div>
// );

const TickerRow = ({
  items,
  direction = "left",
}: {
  items: Comment[];
  direction?: "left" | "right";
}) => {
  const loopItems = [...items, ...items, ...items, ...items];

  return (
    <div className="group flex overflow-hidden py-2 md:py-4">
      <motion.div
        initial={{ x: direction === "left" ? 0 : "-50%" }}
        animate={{ x: direction === "left" ? "-50%" : 0 }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        className="flex gap-4 md:gap-6 whitespace-nowrap px-2"
      >
        {loopItems.map((item, idx) => (
          <div
            key={idx}
            className="relative flex w-[280px] md:w-[380px] flex-col justify-between rounded-[30px] md:rounded-[40px] border border-white bg-white/80 p-6 md:p-10 backdrop-blur-sm transition-all duration-500 hover:border-red-200 hover:shadow-[0_20px_40px_-15px_rgba(220,38,38,0.1)]"
          >
            <FaQuoteLeft className="absolute top-4 left-4 md:top-6 md:left-6 text-gray-100 text-3xl md:text-4xl -z-10" />
            <p className="whitespace-normal text-sm md:text-[15px] font-medium leading-relaxed text-gray-700">
              {item.text}
            </p>
            <div className="mt-6 md:mt-8 flex items-center justify-between border-t border-gray-50 pt-4 md:pt-6">
              <div className="flex flex-col">
                <span className="text-[11px] md:text-[13px] font-black uppercase tracking-tighter text-gray-900">
                  {item.name}
                </span>
                <span className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Verified User
                </span>
              </div>
              <motion.div
                whileHover={{ rotate: 360 }}
                className="flex h-9 w-9 md:h-11 md:w-11 items-center justify-center rounded-xl md:rounded-2xl shadow-sm"
                style={{ backgroundColor: item.bg, color: item.color }}
              >
                {item.icon}
              </motion.div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

// --- Main Section ---

const CommentsSection: React.FC = () => {
  const [count, setCount] = useState(150);
  const target = 6349;

  useEffect(() => {
    let startTime: number;
    const duration = 2500;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easedProgress * (target - 150) + 150));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#fafafa] py-20 md:py-32 font-sans">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(220,38,38,0.05)_0%,_transparent_70%)] pointer-events-none" />

      {/* 1. Header Section */}
      <div className="relative z-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-red-600 font-black text-[10px] md:text-sm uppercase tracking-[0.3em]"
          >
            Wall of Love
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mt-4 text-5xl md:text-8xl font-black leading-[1.1] tracking-tighter text-gray-900"
          >
            Dispatched over <br />
            <span className="bg-gradient-to-r from-red-600 via-orange-500 to-red-600 bg-[length:200%_auto] animate-gradient-x bg-clip-text text-transparent">
              {count.toLocaleString()}+
            </span>{" "}
            packages!
          </motion.h2>
        </div>
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <StatCard
            icon={FaBoxArchive}
            label="Deliveries Monthly"
            value="500+"
          />
          <StatCard icon={FaTruckFast} label="Average Time" value="45min" />
          <StatCard icon={FaUsers} label="Active Riders" value="15+" />
        </div>
     */}{" "}
      </div>

      {/* 3. Ticker Section */}
      <div className="relative flex flex-col gap-4 md:gap-6">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-30 w-12 md:w-40 bg-gradient-to-r from-[#fafafa] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-30 w-12 md:w-40 bg-gradient-to-l from-[#fafafa] to-transparent" />

        <TickerRow items={row1Data} direction="left" />
        <TickerRow items={row2Data} direction="right" />
      </div>

      {/* 4. Footer & CTA (New Section) */}
      <div className="mt-12 md:mt-24 text-center px-6 max-w-2xl mx-auto">
        <p className="text-gray-400 font-bold text-[10px] md:text-sm tracking-widest uppercase mb-8">
          Trusted by thousands of businesses
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gray-900 text-white px-8 py-4 rounded-full font-black uppercase text-xs md:text-sm tracking-widest shadow-xl shadow-gray-200"
        >
          Ship Your First Package Now
        </motion.button>
      </div>
    </section>
  );
};

export default CommentsSection;
