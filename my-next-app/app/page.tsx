"use client";

import Link from "next/link";
import { useLanguage } from "@/src/i18n/language-context";
import { SiteNav } from "@/src/components/site/site-nav";
import { VideoCard } from "@/src/components/site/video";
import cafeVideo from "@/src/assets/video/video-crisscafee/WhatsApp Video 2026-06-01 at 21.26.11.mp4";
import clubVideo from "@/src/assets/video/video-crissclub/WhatsApp Video 2026-06-02 at 17.35.15.mp4";

export default function Home() {
  const { t } = useLanguage();

  return (
    <main className="relative flex min-h-[100dvh] flex-col overflow-hidden bg-crd-bg font-body text-crd-ink">
      <SiteNav />

      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[1000px] max-w-[130vw] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(ellipse at center top, rgba(200,146,42,0.16), rgba(200,146,42,0) 60%)",
        }}
      />

      <section className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-6 pb-20 pt-8 sm:px-8">
        <div className="text-center">
          <span className="inline-flex items-center rounded-full border border-crd-gold/25 bg-crd-gold/[0.06] px-3.5 py-1 text-[0.62rem] uppercase tracking-[0.34em] text-crd-gold/90">
            Târgu Mureș
          </span>

          <h1 className="mt-7 font-display text-[clamp(3rem,10vw,6rem)] font-semibold leading-[0.92] tracking-[-0.02em] text-balance">
            Cris Royal
            <span className="block text-crd-gold">Delivery</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl font-serif text-xl italic leading-snug text-crd-ink/90 text-pretty sm:text-2xl">
            {t.tagline}
          </p>

          <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-crd-muted text-pretty">
            {t.home.lead}
          </p>
        </div>

        {/* Two venues, two videos, side by side */}
        <div className="mt-14 grid grid-cols-1 gap-5 sm:mt-16 sm:grid-cols-2">
          <VideoCard
            src={cafeVideo}
            title="Criss Cafe"
            kind={t.cafe.kind}
            href="/criss-cafe"
            cta={t.home.enter}
          />
          <VideoCard
            src={clubVideo}
            title="Criss Club"
            kind={t.club.kind}
            href="/criss-club"
            cta={t.home.enter}
          />
        </div>

        {/* Services link */}
        <Link
          href="/servicii"
          className="group mx-auto mt-6 flex max-w-5xl items-center justify-between gap-4 rounded-2xl border border-white/[0.08] px-6 py-5 transition-colors duration-300 hover:border-crd-gold/30"
        >
          <span>
            <span className="font-display text-xl tracking-tight text-crd-ink transition-colors duration-300 group-hover:text-crd-gold sm:text-2xl">
              {t.nav.services}
            </span>
            <span className="mt-0.5 block text-xs text-crd-muted">
              Cris Royal Delivery
            </span>
          </span>
          <span className="text-crd-gold transition-transform duration-[450ms] [transition-timing-function:var(--ease-spring)] group-hover:translate-x-1.5">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M5 12h14" />
              <path d="m13 6 6 6-6 6" />
            </svg>
          </span>
        </Link>
      </section>
    </main>
  );
}
