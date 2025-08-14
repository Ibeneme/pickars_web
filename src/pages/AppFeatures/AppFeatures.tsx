import React from "react";
import {
  FaMapMarkerAlt,
  FaRoute,
  FaCalendarAlt,
  FaCreditCard,
  FaUserFriends,
  FaShieldAlt,
  FaComments,
  FaMobileAlt,
  FaClock,
  FaClipboardList,
} from "react-icons/fa";
import "./AppFeatures.css";

// Define the structure for an App Feature item
interface FeatureItem {
  id: string;
  icon: React.ElementType; // Icon component from react-icons
  title: string;
  description: string;
}

// Data for app features
const appFeatures: FeatureItem[] = [
  {
    id: "feat1",
    icon: FaMapMarkerAlt,
    title: "Effortless Booking",
    description:
      "Book a dispatch rider in just a few taps. Our intuitive interface allows you to set pickup and drop-off locations quickly, making your delivery process seamless from start to finish. Say goodbye to complicated forms and wasted time.",
  },
  {
    id: "feat2",
    icon: FaRoute,
    title: "Multi-Stop Deliveries",
    description:
      "Optimize your logistics by sending packages to multiple destinations in a single booking. Our multi-stop feature allows you to add several addresses, arrange them in your preferred order, and even include specific instructions for each stop, saving you time and money.",
  },
  {
    id: "feat3",
    icon: FaClock,
    title: "Real-Time Tracking",
    description:
      "Stay informed with live, accurate tracking of your delivery. See your rider's exact location on the map, receive instant updates on their progress, and get an estimated time of arrival, ensuring complete transparency and peace of mind.",
  },
  {
    id: "feat4",
    icon: FaCalendarAlt,
    title: "Scheduled Deliveries",
    description:
      "Plan your deliveries in advance by scheduling them for a future date and time. Whether it's for a business event next week or a personal errand tomorrow, Pickars allows you to arrange everything precisely when you need it.",
  },
  {
    id: "feat5",
    icon: FaCreditCard,
    title: "Flexible Payment Options",
    description:
      "Enjoy a variety of secure payment methods, including major credit/debit cards, popular mobile money platforms, and our convenient in-app wallet. Choose the option that best suits you and manage your payment preferences with ease directly in the app.",
  },
  {
    id: "feat6",
    icon: FaShieldAlt,
    title: "Secure & Insured Deliveries",
    description:
      "Your package's safety is our priority. All deliveries are handled with care by our verified and trained riders, and covered by basic insurance. For valuable items, opt for additional insurance during booking for enhanced protection.",
  },
  {
    id: "feat7",
    icon: FaComments,
    title: "In-App Communication",
    description:
      "Communicate directly with your assigned rider through our secure in-app chat or masked call feature. Share last-minute instructions, clarify details, or get updates without leaving the app, ensuring smooth coordination.",
  },
  {
    id: "feat8",
    icon: FaUserFriends,
    title: "Dedicated Customer Support",
    description:
      "Our friendly and responsive support team is always ready to assist you. Whether you have a question, need help with a booking, or want to provide feedback, you can reach us via phone or email for prompt assistance.",
  },
  {
    id: "feat9",
    icon: FaMobileAlt,
    title: "User-Friendly Mobile App",
    description:
      "Experience Pickars on the go with our intuitive and easy-to-navigate mobile application. Designed for seamless performance on both iOS and Android, it puts all our powerful features right at your fingertips.",
  },
  {
    id: "feat10",
    icon: FaClipboardList,
    title: "Transparent Pricing",
    description:
      "Know your costs upfront with our clear and transparent pricing structure. Get instant fare estimates before confirming your booking, ensuring there are no surprises and you can budget effectively for your deliveries.",
  },
];

const AppFeatures: React.FC = () => {
  return (
    <div className="app-features-container">
      <div className="app-features-inner">
        <h1 className="app-features-title">Discover Pickars Features</h1>
        <p className="app-features-subtitle">
          Experience seamless deliveries with our advanced and user-friendly app
          capabilities.
        </p>

        <div className="features-grid">
          {appFeatures.map((feature) => (
            <div key={feature.id} className="feature-card">
              <div className="feature-icon-wrapper">
                <feature.icon size={40} className="feature-icon" />
              </div>
              <h2 className="feature-card-title">{feature.title}</h2>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppFeatures;
