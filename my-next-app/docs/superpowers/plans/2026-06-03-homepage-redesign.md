# Homepage Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the homepage (`/`) as a full editorial landing page matching the reference design — hero, marquee, menu editorial, DJ lineup, visit/map, WhatsApp FAB.

**Architecture:** Componentized — each section is an independent file; `app/page.tsx` composes them. `SiteNav` becomes fixed + scroll-aware. `WhatsAppFab` is global in `layout.tsx`. Sub-pages untouched except `PageHero` gets extra top padding to compensate for the now-fixed nav.

**Tech Stack:** Next.js App Router, Tailwind CSS v4, Cormorant Garamond + Jost + Cinzel + Pinyon Script (Google Fonts), next/image, next/font/google.

---

## File Map

| Action | Path |
|---|---|
| Modify | `app/globals.css` |
| Modify | `app/layout.tsx` |
| Modify | `src/components/site/site-nav.tsx` |
| Modify | `src/components/site/page-hero.tsx` |
| Modify | `app/page.tsx` |
| Create | `src/components/site/whatsapp-fab.tsx` |
| Create | `src/components/site/homepage-hero.tsx` |
| Create | `src/components/site/marquee-strip.tsx` |
| Create | `src/components/site/menu-showcase.tsx` |
| Create | `src/components/site/club-lineup.tsx` |
| Create | `src/components/site/visit-section.tsx` |

---

### Task 1: CSS tokens + animation keyframes

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Add brand tokens to `:root`**

In `app/globals.css`, inside `:root { }`, after the existing `--crd-whatsapp` line, add:

```css
  /* Extended brand palette */
  --crd-gold-accent: #c9a86a;
  --crd-gold-2: #e6c787;
  --crd-paper: #f1e9d6;
  --crd-paper-2: #e6dcc3;
  --crd-ink-dark: #1a1411;
  --crd-ink-soft: #4a3e32;
  --crd-pink: #ff3da3;
  --crd-teal: #1cb1c2;
  --crd-bg-2: #14100c;
  --crd-bg-3: #1d1813;
```

- [ ] **Step 2: Map new tokens into `@theme inline`**

Inside `@theme inline { }`, after the existing `--color-crd-whatsapp` line, add:

```css
  --color-crd-gold-accent: var(--crd-gold-accent);
  --color-crd-gold-2: var(--crd-gold-2);
  --color-crd-paper: var(--crd-paper);
  --color-crd-ink-dark: var(--crd-ink-dark);
  --color-crd-ink-soft: var(--crd-ink-soft);
  --color-crd-pink: var(--crd-pink);
  --color-crd-teal: var(--crd-teal);
  --color-crd-bg-2: var(--crd-bg-2);
  --color-crd-bg-3: var(--crd-bg-3);
  --font-script: var(--font-pinyon-script);
```

- [ ] **Step 3: Add animation keyframes**

At the end of `app/globals.css`, before the closing `@media (prefers-reduced-motion)` block (add before it), insert:

```css
/* ============= Homepage animations ============= */
@keyframes marqueeScroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

@keyframes scrollLine {
  0%, 100% { transform: scaleY(0.3); opacity: 0.4; }
  50%       { transform: scaleY(1);   opacity: 1; }
}

@keyframes pinPulse {
  0%, 100% { box-shadow: 0 0 0 4px rgba(201,168,106,.25), 0 0 0 12px rgba(201,168,106,.12); }
  50%      { box-shadow: 0 0 0 6px rgba(201,168,106,.35), 0 0 0 20px rgba(201,168,106,0); }
}

@keyframes waPulse {
  0%   { transform: scale(0.95); opacity: 0.7; }
  100% { transform: scale(1.5);  opacity: 0; }
}

@keyframes nightPulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(255,61,163,.4); }
  50%      { box-shadow: 0 0 0 8px rgba(255,61,163,0); }
}
```

Also extend the `@media (prefers-reduced-motion)` block to silence homepage animations:

```css
@media (prefers-reduced-motion: reduce) {
  .crd-beat,
  .crd-sweep {
    animation: none !important;
  }
  .crd-sweep {
    opacity: 0 !important;
  }
  .crd-link {
    transition: color 120ms ease-out;
  }
  /* silence homepage animations */
  [class*="animate-[marquee"],
  [class*="animate-[scroll"],
  [class*="animate-[pin"],
  [class*="animate-[wa"],
  [class*="animate-[night"] {
    animation: none !important;
  }
}
```

- [ ] **Step 4: Commit**

```bash
git add app/globals.css
git commit -m "feat: add extended brand tokens and homepage animation keyframes"
```

---

### Task 2: Add Pinyon Script font to layout.tsx

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Import Pinyon Script**

In `app/layout.tsx`, update the font import line to include `Pinyon_Script`:

```typescript
import { Geist, Geist_Mono, Cinzel, Cormorant_Garamond, Jost, Pinyon_Script } from "next/font/google";
```

- [ ] **Step 2: Instantiate the font**

After the `jost` constant, add:

```typescript
const pinyonScript = Pinyon_Script({
  variable: "--font-pinyon-script",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});
```

- [ ] **Step 3: Wire font variable into html className**

