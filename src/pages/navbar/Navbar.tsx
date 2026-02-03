import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FaApple } from "react-icons/fa";
import { BiLogoPlayStore } from "react-icons/bi";
import navImage from "../../assets/images/logo.png";

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
    { name: "Support", path: "/app/help-center" },
    { name: "Track", path: "/app/tracking", highlight: true },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 font-['Lufga'] ${
        scrolled ? "pt-4" : "pt-8"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 flex justify-center">
        <div
          className={`flex items-center justify-between gap-8 rounded-full border border-white/20 bg-white/70 px-4 py-2.5 backdrop-blur-2xl transition-all duration-500 ${
            scrolled
              ? "shadow-[0_20px_50px_rgba(0,0,0,0.1)] md:w-auto border-[2px]"
              : "w-full"
          }`}
        >
          {/* Logo Section */}
          {/* Logo Section */}
          <a href="/" className="flex items-center gap-2 pl-2 group">
            <div className="relative">
              <img
                src={navImage}
                alt="Pickars Logo"
                className="h-8 w-auto transition-transform duration-500 group-hover:rotate-[360deg]"
              />
            </div>

            {/* Brand Name */}
            <h3
              className={`text-xl font-black tracking-tighter text-[#121212] transition-all duration-500
    ${
      scrolled
        ? "opacity-100 translate-x-0"
        : "opacity-0 -translate-x-3 pointer-events-none"
    }
    sm:opacity-100 sm:translate-x-0`}
            >
              Pickars
            </h3>
          </a>
          {/* Desktop Nav Links */}
          <ul className="hidden items-center gap-1 md:flex">
            {navItems.map(({ name, path, highlight }) => (
              <li key={name}>
                <a
                  href={path}
                  className={`relative px-4 py-2 text-sm font-bold transition-all duration-300 rounded-full hover:bg-black/5 ${
                    currentPath === path ? "text-red-600" : "text-gray-600"
                  } ${highlight ? "bg-red-50 text-red-600" : ""}`}
                >
                  {name}
                  {currentPath === path && !highlight && (
                    <motion.div
                      layoutId="navUnderline"
                      className="absolute bottom-0 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-red-600"
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          {/* Download & Toggle */}
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 lg:flex">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#121212] text-white transition-colors hover:bg-red-600"
              >
                <FaApple size={18} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#121212] text-white transition-colors hover:bg-red-600"
              >
                <BiLogoPlayStore size={18} />
              </motion.button>
            </div>

            {/* Premium Mobile Trigger */}
            <button
              className={`flex h-10 w-10 items-center justify-center rounded-full transition-all ${
                isOpen ? "bg-red-600 text-white" : "bg-gray-100 text-black"
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
            className="absolute left-6 right-6 top-24 z-[-1] overflow-hidden rounded-[40px] border border-white/20 bg-white/95 p-10 shadow-[0_40px_80px_rgba(0,0,0,0.10)] backdrop-blur-3xl md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navItems.map(({ name, path }, i) => (
                <motion.a
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={name}
                  href={path}
                  className="flex items-center justify-between text-3xl font-black tracking-tighter text-[#121212]"
                >
                  {name}
                  <ArrowRight className="text-red-600" size={24} />
                </motion.a>
              ))}

              <div className="mt-6 flex flex-col gap-4 border-t border-gray-100 pt-8">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  Get Pickars on your device
                </p>
                <div className="flex gap-4">
                  <button className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#121212] py-4 text-white">
                    <FaApple size={20} />{" "}
                    <span className="text-sm font-bold">iOS</span>
                  </button>
                  <button className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-gray-200 py-4 text-[#121212]">
                    <BiLogoPlayStore size={20} />{" "}
                    <span className="text-sm font-bold">Android</span>
                  </button>
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
