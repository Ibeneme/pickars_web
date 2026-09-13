import React from "react";
import { Link } from "react-router-dom";
import {
  FaEnvelope,
  FaChevronUp,
  FaInstagram,
  FaXTwitter,
  FaFacebookF,
  FaLinkedinIn,
} from "react-icons/fa6";
import { FaApple } from "react-icons/fa";
import { BiLogoPlayStore } from "react-icons/bi";
import logo from "../../assets/images/logo.png";
import { motion } from "framer-motion";
import { ANDROID_URL, IOS_URL } from "../../constants";
import AppDownloadCTA from "./Contact"; // Or wherever your AppDownloadCTA component lives

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
    <footer className="relative w-full overflow-hidden bg-black font-['Lufga'] text-white">
      {/* Full-width Red Download Banner CTA */}
      <AppDownloadCTA />

      {/* Main Footer Container */}
      <div className="mx-auto max-w-7xl md:px-0 px-6 pb-16 pt-20">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          {/* Brand Identity Section */}
          <div className="flex flex-col items-start lg:col-span-5">
            <div className="mb-6 flex items-center gap-3">
              <img src={logo} alt="Pickars Logo" className="h-9 w-auto" />
              <h2 className="text-2xl font-black tracking-tight text-white">
                Pickars
              </h2>
            </div>

            <p className="mb-8 max-w-md text-sm font-normal leading-relaxed text-gray-400">
              At Pickars, we make doorstep deliveries simple, fast, and
              reliable. With a network of trained riders across Nigeria, we make
              sending and receiving packages seamless, convenient, and
              stress-free for everyone.
            </p>

            <div className="flex w-full flex-col gap-5">
              {/* Email Support */}
              <motion.a
                href="mailto:support@pickars.com"
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group flex w-fit items-center gap-3.5 rounded-2xl bg-white/5 p-3.5 transition-colors hover:bg-white/10"
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

              {/* App Download Links */}
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={IOS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2.5 rounded-xl bg-white/5 px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-white/10"
                >
                  <FaApple size={18} />
                  App Store
                </a>
                <a
                  href={ANDROID_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2.5 rounded-xl bg-white/5 px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-white/10"
                >
                  <BiLogoPlayStore size={18} />
                  Google Play
                </a>
              </div>

              {/* Social Media Links */}
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

          {/* Links Grid */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            <div>
              <h3 className="mb-5 text-xs font-black uppercase tracking-widest text-[#fff]">
                Company
              </h3>
              <ul className="flex flex-col gap-3.5">
                <li>
                  <Link
                    to="/app/app-features"
                    className="text-sm font-medium text-gray-400 transition-colors hover:text-white"
                  >
                    App Features
                  </Link>
                </li>
                <li>
                  <Link
                    to="/app/faqs"
                    className="text-sm font-medium text-gray-400 transition-colors hover:text-white"
                  >
                    Our FAQs
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-5 text-xs font-black uppercase tracking-widest text-[#fff]">
                Support
              </h3>
              <ul className="flex flex-col gap-3.5">
                <li>
                  <Link
                    to="/app/help-center"
                    className="text-sm font-medium text-gray-400 transition-colors hover:text-white"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    to="/app/find-item"
                    className="text-sm font-medium text-gray-400 transition-colors hover:text-white"
                  >
                    Find a Lost item
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-5 text-xs font-black uppercase tracking-widest text-[#fff]">
                Legal
              </h3>
              <ul className="flex flex-col gap-3.5">
                <li>
                  <Link
                    to="/app/terms-of-use"
                    className="text-sm font-medium text-gray-400 transition-colors hover:text-white"
                  >
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link
                    to="/app/privacy-policy"
                    className="text-sm font-medium text-gray-400 transition-colors hover:text-white"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Big Brand Typography */}
        <div className="mt-16 w-full select-none overflow-hidden">
          <h1 className="w-full text-center sm:text-left text-[clamp(3.3rem,12vw,14rem)] font-black leading-[0.8] tracking-tighter text-white">
            Pickars<span className="text-[#ff0000]">.</span>
          </h1>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs font-medium text-gray-500">
            © {new Date().getFullYear()} Pickars Courier Limited. Moving PH City
            forward.
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
