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

/* ------------------------------------------------------------------ */
/*  Cloud edge (traced from the supplied image)                        */
/* ------------------------------------------------------------------ */
const CLOUD_PATH =
  "M0 0 L0 109 L19 114 L38 114 L43 112 L134 113 L135 114 L140 114 L141 115 L146 115 L178 121 L194 125 L201 128 L204 125 L206 125 L209 128 L216 140 L256 140 L276 129 L293 122 L312 117 L322 117 L336 110 L353 106 L368 105 L369 106 L379 106 L400 111 L428 112 L429 111 L437 111 L438 110 L448 109 L466 103 L473 103 L474 104 L490 103 L515 97 L529 97 L537 100 L541 100 L549 94 L574 81 L593 75 L601 75 L622 84 L628 88 L640 101 L645 98 L650 98 L675 114 L679 114 L698 121 L708 120 L717 115 L727 107 L735 103 L745 100 L755 100 L762 102 L768 105 L778 114 L799 117 L800 118 L809 118 L810 119 L845 119 L846 118 L853 118 L897 107 L916 105 L917 104 L926 104 L927 103 L948 102 L952 100 L967 105 L977 103 L984 103 L985 102 L995 102 L996 101 L1025 101 L1026 102 L1036 103 L1043 107 L1064 106 L1065 105 L1108 105 L1115 108 L1134 124 L1147 133 L1156 136 L1172 139 L1178 139 L1179 140 L1524 140 L1530 138 L1538 138 L1542 140 L1667 140 L1673 138 L1693 136 L1694 135 L1708 135 L1727 140 L1742 140 L1749 132 L1752 131 L1760 132 L1769 140 L1889 140 L1890 139 L1902 139 L1903 140 L2196 140 L2184 105 L2167 91 L2168 89 L2178 85 L2188 84 L2189 83 L2229 83 L2230 84 L2249 85 L2250 86 L2257 86 L2258 87 L2281 90 L2291 85 L2309 80 L2325 78 L2326 77 L2333 77 L2334 76 L2342 76 L2343 75 L2357 75 L2364 79 L2371 81 L2388 81 L2397 79 L2413 73 L2427 64 L2433 72 L2437 74 L2447 74 L2454 71 L2465 63 L2475 62 L2481 68 L2483 74 L2489 69 L2496 67 L2537 87 L2544 88 L2552 84 L2559 84 L2565 89 L2570 90 L2575 79 L2586 64 L2594 56 L2600 54 L2608 56 L2621 68 L2627 78 L2648 66 L2666 58 L2675 58 L2679 60 L2697 78 L2710 66 L2717 63 L2723 62 L2732 65 L2739 72 L2744 81 L2750 87 L2754 89 L2764 90 L2773 88 L2793 78 L2795 78 L2799 75 L2806 73 L2812 75 L2825 89 L2846 104 L2855 107 L2859 107 L2869 104 L2879 104 L2879 0Z";

/* Footer skyline: one flat row of separate buildings (built once) */
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

/* Cloud edge that sits on top of the footer.
   Flipped (-scale-y-100) so the wavy side points up, and pinned with
   bottom-full so it rises out of the top of the footer. */
const TopCloud = memo(function TopCloud() {
  return (
    <svg
      viewBox="0 0 2880 141"
      preserveAspectRatio="xMidYMin slice"
      className="pointer-events-none absolute bottom-full left-0 right-0 block h-[70px] w-full -scale-y-100 sm:h-[110px ]"
      aria-hidden="true"
    >
      <path d={CLOUD_PATH} fill={FOOTER_BG} />
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
      className="relative mb-0 mt-[150px] w-full z-[24]  font-['Lufga'] text-white sm:mt-[110px] overflow-x-clip"
      style={{ backgroundColor: FOOTER_BG }}
    >
      <TopCloud />



      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-16 pt-24 md:px-0">
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
          <p
            aria-hidden="true"
            className="w-full text-[clamp(6.2rem,17vw,20rem)] font-black leading-[1] tracking-tighter text-white sm:text-left md:text-[clamp(14rem,26vw,32rem)]"
          >
            Pickars
            <span style={{ color: "#ff0000" }}>.</span>
          </p>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs font-medium text-white uppercase">
            © {new Date().getFullYear()} Pickars. Built by{" "}
            <a
              href="https://www.boringthinkers.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
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
