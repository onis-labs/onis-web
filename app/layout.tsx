import type { Metadata, Viewport } from "next";
import "./globals.css";
import { site } from "./lib/config";
import {
  lifetimePrice,
  publicOffersForSchema,
  yearlyPrice,
} from "./lib/pricing";

const title = "ONIS — Habit Tracker for iPhone, Apple Watch & Widgets";
const description =
  "Track it before you forget it. Log habits from iPhone, Apple Watch, or widgets. " +
  `Free to start. Premium Yearly ${yearlyPrice}/year or ONIS Lifetime ${lifetimePrice} once.`;

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
  themeColor: "#F8EFE2",
};

// SoftwareApplication structured data — public offers only (never the
// founding fallback). Prices come from the central pricing config.
const appLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: site.name,
  operatingSystem: "iOS, watchOS",
  applicationCategory: "LifestyleApplication",
  url: site.url,
  description,
  offers: publicOffersForSchema(),
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
