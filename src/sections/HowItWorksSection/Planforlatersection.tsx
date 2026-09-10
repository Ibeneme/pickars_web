import React, { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import DownloadButtons from "../../components/buttons/DownloadButtons";
import image from '../../assets/images/use_app/nice.svg'

const NeverLateBanner: React.FC = () => {
  const [seconds, setSeconds] = useState(new Date().getSeconds());
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => (prev + 1) % 60);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const secondDegrees = seconds * 6;

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-[#fff] py-12 px-6 md:px-12 font-['Lufga'] text-[#111111]"
    >
      {/* Main Container: Sing Vertical Flex Column */}
      <div className="max-w-3xl mx-auto flex flex-col items-center text-center gap-16 relative z-10">
        {/* Top Section: Copy and Custom Download Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full flex flex-col items-center text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: -2 }}
            whileHover={{ scale: 1.08, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="mb-4 sm:mb-6 px-5 sm:px-6 py-2 sm:py-2.5 bg-[#FF0000] text-white font-black text-[11px] sm:text-xs md:text-sm uppercase tracking-widest cursor-default select-none"
            style={{
              maskImage:
                "radial-gradient(circle 5px at calc(100% - 2.5px) 50%, #0000 99%, #000 100%)",
              WebkitMaskImage:
                "conic-gradient(from -45deg at 50% 50%, #000 0 90deg, #0000 0) 0 0/10px 10px repeat",
            }}
          >
            SAFE & DURABLE
          </motion.div>

          <h2 className="mb-5 text-5xl font-black leading-[1.05] tracking-tight text-gray-900 sm:text-6xl md:text-6xl lg:text-7xl">
            Send it with Pickars. Get it there on{" "}
            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#ff0000] via-[#ff0000] to-[#ff0000]">
              time.
            </span>{" "}
          </h2>

          <p className="text-gray-700 text-lg sm:text-xl font-normal leading-relaxed max-w-2xl mb-8">
            We value your time as much as you do. Backed by real-time route
            tracking and an elite network of riders across Port Harcourt and
            beyond, your deliveries always arrive right on schedule.
          </p>

          <DownloadButtons />
        </motion.div>

        {/* Bottom Section: Centered Tilted Larger Watch Graphic */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="w-full flex items-center justify-center mt-6"
        >
          {/* Added transform rotate to tilt the watch element */}
          <div className="relative w-full max-w-[420px] h-[520px] flex flex-col items-center justify-center overflow-hidden group rotate-12">
            <div className="relative z-10 flex flex-col items-center justify-center my-auto">
              <div className="relative w-64 h-64 rounded-full bg-gray-900 border-4 border-red-600/40 flex items-center justify-center shadow-2xl">
                {/* Top Extended Watch Strap */}
                <div className="absolute -top-32 w-28 h-36 bg-[#3d2314] rounded-t-2xl border-t border-x border-white/20 flex flex-col items-center pt-3 shadow-inner">
                  <div className="w-10 h-5 bg-gray-300 rounded-sm border border-gray-500" />
                </div>

                {/* Bottom Extended Watch Strap */}
                <div className="absolute -bottom-32 w-28 h-36 bg-[#3d2314] rounded-b-2xl border-b border-x border-white/20 flex flex-col items-center justify-end pb-3 shadow-inner">
                  <div className="w-5 h-16 bg-white/10 rounded-full" />
                </div>

                {/* Clock Face Ticks */}
                <div className="absolute inset-3 rounded-full border border-white/10 pointer-events-none">
                  <span className="absolute top-2 left-1/2 -translate-x-1/2 w-1.5 h-4 bg-red-500 rounded-full" />
                  <span className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-4 bg-white/40 rounded-full" />
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-1.5 bg-white/40 rounded-full" />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-1.5 bg-white/40 rounded-full" />
                </div>

                {/* Hour Hand */}
                <div className="absolute w-2 h-16 bg-white rounded-full origin-bottom bottom-1/2 left-[calc(50%-4px)] rotate-45 transition-transform" />

                {/* Minute Hand */}
                <div className="absolute w-1.5 h-22 bg-gray-300 rounded-full origin-bottom bottom-1/2 left-[calc(50%-3px)] -rotate-12 transition-transform" />

                {/* Live Second Hand */}
                <div
                  className="absolute w-0.5 h-24 bg-red-500 rounded-full origin-bottom bottom-1/2 left-[calc(50%-1px)] transition-transform duration-300"
                  style={{ transform: `rotate(${secondDegrees}deg)` }}
                />

                {/* Center Pin */}
                <div className="w-4 h-4 rounded-full bg-red-600 border-2 border-white z-20 shadow-md" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NeverLateBanner;
