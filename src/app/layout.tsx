import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Handcrafted Haven - Artisan Marketplace",
  description:
    "Discover unique handcrafted items from talented artisans. Support local creators.",
  keywords: [
    "handmade",
    "artisan",
    "crafts",
    "marketplace",
    "handcrafted",
    "local",
  ],
  viewport: "width=device-width, initial-scale=1.0",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#8B7355" />
      </head>
      <body className={inter.variable} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
