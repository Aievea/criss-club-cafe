import type { Metadata } from "next";
import { pageMetadata } from "@/src/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Meniu Criss Cafe — Pizza, Paste, Cocktailuri Tg Mureș",
  description:
    "Meniul complet Criss Cafe: pizza, paste, cocktailuri, cafea și bere în Târgu Mureș.",
  path: "/meniu/cafe",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
