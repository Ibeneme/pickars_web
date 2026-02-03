import React from "react";
import { motion } from "framer-motion";
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
  size: "small" | "large"; // For the bento layout
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
  return (
    <div className="min-h-screen pt-[180px] bg-[#FAFAFA] font-['Lufga'] py-24 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <header className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-xs font-black uppercase tracking-[0.4em] text-red-600 mb-4 block">
              Engineered for Efficiency
            </span>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-[#121212] leading-tight">
              Powerful <span className="text-gray-300">Features.</span>
            </h1>
            <p className="mt-6 text-gray-500 text-xl max-w-2xl mx-auto leading-relaxed">
              Experience the next generation of logistics with tools designed to
              keep your business moving 24/7.
            </p>
          </motion.div>
        </header>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[300px]">
          {appFeatures.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`group relative overflow-hidden bg-white border border-gray-100 p-10 rounded-[45px] hover:border-red-600/20 hover:shadow-2xl hover:shadow-red-600/5 transition-all duration-500 ${
                feature.size === "large" ? "md:col-span-2" : "col-span-1"
              }`}
            >
              {/* Icon Container */}
              <div className="mb-8 h-16 w-16 rounded-2xl bg-[#121212] text-white flex items-center justify-center text-3xl group-hover:bg-red-600 group-hover:scale-110 transition-all duration-500">
                <feature.icon />
              </div>

              {/* Text */}
              <h3 className="text-2xl font-black mb-4 text-[#121212] tracking-tight">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                {feature.description}
              </p>

              {/* Aesthetic Background Element */}
              <div className="absolute -right-8 -bottom-8 text-gray-50 opacity-[0.03] group-hover:text-red-600 group-hover:opacity-[0.05] transition-all duration-700">
                <feature.icon size={180} />
              </div>
            </motion.div>
          ))}

          {/* Special "Coming Soon" CTA Card */}
          <motion.div
            className="col-span-1 md:col-span-2 lg:col-span-1 bg-red-600 rounded-[45px] p-10 flex flex-col justify-between text-white"
            whileHover={{ y: -5 }}
          >
            <div>
              <FiSmartphone size={40} className="mb-6" />
              <h3 className="text-2xl font-black tracking-tight mb-2">
                Ready to ship?
              </h3>
              <p className="text-red-100 text-sm opacity-80">
                Join thousands of Nigerians moving items with Pickars today.
              </p>
            </div>
            <button className="bg-white text-red-600 w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-[#121212] hover:text-white transition-all">
              Download App
            </button>
          </motion.div>
        </div>

        {/* Footer Support CTA */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-6 px-8 py-4 bg-white border border-gray-100 rounded-full ">
            <FiHeadphones className="text-red-600 text-xl" />
            <span className="text-gray-500 font-medium">
              Need a custom feature for your business?
            </span>
            <a
              href="mailto:support@pickars.com"
              className="text-red-600 font-black hover:underline underline-offset-4 transition-all"
            >
              Talk to us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppFeatures;
