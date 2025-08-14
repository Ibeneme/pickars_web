import React from "react";

interface ComingSoonModalProps {
  show: boolean;
  onClose: () => void;
}

export const ComingSoonModal: React.FC<ComingSoonModalProps> = ({
  show,
  onClose,
}) => {
  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
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
          maxWidth: 500,
          width: "90%",
          textAlign:'left'
        }}
      >
        {/* Header with emoji */}
        <h2 style={{ fontSize: "2.5rem", marginBottom: 10 }}>Coming Soon</h2>
        <p
          style={{
            backgroundColor: "#ff000021",
            color: "#ff0000",
            padding: `4px 8px`,
            borderRadius: 244,
            width: "fit-content",
            marginBottom: 32,
            fontSize: 12,
          }}
        >
          App Under Review
        </p>

        {/* Description */}
        <p style={{ marginBottom: 24, fontSize: 15, color: "#666" }}>
          The app is currently being reviewed on the Apple App Store and Google
          Play Store. We appreciate your patience!
        </p>

        <p style={{ fontSize: 72, marginBottom: 32 }}>🚧</p>

        {/* Full-width Close Button */}
        <button
          onClick={onClose}
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
  );
};
