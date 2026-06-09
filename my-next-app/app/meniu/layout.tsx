import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meniu — Criss Cafe & Club Târgu Mureș",
  description:
    "Meniul complet Criss Cafe și Criss Club din Târgu Mureș.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
