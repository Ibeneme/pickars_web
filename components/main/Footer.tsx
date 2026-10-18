"use client";

import React, { memo } from "react";
import Link from "next/link";
import {
  FaEnvelope,
  FaChevronUp,
  FaInstagram,
  FaXTwitter,
  FaFacebookF,
  FaLinkedinIn,
} from "react-icons/fa6";
import logo from "@/public/logo.svg";
import { motion } from "framer-motion";
import AppDownloadCTA from "./AppDownloadCTA";

/* Footer colour: also used to fill the cloud edge at the top */
const FOOTER_BG = "#000000";

/* Colour of the border that outlines the top cloud (set to FOOTER_BG to hide it) */
const CLOUD_BORDER = "#ff0000";

/* Irregular cloud bumps for the top edge (x, radius) across a 1600 wide strip */
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

/* ------------------------------------------------------------------ */
/*  Footer skyline: one flat row of separate buildings (built once)    */
/* ------------------------------------------------------------------ */
const VB_W = 1440;
const VB_H = 220;
const GROUND = 220;

function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Tower {
  x: number;
  w: number;
  h: number;
  slant: boolean;
}

function buildSkyline(): Tower[] {
  const rnd = mulberry32(77);
  const towers: Tower[] = [];
  let x = 0;
  let prevH = 0;
  while (x < VB_W) {
    const w = 44 + rnd() * 50;
    let h = 60 + rnd() * 130;
    // keep neighbours visibly different in height
    if (Math.abs(h - prevH) < 25) h = Math.min(195, h + 40);
    towers.push({ x, w, h, slant: rnd() > 0.8 });
    x += w + 4 + rnd() * 8;
    prevH = h;
  }
  return towers;
}

const TOWERS = buildSkyline();

const FooterSkyline = memo(function FooterSkyline() {
  return (
    <svg
      className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-40 w-full sm:h-52 md:h-64"
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      preserveAspectRatio="xMidYMax slice"
      fill="none"
      aria-hidden
    >
      <g fill="#ffffff" opacity="0.06">
        {TOWERS.map((t, i) => {
          const top = GROUND - t.h;
          return t.slant ? (
            <polygon
              key={i}
              points={`${t.x},${GROUND} ${t.x},${top + 18} ${
                t.x + t.w
              },${top} ${t.x + t.w},${GROUND}`}
            />
          ) : (
            <rect key={i} x={t.x} y={top} width={t.w} height={t.h} />
          );
        })}
      </g>
    </svg>
  );
});

