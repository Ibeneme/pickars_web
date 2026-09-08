import React from "react";
import QRCode from "react-qr-code";

interface PickarsQRCodeProps {
  url?: string;
  size?: number;
}

export const PickarsQRCode: React.FC<PickarsQRCodeProps> = ({
  url = "https://www.pickars.com",
  size = 220,
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-3xl bg-[#000000] p-6 shadow-2xl border border-neutral-800 w-fit mx-auto">
      <div className="p-3 bg-[#000000] rounded-2xl">
        <QRCode
          value={url}
          size={size}
          fgColor="#ff0000"
          bgColor="#000000"
          level="H"
        />
      </div>
      <p className="text-xs font-bold uppercase tracking-widest text-[#FBB5B5]/80">
        Scan to visit pickars.com
      </p>
    </div>
  );
};

export default PickarsQRCode;
