/** @type {import('tailwindcss').Config} */
module.exports = {
  // content: [
  //   "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  //   "./components/**/*.{js,ts,jsx,tsx,mdx}",
  //   "./app/**/*.{js,ts,jsx,tsx,mdx}",
  // ],
  content: [
    // using ./src/ dir
    "./src/**/*.{js,ts,jsx,tsx}",
    // using ./ dir
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    // add more paths here
  ],
  theme: {
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
        dragShadow: "0px 66px 100px 0px #C9CBD1",
        dragShadowDark: "0px 66px 100px 0px #141414",
      },
  
      animation: {
        "infinite-scroll": "infinite-scroll 35s linear infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      keyframes: {
        "infinite-scroll": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      fontSize: {
        sm: "14px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "TopSection":
          "linear-gradient(94deg, rgba(40, 139, 211, 0.30) -2.65%, rgba(133, 79, 247, 0.22) 49.06%, rgba(245, 146, 235, 0.22) 91.36%)",
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
  },

  darkMode: 'class',
  plugins: [require("tailwindcss-animate")],
};
