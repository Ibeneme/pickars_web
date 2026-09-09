import React from "react";

const portHarcourtLocations = [
  {
    id: "gra",
    name: "GRA Phase 2",
    top: "18%",
    left: "12%",
    badgeBg: "bg-purple-400",
    textColor: "text-black font-extrabold",
    dotColor: "bg-black",
    pinColor: "#a855f7",
    pinTop: "32%",
    pinLeft: "18%",
    showOnMobile: true,
  },
  {
    id: "rumuola",
    name: "Rumuola",
    top: "22%",
    left: "38%",
    badgeBg: "bg-emerald-400",
    textColor: "text-black font-extrabold",
    dotColor: "bg-black",
    pinColor: "#10b981",
    pinTop: "35%",
    pinLeft: "45%",
    showOnMobile: false,
  },
  {
    id: "peterodili",
    name: "Peter Odili",
    top: "15%",
    left: "78%",
    badgeBg: "bg-amber-400",
    textColor: "text-black font-extrabold",
    dotColor: "bg-black",
    pinColor: "#f59e0b",
    pinTop: "27%",
    pinLeft: "84%",
    showOnMobile: true,
  },
  {
    id: "woji",
    name: "Woji",
    top: "42%",
    left: "75%",
    badgeBg: "bg-emerald-700",
    textColor: "text-white font-extrabold",
    dotColor: "bg-amber-300",
    pinColor: "#047857",
    pinTop: "55%",
    pinLeft: "80%",
    showOnMobile: true,
  },
  {
    id: "ph-town",
    name: "Old GRA / Town",
    top: "48%",
    left: "44%",
    badgeBg: "bg-sky-400",
    textColor: "text-black font-extrabold",
    dotColor: "bg-amber-700",
    pinColor: "#38bdf8",
    pinTop: "60%",
    pinLeft: "49%",
    showOnMobile: true,
  },
  {
    id: "ada-george",
    name: "Ada George",
    top: "52%",
    left: "10%",
    badgeBg: "bg-amber-100",
    textColor: "text-black font-bold",
    dotColor: "bg-amber-600",
    pinColor: "#fde68a",
    pinTop: "64%",
    pinLeft: "16%",
    showOnMobile: false,
  },
  {
    id: "ikwerre-rd",
    name: "Ikwerre Road",
    top: "76%",
    left: "20%",
    badgeBg: "bg-orange-500",
    textColor: "text-black font-extrabold",
    dotColor: "bg-sky-300",
    pinColor: "#f97316",
    pinTop: "88%",
    pinLeft: "25%",
    showOnMobile: true,
  },
  {
    id: "unipor",
    name: "Choba / UniPort",
    top: "86%",
    left: "55%",
    badgeBg: "bg-teal-100",
    textColor: "text-black font-extrabold",
    dotColor: "bg-amber-800",
    pinColor: "#99f6e4",
    pinTop: "96%",
    pinLeft: "58%",
    showOnMobile: false,
  },
  {
    id: "eleme",
    name: "Eleme Junction",
    top: "74%",
    left: "74%",
    badgeBg: "bg-pink-300",
    textColor: "text-black font-extrabold",
    dotColor: "bg-purple-900",
    pinColor: "#f472b6",
    pinTop: "86%",
    pinLeft: "79%",
    showOnMobile: false,
  },
];

const RIDER_PATH = "M -100 350 C 200 50, 300 650, 600 350 S 900 50, 1150 350";

