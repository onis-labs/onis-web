import type { Metadata, Viewport } from "next";
import "./globals.css";
import { site } from "./lib/config";
import { plans } from "./lib/pricing";

const title = "ONIS — Private Habit Tracker for iPhone and Apple Watch";
const description =
  "Build, reduce, or simply track a habit with one-tap logging, clear Trends, Coach guidance, Apple Watch, and widgets. No ONIS account required.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    url: site.url + "/",
    siteName: site.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
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

// SoftwareApplication structured data — no ratings/reviews (none are real).
const appLd = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  name: site.name,
  operatingSystem: "iOS, watchOS",
  applicationCategory: "LifestyleApplication",
  url: site.url,
  description,
  offers: plans.map((p) => ({
    "@type": "Offer",
    name: p.name,
    price: p.price.replace(/[^0-9.]/g, "") || "0",
    priceCurrency: "USD",
  })),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(appLd) }}
        />
      </body>
    </html>
  );
}
