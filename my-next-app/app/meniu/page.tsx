"use client";

import Link from "next/link";
import { SiteNav } from "@/src/components/site/site-nav";
import { useLanguage } from "@/src/i18n/language-context";

export default function MeniuPage() {
  const { lang } = useLanguage();

  return (
    <main className="flex min-h-screen flex-col overflow-hidden bg-crd-bg font-body text-crd-ink">
      <SiteNav />

      <div className="flex flex-1 flex-col items-center justify-center px-6 py-20 text-center">
        <span className="inline-flex items-center rounded-full border border-white/20 bg-white/[0.05] px-3.5 py-1 text-[0.62rem] uppercase tracking-[0.28em] text-white/60">
          {lang === "ro" ? "Alege destinația" : "Choose your destination"}
        </span>

        <h1 className="mt-6 font-display text-[clamp(2.5rem,7vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.02em] text-[#f5f0e8] text-balance">
          {lang === "ro" ? "Meniu" : "Menu"}
        </h1>

        <p className="mx-auto mt-5 max-w-md font-serif italic text-[#f5f0e8]/50">
          {lang === "ro"
            ? "Explorează oferta cafenelei sau a clubului"
            : "Explore the cafe or club offerings"}
        </p>

        <div className="mt-14 grid w-full max-w-xl gap-4 sm:grid-cols-2">
          {/* Cafe */}
          <Link
            href="/meniu/cafe"
            className="group relative overflow-hidden rounded-2xl border border-[#c9a86a]/20 bg-[#0e0c0a] px-8 py-10 text-left transition-all duration-500 hover:border-[#c9a86a]/50 hover:-translate-y-1"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: "radial-gradient(ellipse at top left, rgba(201,168,106,0.1), transparent 70%)" }}
            />
            <p className="mb-2 text-[0.6rem] font-semibold uppercase tracking-[0.35em] text-[#c9a86a]/50">
              {lang === "ro" ? "Cafenea" : "Cafe"}
            </p>
            <h2 className="font-display text-2xl font-semibold tracking-[-0.01em] text-[#f5f0e8]">
              Criss Cafe
            </h2>
            <p className="mt-2 text-sm text-[#a89f90]">
              {lang === "ro"
                ? "Cafea, băuturi, deserturi"
                : "Coffee, drinks, desserts"}
            </p>
            <span className="mt-6 inline-block text-[#c9a86a]/50 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#c9a86a]">
              →
            </span>
          </Link>

          {/* Club */}
          <Link
            href="/meniu/club"
            className="group relative overflow-hidden rounded-2xl border border-[#ff3da3]/15 bg-[#0e0c0a] px-8 py-10 text-left transition-all duration-500 hover:border-[#ff3da3]/40 hover:-translate-y-1"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: "radial-gradient(ellipse at top left, rgba(255,61,163,0.08), transparent 70%)" }}
            />
            <p className="mb-2 text-[0.6rem] font-semibold uppercase tracking-[0.35em] text-[#ff3da3]/50">
              Club
            </p>
            <h2 className="font-display text-2xl font-semibold tracking-[-0.01em] text-[#f5f0e8]">
              Criss Club
            </h2>
            <p className="mt-2 text-sm text-[#a89f90]">
              {lang === "ro"
                ? "Sticle, cocktailuri, shots"
                : "Bottles, cocktails, shots"}
            </p>
            <span className="mt-6 inline-block text-[#ff3da3]/40 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#ff3da3]">
              →
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
