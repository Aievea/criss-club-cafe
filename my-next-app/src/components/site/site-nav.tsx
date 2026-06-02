"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/src/i18n/language-context";
import { LanguageToggle } from "@/src/components/footer/language-toggle";

const LINKS = [
  { href: "/criss-cafe", key: "cafe" },
  { href: "/criss-club", key: "club" },
  { href: "/servicii", key: "services" },
] as const;

/** In-flow top navigation, wraps gracefully on small screens. */
export function SiteNav() {
  const { t } = useLanguage();
  const pathname = usePathname();

  return (
    <header className="relative z-20 mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-6 py-5 sm:px-8 lg:px-10">
      <Link
        href="/"
        className="font-display text-lg tracking-tight text-crd-ink transition-opacity duration-300 hover:opacity-80"
      >
        Criss Club <span className="text-crd-gold">&amp; Cafe</span>
      </Link>

      <nav className="order-3 flex items-center gap-1 sm:order-2">
        {LINKS.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={`rounded-full px-3 py-1.5 text-sm transition-colors duration-300 ${
                active ? "text-crd-gold" : "text-crd-muted hover:text-crd-ink"
              }`}
            >
              {t.nav[link.key]}
            </Link>
          );
        })}
      </nav>

      <div className="order-2 sm:order-3">
        <LanguageToggle />
      </div>
    </header>
  );
}
