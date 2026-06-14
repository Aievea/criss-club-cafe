import type { Metadata } from "next";
import { pageMetadata } from "@/src/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Servicii Cris Royal Delivery — Catering & Evenimente Tg Mureș",
  description:
    "Livrări, catering școli autorizat, cocktail bar și organizare evenimente complete în Târgu Mureș.",
  path: "/servicii",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
