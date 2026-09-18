export const IOS_URL = "https://apps.apple.com/ng/app/pickars/id6746796884";
export const ANDROID_URL = "https://play.google.com/store/apps/details?id=com.pickars.app&hl=en";

export const port = process.env.PORT || 3000;
export const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NODE_ENV === "development"
    ? `http://localhost:${port}`
    : "https://www.pickars.com");

