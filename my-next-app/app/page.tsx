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

      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[900px] max-w-[130vw] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(ellipse at center top, rgba(255,255,255,0.06), rgba(255,255,255,0) 60%)",
        }}
      />

      <div className="relative z-10 flex flex-1 flex-col">
        {/* Badge */}
        <div className="px-6 pt-5 text-center sm:px-8">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/[0.06] px-3.5 py-1 text-[0.62rem] uppercase tracking-[0.34em] text-white/80">
            <svg width="9" height="12" viewBox="0 0 9 12" fill="currentColor" aria-hidden>
              <path d="M4.5 0A4.5 4.5 0 0 0 0 4.5C0 7.875 4.5 12 4.5 12S9 7.875 9 4.5A4.5 4.5 0 0 0 4.5 0zm0 6.25a1.75 1.75 0 1 1 0-3.5 1.75 1.75 0 0 1 0 3.5z" />
            </svg>
            Târgu Mureș
          </span>
        </div>

        {/* Videos — full width, no max-width cap */}
        <div className="mt-4 grid grid-cols-1 gap-3 px-3 pb-3 sm:grid-cols-2 sm:px-4">
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
        <div className="px-3 pb-4 sm:px-4">
          <Link
            href="/servicii"
            className="group flex w-full items-center justify-between gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.01] px-6 py-4 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-white/20 hover:bg-white/[0.03]"
          >
            <span className="font-display text-xl tracking-tight text-crd-ink transition-colors duration-300 group-hover:text-white sm:text-2xl">
              {t.nav.services}
            </span>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/[0.06] ring-1 ring-white/10 text-crd-ink transition-all duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:bg-white/[0.12]">
              <svg
                width="16"
                height="16"
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
        </div>
      </div>
    </main>
  );
}
