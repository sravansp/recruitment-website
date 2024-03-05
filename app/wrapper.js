"use client";

import React from "react";
import { ConfigProvider, theme } from "antd";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import Navbar from "@/Components/Navbar";

// Check if localStorage is available and retrieve the theme
const initialTheme = typeof window !== "undefined" ? localStorage.theme : null;

// Set a default theme if localStorage.theme is not available
const defaultTheme = "light";

const colorPrimary = "#6A4BFC";
const mode = initialTheme || defaultTheme;
export default function Wrapper(props) {
  const { children } = props;

  return (
    // <ConfigProvider
    //   theme={{
    //     algorithm: theme.darkAlgorithm,
    //   }}
    // >
    //   {children}
    // </ConfigProvider>
    <ConfigProvider
      theme={{
        token: { colorPrimary },
        algorithm:
          mode === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
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
