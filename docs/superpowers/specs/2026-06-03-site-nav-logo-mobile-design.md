# Site Nav — Logo + Mobile Nav

**Date:** 2026-06-03

## Goal

Replace the text logo in `SiteNav` with the SVG brand logo and add a full-screen overlay mobile nav.

---

## Logo

- Remove `<Link>` text "Criss Club & Cafe"
- Replace with `<Image>` (Next.js) pointing to `/src/assets/images/logos/logocriscafeclub.svg`
- Height: `h-10` (~40px), width auto
- Wrapped in `<Link href="/">` with `hover:opacity-80` transition

---

## Desktop Nav (≥ lg)

No changes — existing layout stays:
- Logo left, nav links center, LanguageToggle right

---

## Mobile Nav (< lg)

### Trigger

- Nav links and LanguageToggle hidden on mobile (`hidden lg:flex`)
- Hamburger button visible only on mobile (`lg:hidden`), top-right of header
- Icon: 3 lines → X (animated via CSS transition)

### Overlay

- Full-screen fixed layer: `fixed inset-0 z-50 bg-crd-bg/95 backdrop-blur-md`
- Fade + slide-up entrance animation (`opacity-0 translate-y-4` → `opacity-100 translate-y-0`)
- Content: links centered vertically and horizontally, large font (`font-display text-4xl`)
- Same links as desktop: Criss Cafe, Criss Club, Servicii
- Gold hover color (`hover:text-crd-gold`)
- LanguageToggle at bottom of overlay
- Closes on: link click or X button click

### State

- `useState(false)` for `isOpen` in `SiteNav`
- `useEffect` locks body scroll when open (`overflow-hidden` on `<body>`)

---

## Files Changed

- `my-next-app/src/components/site/site-nav.tsx` — full rewrite of component
