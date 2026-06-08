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
