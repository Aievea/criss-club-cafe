import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Servicii Cris Royal Delivery — Catering & Evenimente Tg Mureș",
  description:
    "Livrări, catering școli autorizat, cocktail bar și organizare evenimente complete în Târgu Mureș.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
