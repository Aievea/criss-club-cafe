"use client";

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

        {/* Videos */}
        <div className="mt-4 grid grid-cols-1 gap-3 px-4 pb-4 sm:grid-cols-2 sm:px-6 lg:px-8">
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

      </div>
    </main>
  );
}
