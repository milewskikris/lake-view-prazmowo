import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = getSiteUrl();
  const lastModified = new Date();
  return [
    { url, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${url}/polityka-prywatnosci`, lastModified, changeFrequency: "yearly", priority: 0.2 },
  ];
}
