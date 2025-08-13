import React from "react";

interface NavIconProps {
  icon: React.ElementType;
  onClick?: () => void;
  padding?: number;
  fontSize?: number | string;
  backgroundColor?: string;
  color?: string;
}

export const NavIcon: React.FC<NavIconProps> = ({
  icon: Icon,
  onClick,
  padding = 8,
  fontSize = 20,
  backgroundColor = "#ff000021",
  color = "#ff0000",
}) => (
  <span
    onClick={onClick}
    style={{
      backgroundColor,
      color,
      borderRadius: 48,
      padding,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize,
      cursor: onClick ? "pointer" : "default",
    }}
  >
    <Icon size={fontSize} />
  </span>
);