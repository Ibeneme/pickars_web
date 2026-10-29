"use client";

import React, { useEffect, useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DownloadButtons from "@/components/atoms/buttons/DownloadButtons";

import pushNotificationsPhone from "@/assets/landing-page-images/push-notifications-phone.svg";

gsap.registerPlugin(ScrollTrigger);

/* ---------- Edit these ---------- */
const productName = "Pickars";

// Fallback colour shown behind the photo while it loads
const SOFT_RED = "#ff4d4d";
const EDGE_COLOR = "#000000"; // Black background for the torn paper edge
/* -------------------------------- */

type Tile = {
  src: StaticImageData;
  alt: string;
  bg: string;
  flex: number;
  position?: string;
};

type Row = {
  /* Tailwind height classes: mobile first, then md and up */
  heightClass: string;
  tiles: Tile[];
};

/* Only 1 row containing the last image (pushNotificationsPhone) */
const rows: Row[] = [
  {
    // Row height configuration (mobile: 240px | tablet: 340px | tablet+: 460px | desktop: 600px)
    heightClass: "h-[240px] sm:h-[340px] md:h-[460px] lg:h-[600px]",
    tiles: [
      {
        src: pushNotificationsPhone,
        alt: "A phone showing a Pickars delivery notification",
        bg: SOFT_RED,
        flex: 1,
        position: "50% 40%",
      },
    ],
  },
];

/* Film grain background */
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/* ---------- Torn paper edge path ---------- */
const EDGE_PATH =
  "M0 395V180L18 180L32 175L40 178L75 200L110 211L150 198L165 185L175 177L185 181L220 157L255 146L270 150L290 165L310 175L335 177L350 168L365 157L395 152L410 149L458 150L470 153L530 166L560 170L605 178L630 170L670 176L725 173L735 166L765 170L825 170L840 160L870 138L885 129L920 122L925 120L1400 120L1410 123L1430 121L1605 121L1620 125L1650 127L1665 127L1690 120L1710 120L1722 133L1740 130L1750 120L1915 120L1930 121L2335 121L2342 121L2323 172L2303 187L2320 196L2392 200L2430 193L2462 189L2485 197L2545 210L2576 206V395Z";

export function RoughEdge({ position }: { position: "top" | "bottom" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 2576 395"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute inset-x-0 z-25 block h-14 w-full md:h-24 lg:h-32 ${
        position === "top" ? "-top-px rotate-180" : "-bottom-px"
      }`}
    >
      <path d={EDGE_PATH} fill={EDGE_COLOR} />
    </svg>
  );
}

const Photo = ({ tile, priority }: { tile: Tile; priority: boolean }) => {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative h-full w-full overflow-hidden">
      {!failed && (
        <Image
          src={tile.src}
          alt={tile.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 80vw"
          priority={priority}
          className="object-cover"
          style={{ objectPosition: tile.position ?? "50% 50%" }}
          onError={() => setFailed(true)}
        />
      )}

      {/* Dark overlay for readability */}
      <div className="pointer-events-none absolute inset-0 bg-black/10" />

      {/* Grain layer */}
      <div
        className="pointer-events-none absolute inset-0 opacity-25 mix-blend-overlay"
        style={{ backgroundImage: GRAIN, backgroundSize: "220px 220px" }}
      />
    </div>
  );
};

export default function PickarsMosaic() {
  const rootRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const tiles = gsap.utils.toArray<HTMLElement>("[data-tile]");
      const inners = gsap.utils.toArray<HTMLElement>("[data-tile-inner]");

      // Tiles reveal upward
      gsap.from(tiles, {
        clipPath: "inset(100% 0% 0% 0% round 16px)",
        duration: 1,
        stagger: 0.08,
        ease: "power3.out",
      });

      // Wordmark slides up
      gsap.from(wordRef.current, {
        yPercent: 60,
        opacity: 0,
        duration: 1.1,
        delay: 0.5,
        ease: "power3.out",
      });

      // Parallax effect on scroll
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        inners.forEach((el) => {
          gsap.fromTo(
            el,
            { yPercent: -6, scale: 1.12 },
            {
              yPercent: 6,
              scale: 1.12,
              ease: "none",
              scrollTrigger: {
                trigger: heroRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        });
      });

      mm.add("(max-width: 767px)", () => {
        inners.forEach((el) => {
          gsap.fromTo(
            el,
            { yPercent: -2, scale: 1.05 },
            {
              yPercent: 2,
              scale: 1.05,
              ease: "none",
              scrollTrigger: {
                trigger: heroRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        });
      });

      gsap.from(introRef.current?.children || [], {
        opacity: 0,
        y: 30,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: introRef.current, start: "top 85%" },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative w-full overflow-hidden bg-black pb-40 font-['Lufga'] text-white"
    >
      <div className="relative z-10">
        <div className="mb-16 mt-24 flex w-full items-center justify-center gap-4 px-4">
          <span className="text-center text-[16vw] font-semibold leading-none tracking-tighter text-white md:text-[8vw]">
            Redefining Doorstep Deliveries
          </span>
        </div>

        {/* ---------- Single Image Hero / Mosaic ---------- */}
        <div
          ref={heroRef}
          className="relative flex w-full flex-col gap-1.5 overflow-hidden bg-black/40 p-1.5 sm:gap-2 sm:p-2"
        >
          {rows.map((row, ri) => (
            <div
              key={ri}
              className={`relative flex w-full gap-1.5 sm:gap-2 ${row.heightClass}`}
            >
              {row.tiles.map((t, ti) => (
                <div
                  key={`${ri}-${ti}`}
                  data-tile
                  className="relative min-w-0 overflow-hidden rounded-xl sm:rounded-2xl"
                  style={{ flex: t.flex, backgroundColor: t.bg }}
                >
                  <div
                    data-tile-inner
                    className="absolute inset-0 will-change-transform"
                  >
                    <Photo tile={t} priority={true} />
                  </div>
                </div>
              ))}

              {/* Giant wordmark across the image */}
              {ri === rows.length - 1 && (
                <div
                  ref={wordRef}
                  className="pointer-events-none absolute inset-0 z-10 flex items-center justify-between gap-2 px-1 sm:gap-4 sm:px-2 md:px-4"
                >
                  <span className="text-[14vw] font-semibold leading-none tracking-tighter text-white md:text-[13vw]">
                    {productName.slice(0, 3).toLowerCase()}
                  </span>
                  <span className="h-px flex-1 bg-white/70" />
                  <span className="text-[14vw] font-semibold leading-none tracking-tighter text-white md:text-[13vw]">
                    {productName.slice(3)}
                    <span className="align-super text-[5vw] font-medium md:text-[4vw]">
                      ®
                    </span>
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ---------- Intro ---------- */}
        <div className="mx-auto max-w-4xl px-5 py-12 text-center sm:px-6 sm:py-16 md:py-28">
          <div ref={introRef} className="flex flex-col items-center">
            <p className="mt-4 text-xl font-medium leading-snug tracking-tight sm:mt-8 sm:text-2xl md:text-4xl md:leading-[1.2]">
              {productName} ® — a delivery app connecting people and businesses
              in Port Harcourt with trusted dispatch riders. Send, receive and
              stay updated on your packages, all from your phone.
            </p>
            <div className="mt-8 sm:mt-10">
              <DownloadButtons dark={true} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