function DeliveryRider() {
  return (
    <g>
      <ellipse cx="70" cy="58" rx="46" ry="10" fill="#1f1f1f" opacity="0.18" />
      <circle
        cx="22"
        cy="45"
        r="9"
        fill="#1f1f1f"
        stroke="#1f1f1f"
        strokeWidth="1.5"
      />
      <circle
        cx="118"
        cy="45"
        r="9"
        fill="#1f1f1f"
        stroke="#1f1f1f"
        strokeWidth="1.5"
      />
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
      <g>
        <rect
          x="24"
          y="27"
          width="30"
          height="34"
          rx="7"
          fill="#e11d2e"
          stroke="#e11d2e"
          strokeWidth="2"
        />
        <path
          d="M 41 34 L 33 47 L 39 47 L 37 55 L 46 41 L 40 41 Z"
          fill="#ffffff"
        />
      </g>
      <ellipse
        cx="66"
        cy="45"
        rx="21"
        ry="15"
        fill="#111111"
        stroke="#111111"
        strokeWidth="1.5"
      />
      <path
        d="M 72 38 Q 95 30 112 32"
        stroke="#111111"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 72 52 Q 95 60 112 58"
        stroke="#111111"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      <circle
        cx="112"
        cy="32"
        r="5"
        fill="#111111"
        stroke="#111111"
        strokeWidth="1.5"
      />
      <circle
        cx="112"
        cy="58"
        r="5"
        fill="#111111"
        stroke="#111111"
        strokeWidth="1.5"
      />
      <circle
        cx="80"
        cy="45"
        r="12"
        fill="#e11d2e"
        stroke="#e11d2e"
        strokeWidth="2"
      />
      <circle cx="86" cy="45" r="6" fill="#e11d2e" opacity="0.85" />
      <g opacity="0.55">
        <line
          x1="-4"
          y1="38"
          x2="10"
          y2="38"
          stroke="#ff0000"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="-10"
          y1="45"
          x2="6"
          y2="45"
          stroke="#ff0000"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="-4"
          y1="52"
          x2="10"
          y2="52"
          stroke="#ff0000"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>
    </g>
  );
}

