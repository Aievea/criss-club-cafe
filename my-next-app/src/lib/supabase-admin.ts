import { createBrowserClient } from "@/src/lib/supabase";
import type { Venue, MenuCategory, MenuItem } from "@/src/lib/supabase";

function client() {
  return createBrowserClient();
}

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
