import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.mp4": { type: "asset" },
      "*.webm": { type: "asset" },
      "*.pdf": { type: "asset" },
    },
  },
};

export default nextConfig;
