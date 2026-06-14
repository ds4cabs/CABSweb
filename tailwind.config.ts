import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // CABS / DS4CABS brand palette
        ink: "#0b1020", // deep navy background
        surface: "#11182f",
        "surface-2": "#161f3d",
        line: "#243056",
        emerald: {
          DEFAULT: "#10b981",
          soft: "#34d399",
        },
        indigo: {
          DEFAULT: "#6366f1",
          soft: "#818cf8",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #10b981 0%, #6366f1 100%)",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(99,102,241,0.18), 0 18px 50px -20px rgba(16,185,129,0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
