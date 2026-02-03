import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  FiMapPin,
  FiRepeat,
  FiNavigation,
  FiCalendar,
  FiCreditCard,
  FiShield,
  FiMessageSquare,
  FiHeadphones,
  FiSmartphone,
  FiLayers,
} from "react-icons/fi";

interface FeatureItem {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  size: "small" | "large";
}

const appFeatures: FeatureItem[] = [
  {
    id: "feat1",
    icon: FiMapPin,
    title: "Effortless Booking",
    description:
      "Book a dispatch rider in just a few taps. Our intuitive interface allows you to set pickup locations quickly.",
    size: "small",
  },
  {
    id: "feat2",
    icon: FiRepeat,
    title: "Multi-Stop Logic",
    description:
      "Optimize your logistics by sending packages to multiple destinations in a single booking. Save time and fuel with smart routing.",
    size: "large",
  },
  {
    id: "feat3",
    icon: FiNavigation,
    title: "Real-Time Tracking",
    description:
      "See your rider's exact location on the map with live GPS updates and precise arrival estimates.",
    size: "small",
  },
  {
    id: "feat4",
    icon: FiCalendar,
    title: "Scheduled Dispatch",
    description:
      "Plan ahead by scheduling deliveries for a future date. Perfect for recurring business needs.",
    size: "small",
  },
  {
    id: "feat10",
    icon: FiLayers,
    title: "Transparent Pricing",
    description:
      "Know your costs upfront. Get instant fare estimates before confirming—no hidden charges, no surprises.",
    size: "large",
  },
  {
    id: "feat6",
    icon: FiShield,
    title: "Secure & Insured",
    description:
      "Verified riders and basic insurance on every trip. Your package safety is our non-negotiable priority.",
    size: "small",
  },
  {
    id: "feat7",
    icon: FiMessageSquare,
    title: "In-App Chat",
    description:
      "Communicate directly with your rider via secure chat or masked calls without leaving the app.",
    size: "small",
  },
  {
    id: "feat5",
    icon: FiCreditCard,
    title: "Flexible Payments",
    description:
      "Cards, bank transfers, or our secure in-app wallet. Pickars supports your preferred way to pay.",
    size: "small",
  },
];

const AppFeatures: React.FC = () => {
  // 1. Implementation of the Scroll Progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="min-h-screen pt-[180px] bg-[#FAFAFA] font-['Lufga'] py-24 px-6 relative">
      {/* --- GLOBAL TOP SCROLLER --- */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[120] h-1.5 bg-red-600 origin-left"
        style={{ scaleX }}
      />

      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <header className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs font-black uppercase tracking-[0.4em] text-red-600 mb-4 block">
              Engineered for Efficiency
            </span>
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-[#121212] leading-[0.85]">
              Powerful <span className="text-gray-200">Features.</span>
            </h1>
            <p className="mt-8 text-gray-500 text-xl max-w-2xl mx-auto leading-relaxed font-medium">
              Experience the next generation of logistics with tools designed to
              keep your business moving 24/7.
            </p>
          </motion.div>
        </header>

        {/* Bento Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[340px]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {appFeatures.map((feature) => (
            <motion.div
              key={feature.id}
              variants={{
                hidden: { opacity: 0, scale: 0.95 },
                visible: { opacity: 1, scale: 1 },
              }}
              className={`group relative overflow-hidden bg-white border border-gray-100 p-10 rounded-[45px] transition-all duration-700 hover:shadow-[0_40px_100px_-20px_rgba(239,68,68,0.15)] ${
                feature.size === "large" ? "md:col-span-2" : "col-span-1"
              }`}
            >
              {/* Icon Container */}
              <div className="mb-8 h-16 w-16 rounded-2xl bg-[#121212] text-white flex items-center justify-center text-3xl group-hover:bg-red-600 group-hover:rotate-[15deg] group-hover:scale-110 transition-all duration-500 shadow-xl">
                <feature.icon />
              </div>

              {/* Text Content */}
              <div className="relative z-10">
                <h3 className="text-3xl font-black mb-4 text-[#121212] tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed font-medium group-hover:text-gray-600 transition-colors">
                  {feature.description}
                </p>
              </div>

              {/* Ghost Icon Background */}
              <div className="absolute -right-10 -bottom-10 text-gray-100 opacity-5 transition-all duration-700 group-hover:text-red-600 group-hover:opacity-10 group-hover:-rotate-12 group-hover:scale-125">
                <feature.icon size={220} />
              </div>
            </motion.div>
          ))}

          {/* CTA Bento Card */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="col-span-1 md:col-span-2 lg:col-span-1 bg-[#ff0000] rounded-[45px] p-10 flex flex-col justify-between text-white shadow-2xl shadow-red-200"
          >
            <div>
              <div className="h-14 w-14 rounded-full bg-white/10 flex items-center justify-center mb-6 backdrop-blur-md">
                <FiSmartphone size={28} />
              </div>
              <h3 className="text-3xl font-black tracking-tight mb-4">
                Ready to <br />
                ship now?
              </h3>
              <p className="text-red-100 font-medium">
                Join thousands moving items with Pickars today.
              </p>
            </div>
            <button className="bg-white text-[#ff0000] w-full py-5 rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-[#121212] hover:text-white transition-all transform active:scale-95">
              Download App
            </button>
          </motion.div>
        </motion.div>

        {/* Support Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-28 text-center"
        >
          <div className="inline-flex flex-col md:flex-row items-center gap-6 px-10 py-6 bg-white border border-gray-100 rounded-[30px] shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
              <FiHeadphones className="text-red-600 text-xl" />
            </div>
            <span className="text-gray-600 font-bold">
              Need a custom solution for your business?
            </span>
            <a
              href="mailto:support@pickars.com"
              className="bg-[#121212] px-6 py-3 rounded-xl text-white font-black hover:bg-red-600 transition-all text-sm"
            >
              Talk to us
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AppFeatures;
