"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DownloadButtons from "@/components/atoms/buttons/DownloadButtons";

gsap.registerPlugin(ScrollTrigger);

const WHATSAPP_NUMBER = "2349164860591"; // 0916 486 0591

const BG = "#FFEEEE";

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

/* ---------- Animation helpers ---------- */
const FloatG: React.FC<{
  children: React.ReactNode;
  y?: number;
  x?: number;
  rot?: number;
  dur?: number;
  delay?: number;
}> = ({ children, y = 8, x = 0, rot = 0, dur = 3, delay = 0 }) => {
  const reduce = useReducedMotion();
  if (reduce) return <g>{children}</g>;
  return (
    <motion.g
      animate={{ y: [0, -y, 0], x: [0, x, 0], rotate: [-rot, rot, -rot] }}
      transition={{ duration: dur, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.g>
  );
};

const PulseG: React.FC<{
  children: React.ReactNode;
  scale?: number;
  dur?: number;
  delay?: number;
}> = ({ children, scale = 1.12, dur = 1.6, delay = 0 }) => {
  const reduce = useReducedMotion();
  if (reduce) return <g>{children}</g>;
  return (
    <motion.g
      animate={{ scale: [1, scale, 1] }}
      transition={{ duration: dur, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.g>
  );
};

/* sways around the bottom-centre of its own box */
const SwayG: React.FC<{
  children: React.ReactNode;
  amp?: number;
  dur?: number;
  delay?: number;
}> = ({ children, amp = 3, dur = 3.2, delay = 0 }) => {
  const reduce = useReducedMotion();
  if (reduce) return <g>{children}</g>;
  return (
    <motion.g
      style={{ originX: 0.5, originY: 1 }}
      animate={{ rotate: [-amp, amp, -amp] }}
      transition={{ duration: dur, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.g>
  );
};

const Steam: React.FC<{ x: number; y: number; delay: number }> = ({
  x,
  y,
  delay,
}) => {
  const reduce = useReducedMotion();
  return (
    <g transform={`translate(${x} ${y})`}>
      <motion.path
        d="M0 0 q-10 -14 0 -28 q10 -14 0 -28"
        stroke="#fff"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
        initial={{ opacity: reduce ? 0.6 : 0 }}
        animate={reduce ? undefined : { y: [0, -34], opacity: [0, 0.9, 0] }}
        transition={{ duration: 2.4, delay, repeat: Infinity, ease: "easeOut" }}
      />
    </g>
  );
};

const artSvg = {
  viewBox: "0 0 300 340",
  preserveAspectRatio: "xMidYMax meet",
  className: "h-full w-full",
  "aria-hidden": true,
} as const;

/* ---------- Illustrations ---------- */
const MallArt = () => (
  <svg {...artSvg}>
    <defs>
      <clipPath id="basketBody">
        <path d="M52 196H248L228 316H72Z" />
      </clipPath>
    </defs>
    <ellipse cx="150" cy="328" rx="105" ry="8" fill="#000" opacity="0.12" />
    <FloatG y={7} rot={1} dur={3.4}>
      {/* things in the basket */}
      <g>
        <circle cx="150" cy="176" r="54" fill="#15803d" />
        <path
          d="M112 150q10 22 4 50M138 128q8 28 2 72M166 128q-6 30 0 72M190 150q-8 24-2 50"
          stroke="#14532d"
          strokeWidth="7"
          fill="none"
          strokeLinecap="round"
        />
      </g>
      <FloatG y={5} rot={2} dur={2.6} delay={0.2}>
        <g transform="translate(96 140) rotate(-14)">
          <rect x="-28" y="-44" width="56" height="92" rx="6" fill="#ef4444" />
          <path
            d="M-28 -44l7 8 7-8 7 8 7-8 7 8 7-8 7 8v-4h-56z"
            fill="#b91c1c"
          />
          <circle cx="0" cy="0" r="15" fill="#fde047" />
          <circle cx="0" cy="0" r="7" fill="#f97316" />
        </g>
      </FloatG>
      <FloatG y={6} rot={2} dur={3} delay={0.5}>
        <g transform="translate(208 128) rotate(14)">
          <rect x="-13" y="-14" width="26" height="78" rx="11" fill="#fb923c" />
          <rect x="-7" y="-40" width="14" height="28" fill="#ea580c" />
          <rect x="-9" y="-48" width="18" height="10" rx="3" fill="#ef4444" />
          <rect
            x="-13"
            y="14"
            width="26"
            height="14"
            fill="#fff"
            opacity="0.8"
          />
        </g>
      </FloatG>
      <path
        d="M244 196C264 140 236 100 198 92 224 112 238 146 226 196Z"
        fill="#fde047"
      />
      <path d="M198 92l-6-8 8-2z" fill="#374151" />

      {/* handle */}
      <path
        d="M72 186C70 70 230 70 228 186"
        stroke="#111827"
        strokeWidth="11"
        fill="none"
        strokeLinecap="round"
      />

      {/* basket */}
      <path d="M52 196H248L228 316H72Z" fill="#fdb913" />
      <g clipPath="url(#basketBody)">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <rect
            key={i}
            x={62 + i * 22}
            y="206"
            width="9"
            height="100"
            rx="4"
            fill={["#c2410c", "#15803d", "#7f1d1d", "#15803d"][i % 4]}
            opacity="0.85"
          />
        ))}
        <rect x="52" y="300" width="200" height="16" fill="#e6a500" />
      </g>
      <rect x="40" y="180" width="220" height="24" rx="9" fill="#e6a500" />
      <rect x="40" y="180" width="220" height="8" rx="4" fill="#f7c948" />
    </FloatG>

    {/* extras */}
    <FloatG y={12} rot={10} dur={2.6} delay={0.3}>
      <circle cx="36" cy="80" r="24" fill="#ef4444" />
      <text
        x="36"
        y="90"
        textAnchor="middle"
        fontSize="28"
        fontWeight="900"
        fill="#fff"
      >
        %
      </text>
    </FloatG>
    <FloatG y={14} dur={2.3} delay={0.8}>
      <path
        d="M266 70l5 11 12 2-9 8 3 12-11-6-11 6 3-12-9-8 12-2z"
        fill="#fff"
      />
    </FloatG>
    <FloatG y={9} rot={6} dur={3.2} delay={0.4}>
      <g transform="translate(34 270) rotate(-18)">
        <path d="M-24 -26l48 0 6 52h-60z" fill="#7c5cf0" />
        <circle cx="0" cy="0" r="12" fill="#ddd6fe" />
      </g>
    </FloatG>
  </svg>
);

/* swings from the top of its own box (like a hanger on a rail) */
const HangG: React.FC<{
  children: React.ReactNode;
  amp?: number;
  dur?: number;
  delay?: number;
}> = ({ children, amp = 3, dur = 3, delay = 0 }) => {
  const reduce = useReducedMotion();
  if (reduce) return <g>{children}</g>;
  return (
    <motion.g
      style={{ originX: 0.5, originY: 0 }}
      animate={{ rotate: [-amp, amp, -amp] }}
      transition={{ duration: dur, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.g>
  );
};

const Hanger: React.FC<{ cx: number; half: number }> = ({ cx, half }) => (
  <g
    stroke="#fff"
    strokeWidth="3.5"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d={`M${cx} 74V64a6 6 0 1 1 6-6`} />
    <path d={`M${cx} 74L${cx - half} 90H${cx + half}Z`} />
  </g>
);

const HomeArt = () => (
  <svg {...artSvg}>
    <ellipse cx="150" cy="330" rx="130" ry="7" fill="#000" opacity="0.12" />

    {/* rail */}
    <rect x="8" y="53" width="284" height="6" rx="3" fill="#60a5fa" />
    <circle cx="10" cy="56" r="7" fill="#60a5fa" />
    <circle cx="290" cy="56" r="7" fill="#60a5fa" />

    {/* shirt - updated from dark brown to lighter warm amber/caramel */}
    <HangG amp={3} dur={3.2}>
      <Hanger cx={70} half={34} />
      <path
        d="M36 92 14 122l14 12 16-14v80h52v-80l16 14 14-12-22-30-20 6q-14 10-28 0Z"
        fill="#f59e0b"
      />
      <path
        d="M56 98l14 16 14-16"
        stroke="#fde047"
        strokeWidth="3"
        fill="none"
        strokeLinejoin="round"
      />
      <circle cx="70" cy="140" r="2.5" fill="#fde047" />
      <circle cx="70" cy="160" r="2.5" fill="#fde047" />
      <circle cx="70" cy="180" r="2.5" fill="#fde047" />
    </HangG>

    {/* dress */}
    <HangG amp={3.5} dur={3.6} delay={0.5}>
      <Hanger cx={150} half={30} />
      <path d="M120 92h60l-8 38 24 92H104l24-92Z" fill="#f472b6" />
      <rect x="127" y="126" width="46" height="9" fill="#be185d" />
      <path
        d="M124 160q26 10 52 0M116 190q34 12 68 0"
        stroke="#fbcfe8"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
    </HangG>

    {/* trousers */}
    <HangG amp={3} dur={3.4} delay={0.9}>
      <Hanger cx={230} half={26} />
      <path d="M204 92h52l6 150h-22l-10-96-10 96h-22Z" fill="#a78bfa" />
      <rect x="204" y="92" width="52" height="11" fill="#5b21b6" />
      <path d="M230 103v43" stroke="#6d28d9" strokeWidth="3" />
    </HangG>

    {/* chocolate box - updated from dark browns to lighter warm gold/caramel tones */}
    <FloatG y={3} dur={2.8}>
      <rect x="40" y="272" width="190" height="52" rx="10" fill="#d97706" />
      <rect x="48" y="264" width="174" height="40" rx="8" fill="#f59e0b" />
      {[72, 106, 140, 174, 208].map((x, i) => (
        <g key={x}>
          <circle
            cx={x}
            cy="284"
            r="14"
            fill={["#fbbf24", "#fcd34d", "#fde68a"][i % 3]}
          />
          <path
            d={`M${x - 7} 284q7-9 14 0`}
            stroke={i % 2 ? "#b45309" : "#fff"}
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
        </g>
      ))}
      <rect x="40" y="296" width="190" height="10" fill="#b45309" />
      <circle cx="135" cy="301" r="6" fill="#fef08a" />
    </FloatG>

    {/* chocolate bar - updated from dark brown to lighter golden/amber */}
    <FloatG y={6} rot={4} dur={3} delay={0.4}>
      <g transform="translate(262 286) rotate(-12)">
        <rect x="-22" y="-32" width="44" height="64" rx="5" fill="#f59e0b" />
        <path
          d="M-22 -10H22M-22 10H22M0 -32V32"
          stroke="#d97706"
          strokeWidth="3"
        />
        <rect x="-22" y="14" width="44" height="18" rx="4" fill="#fef08a" />
      </g>
    </FloatG>

    {/* truffle - updated from dark brown to lighter golden brown */}
    <FloatG y={9} rot={8} dur={2.4} delay={0.7}>
      <circle cx="20" cy="298" r="15" fill="#f59e0b" />
      <path
        d="M10 292l5 3M22 288l2 5M26 300l5-1M14 304l4 3"
        stroke="#fef08a"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </FloatG>

    {/* sparkle */}
    <FloatG y={8} dur={2.2} delay={0.3}>
      <path d="M150 20l4 9 9 3-9 3-4 9-4-9-9-3 9-3z" fill="#fff" />
    </FloatG>
  </svg>
);

/* NEW office art: a printer pushing out pages, a folder, sticky note, clip */
const PrinterPaper = () => {
  const reduce = useReducedMotion();
  return (
    <motion.g
      animate={reduce ? undefined : { y: [0, 14, 0] }}
      transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
    >
      <rect x="94" y="258" width="112" height="56" rx="3" fill="#fff" />
      <path
        d="M106 274h88M106 286h88M106 298h56"
        stroke="#93c5fd"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </motion.g>
  );
};

const OfficeArt = () => (
  <svg {...artSvg}>
    <ellipse cx="150" cy="328" rx="125" ry="8" fill="#000" opacity="0.12" />

    {/* printer */}
    <FloatG y={4} rot={0.8} dur={3.2}>
      {/* paper tray */}
      <rect x="90" y="146" width="120" height="76" rx="4" fill="#fff" />
      <path
        d="M104 164h92M104 178h92M104 192h58"
        stroke="#93c5fd"
        strokeWidth="5"
        strokeLinecap="round"
      />
      {/* body */}
      <rect x="44" y="214" width="212" height="88" rx="18" fill="#1d4ed8" />
      <rect x="44" y="214" width="212" height="16" rx="8" fill="#3b82f6" />
      <circle cx="224" cy="242" r="6" fill="#22c55e" />
      <circle cx="204" cy="242" r="6" fill="#fbbf24" />
      <rect x="70" y="250" width="160" height="10" rx="5" fill="#0f172a" />
      <rect x="64" y="300" width="26" height="12" rx="4" fill="#1e3a8a" />
      <rect x="210" y="300" width="26" height="12" rx="4" fill="#1e3a8a" />
      {/* page coming out */}
      <PrinterPaper />
    </FloatG>

    {/* folder */}
    <FloatG y={10} rot={6} dur={2.9} delay={0.3}>
      <g transform="translate(14 64) rotate(-10)">
        <path
          d="M0 10a8 8 0 0 1 8-8h24l8 10h42a8 8 0 0 1 8 8v54a8 8 0 0 1-8 8H8a8 8 0 0 1-8-8z"
          fill="#fbbf24"
        />
        <rect x="0" y="26" width="90" height="46" rx="8" fill="#f59e0b" />
        <path
          d="M14 44h40"
          stroke="#fff"
          strokeWidth="5"
          strokeLinecap="round"
        />
      </g>
    </FloatG>

    {/* sticky note */}
    <FloatG y={13} rot={8} dur={2.7} delay={0.6}>
      <rect
        x="128"
        y="30"
        width="54"
        height="54"
        rx="4"
        fill="#86efac"
        transform="rotate(8 155 57)"
      />
      <path
        d="M140 50h28M140 62h18"
        stroke="#166534"
        strokeWidth="4"
        strokeLinecap="round"
        transform="rotate(8 155 57)"
      />
    </FloatG>

    {/* paper clip */}
    <FloatG y={10} rot={14} dur={2.4} delay={0.2}>
      <path
        d="M270 56v38a14 14 0 0 1-28 0V48a9 9 0 0 1 18 0v40"
        stroke="#fff"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />
    </FloatG>

    {/* pen */}
    <FloatG y={8} rot={10} dur={3.1} delay={0.4}>
      <g transform="translate(238 130) rotate(30)">
        <rect x="-6" y="0" width="12" height="52" rx="4" fill="#ef4444" />
        <rect x="-6" y="0" width="12" height="10" rx="3" fill="#fff" />
        <path d="M-6 52h12l-6 14z" fill="#fde68a" />
        <path d="M-2.5 60h5l-2.5 6z" fill="#111827" />
      </g>
    </FloatG>
  </svg>
);

const MarketArt = () => {
  const leaves = [
    { a: -50, c: "#14532d" },
    { a: 50, c: "#14532d" },
    { a: -26, c: "#15803d" },
    { a: 26, c: "#15803d" },
    { a: 0, c: "#22c55e" },
  ];
  return (
    <svg {...artSvg}>
      <ellipse cx="150" cy="326" rx="110" ry="8" fill="#000" opacity="0.12" />
      {leaves.map((l, i) => (
        <g key={i} transform={`rotate(${l.a} 150 324)`}>
          <SwayG amp={3} dur={3 + i * 0.3} delay={i * 0.2}>
            <ellipse cx="150" cy="224" rx="34" ry="100" fill={l.c} />
            <path
              d="M150 324V140"
              stroke="#bbf7d0"
              strokeWidth="3"
              opacity="0.5"
            />
          </SwayG>
        </g>
      ))}
      {/* peppers */}
      <FloatG y={6} rot={4} dur={2.8}>
        <g transform="translate(68 268)">
          <path
            d="M0 0C-30-6-40 30-26 56C-14 74 14 74 26 56C40 30 30-6 0 0Z"
            fill="#ef4444"
          />
          <path
            d="M0 0q2-14 14-16"
            stroke="#166534"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M-18 14q-6 14 0 28"
            stroke="#fca5a5"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
        </g>
      </FloatG>
      <FloatG y={7} rot={4} dur={3.3} delay={0.5}>
        <g transform="translate(236 272) scale(0.9)">
          <path
            d="M0 0C-30-6-40 30-26 56C-14 74 14 74 26 56C40 30 30-6 0 0Z"
            fill="#dc2626"
          />
          <path
            d="M0 0q2-14 14-16"
            stroke="#166534"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
          />
        </g>
      </FloatG>
      {/* chillies */}
      <FloatG y={16} rot={10} dur={2.4}>
        <g transform="translate(228 80) rotate(20)">
          <path d="M0 0C30 0 50 25 56 56C30 40 8 28-6 10Z" fill="#ef4444" />
          <rect x="-8" y="-6" width="10" height="10" rx="3" fill="#166534" />
        </g>
      </FloatG>
      <FloatG y={14} rot={10} dur={3} delay={0.7}>
        <g transform="translate(40 96) rotate(-30)">
          <path d="M0 0C30 0 50 25 56 56C30 40 8 28-6 10Z" fill="#dc2626" />
          <rect x="-8" y="-6" width="10" height="10" rx="3" fill="#166534" />
        </g>
      </FloatG>
      {/* tomato */}
      <FloatG y={10} dur={2.2} delay={0.3}>
        <circle cx="150" cy="86" r="22" fill="#ef4444" />
        <path
          d="M138 70l12 8 12-8-6 12 10 4-14 0-2 8-2-8-14 0 10-4z"
          fill="#16a34a"
        />
      </FloatG>
    </svg>
  );
};

/* ---------- Content ---------- */
type Partner = {
  id: string;
  title: string;
  text: string;
  cta: string;
  wa: string; // WhatsApp message
  bg: string; // card colour
  tags: { name: string; bg: string }[];
  Art: React.FC;
};

const partners: Partner[] = [
  {
    id: "malls",
    wa: "Hi Pickars! I run a store in a mall and I'd like to partner with you.",
    title: "Malls & Marts",
    text: "Have a shop in a mall or plaza? Let shoppers across Port Harcourt order from you and get it delivered the same day.",
    cta: "Send us a message for partnership",
    bg: "#000", // black
    tags: [
      { name: "Fashion stores", bg: "#ffffff" },
      { name: "Supermarkets", bg: "#86efac" },
      { name: "Electronics", bg: "#ffeeee" },
      { name: "Beauty", bg: "#ff0000" },
      { name: "Shoes", bg: "#ffffff" },
      { name: "Gifts", bg: "#86efac" },
    ],
    Art: MallArt,
  },
  {
    id: "home",
    wa: "Hi Pickars! I'm a home vendor and I'd like to partner with you.",
    title: "Home vendors",
    text: "Sell from your home? Bakers, cooks and small brands: we pick up from your door and deliver to your customers.",
    cta: "Send us a message for partnership",
    bg: "#830CFA", // brand red
    tags: [
      { name: "Home bakers", bg: "#ffffff" },
      { name: "Home kitchens", bg: "#ffeeee" },
      { name: "Snacks", bg: "#86efac" },
      { name: "Skincare", bg: "#ffffff" },
    ],
    Art: HomeArt,
  },
  {
    id: "office",
    wa: "Hi Pickars! I sell office supplies and I'd like to partner with you.",
    title: "Office supplies",
    text: "Sell stationery, printers or office equipment? Keep Port Harcourt offices stocked with fast, reliable delivery.",
    cta: "Send us a message for partnership",
    bg: "#0e6b3c", // deep green
    tags: [
      { name: "Stationery", bg: "#ffffff" },
      { name: "Printers & ink", bg: "#ffeeee" },
      { name: "Paper", bg: "#ffffff" },
      { name: "Furniture", bg: "#ff0000" },
      { name: "Laptops", bg: "#ffeeee" },
    ],
    Art: OfficeArt,
  },
  {
    id: "markets",
    wa: "Hi Pickars! I trade in a local market and I'd like to partner with you.",
    title: "Market traders",
    text: "Sell at Mile 3, Creek Road or any local market? Reach customers who want fresh produce without the trip.",
    cta: "Send us a message for partnership",
    bg: "#ff0000", // black
    tags: [
      { name: "Fresh produce", bg: "#86efac" },
      { name: "Fish & meat", bg: "#ff0000" },
      { name: "Provisions", bg: "#ffffff" },
      { name: "Spices", bg: "#ffeeee" },
    ],
    Art: MarketArt,
  },
];

/* ---------- Section ---------- */
const PartnerWithUs: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const reduce = !!useReducedMotion();

  /* Pinned stacking scroll (same behaviour as the CRM stack cards) */
  useEffect(() => {
    if (reduce) return;

    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
      if (!cards.length || !stackRef.current) return;

      cards.forEach((card) => {
        gsap.set(card, { transformOrigin: "50% 100%" });
      });

      gsap.set(cards[0], {
        yPercent: 0,
        scale: 1,
        rotate: 0,
        filter: "brightness(1)",
      });
      cards.slice(1).forEach((card) => {
        gsap.set(card, {
          yPercent: 110,
          scale: 1,
          rotate: 0,
          filter: "brightness(1)",
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stackRef.current,
          start: "top 90px",
          end: `+=${(cards.length - 1) * 100}%`,
          scrub: 1,
          pin: true,
          pinSpacing: true,
        },
      });

      cards.forEach((card, i) => {
        if (i === 0) return;
        const segment = i - 1;

        // outgoing card: scales down, lifts and tilts as the next one covers it
        tl.to(
          cards[i - 1],
          {
            scale: 0.92,
            y: -28,
            rotate: -6,
            filter: "brightness(0.75)",
            duration: 1,
            ease: "none",
          },
          segment
        );

        // incoming card rises straight up on top
        tl.to(card, { yPercent: 0, duration: 1, ease: "none" }, segment);
      });
    }, ref);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <section
      ref={ref}
      className="relative mt-[210px] mb-[70px] py-[100px] sm:mb-[110px] font-['Lufga'] text-black"
      style={{ backgroundColor: BG }}
    >
      {/* Cloud edge at the top */}
      <svg
        viewBox="0 0 1600 140"
        preserveAspectRatio="xMidYMax slice"
        className="absolute left-0 right-0 bottom-full block w-full h-[70px] sm:h-[110px]"
        aria-hidden="true"
      >
        <g fill={BG}>
          {bumps.map((b) => (
            <circle key={b.x} cx={b.x} cy={140} r={b.r} />
          ))}
          <rect x={0} y={100} width={1600} height={41} />
        </g>
      </svg>

      {/* Cloud edge at the bottom (mirror of the top) */}
      <svg
        viewBox="0 0 1600 140"
        preserveAspectRatio="xMidYMax slice"
        className="absolute left-0 right-0 top-full block w-full h-[70px] sm:h-[110px] -scale-y-100"
        aria-hidden="true"
      >
        <g fill={BG}>
          {bumps
            .slice()
            .reverse()
            .map((b) => (
              <circle key={b.x} cx={b.x} cy={140} r={b.r} />
            ))}
          <rect x={0} y={100} width={1600} height={41} />
        </g>
      </svg>

      {/* HEADER */}
      <div className="relative z-10 mx-auto mb-10 flex max-w-3xl flex-col items-center px-4 text-center sm:mb-14">
        <motion.h2
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ type: "spring", stiffness: 120, damping: 14 }}
          className="mb-5 text-4xl font-black leading-[1.05] tracking-tight text-black sm:text-6xl"
        >
          Let's Handle your {""}
          <span className="text-[#ff0000]"> Logistics & Supplies</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{ lineHeight: 1.6 }}
          className="max-w-2xl text-[16px] font-medium text-black/70 sm:text-[18px]"
        >
          Whatever you sell, we deliver it. Pick what fits your business and
          partner with the fastest delivery team in Port Harcourt.
        </motion.p>
        <span className="my-8">
          <DownloadButtons />
        </span>
      </div>

      {/* PINNED STACK */}
      <div className="relative z-10 mx-auto max-w-[1240px] px-4">
        <div
          ref={stackRef}
          className={
            reduce
              ? "flex flex-col gap-5"
              : "relative h-[640px] w-full sm:h-[600px] lg:h-[560px]"
          }
        >
          {partners.map((p, i) => (
            <div
              key={p.id}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              className={
                reduce
                  ? "relative"
                  : "absolute inset-0 flex items-center justify-center will-change-transform"
              }
              style={{ zIndex: i + 1 }}
            >
              <article
                style={{ backgroundColor: p.bg }}
                className="relative h-[600px] w-full overflow-hidden rounded-[32px] border-[3px] border-black sm:h-[560px] lg:h-[520px]"
              >
                <div className="flex h-full flex-col lg:flex-row">
                  {/* text */}
                  <div className="relative z-10 flex flex-col p-6 sm:p-10 lg:w-[58%]">
                    {/* Text color changes to white for dark cards (malls, office, home, markets) */}
                    <h3
                      className={`text-4xl pt-6 font-bold leading-none tracking-tight sm:text-6xl ${
                        p.id === "malls" ||
                        p.id === "office" ||
                        p.id === "home" ||
                        p.id === "markets"
                          ? "text-white"
                          : "text-black"
                      }`}
                    >
                      {p.title}
                    </h3>
                    <p
                      className={`mt-5 max-w-lg text-[17px] font-medium sm:text-[20px] ${
                        p.id === "malls" ||
                        p.id === "office" ||
                        p.id === "home" ||
                        p.id === "markets"
                          ? "text-white/90"
                          : "text-black/80"
                      }`}
                      style={{ lineHeight: 1.5 }}
                    >
                      {p.text}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2 sm:gap-3 lg:mt-auto">
                      {p.tags.map((t, ti) => (
                        <motion.span
                          key={t.name}
                          whileHover={{ scale: 1.1, rotate: ti % 2 ? 3 : -3 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 14,
                          }}
                          className="inline-flex items-center gap-2 rounded-xl border-[2.2px] border-black px-3 py-1.5 text-[14px] font-medium text-black sm:text-xl"
                          style={{ backgroundColor: t.bg }}
                        >
                          {t.name}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* illustration */}
                  <div className="pointer-events-none relative mx-auto h-56 w-full max-w-[320px] sm:h-64 lg:absolute lg:inset-y-0 lg:right-6 lg:mx-0 lg:h-auto lg:w-[40%] lg:max-w-none">
                    <p.Art />
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerWithUs;
