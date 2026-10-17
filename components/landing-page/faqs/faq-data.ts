export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const faqData: FAQItem[] = [
  {
    id: "01",
    question: "What is Pickars Courier Limited?",
    answer:
      "Pickars Courier Limited is a technology platform that connects individuals and businesses with independent dispatch riders for efficient and reliable delivery services. We make it easy to book and manage your deliveries through our mobile app and website.",
  },
  {
    id: "02",
    question: "How do I book a dispatch rider?",
    answer:
      "Simply download the Pickars mobile app or visit our website, enter your pickup and drop-off locations, select your delivery option, and confirm your booking. A nearby dispatch rider will be assigned instantly.",
  },
  {
    id: "03",
    question: "What types of items can I send?",
    answer:
      "You can send documents, parcels, food, clothing, electronics, and general merchandise, provided they fit securely on a dispatch motorcycle and do not contain prohibited or illegal items.",
  },
  {
    id: "04",
    question: "How are delivery fees calculated?",
    answer:
      "Delivery fees are calculated based on the total distance between the pickup and drop-off points, current traffic conditions, and package size. You will always see the exact price upfront before confirming.",
  },
];
