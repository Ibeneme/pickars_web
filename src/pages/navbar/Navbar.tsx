import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FaApple } from "react-icons/fa";
import { BiLogoPlayStore } from "react-icons/bi";
import navImage from "../../assets/images/logo.png";
import { ANDROID_URL, IOS_URL } from "../../sections/Hero/HeroSection";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const currentPath = window.location.pathname;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/app/our-company" },
    { name: "FAQs", path: "/app/faqs" },
    { name: "Blog", path: "#", disabled: true, badge: "Soon" },
    // { name: "Support", path: "/app/help-center" },
    // { name: "Track", path: "/app/tracking" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 font-['Lufga'] ${
        scrolled ? "pt-4" : "pt-8"
      }`}
    >
      <div className="mx-auto max-w-4xl px-6 flex justify-center">
        <div
          className={`flex items-center justify-between gap-8 rounded-full border border-white/20 bg-white/70 px-4 py-2.5 backdrop-blur-2xl transition-all duration-500 ${
            scrolled ? "md:w-auto md:gap-20 border-[2px]" : "w-full"
          }`}
        >
          {/* Logo Section - always visible */}
          <a href="/" className="flex items-center gap-2 pl-2 group">
            <div className="relative">
              <img
                src={navImage}
                alt="Pickars Logo"
                className="h-8 w-auto transition-transform duration-500 group-hover:rotate-[360deg] rounded-full"
              />
            </div>
            <h3 className="text-xl font-black tracking-tighter text-[#121212]">
              Pickars
            </h3>
          </a>

          {/* Desktop Nav Links */}
          <ul className="hidden items-center gap-1 md:flex">
            {navItems.map(({ name, path, disabled, badge }) => {
              const isActive = currentPath === path;
              return (
                <li key={name}>
                  <a
                    href={disabled ? undefined : path}
                    className={`relative px-4 py-2 text-sm font-bold transition-all duration-300 rounded-full flex items-center gap-1.5 ${
                      disabled
                        ? "text-gray-400 cursor-not-allowed pointer-events-none opacity-60"
                        : isActive
                        ? "bg-[#FF0000] text-white"
                        : "text-gray-600 hover:bg-black/5"
                    }`}
                  >
                    {name}
                    {badge && (
                      <span
                        className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-full uppercase tracking-wider ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {badge}
                      </span>
                    )}
                    {isActive && !disabled && (
                      <motion.div
                        layoutId="navPill"
                        className="absolute inset-0 rounded-full bg-[#FF0000] -z-10"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Download & Toggle */}
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 lg:flex">
              <motion.a
                href={IOS_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#121212] text-white transition-colors hover:bg-[#FF0000]"
              >
                <FaApple size={18} />
              </motion.a>
              <motion.a
                href={ANDROID_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#121212] text-white transition-colors hover:bg-[#FF0000]"
              >
                <BiLogoPlayStore size={18} />
              </motion.a>
            </div>

            <button
              className={`flex h-10 w-10 items-center justify-center rounded-full transition-all ${
                isOpen ? "bg-[#FF0000] text-white" : "bg-gray-100 text-black"
              } md:hidden`}
              onClick={() => setIsOpen(!isOpen)}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90 }}
                    animate={{ rotate: 0 }}
                    exit={{ rotate: 90 }}
                  >
                    <X size={20} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90 }}
                    animate={{ rotate: 0 }}
                    exit={{ rotate: -90 }}
                  >
                    <Menu size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="absolute left-6 right-6 top-24 z-[-1] overflow-hidden rounded-[40px] border border-white/20 bg-white/95 p-10 backdrop-blur-3xl md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navItems.map(({ name, path, disabled, badge }, i) => {
                const isActive = currentPath === path;
                return (
                  <motion.a
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    key={name}
                    href={disabled ? undefined : path}
                    onClick={() => !disabled && setIsOpen(false)}
                    className={`flex items-center justify-between text-3xl font-black tracking-tighter ${
                      disabled
                        ? "text-gray-300 pointer-events-none"
                        : isActive
                        ? "text-[#FF0000]"
                        : "text-[#121212]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {name}
                      {badge && (
                        <span className="text-[10px] bg-gray-200 text-gray-600 font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                          {badge}
                        </span>
                      )}
                    </div>
                    {!disabled && (
                      <ArrowRight
                        className={
                          isActive ? "text-[#FF0000]" : "text-gray-400"
                        }
                        size={24}
                      />
                    )}
                  </motion.a>
                );
              })}

              <div className="mt-6 flex flex-col gap-4 border-t border-gray-100 pt-8">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  Get Pickars on your device
                </p>
                <div className="flex gap-4">
                  <a
                    href={IOS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#121212] py-4 text-white"
                  >
                    <FaApple size={20} />{" "}
                    <span className="text-sm font-bold">iOS</span>
                  </a>
                  <a
                    href={ANDROID_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-gray-200 py-4 text-[#121212]"
                  >
                    <BiLogoPlayStore size={20} />{" "}
                    <span className="text-sm font-bold">Android</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
