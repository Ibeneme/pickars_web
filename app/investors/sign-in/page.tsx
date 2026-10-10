import React from "react";
import InvestorSignInPage from "../../../components/investors/auth";

export const metadata = {
  title: "Investor Portal Sign In | Pickars",
  description:
    "Sign in to the Pickars Investor Portal to review portfolio metrics, reports, and shareholder records.",
  openGraph: {
    title: "Investor Portal Sign In | Pickars",
    description:
      "Review portfolio metrics, reports, and shareholder records in one place.",
    url: "https://www.pickars.com/investors/sign-in",
    siteName: "Pickars",
    images: [
      {
        url: "/opengraphs/investor-auth.png",
        width: 1200,
        height: 630,
        alt: "Pickars Investor Portal Sign In",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Investor Portal Sign In | Pickars",
    description:
      "Review portfolio metrics, reports, and shareholder records in one place.",
    images: ["/opengraphs/investor-auth.png"],
  },
};

const Page = () => {
  return (
    <div>
      <InvestorSignInPage />
    </div>
  );
};

export default Page;
