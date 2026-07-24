import type { MetadataRoute } from "next";
import { site } from "./lib/config";

// Fixed date (not Date.now()) so the sitemap output is stable across builds.
const lastModified = "2026-07-24";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${site.url}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${site.url}/privacy`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${site.url}/terms`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${site.url}/support`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
