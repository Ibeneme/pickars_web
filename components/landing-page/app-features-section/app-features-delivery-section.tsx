"use client";

import React, { memo, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { FiClock, FiZap, FiStar } from "react-icons/fi";
import redRiderImg from "@/assets/landing-page-images/delivery-options-ui.svg";

/* Section colour: also used to fill the cloud edges */
const BG = "#000000";
const PRIMARY_COLOR = "#ff0000";

/* ------------------------------------------------------------------ */
/*  Cloud edge (traced from the supplied image)                        */
/* ------------------------------------------------------------------ */
const CLOUD_PATH =
  "M0 0 L0 109 L19 114 L38 114 L43 112 L134 113 L135 114 L140 114 L141 115 L146 115 L178 121 L194 125 L201 128 L204 125 L206 125 L209 128 L216 140 L256 140 L276 129 L293 122 L312 117 L322 117 L336 110 L353 106 L368 105 L369 106 L379 106 L400 111 L428 112 L429 111 L437 111 L438 110 L448 109 L466 103 L473 103 L474 104 L490 103 L515 97 L529 97 L537 100 L541 100 L549 94 L574 81 L593 75 L601 75 L622 84 L628 88 L640 101 L645 98 L650 98 L675 114 L679 114 L698 121 L708 120 L717 115 L727 107 L735 103 L745 100 L755 100 L762 102 L768 105 L778 114 L799 117 L800 118 L809 118 L810 119 L845 119 L846 118 L853 118 L897 107 L916 105 L917 104 L926 104 L927 103 L948 102 L952 100 L967 105 L977 103 L984 103 L985 102 L995 102 L996 101 L1025 101 L1026 102 L1036 103 L1043 107 L1064 106 L1065 105 L1108 105 L1115 108 L1134 124 L1147 133 L1156 136 L1172 139 L1178 139 L1179 140 L1524 140 L1530 138 L1538 138 L1542 140 L1667 140 L1673 138 L1693 136 L1694 135 L1708 135 L1727 140 L1742 140 L1749 132 L1752 131 L1760 132 L1769 140 L1889 140 L1890 139 L1902 139 L1903 140 L2196 140 L2184 105 L2167 91 L2168 89 L2178 85 L2188 84 L2189 83 L2229 83 L2230 84 L2249 85 L2250 86 L2257 86 L2258 87 L2281 90 L2291 85 L2309 80 L2325 78 L2326 77 L2333 77 L2334 76 L2342 76 L2343 75 L2357 75 L2364 79 L2371 81 L2388 81 L2397 79 L2413 73 L2427 64 L2433 72 L2437 74 L2447 74 L2454 71 L2465 63 L2475 62 L2481 68 L2483 74 L2489 69 L2496 67 L2537 87 L2544 88 L2552 84 L2559 84 L2565 89 L2570 90 L2575 79 L2586 64 L2594 56 L2600 54 L2608 56 L2621 68 L2627 78 L2648 66 L2666 58 L2675 58 L2679 60 L2697 78 L2710 66 L2717 63 L2723 62 L2732 65 L2739 72 L2744 81 L2750 87 L2754 89 L2764 90 L2773 88 L2793 78 L2795 78 L2799 75 L2806 73 L2812 75 L2825 89 L2846 104 L2855 107 L2859 107 L2869 104 L2879 104 L2879 0Z";

/* "bottom": hangs from the bottom of the section (wavy side down)
   "top":    sits on the top of the section, flipped (wavy side up) */
const CloudEdge = memo(function CloudEdge({
  position,
}: {
  position: "top" | "bottom";
}) {
  return (
    <svg
      viewBox="0 0 2880 141"
      preserveAspectRatio="xMidYMin slice"
      className={`pointer-events-none absolute left-0 right-0 z-10 block h-[70px] w-full sm:h-[110px] ${
        position === "bottom" ? "top-full" : "bottom-full -scale-y-100"
      }`}
      aria-hidden="true"
    >
      <path d={CLOUD_PATH} fill={BG} />
    </svg>
  );
});

/* ------------------------------------------------------------------ */
/*  Delivery tiers                                                     */
/* ------------------------------------------------------------------ */
interface Tier {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const TIERS: Tier[] = [
  {
    icon: <FiClock className="h-5 w-5" />,
    title: "Regular",
    description: "Reliable, budget-friendly deliveries for everyday packages.",
  },
  {
    icon: <FiZap className="h-5 w-5" />,
    title: "Impromptu",
    description: "Need it now? Get matched with a nearby rider in minutes.",
  },
  {
    icon: <FiStar className="h-5 w-5" />,
    title: "Premium",
    description:
      "Priority handling and the fastest route for your most important items.",
  },
];

export default function AppFeaturesDeliveryOptions() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const mockupY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 18, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 110, damping: 18 },
    },
  };

  return (
    /* overflow-x-clip (not overflow-hidden) so the cloud edges, which sit
       just outside the section, are not cut off */
    <section
      ref={containerRef}
      className="relative isolate mb-[70px] mt-[70px] overflow-x-clip font-['Lufga'] text-white sm:mb-[110px] sm:mt-[110px]"
      style={{ backgroundColor: BG }}
    >
      {/* cloud edges: top (flipped) and bottom */}
      <CloudEdge position="top" />
      <CloudEdge position="bottom" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 sm:pt-12 lg:px-8">
        {/* ---------- Header: title left, description right ---------- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-10 grid items-end gap-6 sm:mb-14 md:grid-cols-[1.4fr_1fr] md:gap-16"
        >
          <div className="flex flex-col items-start">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: -2 }}
              whileHover={{ scale: 1.08, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="mb-6 max-w-[210px] cursor-default select-none bg-[#ff0000] px-5 py-2 text-[11px] font-black uppercase tracking-widest text-white sm:mb-8 sm:px-6 sm:py-2.5 sm:text-xs md:text-sm"
              style={{
                maskImage:
                  "radial-gradient(circle 5px at calc(100% - 2.5px) 50%, #0000 99%, #000 100%)",
                WebkitMaskImage:
                  "conic-gradient(from -45deg at 50% 50%, #000 0 90deg, #0000 0) 0 0/10px 10px repeat",
              }}
            >
              FLEXIBLE BOOKING
            </motion.div>

            <motion.h3
              variants={itemVariants}
              className="text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Set your route, choose your delivery option{" "}
              <span style={{ color: '#fff' }}>with ease.</span>
            </motion.h3>
          </div>

          <motion.p
            variants={itemVariants}
            className="max-w-md text-[16px] font-medium leading-relaxed text-white/65 sm:text-[18px] md:pb-1"
          >
            Seamlessly select your pickup and delivery points, then pick the
            ideal delivery tier tailored to your speed and budget.
          </motion.p>
        </motion.div>

        {/* ---------- Full-width parallax image ---------- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative w-full overflow-hidden rounded-[32px] border border-white/10 sm:rounded-[40px]"
        >
          <motion.div
            style={{ y: mockupY }}
            className="relative h-[300px] w-full sm:h-[460px] lg:h-[600px]"
          >
            <Image
              src={redRiderImg}
              alt="Pickars App Pickup and Delivery Options Preview"
              fill
              className="object-cover"
            />
          </motion.div>
        </motion.div>

        {/* ---------- Delivery tiers: three columns under the image ---------- */}
        <motion.ul
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          viewport={{ once: true, margin: "-60px" }}
          className="mt-10 grid gap-8 sm:mt-14 md:grid-cols-3 md:gap-10"
        >
          {TIERS.map((tier, idx) => (
            <li
              key={tier.title}
              className="group border-t border-white/15 pt-5 sm:pt-6"
            >
              <div className="flex items-center justify-between">
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-xl transition-colors duration-300 group-hover:bg-[#ff0000] group-hover:text-white sm:h-12 sm:w-12"
                  style={{
                    backgroundColor: "rgba(255, 0, 0, 0.15)",
                    color: PRIMARY_COLOR,
                  }}
                >
                  {tier.icon}
                </span>
                <span
                  className="text-xs font-semibold tracking-widest text-white/30"
                  aria-hidden="true"
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
              </div>
              <h4 className="mt-5 text-lg font-bold tracking-tight text-white sm:text-xl">
                {tier.title}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                {tier.description}
              </p>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
