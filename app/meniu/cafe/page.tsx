import { getMenu } from "@/src/lib/supabase";
import { CafeMenuClient } from "./menu-client";

// Fetch menu data on the server so dish names, descriptions and prices land in
// the HTML (indexable by Google). ISR serves the cached page instantly and
// picks up admin edits within a minute.
export const revalidate = 60;

export default async function CafeMenuPage() {
  const menu = await getMenu("cafe");
  return <CafeMenuClient menu={menu} />;
}
