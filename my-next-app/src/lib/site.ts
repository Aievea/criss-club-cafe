/**
 * Site-level constants for SEO (canonical URLs, sitemap, robots, Open Graph).
 *
 * The production domain is read from NEXT_PUBLIC_SITE_URL. Until the real domain
 * is registered, the fallback below is used so the build stays valid — but every
 * canonical/sitemap/OG URL will point at the fallback. When the domain is ready,
 * set NEXT_PUBLIC_SITE_URL in the environment (e.g. Vercel project settings) and
 * everything updates at once; no code change needed.
 *
 * NOTE: `crissclub.ro` is a PLACEHOLDER chosen to match the brand. Swap it the
 * moment the real domain is known.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://crissclub.ro"
).replace(/\/$/, "");

/** Brand name used in Open Graph `site_name` and schema. */
export const SITE_NAME = "Criss Cafe & Club";

/** Default social/OG locale. */
export const SITE_LOCALE = "ro_RO";

/**
 * Shared Open Graph / Twitter card image. Served by the `app/og` route handler
 * and referenced explicitly in every page's metadata (see seo.ts) so it applies
 * consistently — file-convention inheritance is skipped because a child setting
 * its own `openGraph` drops the inherited image.
 */
export const OG_IMAGE_PATH = "/og";
export const OG_IMAGE_SIZE = { width: 1200, height: 630 } as const;
export const OG_IMAGE_ALT =
  "Criss Cafe & Club — Piața Trandafirilor 43, Târgu Mureș";

/** Absolute URL helper — joins a route path onto SITE_URL. */
export function absoluteUrl(path: string): string {
  if (!path || path === "/") return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
