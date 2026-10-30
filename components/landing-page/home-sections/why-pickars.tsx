"use client";

import React, { memo, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ---------- Edit these ---------- */
const PRIMARY_COLOR = "#ff0000";

export const features: string[] = [
  "Fast Pickups",
  "Verified Riders",
  "Live Tracking",
  "Upfront Pricing",
  "Careful Handling",
  "Across Port Harcourt",
];

// seconds for one full loop (bigger = slower)
const SLIDE_SECONDS = 30;
/* -------------------------------- */

const CSS = `
@keyframes feature-slide {
  from { transform: translate3d(-50%, 0, 0); }
  to   { transform: translate3d(0, 0, 0); }
}
.feature-track {
  animation: feature-slide linear infinite;
  will-change: transform;
}
.feature-band:hover .feature-track {
  animation-play-state: paused;
}
@media (prefers-reduced-motion: reduce) {
  .feature-track { animation: none; }
}
`;

const Sparkle = () => (
  <svg
    className="h-5 w-5 shrink-0 text-black sm:h-6 sm:w-6 md:h-8 md:w-8"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z" />
  </svg>
);

/* One full copy of the features */
export const FeatureGroup = memo(function FeatureGroup({
  hidden,
}: {
  hidden?: boolean;
}) {
  return (
    <ul
      className="flex shrink-0 items-center"
      aria-hidden={hidden || undefined}
    >
      {features.map((feature) => (
        <li
          key={feature}
          className="flex shrink-0 items-center gap-4 pr-4 sm:gap-6 sm:pr-6 md:gap-10 md:pr-10"
        >
          <span className="whitespace-nowrap text-xl font-black uppercase tracking-tight text-black sm:text-2xl md:text-5xl">
            {feature}
          </span>
          <Sparkle />
        </li>
      ))}
    </ul>
  );
});

export default function WhyPickars() {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 85%" },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-x-hidden bg-[#000] py-12 font-['Lufga'] text-white sm:py-16 md:py-24"
    >
      <style>{CSS}</style>

      {/* Header */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-12">
        <div ref={headerRef} className="mb-8 sm:mb-10 md:mb-14">
          <span
            className="mb-2 block text-xs font-semibold uppercase tracking-widest sm:text-sm"
            style={{ color: PRIMARY_COLOR }}
          >
            Why Pickars
          </span>
          <h3 className="max-w-3xl text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-5xl md:leading-[1.1]">
            Built for every delivery, big or small
            <span style={{ color: PRIMARY_COLOR }}>.</span>
          </h3>
        </div>
      </div>

      {/* Solid full-width sliding band */}
      <div
        className="feature-band w-full overflow-hidden py-4 sm:py-5 md:py-7"
        style={{ backgroundColor: PRIMARY_COLOR }}
        aria-label="Why choose Pickars"
      >
        <div
          className="feature-track flex w-max"
          style={{ animationDuration: `${SLIDE_SECONDS}s` }}
        >
          <FeatureGroup />
          <FeatureGroup hidden />
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-12">
        <p className="mt-8 max-w-md text-xs text-white/50 sm:mt-10 sm:text-sm md:text-base">
          Reliable riders and a simple app, connecting senders and receivers
          across Port Harcourt.
        </p>
      </div>
    </section>
  );
}