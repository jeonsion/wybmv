import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["ui-rounded", "Hiragino Maru Gothic ProN", "Quicksand", "system-ui", "sans-serif"]
      },
      colors: {
        blush: "#f9d5e7",
        rosepink: "#ff4f9a"
      },
      boxShadow: {
        candy: "0 22px 45px rgba(225, 70, 140, 0.22)"
      },
      animation: {
        float: "float 10s linear infinite"
      },
      keyframes: {
        float: {
          "0%": { transform: "translateY(0px) rotate(0deg)", opacity: "0.15" },
          "50%": { opacity: "0.4" },
          "100%": { transform: "translateY(-120px) rotate(12deg)", opacity: "0.1" }
        }
      }
    }
  },
  plugins: []
};

export default config;
