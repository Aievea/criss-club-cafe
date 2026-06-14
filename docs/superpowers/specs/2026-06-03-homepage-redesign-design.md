# Homepage Redesign — Criss Café & Club

**Date:** 2026-06-03  
**Status:** Approved

## Overview

Rebuild the homepage (`/`) as a full editorial landing page modelled after the reference HTML (`src/assets/ref/Criss Cafe & Club.html`). The current homepage (nav + two video cards) is replaced with a long scrollable page containing five sections. All existing sub-pages (`/criss-cafe`, `/criss-club`, `/servicii`) remain untouched. The footer is not modified.

## Architecture

**Approach:** Componentized (Approach A)  
Each section is an independent component. The homepage `app/page.tsx` composes them in order.

### New files

| File | Purpose |
|---|---|
| `src/components/site/homepage-hero.tsx` | Full-screen video hero |
| `src/components/site/marquee-strip.tsx` | Scrolling text strip below hero |
| `src/components/site/menu-showcase.tsx` | Editorial 3-chapter menu |
| `src/components/site/club-lineup.tsx` | Dark DJ grid section |
| `src/components/site/visit-section.tsx` | Address info + SVG map |
| `src/components/site/whatsapp-fab.tsx` | Sticky WhatsApp button |

### Modified files

| File | Change |
|---|---|
| `src/components/site/site-nav.tsx` | Fixed position, scroll-aware glass, reference style |
| `app/page.tsx` | Rebuilt to compose all new sections |
| `app/layout.tsx` | Add `WhatsAppFab` globally |
| `app/globals.css` | Add `--crd-gold-accent: #c9a86a` token |

## Section Specs

### 1. SiteNav (updated)

- `fixed top-0 left-0 right-0 z-[60]`
- Default: fully transparent background
- On scroll (>50px): `bg-[#0a0a0a]/80 backdrop-blur-[14px]` + bottom border `border-white/[0.06]`, padding shrinks
- **Desktop layout:** logo left (h-12, shrinks to h-10 on scroll) · nav links centered (`Cafenea /criss-cafe`, `Club /criss-club`, `Servicii /servicii`) · `Rezervare` pill button right → `tel:0746521799`
- **Link style:** `text-[11px] tracking-[0.28em] uppercase text-white/80`, gold underline on hover (scaleX 0→1 from left)
- **Rezervare button:** `border border-white/30 rounded-full px-4 py-2 text-[10.5px] tracking-[0.24em] uppercase`, hover: `bg-[#c9a86a] text-[#1a1411] border-[#c9a86a]`
- **Mobile:** hamburger button unchanged, full-screen overlay unchanged. Only desktop links/button are new.

### 2. HomepageHero

- `min-h-screen min-h-[100svh]` relative container, `isolation: isolate`
- **Background:** `<video>` absolute fill, `object-fit: cover`, filter `saturate(0.85) brightness(0.55) contrast(1.05)` — use `video-crissclub` MP4
- **Vignette:** absolute overlay with `radial-gradient` (center transparent → dark edges) + `linear-gradient` (top dark → mid clear → bottom dark)
- **Content (centered):**
  1. Kicker: `"Piața Trandafirilor 43 · Tg Mureș"` — `text-[11px] tracking-[0.42em] uppercase text-[#e6c787]`, flanked by 36px gold lines
  2. Logo: `<Image>` of `logocriscafeclub.svg`, `w-[min(560px,78vw)]`, `drop-shadow`
  3. Tagline: `"Lounge · Pub · Social Club"` — Cormorant italic, `clamp(18px,2.2vw,26px)`
  4. CTAs: gold-fill button `"Descoperă meniul →"` + ghost button `"Rezervare · 0746 521 799"`
- **Scroll cue:** absolute bottom-7, animated pulsing vertical line + `"scroll"` text

### 3. MarqueeStrip

- `border-y border-white/[0.08] py-6 overflow-hidden`
- Infinite horizontal scroll animation (38s linear), `width: max-content`
- Items: `Tg Mureș ● Lounge ● Piața Trandafirilor 43 ● Pub ● Social Club ● Criss ● Cocktails ● Espresso ● Live Music ● Manele All Night`
- Text: Cormorant italic 28px, dots gold 14px
- `aria-hidden="true"`

### 4. MenuShowcase

- Background `#f1e9d6` (paper/cream), `color: #1a1411` (ink)
- **Header:** kicker `"Meniul casei"` (gold `#c9a86a`), display heading Cormorant `"Mic dejun. Prânz. Noapte."`, lead italic text
- **3 chapters**, alternating image/text grid (`grid-cols-[1.05fr_1fr]`, even chapters flip order):
  - **Cap. I — Cafea & mic dejun** · image from `images-crisscafee` (first available) · stamp `"01 · Dimineața"` · items: Espresso, Cappuccino, Flat White, Ice Coffee (from `MENU_TABS` coffee data)
  - **Cap. II — Din cuptor** · second cafe image · stamp `"02 · Prânz"` · placeholder items: Pizza casei 38 lei, Margherita 32 lei, Paste napoletane 29 lei, Capricciosa 36 lei
  - **Cap. III — Bar & cocktails** · third cafe image · stamp `"03 · Seara"` · items from `MENU_TABS` cocktails data (first 4 items)
