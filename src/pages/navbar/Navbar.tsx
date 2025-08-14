import { useState } from "react";
import { Menu, X } from "lucide-react";
import "./Navbar.css";
import { FaApple } from "react-icons/fa";
import { BiLogoPlayStore } from "react-icons/bi";
import navImage from "../../assets/images/logo.png";
import { NavIcon } from "../../components/NavIcon/NavIcon";
import { FaArrowRightLong } from "react-icons/fa6";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const currentPath = window.location.pathname;

  const navItems = [
    // { name: "Home", path: "/" },
    { name: "About Us", path: "/app/our-company" },
    // { name: "Privacy Policy", path: "/app/privacy-policy" },
    // { name: "Terms & Conditions", path: "/app/terms-of-use" },
    { name: "FAQs", path: "/app/faqs" },
    { name: "Help Center", path: "/app/help-center" },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a
          href="/"
          className="logo"
          onClick={() => setIsOpen(false)}
          style={{
            display: "flex",
            textDecorationLine: "none",
            color: "#121212",
            gap: 8,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <img
            src={navImage}
            alt="Boring Thinkers Logo"
            className="clipped-image"
            style={{ height: 32 }}
          />
          <h3>Pickars </h3>
        </a>

        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          {navItems.map(({ name, path }) => {
            const isActive = currentPath === path;

            return (
              <li key={name}>
                <a
                  href={path}
                  onClick={() => setIsOpen(false)}
                  className={`nav-item-link ${isActive ? "active" : ""}`}
                >
                  <div className="nav-item">
                    <p className="nav-item-p">{name}</p>
                    {isOpen && (
                      <FaArrowRightLong size={14} className="mode-arrow" />
                    )}
                  </div>
                </a>
              </li>
            );
          })}
        </ul>

        <div className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </div>

        <div className="navbar-icons-here" style={{ gap: 12 }}>
          <NavIcon icon={FaApple} fontSize={20} padding={16} />
          <NavIcon icon={BiLogoPlayStore} fontSize={20} padding={16} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
