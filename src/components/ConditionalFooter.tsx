"use client";

import { usePathname } from "next/navigation";
import { Footer } from "./Footer";

export function ConditionalFooter() {
  const pathname = usePathname();
  if (pathname.startsWith("/meniu") || pathname === "/servicii" || pathname.startsWith("/admin")) return null;
  return <Footer variant={pathname === "/criss-club" ? "club" : undefined} />;
}
