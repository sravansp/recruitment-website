import { Inter } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./globals.css";
import "./style.css";
import Navbar from "@/Components/Navbar";
import { ConfigProvider } from "antd";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Jobs",
  description: "",
};

// Check if localStorage is available and retrieve the theme
const initialTheme = typeof window !== "undefined" ? localStorage.theme : null;

// Set a default theme if localStorage.theme is not available
const defaultTheme = "light";

const colorPrimary = "#6A4BFC";
const mode = initialTheme || defaultTheme;
export default function RootLayout({ children }) {
  return (
    <html lang="en" className="transition-colors duration-300 scroll-smooth">
      <body className={inter.className}>
        <ConfigProvider
          theme={{
            token: { colorPrimary },
          }}
        >
          <AntdRegistry>
            <Navbar />
            {children}
          </AntdRegistry>
        </ConfigProvider>
      </body>
    </html>
  );
}
