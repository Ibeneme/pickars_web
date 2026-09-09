import React from "react";
import { motion } from "framer-motion";

// 40+ real neighborhoods, areas, and key locations across Port Harcourt
const portHarcourtLocations = [
  {
    name: "GRA Phase 1",
    bg: "bg-rose-500",
    dot: "bg-rose-950",
    text: "text-white",
  },
  {
    name: "GRA Phase 2",
    bg: "bg-amber-500",
    dot: "bg-amber-950",
    text: "text-white",
  },
  {
    name: "GRA Phase 3",
    bg: "bg-emerald-500",
    dot: "bg-emerald-950",
    text: "text-white",
  },
  {
    name: "Rumuola",
    bg: "bg-sky-500",
    dot: "bg-sky-950",
    text: "text-white",
  },
  {
    name: "Woji",
    bg: "bg-orange-500",
    dot: "bg-orange-950",
    text: "text-white",
  },
  {
    name: "Peter Odili",
    bg: "bg-purple-500",
    dot: "bg-purple-950",
    text: "text-white",
  },
  {
    name: "Ada George",
    bg: "bg-teal-500",
    dot: "bg-teal-950",
    text: "text-white",
  },
  {
    name: "D-Line",
    bg: "bg-indigo-500",
    dot: "bg-indigo-950",
    text: "text-white",
  },
  {
    name: "Old GRA",
    bg: "bg-yellow-500",
    dot: "bg-yellow-950",
    text: "text-black",
  },
  {
    name: "Trans Amadi",
    bg: "bg-cyan-500",
    dot: "bg-cyan-950",
    text: "text-white",
  },
  {
    name: "Rumuomasi",
    bg: "bg-pink-500",
    dot: "bg-pink-950",
    text: "text-white",
  },
  {
    name: "Rumuokoro",
    bg: "bg-lime-500",
    dot: "bg-lime-950",
    text: "text-black",
  },
  {
    name: "Choba",
    bg: "bg-rose-600",
    dot: "bg-rose-950",
    text: "text-white",
  },
  {
    name: "Elekahia",
    bg: "bg-sky-600",
    dot: "bg-sky-950",
    text: "text-white",
  },
  {
    name: "Mgbuoba",
    bg: "bg-emerald-600",
    dot: "bg-emerald-950",
    text: "text-white",
  },
  {
    name: "Rumuigbo",
    bg: "bg-amber-600",
    dot: "bg-amber-950",
    text: "text-white",
  },
  {
    name: "Iwofe",
    bg: "bg-purple-600",
    dot: "bg-purple-950",
    text: "text-white",
  },
  {
    name: "Garrison",
    bg: "bg-orange-600",
    dot: "bg-orange-950",
    text: "text-white",
  },
  {
    name: "Abuloma",
    bg: "bg-yellow-600",
    dot: "bg-yellow-950",
    text: "text-white",
  },
  {
    name: "Borokiri",
    bg: "bg-teal-600",
    dot: "bg-teal-950",
    text: "text-white",
  },
  {
    name: "Oil Mill",
    bg: "bg-pink-600",
    dot: "bg-pink-950",
    text: "text-white",
  },
  {
    name: "Eliozu",
    bg: "bg-indigo-600",
    dot: "bg-indigo-950",
    text: "text-white",
  },
  {
    name: "Eleme Junction",
    bg: "bg-cyan-600",
    dot: "bg-cyan-950",
    text: "text-white",
  },
  {
    name: "Rumueme",
    bg: "bg-lime-600",
    dot: "bg-lime-950",
    text: "text-white",
  },
  {
    name: "Agip",
    bg: "bg-amber-500",
    dot: "bg-black",
    text: "text-white",
  },
  {
    name: "Okija",
    bg: "bg-orange-500",
    dot: "bg-black",
    text: "text-white",
  },
  {
    name: "Town (PH)",
    bg: "bg-purple-500",
    dot: "bg-black",
    text: "text-white",
  },
  {
    name: "Rumuepirikom",
    bg: "bg-rose-500",
    dot: "bg-black",
    text: "text-white",
  },
  {
    name: "NTA Road",
    bg: "bg-teal-500",
    dot: "bg-black",
    text: "text-white",
  },
  {
    name: "Oroworukwo",
    bg: "bg-yellow-500",
    dot: "bg-black",
    text: "text-black",
  },
  {
    name: "Oroazi",
    bg: "bg-pink-500",
    dot: "bg-black",
    text: "text-white",
  },
  {
    name: "Rukpokwu",
    bg: "bg-sky-500",
    dot: "bg-black",
    text: "text-white",
  },
  {
    name: "Aluu",
    bg: "bg-emerald-500",
    dot: "bg-black",
    text: "text-white",
  },
  {
    name: "Ozuoba",
    bg: "bg-indigo-500",
    dot: "bg-black",
    text: "text-white",
  },
  {
    name: "Eneka",
    bg: "bg-amber-600",
    dot: "bg-amber-950",
    text: "text-white",
  },
  {
    name: "Rumudara",
    bg: "bg-orange-600",
    dot: "bg-orange-950",
    text: "text-white",
  },
  {
    name: "Okporo Road",
    bg: "bg-purple-600",
    dot: "bg-purple-950",
    text: "text-white",
  },
  {
    name: "Location",
    bg: "bg-rose-600",
    dot: "bg-rose-950",
    text: "text-white",
  },
  {
    name: "Shell Location",
    bg: "bg-teal-600",
    dot: "bg-teal-950",
    text: "text-white",
  },
  {
    name: "St. John's",
    bg: "bg-yellow-600",
    dot: "bg-yellow-950",
    text: "text-white",
  },
];

