import { site } from "@/data/site";

/**
 * The origin this deployment is actually served from.
 *
 * Canonical URLs, the sitemap, robots.txt and social cards all need an
 * absolute origin, and hard-coding one means every preview deploy advertises
 * a domain it is not served from.
 *
 * Order of preference:
 *   1. NEXT_PUBLIC_SITE_URL — set this once the real domain is live.
 *   2. VERCEL_URL — the current deployment, so previews are self-consistent.
 *   3. site.url — the placeholder in the content file.
 *
 * Server-only: VERCEL_URL is not exposed to the browser bundle, so never call
 * this from a client component.
 */
export function siteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, "");

  const vercel = process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;

  return site.url;
}
