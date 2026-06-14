# Admin Panel + Menu Modal + Design Improvements

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a MenuChoiceModal on the homepage, improve menu page designs with Lucide icons, and build an admin panel with Supabase auth for managing menu categories and items (add/edit/delete/toggle).

**Architecture:** MenuChoiceModal uses the native `<dialog>` element triggered from the homepage hero. Admin routes under `/admin/*` are protected by a Next.js middleware that checks the Supabase session cookie. Admin CRUD operations use server-side Supabase client with authenticated RLS policies.

**Tech Stack:** Next.js 15 App Router, Supabase JS v2, Tailwind CSS, Lucide React, `@supabase/ssr` for server-side auth.

---

## File Map

**Create:**
- `src/components/site/menu-choice-modal.tsx` — dialog with two venue cards
- `app/admin/login/page.tsx` — email+password login form
- `app/admin/layout.tsx` — session guard, venue nav
- `app/admin/page.tsx` — redirect to /admin/cafe
- `app/admin/[venue]/page.tsx` — full CRUD UI for cafe or club
- `src/lib/supabase-admin.ts` — admin CRUD functions (server-safe)
- `middleware.ts` — protect /admin/* routes

**Modify:**
- `src/components/site/homepage-hero.tsx` — wire modal trigger
- `app/meniu/cafe/page.tsx` — Lucide icons, better layout
- `app/meniu/club/page.tsx` — Lucide icons, better layout
- `src/lib/supabase.ts` — add `createBrowserClient` helper

---

## Task 1: Install `@supabase/ssr` and update RLS

**Files:**
- Modify: `src/lib/supabase.ts`
- Supabase dashboard migration

- [ ] **Step 1: Install @supabase/ssr**

```bash
npm install @supabase/ssr
```

Expected: package added to node_modules.

- [ ] **Step 2: Update RLS to allow authenticated users to CRUD**

Run this SQL via Supabase MCP `apply_migration` on project `motgtbdxnyjwxipxzqul`:

```sql
-- Allow authenticated users full CRUD on categories
create policy "admin insert categories" on menu_categories
  for insert to authenticated with check (true);
create policy "admin update categories" on menu_categories
  for update to authenticated using (true);
create policy "admin delete categories" on menu_categories
  for delete to authenticated using (true);

-- Allow authenticated users full CRUD on items
create policy "admin insert items" on menu_items
  for insert to authenticated with check (true);
create policy "admin update items" on menu_items
  for update to authenticated using (true);
create policy "admin delete items" on menu_items
  for delete to authenticated using (true);
```

- [ ] **Step 3: Update `src/lib/supabase.ts` to export a browser client factory**

Replace the existing file with:

```typescript
import { createClient } from "@supabase/supabase-js";
import { createBrowserClient as createSSRBrowserClient } from "@supabase/ssr";

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Public read-only client (used in menu pages)
export const supabase = createClient(URL, ANON);

// Auth-aware browser client (used in admin pages)
export function createBrowserClient() {
  return createSSRBrowserClient(URL, ANON);
}

export type Venue = "cafe" | "club";

export interface MenuCategory {
  id: string;
  venue: Venue;
  name_ro: string;
  name_en: string;
  sort_order: number;
}

export interface MenuItem {
  id: string;
  category_id: string;
  name_ro: string;
  name_en: string;
  description_ro: string | null;
  description_en: string | null;
  price: number;
  unit: string | null;
  available: boolean;
  sort_order: number;
}

export interface CategoryWithItems extends MenuCategory {
  items: MenuItem[];
}

export async function getMenu(venue: Venue): Promise<CategoryWithItems[]> {
  const { data: categories, error: catError } = await supabase
    .from("menu_categories")
    .select("*")
    .eq("venue", venue)
    .order("sort_order");

  if (catError || !categories) return [];

  const { data: items, error: itemError } = await supabase
    .from("menu_items")
    .select("*")
    .in("category_id", categories.map((c) => c.id))
    .eq("available", true)
    .order("sort_order");

  if (itemError || !items) return categories.map((c) => ({ ...c, items: [] }));

  return categories.map((cat) => ({
    ...cat,
    items: items.filter((item) => item.category_id === cat.id),
  }));
}
```

- [ ] **Step 4: Commit**

```bash
git add src/lib/supabase.ts package.json package-lock.json
git commit -m "feat: install @supabase/ssr, add admin RLS policies"
```

---

## Task 2: Next.js middleware for admin auth

**Files:**
- Create: `middleware.ts`

- [ ] **Step 1: Create `middleware.ts` at project root**

```typescript
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  if (!user && request.nextUrl.pathname.startsWith("/admin") &&
      request.nextUrl.pathname !== "/admin/login") {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  if (user && request.nextUrl.pathname === "/admin/login") {
    return NextResponse.redirect(new URL("/admin/cafe", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
```

- [ ] **Step 2: Commit**

```bash
git add middleware.ts
git commit -m "feat: protect /admin routes with Supabase session middleware"
```

---

## Task 3: Admin login page

**Files:**
- Create: `app/admin/login/page.tsx`

- [ ] **Step 1: Create `app/admin/login/page.tsx`**

```tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@/src/lib/supabase";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const client = createBrowserClient();
    const { error } = await client.auth.signInWithPassword({ email, password });

    if (error) {
      setError("Email sau parolă incorectă.");
      setLoading(false);
      return;
    }

    router.push("/admin/cafe");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0a0806] px-6">
      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 text-[0.62rem] uppercase tracking-[0.28em] text-white/50">
            Admin
          </span>
          <h1 className="mt-4 font-display text-3xl font-semibold tracking-[-0.02em] text-[#f5f0e8]"
              style={{ fontFamily: "var(--font-cinzel)" }}>
            Criss Admin
          </h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#c9a86a]/40" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3.5 pl-11 pr-4 text-sm text-[#f5f0e8] placeholder-white/25 outline-none transition-all focus:border-[#c9a86a]/50 focus:ring-1 focus:ring-[#c9a86a]/20"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#c9a86a]/40" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Parolă"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3.5 pl-11 pr-11 text-sm text-[#f5f0e8] placeholder-white/25 outline-none transition-all focus:border-[#c9a86a]/50 focus:ring-1 focus:ring-[#c9a86a]/20"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          {error && (
            <p className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#c9a86a] py-3.5 text-[11.5px] font-semibold tracking-[0.28em] uppercase text-[#1a1411] transition-all hover:-translate-y-px hover:shadow-[0_14px_40px_-10px_rgba(201,168,106,0.4)] disabled:opacity-50"
          >
            {loading ? "Se conectează..." : "Intră în cont"}
          </button>
        </form>
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/admin/login/page.tsx
git commit -m "feat: admin login page with Supabase auth"
```

---

## Task 4: Admin layout and root redirect

**Files:**
- Create: `app/admin/layout.tsx`
- Create: `app/admin/page.tsx`

- [ ] **Step 1: Create `app/admin/page.tsx`**

```tsx
import { redirect } from "next/navigation";

export default function AdminPage() {
  redirect("/admin/cafe");
}
```

- [ ] **Step 2: Create `app/admin/layout.tsx`**

```tsx
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createBrowserClient } from "@/src/lib/supabase";
import { Coffee, Music, LogOut } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    const client = createBrowserClient();
    await client.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  if (pathname === "/admin/login") return <>{children}</>;

  return (
    <div className="min-h-screen bg-[#0a0806] font-body text-[#f5f0e8]">
      {/* Top nav */}
      <header className="sticky top-0 z-50 border-b border-white/8 bg-[#0a0806]/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <span className="font-display text-lg font-semibold tracking-[-0.01em] text-[#f5f0e8]"
                style={{ fontFamily: "var(--font-cinzel)" }}>
            Criss Admin
          </span>
          <nav className="flex items-center gap-2">
            <Link
              href="/admin/cafe"
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-semibold tracking-[0.22em] uppercase transition-all ${
                pathname === "/admin/cafe"
                  ? "bg-[#c9a86a] text-[#1a1411]"
                  : "text-white/50 hover:text-white"
              }`}
            >
              <Coffee className="h-3.5 w-3.5" />
              Cafe
            </Link>
            <Link
              href="/admin/club"
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-semibold tracking-[0.22em] uppercase transition-all ${
                pathname === "/admin/club"
                  ? "bg-[#ff3da3] text-white"
                  : "text-white/50 hover:text-white"
              }`}
            >
              <Music className="h-3.5 w-3.5" />
              Club
            </Link>
            <button
              onClick={handleLogout}
              className="ml-2 flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-[11px] font-semibold tracking-[0.22em] uppercase text-white/40 transition-all hover:border-white/25 hover:text-white/70"
            >
              <LogOut className="h-3.5 w-3.5" />
              Ieși
            </button>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-8">
        {children}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add app/admin/page.tsx app/admin/layout.tsx
