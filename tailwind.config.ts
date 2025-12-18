import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bv: {
          primary: "#4A3AFF",
          dark: "#06042E",
          darker: "#030118",
        },
        cad: {
          purple: "#A78BFA",
          cyan: "#22D3EE",
          green: "#4ADE80",
          yellow: "#FACC15",
          blue: "#60A5FA",
        },
        xp: {
          titlebar: {
            start: "#0A246A",
            end: "#A6CAF0",
            mid: "#1a68d0",
          },
          titlebarUnfocused: {
            start: "#7a96df",
            mid: "#5b7fce",
            end: "#4b6ebd",
          },
          window: "#ECE9D8",
          selection: "#316AC5",
          closeBtn: "#E04343",
          closeBtnHover: "#ff9080",
          minMaxBtn: "#3c8cf0",
          minMaxBtnHover: "#5ca8ff",
        },
      },
      fontSize: {
        'xxs': ['11px', { lineHeight: '1.4' }],
      },
      fontFamily: {
        mono: ["JetBrains Mono", "Consolas", "Monaco", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "blink": "blink 1s step-end infinite",
        "spin-slow": "spin 8s linear infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
