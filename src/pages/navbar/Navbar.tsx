import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import "./Navbar.css";
import { FaApple } from "react-icons/fa";
import { BiLogoPlayStore } from "react-icons/bi";
import navImage from "../../assets/images/logo.png";
import { NavIcon } from "../../components/NavIcon/NavIcon";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogoClick = () => {
    navigate("/"); // navigate to home route
  };

  return (
    <nav className="navbar">
      <div className="menu-toggle" onClick={toggleMenu}>
        {isOpen ? (
          <span
            style={{
              backgroundColor: "#ff000021",
              color: "#ff0000",
              borderRadius: 48,
              padding: 8,
              display: "flex",
              fontSize: 20,
            }}
          >
            <X size={18} />
          </span>
        ) : (
          <span
            style={{
              backgroundColor: "#ff000021",
              color: "#ff0000",
              borderRadius: 48,
              padding: 8,
              display: "flex",
              fontSize: 18,
            }}
          >
            <Menu size={18} />
          </span>
        )}
      </div>

      <div
        className="navbar-logo"
        style={{ display: "flex", gap: 8, alignItems: "center", cursor: "pointer" }}
        onClick={handleLogoClick}
      >
        <img src={navImage} alt="Pickars Logo" style={{ width: 32, height: 32 }} />
        <span>Pickars</span>
      </div>

      <div className={`navbar-links ${isOpen ? "active" : ""}`}>
        <a href="/app/our-company" onClick={() => setIsOpen(false)}>
          About Us
        </a>
        <a href="/app/privacy-policy" onClick={() => setIsOpen(false)}>
          Privacy Policy
        </a>
        <a href="/app/terms-of-use" onClick={() => setIsOpen(false)}>
          Terms & Conditions
        </a>
        <a href="/app/faqs" onClick={() => setIsOpen(false)}>
          FAQs
        </a>
      </div>

      <div className="navbar-icons">
        <NavIcon icon={FaApple} />
        <NavIcon icon={BiLogoPlayStore} />
      </div>
    </nav>
  );
};

export default Navbar;