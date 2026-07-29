import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#0A0A0B",
          alt: "#121214",
        },
        primary: {
          DEFAULT: "#E31B23",
          alt: "#D7263D",
        },
        secondary: {
          DEFAULT: "#7A0C13",
        },
        neutral: {
          light: "#F2F2F2",
          dim: "#8A8A8E",
        },
      },
      fontFamily: {
        heading: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      animation: {
        "pulse-red": "pulse-red 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 3s ease-in-out infinite",
        scanline: "scanline 8s linear infinite",
        glow: "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        "pulse-red": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: ".5" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px #E31B23, 0 0 10px #E31B23" },
          "100%": { boxShadow: "0 0 20px #E31B23, 0 0 30px #E31B23" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
