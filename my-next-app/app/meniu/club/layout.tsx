import type { Metadata } from "next";
import { pageMetadata } from "@/src/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Meniu Criss Club — Cocktailuri & Băuturi | Târgu Mureș",
  description:
    "Meniu băuturi și cocktailuri Criss Club, social club Târgu Mureș.",
  path: "/meniu/club",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
