"use client";

import { SiteNav } from "./site-nav";

export function PageHero({
  eyebrow,
  title,
  lead,
  children,
  below,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead: string;
  children?: React.ReactNode;
  below?: React.ReactNode;
}) {
  return (
    <main className="relative flex flex-col overflow-hidden bg-crd-bg font-body text-crd-ink">
      <SiteNav />

      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[900px] max-w-[120vw] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(ellipse at center top, rgba(255,255,255,0.06), rgba(255,255,255,0) 60%)",
        }}
      />

      {/* Hero */}
      <section className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-6 pb-14 pt-10 text-center sm:px-8">
        <span className="inline-flex items-center rounded-full border border-white/20 bg-white/[0.05] px-3.5 py-1 text-[0.62rem] uppercase tracking-[0.28em] text-white/70">
          {eyebrow}
        </span>

        <h1 className="mt-5 font-display text-[clamp(2.4rem,7vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.02em] text-balance">
          {title}
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-base leading-[1.75] text-crd-ink/80 text-pretty">
          {lead}
        </p>

        {children && <div className="mt-10 w-full">{children}</div>}
      </section>

      {/* Full-width sections after hero */}
      {below}
    </main>
  );
}
