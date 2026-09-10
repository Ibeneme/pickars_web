import  { useState, useEffect } from "react";

const towns = [
  { id: "gra", name: "GRA", top: "12%", left: "18%", color: "#a855f7" },
  { id: "rumuola", name: "Rumuola", top: "22%", left: "42%", color: "#10b981" },
  {
    id: "peterodili",
    name: "Peter Odili",
    top: "15%",
    left: "72%",
    color: "#f59e0b",
  },
  { id: "woji", name: "Woji", top: "48%", left: "78%", color: "#047857" },
  { id: "oldgra", name: "Old GRA", top: "52%", left: "48%", color: "#38bdf8" },
  {
    id: "adageorge",
    name: "Ada George",
    top: "58%",
    left: "14%",
    color: "#fbbf24",
  },
  {
    id: "ikwerre",
    name: "Ikwerre Rd",
    top: "78%",
    left: "28%",
    color: "#f97316",
  },
  { id: "choba", name: "Choba", top: "82%", left: "58%", color: "#14b8a6" },
  { id: "eleme", name: "Eleme", top: "70%", left: "82%", color: "#ec4899" },
];

const RIDER_PATH = "M 80 420 C 220 180, 380 520, 520 280 S 720 120, 860 320";

function PackageIcon() {
  return (
    <g>
      <rect
        x="0"
        y="0"
        width="28"
        height="22"
        rx="3"
        fill="#f59e0b"
        stroke="#000"
        strokeWidth="2"
      />
      <path d="M 0 8 H 28" stroke="#000" strokeWidth="1.5" />
      <path d="M 14 0 V 22" stroke="#000" strokeWidth="1.5" />
      <rect
        x="8"
        y="11"
        width="12"
        height="6"
        rx="1"
        fill="#fff"
        stroke="#000"
        strokeWidth="1"
      />
    </g>
  );
}