Update the `<html>` tag's `className` to include `${pinyonScript.variable}`:

```tsx
<html
  lang="ro"
  className={`${geistSans.variable} ${geistMono.variable} ${cinzel.variable} ${cormorant.variable} ${jost.variable} ${pinyonScript.variable} h-full antialiased`}
>
```

- [ ] **Step 4: Visual check**

Run `npm run dev` in `my-next-app/`. Open browser. No errors in console.

- [ ] **Step 5: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: add Pinyon Script font variable for script decorative elements"
```

---

### Task 3: WhatsAppFab component + global placement

**Files:**
- Create: `src/components/site/whatsapp-fab.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Create the component**

Create `src/components/site/whatsapp-fab.tsx`:

```tsx
export function WhatsAppFab() {
  return (
    <a
      href="https://wa.me/40746521799"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactează-ne pe WhatsApp"
      className="group fixed bottom-6 right-6 z-[80] inline-flex items-center rounded-full bg-[#25d366] px-3.5 py-3.5 text-white shadow-[0_10px_30px_-6px_rgba(0,0,0,0.45),0_0_0_6px_rgba(37,211,102,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:pr-[22px] hover:shadow-[0_18px_40px_-6px_rgba(37,211,102,0.5),0_0_0_6px_rgba(37,211,102,0.24)] sm:bottom-6 sm:right-6"
      style={{ position: "fixed" }}
    >
      {/* Pulsing ring */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-[-6px] animate-[waPulse_2.4s_ease-out_infinite] rounded-full border-2 border-[#25d366]/40"
      />

      {/* Icon */}
      <span className="relative z-10 flex h-[30px] w-[30px] shrink-0 items-center justify-center sm:h-[30px] sm:w-[30px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-7 w-7"
          aria-hidden
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.845L.057 23.25a.75.75 0 0 0 .916.942l5.556-1.458A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.88 0-3.638-.5-5.157-1.373l-.369-.214-3.828 1.004 1.023-3.728-.233-.38A9.955 9.955 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
        </svg>
      </span>

      {/* Expanding label */}
      <span className="relative z-10 max-w-0 overflow-hidden whitespace-nowrap text-[11px] font-bold tracking-[0.28em] uppercase opacity-0 transition-all duration-[450ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:ml-3.5 group-hover:max-w-[280px] group-hover:opacity-100">
        WhatsApp
      </span>
    </a>
  );
}
```

- [ ] **Step 2: Add to layout.tsx**

In `app/layout.tsx`, import the component:

```typescript
import { WhatsAppFab } from "@/src/components/site/whatsapp-fab";
```

Inside the `<body>` JSX, add `<WhatsAppFab />` after `<Footer />`:

```tsx
<body className="min-h-full flex flex-col">
  <LanguageProvider>
    <div className="flex flex-1 flex-col">{children}</div>
    <Footer />
    <WhatsAppFab />
  </LanguageProvider>
</body>
```

- [ ] **Step 3: Visual check**

Run `npm run dev`. Visit `http://localhost:3000`. Confirm green WhatsApp button appears bottom-right with pulsing ring. Hover over it — label "WHATSAPP" slides in from the right.

- [ ] **Step 4: Commit**

```bash
git add src/components/site/whatsapp-fab.tsx app/layout.tsx
git commit -m "feat: add global WhatsApp FAB with expand-on-hover animation"
```

---

### Task 4: Redesign SiteNav (fixed, scroll-aware) + fix PageHero padding

**Files:**
- Modify: `src/components/site/site-nav.tsx`
- Modify: `src/components/site/page-hero.tsx`

- [ ] **Step 1: Rewrite site-nav.tsx**

Replace the entire content of `src/components/site/site-nav.tsx` with:

```tsx
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
          />
        </Link>

        {/* Desktop links */}
        <nav className="hidden lg:flex items-center gap-7 pointer-events-auto">
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
            Rezervare
          </a>

          {/* Hamburger */}
          <button
            onClick={() => setIsOpen((p) => !p)}
            aria-label={isOpen ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={isOpen}
            className="relative z-[60] flex h-9 w-9 flex-col items-center justify-center gap-[5px] lg:hidden"
          >
            <span className={`block h-px w-5 bg-crd-ink transition-all duration-300 ${isOpen ? "translate-y-[6px] rotate-45" : ""}`} />
            <span className={`block h-px w-5 bg-crd-ink transition-all duration-300 ${isOpen ? "opacity-0" : ""}`} />
            <span className={`block h-px w-5 bg-crd-ink transition-all duration-300 ${isOpen ? "-translate-y-[6px] -rotate-45" : ""}`} />
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
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
          className={`absolute bottom-10 transition-all duration-300 ${isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
          style={{ transitionDelay: isOpen ? "200ms" : "0ms" }}
        >
          <LanguageToggle />
        </div>
      </div>
    </>
  );
}
```

- [ ] **Step 2: Fix PageHero top padding**

In `src/components/site/page-hero.tsx`, update the `<section>` inside to `pt-28` so content clears the fixed nav:

```tsx
<section className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-6 pb-14 pt-28 text-center sm:px-8">
```

- [ ] **Step 3: Visual check**

Run `npm run dev`. On homepage: nav is transparent at top, glass effect at scroll. On `/criss-cafe`: content doesn't overlap behind nav. On mobile: hamburger opens full-screen overlay. Desktop "Rezervare" pill appears top-right.

- [ ] **Step 4: Commit**

```bash
git add src/components/site/site-nav.tsx src/components/site/page-hero.tsx
git commit -m "feat: redesign SiteNav as fixed scroll-aware glass bar with Rezervare CTA"
```

---

### Task 5: HomepageHero component

**Files:**
- Create: `src/components/site/homepage-hero.tsx`

- [ ] **Step 1: Create the component**

Create `src/components/site/homepage-hero.tsx`:

```tsx
import Image from "next/image";
import Link from "next/link";
import logo from "@/src/assets/images/logos/logocriscafeclub.svg";
// @ts-expect-error — Next.js resolves video static imports via next.config
import clubVideo from "@/src/assets/video/video-crissclub/WhatsApp Video 2026-06-02 at 17.35.15.mp4";

