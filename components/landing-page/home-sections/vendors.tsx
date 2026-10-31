"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DownloadButtons from "@/components/atoms/buttons/DownloadButtons";
import IMAGE_PATH from "@/assets/landing-page-images/new.svg";
gsap.registerPlugin(ScrollTrigger);

/* ---------- Edit these ---------- */
const PRIMARY_COLOR = "#ff0000"; // Pickars red
const EDGE_COLOR = "#fff"; // colour of the section ABOVE (the white intro)

const PERKS = [
  "Lightning Fast",
  "Reliable Riders",
  "Safe Handling",
  "Real-time Tracking",
];
/* -------------------------------- */

/* ---------- Torn paper edge path ---------- */
const EDGE_PATH =
  "M0 395V180L18 180L32 175L40 178L75 200L110 211L150 198L165 185L175 177L185 181L220 157L255 146L270 150L290 165L310 175L335 177L350 168L365 157L395 152L410 149L458 150L470 153L530 166L560 170L605 178L630 170L670 176L725 173L735 166L765 170L825 170L840 160L870 138L885 129L920 122L925 120L1400 120L1410 123L1430 121L1605 121L1620 125L1650 127L1665 127L1690 120L1710 120L1722 133L1740 130L1750 120L1915 120L1930 121L2335 121L2342 121L2323 172L2303 187L2320 196L2392 200L2430 193L2462 189L2485 197L2545 210L2576 206V395Z";

function RoughEdge({ position }: { position: "top" | "bottom" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 2576 395"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute inset-x-0 z-20 block h-14 w-full md:h-24 lg:h-32 ${
        position === "top" ? "-top-px rotate-180" : "-bottom-px"
      }`}
    >
      <path d={EDGE_PATH} fill={EDGE_COLOR} />
    </svg>
  );
}

export default function PickarsAreas() {
  const rootRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.from(headRef.current?.children || [], {
        opacity: 0,
        y: 30,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: headRef.current, start: "top 85%" },
      });

      gsap.from(imageRef.current, {
        opacity: 0,
        scale: 0.95,
        y: 40,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: imageRef.current, start: "top 85%" },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative w-full overflow-hidden bg-black md:pb-32 pb-12 font-['Lufga'] text-white"
      aria-label="Pickars dispatch services in action"
    >
      <RoughEdge position="bottom" />
      <div className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 md:pt-40 lg:px-8 lg:pt-48">
        {/* Heading */}
        <div ref={headRef} className="grid max-w-2xl gap-6">
          {/* <span className="text-xs font-semibold uppercase tracking-widest text-white/50">
            /Book a dispatch rider/
          </span> */}

          <h2 className="text-5xl font-black leading-none tracking-tight sm:text-7xl">
            Get a Dispatch Rider Quickly on{" "}
            <span
              style={{ backgroundColor: PRIMARY_COLOR }}
              className="inline-block px-2 text-white md:px-3"
            >
              Pickars
            </span>
          </h2>

          <p className="max-w-2xl text-lg leading-relaxed text-white/60 md:text-xl">
            Need a reliable rider to pick up or drop off your package? We are
            active across all major neighborhoods in Port Harcourt.
          </p>

          {/* <ul className="flex flex-wrap gap-3">
            {PERKS.map((perk) => (
              <li
                key={perk}
                className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/80"
              >
                {perk}
              </li>
            ))}
          </ul> */}

          <DownloadButtons dark={true} alignLeft={true} />
        </div>
      </div>

      {/* Single Featured Image Banner */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div
          ref={imageRef}
          className="relative h-[400px] w-full overflow-hidden rounded-3xl sm:h-[450px] md:h-[650px]"
        >
          <Image
            src={IMAGE_PATH}
            alt="Pickars dispatch service"
            fill
            className="object-cover transition-transform duration-700 hover:scale-105"
            priority
          />
        </div>
      </div>
    </section>
  );
}
