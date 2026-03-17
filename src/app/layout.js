import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import SmoothScroller from "@/components/layout/SmoothScroller";
import CustomCursor from "@/components/layout/CustomCursor";
import "./globals.css";

const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });
const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });

export const metadata = { title: "Portfolio | Full Stack Developer" };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${mono.variable} ${display.variable}`}>
      <body>
        <CustomCursor />
        <SmoothScroller>
          {children}
        </SmoothScroller>
      </body>
    </html>
  );
}