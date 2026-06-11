import type { Metadata } from "next";
import { JsonLd } from "@/src/components/JsonLd";
import { clubSchema } from "@/src/lib/schema";
import { pageMetadata } from "@/src/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Criss Club Târgu Mureș — Social Club & Petreceri de Noapte",
  description:
    "Social club selectiv în Târgu Mureș. Majorate, petreceri private și evenimente de noapte pe Piața Trandafirilor.",
  path: "/criss-club",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={clubSchema()} />
      {children}
    </>
  );
}
