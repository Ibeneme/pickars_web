import React from "react";
import "./HeroSection.css";
import { FaApple } from "react-icons/fa";
import { BiLogoPlayStore } from "react-icons/bi";
import heroImage1 from "../../assets/images/hero/hero.png";
import heroImage2 from "../../assets/images/hero/herob.png";

const HeroSection: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <p
          style={{
            margin: 0,
            backgroundColor: "#ff000020",
            color: "#ff0000",
            borderRadius: 48,
            padding: "4px 8px",
            width: "fit-content",
            textAlign: "center",
            fontSize: 13,
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <span role="img" aria-label="Nigerian flag" style={{ fontSize: 16 }}>
            🇳🇬
          </span>
          Only within Port Harcourt, NG
        </p>
        <h1>Deliver Anything, Anytime</h1>
        <p>
          Your trusted on-demand dispatch service fast, reliable, and right at
          your fingertips.
        </p>

        <div className="hero-buttons">
          <a href="#appstore" className="store-button apple">
            <FaApple className="store-icon" />
            <div className="store-text">
              <span className="small">Download on</span>
              <span className="big">App Store</span>
            </div>
          </a>

          <a href="#playstore" className="store-button playstore">
            <BiLogoPlayStore className="store-icon" />
            <div className="store-text">
              <span className="small">Get it on</span>
              <span className="big">Google Play</span>
            </div>
          </a>
        </div>

        {/* Two images side-by-side */}
        <div>
          <h2
            style={{
              marginTop: 32,
              backgroundColor: "#ff0000",
              color: "#fff",
              padding: `16px 32px`,
              borderRadius: 48,
            }}
          >
            Coming Soon!
          </h2>
        </div>
        <div className="hero-images">
          <img
            src={heroImage1}
            alt="Delivery App Preview 1"
            className="hero-image"
          />
          <img
            src={heroImage2}
            alt="Delivery App Preview 2"
            className="hero-image"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
