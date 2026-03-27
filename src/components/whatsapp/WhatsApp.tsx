import React from "react";
import { MessageCircle } from "lucide-react"; // Import the icon

const WhatsAppButton: React.FC = () => {
  const whatsappUrl =
    "https://api.whatsapp.com/send/?phone=2349164860591&text&type=phone_number&app_absent=0";

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 right-4 z-50 flex items-center justify-center w-16 h-16 bg-[#000] rounded-full shadow-lg transition-transform hover:scale-110 active:scale-95 animate-float group"
      aria-label="Contact us on WhatsApp"
    >
      {/* Pulse Animation Effect */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-75 animate-ping group-hover:pause"></span>

      {/* Lucide Icon */}
      <MessageCircle
        size={32}
        color="white"
        className="relative z-10 stroke-[2.5px]"
      />
    </a>
  );
};

export default WhatsAppButton;
