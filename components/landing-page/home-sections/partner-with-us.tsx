"use client";

import React, { memo } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import DownloadButtons from "@/components/atoms/buttons/DownloadButtons";
import { useRef } from "react";

const WHATSAPP_NUMBER = "2349164860591"; // 0916 486 0591

const BG = "#ffffff";

/* ---------- Cloud edge (traced from the supplied image) ---------- */
const CLOUD_PATH =
  "M0 0 L0 109 L19 114 L38 114 L43 112 L134 113 L135 114 L140 114 L141 115 L146 115 L178 121 L194 125 L201 128 L204 125 L206 125 L209 128 L216 140 L256 140 L276 129 L293 122 L312 117 L322 117 L336 110 L353 106 L368 105 L369 106 L379 106 L400 111 L428 112 L429 111 L437 111 L438 110 L448 109 L466 103 L473 103 L474 104 L490 103 L515 97 L529 97 L537 100 L541 100 L549 94 L574 81 L593 75 L601 75 L622 84 L628 88 L640 101 L645 98 L650 98 L675 114 L679 114 L698 121 L708 120 L717 115 L727 107 L735 103 L745 100 L755 100 L762 102 L768 105 L778 114 L799 117 L800 118 L809 118 L810 119 L845 119 L846 118 L853 118 L897 107 L916 105 L917 104 L926 104 L927 103 L948 102 L952 100 L967 105 L977 103 L984 103 L985 102 L995 102 L996 101 L1025 101 L1026 102 L1036 103 L1043 107 L1064 106 L1065 105 L1108 105 L1115 108 L1134 124 L1147 133 L1156 136 L1172 139 L1178 139 L1179 140 L1524 140 L1530 138 L1538 138 L1542 140 L1667 140 L1673 138 L1693 136 L1694 135 L1708 135 L1727 140 L1742 140 L1749 132 L1752 131 L1760 132 L1769 140 L1889 140 L1890 139 L1902 139 L1903 140 L2196 140 L2184 105 L2167 91 L2168 89 L2178 85 L2188 84 L2189 83 L2229 83 L2230 84 L2249 85 L2250 86 L2257 86 L2258 87 L2281 90 L2291 85 L2309 80 L2325 78 L2326 77 L2333 77 L2334 76 L2342 76 L2343 75 L2357 75 L2364 79 L2371 81 L2388 81 L2397 79 L2413 73 L2427 64 L2433 72 L2437 74 L2447 74 L2454 71 L2465 63 L2475 62 L2481 68 L2483 74 L2489 69 L2496 67 L2537 87 L2544 88 L2552 84 L2559 84 L2565 89 L2570 90 L2575 79 L2586 64 L2594 56 L2600 54 L2608 56 L2621 68 L2627 78 L2648 66 L2666 58 L2675 58 L2679 60 L2697 78 L2710 66 L2717 63 L2723 62 L2732 65 L2739 72 L2744 81 L2750 87 L2754 89 L2764 90 L2773 88 L2793 78 L2795 78 L2799 75 L2806 73 L2812 75 L2825 89 L2846 104 L2855 107 L2859 107 L2869 104 L2879 104 L2879 0Z";

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
        fill="#ff0000"
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

const HomeArt = () => (
  <svg {...artSvg}>
    <ellipse cx="150" cy="328" rx="140" ry="8" fill="#000" opacity="0.12" />

    {/* Centered & Bigger Chocolate Box */}
    <FloatG y={4} dur={2.8}>
      <g transform="translate(10, 16)">
        <rect x="20" y="240" width="220" height="60" rx="12" fill="#7c2d12" />
        <rect x="28" y="230" width="204" height="46" rx="9" fill="#451a03" />
        {[55, 93, 131, 169, 207].map((x, i) => (
          <g key={x}>
            <circle
              cx={x}
              cy="253"
              r="16"
              fill={["#92400e", "#78350f", "#b45309"][i % 3]}
            />
            <path
              d={`M${x - 8} 253q8-10 16 0`}
              stroke={i % 2 ? "#fde68a" : "#fff"}
              strokeWidth="3.5"
              fill="none"
              strokeLinecap="round"
            />
          </g>
        ))}
        <rect x="20" y="268" width="220" height="12" fill="#9a3412" />
        <circle cx="130" cy="274" r="7" fill="#fbbf24" />
      </g>
    </FloatG>

    {/* Centered & Bigger Chocolate Bar (Left side accent) */}
    <FloatG y={6} rot={4} dur={3} delay={0.4}>
      <g transform="translate(55, 185) scale(1.2) rotate(-12)">
        <rect x="-22" y="-32" width="44" height="64" rx="5" fill="#78350f" />
        <path
          d="M-22 -10H22M-22 10H22M0 -32V32"
          stroke="#92400e"
          strokeWidth="3"
        />
        <rect x="-22" y="14" width="44" height="18" rx="4" fill="#fbbf24" />
      </g>
    </FloatG>

    {/* Centered & Bigger Truffle (Right side accent) */}
    <FloatG y={9} rot={8} dur={2.4} delay={0.7}>
      <g transform="translate(235, 230) scale(1.2)">
        <circle cx="0" cy="0" r="18" fill="#78350f" />
        <path
          d="M-10 -6l6 3M4 -10l2 6M8 2l6 -1M-6 8l5 4"
          stroke="#fde68a"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </g>
    </FloatG>

    {/* Sparkle */}
    <FloatG y={8} dur={2.2} delay={0.3}>
      <path d="M150 140l5 11 11 5-11 5-5 11-5-11-11-5 11-5z" fill="#ff0000" />
    </FloatG>
  </svg>
);

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
        stroke="#1e3a8a"
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
  wa: string;
  bg: string;
  Art: React.FC;
};

