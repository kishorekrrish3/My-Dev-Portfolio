import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { VisualEditsMessenger } from "orchids-visual-edits";
import { SmoothCursor } from "@/components/magicui/smooth-cursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kishore P — Full-Stack Developer & AI Enthusiast",
  description:
    "Portfolio of Kishore P — Full-Stack Developer, AI & ML Enthusiast, Robotics. 3rd-year student at VIT Chennai.",
  keywords: ["Kishore P", "Full-Stack Developer", "AI", "ML", "Robotics", "VIT Chennai", "Portfolio"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SmoothCursor />
        {children}
        <VisualEditsMessenger />
      </body>
    </html>
  );
}
