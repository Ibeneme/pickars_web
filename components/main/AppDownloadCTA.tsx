import React, { memo, useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import DownloadButtons from "../atoms/buttons/DownloadButtons";

/* Looping animations are plain CSS and pause when the section is off-screen */
const CSS = `
@keyframes cta-ride {
  from { transform: translate3d(-170px, 0, 0); }
  to   { transform: translate3d(100cqw, 0, 0); }
}
@keyframes cta-road {
  from { transform: translate3d(0, 0, 0); }
  to   { transform: translate3d(-112px, 0, 0); }
}
@keyframes cta-float {
  0%, 100% { transform: translate3d(0, 0, 0); opacity: .3; }
  50%      { transform: translate3d(0, -22px, 0); opacity: .7; }
}
.cta-bg { container-type: inline-size; }
.cta-ride-1 { animation: cta-ride 12s linear infinite; will-change: transform; }
.cta-ride-2 { animation: cta-ride 8s linear infinite; animation-delay: -4s; will-change: transform; }
.cta-road   { animation: cta-road 1.6s linear infinite; will-change: transform; }
.cta-float  { animation: cta-float 5.5s ease-in-out infinite; will-change: transform, opacity; }
.cta-float-2 { animation-duration: 6.5s; animation-delay: -1.2s; }
.cta-float-3 { animation-duration: 4.2s; animation-delay: -2s; }
@media (max-width: 767px) {
  .cta-ride-1 { animation-duration: 6.5s; }
  .cta-ride-2 { animation-duration: 4.5s; animation-delay: -2.2s; }
  .cta-road   { animation-duration: 1s; }
}
[data-active="false"] .cta-ride-1,
[data-active="false"] .cta-ride-2,
[data-active="false"] .cta-road,
[data-active="false"] .cta-float { animation-play-state: paused; }
@media (prefers-reduced-motion: reduce) {
  .cta-ride-1, .cta-ride-2, .cta-road, .cta-float { animation: none !important; }
}
`;

/* ------------------------------------------------------------------ */
/*  Delivery rider                                                     */
/* ------------------------------------------------------------------ */
const DeliveryRider = memo(function DeliveryRider() {
  return (
    <svg width="140" height="70" viewBox="-12 20 140 50" overflow="visible">
      <circle cx="22" cy="45" r="9" fill="#1f1f1f" />
      <circle cx="118" cy="45" r="9" fill="#1f1f1f" />
      <rect
        x="18"
        y="40"
        width="104"
        height="10"
        rx="5"
        fill="#2b2b2b"
        stroke="#000"
        strokeWidth="1.5"
      />
      <rect
        x="24"
        y="27"
        width="30"
        height="34"
        rx="7"
        fill="#e11d2e"
        stroke="#fff"
        strokeWidth="2"
      />
      <path d="M 41 34 L 33 47 L 39 47 L 37 55 L 46 41 L 40 41 Z" fill="#fff" />
      <ellipse cx="66" cy="45" rx="21" ry="15" fill="#111" />
      <path
        d="M 72 38 Q 95 30 112 32"
        stroke="#111"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 72 52 Q 95 60 112 58"
        stroke="#111"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="112" cy="32" r="5" fill="#111" />
      <circle cx="112" cy="58" r="5" fill="#111" />
      <circle
        cx="80"
        cy="45"
        r="12"
        fill="#e11d2e"
        stroke="#fff"
        strokeWidth="2"
      />
      <circle cx="86" cy="45" r="6" fill="#e11d2e" opacity="0.85" />
      <g opacity="0.6" stroke="#fff" strokeWidth="3" strokeLinecap="round">
        <line x1="-4" y1="38" x2="10" y2="38" />
        <line x1="-10" y1="45" x2="6" y2="45" />
        <line x1="-4" y1="52" x2="10" y2="52" />
      </g>
    </svg>
  );
});

/* ------------------------------------------------------------------ */
/*  Skyline – one flat row of separate buildings                       */
/* ------------------------------------------------------------------ */
const VB_W = 1440;
const VB_H = 240;
const GROUND = 240;

function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Tower {
  x: number;
  w: number;
  h: number;
  slant: boolean;
}

// One single row of buildings, side by side: nothing overlaps or stacks
function buildSkyline(): Tower[] {
  const rnd = mulberry32(31);
  const towers: Tower[] = [];
  let x = 0;
  let prevH = 0;
  while (x < VB_W) {
    const w = 44 + rnd() * 50;
    let h = 70 + rnd() * 140;
    // keep neighbours visibly different in height
    if (Math.abs(h - prevH) < 25) h = Math.min(210, h + 40);
    towers.push({ x, w, h, slant: rnd() > 0.8 });
    x += w + 4 + rnd() * 8;
    prevH = h;
  }
  return towers;
}

const TOWERS = buildSkyline();

const CitySkyline = memo(function CitySkyline() {
  return (
    <svg
      className="pointer-events-none absolute bottom-0 left-0 z-[1] h-44 w-full sm:bottom-0 sm:h-56 md:bottom-0 md:h-72"
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      preserveAspectRatio="xMidYMax slice"
      fill="none"
      aria-hidden
    >
      <g fill="#000" opacity="0.3">
        {TOWERS.map((t, i) => {
          const top = GROUND - t.h;
          return t.slant ? (
            <polygon
              key={i}
              points={`${t.x},${GROUND} ${t.x},${top + 18} ${
                t.x + t.w
              },${top} ${t.x + t.w},${GROUND}`}
            />
          ) : (
            <rect key={i} x={t.x} y={top} width={t.w} height={t.h} />
          );
        })}
      </g>
    </svg>
  );
});

/* ------------------------------------------------------------------ */
/*  Background                                                         */
/* ------------------------------------------------------------------ */
const Background = memo(function Background() {
  return (
    <div className="cta-bg pointer-events-none absolute inset-0 overflow-hidden">
      {/* road
      <div className="absolute bottom-0 left-0 z-[2] h-16 w-full overflow-hidden bg-black/60 sm:h-20 md:h-24">
        <div className="absolute inset-x-0 top-0 h-px bg-white/25" />
        <div
          className="cta-road absolute left-0 top-1/2 h-1.5 -translate-y-1/2 sm:h-2"
          style={{
            width: "calc(100% + 112px)",
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(255,255,255,0.65) 0 56px, transparent 56px 112px)",
          }}
        />
      </div>

      {/* riders
      <div className="cta-ride-1 absolute bottom-1.5 z-10 opacity-95 sm:bottom-2.5">
        <div className="origin-bottom-left scale-[0.7] sm:scale-90 md:scale-100">
          <DeliveryRider />
        </div>
      </div>
      <div className="cta-ride-2 absolute bottom-7 z-10 opacity-85 sm:bottom-9 md:bottom-11">
        <div className="origin-bottom-left scale-[0.55] sm:scale-75 md:scale-[0.8]">
          <DeliveryRider />
        </div>
      </div>


      <div className="cta-float absolute left-[12%] top-[18%] h-9 w-9 rounded-xl border border-white/15 bg-black/20" />
      <div className="cta-float cta-float-2 absolute right-[18%] top-[22%] h-7 w-7 rounded-full border-2 border-white/25 bg-white/10" />
      <div className="cta-float cta-float-3 absolute left-[32%] top-[28%] h-2 w-2 rounded-full bg-white/70" />
    */}
      <CitySkyline />
    </div>
  );
});

/* ------------------------------------------------------------------ */
/*  CTA                                                                */
/* ------------------------------------------------------------------ */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 18 },
  },
};

