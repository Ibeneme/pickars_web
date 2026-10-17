"use client";

import React from "react";
import Image from "next/image";
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
import { SITE, SOCIAL_LINKS } from "@/utils/seo/config";

type SocialName = (typeof SOCIAL_LINKS)[number]["name"];

const SOCIAL_ICONS: Record<SocialName, React.ReactNode> = {
  Instagram: <FaInstagram size={16} />,
  "X (Twitter)": <FaXTwitter size={16} />,
  Facebook: <FaFacebookF size={16} />,
  LinkedIn: <FaLinkedinIn size={16} />,
};

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full overflow-hidden mb-0 bg-black font-['Lufga'] text-white">
      <AppDownloadCTA />

      <div className="mx-auto max-w-7xl px-6 pb-16 pt-20 md:px-0">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="flex flex-col items-start lg:col-span-5">
            <div className="mb-2 flex items-center gap-3">
              <Image
                src={logo}
                alt=""
                className="h-9 w-auto"
              />
              <p className="text-2xl font-black tracking-tight text-white">
                Pickars
              </p>
            </div>

            <p className="mb-8 mt-2 max-w-md text-sm font-normal leading-relaxed text-gray-400">
              At Pickars, we make doorstep deliveries simple, fast, and
              reliable. With a network of trained riders across Nigeria, we make
              sending and receiving packages seamless, convenient, and
              stress-free for everyone.
            </p>

            <div className="flex w-full flex-col gap-5">
              <div className="mt-1 flex items-center gap-2.5">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-gray-400 transition-colors hover:bg-[#FF0000] hover:text-white"
                    aria-label={social.name}
                  >
                    {SOCIAL_ICONS[social.name]}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7"
          >
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
                    href={`mailto:${SITE.email}`}
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
                        {SITE.email}
                      </p>
                    </div>
                  </motion.a>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="mt-16 w-full select-none overflow-hidden" aria-hidden="true">
          <p className="w-full text-center text-[clamp(3.3rem,12vw,14rem)] font-black leading-[0.8] tracking-tighter text-white sm:text-left">
            Pickars<span className="text-[#ff0000]">.</span>
          </p>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs font-medium text-gray-500">
            © {new Date().getFullYear()} {SITE.name}. Built by{" "}
            <a
              href={SITE.foundingCompany.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-gray-400 transition-colors hover:text-white"
            >
              {SITE.foundingCompany.name.toUpperCase()}
            </a>
            . All rights reserved.
          </p>
          <motion.button
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            type="button"
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
