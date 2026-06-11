import type { Metadata } from "next";
import { pageMetadata } from "@/src/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Meniu — Criss Cafe & Club Târgu Mureș",
  description: "Meniul complet Criss Cafe și Criss Club din Târgu Mureș.",
  path: "/meniu",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
