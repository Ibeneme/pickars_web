import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa"; // For toggle icons
import { FiSearch } from "react-icons/fi"; // For search icon
import { IoArrowBackOutline } from "react-icons/io5"; // For the new Back button icon
import "./HelpCenter.css";

// Define the structure for an FAQ item
interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

// Define the structure for a category
interface Category {
  id: string;
  name: string;
  faqs: FAQItem[];
}

// Sample FAQ data for different categories
const categories: Category[] = [
  {
    id: "support",
    name: "General Support",
    faqs: [
      {
        id: "gen1",
        question: "How do I contact customer support?",
        answer:
          "You can reach our dedicated customer support team through multiple convenient channels. For immediate assistance, please call us directly at **+234 812 071 0198**. Our phone lines are active **24 hours a day, 7 days a week**, ensuring you can get help whenever you need it. If your inquiry is less urgent, or if you prefer to write to us, you can send an email to **support@pickars.com**. Our email support team strives to respond to all queries within 24 hours. We are committed to providing prompt and effective assistance for all your Pickars-related needs.",
      },
      {
        id: "gen2",
        question:
          "What are your operating hours for dispatch services and customer support?",
        answer:
          "Pickars offers unparalleled flexibility with our dispatch services available **24 hours a day, 7 days a week, 365 days a year**. This means you can book a rider for your deliveries at any time, day or night, including weekends and public holidays. Our customer support team, while comprehensive, operates specifically from **8 AM to 10 PM daily**. During these hours, you can expect real-time assistance via phone or email for any issues, questions, or guidance you might require.",
      },
      {
        id: "gen3",
        question:
          "How can I provide feedback on my experience with Pickars services?",
        answer:
          'We at Pickars are continuously striving to improve and value your input immensely. You can easily submit your feedback directly through the **"Feedback" section available within the Pickars mobile application**. This allows you to share your thoughts immediately after a delivery or at any other time. If you prefer, you can also send a detailed email to us at **feedback@pickars.com**. We meticulously review all feedback, positive or constructive, as it plays a crucial role in shaping the future of our services and enhancing user experience.',
      },
      {
        id: "gen4",
        question:
          "Is my package insured during transit with Pickars, and what does it cover?",
        answer:
          "Yes, to provide you with peace of mind, all deliveries facilitated through Pickars are covered by **basic insurance**. This coverage helps protect your items against unforeseen damage or loss during the dispatch process. For instances where your item holds a particularly **high monetary or sentimental value**, we highly recommend opting for **additional insurance**. This enhanced coverage can be selected during the booking process in the app and provides a higher level of protection, safeguarding your valuable goods beyond the standard limits.",
      },
      {
        id: "gen5",
        question:
          "What types of items are permissible to send using Pickars, and are there any restrictions?",
        answer:
          "Pickars is designed to handle a broad array of items, including but not limited to **documents, small to medium-sized parcels, prepared food, groceries, delicate packages, and everyday essentials**. However, for safety, legal, and operational reasons, there are certain **prohibited items**. These include illegal substances, hazardous materials (e.g., flammable liquids, explosives), firearms, live animals, oversized goods that cannot safely fit into standard rider transport vehicles (like motorcycles or small cars), and any items that are illegally obtained or may pose a risk to the rider or public safety. If you are ever uncertain about whether an item can be sent, please do not hesitate to contact our customer support team for clarification before booking your delivery.",
      },
      {
        id: "gen6",
        question:
          "What measures does Pickars implement to ensure the safety and security of my delivered items?",
        answer:
          "Ensuring the safety and security of your items is a top priority for Pickars. We employ a multi-layered approach: Firstly, all our dispatch riders undergo a rigorous **verification process and comprehensive safety training**. Secondly, every delivery benefits from **real-time GPS tracking**, allowing you to monitor your package's precise location from pickup to drop-off. Thirdly, we encourage and provide guidelines for **secure packaging** to minimize transit risks. Finally, our **insurance policy** provides a financial safety net. These combined efforts ensure that your items are handled with the utmost care and professionalism throughout their journey.",
      },
      {
        id: "gen7",
        question:
          "What steps should I take if my item is damaged or reported lost during a Pickars delivery?",
        answer:
          "In the unlikely event that your item sustains damage or is reported lost while in transit with Pickars, it's crucial to act swiftly. Please **contact our customer support team immediately** by calling **+234 812 071 0198** or emailing **support@pickars.com**. When you reach out, please be prepared to provide your booking reference number, a detailed description of the item, and any relevant photos of the damage if applicable. Our dedicated team will promptly initiate an investigation into the matter and guide you through our clear-cut claims process, adhering strictly to our insurance policy terms and conditions.",
      },
      {
        id: "gen8",
        question:
          "Can Pickars be utilized for business deliveries or handling large/bulk orders?",
        answer:
          "Absolutely! Pickars is an ideal solution for businesses of all sizes that require reliable and efficient dispatch services. Our versatile platform supports not only **individual deliveries** but is also perfectly suited for **multi-stop routes** and managing **bulk orders**. For businesses with high-volume delivery needs or specific logistical requirements, we offer **customized solutions** and the benefit of **dedicated account management**. To explore how Pickars can optimize your business's delivery operations and to discuss tailored packages, please contact our business solutions team directly at **business@pickars.com**.",
      },
    ],
  },
  {
    id: "customers",
    name: "For Customers",
    faqs: [
      {
        id: "cust1",
        question:
          "How do I download the Pickars app on my smartphone and what are the system requirements?",
        answer:
          'Downloading the Pickars app is quick and easy! For users with **iPhones or iPads**, simply open the **Apple App Store** on your device. If you\'re an **Android phone user**, navigate to the **Google Play Store**. Once in your respective app store, use the search bar to look for "Pickars" (one word). Tap on the official Pickars app icon and then select "Install" or "Get". Ensure your smartphone meets the basic system requirements for the app (usually recent iOS/Android versions) to guarantee optimal performance and a smooth user experience.',
      },
      {
        id: "cust2",
        question:
          "What is the process to sign up for a new Pickars account, or how do I log in if I already have one?",
        answer:
          'To **sign up for a brand new Pickars account**, begin by opening the Pickars app on your device. You\'ll see an option to "Sign Up". You can typically register using either your **email address or your mobile phone number**. Follow the prompts to enter your details and create a secure, unique password. If you\'re an **existing user**, simply select the "Log In" option. Enter your registered email address or phone number along with your password. For added convenience and security, we may also offer options for social media login or two-factor authentication.',
      },
      {
        id: "cust3",
        question:
          "Could you walk me through the steps for booking a delivery using the Pickars app?",
        answer:
          "Booking a delivery with Pickars is designed to be intuitive and efficient: \n\n1.  **Open the Pickars app** on your smartphone. \n2.  Enter your **pickup location** and then your **final drop-off destination**. You'll have the option to **add multiple stops** if your delivery requires it. \n3.  Select the **category or type of item** you are sending (e.g., documents, food, electronics, etc.). \n4.  The app will then display available riders near your pickup location. You can **choose your preferred rider** based on their rating or vehicle type, or simply let the system assign the closest available and most suitable rider. \n5.  Finally, **review the booking details**, including the estimated cost and delivery time, and **confirm your chosen payment method**. Once confirmed, your delivery will be dispatched, and you can track its progress in real-time.",
      },
      {
        id: "cust4",
        question:
          "Is it possible to schedule a delivery with Pickars for a future date and time, or only for immediate dispatch?",
        answer:
          'Yes, Pickars provides you with the flexibility to not only request immediate dispatches but also to **schedule deliveries in advance**. This feature is incredibly useful for planning personal errands or business logistics. During the standard booking process within the app, after you\'ve specified your pickup and drop-off locations, you will find a distinct **"Schedule" option**. By selecting this, you can easily choose your desired future date and precise time for the delivery, ensuring your items arrive exactly when you need them to.',
      },
      {
        id: "cust5",
        question:
          "What are the various payment methods accepted by Pickars for delivery services?",
        answer:
          'Pickars offers a diverse range of secure and convenient payment options to ensure a seamless transaction experience. You can easily pay for your deliveries using major **credit and debit cards** (Visa, MasterCard, etc.). We also integrate with popular **mobile money platforms** widely used in the region, allowing for quick and secure transactions directly from your mobile wallet. Additionally, for frequent users, we provide a secure **in-app Pickars wallet** which you can top up and use for faster payments. All your preferred payment methods can be securely managed and selected within the "Payment" section of your Pickars app.',
      },
      {
        id: "cust6",
        question:
          "How do I track my delivery in real-time once it has been dispatched by a Pickars rider?",
        answer:
          "Keeping you informed every step of the way is a core part of the Pickars experience. Once your delivery request is confirmed and a rider has been assigned and is en route, you will receive a unique **tracking link**. This link is typically sent to you via **SMS and/or email**. For the most dynamic and comprehensive overview, simply **open the Pickars app** and navigate to your active order. Here, you will see a live, interactive map displaying the **real-time location of your rider**, along with their current estimated time of arrival at your destination. This feature ensures full transparency and allows you to plan your time effectively.",
      },
      {
        id: "cust7",
        question:
          "Is it possible to send items to multiple distinct locations within a single Pickars booking?",
        answer:
          "Yes, Pickars is designed with efficiency in mind, and we proudly support **multi-stop deliveries**. This means you don't have to create separate bookings for each destination if you have several drop-off points. During the booking process in the app, you can easily **add multiple addresses** after your initial pickup point. The app will then help you arrange these stops in the most **optimal sequence** to save you time and potentially reduce costs. This feature is particularly beneficial for businesses managing several deliveries or individuals handling multiple errands.",
      },
      {
        id: "cust8",
        question:
          "What is Pickars' policy regarding the cancellation or modification of a delivery after it has been booked?",
        answer:
          "Pickars understands that plans can change. You can typically **cancel a delivery directly through the app** within a very short grace period, usually **5 minutes after confirming your booking**, without incurring any cancellation fees. If you need to cancel or modify a delivery beyond this initial window, or if a rider has already begun their journey, please **contact our customer support immediately** via phone at **+234 812 071 0198** or email at **support@pickars.com**. Please be aware that fees may apply for later cancellations or significant modifications, depending on the rider's progress and the costs incurred.",
      },
      {
        id: "cust9",
        question:
          "Are there any specific size or weight restrictions for items that can be sent with Pickars, or can I send anything?",
        answer:
          "While Pickars aims to accommodate a wide range of goods, there are practical considerations regarding item size and weight. Our services are generally designed for **small to medium-sized items** that can be safely transported by our dispatch riders, primarily on motorcycles or in small vehicles. If your item is particularly large, bulky, or heavy, it might exceed the capacity or safety limits of a standard rider. The Pickars app will typically provide guidance or notify you if an item seems too large during the booking process. For **oversized or unusually heavy items**, we strongly advise you to **contact our customer support** for special arrangements or to explore potential alternative solutions that can better accommodate your specific needs.",
      },
      {
        id: "cust10",
        question:
          "How do I rate my rider and provide a review after a delivery has been successfully completed?",
        answer:
          "Your feedback is invaluable to us and our rider community. After your delivery is successfully completed and marked as delivered in the app, you will automatically receive a prompt within the Pickars application to **rate your rider**. This typically involves a simple star rating scale (e.g., 1 to 5 stars). You will also have the option to provide an **optional text review**, where you can share specific comments about your experience, such as the rider's professionalism, speed, or communication. This feedback is crucial not only for maintaining our high service quality but also for helping other users make informed choices when selecting riders. You can also access past deliveries in your order history within the app to leave or modify a rating later.",
      },
      {
        id: "cust11",
        question:
          "Can I directly communicate or contact my assigned Pickars rider after I have booked a delivery?",
        answer:
          "Yes, direct communication with your assigned rider is a key feature designed to ensure smooth and efficient deliveries. Once a Pickars rider has accepted and been assigned to your delivery, the Pickars app will provide you with a convenient option to **contact your rider directly**. This can be done either through an **in-app chat feature** for text-based communication or via a **masked phone call** (your actual number will not be shared, ensuring privacy). This allows you to convey any last-minute instructions, clarify pickup details, or ask questions regarding your delivery's progress.",
      },
      {
        id: "cust12",
        question:
          "What should I do if my package is delivered to the wrong address or person?",
        answer:
          "In the rare instance that your package is delivered incorrectly, please **contact Pickars customer support immediately** at **+234 812 071 0198** or **support@pickars.com**. Provide your booking details and explain the situation. We will promptly investigate the issue, contact the rider, and work to resolve the misdelivery as quickly as possible.",
      },
      {
        id: "cust13",
        question: "How does Pickars handle unexpected delays during delivery?",
        answer:
          "While we strive for timely deliveries, unforeseen circumstances like traffic, weather, or vehicle issues can cause delays. If a delay occurs, the Pickars app will typically **send you a notification** with an updated estimated time of arrival. Your rider may also reach out directly via the in-app chat. If you have concerns, you can always contact our customer support for more information.",
      },
    ],
  },
  {
    id: "riders",
    name: "For Riders",
    faqs: [
      {
        id: "rider1",
        question:
          "What is the detailed process for becoming a certified Pickars rider?",
        answer: `Becoming a certified Pickars rider involves a few straightforward but essential steps designed to ensure safety and service quality. First, visit our dedicated **"Become a Rider" page on the official Pickars website** or download the **Pickars Rider app** from your device\'s app store. You will then follow the in-app registration process, which includes **providing your personal details**, submitting your **vehicle information** (e.g., type of bike/car, license plate), and completing a mandatory **background check**. After successful verification, you\'ll undergo our comprehensive **safety and training modules** to familiarize yourself with Pickars' operational standards and best practices for secure deliveries. Once all steps are completed, you\'ll be ready to start accepting orders!`,
      },
      {
        id: "rider2",
        question:
          "What are the essential requirements and qualifications to become a Pickars rider?",
        answer:
          "To maintain a high standard of safety, reliability, and professionalism, Pickars riders typically need to meet several key requirements. These generally include possessing a **valid driver's license** appropriate for your vehicle type, current **vehicle registration and valid insurance documentation**, and owning a compatible **smartphone** (iOS or Android) capable of running the Pickars Rider app with GPS functionality. Furthermore, all prospective riders must successfully complete our comprehensive **safety and training modules**, which cover topics like safe driving practices, customer service, and efficient delivery procedures. Additional local regulatory requirements or permits may also apply depending on your operational area.",
      },
      {
        id: "rider3",
        question:
          "How do Pickars riders receive payments for their completed deliveries, and what is the payout schedule?",
        answer:
          "Pickars ensures a reliable and transparent payment system for its riders. Your earnings from completed deliveries are conveniently paid on a **weekly basis**, directly deposited into your designated bank account. You don't need to manually request payouts. You can easily track your real-time earnings, view detailed breakdowns of each payout, monitor your overall performance metrics, and review your delivery history within the dedicated **'Earnings' section of the Pickars Rider app**. This comprehensive dashboard allows you to manage your finances effectively and stay informed about your income.",
      },
      {
        id: "rider4",
        question:
          "Could you explain the process of accepting and successfully completing an order as a Pickars rider?",
        answer:
          "The process of accepting and completing a delivery order with Pickars is streamlined for efficiency. When a new delivery request is available in your designated service area, you'll receive a clear notification in your Pickars Rider app. \n\n1.  **Accept the order**: Simply tap to accept the order. You'll see details like pickup/drop-off locations, item type, and estimated earnings. \n2.  **Navigate to pickup**: Use the integrated GPS navigation within the app to reach the pickup location. \n3.  **Confirm item collection**: Once you've collected the item, confirm its status in the app. \n4.  **Deliver to drop-off**: Follow the navigation to the delivery destination. \n5.  **Mark as completed**: After successfully handing over the item, mark the order as completed in the app. The Pickars Rider app provides clear, step-by-step guidance and prompts throughout this entire process to ensure smooth execution.",
      },
      {
        id: "rider5",
        question:
          "What safety measures and support mechanisms does Pickars offer to its riders during their operations?",
        answer:
          "Pickars is deeply committed to the safety and well-being of its rider community. We implement several key safety measures: \n\n* **In-App Emergency Features**: The Pickars Rider app includes built-in features for emergency assistance, allowing riders to quickly contact support or emergency services if needed. \n* **Comprehensive Safety Guidelines**: We provide clear guidelines and training on safe driving practices, handling packages, and interacting with customers. \n* **Rider Verification**: All riders undergo a thorough verification process before joining the platform. \n* **Insurance Options**: Pickars offers **insurance options for riders** that provide coverage during active deliveries, protecting you against unexpected incidents. \n* **Dedicated Rider Support**: Our support team is available to assist riders with any issues or concerns that arise during deliveries, ensuring you have a reliable point of contact.",
      },
      {
        id: "rider6",
        question:
          "Do I have the autonomy and flexibility to choose my own working hours as an independent Pickars rider?",
        answer:
          "Absolutely! One of the significant advantages of being an independent dispatch rider with Pickars is the unparalleled **flexibility in choosing your working hours**. You are not bound by fixed shifts. You have the complete freedom to decide when you want to work. You can simply go **online** in the Pickars Rider app to start receiving delivery requests and go **offline** whenever you need to take a break or finish your day. This autonomy allows you to seamlessly integrate your work with your personal schedule, whether you prefer full-time, part-time, or occasional deliveries.",
      },
      {
        id: "rider7",
        question:
          "How does the Pickars Rider app assist me with navigation and optimizing my delivery routes?",
        answer:
          "The Pickars Rider app is a powerful tool designed to enhance your efficiency and ease of navigation. It comes equipped with an integrated **GPS navigation system** that provides precise, turn-by-turn directions to both your pickup and drop-off locations. Beyond simple navigation, the app's intelligent algorithms also suggest **optimized routes**, helping you avoid traffic, minimize travel time, and save on fuel costs. This routing optimization is particularly beneficial when managing multiple deliveries, ensuring you complete your tasks as efficiently as possible.",
      },
      {
        id: "rider8",
        question:
          "What specific steps should I take if I encounter an unforeseen issue or problem during an active delivery?",
        answer:
          "If you encounter any unforeseen issues during an active delivery, it's essential to communicate immediately. Firstly, assess the situation and ensure your safety. Then, use the **in-app 'Rider Support' chat or call feature** to contact our dedicated support team. Provide them with details about the issue, such as difficulty finding a location, a customer being unavailable, an item discrepancy, or an accident. Our support team is available to provide real-time guidance, help resolve the problem, and ensure the delivery can be completed safely and efficiently, or advise on the next steps.",
      },
      {
        id: "rider9",
        question:
          "Is it possible for me to accept and manage multiple delivery orders simultaneously?",
        answer:
          "Yes, to help you maximize your earnings and efficiency, the Pickars Rider app is designed to allow you to **accept and manage multiple delivery orders at once**. This functionality is particularly useful when routes are optimized for several drops or pickups in close proximity. The app's smart matching system may offer you stacked orders or multi-stop routes. You can view and manage these concurrent orders within your app dashboard, ensuring you can efficiently handle deliveries and optimize your time on the road.",
      },
      {
        id: "rider10",
        question:
          "How do I update my personal profile details or vehicle information within the Pickars Rider app?",
        answer:
          "Keeping your information current is crucial for smooth operations and accurate payouts. You can easily update your personal profile details, contact information, and specific vehicle particulars (such as license plate number, vehicle type like a bike or car, and insurance expiry dates) directly within the **'Profile' or 'Settings' section of the Pickars Rider app**. We recommend regularly reviewing and updating your information to ensure seamless communication, compliance with platform requirements, and accurate delivery assignments.",
      },
      {
        id: "rider11",
        question:
          "What should I do if a customer is unresponsive or unavailable at the delivery location?",
        answer:
          "If you arrive at the delivery location and the customer is unresponsive or unavailable, first, attempt to **contact them via the in-app chat or masked call feature**. If there's still no response after a reasonable waiting period (e.g., 5-10 minutes, as guided by the app), follow the prompts in the app. It will typically advise you to **contact Rider Support**. Our support team will guide you on the next steps, which may include returning the item to the pickup point or holding it for a re-delivery attempt, depending on the item and local policy.",
      },
      {
        id: "rider12",
        question: "How do incentives and bonuses work for Pickars riders?",
        answer:
          "Pickars frequently offers various **incentives and bonuses** to reward our riders for their hard work and dedication. These can include peak-hour bonuses, completion bonuses for a certain number of deliveries, or special promotions during high-demand periods. Details on available incentives, eligibility criteria, and tracking your progress towards them are typically communicated through the **Pickars Rider app notifications** and the 'Earnings' or 'Promotions' section of the app. These bonuses are designed to help you maximize your earnings.",
      },
    ],
  },
];

