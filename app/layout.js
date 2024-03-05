import { Inter } from "next/font/google";
import "./globals.css";
import "./style.css";
import Wrapper from "./wrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Jobs",
  description: "",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" className="transition-colors duration-300 scroll-smooth">
      <body className={inter.className}>
      <Wrapper>{children}</Wrapper>
      </body>
    </html>
  );
}
