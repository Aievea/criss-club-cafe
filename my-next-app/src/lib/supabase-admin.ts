import { createBrowserClient } from "@/src/lib/supabase";
import type { Venue, MenuCategory, MenuItem, CategoryWithItems } from "@/src/lib/supabase";

function client() {
  return createBrowserClient();
}

export async function getAdminMenu(venue: Venue): Promise<CategoryWithItems[]> {
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

  const allItems = items ?? [];

  const catMap = new Map<string, CategoryWithItems>();
  for (const cat of categories as MenuCategory[]) {
    catMap.set(cat.id, {
      ...cat,
      items: allItems.filter((i: MenuItem) => i.category_id === cat.id),
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

export async function uploadCategoryPhoto(file: File, categoryId: string): Promise<string | null> {
  const sb = client();
  const ext = file.name.split(".").pop() ?? "jpg";
  const path = `categories/${categoryId}.${ext}`;
  const { error } = await sb.storage.from("menu-photos").upload(path, file, { upsert: true });
  if (error) return null;
  const { data } = sb.storage.from("menu-photos").getPublicUrl(path);
  return data.publicUrl;
}

export async function addCategory(
  venue: Venue,
  name_ro: string,
  name_en: string,
  sort_order: number,
  parent_id?: string | null,
) {
  const { data, error } = await client()
    .from("menu_categories")
    .insert({ venue, name_ro, name_en, sort_order, parent_id: parent_id ?? null })
    .select()
    .single();
  return { data, error };
}

export async function updateCategory(
  id: string,
  patch: Partial<Pick<MenuCategory, "name_ro" | "name_en" | "sort_order" | "photo_url">>,
) {
  const { error } = await client().from("menu_categories").update(patch).eq("id", id);
  return { error };
}

export async function deleteCategory(id: string) {
  const { error } = await client().from("menu_categories").delete().eq("id", id);
  return { error };
}

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
