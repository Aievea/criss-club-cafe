# Site Nav — Logo + Mobile Nav Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the text logo in SiteNav with the SVG brand logo and add a full-screen overlay mobile nav.

**Architecture:** Single file change — `site-nav.tsx` is rewritten to add `useState`/`useEffect` for overlay state, a hamburger button visible only on mobile, and a fixed full-screen overlay that animates in. Desktop layout is unchanged.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS v4, TypeScript

---

## Files

| Action | Path |
|--------|------|
| Modify | `my-next-app/src/components/site/site-nav.tsx` |
| Asset (already exists) | `my-next-app/public/logocriscafeclub.svg` |

---

### Task 1: Rewrite `site-nav.tsx`

**Files:**
- Modify: `my-next-app/src/components/site/site-nav.tsx`

- [ ] **Step 1: Replace the full file content**

Open `my-next-app/src/components/site/site-nav.tsx` and replace everything with:

```tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/src/i18n/language-context";
import { LanguageToggle } from "@/src/components/footer/language-toggle";

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
            src="/logocriscafeclub.svg"
            alt="Criss Club & Cafe"
            width={120}
            height={40}
            className="h-10 w-auto"
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
            aria-label={isOpen ? "Închide meniul" : "Deschide meniul"}
            aria-expanded={isOpen}
            className="relative flex h-9 w-9 flex-col items-center justify-center gap-[5px] lg:hidden"
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
        className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-crd-bg/95 backdrop-blur-md transition-all duration-300 lg:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!isOpen}
      >
        <button
          onClick={() => setIsOpen(false)}
          aria-label="Închide meniul"
          className="absolute right-6 top-5 flex h-9 w-9 flex-col items-center justify-center gap-[5px] sm:right-8"
        >
          <span className="block h-px w-5 translate-y-[6px] rotate-45 bg-crd-ink" />
          <span className="block h-px w-5 opacity-0 bg-crd-ink" />
          <span className="block h-px w-5 -translate-y-[6px] -rotate-45 bg-crd-ink" />
        </button>

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
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd my-next-app && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Run dev server and verify visually**

```bash
cd my-next-app && npm run dev
```

Check at `http://localhost:3000`:
- Logo SVG visible in nav (not text)
- Desktop (≥ 1024px): nav links + LanguageToggle visible, no hamburger
- Mobile (< 1024px): hamburger visible, nav links hidden
- Tap hamburger → full-screen overlay opens with fade + stagger
- Links animate in with stagger delay
- Tap a link → overlay closes, navigates
- Tap X → overlay closes
- Body scroll locked while overlay is open

- [ ] **Step 4: Commit**

```bash
cd my-next-app && git add src/components/site/site-nav.tsx
git commit -m "feat: replace text logo with SVG and add full-screen mobile nav"
```
