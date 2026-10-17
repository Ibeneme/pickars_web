"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

const RED = "#FF0000";

/* Irregular cloud bumps for the top edge (x, radius) across a 1600 wide strip */
const bumps = [
  { x: 40, r: 52 },
  { x: 130, r: 70 },
  { x: 235, r: 48 },
  { x: 330, r: 78 },
  { x: 440, r: 56 },
  { x: 540, r: 84 },
  { x: 655, r: 50 },
  { x: 745, r: 68 },
  { x: 850, r: 90 },
  { x: 965, r: 54 },
  { x: 1060, r: 74 },
  { x: 1165, r: 50 },
  { x: 1262, r: 82 },
  { x: 1375, r: 58 },
  { x: 1470, r: 72 },
  { x: 1565, r: 54 },
];

const services = [
  {
    title: "Documents & letters",
    text: "Contracts, certificates and parcels that cannot wait. Picked up and dropped off the same hour.",
    icon: (
      <>
        <path d="M7 3h7l5 5v13H7z" />
        <path d="M14 3v5h5" />
        <path d="M10 13h6M10 17h6" />
      </>
    ),
  },
  {
    title: "Boutique & shop orders",
    text: "Send customer orders straight from your store to their door, every day, without leaving the counter.",
    icon: (
      <>
        <path d="M5 8h14l-1 12H6z" />
        <path d="M9 8V6a3 3 0 0 1 6 0v2" />
      </>
    ),
  },
  {
    title: "Fragile & valuable items",
    text: "Trained riders carry glass, gadgets and gifts with care so they arrive in one piece.",
    icon: (
      <>
        <path d="M3 8l9-5 9 5v8l-9 5-9-5z" />
        <path d="M3 8l9 5 9-5M12 13v8" />
      </>
    ),
  },
  {
    title: "Food & everyday errands",
    text: "Lunch for the office, groceries for home or a forgotten charger. A rider is a tap away.",
    icon: (
      <>
        <path d="M4 11h16a8 8 0 0 1-16 0z" />
        <path d="M8 7c0-2 2-2 2-4M13 7c0-2 2-2 2-4" />
      </>
    ),
  },
];

const steps = [
  {
    title: "Request",
    text: "Enter pickup and drop-off and see your price first.",
  },
  { title: "Match", text: "A rider near you accepts and heads to the pickup." },
  { title: "Track", text: "Follow the ride live until it reaches the door." },
];

/* A soft puffy cloud made from circles */
const PuffCloud: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 200 80" className={className} aria-hidden="true">
    <g fill="#fff">
      <circle cx={48} cy={52} r={24} />
      <circle cx={84} cy={38} r={32} />
      <circle cx={126} cy={46} r={28} />
      <circle cx={158} cy={56} r={20} />
      <rect x={30} y={52} width={146} height={24} rx={12} />
    </g>
  </svg>
);

const DeliveryCloudsSection: React.FC = () => {
  const reduce = useReducedMotion();

  const drift = (duration: number, delay = 0) =>
    reduce
      ? undefined
      : {
          animate: { x: ["-20vw", "120vw"] },
          transition: {
            duration,
            delay,
            repeat: Infinity,
            ease: "linear" as const,
          },
        };

  return (
    <section className="relative w-full bg-[#FF0000] text-white font-['Lufga'] px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-20 sm:pb-28 mt-[70px] sm:mt-[110px]">
      {/* Cloud edge: bumps rise above the section and blend into the red */}
      <svg
        viewBox="0 0 1600 140"
        preserveAspectRatio="xMidYMax slice"
        className="absolute left-0 right-0 bottom-full block w-full h-[70px] sm:h-[110px]"
        aria-hidden="true"
      >
        <g fill={RED}>
          {bumps.map((b) => (
            <circle key={b.x} cx={b.x} cy={140} r={b.r} />
          ))}
          <rect x={0} y={100} width={1600} height={41} />
        </g>
      </svg>

      {/* Drifting clouds */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <motion.div
          className="absolute top-10 left-0 w-40 sm:w-56 opacity-20"
          {...drift(60)}
        >
          <PuffCloud className="w-full h-auto" />
        </motion.div>
        <motion.div
          className="absolute top-[38%] left-0 w-28 sm:w-40 opacity-15"
          {...drift(80, -30)}
        >
          <PuffCloud className="w-full h-auto" />
        </motion.div>
        <motion.div
          className="absolute bottom-16 left-0 w-44 sm:w-64 opacity-20"
          {...drift(70, -15)}
        >
          <PuffCloud className="w-full h-auto" />
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          whileInView={{ opacity: 1, scale: 1, rotate: -2 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.08, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="mb-4 sm:mb-6 px-5 sm:px-6 py-2 sm:py-2.5 bg-white text-[#FF0000] font-black text-[11px] sm:text-xs md:text-sm uppercase tracking-widest cursor-default select-none"
          style={{
            maskImage:
              "radial-gradient(circle 5px at calc(100% - 2.5px) 50%, #0000 99%, #000 100%)",
            WebkitMaskImage:
              "conic-gradient(from -45deg at 50% 50%, #000 0 90deg, #0000 0) 0 0/10px 10px repeat",
          }}
        >
          WHAT WE DELIVER
        </motion.div>

        {/* Heading */}
        <div className="mb-12 sm:mb-16 flex max-w-3xl flex-col items-center text-center">
          <h2 className="mb-5 text-4xl font-black leading-[1.05] tracking-tight sm:text-6xl">
            If it fits on a bike, it rides with Pickars.
          </h2>
          <p className="max-w-2xl text-base sm:text-lg md:text-xl text-white/85">
            From a single document to a full day of shop orders, riders across
            Port Harcourt pick it up and drop it off, usually in under an hour.
          </p>
        </div>

        {/* Services */}
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                delay: (i % 2) * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex gap-5 rounded-3xl bg-white p-6 sm:p-8 text-gray-900"
            >
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#fff5f5]">
                <svg
                  viewBox="0 0 24 24"
                  className="h-7 w-7 fill-none stroke-[#FF0000]"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {s.icon}
                </svg>
              </span>
              <div>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm sm:text-base leading-relaxed text-gray-600">
                  {s.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* How a delivery goes */}
        <div className="relative mt-12 sm:mt-16 w-full">
          <div className="absolute left-[16.6%] right-[16.6%] top-5 hidden border-t-2 border-dashed border-white/50 sm:block" />
          <ol className="relative grid grid-cols-1 gap-8 sm:grid-cols-3">
            {steps.map((st, i) => (
              <motion.li
                key={st.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="flex flex-col items-center text-center"
              >
                <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-base font-black text-[#FF0000]">
                  {i + 1}
                </span>
                <h4 className="text-lg font-black">{st.title}</h4>
                <p className="mt-1 max-w-[16rem] text-sm text-white/85">
                  {st.text}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default DeliveryCloudsSection;
