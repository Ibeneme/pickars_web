"use client";

import React, { memo } from "react";

/* ---------- Edit these ---------- */
// Add or remove areas freely. They are split evenly between the two rows.
const TOWNS = [
  "GRA Phase 1",
  "GRA Phase 2",
  "GRA Phase 3",
  "Old GRA",
  "New GRA",
  "Rumuola",
  "Rumuomasi",
  "Rumuokoro",
  "Rumuokwuta",
  "Rumuigbo",
  "Rumuokwurusi",
  "Rumueme",
  "Rumuibekwe",
  "Rumuodara",
  "Rumuodomaya",
  "Rumuagholu",
  "Peter Odili",
  "Woji",
  "Elelenwo",
  "Eliozu",
  "Trans-Amadi",
  "Ada George",
  "Ikwerre Road",
  "Aba Road",
  "Choba",
  "Uniport",
  "Alakahia",
  "Eleme Junction",
  "Borokiri",
  "Diobu",
  "Mile 1",
  "Mile 2",
  "Mile 3",
  "D/Line",
  "Mgbuoba",
  "Agip",
  "Rumuolumeni",
  "Ozuoba",
  "Rukpokwu",
  "Igwuruta",
  "Elekahia",
  "Stadium Road",
  "Amadi Ama",
  "Abuloma",
  "Eagle Island",
  "Presidential Road",
  "Location Road",
  "Port Harcourt Township",
];

const COLORS = [
  { bg: "#ff7a3d" }, // orange
  { bg: "#ff9ec7" }, // pink
  { bg: "#ffc21a" }, // yellow
  { bg: "#1db96f" }, // green
];

/* small tilt on each chip so the strip feels hand-placed */
const TILTS = ["-rotate-2", "rotate-1", "rotate-2", "-rotate-1"];

// seconds for one full loop (bigger = slower). Different speeds feel more natural.
const ROW_DURATIONS = [70, 90];
/* -------------------------------- */

const CSS = `
/* the track holds two identical copies; sliding by half a track loops seamlessly.
   -50% -> 0 makes everything flow from left to right. */
@keyframes town-ltr {
  from { transform: translate3d(-50%, 0, 0); }
  to   { transform: translate3d(0, 0, 0); }
}
.town-track {
  animation: town-ltr linear infinite;
  will-change: transform;
}
.town-marquee:hover .town-track,
.town-marquee:focus-within .town-track {
  animation-play-state: paused;
}
@media (prefers-reduced-motion: reduce) {
  .town-track { animation: none; }
}
`;

const AreaChip = memo(function AreaChip({
  name,
  color,
  tilt,
}: {
  name: string;
  color: { bg: string };
  tilt: string;
}) {
  return (
    <li
      className={`inline-flex shrink-0 items-center gap-2 rounded-full border-[2px] border-black px-3.5 py-2 transition-transform duration-200 hover:-translate-y-1 hover:rotate-0 motion-reduce:transition-none sm:px-5 sm:py-2.5 ${tilt}`}
      style={{ backgroundColor: color.bg }}
    >
      <span className="whitespace-nowrap text-base font-medium tracking-tight text-black sm:text-xl">
        {name}
      </span>
    </li>
  );
});

/* one full copy of a row's chips */
const Group = memo(function Group({
  towns,
  offset,
  hidden,
}: {
  towns: string[];
  offset: number;
  hidden?: boolean;
}) {
  return (
    <ul
      className="flex shrink-0 items-center gap-3 pr-3 sm:gap-4 sm:pr-4"
      aria-hidden={hidden || undefined}
    >
      {towns.map((name, i) => (
        <AreaChip
          key={`${name}-${i}`}
          name={name}
          // fixed pattern (not Math.random) so server and client render the same HTML
          color={COLORS[(i + offset) % COLORS.length]}
          tilt={TILTS[(i * 3 + offset) % TILTS.length]}
        />
      ))}
    </ul>
  );
});

const MARQUEE_MASK =
  "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)";

export default function TownMarquee() {
  // split the list into two rows
  const half = Math.ceil(TOWNS.length / 2);
  const rows = [TOWNS.slice(0, half), TOWNS.slice(half)];

  return (
    <section
      className="town-marquee relative z-0 w-full py-6 font-['Lufga'] sm:py-10"
      aria-label="Areas in Port Harcourt that Pickars delivers to"
    >
      <style>{CSS}</style>

      <div className="flex flex-col gap-3 sm:gap-4">
        {rows.map((row, ri) => (
          <div
            key={ri}
            className="overflow-hidden py-2 motion-reduce:overflow-x-auto"
            style={{ maskImage: MARQUEE_MASK, WebkitMaskImage: MARQUEE_MASK }}
          >
            <div
              className="town-track flex w-max"
              style={{ animationDuration: `${ROW_DURATIONS[ri]}s` }}
            >
              <Group towns={row} offset={ri * 2} />
              <Group towns={row} offset={ri * 2} hidden />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