export function HomepageHero() {
  return (
    <section className="relative isolate flex min-h-screen min-h-[100svh] items-center justify-center overflow-hidden">
      {/* Video background */}
      <video
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        style={{ filter: "saturate(0.85) brightness(0.55) contrast(1.05)" }}
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={clubVideo} type="video/mp4" />
      </video>

      {/* Vignette */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `
            radial-gradient(120% 80% at 50% 40%, transparent 0%, rgba(10,8,6,0.6) 70%, rgba(10,8,6,0.95) 100%),
            linear-gradient(180deg, rgba(10,8,6,0.55) 0%, rgba(10,8,6,0.1) 40%, rgba(10,8,6,0.85) 100%)
          `,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex max-w-[980px] flex-col items-center gap-7 px-6 pb-20 pt-[120px] text-center">
        {/* Kicker */}
        <div className="flex items-center gap-3.5 text-[11px] tracking-[0.42em] uppercase text-[#e6c787]">
          <span className="h-px w-9 bg-[#e6c787] opacity-55" aria-hidden />
          Piața Trandafirilor 43 · Tg Mureș
          <span className="h-px w-9 bg-[#e6c787] opacity-55" aria-hidden />
        </div>

        {/* Logo */}
        <Image
          src={logo}
          alt="Criss Café & Club"
          className="w-[min(560px,78vw)] brightness-0 invert drop-shadow-[0_6px_40px_rgba(0,0,0,0.7)]"
          priority
        />

        {/* Tagline */}
        <p className="font-serif italic tracking-[0.05em] text-[#ece1c8]" style={{ fontSize: "clamp(18px,2.2vw,26px)" }}>
          Lounge{" "}
          <span className="mx-2 font-normal not-italic text-[#e6c787] opacity-80">·</span>
          Pub{" "}
          <span className="mx-2 font-normal not-italic text-[#e6c787] opacity-80">·</span>
          Social Club
        </p>

        {/* CTAs */}
        <div className="mt-1.5 flex flex-wrap justify-center gap-3.5">
          <Link
            href="#meniu"
            className="inline-flex items-center gap-3 rounded-full border border-[#e6c787] bg-[#e6c787] px-6 py-3.5 text-[11.5px] font-semibold tracking-[0.28em] uppercase text-[#1a1411] transition-all duration-200 hover:-translate-y-px hover:shadow-[0_14px_40px_-10px_rgba(230,199,135,0.4)]"
          >
            Descoperă meniul <span className="inline-block transition-transform duration-200">→</span>
          </Link>
          <a
            href="tel:0746521799"
            className="inline-flex items-center gap-3 rounded-full border border-white/35 bg-transparent px-6 py-3.5 text-[11.5px] font-medium tracking-[0.28em] uppercase text-[#ece1c8] transition-all duration-200 hover:border-white hover:bg-white/[0.06]"
          >
            Rezervare · 0746 521 799
          </a>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-[10px] tracking-[0.4em] uppercase text-white/55">
        <span>scroll</span>
        <div
          className="h-14 w-px origin-top bg-gradient-to-b from-transparent to-[#e6c787] animate-[scrollLine_2.4s_ease-in-out_infinite]"
          aria-hidden
        />
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Visual check**

Add `<HomepageHero />` temporarily to `app/page.tsx` (replacing existing content) and run `npm run dev`. Confirm: video plays in background, logo centered, kicker + tagline + CTAs visible, scroll cue pulses at bottom, nav overlays correctly.

- [ ] **Step 3: Commit**

```bash
git add src/components/site/homepage-hero.tsx
git commit -m "feat: add full-screen video HomepageHero with kicker, logo, CTAs and scroll cue"
```

---

### Task 6: MarqueeStrip component

**Files:**
- Create: `src/components/site/marquee-strip.tsx`

- [ ] **Step 1: Create the component**

Create `src/components/site/marquee-strip.tsx`:

```tsx
const ITEMS = [
  { text: "Tg Mureș", italic: false },
  { text: "Lounge", italic: true },
  { text: "Piața Trandafirilor 43", italic: false },
  { text: "Pub", italic: true },
  { text: "Social Club", italic: false },
  { text: "Criss", italic: false, script: true },
  { text: "Cocktails", italic: true },
  { text: "Espresso", italic: false },
  { text: "Live Music", italic: true },
  { text: "Manele All Night", italic: false },
];

function Dot() {
  return (
    <span className="self-center text-sm text-[#e6c787]" aria-hidden>
      ●
    </span>
  );
}

export function MarqueeStrip() {
  const all = [...ITEMS, ...ITEMS];

  return (
    <div
      className="overflow-hidden border-y border-white/[0.08] bg-crd-bg py-6"
      aria-hidden="true"
    >
      <div className="flex w-max animate-[marqueeScroll_38s_linear_infinite] gap-12">
        {all.map((item, i) => (
          <div key={i} className="flex items-center gap-12">
            <span
              className={`font-serif text-[28px] text-[#ece1c8] ${item.italic ? "italic" : ""} ${
                item.script ? "font-script text-[36px] text-[#e6c787]" : ""
              }`}
            >
              {item.text}
            </span>
            <Dot />
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Visual check**

Add `<MarqueeStrip />` below `<HomepageHero />` in `app/page.tsx`. Confirm: text scrolls infinitely left with no visible seam, dots gold, italic items in Cormorant.

- [ ] **Step 3: Commit**

```bash
git add src/components/site/marquee-strip.tsx
git commit -m "feat: add infinite horizontal MarqueeStrip between hero and menu"
```

---

### Task 7: MenuShowcase component

**Files:**
- Create: `src/components/site/menu-showcase.tsx`

- [ ] **Step 1: Create the component**

Create `src/components/site/menu-showcase.tsx`:

```tsx
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import img1 from "@/src/assets/images/images-crisscafee/WhatsApp Image 2026-06-01 at 21.25.25.jpeg";
import img2 from "@/src/assets/images/images-crisscafee/WhatsApp Image 2026-06-01 at 21.28.55.jpeg";
import img3 from "@/src/assets/images/images-crisscafee/WhatsApp Image 2026-06-01 at 21.28.56.jpeg";

type Item = { name: string; desc: string; price: string };
type Chapter = {
  num: string;
  stamp: string;
  title: string;
  titleEm: string;
  tag: string;
  items: Item[];
  img: StaticImageData;
};

const CHAPTERS: Chapter[] = [
  {
    num: "— Capitolul I —",
    stamp: "01 · Dimineața",
    title: "Cafea",
    titleEm: "& mic dejun",
    tag: "Servit zilnic 07:00 — 12:00",
    img: img1,
    items: [
      { name: "Espresso · Ristretto", desc: "boabe proaspăt prăjite, 30ml / 15ml", price: "11 lei" },
      { name: "Cappuccino", desc: "espresso, lapte spumat, 180ml", price: "15 lei" },
      { name: "Flat White", desc: "espresso dublu, lapte catifelat, 180ml", price: "18 lei" },
      { name: "Ice Coffee", desc: "espresso, cremă de lapte, frișcă, 180ml", price: "15 lei" },
    ],
  },
  {
    num: "— Capitolul II —",
    stamp: "02 · Prânz",
    title: "Din",
    titleEm: "cuptor",
    tag: "Pizza, paste & ceva în plus",
    img: img2,
    items: [
      { name: "Pizza casei", desc: "sos roșu, mozzarella, prosciutto, bacon, busuioc", price: "38 lei" },
      { name: "Margherita", desc: "sos San Marzano, mozzarella di bufala, busuioc", price: "32 lei" },
      { name: "Capricciosa", desc: "șuncă, ciuperci, ardei, măsline, mozzarella", price: "36 lei" },
      { name: "Paste napoletane", desc: "sos roșu copt încet, busuioc, parmezan", price: "29 lei" },
    ],
  },
  {
    num: "— Capitolul III —",
    stamp: "03 · Seara",
    title: "Bar",
    titleEm: "& cocktails",
    tag: "Open bar 17:00 — late",
    img: img3,
    items: [
      { name: "Strawberry Crush", desc: "frișcă, sos de căpșuni, lapte de fermă", price: "22 lei" },
      { name: "Aperol Spritz", desc: "Aperol, Prosecco, soda, portocală", price: "28 lei" },
      { name: "Bumbu Rum Old Fashioned", desc: "Bumbu Original, sirop demerara, bitter portocale", price: "42 lei" },
      { name: "Luc Belaire · sticlă", desc: "sparkling rosé, gheață, două pahare", price: "la cerere" },
    ],
  },
];

export function MenuShowcase() {
  return (
    <section id="meniu" className="relative overflow-hidden bg-crd-paper py-36 text-crd-ink-dark">
      {/* Section head */}
      <div className="mx-auto mb-20 max-w-[1100px] px-9 text-center">
        <div className="mb-6 inline-flex items-center gap-3.5 text-[11px] tracking-[0.42em] uppercase text-crd-gold-accent">
          <span className="h-px w-9 bg-crd-gold-accent opacity-55" aria-hidden />
          Meniul casei
          <span className="h-px w-9 bg-crd-gold-accent opacity-55" aria-hidden />
        </div>
        <h2
          className="font-serif font-light leading-[0.95] tracking-[-0.01em] text-crd-ink-dark"
          style={{ fontSize: "clamp(48px,7vw,88px)" }}
        >
          Mic <em className="italic text-crd-gold-accent">dejun.</em>
          <br />
          Prânz. <em className="italic text-crd-gold-accent">Noapte.</em>
        </h2>
        <p className="mx-auto mt-7 max-w-[640px] font-serif italic leading-[1.4] text-crd-ink-soft" style={{ fontSize: "clamp(18px,1.6vw,22px)" }}>
          Trei momente ale zilei, trei capitole. Tot ce trebuie să știi e că nimic nu pleacă din bucătărie până nu arată exact așa cum vrem noi.
        </p>
      </div>

      {/* Chapters */}
      <div className="mx-auto flex max-w-[1280px] flex-col gap-24 px-9">
        {CHAPTERS.map((ch, idx) => {
          const even = idx % 2 === 1;
          return (
            <div
              key={ch.num}
              className={`grid items-center gap-20 lg:grid-cols-2 ${even ? "" : ""}`}
            >
              {/* Image */}
              <div className={`relative aspect-[4/5] overflow-hidden rounded-sm ${even ? "lg:order-2" : ""}`}>
                <Image
                  src={ch.img}
                  alt={ch.title}
                  fill
                  className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(26,20,17,0.5)]" />
                <div className="absolute left-6 top-6 bg-crd-paper px-4 py-2.5 text-[10px] font-semibold tracking-[0.32em] uppercase text-crd-ink-dark">
                  {ch.stamp}
                </div>
              </div>

              {/* Body */}
              <div className={`py-6 ${even ? "lg:order-1" : ""}`}>
                <p className="mb-3.5 font-serif italic text-[15px] text-crd-gold-accent">{ch.num}</p>
                <h3
                  className="font-serif font-normal leading-[1] text-crd-ink-dark"
                  style={{ fontSize: "clamp(44px,5vw,64px)" }}
                >
                  {ch.title}{" "}
                  <span className="font-script text-crd-gold-accent" style={{ fontSize: "1.05em" }}>
                    {ch.titleEm}
                  </span>
                </h3>
                <span className="mt-2 inline-block border-b border-crd-gold-accent pb-1.5 text-[11px] tracking-[0.32em] uppercase text-crd-ink-soft">
                  {ch.tag}
                </span>
                <ul className="mt-3.5 grid gap-[18px]">
                  {ch.items.map((item, i) => (
                    <li
                      key={i}
                      className="grid grid-cols-[1fr_auto] items-baseline gap-[18px] border-b border-dashed border-crd-ink-soft/20 pb-4"
                    >
                      <div>
                        <div className="font-serif text-[22px] font-medium text-crd-ink-dark">{item.name}</div>
                        <div className="mt-1 font-serif italic text-[13px] text-crd-ink-soft">{item.desc}</div>
                      </div>
                      <div className="whitespace-nowrap text-[14px] font-semibold tracking-[0.08em] text-crd-gold-accent">{item.price}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mx-auto mt-20 max-w-[1280px] px-9 text-center">
        <p className="inline-block font-serif italic text-[16px] text-crd-ink-soft before:mx-3 before:text-crd-gold-accent before:content-['·'] after:mx-3 after:text-crd-gold-accent after:content-['·']">
          Meniul complet disponibil la masă · alergeni la cerere
        </p>
        <div className="mt-10">
          <Link
            href="/criss-cafe"
            className="inline-flex items-center gap-3 rounded-full border border-crd-ink-dark/30 px-7 py-4 text-[11px] tracking-[0.28em] uppercase text-crd-ink-dark transition-all duration-200 hover:border-crd-gold-accent hover:bg-crd-gold-accent hover:text-crd-ink-dark hover:-translate-y-px"
          >
            Meniu complet <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Visual check**

Add `<MenuShowcase />` to `app/page.tsx` below the marquee. Confirm: cream background, 3 alternating image/text chapters, items with prices, "Meniu complet" button links to `/criss-cafe`.

- [ ] **Step 3: Commit**

```bash
git add src/components/site/menu-showcase.tsx
git commit -m "feat: add editorial 3-chapter MenuShowcase section with alternating image/text layout"
```

---

### Task 8: ClubLineup component

**Files:**
- Create: `src/components/site/club-lineup.tsx`

- [ ] **Step 1: Create the component**

Create `src/components/site/club-lineup.tsx`:

```tsx
import Image, { StaticImageData } from "next/image";
import dj1 from "@/src/assets/images/images-crissclub/djs/WhatsApp Image 2026-06-01 at 21.29.01 (1).jpeg";
import dj2 from "@/src/assets/images/images-crissclub/djs/WhatsApp Image 2026-06-02 at 17.36.51.jpeg";
import dj3 from "@/src/assets/images/images-crissclub/djs/WhatsApp Image 2026-06-02 at 17.36.51 (1).jpeg";
import dj4 from "@/src/assets/images/images-crissclub/djs/WhatsApp Image 2026-06-02 at 17.36.51 (2).jpeg";
import dj5 from "@/src/assets/images/images-crissclub/djs/WhatsApp Image 2026-06-02 at 17.36.52.jpeg";
import dj6 from "@/src/assets/images/images-crissclub/djs/WhatsApp Image 2026-06-02 at 17.36.52 (1).jpeg";
import dj7 from "@/src/assets/images/images-crissclub/djs/WhatsApp Image 2026-06-02 at 17.36.52 (2).jpeg";
import dj8 from "@/src/assets/images/images-crissclub/djs/WhatsApp Image 2026-06-02 at 17.36.52 (3).jpeg";
import dj9 from "@/src/assets/images/images-crissclub/djs/WhatsApp Image 2026-06-02 at 17.38.10.jpeg";

type Event = { date: string; title: string; who: string; img: StaticImageData };

const EVENTS: Event[] = [
  { date: "05 iunie · 22:00", title: "Manele All Night Long",       who: "DJ Criss Club",        img: dj1 },
  { date: "06 iunie · 22:00", title: "Everybody's Night",           who: "DJ Criss Club",        img: dj2 },
  { date: "07 iunie · 22:00", title: "Charisma Night",              who: "DJ Criss Club",        img: dj3 },
  { date: "12 iunie · 22:00", title: "Live Music · Special Guests", who: "Special Guests",       img: dj4 },
  { date: "13 iunie · 22:00", title: "Latino Night",                who: "DJ Criss Club",        img: dj5 },
  { date: "19 iunie · 22:00", title: "Retro Night",                 who: "DJ Criss Club",        img: dj6 },
  { date: "20 iunie · 22:00", title: "Anniversary Night · Live",    who: "Criss Club",           img: dj7 },
  { date: "26 iunie · 22:00", title: "Summer Night",                who: "DJ Criss Club",        img: dj8 },
  { date: "27 iunie · 22:00", title: "Special Event",               who: "DJ Criss Club",        img: dj9 },
];

export function ClubLineup() {
  return (
    <section
      id="noapte"
      className="relative overflow-hidden py-40 text-crd-ink"
      style={{ background: "#050402" }}
    >
      {/* Background gradients */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(50% 40% at 20% 20%, rgba(255,61,163,0.18) 0%, transparent 70%),
            radial-gradient(40% 40% at 90% 80%, rgba(28,177,194,0.14) 0%, transparent 70%)
          `,
        }}
      />

      {/* Section head */}
      <div className="relative z-10 mx-auto mb-20 max-w-[1100px] px-9 text-center">
        <div className="mb-6 inline-flex items-center gap-3.5 text-[11px] tracking-[0.42em] uppercase text-crd-pink">
          <span className="h-px w-9 bg-crd-pink opacity-55" aria-hidden />
          Criss Club Night
          <span className="h-px w-9 bg-crd-pink opacity-55" aria-hidden />
        </div>
        <h2
          className="font-serif font-light leading-[0.95] tracking-[-0.01em] text-crd-ink"
          style={{ fontSize: "clamp(48px,7vw,96px)" }}
        >
          Cea mai bună{" "}
          <em className="italic text-crd-teal">noapte</em>
          <br />
          din{" "}
          <span className="font-script text-crd-pink" style={{ fontSize: "1.15em" }}>
            Tg Mureș.
          </span>
        </h2>
        <p className="mx-auto mt-7 max-w-[640px] font-serif italic leading-[1.4] text-[rgba(236,225,200,0.65)]" style={{ fontSize: "clamp(18px,1.6vw,22px)" }}>
          Joi, vineri, sâmbătă — line-up de DJ, live music, manele all night. Intrarea liberă cu rezervare. RSVP la{" "}
          <strong className="font-semibold not-italic text-crd-pink">0746 521 799</strong>.
        </p>
      </div>

      {/* Events rail */}
      <div className="relative z-10 mx-auto max-w-[1280px] px-9">
        <div className="mb-9 flex items-baseline justify-between border-b border-white/10 pb-[18px]">
          <h4 className="font-serif font-normal italic text-[28px] tracking-[-0.01em] text-crd-ink">Line-up</h4>
          <a
            href="tel:0746521799"
            className="text-[11px] tracking-[0.32em] uppercase text-crd-pink transition-opacity hover:opacity-70"
          >
            Rezervări →
          </a>
        </div>

        <div className="grid grid-cols-2 gap-[22px] md:grid-cols-4">
          {EVENTS.map((ev, i) => (
            <a
              key={i}
              href="tel:0746521799"
              className="group relative aspect-[4/5] cursor-pointer overflow-hidden rounded-[4px] bg-crd-bg-2"
            >
              <Image
                src={ev.img}
                alt={ev.title}
                fill
                className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.05]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent px-5 pb-5 pt-[22px]">
                <div className="mb-1 text-[10px] tracking-[0.32em] uppercase text-crd-pink">{ev.date}</div>
                <div className="font-serif italic text-[20px] leading-[1.15] tracking-[-0.005em] text-crd-ink">{ev.title}</div>
                <div className="mt-1 text-[11px] tracking-[0.18em] uppercase text-[rgba(236,225,200,0.7)]">{ev.who}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Visual check**

Add `<ClubLineup />` to `app/page.tsx` below `<MenuShowcase />`. Confirm: dark background with pink/teal ambient glow, 9 DJ cards in 4-col grid (2-col mobile), overlay text visible, hover scales image.

- [ ] **Step 3: Commit**

```bash
git add src/components/site/club-lineup.tsx
git commit -m "feat: add ClubLineup section with 9 DJ event cards and pink/teal ambient gradient"
```

---

### Task 9: VisitSection component

**Files:**
- Create: `src/components/site/visit-section.tsx`

- [ ] **Step 1: Create the component**

Create `src/components/site/visit-section.tsx`:

```tsx
export function VisitSection() {
  return (
    <section id="vizita" className="relative bg-crd-bg py-40 text-crd-ink">
      <div className="mx-auto grid max-w-[1280px] items-start gap-20 px-9 lg:grid-cols-2">

        {/* Left — Info */}
        <div>
          <div className="mb-3 flex items-center gap-3 text-[11px] tracking-[0.42em] uppercase text-crd-gold-2">
            <span className="h-px w-9 bg-crd-gold-2 opacity-55" aria-hidden />
            Vizitează-ne
          </div>
          <h2
            className="font-serif font-light leading-[0.95] tracking-[-0.01em] text-crd-ink"
            style={{ fontSize: "clamp(48px,6vw,84px)" }}
          >
            Te <em className="italic text-crd-gold-2">așteptăm</em>
            <br />
            la{" "}
            <span className="font-script text-crd-gold-2" style={{ fontSize: "1.15em" }}>
              masă.
            </span>
          </h2>

          <div className="mt-12 grid grid-cols-2 gap-x-12 gap-y-9">
            {[
              {
                lab: "Adresa",
                val: "Piața Trandafirilor, Nr. 43\nTg Mureș, jud. Mureș",
              },
              {
                lab: "Telefon",
                val: "0746 521 799",
                sub: "Rezervări · Evenimente",
              },
              {
                lab: "Café · Lounge",
                val: "Luni → Joi\n07:00 — 23:00",
                sub: "Vineri & Sâmbătă — non-stop",
              },
              {
                lab: "Criss Club Night",
                val: "Joi · Vineri · Sâmbătă\n22:00 — late",
              },
            ].map((cell) => (
              <div key={cell.lab}>
                <div className="mb-3.5 border-b border-[rgba(201,168,106,0.3)] pb-2.5 text-[11px] tracking-[0.32em] uppercase text-crd-gold-2">
                  {cell.lab}
                </div>
                <div className="font-serif text-[19px] leading-[1.5] text-crd-ink whitespace-pre-line">
                  {cell.val}
                </div>
                {cell.sub && (
                  <div className="mt-1 text-[12px] tracking-[0.04em] text-crd-ink/50 font-body">
                    {cell.sub}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-14 flex flex-wrap gap-3.5">
            <a
              href="tel:0746521799"
              className="inline-flex items-center gap-3 rounded-full border border-crd-gold-2 bg-crd-gold-2 px-7 py-4 text-[11px] font-semibold tracking-[0.28em] uppercase text-[#1a1411] transition-all duration-200 hover:-translate-y-px hover:shadow-[0_14px_40px_-10px_rgba(230,199,135,0.4)]"
            >
              Sună pentru rezervare <span>→</span>
            </a>
            <a
              href="https://maps.google.com/?q=Piata+Trandafirilor+43+Targu+Mures"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full border border-white/35 bg-transparent px-7 py-4 text-[11px] font-medium tracking-[0.28em] uppercase text-crd-ink transition-all duration-200 hover:border-white hover:bg-white/[0.06]"
            >
              Deschide harta
            </a>
          </div>
        </div>

        {/* Right — Decorative SVG map */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-[4px] border border-white/[0.08] bg-crd-bg-3">
          <svg
            viewBox="0 0 400 500"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
            className="h-full w-full"
          >
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(236,225,200,0.06)" strokeWidth="0.5" />
              </pattern>
              <linearGradient id="mapGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1d1813" />
                <stop offset="100%" stopColor="#0f0c09" />
              </linearGradient>
            </defs>
            <rect width="400" height="500" fill="url(#mapGrad)" />
            <rect width="400" height="500" fill="url(#grid)" />
            {/* Stylized streets */}
            <path d="M 0 180 Q 120 160 200 200 T 400 220" stroke="rgba(201,168,106,0.25)" strokeWidth="1.5" fill="none" />
            <path d="M 200 0 Q 220 120 200 250 T 240 500" stroke="rgba(201,168,106,0.25)" strokeWidth="1.5" fill="none" />
            <path d="M 0 340 L 400 320" stroke="rgba(201,168,106,0.15)" strokeWidth="1" fill="none" />
            <path d="M 60 0 L 80 500" stroke="rgba(201,168,106,0.15)" strokeWidth="1" fill="none" />
            <path d="M 320 0 L 300 500" stroke="rgba(201,168,106,0.15)" strokeWidth="1" fill="none" />
            {/* Plaza */}
            <ellipse cx="200" cy="250" rx="80" ry="50" fill="rgba(28,177,194,0.06)" stroke="rgba(28,177,194,0.2)" strokeWidth="0.8" />
            <text x="200" y="200" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontStyle="italic" fontSize="11" fill="rgba(236,225,200,0.4)">Piața Trandafirilor</text>
            <text x="30" y="170" fontFamily="Jost, sans-serif" fontSize="9" letterSpacing="2" fill="rgba(236,225,200,0.3)">STR. ENESCU</text>
            <text x="240" y="50" fontFamily="Jost, sans-serif" fontSize="9" letterSpacing="2" fill="rgba(236,225,200,0.3)">BD. 1 DEC.</text>
            <text x="250" y="340" fontFamily="Jost, sans-serif" fontSize="9" letterSpacing="2" fill="rgba(236,225,200,0.3)">STR. BOLYAI</text>
          </svg>

          {/* Pin label */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full font-serif italic text-[16px] whitespace-nowrap bg-[#f1e9d6] text-[#1a1411] px-[18px] py-3 shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
            style={{ marginTop: "-18px" }}
          >
            Criss Café & Club
            <span
              aria-hidden
              className="absolute bottom-[-6px] left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-[#f1e9d6]"
            />
          </div>

          {/* Pulsing pin */}
          <div
            className="absolute left-1/2 top-1/2 h-[18px] w-[18px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e6c787] animate-[pinPulse_2.4s_ease-in-out_infinite]"
          />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Visual check**

Add `<VisitSection />` to `app/page.tsx` below `<ClubLineup />`. Confirm: two-column layout, info grid with address/hours, gold pin pulses on decorative SVG map, both CTAs present.

- [ ] **Step 3: Commit**

```bash
git add src/components/site/visit-section.tsx
git commit -m "feat: add VisitSection with info grid and decorative SVG map with pulsing pin"
```

---

### Task 10: Rebuild app/page.tsx

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace page.tsx**

Replace the entire content of `app/page.tsx` with:

```tsx
import { SiteNav } from "@/src/components/site/site-nav";
import { HomepageHero } from "@/src/components/site/homepage-hero";
import { MarqueeStrip } from "@/src/components/site/marquee-strip";
import { MenuShowcase } from "@/src/components/site/menu-showcase";
import { ClubLineup } from "@/src/components/site/club-lineup";
import { VisitSection } from "@/src/components/site/visit-section";

export default function Home() {
  return (
    <main className="overflow-hidden bg-crd-bg font-body text-crd-ink">
      <SiteNav />
      <HomepageHero />
      <MarqueeStrip />
      <MenuShowcase />
      <ClubLineup />
      <VisitSection />
    </main>
  );
}
```

- [ ] **Step 2: Full visual walkthrough**

Run `npm run dev`. Check the following in order:
1. `http://localhost:3000` — video hero loads, logo centered, nav transparent
2. Scroll down — nav becomes glass, scroll cue animates
3. Marquee strip visible and scrolling
4. Menu section with cream background, 3 chapters alternating
5. "Meniu complet →" button → navigates to `/criss-cafe`
6. Club lineup: dark section with pink glow, 9 DJ cards in grid
7. Visit section: address info + SVG map with pulsing pin
8. WhatsApp FAB: bottom-right, hover expands
9. Visit `/criss-cafe` — nav doesn't overlap content (pt-28 on PageHero)
10. Mobile (DevTools 375px): single column everywhere, mobile overlay menu works

- [ ] **Step 3: Fix any TypeScript or import errors**

Run `npm run build` in `my-next-app/`. Fix any errors that appear. Common issues:
- SVG imports may need `{ src }` unwrapping: `import logoSrc from "..."; ... src={logoSrc.src}` — if Next.js Image complains about SVG, switch to `<img>` tag
- MP4 imports: if TS error, check `src/types/assets.d.ts` has `declare module "*.mp4"`

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "feat: rebuild homepage as full editorial landing page (hero, marquee, menu, lineup, visit)"
```

---

## Self-Review

**Spec coverage check:**
- ✅ SiteNav: fixed, scroll-aware glass, reference style, mobile overlay kept — Task 4
- ✅ HomepageHero: video bg, vignette, kicker, logo, tagline, CTAs, scroll cue — Task 5
- ✅ MarqueeStrip: infinite scroll, Cormorant + dots — Task 6
- ✅ MenuShowcase: 3 chapters alternating, items+prices, "Meniu complet" button — Task 7
- ✅ ClubLineup: dark bg, pink/teal gradients, 9 DJ photos, event overlay — Task 8
- ✅ VisitSection: info grid, SVG map, pulsing pin — Task 9
- ✅ WhatsAppFab: global, fixed, pulsing ring, hover expand — Task 3
- ✅ CSS tokens: `crd-gold-accent`, `crd-paper`, `crd-pink`, `crd-teal`, etc. — Task 1
- ✅ Pinyon Script font: Task 2
- ✅ PageHero padding fix for sub-pages: Task 4
- ✅ Footer untouched: not in any task
- ✅ Sub-pages untouched: only PageHero padding updated (necessary side-effect of fixed nav)

**Type consistency:**
- `Chapter` type defined and used only in `menu-showcase.tsx`
- `Event` type defined and used only in `club-lineup.tsx`
- All image imports typed as `StaticImageData`
- No cross-component type dependencies

**No placeholders:** All code blocks are complete. Placeholder event data is clearly labeled with real-looking dates that users can update in the `EVENTS` array constant.
