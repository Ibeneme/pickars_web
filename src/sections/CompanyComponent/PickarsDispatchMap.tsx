import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { IOS_URL, ANDROID_URL } from "../../constants";

interface Step {
  id: string;
  number: string;
  title: string;
  description: string;
  cardContent: string;
}

export default function UberDispatchFlow() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps: Step[] = [
    {
      id: "step-1",
      number: "01",
      title: "Request a Pickup",
      description:
        "Open the app and select the Package or Connect option to begin your delivery.",
      cardContent: "Select Package Delivery",
    },
    {
      id: "step-2",
      number: "02",
      title: "Enter Pickup Location",
      description:
        "Input exact locations where the rider should collect and deliver the parcel.",
      cardContent: "Enter Pickup & Drop-off",
    },
    {
      id: "step-3",
      number: "03",
      title: "Select Dispatch Rider",
      description:
        "Browse nearby vetted riders with ratings, vehicle types, and estimated arrival times.",
      cardContent: "Choose Nearby Vetted Rider",
    },
    {
      id: "step-4",
      number: "04",
      title: "Confirm & Pay",
      description:
        "Review delivery route breakdown, upfront pricing, and authorize secure payment.",
      cardContent: "Review & Confirm Payment",
    },
    {
      id: "step-5",
      number: "05",
      title: "Hand your package to your rider",
      description:
        "Meet your verified driver at the pickup location and safely hand over your parcel.",
      cardContent: "Hand Over Package securely",
    },
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF5F5] flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-6xl bg-black text-white rounded-3xl border border-red-900/50 shadow-2xl flex flex-col justify-between p-8 md:p-16 relative overflow-hidden">
        {/* Top Styled Badge (Matching provided style with bg #FF0000) */}
        <div>
          <div
            className="mb-6 inline-block px-5 py-2 bg-[#FF0000] text-white font-black text-[11px] sm:text-xs uppercase tracking-widest cursor-default select-none"
            style={{
              maskImage:
                "radial-gradient(circle 5px at calc(100% - 2.5px) 50%, #0000 99%, #000 100%)",
              WebkitMaskImage:
                "conic-gradient(from -45deg at 50% 50%, #000 0 90deg, #0000 0) 0 0/10px 10px repeat",
            }}
          >
            Step {steps[currentStep].number} of 05 —{" "}
            {steps[currentStep].cardContent}
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight mb-4 text-white">
            {steps[currentStep].title}
          </h1>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-8 max-w-2xl">
            {steps[currentStep].description}
          </p>
        </div>

        {/* Indicator Dots */}
        <div className="flex justify-start space-x-2 my-6">
          {steps.map((step, idx) => (
            <button
              key={step.id}
              onClick={() => setCurrentStep(idx)}
              aria-label={`Go to step ${idx + 1}`}
              className={`h-2 rounded-full transition-all ${
                currentStep === idx ? "w-8 bg-[#FF0000]" : "w-2 bg-zinc-800"
              }`}
            />
          ))}
        </div>

        {/* Navigation Controls & App Store Links */}
        <div className="flex flex-col lg:flex-row items-center justify-between pt-6 border-t border-zinc-800 gap-6">
          {/* Step Navigation Arrows */}
          <div className="flex space-x-3 w-full lg:w-auto">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              aria-label="Previous Step"
              className={`w-12 h-12 rounded-2xl flex items-center justify-center transition ${
                currentStep === 0
                  ? "bg-zinc-900 text-zinc-600 cursor-not-allowed"
                  : "bg-zinc-900 text-white hover:bg-[#FF0000]"
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextStep}
              disabled={currentStep === steps.length - 1}
              aria-label="Next Step"
              className={`w-12 h-12 rounded-2xl flex items-center justify-center transition ${
                currentStep === steps.length - 1
                  ? "bg-zinc-900 text-zinc-600 cursor-not-allowed"
                  : "bg-zinc-900 text-white hover:bg-[#FF0000]"
              }`}
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Download App Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 w-full lg:w-auto">
            <a
              href={IOS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-w-[180px] items-center justify-center gap-3 rounded-2xl bg-zinc-900 px-6 py-4 text-white transition-all hover:bg-[#FF0000]"
            >
              <svg
                className="h-6 w-6 shrink-0 fill-current"
                viewBox="0 0 384 512"
              >
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 52.3-12 69.5-34.3z" />
              </svg>
              <div className="text-left">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                  Download on the
                </p>
                <p className="text-base font-bold leading-tight">App Store</p>
              </div>
            </a>

            <a
              href={ANDROID_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-w-[180px] items-center justify-center gap-3 rounded-2xl bg-zinc-900 px-6 py-4 text-white transition-all hover:bg-[#FF0000]"
            >
              <svg
                className="h-6 w-6 shrink-0 fill-current"
                viewBox="0 0 512 512"
              >
                <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l220.7-221.3 60.1 60.1L104.6 499z" />
              </svg>
              <div className="text-left">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                  Get it on
                </p>
                <p className="text-base font-bold leading-tight">Play Store</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
