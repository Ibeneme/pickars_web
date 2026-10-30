"use client";

import React, { memo, useEffect, useState } from "react";
import DownloadButtons from "@/components/atoms/buttons/DownloadButtons";
import CityMarquee from "./sub-sections/city-marquee";

/* ------------------------------------------------------------------ */
/*  Theme                                                              */
/* ------------------------------------------------------------------ */
const RED = "#FAE8E4";
const BG = RED;

const VB_W = 1262;
const VB_H = 1006;

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
@keyframes hd-rise { from{opacity:0;transform:translateY(60px)} to{opacity:1;transform:translateY(0)} }
@keyframes sl-in { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }

/* ---- clouds ------------------------------------------------------ */
@keyframes cloud-ltr {
  from { transform: translate3d(-100%, 0, 0); }
  to   { transform: translate3d(100vw, 0, 0); }
}
@keyframes cloud-rtl {
  from { transform: translate3d(100vw, 0, 0); }
  to   { transform: translate3d(-100%, 0, 0); }
}
@keyframes cloud-roam-x {
  from { transform: translate3d(2vw, 0, 0); }
  to   { transform: translate3d(66vw, 0, 0); }
}
@keyframes cloud-roam-y {
  from { transform: translate3d(0, 0, 0); }
  to   { transform: translate3d(0, 24vh, 0); }
}
@keyframes cloud-bob {
  0%,100% { transform: translate3d(0, 0, 0) scale(1); }
  50%     { transform: translate3d(0, -10px, 0) scale(1.03); }
}

.cloud-wrap {
  position: absolute;
  left: 0;
  will-change: transform;
}
.cloud-ltr { animation: cloud-ltr linear infinite; }
.cloud-rtl { animation: cloud-rtl linear infinite; }
.cloud-roam-x { animation: cloud-roam-x 22s ease-in-out infinite alternate; }
.cloud-roam-y { animation: cloud-roam-y 9s ease-in-out infinite alternate; will-change: transform; }
.cloud-bob { animation: cloud-bob ease-in-out infinite; transform-origin: 50% 80%; }

/* MOBILE: show far fewer clouds (only 3 of the 13 stay) */
@media (max-width: 767px) {
  .cloud-hide-mobile { display: none !important; }
}

.rd-helmet { animation: rd-bob 4.5s ease-in-out infinite; }
.rd-glint  { animation: rd-glint 3.2s ease-in-out infinite; }
.rd-glow   { animation: rd-pulse 5s ease-in-out infinite; }
.rd-arm    { transform-box: view-box; transform-origin: 905px 800px; animation: rd-arm 4.5s ease-in-out infinite; }
.rd-swing  { transform-box: view-box; transform-origin: 1010px 650px; animation: rd-swing 4.5s ease-in-out -0.45s infinite; }

.hd-line { display: block; animation: hd-rise .9s cubic-bezier(.22,1,.36,1) backwards; }
.hd-line-2 { animation-delay: .15s; }
.sl-in { animation: sl-in .45s ease-out; }