const partners: Partner[] = [
  {
    id: "malls",
    wa: "Hello Pickars! I own a shop in a mall and I'm interested in working with you.",
    title: "Mall Stores",
    text: "Do you have a store in a mall or plaza? Let customers all over Port Harcourt buy from you and receive their orders on the same day.",
    cta: "Message us to become a partner",
    bg: "#DFFCE1",
    Art: MallArt,
  },
  {
    id: "home",
    wa: "Hello Pickars! I sell from home and I'd love to become your partner.",
    title: "Home-Based Sellers",
    text: "Do you run your business from home? Whether you bake, cook or build a small brand, we collect from your doorstep and bring it straight to your buyers.",
    cta: "Message us to become a partner",
    bg: "#DFF9FC",
    Art: HomeArt,
  },
  {
    id: "office",
    wa: "Hello Pickars! I sell office supplies and I want to partner with you.",
    title: "Office Supplies",
    text: "Do you deal in stationery, printers or office equipment? We help you keep offices around Port Harcourt well stocked with quick, dependable delivery.",
    cta: "Message us to become a partner",
    bg: "#EDDFFC",
    Art: OfficeArt,
  },
  {
    id: "markets",
    wa: "Hello Pickars! I trade in a local market and I'd like to partner with you.",
    title: "Market Traders",
    text: "Do you trade at Mile 3, Creek Road or another local market? Connect with buyers who want fresh produce brought to them so they can skip the trip.",
    cta: "Message us to become a partner",
    bg: "#FCF4DF",
    Art: MarketArt,
  },
];

/* ---------- Section ---------- */
const PartnerWithUs: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative mt-[48px] mb-[70px] py-[64px] sm:mb-[110px] font-['Lufga'] text-black"
      style={{ backgroundColor: BG }}
    >
      {/* HEADER */}
      <div className="relative z-10 mx-auto mb-10 flex max-w-3xl flex-col items-center px-4 text-center sm:mb-14">
        <motion.h2
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ type: "spring", stiffness: 120, damping: 14 }}
          className="mb-5 text-4xl font-semibold leading-[1.05] tracking-tight text-black sm:text-6xl"
        >
          Leave the {""}
          <span className="text-[#ff0000]">Deliveries & Supply Runs</span> to Us
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{ lineHeight: 1.6 }}
          className="max-w-2xl text-[16px] font-regular text-black/70 sm:text-[18px]"
        >
          No matter what you sell, we get it to your customers. Choose the
          option that matches your business and team up with the quickest
          delivery crew in Port Harcourt.
        </motion.p>
        <span className="my-8">
          <DownloadButtons />
        </span>
      </div>

      {/* GRID LAYOUT */}
      <div className="relative z-10 mx-auto max-w-[1240px] px-4">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {partners.map((p, index) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              style={{ backgroundColor: p.bg }}
              className="relative flex h-auto min-h-[660px] w-full flex-col justify-between overflow-hidden rounded-[32px] border-[1px] border-black/5 p-6 sm:p-10 lg:h-[660px]"
            >
              {/* Full-width text content */}
              <div className="w-full">
                <h3 className="text-4xl pt-2 font-medium leading-none tracking-tight sm:text-5xl text-black">
                  {p.title}
                </h3>
                <p
                  className="mt-4 w-full text-[17px] font-regular sm:text-[18px] text-black/80"
                  style={{ lineHeight: 1.5 }}
                >
                  {p.text}
                </p>
              </div>

              {/* illustration - full width across the bottom of the card */}
              <div className="pointer-events-none relative mx-auto mt-6 h-72 w-full max-w-[460px] sm:h-80 sm:max-w-[520px] lg:absolute lg:bottom-0 lg:left-0 lg:right-0 lg:h-[420px] lg:w-full lg:max-w-none">
                <p.Art />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerWithUs;
