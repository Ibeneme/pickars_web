import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import phone_a from "../../assets/images/use_app/phone_a.svg";
import phone_b from "../../assets/images/use_app/phone_b.svg";
import phone_c from "../../assets/images/use_app/phone_c.svg";
import phone_d from "../../assets/images/use_app/phone_d.svg";
import DownloadButtons from "../../components/buttons/DownloadButtons";

interface Step {
  id: string;
  number: string;
  title: string;
  description: string;
  cardContent: string;
  image: string;
}

export default function UberDispatchFlow() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps: Step[] = [
    {
      id: "step-1",
      number: "01",
      title: "Get Started",
      description:
        "Open the application on your mobile device to kickstart your fast delivery process.",
      cardContent: "Initialize App",
      image: phone_a,
    },
    {
      id: "step-2",
      number: "02",
      title: "Enter Pickup Location",
      description:
        "Input exact addresses where our professional courier should collect and drop off your items.",
      cardContent: "Enter Pickup & Drop-off",
      image: phone_b,
    },
    {
      id: "step-3",
      number: "03",
      title: "Select Option",
      description:
        "Choose your preferred delivery vehicle type, service tier, and review vetted rider options.",
      cardContent: "Choose Service Tier",
      image: phone_c,
    },
    {
      id: "step-4",
      number: "04",
      title: "Stay Updated",
      description:
        "Track your delivery progress live in real time with continuous status notifications.",
      cardContent: "Live Tracking & Updates",
      image: phone_d,
    },
    {
      id: "step-5",
      number: "05",
      title: "Pay for Delivery",
      description:
        "Complete secure payment seamlessly via multiple available transaction channels.",
      cardContent: "Review & Pay Securely",
      image: phone_a,
    },
  ];

  // Auto-advance every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prevStep) => (prevStep + 1) % steps.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [steps.length]);

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
    <div className="min-h-screen bg-[#000] py-12 flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-6xl bg-black text-white rounded-3xl border border-red-900/50 flex flex-col justify-between p-8 md:p-16 relative overflow-hidden">
        {/* Main Content Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-8">
          {/* Text Section - Aligned Top with Navigation & Dots Included */}
          <div className="md:col-span-6 self-start flex flex-col justify-between h-full">
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
              <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-xl mb-8">
                {steps[currentStep].description}
              </p>
            </div>

            <div>
              {/* Indicator Dots */}
              <div className="flex justify-start space-x-2 mb-6">
                {steps.map((step, idx) => (
                  <button
                    key={step.id}
                    onClick={() => setCurrentStep(idx)}
                    aria-label={`Go to step ${idx + 1}`}
                    className={`h-2 rounded-full transition-all ${
                      currentStep === idx
                        ? "w-8 bg-[#FF0000]"
                        : "w-2 bg-zinc-800"
                    }`}
                  />
                ))}
              </div>

              {/* Step Navigation Arrows */}
              <div className="flex space-x-3 w-full">
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

              {/* App Store Links Section */}
              <div className="flex mt-4 flex-col lg:flex-row items-center justify-start pt-6 border-t border-zinc-800 gap-6">
                <DownloadButtons dark={true} alignLeft={true} />
              </div>
            </div>
          </div>

          {/* Image Section - Centered in the right div */}
          <div className="md:col-span-6 flex items-center justify-center">
            <div className="w-full max-w-lg h-[600px] sm:h-[650px] flex items-center justify-center overflow-hidden">
              <img
                src={steps[currentStep].image}
                alt={`Step ${steps[currentStep].number} visual`}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
