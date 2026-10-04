import type { MetadataRoute } from "next";
import { destinations, siteUrl } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const paths = [
    "",
    "/about",
    "/destinations",
    "/contact",
    "/plan",
    ...destinations.map((place) => `/destinations/${place.slug}`),
  ];

  return paths.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency:
      path === "" || path === "/about" || path === "/destinations"
        ? "weekly"
        : "monthly",
    priority:
      path === "" ? 1 : path === "/about" || path === "/destinations" ? 0.8 : 0.6,
  }));
}
