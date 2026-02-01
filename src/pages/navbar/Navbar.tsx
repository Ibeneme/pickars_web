import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FaApple } from "react-icons/fa";
import { BiLogoPlayStore } from "react-icons/bi";
import navImage from "../../assets/images/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const currentPath = window.location.pathname;

  // Track scroll to change navbar density
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/app/our-company" },
    { name: "FAQs", path: "/app/faqs" },
    { name: "Help Center", path: "/app/help-center" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled ? "py-4" : "py-6"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div
          className={`flex items-center justify-between rounded-[24px] border border-white/10 bg-white/70 px-6 py-3 backdrop-blur-xl transition-all ${
            scrolled ? "shadow-2xl shadow-black/5" : ""
          }`}
        >
          {/* Logo Section */}
          <a href="/" className="flex items-center gap-2 group">
            <img
              src={navImage}
              alt="Pickars Logo"
              className="h-8 w-auto transition-transform group-hover:scale-110"
            />
            <h3 className="text-xl font-black tracking-tighter text-[#121212]">
              Pickars
            </h3>
          </a>

          {/* Desktop Nav Links */}
          <ul className="hidden items-center gap-8 md:flex">
            {navItems.map(({ name, path }) => (
              <li key={name}>
                <a
                  href={path}
                  className={`text-sm font-bold transition-all hover:text-red-600 ${
                    currentPath === path ? "text-red-600" : "text-gray-600"
                  }`}
                >
                  {name}
                </a>
              </li>
            ))}
          </ul>

          {/* Action Icons & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 lg:flex">
              <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white transition-all hover:bg-red-600">
                <FaApple size={18} />
              </button>
              <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white transition-all hover:bg-red-600">
                <BiLogoPlayStore size={18} />
              </button>
            </div>

            <button
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-black md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute left-6 right-6 top-24 z-[-1] overflow-hidden rounded-[32px] border border-white/20 bg-white/90 p-8 shadow-2xl backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navItems.map(({ name, path }, i) => (
                <motion.a
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={name}
                  href={path}
                  className="text-2xl font-black tracking-tight text-[#121212] active:text-red-600"
                >
                  {name}
                </motion.a>
              ))}
              <div className="mt-4 flex gap-4 border-t border-gray-100 pt-8">
                <div className="flex items-center gap-4 text-sm font-bold">
                  Get the app:
                  <FaApple size={24} />
                  <BiLogoPlayStore size={24} />
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
