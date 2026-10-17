"use client";

import React, { useEffect, useState, useRef, useId } from "react";
import {
  motion,
  useReducedMotion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  useAnimationFrame,
} from "framer-motion";
import DownloadButtons from "@/components/atoms/buttons/DownloadButtons";

/* ───────────── Tokens ───────────── */
const RED = "#FF0000";
const INK = "#111111";
const SKIN = "#7E4D31"; // change these three to adjust the skin tone
const SKIN_D = "#5F3A24";
const SKIN_L = "#9A6648";

const DISC_C = 240; // centre of the red disc in the 480 x 480 viewBox
const DISC_R = 224;
const RING_R = 198;
const RING_LEN = 2 * Math.PI * RING_R;

const EASE = [0.22, 1, 0.36, 1] as const;

const headlineLines = [
  { text: "The fast way to send it.", red: false },
  { text: "Always on time with", red: false },
  { text: "Pickars.", red: true },
];

const points = [
  "Real-time route tracking",
  "Elite network of riders",
  "Port Harcourt and beyond",
];

/* Fingers of the hand (drawn upright, then the whole arm is rotated) */
const fingers = [
  { x: 158, y: 232, w: 38, len: 88, a: -4 },
  { x: 197, y: 232, w: 40, len: 100, a: 0 },
  { x: 235, y: 232, w: 38, len: 90, a: 3 },
  { x: 268, y: 240, w: 34, len: 68, a: 8 },
];

const clamp = (n: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, n));

