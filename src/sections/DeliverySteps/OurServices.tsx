import React, { useRef } from "react";
import { motion } from "framer-motion";
import {
  FiChevronsLeft,
  FiChevronsRight,
  FiZap,
  FiMapPin,
  FiShield,
  FiTarget,
  FiClock,
  FiHeadphones,
} from "react-icons/fi";

interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const services: Service[] = [
  {
    title: "Easy to Use",
    icon: <FiZap />,
    description:
      "Navigate through scheduling in just a few taps. No complicated forms—just a seamless, intuitive experience from start to finish.",
  },
  {
    title: "Multiple Locations",
    icon: <FiMapPin />,
    description:
      "Save time by sending packages to multiple addresses in one go. Add points, arrange stops, and include custom instructions.",
  },
  {
    title: "Secure & Reliable",
    icon: <FiShield />,
    description:
      "Handled by verified riders with end-to-end tracking and insurance. Rest easy knowing your items are in safe hands.",
  },
  {
    title: "Real-Time Tracking",
    icon: <FiTarget />,
    description:
      "Our live tracking system allows you to see exactly where your rider is with transparent, accurate arrival updates.",
  },
  {
    title: "Fast & Efficient",
    icon: <FiClock />,
    description:
      "Smart routing and local dispatchers cut down delays. We move at the speed of your life while keeping costs reasonable.",
  },
  {
    title: "Dedicated Support",
    icon: <FiHeadphones />,
    description:
      "Our friendly team is always ready to assist via chat, email, or phone. We're here for you 24/7.",
  },
];

const ServicesSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = 400;
      containerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="bg-[#0c0c0c] px-6 py-24 text-white md:py-40 font-['Lufga'] overflow-hidden">
      <div className="mx-auto max-w-[1400px]">
        {/* Your Original Header - Styled Beautifully */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-[900px] text-[3.2rem] font-black leading-[1.05] tracking-tighter md:text-[4.7rem]"
          >
            Where Every Delivery <br />
            <span className="bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
              Becomes an Experience.
            </span>
          </motion.h2>

          {/* Minimalist Scroll Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => scroll("left")}
              className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/5 bg-white/5 transition-all hover:bg-red-600 hover:border-red-600"
            >
              <FiChevronsLeft size={24} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/5 bg-white/5 transition-all hover:bg-red-600 hover:border-red-600"
            >
              <FiChevronsRight size={24} />
            </button>
          </div>
        </div>

        {/* Scrollable Container */}
        <div
          className="no-scrollbar flex gap-6 overflow-x-auto pb-10"
          ref={containerRef}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative min-w-[320px] md:min-w-[400px] rounded-[40px] border border-white/5 bg-[#121212] md:p-10 p-8 transition-all hover:border-red-600/30"
            >
              {/* Subtle Icon Box */}
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 text-2xl text-red-600 transition-all group-hover:bg-red-600 group-hover:text-white group-hover:scale-110">
                {service.icon}
              </div>

              {/* Text Content */}
              <h3 className="mb-4 text-2xl font-bold tracking-tight md:text-3xl transition-colors group-hover:text-red-500">
                {service.title}
              </h3>

              <p className="text-base leading-relaxed text-gray-400 md:text-lg">
                {service.description}
              </p>

              {/* Decorative Number */}
              <span className="absolute bottom-10 right-10 text-6xl font-black text-white/[0.02] transition-colors group-hover:text-red-600/[0.05]">
                0{index + 1}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Bottom Detail Line */}
        <div className="mt-4 h-[1px] w-full bg-gradient-to-r from-red-600/50 to-transparent" />
      </div>
    </section>
  );
};

export default ServicesSection;
