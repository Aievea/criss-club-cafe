import { getMenu } from "@/src/lib/supabase";
import { CafeMenuClient } from "./menu-client";

// Fetch menu data on the server so dish names, descriptions and prices land in
// the HTML (indexable by Google). force-dynamic keeps it live with admin edits,
// matching the rest of the site's no-cache behavior.
export const dynamic = "force-dynamic";

export default async function CafeMenuPage() {
  const menu = await getMenu("cafe");
  return <CafeMenuClient menu={menu} />;
}