git commit -m "feat: admin layout with venue nav and logout"
```

---

## Task 5: Admin CRUD functions

**Files:**
- Create: `src/lib/supabase-admin.ts`

- [ ] **Step 1: Create `src/lib/supabase-admin.ts`**

```typescript
import { createBrowserClient } from "@/src/lib/supabase";
import type { Venue, MenuCategory, MenuItem } from "@/src/lib/supabase";

function client() {
  return createBrowserClient();
}

// ── Categories ──────────────────────────────────────────────

export async function getAdminMenu(venue: Venue) {
  const sb = client();
  const { data: categories } = await sb
    .from("menu_categories")
    .select("*")
    .eq("venue", venue)
    .order("sort_order");

  if (!categories) return [];

  const { data: items } = await sb
    .from("menu_items")
    .select("*")
    .in("category_id", categories.map((c) => c.id))
    .order("sort_order");

  return categories.map((cat: MenuCategory) => ({
    ...cat,
    items: (items ?? []).filter((i: MenuItem) => i.category_id === cat.id),
  }));
}

export async function addCategory(venue: Venue, name_ro: string, name_en: string, sort_order: number) {
  const { data, error } = await client()
    .from("menu_categories")
    .insert({ venue, name_ro, name_en, sort_order })
    .select()
    .single();
  return { data, error };
}

