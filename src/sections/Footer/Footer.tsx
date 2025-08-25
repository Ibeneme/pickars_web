import { Link } from "react-router-dom";
import { FaEnvelope, FaPhone, FaWhatsapp } from "react-icons/fa";
import logo from "../../assets/images/logo.png"; // replace with Pickars logo
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Left Section */}
        <div className="footer-left">
          <div className="footer-logo-section">
            <img src={logo} alt="Pickars Logo" className="footer-logo" />
            <h2>
              {" "}
              Pickars 
              {/* Courier Limited */}
            </h2>
          </div>
          <p className="footer-description">
            At Pickars, we make doorstep deliveries simple, fast, and reliable.
            Our mission is to ensure every parcel reaches its destination safely
            and on time, every time. Whether it’s urgent documents, groceries,
            or personal packages, we provide real-time tracking, transparent
            pricing, and dedicated customer support to give you peace of mind.
            With a network of trained riders across Nigeria, we make sending and
            receiving packages seamless, convenient, and stress-free for
            individuals and businesses alike.
          </p>

          <div className="footer-contact">
            <p
              style={{
                alignItems: "center",
                display: "flex",
                gap: 8,
              }}
              className="contact-item"
            >
              <span
                style={{
                  backgroundColor: "#ffffff19",
                  borderRadius: 12,
                  padding: 12,
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                  width: "fit-content",
                }}
                className="contact-icon email-icon"
              >
                <FaEnvelope size={14} />
              </span>
              <a
                style={{
                  color: "#fff",
                  textDecorationLine: "none",
               
                }}
                href="mailto:support@pickars.com"
              >
                support@pickars.com
              </a>
            </p>

            <p
              style={{
                alignItems: "center",
                display: "flex",
                gap: 8,
              }}
              className="contact-item"
            >
              <span
                style={{
                  backgroundColor: "#ffffff19",
                  borderRadius: 12,
                  padding: 12,
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                  width: "fit-content",
                }}
                className="contact-icon phone-icon"
              >
                <FaPhone size={14} />
              </span>
              <a
                style={{
                  color: "#fff",
                  textDecorationLine: "none",
               
                }}
                href="tel:+2348120710198"
              >
                (+234) 812 071 0198
              </a>
            </p>
            <p
              style={{
                alignItems: "center",
                display: "flex",
                gap: 8,
              }}
              className="contact-item"
            >
              <span
                style={{
                  backgroundColor: "#ffffff19", // WhatsApp green tint
                  borderRadius: 12,
                  padding: 12,
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                  width: "fit-content",
                }}
                className="contact-icon whatsapp-icon"
              >
                <FaWhatsapp size={14} />
              </span>
              <a
                href="https://wa.me/2348120710198"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#fff",
                  textDecorationLine: "none",
               
                }}
              >
                WhatsApp Chat
              </a>
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="footer-right">
          {/* <Link to="app/about-us" className="footer-link">
            About Us
          </Link> */}
          <Link to="app/faqs" className="footer-link">
            Our FAQs
          </Link>
          <Link to="app/our-company" className="footer-link">
            Our Company
          </Link>
          <Link to="app/terms-of-use" className="footer-link">
            Terms & Conditions
          </Link>
          <Link to="app/privacy-policy" className="footer-link">
            Privacy Policy
          </Link>

          <Link to="app/find-item" className="footer-link">
            Find a Lost item
          </Link>

          <Link to="app/help-center" className="footer-link">
            Help Center
          </Link>

          <Link to="app/app-features" className="footer-link">
            App Features
          </Link>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <p
          style={{
            color: "#666",
          }}
        >
          © {new Date().getFullYear()} Pickars Courier Limited, All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
