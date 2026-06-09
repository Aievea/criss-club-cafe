import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meniu Criss Club — Cocktailuri & Băuturi | Târgu Mureș",
  description:
    "Meniu băuturi și cocktailuri Criss Club, social club Târgu Mureș.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
