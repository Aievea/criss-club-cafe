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

export async function getMenu(venue: Venue): Promise<CategoryWithItems[]> {
  const { data: categories } = await supabase
    .from("menu_categories")
    .select("*")
    .eq("venue", venue)
    .order("sort_order");

  if (!categories) return [];

  const { data: items } = await supabase
    .from("menu_items")
    .select("*")
    .in("category_id", categories.map((c) => c.id))
    .eq("available", true)
    .order("sort_order");

  const allItems = items ?? [];

  const catMap = new Map<string, CategoryWithItems>();
  for (const cat of categories) {
    catMap.set(cat.id, {
      ...cat,
      items: allItems.filter((i) => i.category_id === cat.id),
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
