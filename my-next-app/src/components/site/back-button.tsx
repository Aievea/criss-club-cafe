"use client";

import { useRouter } from "next/navigation";

export function BackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="group fixed bottom-8 left-6 z-50 inline-flex items-center gap-2 rounded-full border border-white/12 bg-[#0e0c0a]/90 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f5f0e8]/45 backdrop-blur-md transition-all duration-300 hover:border-[#c9a86a]/40 hover:text-[#c9a86a]"
    >
      <span className="transition-transform duration-200 group-hover:-translate-x-0.5">←</span>
      Înapoi
    </button>
  );
}
