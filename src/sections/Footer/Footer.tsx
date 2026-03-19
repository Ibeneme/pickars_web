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
// Importing the shared constants
import { ANDROID_URL, IOS_URL } from "../Hero/HeroSection";

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    {
      name: "Instagram",
      url: "https://www.instagram.com/pickars_official?igsh=MWY4aTJieHVtMGltYg%3D%3D&utm_source=qr",
      icon: <FaInstagram size={18} />,
    },
    {
      name: "X (Twitter)",
      url: "https://x.com/pickars_app?s=21",
      icon: <FaXTwitter size={18} />,
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/share/1cW4kyitrJ/?mibextid=wwXIfr&wa_status_inline=true",
      icon: <FaFacebookF size={18} />,
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/company/pickars/",
      icon: <FaLinkedinIn size={18} />,
    },
  ];

  return (
    <footer className="bg-[#080808] pt-24 pb-32 font-['Lufga'] text-white">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          {/* Brand Identity Section */}
          <div className="lg:col-span-5">
            <div className="mb-8 flex items-center gap-3">
              <img src={logo} alt="Pickars Logo" className="h-10 w-auto" />
              <h2 className="text-2xl font-black tracking-tighter">Pickars</h2>
            </div>

            <p className="mb-10 max-w-md text-sm leading-relaxed text-gray-400">
              At Pickars, we make doorstep deliveries simple, fast, and
              reliable. With a network of trained riders across Nigeria, we make
              sending and receiving packages seamless, convenient, and
              stress-free for everyone.
            </p>

            <div className="flex flex-col gap-6">
              {/* Email Support */}
              <a
                href="mailto:support@pickars.com"
                className="group flex w-fit items-center gap-4 rounded-2xl border border-white/5 bg-white/5 p-4 transition-all hover:border-red-600/50 hover:bg-white/10"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600 text-white transition-transform group-hover:scale-110">
                  <FaEnvelope size={14} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                    Email us
                  </p>
                  <p className="text-sm font-bold">support@pickars.com</p>
                </div>
              </a>

              {/* Improved: App Download Links */}
              <div className="flex flex-wrap gap-4 mt-2">
                <a
                  href={IOS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 rounded-xl bg-white/5 px-4 py-3 text-sm font-bold text-white transition-all hover:bg-white/10 hover:shadow-md hover:shadow-red-600/20"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-white transition-transform group-hover:scale-110">
                    <FaApple size={20} />
                  </div>
                  App Store
                </a>
                <a
                  href={ANDROID_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 rounded-xl bg-white/5 px-4 py-3 text-sm font-bold text-white transition-all hover:bg-white/10 hover:shadow-md hover:shadow-red-600/20"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-white transition-transform group-hover:scale-110">
                    <BiLogoPlayStore size={20} />
                  </div>
                  Google Play
                </a>
              </div>

              {/* Social Media Links */}
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-gray-400 transition-all hover:bg-red-600 hover:text-white hover:shadow-md hover:shadow-red-600/20"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-7 lg:grid-cols-3">
            <div>
              <h4 className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-red-600">
                Company
              </h4>
              <ul className="flex flex-col gap-4">
                <li>
                  <Link
                    to="/app/our-company"
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    Our Company
                  </Link>
                </li>
                <li>
                  <Link
                    to="/app/app-features"
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    App Features
                  </Link>
                </li>
                <li>
                  <Link
                    to="/app/faqs"
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    Our FAQs
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-red-600">
                Support
              </h4>
              <ul className="flex flex-col gap-4">
                <li>
                  <Link
                    to="/app/help-center"
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    to="/app/find-item"
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    Find a Lost item
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-red-600">
                Legal
              </h4>
              <ul className="flex flex-col gap-4">
                <li>
                  <Link
                    to="/app/terms-of-use"
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link
                    to="/app/privacy-policy"
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-24 flex flex-col items-center justify-between gap-8 border-t border-white/5 pt-12 md:flex-row">
          <p className="text-xs font-medium text-gray-600">
            © {new Date().getFullYear()} Pickars Courier Limited. Moving PH City
            forward.
          </p>
          <motion.button
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="group flex items-center gap-3 text-xs font-black uppercase tracking-widest text-white"
          >
            Back to Top
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 group-hover:bg-red-600 group-hover:border-red-600 transition-all">
              <FaChevronUp />
            </div>
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
