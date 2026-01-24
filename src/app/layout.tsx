import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export const metadata: Metadata = {
  title: "Handcrafted Haven - Artisan Marketplace",
  description:
    "Discover unique handcrafted items from talented artisans. Support local creators and find treasures that tell a story.",
  keywords: [
    "handmade",
    "artisan",
    "crafts",
    "marketplace",
    "handcrafted",
    "local",
    "sustainable",
  ],
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://handcraftedhaven.com",
    siteName: "Handcrafted Haven",
    title: "Handcrafted Haven - Artisan Marketplace",
    description: "Discover unique handcrafted items from talented artisans",
  },
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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://handcraftedhaven.com" />
        <link rel="icon" href="/images/favicon.webp" />
        <link rel="apple-touch-icon" href="/images/favicon.webp" />
      </head>
      <body className={inter.variable} suppressHydrationWarning>
        <a href="#main" className="skip-to-main">
          Skip to main content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
