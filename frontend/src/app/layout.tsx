import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

// 1. Setup Body Font (Inter)
const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-sans",
});

// 2. Setup Heading Font (Space Grotesk)
const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"], 
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "SentinelCI | AI-Powered Continuous Integration",
  description: "Stop debugging in the dark. Let AI analyze your pipeline failures.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        inter.variable,       // Inject Inter variable
        spaceGrotesk.variable // Inject Space Grotesk variable
      )}>
        {children}
      </body>
    </html>
  );
}