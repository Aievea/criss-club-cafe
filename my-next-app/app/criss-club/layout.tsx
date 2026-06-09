import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Criss Club Târgu Mureș — Social Club & Petreceri de Noapte",
  description:
    "Social club selectiv în Târgu Mureș. Majorate, petreceri private și evenimente de noapte pe Piața Trandafirilor.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
