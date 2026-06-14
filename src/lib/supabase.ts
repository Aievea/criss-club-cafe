import { createClient } from "@supabase/supabase-js";
import { createBrowserClient as createSSRBrowserClient } from "@supabase/ssr";

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder";

// Falls back to placeholder values at build time so module import doesn't throw
// when env vars are absent. Real values must be set in Vercel project settings.
export const supabase = createClient(URL, ANON);

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
  parent_id: string | null;
  photo_url: string | null;
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
  subcategories: CategoryWithItems[];
}

export interface DJ {
  id: string;
  name: string;
  sub: string | null;
  photo_url: string | null;
  sort_order: number;
  active: boolean;
}

export async function getDJs(): Promise<DJ[]> {
  const { data } = await supabase
    .from("djs")
    .select("*")
    .eq("active", true)
    .order("sort_order");
  return data ?? [];
}

export async function getMenu(venue: Venue): Promise<CategoryWithItems[]> {
  // Single round trip: categories with their items embedded via the
  // menu_items.category_id foreign key.
  const { data: categories } = await supabase
    .from("menu_categories")
    .select("*, items:menu_items(*)")
    .eq("venue", venue)
    .eq("items.available", true)
    .order("sort_order")
    .order("sort_order", { referencedTable: "items" });

  if (!categories) return [];

  const catMap = new Map<string, CategoryWithItems>();
  for (const cat of categories) {
    catMap.set(cat.id, {
      ...cat,
      items: cat.items ?? [],
      subcategories: [],
    });
  }

  const topLevel: CategoryWithItems[] = [];
  for (const cat of catMap.values()) {
    if (cat.parent_id && catMap.has(cat.parent_id)) {
      catMap.get(cat.parent_id)!.subcategories.push(cat);
    } else if (!cat.parent_id) {
      topLevel.push(cat);
    }
  }

  return topLevel;
}