export async function updateCategory(id: string, patch: Partial<Pick<MenuCategory, "name_ro" | "name_en" | "sort_order">>) {
  const { error } = await client().from("menu_categories").update(patch).eq("id", id);
  return { error };
}

export async function deleteCategory(id: string) {
  const { error } = await client().from("menu_categories").delete().eq("id", id);
  return { error };
}

// ── Items ────────────────────────────────────────────────────

export async function addItem(item: Omit<MenuItem, "id" | "created_at">) {
  const { data, error } = await client()
    .from("menu_items")
    .insert(item)
    .select()
    .single();
  return { data, error };
}

export async function updateItem(id: string, patch: Partial<Omit<MenuItem, "id" | "category_id" | "created_at">>) {
  const { error } = await client().from("menu_items").update(patch).eq("id", id);
  return { error };
}

export async function toggleItem(id: string, available: boolean) {
  const { error } = await client().from("menu_items").update({ available }).eq("id", id);
  return { error };
}

export async function deleteItem(id: string) {
  const { error } = await client().from("menu_items").delete().eq("id", id);
  return { error };
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/supabase-admin.ts
git commit -m "feat: admin CRUD helpers for menu categories and items"
```

---

## Task 6: Admin venue management page

**Files:**
- Create: `app/admin/[venue]/page.tsx`

- [ ] **Step 1: Create `app/admin/[venue]/page.tsx`**

```tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import {
  Plus, Trash2, Pencil, Check, X, ChevronDown, ChevronUp, ToggleLeft, ToggleRight,
} from "lucide-react";
import {
  getAdminMenu, addCategory, updateCategory, deleteCategory,
  addItem, updateItem, toggleItem, deleteItem,
} from "@/src/lib/supabase-admin";
import type { Venue, CategoryWithItems, MenuItem } from "@/src/lib/supabase";

const ACCENT = { cafe: "#c9a86a", club: "#ff3da3" } as const;

export default function AdminVenuePage() {
  const { venue } = useParams<{ venue: string }>();
  const v = venue as Venue;
  const accent = ACCENT[v] ?? "#c9a86a";

  const [menu, setMenu] = useState<CategoryWithItems[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string[]>([]);

  // New category form
  const [newCatRo, setNewCatRo] = useState("");
  const [newCatEn, setNewCatEn] = useState("");
  const [addingCat, setAddingCat] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    const data = await getAdminMenu(v);
    setMenu(data);
    setLoading(false);
  }, [v]);

  useEffect(() => { refresh(); }, [refresh]);

  function toggleExpanded(id: string) {
    setExpanded((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  async function handleAddCategory() {
    if (!newCatRo.trim()) return;
    const maxOrder = Math.max(0, ...menu.map((c) => c.sort_order));
    await addCategory(v, newCatRo.trim(), newCatEn.trim() || newCatRo.trim(), maxOrder + 1);
    setNewCatRo(""); setNewCatEn(""); setAddingCat(false);
    refresh();
  }

  async function handleDeleteCategory(id: string) {
    if (!confirm("Ștergi categoria și toate produsele din ea?")) return;
    await deleteCategory(id);
    refresh();
  }

  async function handleToggleItem(item: MenuItem) {
    await toggleItem(item.id, !item.available);
    refresh();
  }

  async function handleDeleteItem(id: string) {
    if (!confirm("Ștergi produsul?")) return;
    await deleteItem(id);
    refresh();
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="h-px w-24 animate-pulse" style={{ background: accent }} />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold tracking-[-0.02em] text-[#f5f0e8]"
            style={{ fontFamily: "var(--font-cinzel)" }}>
          {v === "cafe" ? "Criss Cafe" : "Criss Club"}
        </h1>
        <button
          onClick={() => setAddingCat(true)}
          className="flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-semibold tracking-[0.22em] uppercase transition-all"
          style={{ background: accent, color: v === "cafe" ? "#1a1411" : "#fff" }}
        >
          <Plus className="h-3.5 w-3.5" /> Categorie nouă
        </button>
      </div>

      {/* New category form */}
      {addingCat && (
        <div className="flex flex-wrap items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-4">
          <input
            autoFocus
            placeholder="Nume RO"
            value={newCatRo}
            onChange={(e) => setNewCatRo(e.target.value)}
            className="flex-1 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-[#f5f0e8] placeholder-white/25 outline-none focus:border-white/25"
          />
          <input
            placeholder="Nume EN"
            value={newCatEn}
            onChange={(e) => setNewCatEn(e.target.value)}
            className="flex-1 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-[#f5f0e8] placeholder-white/25 outline-none focus:border-white/25"
          />
          <button onClick={handleAddCategory} className="rounded-lg p-2 text-green-400 hover:bg-green-400/10">
            <Check className="h-4 w-4" />
          </button>
          <button onClick={() => setAddingCat(false)} className="rounded-lg p-2 text-red-400 hover:bg-red-400/10">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Categories */}
      {menu.map((cat) => (
        <CategoryBlock
          key={cat.id}
          cat={cat}
          accent={accent}
          venue={v}
          expanded={expanded.includes(cat.id)}
          onToggleExpand={() => toggleExpanded(cat.id)}
          onDeleteCategory={() => handleDeleteCategory(cat.id)}
          onToggleItem={handleToggleItem}
          onDeleteItem={handleDeleteItem}
          onRefresh={refresh}
        />
      ))}
    </div>
  );
}

// ── CategoryBlock ──────────────────────────────────────────

function CategoryBlock({
  cat, accent, venue, expanded, onToggleExpand, onDeleteCategory,
  onToggleItem, onDeleteItem, onRefresh,
}: {
  cat: CategoryWithItems;
  accent: string;
  venue: Venue;
  expanded: boolean;
  onToggleExpand: () => void;
  onDeleteCategory: () => void;
  onToggleItem: (item: MenuItem) => void;
  onDeleteItem: (id: string) => void;
  onRefresh: () => void;
}) {
  const [editingName, setEditingName] = useState(false);
  const [nameRo, setNameRo] = useState(cat.name_ro);
  const [nameEn, setNameEn] = useState(cat.name_en);
  const [addingItem, setAddingItem] = useState(false);

  async function saveCategory() {
    await updateCategory(cat.id, { name_ro: nameRo, name_en: nameEn });
    setEditingName(false);
    onRefresh();
  }

  return (
    <div className="rounded-xl border border-white/8 bg-white/[0.03] overflow-hidden">
      {/* Category header */}
      <div className="flex items-center gap-3 px-5 py-4">
        <button onClick={onToggleExpand} className="flex-1 flex items-center gap-3 text-left">
          {expanded
            ? <ChevronUp className="h-4 w-4 text-white/30" />
            : <ChevronDown className="h-4 w-4 text-white/30" />
          }
          {editingName ? (
            <div className="flex flex-1 flex-wrap items-center gap-2" onClick={(e) => e.stopPropagation()}>
              <input value={nameRo} onChange={(e) => setNameRo(e.target.value)}
                className="flex-1 rounded-lg border border-white/15 bg-white/[0.06] px-3 py-1.5 text-sm text-[#f5f0e8] outline-none" />
              <input value={nameEn} onChange={(e) => setNameEn(e.target.value)}
                className="flex-1 rounded-lg border border-white/15 bg-white/[0.06] px-3 py-1.5 text-sm text-[#f5f0e8] outline-none" />
              <button onClick={saveCategory} className="text-green-400 hover:text-green-300"><Check className="h-4 w-4" /></button>
              <button onClick={() => setEditingName(false)} className="text-red-400 hover:text-red-300"><X className="h-4 w-4" /></button>
            </div>
          ) : (
            <span className="flex-1 font-semibold text-[#f5f0e8]">
              {cat.name_ro} <span className="text-white/30">/ {cat.name_en}</span>
              <span className="ml-2 text-xs text-white/25">({cat.items.length})</span>
            </span>
          )}
        </button>
        {!editingName && (
          <div className="flex items-center gap-2">
            <button onClick={() => setEditingName(true)} className="rounded-lg p-2 text-white/30 hover:text-white/70">
              <Pencil className="h-3.5 w-3.5" />
            </button>
            <button onClick={onDeleteCategory} className="rounded-lg p-2 text-white/30 hover:text-red-400">
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Items */}
      {expanded && (
        <div className="border-t border-white/6 px-5 pb-4">
          <div className="divide-y divide-white/5">
            {cat.items.map((item) => (
              <ItemRow
                key={item.id}
                item={item}
                accent={accent}
                onToggle={() => onToggleItem(item)}
                onDelete={() => onDeleteItem(item.id)}
                onRefresh={onRefresh}
              />
            ))}
          </div>

          {/* Add item */}
          {addingItem ? (
            <AddItemForm
              categoryId={cat.id}
              sortOrder={cat.items.length + 1}
              onDone={() => { setAddingItem(false); onRefresh(); }}
              onCancel={() => setAddingItem(false)}
            />
          ) : (
            <button
              onClick={() => setAddingItem(true)}
              className="mt-4 flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase transition-colors"
              style={{ color: `${accent}80` }}
              onMouseEnter={(e) => (e.currentTarget.style.color = accent)}
              onMouseLeave={(e) => (e.currentTarget.style.color = `${accent}80`)}
            >
              <Plus className="h-3.5 w-3.5" /> Adaugă produs
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ── ItemRow ────────────────────────────────────────────────

function ItemRow({ item, accent, onToggle, onDelete, onRefresh }: {
  item: MenuItem;
  accent: string;
  onToggle: () => void;
  onDelete: () => void;
  onRefresh: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [nameRo, setNameRo] = useState(item.name_ro);
  const [nameEn, setNameEn] = useState(item.name_en);
  const [price, setPrice] = useState(String(item.price));
  const [unit, setUnit] = useState(item.unit ?? "");

  async function saveItem() {
    await updateItem(item.id, {
      name_ro: nameRo,
      name_en: nameEn,
      price: parseFloat(price) || 0,
      unit: unit || null,
    });
    setEditing(false);
    onRefresh();
  }

  if (editing) {
    return (
      <div className="flex flex-wrap items-center gap-2 py-3">
        <input value={nameRo} onChange={(e) => setNameRo(e.target.value)} placeholder="Nume RO"
          className="flex-1 rounded-lg border border-white/10 bg-white/[0.06] px-3 py-1.5 text-sm text-[#f5f0e8] outline-none min-w-[120px]" />
        <input value={nameEn} onChange={(e) => setNameEn(e.target.value)} placeholder="Nume EN"
          className="flex-1 rounded-lg border border-white/10 bg-white/[0.06] px-3 py-1.5 text-sm text-[#f5f0e8] outline-none min-w-[120px]" />
        <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Preț" type="number"
          className="w-24 rounded-lg border border-white/10 bg-white/[0.06] px-3 py-1.5 text-sm text-[#f5f0e8] outline-none" />
        <input value={unit} onChange={(e) => setUnit(e.target.value)} placeholder="Unitate"
          className="w-24 rounded-lg border border-white/10 bg-white/[0.06] px-3 py-1.5 text-sm text-[#f5f0e8] outline-none" />
        <button onClick={saveItem} className="text-green-400 hover:text-green-300"><Check className="h-4 w-4" /></button>
        <button onClick={() => setEditing(false)} className="text-red-400 hover:text-red-300"><X className="h-4 w-4" /></button>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 py-3 ${!item.available ? "opacity-40" : ""}`}>
      <div className="flex-1">
        <span className="text-sm text-[#f5f0e8]">{item.name_ro}</span>
        {item.unit && <span className="ml-2 text-xs text-white/30">{item.unit}</span>}
      </div>
      <span className="tabular-nums text-sm font-semibold" style={{ color: accent }}>
        {item.price} lei
      </span>
      <button onClick={onToggle} className="rounded-lg p-1.5 text-white/30 hover:text-white/70" title="Toggle disponibil">
        {item.available
          ? <ToggleRight className="h-4 w-4 text-green-400" />
          : <ToggleLeft className="h-4 w-4" />
        }
      </button>
      <button onClick={() => setEditing(true)} className="rounded-lg p-1.5 text-white/30 hover:text-white/70">
        <Pencil className="h-3.5 w-3.5" />
      </button>
      <button onClick={onDelete} className="rounded-lg p-1.5 text-white/30 hover:text-red-400">
        <Trash2 className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

// ── AddItemForm ────────────────────────────────────────────

function AddItemForm({ categoryId, sortOrder, onDone, onCancel }: {
  categoryId: string;
  sortOrder: number;
  onDone: () => void;
  onCancel: () => void;
}) {
  const [nameRo, setNameRo] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("");

  async function handleAdd() {
    if (!nameRo.trim() || !price) return;
    await addItem({
      category_id: categoryId,
      name_ro: nameRo.trim(),
      name_en: nameEn.trim() || nameRo.trim(),
      description_ro: null,
      description_en: null,
      price: parseFloat(price),
      unit: unit.trim() || null,
      available: true,
      sort_order: sortOrder,
    });
    onDone();
  }

  return (
    <div className="mt-3 flex flex-wrap items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] p-3">
      <input autoFocus value={nameRo} onChange={(e) => setNameRo(e.target.value)} placeholder="Nume RO *"
        className="flex-1 rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 text-sm text-[#f5f0e8] placeholder-white/25 outline-none min-w-[120px]" />
      <input value={nameEn} onChange={(e) => setNameEn(e.target.value)} placeholder="Nume EN"
        className="flex-1 rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 text-sm text-[#f5f0e8] placeholder-white/25 outline-none min-w-[120px]" />
      <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Preț *" type="number"
        className="w-24 rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 text-sm text-[#f5f0e8] placeholder-white/25 outline-none" />
      <input value={unit} onChange={(e) => setUnit(e.target.value)} placeholder="ex: 330ml"
        className="w-24 rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 text-sm text-[#f5f0e8] placeholder-white/25 outline-none" />
      <button onClick={handleAdd} className="rounded-lg p-2 text-green-400 hover:bg-green-400/10"><Check className="h-4 w-4" /></button>
      <button onClick={onCancel} className="rounded-lg p-2 text-red-400 hover:bg-red-400/10"><X className="h-4 w-4" /></button>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/admin/[venue]/page.tsx
git commit -m "feat: admin venue CRUD page with category and item management"
```

---

## Task 7: MenuChoiceModal component

**Files:**
- Create: `src/components/site/menu-choice-modal.tsx`
- Modify: `src/components/site/homepage-hero.tsx`

- [ ] **Step 1: Create `src/components/site/menu-choice-modal.tsx`**

```tsx
"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Coffee, Music, X } from "lucide-react";
import { useLanguage } from "@/src/i18n/language-context";

interface MenuChoiceModalProps {
  open: boolean;
  onClose: () => void;
}

export function MenuChoiceModal({ open, onClose }: MenuChoiceModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();
  const { lang } = useLanguage();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleClose = () => onClose();
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [onClose]);

  function handleBackdropClick(e: React.MouseEvent<HTMLDialogElement>) {
    const rect = dialogRef.current?.getBoundingClientRect();
    if (!rect) return;
    if (
      e.clientX < rect.left || e.clientX > rect.right ||
      e.clientY < rect.top || e.clientY > rect.bottom
    ) {
      onClose();
    }
  }

  function navigate(path: string) {
    onClose();
    router.push(path);
  }

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      className="m-auto w-full max-w-lg rounded-2xl border border-white/10 bg-[#0e0c0a] p-0 backdrop:bg-black/70 backdrop:backdrop-blur-sm open:animate-[fadeIn_200ms_ease-out]"
      style={{ boxShadow: "0 32px 80px rgba(0,0,0,0.8)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/8 px-6 py-5">
        <div>
          <p className="text-[0.6rem] font-semibold uppercase tracking-[0.35em] text-[#c9a86a]/60">
            {lang === "ro" ? "Alege meniul" : "Choose menu"}
          </p>
          <h2 className="mt-0.5 font-display text-xl font-semibold tracking-[-0.01em] text-[#f5f0e8]"
              style={{ fontFamily: "var(--font-cinzel)" }}>
            {lang === "ro" ? "Unde vrei să mergi?" : "Where are you headed?"}
          </h2>
        </div>
        <button
          onClick={onClose}
          className="rounded-full p-2 text-white/30 transition-colors hover:bg-white/8 hover:text-white/70"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 gap-3 p-5">
        <button
          onClick={() => navigate("/meniu/cafe")}
          className="group relative overflow-hidden rounded-xl border border-[#c9a86a]/20 bg-[#0a0806] p-6 text-left transition-all duration-300 hover:border-[#c9a86a]/50 hover:-translate-y-0.5"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: "radial-gradient(ellipse at top, rgba(201,168,106,0.12), transparent 70%)" }}
          />
          <Coffee className="mb-4 h-7 w-7 text-[#c9a86a]" />
          <p className="text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-[#c9a86a]/50">
            {lang === "ro" ? "Cafenea" : "Cafe"}
          </p>
          <h3 className="mt-1 font-display text-lg font-semibold text-[#f5f0e8]"
              style={{ fontFamily: "var(--font-cinzel)" }}>
            Criss Cafe
          </h3>
          <p className="mt-2 text-xs text-[#a89f90]">
            {lang === "ro" ? "Cafea, băuturi, deserturi" : "Coffee, drinks, desserts"}
          </p>
          <span className="mt-4 inline-block text-[#c9a86a]/40 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#c9a86a]">
            →
          </span>
        </button>

        <button
          onClick={() => navigate("/meniu/club")}
          className="group relative overflow-hidden rounded-xl border border-[#ff3da3]/15 bg-[#0a0806] p-6 text-left transition-all duration-300 hover:border-[#ff3da3]/40 hover:-translate-y-0.5"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: "radial-gradient(ellipse at top, rgba(255,61,163,0.08), transparent 70%)" }}
          />
          <Music className="mb-4 h-7 w-7 text-[#ff3da3]" />
          <p className="text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-[#ff3da3]/50">
            Club
          </p>
          <h3 className="mt-1 font-display text-lg font-semibold text-[#f5f0e8]"
              style={{ fontFamily: "var(--font-cinzel)" }}>
            Criss Club
          </h3>
          <p className="mt-2 text-xs text-[#a89f90]">
            {lang === "ro" ? "Sticle, cocktailuri, shots" : "Bottles, cocktails, shots"}
          </p>
          <span className="mt-4 inline-block text-[#ff3da3]/40 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#ff3da3]">
            →
          </span>
        </button>
      </div>
    </dialog>
  );
}
```

- [ ] **Step 2: Update `src/components/site/homepage-hero.tsx` to use the modal**

Replace the `"Descoperă meniul"` Link with a button that opens the modal. Add state and import at the top:

```tsx
// Add to imports:
import { useState } from "react";
import { MenuChoiceModal } from "@/src/components/site/menu-choice-modal";

// Inside HomepageHero, add state:
const [menuOpen, setMenuOpen] = useState(false);

// Replace the Link:
<button
  onClick={() => setMenuOpen(true)}
  className="inline-flex items-center gap-3 rounded-full border border-[#e6c787] bg-[#e6c787] px-6 py-3.5 text-[11.5px] font-semibold tracking-[0.28em] uppercase text-[#1a1411] transition-all duration-200 hover:-translate-y-px hover:shadow-[0_14px_40px_-10px_rgba(230,199,135,0.4)]"
>
  Descoperă meniul <span className="inline-block transition-transform duration-200">→</span>
</button>
<MenuChoiceModal open={menuOpen} onClose={() => setMenuOpen(false)} />
```

- [ ] **Step 3: Add fadeIn animation to `app/globals.css` (or tailwind config)**

Check if `crd-fade-up` keyframes exist in globals.css. If `fadeIn` is missing, add:

```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px) scale(0.98); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/site/menu-choice-modal.tsx src/components/site/homepage-hero.tsx app/globals.css
git commit -m "feat: MenuChoiceModal dialog on homepage hero"
```

---

## Task 8: Improve menu pages with Lucide icons

**Files:**
- Modify: `app/meniu/cafe/page.tsx`
- Modify: `app/meniu/club/page.tsx`

- [ ] **Step 1: Update `app/meniu/cafe/page.tsx` with icon mapping and improved layout**

Add icon map at the top (after imports):

```tsx
import {
  Coffee, GlassWater, Citrus, Beer, Wine, IceCream, Leaf,
  type LucideIcon,
} from "lucide-react";

const CAFE_ICONS: Record<string, LucideIcon> = {
  "Cafea": Coffee,
  "Băuturi reci": GlassWater,
  "Sucuri naturale": Citrus,
  "Bere": Beer,
  "Cocktailuri": Wine,
  "Aperitive": Leaf,
  "Deserturi": IceCream,
};

function getCafeIcon(nameRo: string): LucideIcon {
  return CAFE_ICONS[nameRo] ?? Coffee;
}
```

Update the category tabs to show icons:

```tsx
{menu.map((cat) => {
  const Icon = getCafeIcon(cat.name_ro);
  return (
    <button
      key={cat.id}
      onClick={() => setActive(cat.id)}
      className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-[11px] font-semibold tracking-[0.22em] uppercase transition-all duration-200 ${
        active === cat.id
          ? "bg-[#c9a86a] text-[#1a1411]"
          : "border border-white/15 text-[#f5f0e8]/50 hover:border-[#c9a86a]/40 hover:text-[#f5f0e8]"
      }`}
    >
      <Icon className="h-3.5 w-3.5" />
      {lang === "ro" ? cat.name_ro : cat.name_en}
    </button>
  );
})}
```

- [ ] **Step 2: Update `app/meniu/club/page.tsx` with icon mapping**

```tsx
import {
  Wine, Zap, Beer, GlassWater, Music,
  type LucideIcon,
} from "lucide-react";

const CLUB_ICONS: Record<string, LucideIcon> = {
  "Sticle": Wine,
  "Cocktailuri": Music,
  "Shots": Zap,
  "Bere": Beer,
  "Băuturi nealcoolice": GlassWater,
};

function getClubIcon(nameRo: string): LucideIcon {
  return CLUB_ICONS[nameRo] ?? Wine;
}
```

Update tabs the same way as cafe but with `#ff3da3` active color:

```tsx
{menu.map((cat) => {
  const Icon = getClubIcon(cat.name_ro);
  return (
    <button
      key={cat.id}
      onClick={() => setActive(cat.id)}
      className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-[11px] font-semibold tracking-[0.22em] uppercase transition-all duration-200 ${
        active === cat.id
          ? "bg-[#ff3da3] text-white"
          : "border border-white/15 text-[#f5f0e8]/50 hover:border-[#ff3da3]/40 hover:text-[#f5f0e8]"
      }`}
    >
      <Icon className="h-3.5 w-3.5" />
      {lang === "ro" ? cat.name_ro : cat.name_en}
    </button>
  );
})}
```

- [ ] **Step 3: Commit**

```bash
git add app/meniu/cafe/page.tsx app/meniu/club/page.tsx
git commit -m "feat: Lucide icons in menu category tabs"
```

---

## Task 9: Create admin user in Supabase

- [ ] **Step 1: Create admin user via Supabase dashboard**

Go to `https://supabase.com/dashboard/project/motgtbdxnyjwxipxzqul/auth/users` → "Add user" → enter email and password. This is the account used to log in at `/admin/login`.

- [ ] **Step 2: Smoke test the full flow**

1. Visit `/admin/login` — form appears
2. Log in with admin credentials → redirected to `/admin/cafe`
3. Expand a category, toggle an item off → item grays out
4. Add a new item → appears in list
5. Edit item name → updates inline
6. Delete item → removed
7. Add category → appears
8. Visit `/meniu/cafe` → icons visible, items load from Supabase
9. On homepage click "Descoperă meniul" → modal opens, click Criss Cafe → navigates

- [ ] **Step 3: Final commit**

```bash
git add .
git commit -m "feat: complete admin panel, MenuChoiceModal, Lucide icons in menus"
```
