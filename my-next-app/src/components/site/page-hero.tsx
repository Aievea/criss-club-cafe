"use client";

import { SiteNav } from "./site-nav";

/** Shared hero shell for the inner route pages. */
export function PageHero({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead: string;
  children?: React.ReactNode;
}) {
  return (
    <main className="relative flex min-h-[100dvh] flex-col overflow-hidden bg-crd-bg font-body text-crd-ink">
      <SiteNav />

      {/* ambient gold aura */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[900px] max-w-[120vw] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(ellipse at center top, rgba(255,255,255,0.06), rgba(255,255,255,0) 60%)",
        }}
      />

      <section className="relative z-10 mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center px-6 pb-20 pt-8 text-center sm:px-8">
        <span className="inline-flex self-center items-center rounded-full border border-white/20 bg-white/[0.05] px-3.5 py-1 text-[0.62rem] uppercase tracking-[0.28em] text-white/70">
          {eyebrow}
        </span>

        <h1 className="mt-5 font-display text-[clamp(2.4rem,7vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.02em] text-balance">
          {title}
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-base leading-[1.75] text-crd-ink/80 text-pretty">
          {lead}
        </p>

        {children && <div className="mt-12">{children}</div>}
      </section>
    </main>
  );
}
