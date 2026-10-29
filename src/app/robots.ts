import type { MetadataRoute } from "next";
import { getSiteUrl, isIndexable } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const url = getSiteUrl();
  if (!isIndexable()) {
    // Wdrożenia podglądowe Vercel nie są indeksowane.
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${url}/sitemap.xml`,
    host: url,
  };
}
