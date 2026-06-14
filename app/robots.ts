import type { MetadataRoute } from "next";
import { absoluteUrl, SITE_URL } from "@/src/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Admin panel is auth-gated; keep it out of the index entirely.
      disallow: ["/admin", "/admin/"],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: SITE_URL,
  };
}
