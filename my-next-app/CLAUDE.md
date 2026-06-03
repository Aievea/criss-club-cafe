# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> **Read AGENTS.md first.** This project runs Next.js 16 / React 19 — APIs and conventions differ from training data. Check `node_modules/next/dist/docs/` before writing any Next.js-specific code.

---

## Commands

All commands run from `my-next-app/`:

```bash
npm run dev      # dev server at http://localhost:3000
npm run build    # production build
npm run lint     # ESLint (no test suite)
```

---

## Project context

Website for **Criss Club & Cafe** — two venues at Piața Trandafirilor 43, Târgu Mureș, Romania, operated under parent brand **Cris Royal Delivery SRL**.

- **Criss Cafe** — lounge & pub, 80 seats + 40-seat terrace
- **Criss Club** — social club, 220+ capacity, open until 04:00
- **Servicii** — delivery, catering, cocktail bar, full-scale events

---

## Architecture

### Routes (`app/`)

| Path | Page |
|---|---|
| `/` | Home — two `VideoCard` links to each venue + services link |
| `/criss-cafe` | Cafe detail page |
| `/criss-club` | Club detail page |
| `/servicii` | Services page |

All pages are `"use client"` and consume `useLanguage()` for translations.

### i18n (`src/i18n/`)

Client-side only. Two locales: **`ro`** (default) and **`en`**.

- `dictionary.ts` — single source of truth for all UI strings. Brand names (`Criss Cafe`, `Criss Club`, `Cris Royal Delivery`) and DJ names are **never translated**.
- `language-context.tsx` — `LanguageProvider` wraps the whole app in `layout.tsx`. Persists selection to `localStorage` under key `crd-lang`. Auto-detects English from `navigator.language`.
- Usage: `const { t, lang, toggle } = useLanguage()` — `t` is the typed `Dictionary` for the active locale.

### Shared layout (`app/layout.tsx`)

`LanguageProvider` and `<Footer>` are rendered here, so they appear on every page. Pages render `<SiteNav>` themselves (it reads `usePathname` for active state).

### Contact & links (`src/lib/contact.ts`)

Single source of truth for phone number, WhatsApp URL, address, and Google Maps URL. **Always import from here** — never hardcode contact info in components.

### Brand system

Tailwind v4 with CSS custom properties defined in `globals.css`:

| Token | Value | Use |
|---|---|---|
| `crd-bg` | `#0a0a0a` | page background |
| `crd-ink` | `#f5f0e8` | primary text |
| `crd-muted` | `#8a8070` | secondary text |
| `crd-gold` | `#c8922a` | accent / brand |
| `crd-whatsapp` | `#25d366` | WhatsApp green |

Font roles: `font-display` → Cinzel, `font-serif` → Cormorant Garamond, `font-body` → Jost.

Custom utility classes (`.crd-link`, `.crd-beat-trigger`, `.crd-sweep`) are defined in `globals.css` — use them instead of re-implementing hover/animation effects.

### Path aliases (`tsconfig.json`)

```
@/images/* → ./src/assets/images/*
@/*        → ./*
```

### DJ roster

Defined in `dictionary.ts` as `DJS` constant — update there when residents change.
