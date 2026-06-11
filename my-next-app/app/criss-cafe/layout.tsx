import type { Metadata } from "next";
import { JsonLd } from "@/src/components/JsonLd";
import { cafeSchema } from "@/src/lib/schema";
import { pageMetadata } from "@/src/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Criss Cafe Târgu Mureș — Cafenea & Lounge",
  description:
    "Cafenea și lounge pe Piața Trandafirilor. Mâncare, cafea, bere la halbă, cocktailuri în Târgu Mureș.",
  path: "/criss-cafe",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={cafeSchema()} />
      {children}
    </>
  );
}
