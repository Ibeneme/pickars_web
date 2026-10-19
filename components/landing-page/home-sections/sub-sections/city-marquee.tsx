"use client";

import React, { memo } from "react";

const TOWNS = [
  "GRA Phase 2",
  "Rumuola",
  "Peter Odili",
  "Woji",
  "Old GRA",
  "Ada George",
  "Ikwerre Road",
  "Choba",
  "Uniport",
  "Eleme Junction",
  "Trans-Amadi",
  "Rumuigbo",
  "Rumuokwurusi",
  "Mgbuoba",
  "D/Line",
  "Borokiri",
];

const COLORS = [
  { bg: "#ff7a3d", accent: "#ffc21a" }, // orange
  { bg: "#ff9ec7", accent: "#1db96f" }, // pink
  { bg: "#ffc21a", accent: "#ff9ec7" }, // yellow
  { bg: "#1db96f", accent: "#ff9ec7" }, // green
];

const ROWS = [
  { offset: 0, duration: 55, reverse: false },
  { offset: 5, duration: 70, reverse: true },
  { offset: 10, duration: 60, reverse: false },
];

const CSS = `
@keyframes town-slide { from{transform:translateX(0)} to{transform:translateX(-50%)} }
.town-track { animation: town-slide var(--dur, 60s) linear infinite; will-change: transform; }
.town-track.rev { animation-direction: reverse; }
.town-band:hover .town-track { animation-play-state: paused; }
@media (prefers-reduced-motion: reduce) {
  .town-track { animation: none !important; }
}
`;

const Ticket = memo(function Ticket({
  name,
  color,
}: {
  name: string;
  color: { bg: string; accent: string };
}) {
  return (
    <li
      className="relative flex shrink-0 items-center justify-between rounded-[12px] border-2 border-black px-4 py-2 sm:rounded-[16px] sm:border-[3px] sm:px-5 sm:py-3 "
      style={{ backgroundColor: color.bg }}
    >
      <div className="flex flex-col pr-3 sm:pr-4">
        <span className="whitespace-nowrap text-base font-black tracking-tight text-black sm:text-xl">
          {name}
        </span>
      </div>

      <div className="flex flex-col items-center justify-center self-stretch border-l-2 border-dashed border-black/40 pl-3 sm:pl-4">
        <span className="mt-1 font-mono text-[9px] font-bold tracking-widest text-black/80 sm:text-[10px]">
          PH
        </span>
      </div>
    </li>
  );
});

const Row = memo(function Row({
  offset,
  duration,
  reverse,
}: {
  offset: number;
  duration: number;
  reverse: boolean;
}) {
  // rotate the list so each row starts somewhere different
  const list = [
    ...TOWNS.slice(offset % TOWNS.length),
    ...TOWNS.slice(0, offset % TOWNS.length),
  ];

  return (
    <div className="overflow-hidden py-1">
      <div
        className={`town-track flex w-max ${reverse ? "rev" : ""}`}
        style={{ ["--dur" as string]: `${duration}s` }}
      >
        {/* two identical halves, so translating by -50% loops seamlessly */}
        {[0, 1].map((half) => (
          <ul
            key={half}
            className="flex shrink-0 gap-3 pr-3 sm:gap-4 sm:pr-4"
            aria-hidden={half === 1}
          >
            {list.map((town, i) => (
              <Ticket
                key={`${half}-${town}`}
                name={town}
                color={COLORS[(i + offset) % COLORS.length]}
              />
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
});

export default function TownMarquee() {
  return (
    <section
      className="town-band relative z-0 flex w-screen flex-col gap-2.5 overflow-hidden py-6 sm:gap-4 sm:py-8"
      aria-label="Towns in Port Harcourt Pickars delivers to"
    >
      <style>{CSS}</style>
      {ROWS.map((r) => (
        <Row key={r.offset} {...r} />
      ))}
    </section>
  );
}
