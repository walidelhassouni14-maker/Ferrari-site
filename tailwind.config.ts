import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        ferrari: {
          red: "#DC0000",
          black: "#0A0A0A",
          dark: "#141414",
          card: "#1A1A1A",
          gold: "#C9A84C",
          gray: "#888888",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-montserrat)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "line-grow": {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
        scroll: {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(10px)", opacity: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s ease-out forwards",
        "line-grow": "line-grow 1.2s ease-out forwards",
        scroll: "scroll 1.5s ease-in-out infinite",
      },
    },
  },
};
export default config;
