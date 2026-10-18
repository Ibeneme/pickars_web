"use client";

import React, { memo, useEffect, useState } from "react";
import DownloadButtons from "@/components/atoms/buttons/DownloadButtons";

/* ------------------------------------------------------------------ */
/*  Theme: red / black / white                                         */
/* ------------------------------------------------------------------ */
const RED = "#ffeeee";
const BG = RED;

const VB_W = 1262;
const VB_H = 1006;

/* cloud bumps */
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

/* width of one cloud strip: the tiles repeat every 1600 units so the loop is seamless */
const STRIP = 1600;

/* slides shown in the card with expanded text */
const SLIDES = [
  {
    title: "Doorstep Deliveries.",
    text: "Experience the smartest, most seamless way to send and receive packages across every corner of Port Harcourt. Fast, ultra-secure, and purpose-built for your everyday logistics needs.",
  },
  {
    title: "Quick pickups.",
    text: "Our dedicated professional dispatch riders collect your packages promptly and get them straight to the destination door with zero delays, ensuring nothing ever sits around waiting.",
  },
  {
    title: "Deliveries, door to door.",
    text: "Every single package is handled with the utmost care and professional precision from the exact moment of pickup until it is safely signed for and handed over.",
  },
  {
    title: "Built for everyone.",
    text: "Whether you are sending a heartfelt gift to a loved one, running a growing local storefront, or managing e-commerce sales from home, Pickars delivers excellence every time.",
  },
];

const CSS = `
@keyframes rd-bob   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
@keyframes rd-glint { 0%,100%{opacity:.55} 50%{opacity:1} }
@keyframes rd-pulse { 0%,100%{opacity:.35} 50%{opacity:.6} }
@keyframes rd-arm   { 0%,100%{transform:translateY(0) rotate(-1.5deg)} 50%{transform:translateY(-6px) rotate(2deg)} }
@keyframes rd-swing { 0%,100%{transform:rotate(-4deg)} 50%{transform:rotate(5deg)} }
@keyframes cloud-drift { from{transform:translateX(0)} to{transform:translateX(-${STRIP}px)} }
@keyframes hd-rise { from{opacity:0;transform:translateY(60px)} to{opacity:1;transform:translateY(0)} }
@keyframes sl-in { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
@keyframes cloud-bob   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
.rd-helmet { animation: rd-bob 4.5s ease-in-out infinite; }
.rd-glint  { animation: rd-glint 3.2s ease-in-out infinite; }
.rd-glow   { animation: rd-pulse 5s ease-in-out infinite; }
.rd-arm    { transform-box: view-box; transform-origin: 905px 800px; animation: rd-arm 4.5s ease-in-out infinite; }
.rd-swing  { transform-box: view-box; transform-origin: 1010px 650px; animation: rd-swing 4.5s ease-in-out -0.45s infinite; }
.cloud-front { animation: cloud-drift 70s linear infinite; will-change: transform; }
.cloud-back  { animation: cloud-drift 120s linear infinite reverse; will-change: transform; }
.cloud-bob   { animation: cloud-bob 7s ease-in-out infinite; }
.hd-line { display: block; animation: hd-rise .9s cubic-bezier(.22,1,.36,1) backwards; }
.hd-line-2 { animation-delay: .15s; }
.sl-in { animation: sl-in .45s ease-out; }
@media (prefers-reduced-motion: reduce) {
  .rd-helmet,.rd-glint,.rd-glow,.rd-arm,.rd-swing,
  .cloud-front,.cloud-back,.cloud-bob,.hd-line,.sl-in { animation: none !important; }
}
`;

/* ------------------------------------------------------------------ */
/*  Moving cloud edge (bottom of the page)                             */
/*  Two layers drift in opposite directions at different speeds, so    */
/*  the bumps slowly roll past each other like real clouds.            */
/* ------------------------------------------------------------------ */
const CloudEdge = memo(function CloudEdge() {
  // three copies of the strip, so there is never a gap while it slides
  const tiles = [-STRIP, 0, STRIP];

  return (
    <svg
      viewBox="0 0 1600 140"
      preserveAspectRatio="xMidYMax slice"
      className="pointer-events-none absolute left-0 right-0 top-full z-10 block h-[70px] w-full -scale-y-100 sm:h-[110px]"
      aria-hidden="true"
    >
      {/* back layer: lighter, slower, drifts the other way and bobs */}
      <g className="cloud-bob" fill={BG} opacity="0.55">
        <g className="cloud-back">
          {tiles.map((dx) => (
            <g key={dx} transform={`translate(${dx + 90} -22)`}>
              {bumps.map((b) => (
                <circle key={b.x} cx={b.x} cy={140} r={b.r * 0.9} />
              ))}
            </g>
          ))}
        </g>
      </g>

      {/* front layer: the solid cloud edge */}
      <g fill={BG}>
        <g className="cloud-front">
          {tiles.map((dx) => (
            <g key={dx} transform={`translate(${dx} 0)`}>
              {bumps.map((b) => (
                <circle key={b.x} cx={b.x} cy={140} r={b.r} />
              ))}
            </g>
          ))}
        </g>
        {/* solid base so the edge always joins the page */}
        <rect x={0} y={100} width={1600} height={41} />
      </g>
    </svg>
  );
});

