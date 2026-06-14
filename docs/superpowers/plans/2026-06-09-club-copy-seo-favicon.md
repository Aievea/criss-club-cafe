# Club Copy, SEO per Route & Favicon — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a story/text section on Criss Club page, set unique SEO metadata per route, and add the herologo as favicon.

**Architecture:** Pages are `"use client"` — metadata must live in server-component `layout.tsx` files added per route segment. Dictionary keys for the new Club copy go in `src/i18n/dictionary.ts`. Favicon served from `public/favicon.png` referenced via Next.js metadata API.

**Tech Stack:** Next.js App Router, TypeScript, Tailwind CSS, next/font

---

## File Map

| File | Action |
|---|---|
| `public/favicon.png` | New — copy of `src/assets/images/logos/herologo.png` |
| `app/layout.tsx` | Modify — update metadata title/description + add icons |
| `src/i18n/dictionary.ts` | Modify — add `club.story*` keys to both `ro` and `en` |
| `app/criss-club/page.tsx` | Modify — add story section after first `<Divider />` |
| `app/criss-cafe/layout.tsx` | New — metadata only |
| `app/criss-club/layout.tsx` | New — metadata only |
| `app/meniu/layout.tsx` | New — metadata only |
| `app/meniu/cafe/layout.tsx` | New — metadata only |
| `app/meniu/club/layout.tsx` | New — metadata only |
| `app/servicii/layout.tsx` | New — metadata only |

---

## Task 1: Favicon

**Files:**
- Create: `public/favicon.png` (binary copy)
- Modify: `app/layout.tsx`

- [ ] **Step 1: Copy herologo.png to public/**

Run in PowerShell from `my-next-app/`:
```powershell
Copy-Item "src\assets\images\logos\herologo.png" -Destination "public\favicon.png"
```

- [ ] **Step 2: Update root layout metadata to include icons**

In `app/layout.tsx`, replace the existing `export const metadata` block:

```typescript
export const metadata: Metadata = {
  title: "Criss Cafe & Club Târgu Mureș — Cafenea, Lounge & Social Club",
  description:
    "Cafenea, lounge, pub și social club în inima Târgu Mureșului, pe Piața Trandafirilor.",
  icons: { icon: "/favicon.png" },
};
```

- [ ] **Step 3: Verify favicon appears in browser**

Run `npm run dev`, open `http://localhost:3000` — browser tab should show the hero logo icon.

- [ ] **Step 4: Commit**

```bash
git add public/favicon.png app/layout.tsx
git commit -m "feat: add herologo favicon and update root metadata"
```

---

## Task 2: Add Club story copy keys to dictionary

**Files:**
- Modify: `src/i18n/dictionary.ts`

- [ ] **Step 1: Add keys to `ro.club` object**

In `src/i18n/dictionary.ts`, inside the `ro: { club: { ... } }` object, add after `homeCta: "Acasă",`:

```typescript
storyEyebrow: "Povestea noastră",
storyHeadline: "Nu e pentru toată lumea.",
storyEm: "Și asta e tocmai ideea.",
storyP1: "Criss Club e un social club selectiv — un spațiu pentru cei care știu ce caută. Muzică bună, atmosferă autentică, petreceri care rămân în amintire. 220+ persoane, un singur vibe.",
storyP2: "În inima Târgu Mureșului, pe Piața Trandafirilor. Majorate, zile de naștere, petreceri și evenimente private de noapte — cu paza noastră, cu siguranța noastră.",
```

- [ ] **Step 2: Add keys to `en.club` object**

In `src/i18n/dictionary.ts`, inside the `en: { club: { ... } }` object, add after `homeCta: "Home",`:

```typescript
storyEyebrow: "Our story",
storyHeadline: "Not for everyone.",
storyEm: "And that's exactly the point.",
storyP1: "Criss Club is a selective social club — a space for those who know what they're looking for. Good music, real atmosphere, parties worth remembering. 220+ people, one vibe.",
storyP2: "In the heart of Târgu Mureș, on Piața Trandafirilor. Birthdays, private parties and night events — our venue, our security, your night.",
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```
Expected: no errors. If errors appear, the new keys are missing from one of the two language objects — add the missing ones.

- [ ] **Step 4: Commit**

```bash
git add src/i18n/dictionary.ts
git commit -m "feat: add club story copy keys to dictionary (ro + en)"
```

---

## Task 3: Add story section to Criss Club page

**Files:**
- Modify: `app/criss-club/page.tsx`

The new section goes between the first `<Divider />` and the `{/* Selective notice */}` block.

- [ ] **Step 1: Add `AddressLink` import**

At the top of `app/criss-club/page.tsx`, add:
```typescript
import { AddressLink } from "@/src/components/site/address-link";
```

- [ ] **Step 2: Insert the story section**

Find this comment in `app/criss-club/page.tsx`:
```tsx
        {/* Selective notice */}
        <Reveal>
          <div className="mx-auto mt-12 max-w-5xl px-6 sm:px-8">
