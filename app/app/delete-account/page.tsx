import type { Metadata } from "next";
import DeleteAccountPage from "@/components/landing-page/legals-and-policies/delete-account";

export const metadata: Metadata = {
  title: "Request Account Deletion | Pickars",
  description:
    "Request the permanent deletion of your Pickars user account and associated personal data in accordance with Google Play User Data policies.",
  keywords: [
    "Pickars",
    "Account Deletion",
    "Delete Account",
    "Data Safety",
    "Privacy Policy",
    "Port Harcourt Delivery",
  ],
  alternates: {
    canonical: "https://pickars.com/app/delete-account", // Replace with your actual domain
  },
  openGraph: {
    title: "Account Deletion Request - Pickars",
    description:
      "Submit a request to permanently delete your Pickars account and associated service data.",
    url: "https://pickars.com/app/delete-account", // Replace with your actual domain
    siteName: "Pickars",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://pickars.com/card.png", // Replace with your OG image URL
        width: 1200,
        height: 630,
        alt: "Pickars Account Deletion Request",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Request Account Deletion | Pickars",
    description:
      "Submit a request to permanently delete your Pickars account and associated service data.",
    images: ["https://pickars.com/card.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const DeletePage = () => {
  return (
    <main>
      <DeleteAccountPage />
    </main>
  );
};

export default DeletePage;
