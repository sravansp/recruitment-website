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
  const dispatch = useDispatch();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [color, setColor] = useState(
    localStorage.getItem("mainColor") || getPrimaryColor(theme) || "#6A4BFC"
  );

  useEffect(() => {
    document.documentElement.style.setProperty("--primary-color", color);
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
console.log(color);


  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
