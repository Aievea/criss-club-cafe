# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> **Read AGENTS.md first.** This project runs Next.js 16 / React 19 — APIs and conventions differ from training data. Check `node_modules/next/dist/docs/` before writing any Next.js-specific code.

---

## Commands

All commands run from the repo root:

```bash
npm run dev      # dev server at http://localhost:3000
npm run build    # production build
npm run lint     # ESLint (no test suite)
```

Requires `.env.local` with `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`. The Supabase client falls back to placeholder values so the build doesn't crash without them, but menu data and admin login won't work.

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
| `/criss-cafe`, `/criss-club` | Venue detail pages |
| `/servicii` | Services page |
| `/meniu` | Menu chooser → `/meniu/cafe` and `/meniu/club` (Supabase-driven menus) |
| `/admin` | Menu admin panel → `/admin/login`, `/admin/cafe`, `/admin/club` |

All pages are `"use client"`. Public pages consume `useLanguage()` for translations. Per-route `layout.tsx` files exist solely to export static `metadata` (client pages can't).

### Data layer (Supabase)

Menu content lives in Supabase tables `menu_categories` (self-referencing via `parent_id` for subcategories, one level deep) and `menu_items`, plus storage bucket `menu-photos` for category photos.

- `src/lib/supabase.ts` — shared client, types (`Venue`, `MenuCategory`, `MenuItem`, `CategoryWithItems`), and `getMenu(venue)` which fetches and assembles the category→subcategory→items tree, filtering to `available = true`.
- `src/lib/supabase-admin.ts` — CRUD for categories/items, `uploadCategoryPhoto`, and `getAdminMenu` (same tree but includes unavailable items). Uses the `@supabase/ssr` browser client so calls run under the logged-in session.

### Admin (`app/admin/`)

Single editor page `app/admin/[venue]/page.tsx` handles both venues. Auth is Supabase email/password; `middleware.ts` (matcher `/admin/:path*`) redirects unauthenticated users to `/admin/login` and logged-in users away from it. Ordering of categories/items is controlled by `sort_order` columns.

### i18n (`src/i18n/`)

Client-side only. Two locales: **`ro`** (default) and **`en`**.

- `dictionary.ts` — single source of truth for all UI strings. Brand names (`Criss Cafe`, `Criss Club`, `Cris Royal Delivery`) and DJ names are **never translated**. The DJ roster is the `DJS` constant here.
- `language-context.tsx` — `LanguageProvider` wraps the whole app in `layout.tsx`. Persists selection to `localStorage` under key `crd-lang`. Auto-detects English from `navigator.language`.
- Usage: `const { t, lang, toggle } = useLanguage()` — `t` is the typed `Dictionary` for the active locale.
- Menu content from Supabase is bilingual via paired columns (`name_ro`/`name_en`, `description_ro`/`description_en`), selected by `lang` — not via the dictionary.

### Shared layout (`app/layout.tsx`)

`LanguageProvider` and `<ConditionalFooter>` are rendered here. The footer hides itself on `/meniu/*`, `/servicii`, and `/admin/*` (see `src/components/ConditionalFooter.tsx`). Pages render `<SiteNav>` themselves (it reads `usePathname` for active state); admin has its own header in `app/admin/layout.tsx`.

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

Menu/admin pages use per-venue accents: gold `#c9a86a` for cafe, pink `#ff3da3` for club.

Font roles: `font-display` → Cinzel, `font-serif` → Cormorant Garamond, `font-body` → Jost.

Custom utility classes (`.crd-link`, `.crd-beat-trigger`, `.crd-sweep`) are defined in `globals.css` — use them instead of re-implementing hover/animation effects.

### Path aliases (`tsconfig.json`)

```
@/images/* → ./src/assets/images/*
@/*        → ./*
```
