import React, { useEffect, useState } from "react";
import "./CommentsSection.css";
import {
  FaInstagram,
  FaFacebookF,
  FaTiktok,
  FaXTwitter,
} from "react-icons/fa6";

interface Comment {
  text: string;
  icon: React.ReactNode;
  name: string;
}

const row1: Comment[] = [
  {
    text: "Best delivery experience ever! 🚀 I booked in seconds, the rider arrived exactly on time, and my package reached its destination faster than I expected.",
    icon: <FaInstagram />,
    name: "Chiamaka Okafor",
  },
  {
    text: "Rider was on time & super friendly! He even helped carry my package inside. Smooth process, great tracking updates, excellent customer service made it a stress-free.",
    icon: <FaFacebookF />,
    name: "Tunde Balogun",
  },
  {
    text: "Fast & safe package delivery 👍 My items were handled with care, arrived in perfect condition, and the real-time tracking kept me confident the whole way.",
    icon: <FaTiktok />,
    name: "Funmilayo Adeyemi",
  },
  {
    text: "My go-to service for urgent deliveries! No matter the time of day, I know I can rely on them for quick, secure, and professional service every single time.",
    icon: <FaXTwitter />,
    name: "Bola Akinwale",
  },
  {
    text: "Exceptional service! The rider called ahead, picked up exactly on schedule, and ensured my fragile items arrived intact. I’m impressed by the professionalism.",
    icon: <FaInstagram />,
    name: "Uche Nwosu",
  },
  {
    text: "Booking was so fast! I love the fact that the app is simple and intuitive, even my mum can use it without stress.",
    icon: <FaFacebookF />,
    name: "Ngozi Eze",
  },
  {
    text: "Rider wore a smile the whole time. That personal touch really makes me want to keep using this service.",
    icon: <FaTiktok />,
    name: "Kehinde Afolabi",
  },
  {
    text: "I’ve never had a missed delivery or delay. The consistency is just unmatched in Lagos traffic!",
    icon: <FaXTwitter />,
    name: "Chinedu Ibe",
  },
  {
    text: "They even called me to confirm drop-off location before arrival. That kind of attention to detail is rare these days.",
    icon: <FaInstagram />,
    name: "Abiola Fashola",
  },
  {
    text: "Prices are fair, and I appreciate that they never add surprise fees at checkout. Honest service!",
    icon: <FaFacebookF />,
    name: "Ifeanyi Onuoha",
  },
  {
    text: "Communication was clear from start to finish. I got notifications for pickup, route, and delivery.",
    icon: <FaTiktok />,
    name: "Omotola Adebanjo",
  },
  {
    text: "They once delivered my important passport documents in under an hour. Saved my entire travel plan!",
    icon: <FaXTwitter />,
    name: "Kunle Olawale",
  },
  {
    text: "Super impressed! The rider knew shortcuts to beat traffic and arrived earlier than promised.",
    icon: <FaInstagram />,
    name: "Blessing Ekanem",
  },
  {
    text: "They treat customers like family. Always respectful, always efficient, always on point.",
    icon: <FaFacebookF />,
    name: "Segun Adesina",
  },
  {
    text: "I can send items to multiple friends without having to make separate bookings. Saves time and money!",
    icon: <FaTiktok />,
    name: "Yetunde Ogunleye",
  },
  {
    text: "Even in the rain, the rider kept my parcels completely dry. Thoughtful and prepared!",
    icon: <FaXTwitter />,
    name: "Gbenga Aluko",
  },
  {
    text: "Always easy to reach customer service. No long wait times, no automated runaround.",
    icon: <FaInstagram />,
    name: "Patience Idowu",
  },
  {
    text: "I trust them with high-value items because they take proper security measures at every stage.",
    icon: <FaFacebookF />,
    name: "Olumide Bassey",
  },
  {
    text: "The rider even helped me carry heavy boxes upstairs without me asking. That’s next-level service!",
    icon: <FaTiktok />,
    name: "Victoria Ebuka",
  },
  {
    text: "Transparent pricing, quick service, and polite riders. What more could I ask for?",
    icon: <FaXTwitter />,
    name: "Ibrahim Musa",
  },
  {
    text: "This app has replaced every other delivery service I’ve used. Just too reliable.",
    icon: <FaInstagram />,
    name: "Zainab Lawal",
  },
  {
    text: "Got same-day delivery from Ikeja to Ajah in under two hours. Incredible speed!",
    icon: <FaFacebookF />,
    name: "Oluwaseun Oyedeji",
  },
  {
    text: "They send constant updates so I’m never left wondering where my parcel is.",
    icon: <FaTiktok />,
    name: "Aisha Bello",
  },
  {
    text: "Booking, payment, and tracking all happen in one smooth process. Love the convenience.",
    icon: <FaXTwitter />,
    name: "Chisom Obi",
  },
  {
    text: "I like how the riders wear branded gear. Makes it easy to identify them.",
    icon: <FaInstagram />,
    name: "Kolade Adebayo",
  },
  {
    text: "Even when I gave the wrong pickup time, they patiently adjusted without complaints.",
    icon: <FaFacebookF />,
    name: "Esther Adekunle",
  },
  {
    text: "I once had a delicate cake delivered and it arrived in perfect condition.",
    icon: <FaTiktok />,
    name: "Maryam Suleiman",
  },
  {
    text: "The speed at which they operate makes them the number one in Lagos for me.",
    icon: <FaXTwitter />,
    name: "Ikenna Udo",
  },
  {
    text: "App is light and works even on low network coverage. Really thoughtful design.",
    icon: <FaInstagram />,
    name: "Rasheed Bakare",
  },
  {
    text: "Every experience so far has been stress-free. I genuinely recommend them to anyone.",
    icon: <FaFacebookF />,
    name: "Nkechi Eze",
  },
];

