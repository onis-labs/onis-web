import type { NextConfig } from "next";

// Defense-in-depth response headers. This is a fully static marketing site
// (no auth, cookies, forms, or user data), so these harden against
// clickjacking, MIME-sniffing, referrer leakage, and unused browser features.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
];

// Shipped Report-Only first: the page relies on Next's inline hydration script
// and framer-motion inline styles ('unsafe-inline'), and full in-browser
// verification wasn't possible in this environment. After confirming the
// preview deploy logs no violations, rename the header below to the enforcing
// "Content-Security-Policy". Every resource this site loads is same-origin.
const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "media-src 'self'",
  "connect-src 'self'",
  "manifest-src 'self'",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  // Don't advertise the framework/version in the X-Powered-By header.
  poweredByHeader: false,

  // The homepage is served at "/" by the Next app, and the legal/support pages
  // have moved from static "*.html" files into the App Router. Old links and
  // bookmarks should 301 to the clean paths, not 404.
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/privacy.html", destination: "/privacy", permanent: true },
      { source: "/terms.html", destination: "/terms", permanent: true },
      { source: "/support.html", destination: "/support", permanent: true },
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          ...securityHeaders,
          {
            key: "Content-Security-Policy-Report-Only",
            value: contentSecurityPolicy,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
