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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isOpen);
    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  useEffect(() => { setIsOpen(false); }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[60] flex items-center justify-between px-9 transition-all duration-300 pointer-events-none ${
          scrolled
            ? "py-3 bg-[#0a0a0a]/80 backdrop-blur-[14px] border-b border-white/[0.06]"
            : "py-5 bg-transparent"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="pointer-events-auto transition-opacity hover:opacity-80 flex-shrink-0">
          <Image
            src={logo}
            alt="Criss Club & Cafe"
            className={`w-auto brightness-0 invert transition-all duration-300 ${scrolled ? "h-10" : "h-12"}`}
            priority
            unoptimized
          />
        </Link>

        {/* Desktop links — absolutely centered */}
        <nav className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-7 pointer-events-auto">
          {LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`relative pb-1 text-[11px] tracking-[0.28em] uppercase font-medium transition-colors duration-200 after:absolute after:left-0 after:right-0 after:bottom-0 after:h-px after:bg-[#e6c787] after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 ${
                  active ? "text-[#e6c787] after:scale-x-100" : "text-white/80 hover:text-[#e6c787]"
                }`}
              >
                {t.nav[link.key]}
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-4 pointer-events-auto">
          <div className="hidden lg:block">
            <LanguageToggle />
          </div>

          <a
            href="tel:0746521799"
            className="hidden lg:inline-flex items-center rounded-full border border-white/30 px-4 py-2.5 text-[10.5px] tracking-[0.24em] uppercase text-white/80 transition-all duration-200 hover:bg-[#c9a86a] hover:text-[#1a1411] hover:border-[#c9a86a]"
          >
            {t.nav.reserve}
          </a>
        </div>
      </header>

      {/* Hamburger — fixed above overlay */}
      <button
        onClick={() => setIsOpen((p) => !p)}
        aria-label={isOpen ? t.nav.closeMenu : t.nav.openMenu}
        aria-expanded={isOpen}
        className="fixed top-4 right-9 z-[75] flex h-9 w-9 flex-col items-center justify-center gap-[5px] lg:hidden"
      >
        <span className={`block h-px w-5 bg-crd-ink transition-all duration-300 ${isOpen ? "translate-y-[6px] rotate-45" : ""}`} />
        <span className={`block h-px w-5 bg-crd-ink transition-all duration-300 ${isOpen ? "opacity-0" : ""}`} />
        <span className={`block h-px w-5 bg-crd-ink transition-all duration-300 ${isOpen ? "-translate-y-[6px] -rotate-45" : ""}`} />
      </button>

      {/* Mobile overlay */}
      <div
        {...(!isOpen ? { inert: true } : {})}
        className={`fixed inset-0 z-[70] flex flex-col items-center justify-center bg-crd-bg/95 backdrop-blur-md transition-all duration-300 lg:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        role="dialog"
        aria-label="Meniu navigație"
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
          className={`absolute bottom-10 transition-all duration-300 ${isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
          style={{ transitionDelay: isOpen ? "200ms" : "0ms" }}
        >
          <LanguageToggle />
        </div>
      </div>
    </>
  );
}
