import React from "react";
import { motion } from "framer-motion";

// 40+ real neighborhoods, areas, and key locations across Port Harcourt
const portHarcourtLocations = [
  { name: "GRA Phase 1", bg: "bg-rose-500", text: "text-white" },
  { name: "GRA Phase 2", bg: "bg-amber-500", text: "text-white" },
  { name: "GRA Phase 3", bg: "bg-emerald-500", text: "text-white" },
  { name: "Rumuola", bg: "bg-sky-500", text: "text-white" },
  { name: "Woji", bg: "bg-orange-500", text: "text-white" },
  { name: "Peter Odili", bg: "bg-purple-500", text: "text-white" },
  { name: "Ada George", bg: "bg-teal-500", text: "text-white" },
  { name: "D-Line", bg: "bg-indigo-500", text: "text-white" },
  { name: "Old GRA", bg: "bg-yellow-400", text: "text-neutral-950" },
  { name: "Trans Amadi", bg: "bg-cyan-500", text: "text-white" },
  { name: "Rumuomasi", bg: "bg-pink-500", text: "text-white" },
  { name: "Rumuokoro", bg: "bg-lime-400", text: "text-neutral-950" },
  { name: "Choba", bg: "bg-rose-600", text: "text-white" },
  { name: "Elekahia", bg: "bg-sky-600", text: "text-white" },
  { name: "Mgbuoba", bg: "bg-emerald-600", text: "text-white" },
  { name: "Rumuigbo", bg: "bg-amber-600", text: "text-white" },
  { name: "Iwofe", bg: "bg-purple-600", text: "text-white" },
  { name: "Garrison", bg: "bg-orange-600", text: "text-white" },
  { name: "Abuloma", bg: "bg-yellow-600", text: "text-white" },
  { name: "Borokiri", bg: "bg-teal-600", text: "text-white" },
  { name: "Oil Mill", bg: "bg-pink-600", text: "text-white" },
  { name: "Eliozu", bg: "bg-indigo-600", text: "text-white" },
  { name: "Eleme Junction", bg: "bg-cyan-600", text: "text-white" },
  { name: "Rumueme", bg: "bg-lime-600", text: "text-white" },
  { name: "Agip", bg: "bg-violet-500", text: "text-white" },
  { name: "Okija", bg: "bg-fuchsia-500", text: "text-white" },
  { name: "Town (PH)", bg: "bg-red-600", text: "text-white" },
  { name: "Rumuepirikom", bg: "bg-blue-600", text: "text-white" },
  { name: "NTA Road", bg: "bg-teal-400", text: "text-neutral-950" },
  { name: "Oroworukwo", bg: "bg-amber-300", text: "text-neutral-950" },
  { name: "Oroazi", bg: "bg-pink-400", text: "text-white" },
  { name: "Rukpokwu", bg: "bg-sky-400", text: "text-white"  },
  { name: "Aluu", bg: "bg-emerald-400", text: "text-neutral-950" },
  { name: "Ozuoba", bg: "bg-indigo-400", text: "text-white" },
  { name: "Eneka", bg: "bg-rose-400", text: "text-white" },
  { name: "Rumudara", bg: "bg-orange-400", text: "text-white"  },
  { name: "Okporo Road", bg: "bg-purple-400", text: "text-white"  },
  { name: "Location", bg: "bg-blue-500", text: "text-white" },
  { name: "Shell Location", bg: "bg-emerald-700", text: "text-white" },
  { name: "St. John's", bg: "bg-yellow-500", text: "text-neutral-950" },
];

interface LocationBadgeProps {
  name: string;
  bg: string;
  textColor: string;
}

const TicketBadge: React.FC<LocationBadgeProps> = ({ name, bg, textColor }) => (
  <div
    className={`mx-2 px-5 sm:px-6 py-2 sm:py-2.5 ${bg} ${textColor} font-black text-[11px] sm:text-xs md:text-sm uppercase tracking-widest cursor-default select-none shadow-sm`}
    style={{
      maskImage:
        "radial-gradient(circle 5px at calc(100% - 2.5px) 50%, #0000 99%, #000 100%)",
      WebkitMaskImage:
        "conic-gradient(from -45deg at 50% 50%, #000 0 90deg, #0000 0) 0 0/10px 10px repeat",
    }}
  >
    <div className="flex items-center space-x-1">
      <span className="font-bold text-[14px] sm:text-[16px] tracking-wide whitespace-nowrap">
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
    <div className="relative w-full overflow-hidden bg-[#FFF5F5] py-12 md:py-16 font-['Lufga']">
      {/* Header Section */}
      <div className="max-w-5xl mx-auto px-6 mb-14 text-center relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: -2 }}
          whileHover={{ scale: 1.08, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="mb-4 sm:mb-6 px-5 sm:px-6 py-2 sm:py-2.5 bg-[#FF0000] text-white font-black text-[11px] sm:text-xs md:text-sm uppercase tracking-widest cursor-default select-none shadow-md"
          style={{
            maskImage:
              "radial-gradient(circle 5px at calc(100% - 2.5px) 50%, #0000 99%, #000 100%)",
            WebkitMaskImage:
              "conic-gradient(from -45deg at 50% 50%, #000 0 90deg, #0000 0) 0 0/10px 10px repeat",
          }}
        >
          Towns We Cover
        </motion.div>

        <h2 className="text-4xl sm:text-6xl md:text-8xl font-black text-neutral-900 tracking-tight leading-tight">
          Delivering Fast Across{" "}
          <span className="text-[#ff0000]">Port Harcourt</span>
        </h2>
      </div>

      {/* Marquee Scroller Rows */}
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
