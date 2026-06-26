import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import Background from "@/components/layout/Background";
import SmoothScroller from "@/components/layout/SmoothScroller";
import "./globals.css";

const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });
const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });

export const metadata = { title: "CR-SPACE | Chitranjan" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Background />
        <SmoothScroller>
          <div style={{ position: "relative", zIndex: 2 }}>{children}</div>
        </SmoothScroller>
      </body>
    </html>
  );
}