```

Insert the following block **immediately before** that comment:

```tsx
        {/* Story section */}
        <Reveal>
          <div className="mx-auto mt-20 max-w-3xl px-6 sm:px-8 text-center">
            <p className="mb-4 text-[0.62rem] font-semibold uppercase tracking-[0.38em] text-[#a855f7]/60">
              {t.club.storyEyebrow}
            </p>
            <h2
              className="font-serif font-light leading-[1.1] text-[#f5f0e8] text-balance"
              style={{ fontSize: "clamp(2rem,4.5vw,3.2rem)" }}
            >
              {t.club.storyHeadline}
              <br />
              <em className="italic text-[#ff3da3]">{t.club.storyEm}</em>
            </h2>
            <p className="mx-auto mt-7 max-w-xl font-serif italic text-[1.1rem] leading-[1.7] text-[#f5f0e8]/65 text-pretty">
              {t.club.storyP1}
            </p>
            <p className="mx-auto mt-4 max-w-xl font-serif italic text-[1.05rem] leading-[1.7] text-[#f5f0e8]/45 text-pretty">
              {t.club.storyP2}
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <ReservationTrigger
                className="inline-flex items-center gap-2.5 rounded-lg px-7 py-3.5 text-[11px] font-semibold tracking-[0.28em] uppercase text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-10px_rgba(168,85,247,0.6)]"
                style={{ background: "linear-gradient(135deg, #3b82f6 0%, #a855f7 52%, #ff3da3 100%)" }}
              >
                {t.club.bookCta} →
              </ReservationTrigger>
              <AddressLink className="inline-flex items-center gap-2.5 rounded-lg border border-white/15 px-7 py-3.5 text-[11px] font-medium tracking-[0.28em] uppercase text-[#f5f0e8]/60 transition-all duration-300 hover:border-[#a855f7]/40 hover:text-[#a855f7]" />
            </div>
          </div>
        </Reveal>

        <div className="mt-20"><Divider /></div>

```

- [ ] **Step 3: Verify visually**

With dev server running, open `http://localhost:3000/criss-club` and scroll past the info row. You should see the story section: eyebrow in purple, headline in light serif, em in pink, two body paragraphs, then buttons, then a divider, then the selective notice.

Toggle language to EN and confirm the English copy appears correctly.

- [ ] **Step 4: Commit**

```bash
git add app/criss-club/page.tsx
git commit -m "feat: add story section to Criss Club page"
```

---

## Task 4: Per-route SEO layouts

**Files:**
- Create: `app/criss-cafe/layout.tsx`
- Create: `app/criss-club/layout.tsx`
- Create: `app/meniu/layout.tsx`
- Create: `app/meniu/cafe/layout.tsx`
- Create: `app/meniu/club/layout.tsx`
- Create: `app/servicii/layout.tsx`

Each file is a minimal server component — no providers, no markup, just metadata export and a passthrough layout.

- [ ] **Step 1: Create `app/criss-cafe/layout.tsx`**

```typescript
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Criss Cafe Târgu Mureș — Cafenea & Lounge",
  description:
    "Cafenea și lounge pe Piața Trandafirilor. Mâncare, cafea, bere la halbă, cocktailuri în Târgu Mureș.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
```

- [ ] **Step 2: Create `app/criss-club/layout.tsx`**

```typescript
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Criss Club Târgu Mureș — Social Club & Petreceri de Noapte",
  description:
    "Social club selectiv în Târgu Mureș. Majorate, petreceri private și evenimente de noapte pe Piața Trandafirilor.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
```

- [ ] **Step 3: Create `app/meniu/layout.tsx`**

```typescript
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meniu — Criss Cafe & Club Târgu Mureș",
  description:
    "Meniul complet Criss Cafe și Criss Club din Târgu Mureș.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
```

- [ ] **Step 4: Create `app/meniu/cafe/layout.tsx`**

```typescript
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meniu Criss Cafe — Pizza, Paste, Cocktailuri Tg Mureș",
  description:
    "Meniul complet Criss Cafe: pizza, paste, cocktailuri, cafea și bere în Târgu Mureș.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
```

- [ ] **Step 5: Create `app/meniu/club/layout.tsx`**

```typescript
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meniu Criss Club Târgu Mureș",
  description:
    "Meniu băuturi și cocktailuri Criss Club, social club Târgu Mureș.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
```

- [ ] **Step 6: Create `app/servicii/layout.tsx`**

```typescript
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Servicii Cris Royal Delivery — Catering & Evenimente Tg Mureș",
  description:
    "Livrări, catering școli autorizat, cocktail bar și organizare evenimente complete în Târgu Mureș.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
```

- [ ] **Step 7: Verify metadata in browser**

With dev server running, open each route and inspect the `<title>` tag in DevTools → Elements:
- `http://localhost:3000/criss-cafe` → "Criss Cafe Târgu Mureș — Cafenea & Lounge"
- `http://localhost:3000/criss-club` → "Criss Club Târgu Mureș — Social Club & Petreceri de Noapte"
- `http://localhost:3000/meniu/cafe` → "Meniu Criss Cafe — Pizza, Paste, Cocktailuri Tg Mureș"

- [ ] **Step 8: Commit**

```bash
git add app/criss-cafe/layout.tsx app/criss-club/layout.tsx app/meniu/layout.tsx app/meniu/cafe/layout.tsx app/meniu/club/layout.tsx app/servicii/layout.tsx
git commit -m "feat: add per-route SEO metadata layouts"
```
