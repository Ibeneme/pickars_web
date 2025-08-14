import React, { useState } from "react";
import "./CustomerRiderSection.css";
import heroImage1 from "../../assets/images/cr/customer.png";
import heroImage2 from "../../assets/images/cr/driver.png";
import { NavIcon } from "../../components/NavIcon/NavIcon";
import { FaApple } from "react-icons/fa";
import { BiLogoPlayStore } from "react-icons/bi";

const CustomerRiderSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"customer" | "rider">("customer");

  const content = {
    customer: {
      header: "Book a dispatch rider",
      description:
        "Book a ride in just a few taps, track your driver in real-time, and arrive at your destination without stress. Our service runs 24/7, with transparent pricing, professional drivers, and vehicles ready to get you where you need to go. Whether it’s your daily commute, a night out, or an urgent trip across town, we make transportation effortless and dependable.",
      image: heroImage1,
    },
    rider: {
      header: "Ya!, Become our rider",
      description:
        "Join our network of professional riders and take control of your earnings. Accept ride or delivery requests with a tap, work the hours that suit you, and get paid fast. With our platform, you have the flexibility to choose your routes, enjoy consistent demand, and rely on our safety and support features to make every trip smooth and secure.",
      image: heroImage2,
    },
  };

  const activeContent = content[activeTab];

  return (
    <section className="cr-section">
      {/* Toggle Buttons */}
      <div className="cr-toggle">
        <button
          className={activeTab === "customer" ? "active" : ""}
          onClick={() => setActiveTab("customer")}
        >
          Customer
        </button>
        <button
          className={activeTab === "rider" ? "active" : ""}
          onClick={() => setActiveTab("rider")}
        >
          Rider
        </button>
      </div>

      {/* Content */}
      <div className="cr-content">
        <h2>{activeContent.header}</h2>
        <p>{activeContent.description}</p>

        <div className="navbar-icons">
          <NavIcon icon={FaApple} fontSize={24} padding={16} />
          <NavIcon icon={BiLogoPlayStore} fontSize={24} padding={16} />
        </div>

        <img src={activeContent.image} alt={activeContent.header} />
      </div>
    </section>
  );
};

export default CustomerRiderSection;
