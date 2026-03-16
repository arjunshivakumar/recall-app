/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        canvas: "#F5F7F2",
        accent: "#2F6FED",
        ink: "#111827",
        muted: "#667085",
        line: "#E5E7EB",
        surface: "#FFFFFF",
      },
      boxShadow: {
        card: "0 16px 40px rgba(15, 23, 42, 0.08)",
      },
    },
  },
  plugins: [],
};
