import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Criss Cafe Târgu Mureș — Cafenea & Lounge",
  description:
    "Cafenea și lounge pe Piața Trandafirilor. Mâncare, cafea, bere la halbă, cocktailuri în Târgu Mureș.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
