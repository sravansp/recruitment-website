"use client";
import React, { useEffect, useState } from "react";
import { ConfigProvider, theme } from "antd";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import Navbar from "@/Components/Navbar";

export default function Wrapper(props) {
  // Set a default theme if localStorage.theme is not available
  const defaultTheme = "light";

  const colorPrimary = "#6A4BFC";


  // Use state to manage the current theme
  const [currentTheme, setCurrentTheme] = useState(() => {
    // Check if localStorage is available and retrieve the theme
    return typeof window !== "undefined" ? localStorage.theme || defaultTheme : defaultTheme;
  });
  // Use state to manage the current theme
  const [themeColor, setthemeColor] = useState(() => {
    // Check if localStorage is available and retrieve the theme
    return typeof window !== "undefined" ? localStorage.themeColor || colorPrimary : colorPrimary;
  });

  const { children } = props;

  useEffect(() => {
    // Update localStorage when the theme changes
    localStorage.setItem("theme", currentTheme);
    localStorage.setItem("themeColor", themeColor);
  }, [currentTheme, themeColor]);

  return (
     <ConfigProvider
      theme={{
        token: { colorPrimary },
        algorithm:
        currentTheme === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <AntdRegistry>
        <div className="relative h-screen overflow-auto dark:bg-black">
          <Navbar />
          {children}
        </div>
      </AntdRegistry>
    </ConfigProvider>
  );
}