const NeverLateSection: React.FC = () => {
  const reduce = useReducedMotion();
  const uid = useId().replace(/:/g, "");

  /* Refs the animation frame writes to directly (no React re-renders) */
  const hourRef = useRef<SVGGElement>(null);
  const minRef = useRef<SVGGElement>(null);
  const secRef = useRef<SVGGElement>(null);
  const trailRef = useRef<SVGCircleElement>(null);
  const orbitRef = useRef<SVGGElement>(null);
  const timeTextRef = useRef<HTMLSpanElement>(null);
  const lastMinute = useRef(-1);

  /* Start the hands' intro spin only once the visual is on screen */
  const visualRef = useRef<HTMLDivElement>(null);
  const inView = useInView(visualRef, { once: true, amount: 0.3 });
  const visibleRef = useRef(false);
  const startRef = useRef<number | null>(null);
  useEffect(() => {
    visibleRef.current = inView;
  }, [inView]);

  /* Pointer parallax for the arm */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 70, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 70, damping: 18, mass: 0.6 });
  const armX = useTransform(sx, [-0.5, 0.5], [-14, 14]);
  const armY = useTransform(sy, [-0.5, 0.5], [-10, 10]);

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onPointerLeave = () => {
    mx.set(0);
    my.set(0);
  };

  /* Smooth real-time clock. The hands spin into place on first view. */
  useAnimationFrame((t) => {
    if (visibleRef.current && startRef.current === null) startRef.current = t;

    let eased = 1;
    if (!reduce) {
      const p =
        startRef.current === null
          ? 0
          : clamp((t - startRef.current - 500) / 2000, 0, 1);
      eased = 1 - Math.pow(1 - p, 4);
    }
    const back = 1 - eased;

    const now = new Date();
    const ms = now.getMilliseconds();
    const s = now.getSeconds() + ms / 1000;
    const m = now.getMinutes() + s / 60;
    const h = (now.getHours() % 12) + m / 60;

    const hourDeg = h * 30 - back * 360;
    const minDeg = m * 6 - back * 720;
    const secDeg = (reduce ? Math.floor(s) : s) * 6 - back * 1080;

    hourRef.current?.setAttribute("transform", `rotate(${hourDeg})`);
    minRef.current?.setAttribute("transform", `rotate(${minDeg})`);
    secRef.current?.setAttribute("transform", `rotate(${secDeg})`);

    // Rider dot and trail on the big ring follow the second hand
    orbitRef.current?.setAttribute(
      "transform",
      `rotate(${secDeg} ${DISC_C} ${DISC_C})`
    );
    const frac = (((secDeg % 360) + 360) % 360) / 360;
    trailRef.current?.setAttribute(
      "stroke-dashoffset",
      String(RING_LEN * (1 - frac))
    );

    // Digital time chip, only touched when the minute changes
    const mins = now.getMinutes();
    if (mins !== lastMinute.current && timeTextRef.current) {
      lastMinute.current = mins;
      timeTextRef.current.textContent = now.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      });
    }
  });

  return (
    <section className="relative w-full overflow-hidden bg-[#fff] py-12 px-6 md:px-12 font-['Lufga'] text-[#111111]">
      {/* Main Container: Single Vertical Flex Column */}
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

          <h2 className="mb-5 text-4xl font-black leading-[1.05] tracking-tight text-gray-900 sm:text-6xl md:text-6xl lg:text-6xl">
            The fast way to send it. Always on time with{" "}
            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#ff0000] via-[#ff0000] to-[#ff0000]">
              Pickars.
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
          <div
            ref={visualRef}
            onPointerMove={onPointerMove}
            onPointerLeave={onPointerLeave}
            className="relative mx-auto w-full max-w-[520px]"
          >
            <svg
              viewBox="0 0 480 480"
              className="h-auto w-full"
              role="img"
              aria-label="A hand wearing a wristwatch that shows the current time"
            >
              <defs>
                <clipPath id={`${uid}-disc`}>
                  <circle cx={DISC_C} cy={DISC_C} r={DISC_R} />
                </clipPath>
                <clipPath id={`${uid}-glass`}>
                  <circle r={51} />
                </clipPath>
                <linearGradient id={`${uid}-case`} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#F7F7F7" />
                  <stop offset="0.5" stopColor="#B4B4B4" />
                  <stop offset="1" stopColor="#EEEEEE" />
                </linearGradient>
              </defs>

              {/* Red disc */}
              <motion.circle
                cx={DISC_C}
                cy={DISC_C}
                r={DISC_R}
                fill={RED}
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: EASE }}
              />

              {/* Rim ring */}
              <circle
                cx={DISC_C}
                cy={DISC_C}
                r={RING_R}
                fill="none"
                stroke="#fff"
                strokeOpacity={0.18}
                strokeWidth={3}
              />

              {/* Hour dots on the rim, popping in one after another */}
              {Array.from({ length: 12 }).map((_, i) => {
                const a = (i * 30 * Math.PI) / 180;
                return (
                  <motion.circle
                    key={i}
                    cx={DISC_C + RING_R * Math.sin(a)}
                    cy={DISC_C - RING_R * Math.cos(a)}
                    r={i % 3 === 0 ? 3.5 : 2.2}
                    fill="#fff"
                    fillOpacity={i % 3 === 0 ? 0.85 : 0.4}
                    style={{
                      transformBox: "fill-box",
                      transformOrigin: "center",
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 14,
                      delay: 0.5 + i * 0.05,
                    }}
                  />
                );
              })}

              {/* Seconds trail, follows the rider dot */}
              <circle
                ref={trailRef}
                cx={DISC_C}
                cy={DISC_C}
                r={RING_R}
                fill="none"
                stroke="#fff"
                strokeWidth={3}
                strokeLinecap="round"
                strokeDasharray={RING_LEN}
                strokeDashoffset={RING_LEN}
                transform={`rotate(-90 ${DISC_C} ${DISC_C})`}
              />

              {/* ───────── Arm (clipped to the disc) ───────── */}
              <g clipPath={`url(#${uid}-disc)`}>
                {/* 1. entrance: slides in from the lower left */}
                <motion.g
                  initial={{ x: -110, y: 130, opacity: 0 }}
                  whileInView={{ x: 0, y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    x: {
                      type: "spring",
                      stiffness: 55,
                      damping: 15,
                      delay: 0.3,
                    },
                    y: {
                      type: "spring",
                      stiffness: 55,
                      damping: 15,
                      delay: 0.3,
                    },
                    opacity: { duration: 0.5, delay: 0.3 },
                  }}
                >
                  {/* 2. pointer parallax */}
                  <motion.g style={{ x: armX, y: armY }}>
                    {/* 3. gentle idle float */}
                    <motion.g
                      animate={reduce ? undefined : { y: [0, -6, 0] }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <g transform="translate(150 330) rotate(55) scale(1.1) translate(-220 -410)">
                        {/* Thumb */}
                        <g transform="translate(150 298) rotate(-38)">
                          <rect
                            x={-19}
                            y={-84}
                            width={38}
                            height={110}
                            rx={19}
                            fill={SKIN}
                            stroke={SKIN_D}
                            strokeWidth={2}
                          />
                          <rect
                            x={-12}
                            y={-80}
                            width={24}
                            height={17}
                            rx={8}
                            fill={SKIN_L}
                            opacity={0.7}
                          />
                          <path
                            d="M-10 -34 q10 5 20 0"
                            fill="none"
                            stroke={SKIN_D}
                            strokeWidth={1.3}
                            strokeLinecap="round"
                          />
                        </g>

                        {/* Fingers */}
                        {fingers.map((f, i) => (
                          <g
                            key={i}
                            transform={`translate(${f.x} ${f.y}) rotate(${f.a})`}
                          >
                            <rect
                              x={-f.w / 2}
                              y={-f.len}
                              width={f.w}
                              height={f.len + 26}
                              rx={f.w / 2}
                              fill={SKIN}
                              stroke={SKIN_D}
                              strokeWidth={2}
                            />
                            {/* nail */}
                            <rect
                              x={-f.w / 2 + 7}
                              y={-f.len + 5}
                              width={f.w - 14}
                              height={16}
                              rx={7}
                              fill={SKIN_L}
                              opacity={0.7}
                            />
                            {/* knuckle creases */}
                            <path
                              d={`M${-f.w / 4} ${-f.len * 0.38} q${f.w / 4} 4 ${
                                f.w / 2
                              } 0`}
                              fill="none"
                              stroke={SKIN_D}
                              strokeWidth={1.3}
                              strokeLinecap="round"
                            />
                            <path
                              d={`M${-f.w / 4} ${-f.len * 0.7} q${f.w / 4} 4 ${
                                f.w / 2
                              } 0`}
                              fill="none"
                              stroke={SKIN_D}
                              strokeWidth={1.3}
                              strokeLinecap="round"
                            />
                          </g>
                        ))}

                        {/* Back of hand */}
                        <path
                          d="M150 326 C142 300 138 272 140 246 C141 228 148 218 160 216 L280 216 C292 218 299 228 300 246 C302 272 298 300 290 326 Z"
                          fill={SKIN}
                        />
                        <path
                          d="M168 250 q-6 30 4 62"
                          fill="none"
                          stroke={SKIN_L}
                          strokeWidth={5}
                          strokeLinecap="round"
                          opacity={0.35}
                        />

                        {/* Forearm */}
                        <path
                          d="M150 318 L290 318 C298 370 306 440 304 505 L136 505 C134 440 142 370 150 318 Z"
                          fill={SKIN}
                        />

                        {/* Sleeve with a red cuff stripe */}
                        <path
                          d="M112 660 L120 498 Q120 488 130 488 L310 488 Q320 488 320 498 L328 660 Z"
                          fill={INK}
                        />
                        <rect
                          x={120.5}
                          y={502}
                          width={199}
                          height={7}
                          fill={RED}
                        />
                        <path
                          d="M126 526 H314"
                          stroke="#fff"
                          strokeOpacity={0.1}
                          strokeWidth={2}
                        />

                        {/* ───── Wristwatch ───── */}
                        <g transform="translate(220 410) rotate(-90)">
                          {/* Strap */}
                          <rect
                            x={-27}
                            y={-84}
                            width={54}
                            height={168}
                            rx={14}
                            fill={INK}
                          />
                          <path
                            d="M-18 -80V-66M18 -80V-66"
                            stroke="#fff"
                            strokeOpacity={0.4}
                            strokeWidth={1.4}
                            strokeDasharray="3 3"
                          />
                          <rect
                            x={-29}
                            y={67}
                            width={58}
                            height={7}
                            rx={3}
                            fill={RED}
                          />

                          {/* Shadow on the skin */}
                          <circle
                            cx={3}
                            cy={6}
                            r={66}
                            fill="#000"
                            opacity={0.22}
                          />

                          {/* Crown, points toward the hand */}
                          <rect
                            x={61}
                            y={-9}
                            width={13}
                            height={18}
                            rx={3}
                            fill="#CFCFCF"
                          />
                          <path
                            d="M65 -7V7M68 -7V7M71 -7V7"
                            stroke="#8A8A8A"
                            strokeWidth={1}
                          />

                          {/* Case, bezel and dial */}
                          <circle r={64} fill={`url(#${uid}-case)`} />
                          <circle r={57} fill="#161616" />
                          <circle r={51} fill={RED} />

                          {/* Ticks draw in around the dial */}
                          {Array.from({ length: 60 }).map((_, i) => {
                            const major = i % 5 === 0;
                            const a = (i * 6 * Math.PI) / 180;
                            const r1 = major ? 35 : 38;
                            const r2 = 43;
                            return (
                              <motion.line
                                key={i}
                                x1={r1 * Math.sin(a)}
                                y1={-r1 * Math.cos(a)}
                                x2={r2 * Math.sin(a)}
                                y2={-r2 * Math.cos(a)}
                                stroke="#fff"
                                strokeOpacity={major ? 1 : 0.5}
                                strokeWidth={major ? 1.8 : 0.8}
                                strokeLinecap="round"
                                initial={{ pathLength: 0, opacity: 0 }}
                                whileInView={{ pathLength: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{
                                  duration: 0.35,
                                  delay: 0.9 + i * 0.012,
                                }}
                              />
                            );
                          })}

                          {/* Numerals */}
                          {[
                            { n: "12", x: 0, y: -26 },
                            { n: "3", x: 26, y: 0 },
                            { n: "6", x: 0, y: 26 },
                            { n: "9", x: -26, y: 0 },
                          ].map((d) => (
                            <motion.text
                              key={d.n}
                              x={d.x}
                              y={d.y}
                              textAnchor="middle"
                              dominantBaseline="central"
                              fontSize={8}
                              fontWeight={800}
                              fill="#fff"
                              style={{ fontFamily: "Lufga, sans-serif" }}
                              initial={{ opacity: 0 }}
                              whileInView={{ opacity: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.6, delay: 1.5 }}
                            >
                              {d.n}
                            </motion.text>
                          ))}
                          <text
                            y={14}
                            textAnchor="middle"
                            dominantBaseline="central"
                            fontSize={5.5}
                            fontWeight={800}
                            letterSpacing={1}
                            fill="#fff"
                            fillOpacity={0.85}
                            style={{ fontFamily: "Lufga, sans-serif" }}
                          >
                            PICKARS
                          </text>

                          {/* Hands */}
                          <g ref={hourRef}>
                            <line
                              x1={0}
                              y1={5}
                              x2={0}
                              y2={-21}
                              stroke="#fff"
                              strokeWidth={3}
                              strokeLinecap="round"
                            />
                          </g>
                          <g ref={minRef}>
                            <line
                              x1={0}
                              y1={6}
                              x2={0}
                              y2={-31}
                              stroke="#fff"
                              strokeWidth={2}
                              strokeLinecap="round"
                            />
                          </g>
                          <g ref={secRef}>
                            <line
                              x1={0}
                              y1={9}
                              x2={0}
                              y2={-38}
                              stroke={INK}
                              strokeWidth={1.1}
                              strokeLinecap="round"
                            />
                            <circle cy={-30} r={2.4} fill="#fff" />
                          </g>
                          <circle r={3.4} fill={INK} />
                          <circle r={1.3} fill="#fff" />

                          {/* Glass: static glare plus a sweeping shine */}
                          <g clipPath={`url(#${uid}-glass)`}>
                            <path
                              d="M-42 -14 A44 44 0 0 1 -14 -42 L-8 -35 A35 35 0 0 0 -34 -10 Z"
                              fill="#fff"
                              opacity={0.18}
                            />
                            {!reduce && (
                              <g transform="rotate(20)">
                                <motion.rect
                                  y={-70}
                                  width={12}
                                  height={140}
                                  fill="#fff"
                                  opacity={0.22}
                                  initial={{ x: -90 }}
                                  animate={{ x: [-90, 90] }}
                                  transition={{
                                    duration: 1.4,
                                    ease: "easeInOut",
                                    repeat: Infinity,
                                    repeatDelay: 4,
                                    delay: 3,
                                  }}
                                />
                              </g>
                            )}
                          </g>
                        </g>
                      </g>
                    </motion.g>
                  </motion.g>
                </motion.g>
              </g>

              {/* Rider dot rides the rim, above the arm so it never hides */}
              <g ref={orbitRef}>
                <circle cx={DISC_C} cy={DISC_C - RING_R} r={11} fill="#fff" />
                <circle cx={DISC_C} cy={DISC_C - RING_R} r={5} fill={RED} />
              </g>
            </svg>

            {/* Live time chip */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 140,
                damping: 14,
                delay: 1.5,
              }}
              className="absolute left-0 top-4 sm:-left-2"
            >
              <motion.div
                animate={reduce ? undefined : { y: [0, 5, 0] }}
                transition={{
                  duration: 3.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="flex items-center gap-3 rounded-full border border-gray-200 bg-white px-4 py-2.5"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FF0000]">
                  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden>
                    <motion.path
                      d="M3 8.5l3 3 7-7"
                      fill="none"
                      stroke="#fff"
                      strokeWidth={2.2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 1.9 }}
                    />
                  </svg>
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="text-[11px] font-semibold text-gray-500">
                    On time
                  </span>
                  <span
                    ref={timeTextRef}
                    className="text-base font-black tabular-nums text-gray-900"
                    suppressHydrationWarning
                  >
                    --:--
                  </span>
                </span>
              </motion.div>
            </motion.div>

            {/* Route tracking chip */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 140,
                damping: 14,
                delay: 1.7,
              }}
              className="absolute -bottom-2 right-2 sm:right-0"
            >
              <motion.div
                animate={reduce ? undefined : { y: [0, -6, 0] }}
                transition={{
                  duration: 3.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-bold text-gray-900"
              >
                Live route tracking
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NeverLateSection;
