"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import photo from "@/assets/landing-page-images/home-hero.svg";
import DownloadButtons from "@/components/atoms/buttons/DownloadButtons";

gsap.registerPlugin(ScrollTrigger);

/* ---------- Edit these ---------- */
const PRIMARY_COLOR = "#ff0000"; // Pickars red
const EDGE_COLOR = "#000"; // colour of the torn edge (match the section below it)

// Placeholder numbers: replace with your real figures.
const stats: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
}[] = [
  { value: 1300, suffix: "+", label: "Deliveries completed" },
  //   { value: 7, suffix: "+", label: "Dispatch riders" },
  { value: 56, suffix: " min", label: "Average pickup time" },
];

// Optional "trusted by" strip. Leave empty to hide it.
const partners: string[] = [];
/* -------------------------------- */

/* count-up number formatter */
function formatStat(
  value: number,
  s: { prefix?: string; suffix?: string; decimals?: number }
) {
  const decimals = s.decimals ?? 0;
  const n = value.toLocaleString("en-NG", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return `${s.prefix ?? ""}${n}${s.suffix ?? ""}`;
}

/* ---------- Torn paper edge path ---------- */
const EDGE_PATH =
  "M0 395V180L18 180L32 175L40 178L75 200L110 211L150 198L165 185L175 177L185 181L220 157L255 146L270 150L290 165L310 175L335 177L350 168L365 157L395 152L410 149L458 150L470 153L530 166L560 170L605 178L630 170L670 176L725 173L735 166L765 170L825 170L840 160L870 138L885 129L920 122L925 120L1400 120L1410 123L1430 121L1605 121L1620 125L1650 127L1665 127L1690 120L1710 120L1722 133L1740 130L1750 120L1915 120L1930 121L2335 121L2342 121L2323 172L2303 187L2320 196L2392 200L2430 193L2462 189L2485 197L2545 210L2576 206V395Z";

export function RoughEdge({ position }: { position: "top" | "bottom" }) {
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

const Sparkle = () => (
  <svg
    className="h-5 w-5 text-white md:h-7 md:w-7"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z" />
  </svg>
);

export default function PickarsIntro() {
  const rootRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const visionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const statEls = useRef<(HTMLSpanElement | null)[]>([]);
  const closingRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // always show final numbers, animation only counts up to them
    stats.forEach((s, i) => {
      const el = statEls.current[i];
      if (el) el.textContent = formatStat(s.value, s);
    });
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.from(heroRef.current?.children || [], {
        opacity: 0,
        y: 30,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: heroRef.current, start: "top 85%" },
      });

      // image reveals upward, then drifts slightly as you scroll
      gsap.fromTo(
        imageWrapRef.current,
        { clipPath: "inset(18% 4% 0% 4% round 28px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 28px)",
          ease: "none",
          scrollTrigger: {
            trigger: imageWrapRef.current,
            start: "top 95%",
            end: "top 40%",
            scrub: true,
          },
        }
      );
      gsap.fromTo(
        imageRef.current,
        { scale: 1.18, yPercent: -4 },
        {
          scale: 1,
          yPercent: 4,
          ease: "none",
          scrollTrigger: {
            trigger: imageWrapRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      gsap.from(visionRef.current?.children || [], {
        opacity: 0,
        y: 30,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: visionRef.current, start: "top 85%" },
      });

      // count-up
      stats.forEach((s, i) => {
        const el = statEls.current[i];
        if (!el) return;
        const obj = { v: 0 };
        gsap.to(obj, {
          v: s.value,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: { trigger: statsRef.current, start: "top 88%" },
          onUpdate: () => {
            el.textContent = formatStat(obj.v, s);
          },
        });
      });

      gsap.from(closingRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: closingRef.current, start: "top 90%" },
      });

      if (marqueeRef.current) {
        gsap.fromTo(
          marqueeRef.current,
          { xPercent: -50 },
          { xPercent: 0, duration: 35, ease: "none", repeat: -1 }
        );
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative w-full overflow-hidden bg-white pb-0 font-['Lufga'] text-black"
    >
      {/* <RoughEdge position="bottom" /> */}
      <div className="relative z-10 mx-auto max-w-7xl py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        {/* Hero row */}
        <div
          ref={heroRef}
          className="grid items-end gap-10 md:grid-cols-[1.7fr_1fr] md:gap-16"
        >
          <h2 className="text-6xl font-black leading-none tracking-tight sm:text-8xl">
            Sending your packages
            <span
              style={{ backgroundColor: PRIMARY_COLOR }}
              className="mx-3 inline-flex h-9 w-9 items-center justify-center rounded-full align-middle text-white md:h-12 md:w-12"
            >
              <Sparkle />
            </span>{" "}
            <span
              style={{ backgroundColor: PRIMARY_COLOR }}
              className="inline-block px-2 text-white md:px-3"
            >
              redefined
            </span>
          </h2>

          <div className="flex flex-col items-start gap-5 md:pb-2">
            <p className="max-w-sm text-sm leading-relaxed text-black/60 md:text-base">
              At Pickars, we connect you with trusted dispatch riders who pick
              up and deliver your packages quickly, safely and right to the
              door.
            </p>
            <DownloadButtons isHalf={true} alignLeft={true} />
            {/* <Link
              href="#how-it-works"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = PRIMARY_COLOR;
                e.currentTarget.style.color = PRIMARY_COLOR;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.4)";
                e.currentTarget.style.color = "#000000";
              }}
              className="group inline-flex items-center gap-1.5 border-b border-black/40 pb-0.5 text-sm font-medium text-black transition-colors"
            >
              See how it works
              <span
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              >
                ↗
              </span>
            </Link> */}
          </div>
        </div>

        {/* Image */}
        <div
          ref={imageWrapRef}
          className="relative mt-12 aspect-[12/9] w-full overflow-hidden rounded-[28px] bg-neutral-100 md:mt-16 md:aspect-[12/7]"
        >
          <div
            ref={imageRef}
            className="absolute inset-0 will-change-transform"
          >
            <Image
              src={photo}
              alt="A Pickars dispatch rider ready to deliver a package"
              fill
              sizes="(min-width: 1280px) 1216px, 100vw"
              className="object-cover"
              priority={false}
            />
          </div>
        </div>

        {/* Vision */}
        <div
          ref={visionRef}
          className="mt-16 grid gap-10 md:mt-24 md:gap-16 max-w-3xl"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-black/50">
            /Our promise/
          </span>

          <div>
            <h3 className="text-6xl font-black leading-none tracking-tight sm:text-8xl">
              Need something delivered?{" "}
              <span
                style={{ backgroundColor: PRIMARY_COLOR }}
                className="mx-3 inline-flex h-9 w-9 items-center justify-center rounded-full align-middle text-white md:h-12 md:w-12"
              >
                <Sparkle />
              </span>{" "}
            </h3>
            <p className="mt-5 text-xl font-regular leading-relaxed text-black/60 max-w-2xl">
              Good delivery isn&apos;t just about speed. It&apos;s about showing
              up on time, handling every package with care and keeping you
              informed. Here&apos;s how we&apos;re doing.
            </p>

            <div style={{ marginTop: 24 }}>
              <DownloadButtons alignLeft={true} />
            </div>
          </div>
        </div>

        {/* Optional trusted-by strip */}
        {partners.length > 0 && (
          <div
            className="mt-10 overflow-hidden"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)",
            }}
          >
            <div ref={marqueeRef} className="flex w-max">
              {[0, 1].map((copy) => (
                <div
                  key={copy}
                  className="flex shrink-0 items-center gap-14 pr-14"
                  aria-hidden={copy === 1}
                >
                  {partners.map((name) => (
                    <span
                      key={`${copy}-${name}`}
                      className="whitespace-nowrap text-lg font-semibold tracking-tight text-black/35"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Closing statement */}
      </div>
    </section>
  );
}