function PersonComingOut({ active }: any) {
  return (
    <g
      style={{
        opacity: active ? 1 : 0,
        transform: active ? "translateX(0)" : "translateX(-20px)",
        transition: "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
    >
      {/* Body */}
      <circle
        cx="0"
        cy="-18"
        r="9"
        fill="#fcd34d"
        stroke="#000"
        strokeWidth="2"
      />
      <rect
        x="-10"
        y="-8"
        width="20"
        height="26"
        rx="6"
        fill="#3b82f6"
        stroke="#000"
        strokeWidth="2"
      />
      {/* Arms reaching */}
      <path
        d="M -10 2 Q -22 8 -18 16"
        stroke="#000"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 10 2 Q 24 6 22 18"
        stroke="#000"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      {/* Legs */}
      <path
        d="M -5 18 L -8 32"
        stroke="#000"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M 5 18 L 8 32"
        stroke="#000"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </g>
  );
}

function PickupRider() {
  return (
    <g>
      {/* Shadow */}
      <ellipse cx="58" cy="52" rx="42" ry="8" fill="#000" opacity="0.15" />
      {/* Wheels */}
      <circle
        cx="18"
        cy="42"
        r="10"
        fill="#1f1f1f"
        stroke="#000"
        strokeWidth="2"
      />
      <circle
        cx="98"
        cy="42"
        r="10"
        fill="#1f1f1f"
        stroke="#000"
        strokeWidth="2"
      />
      {/* Frame */}
      <rect
        x="14"
        y="36"
        width="88"
        height="12"
        rx="6"
        fill="#222"
        stroke="#000"
        strokeWidth="2"
      />
      {/* Delivery box */}
      <rect
        x="22"
        y="14"
        width="32"
        height="30"
        rx="5"
        fill="#ef4444"
        stroke="#000"
        strokeWidth="2.5"
      />
      <path d="M 38 20 L 30 32 L 36 32 L 34 40 L 44 26 L 38 26 Z" fill="#fff" />
      {/* Rider body */}
      <ellipse
        cx="62"
        cy="38"
        rx="18"
        ry="14"
        fill="#111"
        stroke="#000"
        strokeWidth="1.5"
      />
      {/* Handlebars */}
      <path
        d="M 68 32 Q 88 26 102 28"
        stroke="#111"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 68 44 Q 88 50 102 48"
        stroke="#111"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="102" cy="28" r="4" fill="#111" />
      <circle cx="102" cy="48" r="4" fill="#111" />
      {/* Helmet */}
      <circle
        cx="74"
        cy="38"
        r="11"
        fill="#ef4444"
        stroke="#000"
        strokeWidth="2"
      />
      <circle cx="78" cy="38" r="5" fill="#ef4444" opacity="0.8" />
      {/* Speed lines */}
      <g opacity="0.5">
        <line
          x1="-8"
          y1="32"
          x2="6"
          y2="32"
          stroke="#ef4444"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <line
          x1="-14"
          y1="40"
          x2="2"
          y2="40"
          stroke="#ef4444"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <line
          x1="-8"
          y1="48"
          x2="6"
          y2="48"
          stroke="#ef4444"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </g>
    </g>
  );
}

export default function PortHarcourtPickupScene() {
  const [phase, setPhase] = useState("riding"); // riding → arrived → handover → done

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase("arrived"), 6500),
      setTimeout(() => setPhase("handover"), 7800),
      setTimeout(() => setPhase("done"), 9800),
      setTimeout(() => setPhase("riding"), 12500), // loop
    ];
    return () => timers.forEach(clearTimeout);
  }, [phase === "riding"]);

  return (
    <div className="relative w-full aspect-[4/5] sm:aspect-[4/3] md:aspect-[16/9] min-h-[440px] max-h-[760px] bg-[#FFF5F0] overflow-hidden rounded-2xl md:rounded-3xl border-[3px] sm:border-4 border-black font-sans select-none shadow-[6px_6px_0_0_#000]">
      <style>{`
        @keyframes dashMove {
          to { stroke-dashoffset: -40; }
        }
        @keyframes roadPulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        @keyframes popIn {
          0% { opacity: 0; transform: scale(0.6) translateY(12px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes floatLabel {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .road-dash {
          stroke-dasharray: 12 10;
          animation: dashMove 0.8s linear infinite;
        }
        .map-pop {
          opacity: 0;
          animation: popIn 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .float-label {
          animation: floatLabel 2.8s ease-in-out infinite;
        }
      `}</style>

      {/* Soft background blobs */}
      <div className="absolute -top-16 -right-10 w-52 h-52 bg-[#86efac] rounded-full border-4 border-black opacity-80" />
      <div className="absolute -bottom-20 -left-14 w-64 h-64 bg-[#fde68a] rounded-full border-4 border-black opacity-70" />
      <div className="absolute top-1/3 -left-20 w-40 h-40 bg-[#fda4af] rounded-full border-4 border-black opacity-60" />

      {/* SVG Map + Animation Layer */}
      <svg
        className="absolute inset-0 w-full h-full z-10"
        viewBox="0 0 1000 700"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Moving arterial roads */}
        <path
          d="M 0 320 L 1000 320"
          stroke="#fecaca"
          strokeWidth="32"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 0 320 L 1000 320"
          stroke="#ef4444"
          strokeWidth="4"
          className="road-dash"
          fill="none"
        />

        <path
          d={RIDER_PATH}
          stroke="#fecaca"
          strokeWidth="30"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d={RIDER_PATH}
          stroke="#ef4444"
          strokeWidth="3.5"
          className="road-dash"
          fill="none"
        />

        {/* Secondary roads */}
        <path
          d="M 180 0 L 160 700"
          stroke="#fca5a5"
          strokeWidth="18"
          strokeLinecap="round"
        />
        <path
          d="M 520 0 L 540 700"
          stroke="#fca5a5"
          strokeWidth="16"
          strokeLinecap="round"
        />
        <path
          d="M 780 0 L 760 700"
          stroke="#fca5a5"
          strokeWidth="20"
          strokeLinecap="round"
        />
        <path
          d="M 0 540 Q 400 480 1000 620"
          stroke="#fca5a5"
          strokeWidth="22"
          strokeLinecap="round"
          fill="none"
        />

        {/* Destination house */}
        <g transform="translate(840, 280)">
          <rect
            x="-28"
            y="-10"
            width="56"
            height="48"
            rx="4"
            fill="#fff"
            stroke="#000"
            strokeWidth="3"
          />
          <path
            d="M -34 -10 L 0 -42 L 34 -10 Z"
            fill="#ef4444"
            stroke="#000"
            strokeWidth="3"
          />
          <rect
            x="-8"
            y="12"
            width="16"
            height="26"
            fill="#3b82f6"
            stroke="#000"
            strokeWidth="2"
          />
          <rect
            x="-20"
            y="4"
            width="12"
            height="12"
            fill="#fde68a"
            stroke="#000"
            strokeWidth="1.5"
          />
          <rect
            x="8"
            y="4"
            width="12"
            height="12"
            fill="#fde68a"
            stroke="#000"
            strokeWidth="1.5"
          />
        </g>

        {/* Person coming out of house */}
        <g transform="translate(800, 310)">
          <PersonComingOut active={phase === "handover" || phase === "done"} />
        </g>

        {/* Package that appears during handover */}
        {(phase === "handover" || phase === "done") && (
          <g
            transform="translate(780, 300)"
            style={{ transition: "all 0.4s ease" }}
          >
            <PackageIcon />
          </g>
        )}

        {/* Rider */}
        <g transform="translate(-55, -40)">
          <PickupRider />
          <animateMotion
            dur="7s"
            repeatCount="indefinite"
            keyPoints="0;1"
            keyTimes="0;1"
            calcMode="linear"
            rotate="auto"
            path={RIDER_PATH}
          />
        </g>
      </svg>

      {/* Town labels */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {towns.map((t, i) => (
          <div
            key={t.id}
            className="map-pop absolute -translate-x-1/2 -translate-y-1/2 float-label"
            style={{
              top: t.top,
              left: t.left,
              animationDelay: `${i * 0.07}s`,
            }}
          >
            <div
              className="px-2.5 py-1 rounded-full border-[2.5px] border-black shadow-[3px_3px_0_0_#000] text-[10px] sm:text-xs font-black uppercase tracking-wide whitespace-nowrap"
              style={{ backgroundColor: t.color, color: "#000" }}
            >
              {t.name}
            </div>
          </div>
        ))}
      </div>

      {/* Goal banner */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-30 w-[92%] sm:w-auto max-w-lg">
        <div className="bg-[#ef4444] text-white border-[3px] border-black rounded-xl px-4 py-2.5 sm:px-6 sm:py-3 shadow-[4px_4px_0_0_#000] flex items-center gap-3 justify-center">
          <span className="text-xl sm:text-2xl">⏱</span>
          <div className="text-center">
            <p className="text-[11px] sm:text-xs font-bold uppercase tracking-widest opacity-90">
              Our Goal
            </p>
            <p className="text-sm sm:text-base font-black leading-tight">
              Pickup in max 40 mins for dispatch
            </p>
          </div>
        </div>
      </div>

      {/* Status pill */}
      <div className="absolute bottom-3 left-3 sm:bottom-5 sm:left-5 z-30">
        <div className="bg-white border-[2.5px] border-black rounded-full px-3 py-1.5 sm:px-4 sm:py-2 shadow-[3px_3px_0_0_#000] flex items-center gap-2">
          <span
            className={`w-2.5 h-2.5 rounded-full border border-black ${
              phase === "done" ? "bg-emerald-500" : "bg-red-500 animate-pulse"
            }`}
          />
          <span className="text-[10px] sm:text-xs font-black uppercase tracking-wide text-black">
            {phase === "riding" && "Rider en route…"}
            {phase === "arrived" && "Arrived at location"}
            {phase === "handover" && "Customer collecting package"}
            {phase === "done" && "Pickup complete ✓"}
          </span>
        </div>
      </div>

      {/* Branding */}
      <div className="absolute bottom-3 right-3 sm:bottom-5 sm:right-5 z-30">
        <div className="bg-black text-white text-[9px] sm:text-[11px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border-2 border-black">
          PH Fast Pickup Network
        </div>
      </div>
    </div>
  );
}