const HelpCenter: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openFAQs, setOpenFAQs] = useState<string | null>(null); // Changed to store single FAQ ID or null
  // New state to manage the selected category view
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  // Function to toggle the open/closed state of an FAQ
  const toggleFAQ = (categoryId: string, faqId: string) => {
    const key = `${categoryId}-${faqId}`;
    if (openFAQs === key) {
      setOpenFAQs(null); // Close if already open
    } else {
      setOpenFAQs(key); // Open new one and close any other
    }
  };

  // Filter FAQs based on search term
  // If a category is selected, filter within that category's FAQs.
  // If no category is selected, filter across all categories and show only those categories with matching FAQs.
  const filteredCategories = categories
    .map((category) => ({
      ...category,
      faqs: category.faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((category) => category.faqs.length > 0);

  const displayedFAQs = selectedCategory
    ? selectedCategory.faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    setSearchTerm(""); // Clear search term when a category is selected
    setOpenFAQs(null); // Close all FAQs when a new category is selected
  };

  const handleGoBack = () => {
    setSelectedCategory(null);
    setSearchTerm(""); // Clear search term when going back
    setOpenFAQs(null); // Close all FAQs when going back
  };

  const formatAnswer = (text: string) => {
    return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  };

  return (
    <div className="help-center-container">
      <div className="help-center-inner">
        <h1 className="help-center-title">How Can We Help You?</h1>
        <p className="help-center-subtitle">
          Find answers to frequently asked questions about Pickars services.
        </p>

        {/* Global Search Bar - now always visible */}
        <div className="search-bar">
          <input
            type="text"
            placeholder={
              selectedCategory
                ? `Search in ${selectedCategory.name}...`
                : "Search all FAQs..."
            }
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button
            onClick={() => console.log("Search executed")}
            className="search-button"
          >
            <FiSearch size={20} /> Search
          </button>
        </div>

        {selectedCategory ? (
          // Display FAQs for the selected category
          <div className="selected-category-view">
            <button onClick={handleGoBack} className="go-back-button">
              <IoArrowBackOutline size={20} /> Go Back to Categories
            </button>
            <h2 className="selected-category-title">
              {selectedCategory.name} FAQs
            </h2>
            <div className="faq-list">
              {displayedFAQs.length > 0 ? (
                displayedFAQs.map((faq) => {
                  const faqKey = `${selectedCategory.id}-${faq.id}`;
                  const isOpen = openFAQs === faqKey; // Check if THIS specific FAQ is open
                  return (
                    <div key={faq.id} className="faq-item">
                      <div
                        className="faq-question-header"
                        onClick={() => toggleFAQ(selectedCategory.id, faq.id)}
                      >
                        <h3>{faq.question}</h3>
                        <button className="faq-toggle-btn">
                          {isOpen ? <FaMinus /> : <FaPlus />}
                        </button>
                      </div>
                      {isOpen && (
                        <p
                          className="faq-answer"
                          dangerouslySetInnerHTML={{
                            __html: formatAnswer(faq.answer),
                          }}
                        ></p>
                      )}
                    </div>
                  );
                })
              ) : (
                <p className="no-faqs">
                  {searchTerm
                    ? `No matching questions in "${selectedCategory.name}" for "${searchTerm}".`
                    : `No questions available in "${selectedCategory.name}".`}
                </p>
              )}
            </div>
          </div>
        ) : (
          // Display the initial categories grid, filtered by global search
          <div className="categories-grid">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
                <div
                  key={category.id}
                  className="category-card category-selection-card" // Added new class for styling
                  onClick={() => handleCategorySelect(category)}
                >
                  <h2 className="category-title">{category.name}</h2>
                  <p className="category-card-description">
                    Find answers to common questions for{" "}
                    {category.name.toLowerCase()}.
                  </p>
                </div>
              ))
            ) : (
              <p className="no-results">
                No categories or FAQs found matching "{searchTerm}".
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HelpCenter;