const row2: Comment[] = [
  {
    text: "Tracking was so accurate 📍 I could follow the rider in real-time, plan ahead, and be ready when the package arrived. No anxiety, no guesswork.",
    icon: <FaInstagram />,
    name: "Amaka Umeh",
  },
  {
    text: "Affordable and reliable 💯 No hidden charges, just honest pricing and consistent quality. I use them for both personal errands and business deliveries.",
    icon: <FaFacebookF />,
    name: "Femi Olatunji",
  },
  {
    text: "Customer support blew my mind! I got a response within minutes, and they resolved my booking issue without stress. Truly top-notch service.",
    icon: <FaTiktok />,
    name: "Sade Ogunbanjo",
  },
  {
    text: "Never once missed a delivery time ⏱️ Sometimes they even arrive early. That level of reliability is rare these days.",
    icon: <FaXTwitter />,
    name: "Ibrahim Yusuf",
  },
  {
    text: "The live tracking kept me updated every step of the way. I could see when they were stuck in traffic or moving fast.",
    icon: <FaInstagram />,
    name: "Ngozi Akintola",
  },
  {
    text: "I’ve used them for urgent medical deliveries and they handled everything with care and speed. Lifesavers!",
    icon: <FaFacebookF />,
    name: "Tope Ajayi",
  },
  {
    text: "Drivers are well-trained and courteous. It’s refreshing to interact with professionals who respect both you and your items.",
    icon: <FaTiktok />,
    name: "Kola Adeyinka",
  },
  {
    text: "Clear communication from pickup to drop-off. I never have to wonder what’s going on with my package.",
    icon: <FaXTwitter />,
    name: "Chinyere Okonkwo",
  },
  {
    text: "The app makes it super easy to book multiple stops. No need for separate trips or extra payments.",
    icon: <FaInstagram />,
    name: "Bisi Adeola",
  },
  {
    text: "They once delivered an important gift across Lagos in just over an hour. Saved my surprise party!",
    icon: <FaFacebookF />,
    name: "Kunle Ayeni",
  },
  {
    text: "Affordable pricing without sacrificing speed or quality. That’s the perfect balance for me.",
    icon: <FaTiktok />,
    name: "Hauwa Lawal",
  },
  {
    text: "Even during fuel scarcity, they kept deliveries on time. That level of consistency is unmatched.",
    icon: <FaXTwitter />,
    name: "Oluwafemi Shittu",
  },
  {
    text: "I like how the rider calls ahead to confirm addresses. Saves confusion and wasted time.",
    icon: <FaInstagram />,
    name: "Rita Nnamdi",
  },
  {
    text: "They once delivered a wedding dress for me in perfect condition. That’s trust right there.",
    icon: <FaFacebookF />,
    name: "Blessing Ijeoma",
  },
  {
    text: "The app interface is clean, quick, and bug-free. Booking takes less than a minute.",
    icon: <FaTiktok />,
    name: "Segun Okoro",
  },
  {
    text: "They take customer feedback seriously and make changes fast. Shows they really care about improvement.",
    icon: <FaXTwitter />,
    name: "Zainab Mohammed",
  },
  {
    text: "I love that they send me proof-of-delivery pictures. Gives me peace of mind.",
    icon: <FaInstagram />,
    name: "Ijeoma Udoh",
  },
  {
    text: "Even my grandma uses this service without stress. That’s how simple and reliable it is.",
    icon: <FaFacebookF />,
    name: "Sunday Ojo",
  },
  {
    text: "Riders are polite and neatly dressed, which really adds to the professionalism.",
    icon: <FaTiktok />,
    name: "Fatima Abdullahi",
  },
  {
    text: "One of the few services I can trust to handle confidential documents securely.",
    icon: <FaXTwitter />,
    name: "Chuka Eze",
  },
  {
    text: "They handled a delivery for my small business like pros. Customers were impressed too.",
    icon: <FaInstagram />,
    name: "Yemi Alade",
  },
  {
    text: "Clear ETA updates made it easy to coordinate with the recipient. No waiting around.",
    icon: <FaFacebookF />,
    name: "Ifeoma Chike",
  },
  {
    text: "Even during heavy rain, my parcels arrived completely dry. Very prepared riders!",
    icon: <FaTiktok />,
    name: "Gbemi Onabanjo",
  },
  {
    text: "Fast, affordable, and dependable — exactly what you want in a delivery service.",
    icon: <FaXTwitter />,
    name: "Uzo Nwachukwu",
  },
  {
    text: "The riders always take safe routes, which is great for peace of mind.",
    icon: <FaInstagram />,
    name: "Chidinma Okoye",
  },
  {
    text: "I once had a late-night delivery and they still came smiling. Dedication!",
    icon: <FaFacebookF />,
    name: "Adeola Taiwo",
  },
  {
    text: "They’ve never damaged any of my fragile deliveries. That’s skill and care.",
    icon: <FaTiktok />,
    name: "Nnamdi Uche",
  },
  {
    text: "Highly dependable for both personal and corporate needs. Can’t fault their service.",
    icon: <FaXTwitter />,
    name: "Opeyemi Ogun",
  },
  {
    text: "The service is the same high quality every single time. That’s why I stick with them.",
    icon: <FaInstagram />,
    name: "Chika Nwankwo",
  },
  {
    text: "I love how easy it is to share my live tracking link with friends.",
    icon: <FaFacebookF />,
    name: "Hadiza Sule",
  },
];

