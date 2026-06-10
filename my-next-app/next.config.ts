import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.0.*"],
  turbopack: {
    rules: {
      "*.mp3": { type: "asset" },
      "*.mp4": { type: "asset" },
      "*.webm": { type: "asset" },
      "*.pdf": { type: "asset" },
    },
  },
};

export default nextConfig;