/* ------------------------------------------------------------------ */
/*  Backdrop                                                           */
/* ------------------------------------------------------------------ */
const Backdrop = memo(function Backdrop() {
  return (
    <g>
      <circle
        className="rd-glow"
        cx="600"
        cy="420"
        r="520"
        fill="url(#rd-glow)"
      />
    </g>
  );
});

/* ------------------------------------------------------------------ */
/*  Rider                                                              */
/* ------------------------------------------------------------------ */
const Jacket = memo(function Jacket() {
  return (
    <g>
      <path
        d="M470 625 C500 665 560 705 625 718 L745 712 L705 648 Z"
        fill="#1a0505"
      />
      <path
        d="M85 1006 C120 880 165 800 215 772 L420 678 L465 632 L690 720 L880 760 C910 775 925 800 935 820 L1000 1006 Z"
        fill="#0d0d0d"
      />
      <path
        d="M215 772 L420 678 C460 718 520 760 580 790 C560 782 520 762 460 725 C400 725 360 770 330 800 C300 820 270 815 262 818 C245 790 235 780 215 772Z"
        fill="#000"
      />
      <path
        d="M885 765 L900 1006 L1000 1006 L935 820 C925 800 905 775 885 765Z"
        fill="#000"
      />
      <path
        d="M418 680 L460 630 C520 640 620 700 700 722 C750 722 745 760 720 780 C690 795 640 797 610 800 C595 770 590 740 588 722 C520 735 450 710 418 680Z"
        fill="#121212"
      />
      <path
        d="M628 800 C655 870 675 940 690 1006"
        stroke="#1c1c1c"
        strokeWidth="14"
        fill="none"
        strokeLinecap="round"
      />
    </g>
  );
});

const Helmet = memo(function Helmet() {
  return (
    <g className="rd-helmet">
      <path
        d="M590 75 C760 78 852 240 862 430 C864 520 840 620 812 692 C760 722 660 722 600 708 C500 685 400 610 366 528 C330 450 312 390 316 320 C322 190 440 85 590 75Z"
        fill="#ff0000"
      />
      <path
        d="M445 480 C520 560 600 630 680 700"
        stroke="#000"
        strokeWidth="3"
        fill="none"
      />
      <path
        d="M376 162 L392 118 L440 92 L545 122 C565 128 575 145 580 150 L625 215 L575 215 C520 175 440 140 376 162Z"
        fill="#000"
      />
      <path
        d="M660 82 C720 100 760 140 780 215 C775 190 782 182 792 180 C760 110 720 90 660 82Z"
        fill="#000"
      />
      <path
        d="M470 255 C500 200 560 150 640 130"
        stroke={RED}
        strokeWidth="9"
        strokeLinecap="round"
        fill="none"
        opacity="0.35"
      />
      <path
        d="M372 288 C440 312 560 322 650 298 C730 272 810 268 842 290"
        stroke="#000"
        strokeWidth="14"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M450 312 C540 332 620 312 700 287 C760 270 820 270 842 290 C862 340 864 440 862 500 C850 545 800 575 740 575 C640 570 540 530 450 487 C445 440 470 410 455 385Z"
        fill="#000"
      />
      <path
        className="rd-glint"
        d="M685 305 C700 290 790 290 810 320 C835 345 845 380 840 385 C830 380 825 350 800 330 C770 318 700 332 690 320Z"
        fill="#3a3a3a"
      />
      <path
        d="M684 578 C720 585 790 580 825 560 C830 575 812 598 795 605 C760 613 720 607 684 580Z"
        fill="#000"
        stroke="#000"
        strokeWidth="6"
        strokeLinejoin="round"
      />
    </g>
  );
});

/* ------------------------------------------------------------------ */
/*  Paper bag                                                          */
/* ------------------------------------------------------------------ */
const SKIN = "#7b4a33";