- Each item: name (Cormorant 22px, `#1a1411`) + desc italic (Cormorant 13px, ink-soft) + price (14px, `#c9a86a`, bold) — separated by dashed border
- **Footer:** centered note text + button `"Meniu complet →"` → `/criss-cafe`
- **Responsive:** single column on mobile, image aspect changes from 4/5 to 16/10

### 5. ClubLineup

- Background `#050402`
- Radial gradients: pink `rgba(255,61,163,0.18)` top-left + teal `rgba(28,177,194,0.14)` bottom-right
- **Header:** kicker `"Criss Club Night"` (`#ff3da3`), Cormorant display heading `"Cea mai bună noapte din Tg Mureș"`, lead text (teal accent on phone number `0746 521 799`)
- **Events rail:**
  - Title `"Line-up"` (Cormorant italic 28px) left + `"Rezervări →"` link (pink) right, separated by border
  - Grid: `grid-cols-4` desktop → `grid-cols-2` tablet/mobile, `gap-[22px]`
  - **9 DJ cards** from `src/assets/images/images-crissclub/djs/` — all 9 images used
  - Each card: `aspect-ratio: 4/5`, `overflow-hidden`, `border-radius: 4px`, image with hover scale
  - Overlay (bottom gradient): date placeholder (`"05 iunie · 22:00"`), title placeholder (`"Club Night"`), DJ placeholder (`"DJ Criss Club"`) — using pink for date, cream for title, muted for name
  - Placeholder data editable in component's `EVENTS` array constant

### 6. VisitSection

- Background `#0a0a0a`
- **Two-column grid** `grid-cols-2` desktop → single col mobile, `gap-[80px]`
- **Left — Info:**
  - Kicker `"Vizitează-ne"` (gold)
  - Cormorant display `"Te așteptăm la masă"`
  - 2×2 info grid: Adresa / Telefon / Cafenea ore / Club ore
  - Each cell: label (gold, `text-[11px] tracking-[0.32em] uppercase`, gold border-bottom) + value (Cormorant 19px, cream)
  - 2 CTAs: `"Sună pentru rezervare →"` (gold fill) + `"Deschide harta"` (ghost → `https://maps.google.com/?q=Piata+Trandafirilor+43+Targu+Mures` target `_blank`)
- **Right — SVG Map:**
  - `aspect-ratio: 4/5` container, `border border-white/[0.08] rounded-[4px] overflow-hidden`
  - SVG 400×500 with: dark gradient fill, subtle grid pattern, stylized gold streets (Piața Trandafirilor area), teal ellipse for plaza, street labels
  - Pulsing gold pin (`#e6c787`) at center with `@keyframes pinPulse` box-shadow animation
  - Cream tooltip `"Criss Café & Club"` above pin with diamond tail

### 7. WhatsAppFab (global)

- Added to `app/layout.tsx` (renders on all pages above footer)
- `fixed bottom-6 right-6 z-[80]`
- Green `#25d366` pill, padding `14px`, `border-radius: 999px`
- Icon: WhatsApp SVG 28×28px
- Pulsing ring: `::before` pseudo with `@keyframes waPulse` scale + opacity animation
- Hover: `translateY(-2px)`, padding-right expands, label `"WHATSAPP"` slides in with `max-width` transition (0 → 280px)
- `href="https://wa.me/40746521799"` (Romanian format)
- Mobile: slightly smaller (12px padding, 24px icon)
- Implemented as client component with hover state in React

## Tokens & Fonts

- Add to `globals.css`: `--crd-gold-accent: #c9a86a` + `--crd-paper: #f1e9d6` + `--crd-ink-dark: #1a1411` + `--crd-pink: #ff3da3` + `--crd-teal: #1cb1c2`
- Add to `@theme inline`: map these as `--color-crd-gold-accent`, etc.
- Fonts already loaded: Cormorant Garamond (`font-serif`), Cinzel (`font-display`), Jost (`font-body`)
- Add `Pinyon_Script` to `layout.tsx` for script/calligraphy elements (variable `--font-script`)

## Responsive Breakpoints

- `< 560px` (mobile): single column everywhere, hero padding reduced, marquee text smaller
- `560px–960px` (tablet): menu chapters single column, DJ grid 2-col, visit single col
- `> 960px` (desktop): full reference layout

## Animations

All scroll-reveal animations use `IntersectionObserver` — elements start `opacity-0 translate-y-7`, transition to `opacity-100 translate-y-0` when entering viewport. No JS animation libraries needed — pure CSS transitions triggered by adding `.in` class via observer.
