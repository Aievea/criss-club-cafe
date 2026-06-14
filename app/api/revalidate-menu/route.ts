import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

// Called by the admin panel after menu edits so the ISR-cached public menu
// pages regenerate immediately instead of waiting out the revalidate window.
export async function POST(request: Request) {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder",
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll() {},
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const venue = body?.venue;
  if (venue !== "cafe" && venue !== "club") {
    return NextResponse.json({ error: "Invalid venue" }, { status: 400 });
  }

  revalidatePath(`/meniu/${venue}`);
  return NextResponse.json({ revalidated: true });
}