const Bag = memo(function Bag() {
  return (
    <g className="rd-arm">
      <g transform="translate(1056 538) scale(1.375) translate(-1710 -530)">
        <g className="rd-swing">
          <g
            transform="translate(900 632) scale(1.4 1.1)"
            stroke="#000"
            strokeWidth="5"
            strokeLinejoin="round"
          >
            <path
              d="M40 22 L2 64 C0 160 4 300 12 400 L52 440 C48 300 42 120 40 22 Z"
              fill="#c99a6b"
            />
            <path
              d="M40 22 L272 6 C284 130 292 280 296 416 L52 440 C48 300 42 120 40 22 Z"
              fill="#e0b88f"
            />
            <g
              fill="none"
              stroke="#b98558"
              strokeWidth="8"
              strokeLinecap="round"
              opacity="0.7"
            >
              <path d="M70 140 C120 165 165 150 215 185" />
              <path d="M120 300 C170 282 215 304 262 272" />
              <path d="M62 250 L98 336" />
              <path d="M200 60 C214 100 208 130 224 160" />
              <path d="M25 140 C30 220 28 300 36 370" />
            </g>
          </g>

          <g stroke="#000" strokeWidth="4" strokeLinejoin="round">
            {[0, 1, 2, 3].map((i) => {
              const x = 958 + i * 28;
              const rot = [-4, -1, 2, 5][i];
              return (
                <g key={i} transform={`rotate(${rot} ${x + 14} 640)`}>
                  <rect
                    x={x}
                    y="624"
                    width="28"
                    height={92 - (i === 3 ? 12 : 0) - (i === 0 ? 6 : 0)}
                    rx="14"
                    fill={SKIN}
                  />
                  <ellipse
                    cx={x + 14}
                    cy={700 - (i === 3 ? 12 : 0) - (i === 0 ? 6 : 0)}
                    rx="8"
                    ry="6"
                    fill="#b78a6d"
                    stroke="none"
                    opacity="0.85"
                  />
                </g>
              );
            })}
          </g>
        </g>
      </g>
    </g>
  );
});

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function RiderPage() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  // slides change on their own every 6s (pauses while the card is hovered)
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setIdx((i) => (i + 1) % SLIDES.length), 6000);
    return () => clearTimeout(t);
  }, [idx, paused]);

  const slide = SLIDES[idx];
  const words = slide.title.split(" ");
  const lastWord = words.pop();
  const restOfTitle = words.join(" ");

  return (
    <main
      className="relative flex min-h-screen w-full flex-col items-center overflow-x-clip px-4 pt-28 sm:px-6 md:px-8 md:pt-36 font-['Lufga']"
      style={{ backgroundColor: BG }}
    >
      <style>{CSS}</style>

      {/* very big headline, sits behind the top of the rider */}
      <h1 className="relative z-0   md:pt-[32px]  pt-[12px] w-full max-w-[1262px] select-none text-center text-[clamp(3.2rem,8vw,10rem)] font-black leading-[0.85] tracking-tighter text-black">
        <span className="">Just Send it</span>
        <span className="text-[#ff0000] md:ml-2 ml-1">.</span>

        {/* <span className="hd-line hd-line-2 text-[#ff0000]">Packages</span> */}
      </h1>
      <span className="md:pb-[48px]  mt-4 pb-[8px]">
        {" "}
        <DownloadButtons
          isHalf={true}
          iconSize={24} // Desktop icon size
          padding="h-13 w-13" // Desktop padding container
        />
      </span>

      {/* rider illustration (overlaps the bottom of the headline) */}
      <div className="relative z-10 -mt-[3vw] w-full max-w-[1262px] sm:-mt-[2vw]">
        <svg
          className="block h-auto max-h-[70vh] sm:max-h-[80vh] w-full"
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          preserveAspectRatio="xMidYMax meet"
          style={{ overflow: "visible" }}
          role="img"
          aria-label="Pickars dispatch rider in a red helmet holding a delivery bag"
        >
          <defs>
            <radialGradient id="rd-glow">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>
          </defs>

          <Backdrop />
          <Jacket />
          {/* <Bag /> */}
          <Helmet />
        </svg>
      </div>

      {/* card */}
      <section
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className="relative z-10 mb-10 w-full max-w-6xl rounded-[30px] sm:rounded-[40px] border-[0.8px] border-[#ff000045] bg-white px-5 py-8 text-left sm:px-10 sm:py-12 md:px-14 md:py-14"
      >
        {/* Slide content: only the active slide is rendered, so the card height fits its text */}
        <div key={idx} className="sl-in" aria-live="polite">
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-black sm:text-4xl md:text-5xl lg:text-6xl">
            {restOfTitle} <span className="text-[#ff0000]">{lastWord}</span>
          </h2>
          <p className="mt-3 sm:mt-5 max-w-xl text-sm sm:text-lg lg:text-xl text-black/80">
            {slide.text}
          </p>
        </div>

        {/* Bottom row: download buttons + tiny progress dots (no arrows) */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 sm:mt-12">
          <DownloadButtons alignLeft />

          <div
            className="flex items-center gap-1.5"
            role="group"
            aria-label="Slides"
          >
            {SLIDES.map((sl, i) => (
              <button
                key={sl.title}
                type="button"
                onClick={() => setIdx(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === idx
                    ? "w-6 bg-black"
                    : "w-1.5 bg-black/20 hover:bg-black/40"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Cloud edge at the bottom: now drifting */}
      <CloudEdge />
    </main>
  );
}
