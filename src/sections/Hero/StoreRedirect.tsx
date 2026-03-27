// import React, { useEffect, useState } from "react";
// import QRCode from "react-qr-code";

// // Your Store Links
// const IOS_URL = "https://apps.apple.com/ng/app/pickars/id6746796884";
// const ANDROID_URL = "https://play.google.com/store/apps/details?id=com.pickars.app";
// // The URL where this specific page is hosted
// const SMART_REDIRECT_URL = "www.pickars.com"; 

// const UniversalDownloadPage = () => {
//   const [targetUrl, setTargetUrl] = useState(ANDROID_URL);
//   const [device, setDevice] = useState("Android");

//   useEffect(() => {
//     const userAgent = navigator.userAgent || navigator.vendor;

//     // 1. Detect Device
//     if (/iPad|iPhone|iPod/.test(userAgent)) {
//       setTargetUrl(IOS_URL);
//       setDevice("iOS");
//       // 2. Auto-redirect if they are ALREADY on mobile
//       window.location.href = IOS_URL;
//     } else if (/android/i.test(userAgent)) {
//       setTargetUrl(ANDROID_URL);
//       setDevice("Android");
//       // 2. Auto-redirect if they are ALREADY on mobile
//       window.location.href = ANDROID_URL;
//     }
//   }, []);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4 font-sans">
//       {/* THIS IS THE ONE SCANCODE FOR BOTH */}
//       <div className="p-8 border-2 border-gray-100 rounded-3xl shadow-2xl bg-white">
//         <QRCode 
//           value={SMART_REDIRECT_URL} 
//           size={250} 
//           level="H"
//         />
//       </div>

//       <div className="mt-8 text-center max-w-sm">
//         <h1 className="text-3xl font-black text-gray-900 tracking-tight">
//           Pickars
//         </h1>
//         <p className="text-gray-500 mt-2 text-lg">
//           One code. Any device.
//         </p>
        
//         <div className="mt-10 flex flex-col gap-4">
//           <a 
//             href={targetUrl}
//             className="bg-black text-white px-10 py-4 rounded-2xl font-bold text-xl hover:scale-105 transition-transform"
//           >
//             Download for {device}
//           </a>
          
//           <p className="text-gray-400 text-sm">
//             Redirecting you to the store...
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UniversalDownloadPage;