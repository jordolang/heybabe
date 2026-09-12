import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const origin = siteUrl();
  return [
    { url: origin, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${origin}/book`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];
}
