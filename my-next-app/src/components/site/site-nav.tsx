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
      <header className="relative z-20 mx-auto flex w-full max-w-5xl items-center px-6 py-5 sm:px-8 lg:px-10">
        <Link href="/" className="transition-opacity duration-300 hover:opacity-80">
          <Image
            src={logo}
            alt="Criss Club & Cafe"
            className="h-14 w-auto brightness-0 invert"
            priority
          />
        </Link>

        <nav className="mx-auto hidden items-center gap-1 lg:flex">
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

      {/* Backdrop */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden
      />

      {/* Right drawer */}
      <div
        {...(!isOpen ? { inert: true } : {})}
        className={`fixed inset-y-0 right-0 z-50 flex w-72 flex-col border-l border-white/[0.07] bg-crd-bg transition-transform duration-[400ms] ease-[cubic-bezier(0.32,0.72,0,1)] lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!isOpen}
      >
        {/* Close button */}
        <div className="flex items-center justify-end px-5 py-5">
          <button
            onClick={() => setIsOpen(false)}
            aria-label={t.nav.closeMenu}
            className="flex h-9 w-9 flex-col items-center justify-center gap-[5px]"
          >
            <span className="block h-px w-5 translate-y-[6px] rotate-45 bg-crd-ink" />
            <span className="block h-px w-5 opacity-0 bg-crd-ink" />
            <span className="block h-px w-5 -translate-y-[6px] -rotate-45 bg-crd-ink" />
          </button>
        </div>

        {/* Links */}
        <nav className="flex flex-1 flex-col gap-1 px-4 pt-4">
          {LINKS.map((link, i) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                aria-current={active ? "page" : undefined}
                className={`rounded-xl px-4 py-3.5 font-display text-2xl tracking-tight transition-all duration-300 ${
                  isOpen ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
                } ${active ? "text-crd-gold bg-white/[0.04]" : "text-crd-ink hover:bg-white/[0.04] hover:text-white"}`}
                style={{ transitionDelay: isOpen ? `${80 + i * 50}ms` : "0ms" }}
              >
                {t.nav[link.key]}
              </Link>
            );
          })}
        </nav>

        {/* Language toggle */}
        <div
          className={`px-8 pb-10 transition-all duration-300 ${
            isOpen ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
          }`}
          style={{ transitionDelay: isOpen ? "240ms" : "0ms" }}
        >
          <LanguageToggle />
        </div>
      </div>
    </>
  );
}
