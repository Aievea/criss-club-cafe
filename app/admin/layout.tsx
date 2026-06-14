"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createBrowserClient } from "@/src/lib/supabase";
import { Coffee, Music, LogOut, Users } from "lucide-react";

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
            <Link
              href="/admin/djs"
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-semibold tracking-[0.22em] uppercase transition-all ${
                pathname === "/admin/djs"
                  ? "bg-[#a855f7] text-white"
                  : "text-white/50 hover:text-white"
              }`}
            >
              <Users className="h-3.5 w-3.5" />
              DJs
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
