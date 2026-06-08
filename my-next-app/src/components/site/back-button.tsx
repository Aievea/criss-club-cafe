"use client";

import { useRouter } from "next/navigation";

export function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      aria-label="Înapoi"
      className="group fixed bottom-8 left-6 z-50"
    >
      <span
        className="
          flex items-center gap-2.5
          rounded-full border border-white/[0.09] bg-black/25
          px-4 py-2.5 backdrop-blur-md
          transition-all duration-300 ease-out
          motion-reduce:transition-none
          group-hover:border-white/[0.20] group-hover:bg-white/[0.09]
        "
      >
        <svg
          width="11" height="11" viewBox="0 0 11 11" fill="none"
          aria-hidden
          className="shrink-0 transition-transform duration-300 ease-out motion-reduce:transition-none group-hover:-translate-x-0.5"
        >
          <path
            d="M7 1.5L3 5.5L7 9.5"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white/40 transition-colors duration-300 group-hover:text-white/80"
          />
        </svg>
        <span
          className="
            text-[9px] font-medium uppercase tracking-[0.32em]
            text-white/35
            transition-colors duration-300 motion-reduce:transition-none
            group-hover:text-white/72
          "
        >
          Înapoi
        </span>
      </span>
    </button>
  );
}