// const row3: Comment[] = [
//   {
//     text: "Love how quick the booking process is. Within minutes, my package is on its way.",
//     icon: <FaInstagram />,
//     name: "Ifeoluwa Ojo",
//   },
//   {
//     text: "Multiple delivery stops in one trip saved me so much time and money.",
//     icon: <FaFacebookF />,
//     name: "Babatunde Alabi",
//   },
//   {
//     text: "Great experience every time! They handle fragile items with care and professionalism.",
//     icon: <FaTiktok />,
//     name: "Olamide Hassan",
//   },
//   {
//     text: "I recommend them to all my friends for both urgent and regular deliveries.",
//     icon: <FaXTwitter />,
//     name: "Precious Nweke",
//   },
//   {
//     text: "I once had frozen food delivered still cold and fresh. That’s attention to detail.",
//     icon: <FaInstagram />,
//     name: "Adanna Okorie",
//   },
//   {
//     text: "The riders always greet you with a smile. That’s customer service done right.",
//     icon: <FaFacebookF />,
//     name: "Tobi Lawani",
//   },
//   {
//     text: "Their tracking system is the most accurate I’ve seen. No false updates or delays.",
//     icon: <FaTiktok />,
//     name: "Damilola Adebisi",
//   },
//   {
//     text: "Booking, payment, and updates all in one app. Couldn’t be more convenient.",
//     icon: <FaXTwitter />,
//     name: "Rotimi Adewale",
//   },
//   {
//     text: "Their branded gear makes riders easy to spot in busy areas. I feel safer that way.",
//     icon: <FaInstagram />,
//     name: "Yetunde Balogun",
//   },
//   {
//     text: "Even in rush hour, they’ve managed to beat my expectations on delivery time.",
//     icon: <FaFacebookF />,
//     name: "Osas Okafor",
//   },
//   {
//     text: "They once returned an item I mistakenly sent — no extra charge. Amazing honesty.",
//     icon: <FaTiktok />,
//     name: "Seun Adediran",
//   },
//   {
//     text: "Customer service follows up after deliveries. Shows they actually care about feedback.",
//     icon: <FaXTwitter />,
//     name: "Gloria Akinyemi",
//   },
//   {
//     text: "Every interaction feels personal. You’re not just another number in their system.",
//     icon: <FaInstagram />,
//     name: "Kunle Ogunbiyi",
//   },
//   {
//     text: "Fast, clean, and stress-free. I’ve never had a damaged package with them.",
//     icon: <FaFacebookF />,
//     name: "Mojisola Salami",
//   },
//   {
//     text: "They know how to handle Lagos traffic like experts. Always on time.",
//     icon: <FaTiktok />,
//     name: "Chibuzor Okeke",
//   },
//   {
//     text: "The speed of their service is unmatched, even during peak hours.",
//     icon: <FaXTwitter />,
//     name: "Ireti Afolayan",
//   },
//   {
//     text: "The app is so easy that even my teenage son can book a delivery.",
//     icon: <FaInstagram />,
//     name: "Oluchi Emeh",
//   },
//   {
//     text: "I appreciate the fact they always confirm delivery with a signature or photo.",
//     icon: <FaFacebookF />,
//     name: "Adeyemi Osho",
//   },
//   {
//     text: "They once helped me move several boxes across town without a single scratch.",
//     icon: <FaTiktok />,
//     name: "Bolanle Odu",
//   },
//   {
//     text: "Same high quality whether it’s a small envelope or a large package.",
//     icon: <FaXTwitter />,
//     name: "Adewale Fashanu",
//   },
//   {
//     text: "They’re the only service I trust for time-sensitive business documents.",
//     icon: <FaInstagram />,
//     name: "Anita Iwuchukwu",
//   },
//   {
//     text: "I love how riders double-check names before handing over packages. Safety first.",
//     icon: <FaFacebookF />,
//     name: "Ebuka Onoh",
//   },
//   {
//     text: "Their attention to detail is why I’ve stayed loyal for over a year.",
//     icon: <FaTiktok />,
//     name: "Omolola Akin",
//   },
//   {
//     text: "Their app runs smoothly even on my old phone. No crashes, no bugs.",
//     icon: <FaXTwitter />,
//     name: "Emeka Opara",
//   },
//   {
//     text: "They go out of their way to help with heavy or awkward packages.",
//     icon: <FaInstagram />,
//     name: "Folake Adepoju",
//   },
//   {
//     text: "Great for last-minute errands. I’ve avoided many missed deadlines because of them.",
//     icon: <FaFacebookF />,
//     name: "Wale Oni",
//   },
//   {
//     text: "Even delicate electronics arrive in perfect condition. Highly reliable.",
//     icon: <FaTiktok />,
//     name: "Chisom Nnamani",
//   },
//   {
//     text: "Their punctuality is something you can set your watch to.",
//     icon: <FaXTwitter />,
//     name: "Ishola Dauda",
//   },
//   {
//     text: "The booking confirmation is instant, and pickup follows almost immediately.",
//     icon: <FaInstagram />,
//     name: "Vivian Adeyeye",
//   },
//   {
//     text: "They’ve handled every delivery I’ve made this year without a single issue.",
//     icon: <FaFacebookF />,
//     name: "Oluwatobi Adebanjo",
//   },
// ];

