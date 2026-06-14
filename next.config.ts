import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.0.*"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
  turbopack: {
    rules: {
      "*.mp3": { type: "asset" },
      "*.mp4": { type: "asset" },
      "*.webm": { type: "asset" },
      "*.pdf": { type: "asset" },
    },
  },
  async headers() {
    return [
      {
        // Pages (not hashed _next/static assets) — always revalidate so
        // visitors get the latest deploy instead of a stale cached page.
        source: "/((?!_next/static|_next/image).*)",
        headers: [
          { key: "Cache-Control", value: "no-cache, must-revalidate" },
        ],
      },
    ];
  },
};

export default nextConfig;
