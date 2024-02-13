/** @type {import('tailwindcss').Config} */

export const content = ["./src/**/*.{js,jsx,ts,tsx}"];
export const theme = {
  extend: {
    colors: {
      // black: "#161618",
      pink: "#ff49db",
      white: "#fff",
      ash: "#3E3E3F",
      green: "#027A48",
      greenLight: "#ECFDF3",
      // red: "#B42318",
      redlight: "#FEF3F2",
      grayLight: "#ededed",
      slateBlue: "var(--slateBlue)",
      stale: "var(--stale)",

      // primary: color, // Purple Blue
      primary: "var(--primary-color) !important", // Purple Blue

      // primary: "#6A4BFC", // Purple Blue
      secondary: "#111E2C", // Dark
      accent: "var(--primary-color)", // Purple Blue

      // accent: "#6A4BFC", // Purple Blue
      secondaryWhite: "#F4F4F4",
      secondaryDark: "#3E3E3F",
      borderlight: "rgba(0, 0, 0, 0.10)",
      borderdark: "rgba(255, 255, 255, 0.10)",
      grey: "#667085",
      lightdark: "#242424",
      whiteTint: "#F4F4F4",

     // Specify black color for dark mode
     black: {
      DEFAULT: "#000000",
    },
    dark: {
      black: "#161618",
    },
    },
    // },
    //   extend: {
    fontFamily: {
      Graphik: "Graphik",
      Inter: [`var(--font-Inter)`],
      Poppins: "Poppins",
      figtree: [`var(--font-Figtree)`],
    },

    boxShadow: {
      ShadowInput: "0px 0px 0px 5px rgba(102, 83, 240, 0.20);",
      ShadowInputpink: "0px 0px 0px 5px rgba(238, 46, 94, 0.16);",
      shadowXS: "0px 1px 2px 0px rgba(16, 24, 40, 0.05);",
      primaryShadow: "0px 0px 15px var(--primary-color)66",
      stepShadow: "0px 5px 8px 0px rgba(165, 165, 165, 0.40);",
      stepShadowInset: "0px 0px 4px 0px rgba(255, 255, 255, 0.25) inset;",
    },

    animation: {
      "infinite-scroll": "infinite-scroll 35s linear infinite",
    },
    keyframes: {
      "infinite-scroll": {
        from: { transform: "translateX(0)" },
        to: { transform: "translateX(-100%)" },
      },
    },
    fontSize: {
      sm: "14px",
    },
  },
  screens: {
    xs: "320px",
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1440px",
    // "2xl": "1540px",
    "3xl": "1600px",
    "4xl": "1800px",
    "5xl": "2000px",
    "6xl": "2400px",
  },
};
export const plugins = [];
export const darkMode = "class";
