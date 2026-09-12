import type { MetadataRoute } from "next";
import { isLiveDomain, siteUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  // Keep preview and *.vercel.app builds out of the index until the real
  // domain is configured — they still carry placeholder pricing.
  if (!isLiveDomain()) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl()}/sitemap.xml`,
  };
}
