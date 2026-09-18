/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {
        // Make sure there is a comma after any property defined *above* this block
        fontFamily: {
          sans: ["var(--font-lufga)", "sans-serif"],
        }, // <- Check closing braces and commas here
      },
    },
    plugins: [],
  };