"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PRIMARY_COLOR = "#ff0000";

type FeatureSliderProps = {
  /* seconds for one full loop (higher = slower) */
  duration?: number;
  /* extra classes for the band, e.g. to change the text colour */
  className?: string;
  /* whether to show rough edges on top and bottom */
  roughEdges?: boolean;
  /* colour of the rough edges (match the section around the band) */
  edgeColor?: string;
  /* optional override of the words shown in the band */
  items?: string[];
};

/* ---------- Pickars words ---------- */
export const PICKARS_FEATURES: string[] = [
  "Door-to-Door Delivery",
  "Fast Pickups",
  "Verified Riders",
  "Live Tracking",
  "Upfront Pricing",
  "Careful Handling",
  "Booking in Minutes",
  "For Shops & Individuals",
  "Across Port Harcourt",
  "iOS & Android App",
];

/* ---------- Torn paper edge path ---------- */
const EDGE_PATH =
  "M0 395V180L18 180L32 175L40 178L75 200L110 211L150 198L165 185L175 177L185 181L220 157L255 146L270 150L290 165L310 175L335 177L350 168L365 157L395 152L410 149L458 150L470 153L530 166L560 170L605 178L630 170L670 176L725 173L735 166L765 170L825 170L840 160L870 138L885 129L920 122L925 120L1400 120L1410 123L1430 121L1605 121L1620 125L1650 127L1665 127L1690 120L1710 120L1722 133L1740 130L1750 120L1915 120L1930 121L2335 121L2342 121L2323 172L2303 187L2320 196L2392 200L2430 193L2462 189L2485 197L2545 210L2576 206V395Z";

function RoughEdge({
  position,
  fillColor,
}: {
  position: "top" | "bottom";
  fillColor: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 2576 395"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute inset-x-0 z-20 block h-10 w-full md:h-16 lg:h-20 ${
        position === "top" ? "-top-px rotate-180" : "-bottom-px"
      }`}
    >
      <path d={EDGE_PATH} fill={fillColor} />
    </svg>
  );
}

/* 8-spoke asterisk separator */
const Asterisk = () => (
  <svg
    className="h-5 w-5 shrink-0 animate-spin motion-reduce:animate-none md:h-6 md:w-6"
    style={{ animationDuration: "10s" }}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9L4.9 19.1" />
  </svg>
);

export default function FeatureSlider({
  duration = 30,
  className = "text-white",
  roughEdges = false,
  edgeColor = "#000",
  items = PICKARS_FEATURES,
}: FeatureSliderProps) {
  const bandRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Band fades in on scroll (plays once, never stays hidden)
      gsap.from(bandRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.9,
        ease: "power3.out",
        clearProps: "opacity,transform",
        scrollTrigger: {
          trigger: bandRef.current,
          start: "top 95%",
          once: true,
        },
      });

      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (trackRef.current && !reduce) {
        // two identical copies: sliding by 50% and looping = seamless roll
        // (-50 -> 0 flows left to right; swap the two values to reverse it)
        tweenRef.current = gsap.fromTo(
          trackRef.current,
          { xPercent: -50 },
          { xPercent: 0, duration, ease: "none", repeat: -1 }
        );
      }
    }, bandRef);

    const refresh = setTimeout(() => ScrollTrigger.refresh(), 100);

    return () => {
      clearTimeout(refresh);
      ctx.revert();
    };
  }, [duration]);

  const slow = () =>
    tweenRef.current &&
    gsap.to(tweenRef.current, { timeScale: 0.15, duration: 0.5 });
  const resume = () =>
    tweenRef.current &&
    gsap.to(tweenRef.current, { timeScale: 1, duration: 0.5 });

  return (
    <div
      ref={bandRef}
      onMouseEnter={slow}
      onMouseLeave={resume}
      style={{ backgroundColor: PRIMARY_COLOR }}
      className={`relative w-full overflow-hidden py-5 font-['Lufga'] md:py-6 ${className}`}
      aria-label="Why choose Pickars"
    >
      {roughEdges && <RoughEdge position="top" fillColor={edgeColor} />}
      {roughEdges && <RoughEdge position="bottom" fillColor={edgeColor} />}

      <div ref={trackRef} className="flex w-max will-change-transform">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="flex shrink-0 items-center"
            aria-hidden={copy === 1}
          >
            {items.map((item) => (
              <div
                key={`${copy}-${item}`}
                className="flex shrink-0 items-center gap-8 pl-8 md:gap-14 md:pl-14"
              >
                <span className="whitespace-nowrap text-lg font-bold tracking-tight md:text-2xl">
                  {item}
                </span>
                <Asterisk />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
