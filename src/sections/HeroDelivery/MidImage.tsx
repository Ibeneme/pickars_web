import React from "react";
import "./MidImage.css";
import heroBg from "../../assets/images/driver/driverc.png"; // replace with your image path
import { NavIcon } from "../../components/NavIcon/NavIcon";
import { FaApple } from "react-icons/fa";
import { BiLogoPlayStore } from "react-icons/bi";

const MidImage: React.FC = () => {
  return (
    <section
      className="mid-image"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="mid-overlay" />
      <div className="mid-content">
        <h1>Book a Dispatch Rider Instantly</h1>
   
        {/* <div className="mid-buttons">
          <button className="mid-btn ios">Download for iOS</button>
          <button className="mid-btn android">Download for Android</button>
        </div> */}

        <div className="navbar-icons">
          <NavIcon
            icon={FaApple}
            fontSize={24}
            padding={16}
            backgroundColor="#fff"
          />
          <NavIcon
            icon={BiLogoPlayStore}
            fontSize={24}
            padding={16}
            backgroundColor="#fff"
          />
        </div>
      </div>
    </section>
  );
};

export default MidImage;
