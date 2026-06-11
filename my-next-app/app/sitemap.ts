import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/src/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes: Array<{
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }> = [
    { path: "/", changeFrequency: "monthly", priority: 1 },
    { path: "/criss-cafe", changeFrequency: "monthly", priority: 0.9 },
    { path: "/criss-club", changeFrequency: "monthly", priority: 0.9 },
    { path: "/servicii", changeFrequency: "monthly", priority: 0.7 },
    { path: "/meniu", changeFrequency: "weekly", priority: 0.8 },
    { path: "/meniu/cafe", changeFrequency: "weekly", priority: 0.8 },
    { path: "/meniu/club", changeFrequency: "weekly", priority: 0.8 },
  ];

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency,
    priority,
  }));
}