/* Cloud edge that sits on top of the footer */
const TopCloud = memo(function TopCloud() {
  return (
    <svg
      viewBox="0 0 1600 140"
      preserveAspectRatio="xMidYMax slice"
      className="pointer-events-none absolute bottom-full left-0 right-0 block h-[70px] w-full sm:h-[110px]"
      aria-hidden="true"
    >
      <g fill={FOOTER_BG}>
        {bumps.map((b) => (
          <circle key={b.x} cx={b.x} cy={140} r={b.r} />
        ))}
        <rect x={0} y={100} width={1600} height={41} />
      </g>
    </svg>
  );
});

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    {
      name: "Instagram",
      url: "https://www.instagram.com/pickars_official?igsh=MWY4aTJieHVtMGltYg%3D%3D&utm_source=qr",
      icon: <FaInstagram size={16} />,
    },
    {
      name: "X (Twitter)",
      url: "https://x.com/pickars_app?s=21",
      icon: <FaXTwitter size={16} />,
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/share/1cW4kyitrJ/?mibextid=wwXIfr&wa_status_inline=true",
      icon: <FaFacebookF size={16} />,
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/company/pickars/",
      icon: <FaLinkedinIn size={16} />,
    },
  ];

  return (
    <footer
      className="relative mb-0 mt-[150px] w-full z-[24] pt-[64px] font-['Lufga'] text-white sm:mt-[110px] overflow-x-clip"
      style={{ backgroundColor: FOOTER_BG }}
    >
      <TopCloud />

      <AppDownloadCTA />

      <FooterSkyline />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-16 pt-20 md:px-0">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="flex flex-col items-start lg:col-span-5">
            <div className="mb-2 flex items-center gap-3">
              <img
                src={logo.src || logo}
                alt="Pickars Logo"
                className="h-9 w-auto"
              />
              <h2 className="text-2xl font-black tracking-tight text-white">
                Pickars
              </h2>
            </div>

            <p className="mb-8 mt-2 max-w-md text-sm font-normal leading-relaxed text-gray-400">
              At Pickars, we make doorstep deliveries simple, fast, and
              reliable. With a network of trained riders across Nigeria, we make
              sending and receiving packages seamless, convenient, and
              stress-free for everyone.
            </p>

            <div className="flex w-full flex-col gap-5">
              <div className="mt-1 flex items-center gap-2.5">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-gray-400 transition-colors hover:bg-[#FF0000] hover:text-white"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            <div>
              <h3 className="mb-5 text-xs font-black uppercase tracking-widest text-white">
                Company
              </h3>
              <ul className="flex flex-col gap-3.5">
                <li>
                  <Link
                    href="/app/app-features"
                    className="text-sm font-medium text-gray-400 transition-colors hover:text-white"
                  >
                    App Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="/app/faqs"
                    className="text-sm font-medium text-gray-400 transition-colors hover:text-white"
                  >
                    Our FAQs
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-5 text-xs font-black uppercase tracking-widest text-white">
                Support
              </h3>
              <ul className="flex flex-col gap-3.5">
                <li>
                  <Link
                    href="/app/help-center"
                    className="text-sm font-medium text-gray-400 transition-colors hover:text-white"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="/app/tracking"
                    className="text-sm font-medium text-gray-400 transition-colors hover:text-white"
                  >
                    Find a Lost item
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-5 text-xs font-black uppercase tracking-widest text-white">
                Legal
              </h3>
              <ul className="flex flex-col gap-3.5">
                <li>
                  <Link
                    href="/app/terms-of-use"
                    className="text-sm font-medium text-gray-400 transition-colors hover:text-white"
                  >
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link
                    href="/app/privacy-policy"
                    className="text-sm font-medium text-gray-400 transition-colors hover:text-white"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <motion.a
                    href="mailto:support@pickars.com"
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    className="group mt-4 flex w-fit items-center gap-3.5 rounded-2xl bg-white/5 p-3.5 transition-colors hover:bg-white/10"
                  >
                    <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FF0000] text-white">
                      <FaEnvelope size={14} />
                      <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-black" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                        Email us
                      </p>
                      <p className="text-sm font-bold text-white">
                        support@pickars.com
                      </p>
                    </div>
                  </motion.a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Added overflow-hidden and adjusted max size clamp to prevent breaking layout horizontally */}
        <div className="mt-16 w-full select-none overflow-hidden">
          <h1 className="w-full text-center text-[clamp(3.3rem,10vw,11rem)] font-black leading-[0.8] tracking-tighter text-white sm:text-left">
            Pickars<span className="text-[#ff0000]">.</span>
          </h1>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs font-medium text-gray-500">
            © {new Date().getFullYear()} Pickars. Built by{" "}
            <a
              href="https://www.boringthinkers.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-gray-400 transition-colors hover:text-white"
            >
              BORING THINKERS LIMITED
            </a>
            . All rights reserved.
          </p>
          <motion.button
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="group flex items-center gap-3 text-xs font-black uppercase tracking-widest text-white transition-colors hover:text-[#FF0000]"
          >
            Back to Top
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 transition-colors group-hover:bg-[#FF0000] group-hover:text-white">
              <FaChevronUp className="h-3.5 w-3.5" />
            </div>
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
