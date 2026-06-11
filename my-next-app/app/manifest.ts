import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/src/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — Târgu Mureș`,
    short_name: SITE_NAME,
    description:
      "Cafenea, lounge, pub și social club pe Piața Trandafirilor, Târgu Mureș.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    icons: [
      {
        src: "/favicon.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
