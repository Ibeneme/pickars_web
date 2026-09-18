import React from "react";
import { FiHelpCircle, FiUser, FiTruck, FiCreditCard } from "react-icons/fi";

export type AnnotationType = "tip" | "important";

export interface Annotation {
  type: AnnotationType;
  text: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  annotations?: Annotation[];
}

export interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  faqs: FAQ[];
}

export const categories: Category[] = [
  {
    id: "support",
    name: "General Support",
    icon: <FiHelpCircle />,
    description: "Contact, hours, insurance & general questions",
    faqs: [
      {
        id: "gen1",
        question: "How do I contact Pickars customer support?",
        answer:
          "Our support team is available **24/7**. For fastest response, message our official WhatsApp: **0916 486 0591**.\n\nEmail: **support@pickars.com** (usually answered within 4–12 hours).",
        annotations: [
          { type: "tip", text: "WhatsApp is usually 3–10× faster than email" },
        ],
      },
      {
        id: "gen2",
        question: "What are your operating hours?",
        answer:
          "Dispatch riders are available **24 hours a day, 365 days** a year.\n\nLive human support is online daily from **8:00 AM – 10:00 PM**.",
        annotations: [
          {
            type: "important",
            text: "After 10 PM, use WhatsApp for urgent issues",
          },
        ],
      },
      {
        id: "gen3",
        question: "Are my packages insured during transit?",
        answer:
          "Yes! All packages booked directly through the Pickars app are covered against loss or damage up to specified limits based on declared package value.",
      },
    ],
  },
  {
    id: "customers",
    name: "For Customers",
    icon: <FiUser />,
    description: "Booking, tracking, payments, cancellations",
    faqs: [
      {
        id: "cust3",
        question: "How do I book a delivery?",
        answer:
          "1. Open app → enter **Pickup** & **Drop-off** locations\n2. Choose **package type** & size\n3. Select rider (see rating & estimated time)\n4. Confirm payment method → track in real-time",
      },
      {
        id: "cust7",
        question: "Can I send to multiple locations?",
        answer:
          "Yes — use our **Multi-Stop** feature.\nAdd up to 5 stops. Our system automatically optimizes the route to save time & money.",
      },
      {
        id: "cust8",
        question: "How do I track my active delivery?",
        answer:
          "Once a rider accepts your order, tap **Live Tracking** on the home screen. You'll see their exact GPS location moving on the map in real time.",
      },
    ],
  },
  {
    id: "riders",
    name: "For Riders",
    icon: <FiTruck />,
    description: "Onboarding, earnings, safety & support",
    faqs: [
      {
        id: "rider1",
        question: "How do I become a Pickars Rider?",
        answer:
          "1. Download **Pickars Rider** app\n2. Upload valid Driver's License + Bike/Car documents\n3. Complete short safety & service training\n4. Get verified (usually 24–48h) → start accepting orders",
      },
      {
        id: "rider2",
        question: "When and how do I receive my earnings?",
        answer:
          "Earnings are tracked instantly in-app after every completed drop-off. Payouts are processed directly to your registered bank account daily or weekly.",
      },
    ],
  },
  {
    id: "payments",
    name: "Payments & Refunds",
    icon: <FiCreditCard />,
    description: "Wallet, pricing, refunds, failed payments",
    faqs: [
      {
        id: "pay1",
        question: "How do refunds work?",
        answer:
          "Refunds are processed within **24–72 hours** to your original payment method or Pickars Wallet.\n\nFull refund if: rider cancels, item not picked up, or delivery fails due to our fault.",
        annotations: [
          {
            type: "tip",
            text: "Wallet refunds are instant — choose Wallet for faster access",
          },
        ],
      },
      {
        id: "pay2",
        question: "What payment methods do you accept?",
        answer:
          "We accept debit/credit cards, bank transfers, USSD, and direct funding via your in-app Pickars Wallet.",
      },
    ],
  },
];
