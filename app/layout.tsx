import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const serif = Playfair_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://onis.club"),
  title: "ONIS — make it count. honestly.",
  description:
    "An honest tracker for the habit you want to cut down. One tap to log energy drinks, alcohol and more — stay under your target, week by week. Nothing leaves your phone: no account, no cloud, no analytics. $4.99 once.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "ONIS — make it count. honestly.",
    description:
      "An honest tracker for the habit you want to cut down. One tap from your wrist. Nothing leaves your phone. $4.99 once, no subscription.",
    url: "https://onis.club/",
    type: "website",
    images: ["/images/onis-appicon.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "ONIS — make it count. honestly.",
    description:
      "An honest tracker for the habit you want to cut down. One tap from your wrist. Nothing leaves your phone.",
    images: ["/images/onis-appicon.png"],
  },
  icons: {
    icon: [
      { url: "/favicon/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon/favicon-96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/favicon/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#F4F0E6",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${serif.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
