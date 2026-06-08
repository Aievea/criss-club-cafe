import { createClient } from "@supabase/supabase-js";
import { createBrowserClient as createSSRBrowserClient } from "@supabase/ssr";

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

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