interface LocationBadgeProps {
  name: string;
  bg: string;
  dot: string;
  textColor: string;
}

const TicketBadge: React.FC<LocationBadgeProps> = ({
  name,
  bg,
  dot,
  textColor,
}) => (
  <div
    className={`relative inline-flex items-center w-max px-4 py-2.5 sm:px-5 sm:py-3 mx-3 cursor-pointer hover:scale-105 transition-transform border-[2.5px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${bg} select-none`}
    style={{
      maskImage:
        "radial-gradient(circle 8px at 0% 50%, transparent 99%, black 100%), radial-gradient(circle 8px at 100% 50%, transparent 99%, black 100%)",
      WebkitMaskImage:
        "radial-gradient(circle 8px at 0% 50%, transparent 99%, black 100%), radial-gradient(circle 8px at 100% 50%, transparent 99%, black 100%)",
      maskComposite: "intersect",
      WebkitMaskComposite: "source-in",
    }}
  >
    {/* Inner Content Layout */}
    <div className="flex items-center space-x-1">
      <span
        className={`${textColor} font-bold text-[16px] sm:text-[16px] tracking-wide whitespace-nowrap`}
      >
        {name}
      </span>
    </div>
  </div>
);

const InfiniteTownsMarquee: React.FC = () => {
  const row1 = portHarcourtLocations.slice(0, 14);
  const row2 = portHarcourtLocations.slice(14, 28);
  const row3 = portHarcourtLocations.slice(28, 40);

  return (
    <div className="relative w-full overflow-hidden bg-[#FFF5F5] py-12 md:py-12 font-['Lufga']">
      {/* Header section with constrained max-width */}
      <div className="max-w-5xl mx-auto px-6 mb-14 text-center relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: -2 }}
          whileHover={{ scale: 1.08, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="mb-4 sm:mb-6 px-5 sm:px-6 py-2 sm:py-2.5 bg-[#FF0000] text-white font-black text-[11px] sm:text-xs md:text-sm uppercase tracking-widest cursor-default select-none w-max inline-block"
        >
          Towns We Cover
        </motion.div>

        <h2 className="text-4xl sm:text-6xl md:text-8xl font-black text-neutral-900 tracking-tight leading-tight">
          Delivering Fast Across{" "}
          <span className="text-[#ff0000]">Port Harcourt</span>{" "}
        </h2>
      </div>

      {/* Scroller rows container with edge fade masks */}
      <div className="flex flex-col space-y-6 relative z-10 overflow-hidden">
        {/* Row 1: Left to Right */}
        <div className="flex overflow-hidden whitespace-nowrap py-2">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 110, ease: "linear" }}
            className="flex items-center shrink-0"
          >
            {[...row1, ...row1].map((loc, idx) => (
              <TicketBadge
                key={`r1-${idx}`}
                name={loc.name}
                bg={loc.bg}
                dot={loc.dot}
                textColor={loc.text}
              />
            ))}
          </motion.div>
        </div>

        {/* Row 2: Right to Left */}
        <div className="flex overflow-hidden whitespace-nowrap py-2">
          <motion.div
            animate={{ x: ["-50%", "0%"] }}
            transition={{ repeat: Infinity, duration: 130, ease: "linear" }}
            className="flex items-center shrink-0"
          >
            {[...row2, ...row2].map((loc, idx) => (
              <TicketBadge
                key={`r2-${idx}`}
                name={loc.name}
                bg={loc.bg}
                dot={loc.dot}
                textColor={loc.text}
              />
            ))}
          </motion.div>
        </div>

        {/* Row 3: Left to Right */}
        <div className="flex overflow-hidden whitespace-nowrap py-2">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 120, ease: "linear" }}
            className="flex items-center shrink-0"
          >
            {[...row3, ...row3].map((loc, idx) => (
              <TicketBadge
                key={`r3-${idx}`}
                name={loc.name}
                bg={loc.bg}
                dot={loc.dot}
                textColor={loc.text}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default InfiniteTownsMarquee;
