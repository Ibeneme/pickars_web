import React from "react";
import { motion } from "framer-motion";
import {
  FiZap,
  FiMapPin,
  FiShield,
  FiTarget,
  FiClock,
  FiHeadphones,
  FiArrowUpRight,
} from "react-icons/fi";

const services = [
  {
    title: "Easy to Use",
    icon: <FiZap />,
    description:
      "Navigate through scheduling in just a few taps. No complicated forms—just a seamless experience.",
    size: "md", // Standard card
  },
  {
    title: "Multiple Locations",
    icon: <FiMapPin />,
    description:
      "Save time by sending packages to multiple addresses in one go. Add points and custom instructions.",
    size: "lg", // Larger feature card
  },
  {
    title: "Secure & Reliable",
    icon: <FiShield />,
    description:
      "Handled by verified riders with end-to-end tracking and insurance.",
    size: "md",
  },
  {
    title: "Real-Time Tracking",
    icon: <FiTarget />,
    description:
      "See exactly where your rider is with transparent, accurate arrival updates.",
    size: "md",
  },
  {
    title: "Fast & Efficient",
    icon: <FiClock />,
    description:
      "Smart routing and local dispatchers cut down delays. We move at the speed of your life.",
    size: "md",
  },
  {
    title: "24/7 Support",
    icon: <FiHeadphones />,
    description:
      "Our friendly team is always ready to assist via chat, email, or phone.",
    size: "md",
  },
];

const FeatureGrid: React.FC = () => {
  return (
    <section className="bg-[#f8f8f8] px-6 py-24 font-['Lufga'] md:py-40">
      <div className="mx-auto max-w-7xl">
        {/* Header - Center Aligned for a fresh feel */}
        <div className="mb-20 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-sm font-black uppercase tracking-[0.4em] text-red-600"
          >
            Our Capabilities
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mt-6 text-5xl font-black tracking-tighter text-[#121212] md:text-7xl"
          >
            Delivery Redefined.
          </motion.h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-500">
            We've stripped away the complexity of logistics to give you a suite
            of tools that just work.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {services.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`group relative flex flex-col justify-between overflow-hidden rounded-[40px] border border-gray-200 bg-white p-10 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(0,0,0,0.05)] ${
                item.size === "lg" ? "md:col-span-2" : "md:col-span-1"
              }`}
            >
              <div>
                <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-2xl text-red-600 transition-colors group-hover:bg-red-600 group-hover:text-white">
                  {item.icon}
                </div>
                <h3 className="mb-4 text-2xl font-black text-[#121212] md:text-3xl">
                  {item.title}
                </h3>
                <p className="text-gray-500 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Interaction Hint */}
              <div className="mt-10 flex items-center gap-2 text-sm font-bold text-red-600 opacity-0 transition-opacity group-hover:opacity-100">
                Learn more <FiArrowUpRight />
              </div>

              {/* Subtle background decoration */}
              <div className="absolute -bottom-4 -right-4 text-9xl font-black text-gray-50 opacity-[0.03] transition-all group-hover:scale-110 group-hover:text-red-600 group-hover:opacity-[0.05]">
                {index + 1}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Brand Statement Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 flex flex-col items-center justify-between border-t border-gray-200 pt-10 md:flex-row"
        >
          <p className="text-sm font-medium text-gray-400">
            © 2024 Pickars Logistics Technology
          </p>
          <div className="mt-4 flex gap-8 md:mt-0">
            <a
              href="#"
              className="text-sm font-bold text-[#121212] hover:text-red-600"
            >
              Reliability
            </a>
            <a
              href="#"
              className="text-sm font-bold text-[#121212] hover:text-red-600"
            >
              Security
            </a>
            <a
              href="#"
              className="text-sm font-bold text-[#121212] hover:text-red-600"
            >
              Speed
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureGrid;
