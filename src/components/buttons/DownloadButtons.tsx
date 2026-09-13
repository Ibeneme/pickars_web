import { IOS_URL, ANDROID_URL } from "../../constants";

export default function DownloadButtons({
  iosUrl = IOS_URL,
  androidUrl = ANDROID_URL,
  dark = false,
  alignLeft = false,
}: {
  iosUrl?: string;
  androidUrl?: string;
  dark?: boolean;
  alignLeft?: boolean;
}) {
  // Added 'group' so children can listen to the parent hover state
  const buttonStyles = `group flex flex-1 sm:flex-none min-w-[140px] sm:min-w-[180px] items-center justify-center gap-2.5 sm:gap-3 rounded-[120px] px-3 sm:px-4 py-3 transition-all ${
    dark
      ? "bg-white text-black hover:bg-[#ff0000] hover:text-white"
      : "bg-black text-white hover:bg-[#ff0000]"
  }`;

  // Updated to group-hover with dynamic text color based on button state
  const subtitleStyles = `text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider transition-colors duration-200 ${
    dark
      ? "text-zinc-500 group-hover:text-white/80"
      : "text-zinc-400 group-hover:text-white/80"
  }`;

  // Alignment: centered on mobile, left-aligned on web if alignLeft is true
  const alignmentClass = alignLeft
    ? "justify-center md:justify-start"
    : "justify-center";

  return (
    <div
      className={`mt-0 flex flex-row items-center gap-3 sm:gap-4 w-full ${alignmentClass}`}
    >
      {/* iOS App Store Button */}
      <a
        href={iosUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonStyles}
      >
        <svg
          className="h-5 w-5 sm:h-6 sm:w-6 shrink-0 fill-current"
          viewBox="0 0 384 512"
        >
          <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 52.3-12 69.5-34.3z" />
        </svg>
        <div className="text-left">
          <p className={subtitleStyles}>Download on</p>
          <p className="text-sm sm:text-base font-bold leading-tight">
            App Store
          </p>
        </div>
      </a>

      {/* Android Play Store Button */}
      <a
        href={androidUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonStyles}
      >
        <svg
          className="h-5 w-5 sm:h-6 sm:w-6 shrink-0 fill-current"
          viewBox="0 0 512 512"
        >
          <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l220.7-221.3 60.1 60.1L104.6 499z" />
        </svg>
        <div className="text-left">
          <p className={subtitleStyles}>Get it on</p>
          <p className="text-sm sm:text-base font-bold leading-tight">
            Play Store
          </p>
        </div>
      </a>
    </div>
  );
}
