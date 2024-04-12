// ThemeContext.js

import React, { createContext, useContext, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { mode, themeColor } from "../../Redux/slice";

const ThemeContext = createContext();
const getPrimaryColor = (themeMode) => {
  switch (themeMode) {
    case "dark":
      return "#6A4BFC";
    case "pink":
      // return "#E42684"; OLD PINK
      return "#EE2E5E"; //NEW PINK
    case "light":
    default:
      return "#6A4BFC";
  }
};

export const ThemeProvider = ({ children }) => {
  const hexToRGBA = (hex, alpha) => {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);
  
    if (alpha) {
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    } else {
      // return `rgb(${r}, ${g}, ${b})`;
      return `${r}, ${g}, ${b}`;
    }
  };

  const dispatch = useDispatch();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [color, setColor] = useState(
    localStorage.getItem("mainColor") || getPrimaryColor(theme) || "#6A4BFC"
  );

  useEffect(() => {
    const rgbaColor = hexToRGBA(color);
    document.documentElement.style.setProperty("--primary-color", color);
    document.documentElement.style.setProperty("--primary", rgbaColor);
    localStorage.setItem("mainColor", color);
    dispatch(mode(theme));
    dispatch(themeColor(color));
  }, [color, theme, dispatch]);

  const toggleTheme = (themeMode) => {
    setTheme(themeMode);
    const primaryColor = getPrimaryColor(themeMode);
    setColor(primaryColor);
    localStorage.setItem("theme", themeMode);
    localStorage.setItem("mainColor", primaryColor);
  };
// console.log(color);


  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