@media (prefers-reduced-motion: reduce) {
  .rd-helmet,.rd-glint,.rd-glow,.rd-arm,.rd-swing,
  .cloud-ltr,.cloud-rtl,.cloud-roam-x,.cloud-roam-y,.cloud-bob { animation: none; }
}
`;

/* ------------------------------------------------------------------ */
/*  Clouds (spread over the whole page, always behind content)         */
/* ------------------------------------------------------------------ */
type CloudDef = {
  kind: "ltr" | "rtl" | "roam";
  top: string;
  width: string;
  dur: number;
  delay: number;
  bobDur: number;
  bobDelay: number;
  opacity: number;
  flip?: boolean;
  hideOnMobile: boolean; // hidden below 768px to keep phones calm
};

/* seeded PRNG: identical on server and client, no hydration mismatch */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function makeClouds(count: number, seed = 7): CloudDef[] {
  const rnd = mulberry32(seed);
  const range = (min: number, max: number) => min + rnd() * (max - min);

  const bands = Array.from({ length: count }, (_, i) => i);
  for (let i = bands.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [bands[i], bands[j]] = [bands[j], bands[i]];
  }

  const list: CloudDef[] = bands.map((band, i) => {
    const s = range(0.6, 1.3);
    const dur = Math.round(range(30, 55));
    return {
      kind: rnd() > 0.5 ? "ltr" : "rtl",
      top: `${((band + rnd() * 0.8) / count) * 94}%`,
      width: `clamp(${Math.round(110 * s)}px, ${(14 * s).toFixed(
        1
      )}vw, ${Math.round(230 * s)}px)`,
      dur,
      delay: -Math.round(rnd() * dur),
      bobDur: Math.round(range(9, 14)),
      bobDelay: -Math.round(rnd() * 10),
      opacity: +range(0.7, 0.95).toFixed(2),
      flip: rnd() > 0.5,
      // keep every 5th cloud on mobile (about 3 of 12), hide the rest
      hideOnMobile: i % 5 !== 0,
    };
  });

  // roaming cloud: desktop only
  list.push({
    kind: "roam",
    top: "4%",
    width: "clamp(150px, 20vw, 300px)",
    dur: 0,
    delay: 0,
    bobDur: 12,
    bobDelay: -4,
    opacity: 0.92,
    hideOnMobile: true,
  });

  return list;
}

const CLOUDS: CloudDef[] = makeClouds(12);

const CloudShape = () => (
  <>
    <circle cx="60" cy="62" r="30" />
    <circle cx="95" cy="45" r="38" />
    <circle cx="135" cy="58" r="30" />
    <circle cx="165" cy="68" r="22" />
    <rect x="40" y="62" width="145" height="28" rx="14" />
  </>
);

const CloudSvg = ({ c }: { c: CloudDef }) => (
  <svg
    className="cloud-bob block h-auto w-full"
    viewBox="0 0 200 100"
    style={{
      overflow: "visible",
      opacity: c.opacity,
      animationDuration: `${c.bobDur}s`,
      animationDelay: `${c.bobDelay}s`,
    }}
  >
    <g transform={c.flip ? "translate(200 0) scale(-1 1)" : undefined}>
      <g
        fill="#ffffff75"
        stroke="#ffffff75"
        strokeWidth="24"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <CloudShape />
      </g>
      <g fill="#fff">
        <CloudShape />
      </g>
    </g>
  </svg>
);

const Clouds = memo(function Clouds() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {CLOUDS.map((c, i) => {
        const hide = c.hideOnMobile ? "cloud-hide-mobile" : "";

        if (c.kind === "roam") {
          return (
            <div
              key={i}
              className={`cloud-wrap cloud-roam-x ${hide}`}
              style={{
                top: c.top,
                width: c.width,
                animationDelay: `${c.delay}s`,
              }}
            >
              <div className="cloud-roam-y">
                <CloudSvg c={c} />
              </div>
            </div>
          );
        }
        return (
          <div
            key={i}
            className={`cloud-wrap cloud-${c.kind} ${hide}`}
            style={{
              top: c.top,
              width: c.width,
              animationDuration: `${c.dur}s`,
              animationDelay: `${c.delay}s`,
            }}
          >
            <CloudSvg c={c} />
          </div>
        );
      })}
    </div>
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
      {/* neck shadow */}
      <path
        d="M470 625 C500 665 560 705 625 718 L745 712 L705 648 Z"
        fill="#1a0505"
      />

      {/* body */}
      <path
        d="M85 1006 C120 880 165 800 215 772 L420 678 L465 632 L690 720 L880 760 C910 775 925 800 935 820 L1000 1006 Z"
        fill="#0d0d0d"
      />
      {/* left shoulder panel */}
      <path
        d="M215 772 L420 678 C460 718 520 760 580 790 C560 782 520 762 460 725 C400 725 360 770 330 800 C300 820 270 815 262 818 C245 790 235 780 215 772Z"
        fill="#000"
      />
      {/* right panel */}
      <path
        d="M885 765 L900 1006 L1000 1006 L935 820 C925 800 905 775 885 765Z"
        fill="#000"
      />
      {/* arm seam, red piping */}
  

      <path
        d="M418 680 L460 630 C520 640 620 700 700 722 C750 722 745 760 720 780 C690 795 640 797 610 800 C595 770 590 740 588 722 C520 735 450 710 418 680Z"
        fill="#121212"
      />
      {/* zip */}
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
      {/* shell */}
      <path
        d="M590 75 C760 78 852 240 862 430 C864 520 840 620 812 692 C760 722 660 722 600 708 C500 685 400 610 366 528 C330 450 312 390 316 320 C322 190 440 85 590 75Z"
        fill="#ff0000"
      />
      {/* chin rim */}
      <path
        d="M445 480 C520 560 600 630 680 700"
        stroke="#00000022"
        strokeWidth="32"
        fill="none"
      />

      {/* top stripes */}
      <path
        d="M376 162 L392 118 L440 92 L545 122 C565 128 575 145 580 150 L625 215 L575 215 C520 175 440 140 376 162Z"
        fill="#000"
      />
      <path
        d="M660 82 C720 100 760 140 780 215 C775 190 782 182 792 180 C760 110 720 90 660 82Z"
        fill="#000"
      />
      {/* visor rim */}
      <path
        d="M372 288 C440 312 560 322 650 298 C730 272 810 268 842 290"
        stroke="#000"
        strokeWidth="14"
        fill="none"
        strokeLinecap="round"
      />
      {/* visor */}
      <path
        d="M450 312 C540 332 620 312 700 287 C760 270 820 270 842 290 C862 340 864 440 862 500 C850 545 800 575 740 575 C640 570 540 530 450 487 C445 440 470 410 455 385Z"
        fill="#000"
      />
      {/* visor glint */}
      <path
        className="rd-glint"
        d="M685 305 C700 290 790 290 810 320 C835 345 845 380 840 385 C830 380 825 350 800 330 C770 318 700 332 690 320Z"
        fill="#3a3a3a"
      />

      {/* chin vent */}
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

  const next = () => setIdx((i) => (i + 1) % SLIDES.length);
  const prev = () => setIdx((i) => (i - 1 + SLIDES.length) % SLIDES.length);

  const slide = SLIDES[idx];
  const words = slide.title.split(" ");
  const lastWord = words.pop();
  const restOfTitle = words.join(" ");

  return (
    <main
      className="relative mb-[-16] isolate flex w-full flex-col items-center overflow-x-clip px-4 pt-24 pb-0 sm:px-6 md:px-8 md:pt-36 font-['Lufga']"
      style={{ backgroundColor: BG }}
    >
      <style>{CSS}</style>
      <Clouds />

      {/* very big headline, sits behind the top of the rider */}
      <h1 className="relative z-0 w-full max-w-[1262px] select-none pt-4 text-center text-[clamp(3.6rem,15vw,10rem)] font-black leading-[0.9] tracking-tighter text-black md:pt-[24px]">
        <span>Just Send it</span>
        <span className="ml-1 text-[#ff0000] md:ml-2">.</span>
      </h1>

      {/* download buttons: more breathing room on mobile */}
      <span className="mt-8 pb-6 md:mt-4 md:pb-[48px]">
        <DownloadButtons isHalf={true} iconSize={24} padding="h-13 w-13" />
      </span>

      {/* rider illustration: bigger on mobile, bleeds slightly past the edges */}
      <div className="relative z-10 mt-2 w-[135%] max-w-none sm:mt-0 sm:w-full sm:max-w-[1262px] md:-mt-[2vw]">
        <svg
          className="block h-auto w-full sm:max-h-[80vh]"
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
          <Helmet />
        </svg>
      </div>

      {/* optional: bottom marquee, currently imported but unused */}
      {/* <CityMarquee /> */}

      {/* Slide card (disabled). Uncomment together with the slide state above.
      <section
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className="relative z-10 mt-[-48px] w-full max-w-5xl rounded-[12px] bg-white px-6 py-8 text-left transition-all duration-300 sm:rounded-[48px] sm:px-10 sm:py-10 md:px-12 md:py-12"
      >
        <div
          key={idx}
          className="sl-in flex min-h-[17rem] flex-col gap-4 sm:min-h-[15rem] sm:gap-5 lg:min-h-[14rem]"
          aria-live="polite"
        >
          <h2 className="text-2xl font-bold leading-tight tracking-tight text-black sm:text-3xl md:text-4xl lg:text-5xl">
            {restOfTitle} <span className="text-[#ff0000]">{lastWord}</span>
          </h2>
          <p className="max-w-2xl text-[16px] font-normal leading-relaxed text-black/80 sm:text-xl">
            {slide.text}
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-6 sm:mt-10">
          <DownloadButtons alignLeft />
          <div className="flex items-center gap-3">
            <button type="button" onClick={prev} aria-label="Previous slide"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-black/15 text-black transition-colors duration-200 hover:bg-black hover:text-white">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <button type="button" onClick={next} aria-label="Next slide"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-black/15 text-black transition-colors duration-200 hover:bg-black hover:text-white">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 18l6-6-6-6" /></svg>
            </button>
          </div>
        </div>
      </section>
      */}
    </main>
  );
}