const renderRow = (comments: Comment[], rowClass: string) => (
  <div className={`comments-row ${rowClass}`}>
    {comments.map((comment, index) => {
    //   let bgColor = "#00000020";
    //   let textColor = "#000";
    //   if (comment.icon) {
    //     const iconType = (comment.icon as any).type;

    //     if (iconType === FaInstagram) {
    //       textColor = "#E1306C";
    //       bgColor = "rgba(225,48,108,0.1)";
    //     } else if (iconType === FaFacebookF) {
    //       textColor = "#1877F2";
    //       bgColor = "rgba(24,119,242,0.1)";
    //     } else if (iconType === FaTiktok) {
    //       textColor = "#000000";
    //       bgColor = "rgba(0,0,0,0.1)";
    //     } else if (iconType === FaXTwitter) {
    //       textColor = "#1DA1F2";
    //       bgColor = "rgba(29,161,242,0.1)";
    //     }
    //   }

      return (
        <div key={index} className="comment-card">
          <div className="comment-content">
            <p style={{ fontSize: 13, color: "#666" }}>{comment.text}</p>
            <strong className="comment-name">— {comment.name}</strong>
            <br />
            {comment.icon && (
              <span
                className="comment-icon"
                style={{
                  backgroundColor: "#ff000021",
                  color: "#ff0000",
                  width: "fit-content",
                  padding: 10,
                  borderRadius: 120,
                  display: "flex",
                  fontSize: 12,
                }}
              >
                {comment.icon}
              </span>
            )}
          </div>
        </div>
      );
    })}
  </div>
);

const CommentsSection: React.FC = () => {
  const target = 6349; // target number
  const [count, setCount] = useState(150); // start from 100

  useEffect(() => {
    const duration = 2000; // total animation duration in ms
    const increment = Math.ceil((target - 100) / (duration / 1)); // update every 20ms

    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev + increment >= target) {
          clearInterval(interval);
          return target;
        }
        return prev + increment;
      });
    }, 500);

    return () => clearInterval(interval);
  }, [target]);

  return (
    <section className="comments-section">
      <h2 className="comments-title">
        Over <span style={{ color: "#ff0000" }}>{count.toLocaleString()}+</span>{" "}
        packages delivered and counting!
      </h2>

      {renderRow(row1, "left-to-right")}
      {renderRow(row2, "right-to-left")}
      {/* {renderRow(row3, "left-to-right")} */}
    </section>
  );
};

export default CommentsSection;
