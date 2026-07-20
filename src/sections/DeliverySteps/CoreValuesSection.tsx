import React, { useRef } from "react";
import { motion, type Variants,  type TargetAndTransition } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

// SVG Illustration Components (layered solid fills for depth — no gradients)
const PharmacyIllustration = () => (
  <div className="relative flex h-full w-full items-center justify-center bg-[#031c17] p-6">
    <svg className="h-full w-full max-w-[200px]" viewBox="0 0 200 200" fill="none">
      <ellipse cx="97" cy="172" rx="40" ry="7" fill="#000000" opacity="0.35" />

      <motion.g
        animate={{ y: [-7, 7, -7] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* bottle cap */}
        <rect x="76" y="46" width="42" height="24" rx="7" fill="#0f766e" />
        <line x1="76" y1="54" x2="118" y2="54" stroke="#134e4a" strokeWidth="2" />
        <line x1="76" y1="61" x2="118" y2="61" stroke="#134e4a" strokeWidth="2" />
        {/* neck */}
        <rect x="86" y="66" width="22" height="14" fill="#0d9488" />
        {/* bottle body */}
        <rect x="60" y="78" width="74" height="88" rx="18" fill="#0d9488" />
        {/* body shading */}
        <rect x="68" y="86" width="16" height="72" rx="8" fill="#2dd4bf" opacity="0.3" />
        {/* label */}
        <rect x="70" y="104" width="54" height="40" rx="6" fill="#f0fdfa" />
        <rect x="93" y="112" width="8" height="24" rx="3" fill="#0d9488" />
        <rect x="85" y="120" width="24" height="8" rx="3" fill="#0d9488" />
      </motion.g>

      {/* floating capsule */}
      <motion.g
        animate={{ y: [8, -10, 8], rotate: [-8, 12, -8] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <rect x="118" y="30" width="46" height="22" rx="11" fill="#38bdf8" transform="rotate(25 118 30)" />
        <rect x="137" y="30" width="27" height="22" rx="11" fill="#f43f5e" transform="rotate(25 118 30)" />
        <ellipse cx="128" cy="34" rx="5" ry="3" fill="#bae6fd" opacity="0.6" transform="rotate(25 118 30)" />
      </motion.g>

      {/* cross badge */}
      <motion.g
        animate={{ y: [-9, 9, -9], rotate: [10, -8, 10] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <circle cx="42" cy="118" r="18" fill="#a855f7" />
        <rect x="38" y="108" width="8" height="20" rx="3" fill="#f3e8ff" />
        <rect x="32" y="114" width="20" height="8" rx="3" fill="#f3e8ff" />
      </motion.g>

      {/* rising particles */}
      {[...Array(3)].map((_, i) => (
        <motion.circle
          key={i}
          cx={60 + i * 42}
          cy={185}
          r="2.5"
          fill="#5eead4"
          animate={{ y: [0, -70, -140], opacity: [0, 0.8, 0] }}
          transition={{ duration: 4 + i, repeat: Infinity, delay: i * 1.2, ease: "easeOut" }}
        />
      ))}
    </svg>
  </div>
);

const RestaurantIllustration = () => (
  <div className="relative flex h-full w-full items-center justify-center bg-[#211003] p-6">
    <svg className="h-full w-full max-w-[200px]" viewBox="0 0 200 200" fill="none">
      {/* steam */}
      {[70, 100, 130].map((x, i) => (
        <motion.path
          key={i}
          d={`M${x} 55 Q${x - 9} 38 ${x} 26 T${x} 6`}
          stroke="#fed7aa"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.7"
          fill="none"
          animate={{ y: [-4, -14, -4], opacity: [0.15, 0.75, 0.15] }}
          transition={{ duration: 2.2 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
        />
      ))}

      {/* plate */}
      <ellipse cx="100" cy="150" rx="68" ry="14" fill="#7c2d12" />
      <ellipse cx="100" cy="146" rx="58" ry="10" fill="#9a3412" />

      {/* fork */}
      <g stroke="#fde68a" strokeWidth="3.5" strokeLinecap="round" opacity="0.85">
        <line x1="32" y1="110" x2="32" y2="150" />
        <line x1="26" y1="98" x2="26" y2="115" />
        <line x1="32" y1="98" x2="32" y2="115" />
        <line x1="38" y1="98" x2="38" y2="115" />
      </g>
      {/* knife */}
      <path
        d="M168 98 L168 150 M168 98 C160 100 158 108 168 116"
        stroke="#fde68a"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.85"
      />

      {/* cloche dome */}
      <motion.g
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "100px 130px" }}
      >
        <path d="M38 128 Q38 52 100 52 Q162 52 162 128 Z" fill="#f97316" />
        <ellipse cx="72" cy="80" rx="18" ry="13" fill="#fb923c" opacity="0.55" />
        <rect x="93" y="38" width="14" height="12" rx="3" fill="#c2410c" />
        <circle cx="100" cy="34" r="8" fill="#c2410c" />
      </motion.g>
    </svg>
  </div>
);

const FashionIllustration = () => (
  <div className="relative flex h-full w-full items-center justify-center bg-[#1d0624] p-6">
    <svg className="h-full w-full max-w-[200px]" viewBox="0 0 200 200" fill="none">
      <motion.g
        animate={{ y: [-5, 5, -5] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* hook */}
        <path
          d="M100 18 C92 18 89 28 98 34"
          stroke="#f0abfc"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        {/* hanger bar */}
        <path
          d="M98 34 L150 62 Q156 65 150 68 L50 68 Q44 65 50 62 Z"
          stroke="#e879f9"
          strokeWidth="4"
          strokeLinejoin="round"
          fill="none"
        />

        {/* dress */}
        <path
          d="M64 70 L58 92 L70 100 L64 168 Q100 178 136 168 L130 100 L142 92 L136 70 Q118 82 100 82 Q82 82 64 70 Z"
          fill="#a855f7"
        />
        <path
          d="M64 70 L58 92 L70 100 L74 108 L80 76 Q71 74 64 70 Z"
          fill="#c084fc"
          opacity="0.55"
        />
        <path
          d="M100 82 Q88 82 78 76 Q88 92 100 92 Q112 92 122 76 Q112 82 100 82 Z"
          fill="#7e22ce"
          opacity="0.6"
        />
      </motion.g>

      {/* price tag */}
      <motion.g
        animate={{ rotate: [-6, 6, -6] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "138px 118px" }}
      >
        <line x1="132" y1="106" x2="138" y2="118" stroke="#f0abfc" strokeWidth="2" />
        <rect x="134" y="118" width="22" height="16" rx="4" fill="#e879f9" transform="rotate(20 134 118)" />
        <circle cx="139" cy="122" r="1.8" fill="#4a044e" transform="rotate(20 134 118)" />
      </motion.g>

      {/* sparkles */}
      {[
        { x: 46, y: 40, s: 1 },
        { x: 160, y: 100, s: 0.7 },
        { x: 40, y: 140, s: 0.8 },
      ].map((p, i) => (
        <motion.path
          key={i}
          d={`M${p.x} ${p.y - 6} L${p.x + 2} ${p.y - 2} L${p.x + 6} ${p.y} L${p.x + 2} ${p.y + 2} L${p.x} ${p.y + 6} L${p.x - 2} ${p.y + 2} L${p.x - 6} ${p.y} L${p.x - 2} ${p.y - 2} Z`}
          fill="#f5d0fe"
          animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.15, 0.8] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.6, ease: "easeInOut" }}
          style={{ transformOrigin: `${p.x}px ${p.y}px` }}
        />
      ))}
    </svg>
  </div>
);

const RetailIllustration = () => (
  <div className="relative flex h-full w-full items-center justify-center bg-[#0a0d24] p-6">
    <svg className="h-full w-full max-w-[200px]" viewBox="0 0 200 200" fill="none">
      <ellipse cx="100" cy="176" rx="46" ry="7" fill="#000000" opacity="0.3" />

      <motion.g
        animate={{ y: [-6, 6, -6], rotate: [-1.5, 1.5, -1.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "100px 90px" }}
      >
        {/* handles */}
        <path d="M72 82 Q72 48 100 48 Q128 48 128 82" stroke="#818cf8" strokeWidth="6" fill="none" strokeLinecap="round" />

        {/* bag body */}
        <path d="M58 82 L142 82 L152 168 Q152 176 144 176 L56 176 Q48 176 48 168 Z" fill="#4f46e5" />
        <rect x="58" y="80" width="84" height="16" rx="5" fill="#3730a3" />

        {/* barcode card */}
        <rect x="76" y="118" width="48" height="32" rx="5" fill="#eef2ff" />
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <rect
            key={i}
            x={81 + i * 5.5}
            y="124"
            width={i % 3 === 0 ? 2.4 : 1.4}
            height="20"
            fill="#4338ca"
          />
        ))}
      </motion.g>

      {/* scan beam */}
      <motion.line
        x1="66"
        y1="118"
        x2="134"
        y2="118"
        stroke="#ef4444"
        strokeWidth="3"
        className="drop-shadow-[0_0_12px_rgba(239,68,68,0.8)]"
        animate={{ y: [0, 32, 0], opacity: [0.9, 0.4, 0.9] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: [0.65, 0, 0.35, 1] }}
      />

      {/* tag */}
      <motion.g
        animate={{ rotate: [-5, 5, -5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "148px 96px" }}
      >
        <line x1="142" y1="86" x2="148" y2="96" stroke="#a5b4fc" strokeWidth="2" />
        <rect x="144" y="96" width="18" height="14" rx="4" fill="#818cf8" transform="rotate(18 144 96)" />
        <circle cx="149" cy="100" r="1.6" fill="#1e1b4b" transform="rotate(18 144 96)" />
      </motion.g>
    </svg>
  </div>
);

const ExpressIllustration = () => (
  <div className="relative flex h-full w-full items-center justify-center bg-[#24080d] p-6">
    <svg className="h-full w-full max-w-[200px]" viewBox="0 0 200 200" fill="none">
      <ellipse cx="94" cy="172" rx="42" ry="7" fill="#000000" opacity="0.3" />

      {/* speed lines */}
      {[-18, 0, 18].map((offset, i) => (
        <motion.line
          key={i}
          x1="10"
          y1={112 + offset}
          x2="46"
          y2={112 + offset}
          stroke="#ef4444"
          strokeWidth="3"
          strokeLinecap="round"
          animate={{ x: [-10, 16, -10], opacity: [0.1, 1, 0.1] }}
          transition={{ duration: 1.3 + i * 0.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
        />
      ))}

      {/* 3D box */}
      <motion.g
        animate={{ y: [-7, 7, -7] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* top face */}
        <path d="M100 58 L146 82 L100 106 L54 82 Z" fill="#fca5a5" />
        {/* left face */}
        <path d="M54 82 L100 106 L100 158 L54 134 Z" fill="#dc2626" />
        {/* right face */}
        <path d="M146 82 L100 106 L100 158 L146 134 Z" fill="#991b1b" />
        {/* tape */}
        <line x1="100" y1="106" x2="100" y2="158" stroke="#fecaca" strokeWidth="2.5" opacity="0.7" />
        <path d="M76 70 L76 122" stroke="#fecaca" strokeWidth="2.5" opacity="0.5" />
        {/* handling label */}
        <rect x="60" y="110" width="20" height="14" rx="2" fill="#fee2e2" opacity="0.9" transform="skewY(20)" />
      </motion.g>

      {/* GPS pin */}
      <motion.g
        animate={{ y: [-6, 4, -6] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M100 12 C86 12 78 24 78 36 C78 54 100 74 100 74 C100 74 122 54 122 36 C122 24 114 12 100 12 Z" fill="#f43f5e" />
        <circle cx="100" cy="36" r="9" fill="#ffe4e6" />
      </motion.g>

      {/* pulse arcs */}
      {[0, 1].map((i) => (
        <motion.circle
          key={i}
          cx="100"
          cy="36"
          r="14"
          stroke="#fda4af"
          strokeWidth="2"
          fill="none"
          animate={{ r: [14, 34], opacity: [0.6, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: i * 1.2, ease: "easeOut" }}
        />
      ))}
    </svg>
  </div>
);

interface ColorTheme {
  cardBg: string;
  cardBorder: string;
  cardHoverBorder: string;
  cardHoverGlow: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  numColor: string;
}

interface Value {
  title: string;
  description: string;
  badge: string;
  Illustration: React.FC;
  theme: ColorTheme;
}

const companyValues: Value[] = [
  {
    title: "Pharmacies & Health Outlets",
    description:
      "Deliver essential medications, prescriptions, and wellness products directly to patients' doorsteps with fast, careful, and priority dispatch riders.",
    badge: "Healthcare",
    Illustration: PharmacyIllustration,
    theme: {
      cardBg: "bg-[#04211b] hover:bg-[#08382e]",
      cardBorder: "border-emerald-500/20",
      cardHoverBorder: "hover:border-emerald-500/50",
      cardHoverGlow: "hover:shadow-[0_0_35px_rgba(16,185,129,0.12)]",
      badgeBg: "bg-[#02120f]",
      badgeBorder: "border-emerald-500/30",
      badgeText: "text-emerald-300",
      numColor: "text-emerald-400/70",
    },
  },
  {
    title: "Restaurants, Bars & Lounges",
    description:
      "Keep food piping hot and drinks perfectly chilled. Dispatch fresh meals, takeout orders, and drinks smoothly from your kitchen directly to your diners.",
    badge: "Food & Drinks",
    Illustration: RestaurantIllustration,
    theme: {
      cardBg: "bg-[#281304] hover:bg-[#401f07]",
      cardBorder: "border-amber-500/20",
      cardHoverBorder: "hover:border-amber-500/50",
      cardHoverGlow: "hover:shadow-[0_0_35px_rgba(245,158,11,0.12)]",
      badgeBg: "bg-[#140a02]",
      badgeBorder: "border-amber-500/30",
      badgeText: "text-amber-300",
      numColor: "text-amber-400/70",
    },
  },
  {
    title: "Boutiques & Fashion Brands",
    description:
      "Provide VIP same-day delivery for clothes, shoes, and accessories. Turn online orders into instant wardrobe upgrades with safe and swift handling.",
    badge: "Fashion & Retail",
    Illustration: FashionIllustration,
    theme: {
      cardBg: "bg-[#24082d] hover:bg-[#3a0d4a]",
      cardBorder: "border-fuchsia-500/20",
      cardHoverBorder: "hover:border-fuchsia-500/50",
      cardHoverGlow: "hover:shadow-[0_0_35px_rgba(217,70,239,0.12)]",
      badgeBg: "bg-[#120414]",
      badgeBorder: "border-fuchsia-500/30",
      badgeText: "text-fuchsia-300",
      numColor: "text-fuchsia-400/70",
    },
  },
  {
    title: "Retail Shops & Market Vendors",
    description:
      "Scale your store sales across the city without owning a fleet. From groceries to electronics, our riders pick up and deliver your customer orders instantly.",
    badge: "Supermarkets & Shops",
    Illustration: RetailIllustration,
    theme: {
      cardBg: "bg-[#0d1130] hover:bg-[#161c4f]",
      cardBorder: "border-indigo-500/20",
      cardHoverBorder: "hover:border-indigo-500/50",
      cardHoverGlow: "hover:shadow-[0_0_35px_rgba(99,102,241,0.12)]",
      badgeBg: "bg-[#060817]",
      badgeBorder: "border-indigo-500/30",
      badgeText: "text-indigo-300",
      numColor: "text-indigo-400/70",
    },
  },
  {
    title: "On-Demand Business Dispatch",
    description:
      "Send urgent business documents, inventory, or corporate packages across town with live GPS tracking, zero delays, and guaranteed peace of mind.",
    badge: "Corporate & Express",
    Illustration: ExpressIllustration,
    theme: {
      cardBg: "bg-[#2d0a10] hover:bg-[#4a111b]",
      cardBorder: "border-rose-500/20",
      cardHoverBorder: "hover:border-rose-500/50",
      cardHoverGlow: "hover:shadow-[0_0_35px_rgba(244,63,94,0.12)]",
      badgeBg: "bg-[#140407]",
      badgeBorder: "border-rose-500/30",
      badgeText: "text-rose-300",
      numColor: "text-rose-400/70",
    },
  },
];

// Typed Variants with 'as const' to fix Framer Motion TypeScript errors
const headerVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const gridVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 60, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const cardHover: TargetAndTransition = {
  y: -10,
  scale: 1.015,
  transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
};

const CoreValuesSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = 400;
      containerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      className="relative overflow-hidden bg-[#000] bg-cover bg-center bg-no-repeat py-24 font-['Lufga'] md:py-32"
      // style={{ backgroundImage: `url(${whatBg})` }}
    >
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          className="mb-16 flex items-end justify-between"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={headerVariants}
        >
          <div>
            <motion.span
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-4 inline-block text-xs font-bold uppercase tracking-[0.4em] text-red-500"
            >
              Built For Your Business
            </motion.span>
            <h2 className="text-5xl font-black tracking-tighter text-white md:text-7xl">
              Who Uses <span className="text-neutral-500">Pickars.</span>
            </h2>
          </div>

          <div className="hidden gap-3 md:flex">
            <motion.button
              onClick={() => scroll("left")}
              aria-label="Scroll Left"
              whileHover={{ scale: 1.08, backgroundColor: "#ffffff", color: "#000000" }}
              whileTap={{ scale: 0.92 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-white"
            >
              <FiChevronLeft size={24} />
            </motion.button>
            <motion.button
              onClick={() => scroll("right")}
              aria-label="Scroll Right"
              whileHover={{ scale: 1.08, backgroundColor: "#ffffff", color: "#000000" }}
              whileTap={{ scale: 0.92 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-white"
            >
              <FiChevronRight size={24} />
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          ref={containerRef}
          className="no-scrollbar flex gap-6 overflow-x-auto pb-10"
          style={{ scrollSnapType: "x mandatory" }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={gridVariants}
        >
          {companyValues.map((value, index) => {
            const Illustration = value.Illustration;
            const { theme } = value;

            return (
              <motion.div
                key={index}
                style={{ scrollSnapAlign: "start" }}
                variants={cardVariants}
                whileHover={cardHover}
                className={`group relative flex min-w-[320px] flex-col justify-between overflow-hidden rounded-[40px] border ${theme.cardBorder} ${theme.cardHoverBorder} ${theme.cardHoverGlow} ${theme.cardBg} p-6 transition-colors duration-500 md:min-w-[420px] md:p-8`}
              >
                <div>
                  <div className="relative mb-6 h-52 w-full overflow-hidden rounded-[28px] border border-white/10">
                    <div className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-105">
                      <Illustration />
                    </div>

                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                      <motion.span
                        initial={{ opacity: 0, y: -8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className={`rounded-full border ${theme.badgeBorder} ${theme.badgeBg} ${theme.badgeText} px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider`}
                      >
                        {value.badge}
                      </motion.span>
                      <span className={`text-xl font-black ${theme.numColor}`}>
                        0{index + 1}
                      </span>
                    </div>
                  </div>

                  <motion.h3
                    className="mb-3 text-2xl font-black leading-tight text-white md:text-3xl"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    {value.title}
                  </motion.h3>

                  <p className="text-sm leading-relaxed text-neutral-300">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default CoreValuesSection;