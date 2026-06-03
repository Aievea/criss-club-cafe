"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/src/i18n/language-context";
import { LanguageToggle } from "@/src/components/footer/language-toggle";
import logo from "@/src/assets/images/logos/2cfd48d9-5856-4b6b-90cc-a9e14fc021d8_removalai_preview.png";

const LINKS = [
  { href: "/criss-cafe", key: "cafe" },
  { href: "/criss-club", key: "club" },
  { href: "/servicii", key: "services" },
] as const;

export function SiteNav() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="relative z-20 mx-auto flex w-full max-w-6xl items-center justify-between gap-x-6 px-6 py-5 sm:px-8 lg:px-10">
        <Link href="/" className="transition-opacity duration-300 hover:opacity-80">
          <Image
            src={logo}
            alt="Criss Club & Cafe"
            className="h-20 w-auto brightness-0 invert"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
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

        <div className="flex items-center gap-3">
          <div className="hidden lg:block">
            <LanguageToggle />
          </div>

          <button
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={isOpen}
            className="relative z-[60] flex h-9 w-9 flex-col items-center justify-center gap-[5px] lg:hidden"
          >
            <span
              className={`block h-px w-5 bg-crd-ink transition-all duration-300 ${
                isOpen ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-5 bg-crd-ink transition-all duration-300 ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-px w-5 bg-crd-ink transition-all duration-300 ${
                isOpen ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </header>

      <div
        {...(!isOpen ? { inert: true } : {})}
        className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-crd-bg/95 backdrop-blur-md transition-all duration-300 lg:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!isOpen}
      >
        <nav className="flex flex-col items-center gap-8">
          {LINKS.map((link, i) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                aria-current={active ? "page" : undefined}
                className={`font-display text-4xl tracking-tight transition-all duration-300 ${
                  isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                } ${active ? "text-crd-gold" : "text-crd-ink hover:text-crd-gold"}`}
                style={{ transitionDelay: isOpen ? `${i * 60}ms` : "0ms" }}
              >
                {t.nav[link.key]}
              </Link>
            );
          })}
        </nav>

        <div
          className={`absolute bottom-10 transition-all duration-300 ${
            isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
          style={{ transitionDelay: isOpen ? "200ms" : "0ms" }}
        >
          <LanguageToggle />
        </div>
      </div>
    </>
  );
}
