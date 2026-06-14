# Design: Criss Club Story Section + SEO per Route + Favicon

**Date:** 2026-06-09

---

## Scope

Three independent additions to the existing Next.js site:

1. **Criss Club story section** — a text/copy section on `/criss-club` mirroring the existing SEO story section on `/criss-cafe`
2. **Per-route SEO metadata** — unique `title` + `description` per route, in Romanian, with local Tg Mureș keywords
3. **Favicon** — `herologo.png` served as site icon

---

## 1. Criss Club Story Section

### Placement
After the first `<Divider />` (post info-row), before the "Selective notice" block. This mirrors the Cafe layout exactly.

### Tone
Exclusiv & misterios (Hormozi-influenced: FOMO, selective identity, specificity over hype).

### Copy (bilingual, in `dictionary.ts`)

**RO:**
- Eyebrow: `"Povestea noastră"`
- Headline: `"Nu e pentru toată lumea."` / em: `"Și asta e tocmai ideea."`
- Para 1: `"Criss Club e un social club selectiv — un spațiu pentru cei care știu ce caută. Muzică bună, atmosferă autentică, petreceri care rămân în amintire. 220+ persoane, un singur vibe."`
- Para 2: `"În inima Târgu Mureșului, pe Piața Trandafirilor. Majorate, zile de naștere, petreceri și evenimente private de noapte — cu paza noastră, cu siguranța noastră."`

**EN:**
- Eyebrow: `"Our story"`
- Headline: `"Not for everyone."` / em: `"And that's exactly the point."`
- Para 1: `"Criss Club is a selective social club — a space for those who know what they're looking for. Good music, real atmosphere, parties worth remembering. 220+ people, one vibe."`
- Para 2: `"In the heart of Târgu Mureș, on Piața Trandafirilor. Birthdays, private parties and night events — our venue, our security, your night."`

### CTAs below copy
- Primary: `ReservationTrigger` — gradient button (existing club style)
- Secondary: `AddressLink` — ghost button

### Visual style
Matches Cafe's story section: `max-w-3xl`, centered, `font-serif italic` paragraphs, gold accent on eyebrow replaced with purple (`#a855f7`), em in `#ff3da3`.

---

## 2. Per-Route SEO Metadata

Pages are `"use client"` so metadata cannot be exported from the page file directly. Solution: add a `layout.tsx` per route segment that exports `metadata`. Root layout keeps its existing fonts/providers.

### Metadata per route

| Route | `layout.tsx` location | Title | Description |
|---|---|---|---|
| `/` | `app/layout.tsx` (update existing) | `Criss Cafe & Club Târgu Mureș — Cafenea, Lounge & Social Club` | `Cafenea, lounge, pub și social club în inima Târgu Mureșului, pe Piața Trandafirilor.` |
| `/criss-cafe` | `app/criss-cafe/layout.tsx` (new) | `Criss Cafe Târgu Mureș — Cafenea & Lounge` | `Cafenea și lounge pe Piața Trandafirilor. Mâncare, cafea, bere la halbă, cocktailuri.` |
| `/criss-club` | `app/criss-club/layout.tsx` (new) | `Criss Club Târgu Mureș — Social Club & Petreceri de Noapte` | `Social club selectiv în Târgu Mureș. Majorate, petreceri private și evenimente de noapte pe Piața Trandafirilor.` |
| `/meniu` | `app/meniu/layout.tsx` (new) | `Meniu — Criss Cafe & Club Târgu Mureș` | `Meniul complet Criss Cafe și Criss Club din Târgu Mureș.` |
| `/meniu/cafe` | `app/meniu/cafe/layout.tsx` (new) | `Meniu Criss Cafe — Pizza, Paste, Cocktailuri Tg Mureș` | `Meniul complet Criss Cafe: pizza, paste, cocktailuri, cafea și bere în Târgu Mureș.` |
| `/meniu/club` | `app/meniu/club/layout.tsx` (new) | `Meniu Criss Club Târgu Mureș` | `Meniu băuturi și cocktailuri Criss Club, social club Târgu Mureș.` |
| `/servicii` | `app/servicii/layout.tsx` (new) | `Servicii Cris Royal Delivery — Catering & Evenimente Tg Mureș` | `Livrări, catering școli autorizat, cocktail bar și organizare evenimente complete în Târgu Mureș.` |

Each `layout.tsx` is a minimal server component — just `export const metadata` + `export default function Layout({ children }) { return <>{children}</> }`.

---

## 3. Favicon

- Copy `src/assets/images/logos/herologo.png` → `public/favicon.png`
- Update root `app/layout.tsx` metadata to add `icons: { icon: '/favicon.png' }`

---

## Files Changed

| File | Action |
|---|---|
| `app/layout.tsx` | Update metadata (title, description, icons) |
| `app/criss-club/page.tsx` | Add story section between first Divider and selective notice |
| `src/i18n/dictionary.ts` | Add `club.storyEyebrow`, `club.storyHeadline`, `club.storyEm`, `club.storyP1`, `club.storyP2` keys |
| `app/criss-cafe/layout.tsx` | New — metadata only |
| `app/criss-club/layout.tsx` | New — metadata only |
| `app/meniu/layout.tsx` | New — metadata only |
| `app/meniu/cafe/layout.tsx` | New — metadata only |
| `app/meniu/club/layout.tsx` | New — metadata only |
| `app/servicii/layout.tsx` | New — metadata only |
| `public/favicon.png` | New — copied from herologo.png |

---

## Out of Scope

- No hreflang (no separate URL per language)
- No sitemap.xml (separate task if needed)
- No Open Graph images
