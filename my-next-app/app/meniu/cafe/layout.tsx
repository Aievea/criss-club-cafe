import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meniu Criss Cafe — Pizza, Paste, Cocktailuri Tg Mureș",
  description:
    "Meniul complet Criss Cafe: pizza, paste, cocktailuri, cafea și bere în Târgu Mureș.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
