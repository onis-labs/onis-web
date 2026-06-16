import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The homepage is now served at "/" by the Next app. Old links/bookmarks to
  // the former static "/index.html" should land on the homepage, not a 404.
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