const AppDownloadCTA: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const active = useInView(ref, { margin: "100px" });

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <style>{CSS}</style>

      <section
        ref={ref}
        data-active={active}
        className="relative mx-auto mb-16 mt-8 w-full max-w-7xl overflow-hidden rounded-[2rem] bg-[#ff0000] font-['Lufga'] text-white sm:mt-12 lg:mt-16"
      >
        <Background />

        <div className="relative z-20 mx-auto flex max-w-7xl flex-col items-center justify-center px-5 pb-40 pt-16 sm:px-8 sm:pb-44 sm:pt-24 lg:px-10 lg:pb-48 lg:pt-28">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex w-full max-w-4xl flex-col items-center text-center"
          >
            {/* ticket badge */}
            <motion.div
              variants={itemVariants}
              style={{ rotate: -1.5 }}
              className="relative mb-7 cursor-default select-none sm:mb-10"
            >
              <div className="relative rounded-md bg-black px-6 py-2.5 text-[11px] font-black uppercase tracking-[0.22em] text-white sm:text-xs md:text-sm">
                <span className="absolute -left-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-[#ff0000]" />
                <span className="absolute -right-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-[#ff0000]" />
                <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[#ff3b3b] align-middle" />
                Get started today
              </div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl font-black leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl"
            >
              Download the app <br className="hidden sm:inline" />
              to get <span className="relative inline-block">started.</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-2xl text-base font-medium leading-relaxed text-white/90 sm:mt-7 sm:text-lg md:text-xl"
            >
              Book deliveries in seconds, track your dispatch rider in real
              time, and enjoy seamless package pickups right from your phone.
            </motion.p>

            <motion.div variants={itemVariants} className="mt-9 sm:mt-11">
              <DownloadButtons dark={true} />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AppDownloadCTA;
