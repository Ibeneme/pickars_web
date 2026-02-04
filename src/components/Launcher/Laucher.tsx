import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaRocket } from "react-icons/fa";

const Launcher: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const target = new Date("February 28, 2026 00:00:00").getTime();
    const interval = setInterval(() => {
      const distance = target - new Date().getTime();
      setTimeLeft({
        d: Math.floor(distance / (1000 * 60 * 60 * 24)),
        h: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        m: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        s: Math.floor((distance % (1000 * 60)) / 1000),
      });
      if (distance < 0) clearInterval(interval);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[60px] w-full overflow-hidden bg-[#ff0000] font-sans text-white flex items-center shadow-xl">
      {/* Moving Background Text */}
      <div className="absolute inset-0 flex items-center opacity-10 pointer-events-none">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="text-3xl font-black whitespace-nowrap  uppercase"
        >
          PORT HARCOURT • FEB 28 • PICKARS • PORT HARCOURT • FEB 28 • PICKARS •
          PORT HARCOURT • FEB 28 • PICKARS •
        </motion.div>
      </div>

      <div className="relative z-10 w-full px-6 flex items-center justify-between">
        {/* Minimal Headline */}
        <div className="flex items-center gap-3">
          <FaRocket className="text-xl animate-pulse" />
          <h2 className="text-[15px] md:text-[24px] font-black tracking-tighter uppercase leading-none">
            Launching on<span className="text-white/60 "></span>
          </h2>
        </div>

        {/* Compact Countdown */}
        <div className="flex items-center gap-3 md:gap-6 bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
          {[
            { l: "D", v: timeLeft.d },
            { l: "H", v: timeLeft.h },
            { l: "M", v: timeLeft.m },
            { l: "S", v: timeLeft.s },
          ].map((item, i) => (
            <div key={i} className="flex items-baseline gap-1">
              <span className="text-lg md:text-xl font-black tabular-nums">
                {String(item.v).padStart(2, "0")}
              </span>
              <span className="text-[10px] font-bold opacity-70">{item.l}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Launcher;
