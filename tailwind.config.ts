import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#000000",
          yellow: "#FDE200",
          white: "#FFFFFF",
          cream: "#F8F5E7"
        }
      },
      fontFamily: {
        sans: ['"Helvetica Neue"', "Inter", "system-ui", "sans-serif"]
      },
      boxShadow: {
        soft: "0 24px 70px rgba(15, 23, 42, 0.08)",
        card: "0 18px 40px rgba(15, 23, 42, 0.08)"
      },
      borderRadius: {
        "4xl": "2rem"
      },
      backgroundImage: {
        "wandrly-radial":
          "radial-gradient(circle at top left, rgba(253, 226, 0, 0.34), transparent 38%), radial-gradient(circle at top right, rgba(255, 255, 255, 0.9), transparent 34%), linear-gradient(135deg, #FFF7B0 0%, #FDFBF2 55%, #FFFFFF 100%)"
      }
    }
  },
  plugins: []
};

export default config;
