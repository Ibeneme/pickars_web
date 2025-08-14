import React, { useState } from "react";

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
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 99999999999,
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: 24,
              borderRadius: 12,
              maxWidth: 550,
              width: "90%",
              // //   textAlign: "center",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            }}
          >
            {/* Header with emoji */}
            <h2 style={{ fontSize: "2.5rem", marginBottom: 4 }}>Coming Soon</h2>

            <p
              style={{
                backgroundColor: "#ff000021",
                color: "#ff0000",
                padding: `4px 8px`,
                borderRadius: 244,
                width: "fit-content",
                marginBottom: 16,
                fontSize: 12,
              }}
            >
              App Under Review
            </p>
            {/* Description */}
            <p style={{ marginBottom: 24, fontSize: 15, color: "#666" }}>
              The app is currently being reviewed on the Apple App Store and
              Google Play Store. We appreciate your patience!
            </p>

            <p style={{ fontSize: 64, marginBottom: 32 }}>🚧</p>
            {/* Full-width Close Button */}
            <button
              onClick={() => setShowModal(false)}
              style={{
                width: "100%",
                padding: "14px 0",
                backgroundColor: "#ff0000",
                color: "#fff",
                border: "none",
                borderRadius: 244,
                cursor: "pointer",

                fontSize: 16,
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};