export default function PortHarcourtMapComponent() {
  return (
    <div className="relative w-full aspect-[4/5] sm:aspect-[4/3] md:aspect-[16/9] min-h-[420px] max-h-[750px] bg-[#FBE3E3] overflow-hidden rounded-xl md:rounded-3xl border-2 sm:border-4 border-black font-sans select-none">
      <style>{`
        @keyframes popIn {
          0% { opacity: 0; transform: scale(0) translateY(15px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .map-element {
          opacity: 0;
          animation: popIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        @keyframes pinBob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .pin-bob { animation: pinBob 2.4s ease-in-out infinite; }
      `}</style>

      {/* Background greenery spots */}
      <div className="absolute -top-12 -right-12 w-40 h-40 sm:w-64 sm:h-64 bg-[#22c55e] rounded-full border-2 sm:border-4 border-black z-0 opacity-90" />
      <div className="absolute -bottom-16 -right-16 w-48 h-48 sm:w-80 sm:h-80 bg-[#22c55e] rounded-tl-full border-2 sm:border-4 border-black z-0 opacity-90" />
      <div className="absolute -bottom-12 -left-12 w-40 h-40 sm:w-64 sm:h-64 bg-[#22c55e] rounded-full border-2 sm:border-4 border-black z-0 opacity-90" />

      {/* Map Paths */}
      <svg
        className="absolute inset-0 w-full h-full z-10"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 700"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Secondary dark bypass roads */}
        <path
          d="M 120 0 L 120 700"
          stroke="#3D0000"
          strokeWidth="24"
          strokeLinecap="round"
        />
        <path
          d="M 380 0 L 360 700"
          stroke="#3D0000"
          strokeWidth="18"
          strokeLinecap="round"
        />
        <path
          d="M 700 0 L 720 700"
          stroke="#3D0000"
          strokeWidth="22"
          strokeLinecap="round"
        />

        {/* Straight Horizontal Main Road across screen */}
        <path
          d="M 0 350 L 1000 350"
          stroke="#FFBFBF"
          strokeWidth="26"
          strokeLinecap="round"
        />

        {/* Primary arterial roads */}
        <path
          d={RIDER_PATH}
          stroke="#FFBFBF"
          strokeWidth="28"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 0 620 Q 350 580 1000 820"
          stroke="#FFBFBF"
          strokeWidth="26"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 100 0 L 140 700"
          stroke="#FFBFBF"
          strokeWidth="22"
          strokeLinecap="round"
        />
        <path
          d="M 560 0 L 530 700"
          stroke="#FFBFBF"
          strokeWidth="22"
          strokeLinecap="round"
        />

        <g transform="translate(-70,-45)">
          <DeliveryRider />
          <animateMotion
            dur="8s"
            repeatCount="indefinite"
            keyPoints="0;1"
            keyTimes="0;1"
            calcMode="linear"
            rotate="auto"
            path={RIDER_PATH}
          />
        </g>
      </svg>

      {/* Location pins and tickets */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {portHarcourtLocations.map((loc, i) => (
          <React.Fragment key={loc.id}>
            {/* Map Pin */}
            <div
              className={`map-element pin-bob absolute -translate-x-1/2 pointer-events-auto transition-transform hover:scale-125 cursor-pointer ${
                loc.showOnMobile ? "block" : "hidden md:block"
              }`}
              style={{
                top: loc.pinTop,
                left: loc.pinLeft,
                animationDelay: `${i * 0.08}s`,
              }}
            >
              <svg
                className="w-5 h-5 sm:w-7 sm:h-7"
                viewBox="0 0 24 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 0C5.373 0 0 5.373 0 12c0 8.25 12 20 12 20s12-11.75 12-20c0-6.627-5.373-12-12-12z"
                  fill={loc.pinColor}
                  stroke="#000000"
                  strokeWidth="2"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="4.5"
                  fill="#ffffff"
                  stroke="#000000"
                  strokeWidth="2"
                />
              </svg>
            </div>

            {/* Ticket Label */}
            <div
              className={`map-element absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto items-center w-max px-2 py-1 sm:px-3 sm:py-1.5 cursor-pointer hover:scale-110 transition-all border-2 sm:border-[3px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-[-12deg] ${
                loc.badgeBg
              } ${loc.showOnMobile ? "inline-flex" : "hidden md:inline-flex"}`}
              style={{
                top: loc.top,
                left: loc.left,
                animationDelay: `${i * 0.08}s`,
              }}
            >
              <div
                className="absolute -left-[5px] sm:-left-[7px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full border-2 sm:border-[3px] border-black"
                style={{
                  background:
                    "radial-gradient(circle at center, transparent 40%, black 41%, black 100%)",
                  backgroundColor: "#fceceb",
                }}
              />

              <div className="flex items-center space-x-1 sm:space-x-2">
                <span
                  className={`w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 rounded-full border sm:border-2 border-black shrink-0 ${loc.dotColor}`}
                />
                <span
                  className={`${loc.textColor} font-black uppercase text-[9px] sm:text-xs tracking-wide whitespace-nowrap`}
                >
                  {loc.name}
                </span>
              </div>

              <div className="flex items-center space-x-1 sm:space-x-1.5 ml-1.5 pl-1.5 sm:ml-2.5 sm:pl-2.5 border-l-2 border-dashed border-black/40">
                <span className="text-[8px] sm:text-[10px] font-black opacity-60 uppercase tracking-tighter">
                  PH
                </span>
              </div>

              <div
                className="absolute -right-[5px] sm:-right-[7px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full border-2 sm:border-[3px] border-black"
                style={{
                  background:
                    "radial-gradient(circle at center, transparent 40%, black 41%, black 100%)",
                  backgroundColor: "#fceceb",
                }}
              />
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* Legend / Branding */}
      <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 bg-white/90 backdrop-blur-sm border sm:border-2 border-black px-2 py-1 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl z-30 flex items-center space-x-1.5 sm:space-x-2">
        <span className="w-2 h-2 sm:w-3 sm:h-3 bg-red-600 rounded-full border border-black animate-ping" />
        <span className="text-[9px] sm:text-xs font-black tracking-wider text-black uppercase">
          Port Harcourt Logistics Network
        </span>
      </div>
    </div>
  );
}
