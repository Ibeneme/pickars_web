import React, { useState } from "react";
import { ComingSoonModal } from "../Modals/ComingSoonModal";

interface NavIconProps {
  icon: React.ElementType;
  onClick?: () => void;
  padding?: number;
  fontSize?: number | string;
  backgroundColor?: string;
  color?: string;
  production?: boolean;
}

export const NavIcon: React.FC<NavIconProps> = ({
  icon: Icon,
  onClick,
  padding = 8,
  fontSize = 20,
  backgroundColor = "#ff000021",
  color = "#ff0000",
  production = true,
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    if (production) {
      setShowModal(true);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <>
      <span
        onClick={handleClick}
        style={{
          backgroundColor,
          color,
          borderRadius: 48,
          padding,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize,
          cursor: "pointer",
        }}
      >
        <Icon size={fontSize} />
      </span>

      {showModal && (
        <ComingSoonModal show={showModal} onClose={() => setShowModal(false)} />
      )}
    </>
  );
};
