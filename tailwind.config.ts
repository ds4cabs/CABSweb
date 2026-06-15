import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // CABS brand palette (matches cabsweb.org)
        ink: "#143642", // deep teal-navy text
        surface: "#ffffff",
        "surface-2": "#f1f7f9",
        line: "#dbe7eb",
        // Teal — logo + secondary buttons
        teal: {
          DEFAULT: "#1c9aa8", // logo mark
          soft: "#3bb2bf",
          deep: "#2f7d8d", // teal CTA buttons
        },
        // Orange — primary CTA + accents
        orange: {
          DEFAULT: "#e8861e",
          soft: "#f29a35",
          deep: "#cf6f12",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #1c9aa8 0%, #2f7d8d 100%)",
        "hero-wash": "linear-gradient(180deg, #eaf4f7 0%, #f7fbfc 60%, #ffffff 100%)",
      },
      boxShadow: {
        glow: "0 10px 30px -12px rgba(28,154,168,0.35)",
        card: "0 1px 3px rgba(20,54,66,0.08), 0 12px 30px -18px rgba(20,54,66,0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
