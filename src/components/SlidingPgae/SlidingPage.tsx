import React from "react";
import { motion } from "framer-motion";
import {
  Zap,
  MapPin,
  ShieldCheck,
  Headphones,
  Tag,
  Handshake,
  Bike,
  PackageCheck,
} from "lucide-react";

interface Quality {
  title: string;
  icon: React.ReactNode;
  badgeBg: string;
  badgeColor: string;
}

const qualitiesData: Quality[] = [
  {
    title: "Lightning Speed Dispatch",
    icon: <Zap size={18} />,
    badgeBg: "#FFE8E5",
    badgeColor: "#FF3B30",
  },
  {
    title: "Live GPS Tracking",
    icon: <MapPin size={18} />,
    badgeBg: "#EAE5FF",
    badgeColor: "#6E56CF",
  },
  {
    title: "100% Secure Handling",
    badgeBg: "#FFF3E0",
    badgeColor: "#FF9500",
    icon: <ShieldCheck size={18} />,
  },
  {
    title: "24/7 Local Support",
    icon: <Headphones size={18} />,
    badgeBg: "#E3F2FD",
    badgeColor: "#007AFF",
  },
  {
    title: "Fair & Transparent Rates",
    icon: <Tag size={18} />,
    badgeBg: "#FCE4EC",
    badgeColor: "#E91E63",
  },
  {
    title: "Verified Dispatch Riders",
    icon: <Handshake size={18} />,
    badgeBg: "#E0F2F1",
    badgeColor: "#009688",
  },
  {
    title: "Wide Fleet Coverage",
    icon: <Bike size={18} />,
    badgeBg: "#F3E5F5",
    badgeColor: "#9C27B0",
  },
  {
    title: "Instant Delivery Proof",
    icon: <PackageCheck size={18} />,
    badgeBg: "#E8F5E9",
    badgeColor: "#34C759",
  },
];

const QualitiesSection: React.FC = () => {
  // Triple loop array for seamless infinite marquee scrolling
  const loopItems = [...qualitiesData, ...qualitiesData, ...qualitiesData];

  return (
    <section className="relative overflow-hidden bg-[#FFF5F5] font-sans border-b border-red-100/60">
      {/* CONTINUOUS MARQUEE SLIDER */}
      <div className="relative flex overflow-hidden py-4">
        {/* Soft Fade Edges for Smooth In/Out Effect */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-30 w-16 md:w-48 bg-gradient-to-r from-white via-white/80 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-30 w-16 md:w-48 bg-gradient-to-l from-white via-white/80 to-transparent" />

        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-33.333%" }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
          className="flex gap-4 md:gap-6 whitespace-nowrap px-4 items-center"
        >
          {loopItems.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{
                y: -4,
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
              className="flex-shrink-0 bg-white rounded-full px-6 py-4 border border-gray-100 flex items-center gap-4 transition-all duration-300"
            >
              {/* Colorful Scalloped Badge Icon */}
              <div
                className="flex-shrink-0 w-10 h-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                style={{
                  backgroundColor: item.badgeBg,
                  color: item.badgeColor,
                  maskImage:
                    "radial-gradient(circle 4px at calc(100% - 2px) 50%, #0000 99%, #000 100%)",
                  WebkitMaskImage:
                    "conic-gradient(from -45deg at 50% 50%, #000 0 90deg, #0000 0) 0 0/8px 8px repeat",
                }}
              >
                {item.icon}
              </div>

              {/* Title */}
              <span className="font-semibold text-gray-900 text-sm md:text-base tracking-tight">
                {item.title}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default QualitiesSection;
