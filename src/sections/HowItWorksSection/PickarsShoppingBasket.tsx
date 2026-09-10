import React from "react";
import { motion } from "framer-motion";

/**
 * PickarsRefinedBounceCarousel Component
 * Features vector illustrations scrolling seamlessly in an endless loop with
 * increased element size, closer spacing, transparent background, zero shadows,
 * and slowed down, gentle floating animations.
 */
const PickarsRefinedBounceCarousel: React.FC = () => {
  // Array of illustration SVGs/JSX elements (Massive sizing)
  const items = [
    // 1. Paper Delivery Bag with location tags
    <svg
      viewBox="0 0 450 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto"
    >
      <path
        d="M 110 130 L 340 130 L 360 380 L 90 380 Z"
        fill="#D4A373"
        stroke="#BC6C25"
        strokeWidth="4"
      />
      <path
        d="M 95 105 L 355 105 L 340 130 L 110 130 Z"
        fill="#CCD5AE"
        stroke="#BC6C25"
        strokeWidth="3.5"
      />
      <path
        d="M 110 130 L 340 130"
        stroke="#9A5317"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M 130 170 L 320 170"
        stroke="#BC6C25"
        strokeWidth="2"
        strokeDasharray="8 6"
        opacity="0.6"
      />
      <path
        d="M 115 270 L 335 270"
        stroke="#BC6C25"
        strokeWidth="2"
        strokeDasharray="10 8"
        opacity="0.6"
      />
      <path
        d="M 340 130 L 385 155 L 395 365 L 360 380 Z"
        fill="#B08968"
        stroke="#9A5317"
        strokeWidth="3"
      />
      <g transform="translate(270, 70)">
        <rect
          width="110"
          height="42"
          rx="21"
          fill="#FACC15"
          stroke="#EAB308"
          strokeWidth="2"
        />
        <text
          x="55"
          y="26"
          fill="#18181B"
          fontSize="15"
          fontWeight="bold"
          textAnchor="middle"
          fontFamily="sans-serif"
        >
          {" "}
          Choba{" "}
        </text>
      </g>
      <g transform="translate(20, 160)">
        <rect
          width="130"
          height="42"
          rx="21"
          fill="#E9D5FF"
          stroke="#C084FC"
          strokeWidth="2"
        />
        <text
          x="65"
          y="26"
          fill="#581C87"
          fontSize="15"
          fontWeight="bold"
          textAnchor="middle"
          fontFamily="sans-serif"
        >
          {" "}
          Borikiri{" "}
        </text>
      </g>
      <g transform="translate(280, 220)">
        <rect
          width="145"
          height="42"
          rx="21"
          fill="#FED7AA"
          stroke="#FB923C"
          strokeWidth="2"
        />
        <text
          x="72"
          y="26"
          fill="#7C2D12"
          fontSize="14"
          fontWeight="bold"
          textAnchor="middle"
          fontFamily="sans-serif"
        >
          {" "}
          Rumu-Okoro{" "}
        </text>
      </g>
      <g transform="translate(15, 310)">
        <rect
          width="145"
          height="42"
          rx="21"
          fill="#EF4444"
          stroke="#DC2626"
          strokeWidth="2"
        />
        <text
          x="72"
          y="26"
          fill="#FFFFFF"
          fontSize="14"
          fontWeight="bold"
          textAnchor="middle"
          fontFamily="sans-serif"
        >
          {" "}
          Ada George{" "}
        </text>
      </g>
    </svg>,

    // 2. Red Basket with Groceries
    <svg
      viewBox="0 0 500 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto"
    >
      <path
        d="M 110 135 L 130 30 L 370 30 L 390 135"
        stroke="#FCA5A5"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M 130 150 Q 150 70 210 80 Q 270 90 280 160 Z" fill="#E11D48" />
      <path d="M 145 140 Q 160 85 205 95 Q 255 105 265 150 Z" fill="#FB7185" />
      <rect x="220" y="85" width="140" height="105" rx="25" fill="#9F1239" />
      <path
        d="M 220 125 L 360 125"
        stroke="#881337"
        strokeWidth="4"
        opacity="0.6"
      />
      <path d="M 255 85 L 295 35 L 335 85 Z" fill="#FFF1F2" opacity="0.95" />
      <rect x="280" y="80" width="30" height="10" rx="3" fill="#BE123C" />
      <circle cx="160" cy="130" r="26" fill="#DC2626" />
      <path
        d="M 160 104 C 158 98 162 94 165 94"
        stroke="#7F1D1D"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="205" cy="120" r="24" fill="#16A34A" />
      <path
        d="M 205 96 C 203 92 207 88 210 88"
        stroke="#14532D"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="185" cy="95" r="22" fill="#EAB308" />
      <path
        d="M 185 73 C 183 69 187 65 190 65"
        stroke="#713F12"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <g transform="translate(260, 100)">
        <path
          d="M 30 -10 Q 15 -20 5 -5"
          stroke="#15803D"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        <path d="M 5 -5 Q -5 -15 -10 -5 Q -5 5 5 -5 Z" fill="#22C55E" />
        <circle cx="20" cy="0" r="10" fill="#8B5CF6" />
        <circle cx="35" cy="5" r="10" fill="#7C3AED" />
        <circle cx="10" cy="10" r="10" fill="#9333EA" />
        <circle cx="25" cy="15" r="10" fill="#6D28D9" />
        <circle cx="40" cy="15" r="10" fill="#7C3AED" />
        <circle cx="15" cy="25" r="10" fill="#7C3AED" />
        <circle cx="30" cy="27" r="10" fill="#6D28D9" />
        <circle cx="22" cy="38" r="9" fill="#5B21B6" />
      </g>
      <g transform="translate(130, 160)">
        <rect x="15" y="15" width="32" height="70" rx="14" fill="#15803D" />
        <ellipse cx="31" cy="15" rx="16" ry="6" fill="#86EFAC" />
        <circle cx="75" cy="45" r="32" fill="#FACC15" />
        <path
          d="M 75 13 C 73 8 77 4 80 4"
          stroke="#713F12"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <circle cx="130" cy="35" r="28" fill="#BE123C" />
        <path
          d="M 130 7 C 128 3 132 0 135 0"
          stroke="#7F1D1D"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <rect x="95" y="30" width="35" height="60" rx="10" fill="#881337" />
      </g>
      <path
        d="M 90 160 L 410 160 L 380 320 L 120 320 Z"
        fill="#DC2626"
        stroke="#B91C1C"
        strokeWidth="4"
      />
      <path
        d="M 75 140 Q 250 120 425 140 L 400 175 L 100 175 Z"
        fill="#EF4444"
      />
      <g fill="#7F1D1D" opacity="0.9">
        {[135, 160, 185, 210, 235, 260, 285, 310, 335].map((x, i) => (
          <rect key={i} x={x} y="180" width="10" height="120" rx="4" />
        ))}
      </g>
    </svg>,

    // 3. Gourmet Burger
    <svg
      viewBox="0 0 450 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto ml-[-120px] mr-[-120px]"
      
    >
      <g transform="translate(15, 10)">
        <path d="M 110 180 Q 225 60 340 180 Z" fill="#D97706" />
        <path d="M 125 160 Q 225 80 325 160 Z" fill="#FBBF24" />
        <ellipse cx="180" cy="130" rx="5" ry="3" fill="#FEF3C7" />
        <ellipse cx="220" cy="110" rx="5" ry="3" fill="#FEF3C7" />
        <ellipse cx="270" cy="135" rx="5" ry="3" fill="#FEF3C7" />
        <path
          d="M 95 185 L 355 185 L 370 210 L 330 220 L 290 205 L 230 225 L 170 205 L 120 220 L 95 185 Z"
          fill="#F59E0B"
        />
        <rect x="90" y="215" width="270" height="45" rx="16" fill="#78350F" />
        <rect
          x="100"
          y="225"
          width="250"
          height="15"
          rx="6"
          fill="#92400E"
          opacity="0.6"
        />
        <path
          d="M 95 260 Q 140 275 185 260 Q 230 245 275 260 Q 320 275 355 260 L 360 275 L 90 275 Z"
          fill="#16A34A"
        />
        <rect x="105" y="275" width="240" height="25" rx="8" fill="#DC2626" />
        <path
          d="M 95 300 L 355 300 Q 365 355 225 355 Q 85 355 95 300 Z"
          fill="#D97706"
        />
        <path
          d="M 110 300 L 340 300 Q 345 340 225 340 Q 105 340 110 300 Z"
          fill="#FBBF24"
        />
      </g>
    </svg>,

    // 4. Green Produce Basket
    <svg
      viewBox="0 0 500 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto"
    >
      <path
        d="M 110 135 L 130 30 L 370 30 L 390 135"
        stroke="#86EFAC"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M 130 150 Q 150 70 210 80 Q 270 90 280 160 Z" fill="#15803D" />
      <path d="M 145 140 Q 160 85 205 95 Q 255 105 265 150 Z" fill="#22C55E" />
      <rect x="220" y="85" width="140" height="105" rx="25" fill="#166534" />
      <path
        d="M 220 125 L 360 125"
        stroke="#14532D"
        strokeWidth="4"
        opacity="0.6"
      />
      <path d="M 255 85 L 295 35 L 335 85 Z" fill="#F0FDF4" opacity="0.95" />
      <rect x="280" y="80" width="30" height="10" rx="3" fill="#15803D" />
      <circle cx="160" cy="130" r="26" fill="#16A34A" />
      <path
        d="M 160 104 C 158 98 162 94 165 94"
        stroke="#14532D"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="205" cy="120" r="24" fill="#4ADE80" />
      <path
        d="M 205 96 C 203 92 207 88 210 88"
        stroke="#14532D"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="185" cy="95" r="22" fill="#86EFAC" />
      <path
        d="M 185 73 C 183 69 187 65 190 65"
        stroke="#14532D"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <g transform="translate(130, 160)">
        <rect x="15" y="15" width="32" height="70" rx="14" fill="#14532D" />
        <ellipse cx="31" cy="15" rx="16" ry="6" fill="#BBF7D0" />
        <circle cx="75" cy="45" r="32" fill="#22C55E" />
        <path
          d="M 75 13 C 73 8 77 4 80 4"
          stroke="#14532D"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <circle cx="130" cy="35" r="28" fill="#15803D" />
        <path
          d="M 130 7 C 128 3 132 0 135 0"
          stroke="#14532D"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <rect x="95" y="30" width="35" height="60" rx="10" fill="#166534" />
      </g>
      <path
        d="M 90 160 L 410 160 L 380 320 L 120 320 Z"
        fill="#16A34A"
        stroke="#15803D"
        strokeWidth="4"
      />
      <path
        d="M 75 140 Q 250 120 425 140 L 400 175 L 100 175 Z"
        fill="#22C55E"
      />
      <g fill="#14532D" opacity="0.9">
        {[135, 160, 185, 210, 235, 260, 285, 310, 335].map((x, i) => (
          <rect key={i} x={x} y="180" width="10" height="120" rx="4" />
        ))}
      </g>
    </svg>,
  ];

  // Duplicate items array for seamless looping
  const duplicatedItems = [...items, ...items];

  return (
    <div className="w-full bg-transparent py-20 overflow-hidden relative select-none">
      {/* Infinite Scrolling Track with 10px gap on mobile */}
      <div className="flex overflow-hidden w-full items-center">
        <motion.div
          className="flex items-center flex-shrink-0"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            duration: 24, // Slower marquee scroll speed
            ease: "linear",
          }}
        >
          {duplicatedItems.map((svgElement, index) => (
            <motion.div
              key={index}
              animate={{
                y: [0, -12, 0], // Gentler, smoother bounce height
              }}
              transition={{
                duration: 3.5, // Slower float/bounce duration
                repeat: Infinity,
                ease: "easeInOut",
                delay: (index % items.length) * 0.4,
              }}
              whileHover={{ scale: 1.08 }}
              className="min-w-[300px] md:w-[300px] flex-shrink-0 flex items-center justify-center cursor-pointer"
            >
              {svgElement}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default PickarsRefinedBounceCarousel;
