
"use client"
import { useState, useEffect } from "react";

export default function useDarkSide() {
  // Check if localStorage is available and retrieve the theme
  const initialTheme = typeof window !== "undefined" ? localStorage.theme : null;

  // Set a default theme if localStorage.theme is not available
  const defaultTheme = "light";
  const [theme, setTheme] = useState(initialTheme || defaultTheme);
  const colorTheme = theme === "dark" ? "light" : "dark";

  // Update localStorage only if it's available
  if (typeof window !== "undefined" && initialTheme === null) {
    localStorage.setItem("theme", theme);
  }

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    root.classList.add(theme);

    // Update localStorage only if it's available
    if (typeof window !== "undefined") {
      if (localStorage.theme === "dark") {
        localStorage.removeItem("theme");
      } else {
        localStorage.setItem("theme", theme);
      }
    }
  }, [theme, colorTheme]);

  return [colorTheme, setTheme];
}
