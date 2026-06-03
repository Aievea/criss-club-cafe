"use client";

import { useLanguage } from "@/src/i18n/language-context";
import { DJS } from "@/src/i18n/dictionary";
import { PageHero } from "@/src/components/site/page-hero";
import { ContactActions } from "@/src/components/site/contact-actions";
import { VideoFrame } from "@/src/components/site/video";
import { AddressLink } from "@/src/components/site/address-link";
import clubVideo from "@/src/assets/video/video-crissclub/WhatsApp Video 2026-06-02 at 17.35.15.mp4";
import ev1 from "@/src/assets/images/images-crissclub/djs/WhatsApp Image 2026-06-01 at 21.29.01 (1).jpeg";
import ev2 from "@/src/assets/images/images-crissclub/djs/WhatsApp Image 2026-06-02 at 17.36.51.jpeg";
import ev3 from "@/src/assets/images/images-crissclub/djs/WhatsApp Image 2026-06-02 at 17.36.51 (1).jpeg";
import ev4 from "@/src/assets/images/images-crissclub/djs/WhatsApp Image 2026-06-02 at 17.36.51 (2).jpeg";
import ev5 from "@/src/assets/images/images-crissclub/djs/WhatsApp Image 2026-06-02 at 17.36.52.jpeg";
import ev6 from "@/src/assets/images/images-crissclub/djs/WhatsApp Image 2026-06-02 at 17.36.52 (1).jpeg";

const EVENTS = [ev1, ev2, ev3, ev4, ev5, ev6].map((img) => img.src);

export default function CrissClubPage() {
  const { t, lang } = useLanguage();

  return (
    <PageHero eyebrow={t.club.kind} title="Criss Club" lead={t.pages.club}>
      <div className="mx-auto flex w-full max-w-sm flex-col items-center gap-10">

        <VideoFrame src={clubVideo} className="w-full" />

        {/* Key info */}
        <div className="flex w-full flex-col gap-2.5">
          <div className="flex items-center justify-between rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3">
            <span className="text-sm text-crd-muted">{t.club.capacity.split(":")[0]}</span>
            <span className="text-sm font-medium text-crd-ink">220+</span>
          </div>
          <div className="flex items-center justify-between rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3">
            <span className="text-sm text-crd-muted">{t.club.open.includes("04") ? "Program" : "Hours"}</span>
            <span className="text-sm font-medium text-crd-ink">04:00</span>
          </div>
        </div>

        {/* DJs */}
        <div className="w-full rounded-2xl border border-white/[0.08] bg-white/[0.02] px-6 py-5 text-left">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-crd-muted">
            {t.club.djLabel}
          </p>
          <div className="flex flex-wrap gap-2">
            {DJS.map((dj) => (
              <span key={dj} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-sm text-crd-ink/90">
                {dj}
              </span>
            ))}
          </div>
        </div>

        {/* Events */}
        <div className="w-full rounded-2xl border border-white/[0.08] bg-white/[0.02] px-6 py-5 text-left">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-crd-muted">
            {lang === "ro" ? "Evenimente" : "Events"}
          </p>
          <div className="flex flex-wrap gap-2">
            {(t.club.events.split(" • ")).map((ev) => (
              <span key={ev} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-sm text-crd-ink/85">
                {ev}
              </span>
            ))}
          </div>
          <p className="mt-4 text-sm leading-relaxed text-crd-muted">{t.club.selective}</p>
        </div>

        <div className="flex flex-col items-center gap-3">
          <ContactActions />
          <AddressLink />
        </div>
      </div>

      {/* Gallery */}
      <div className="mx-auto mt-14 max-w-2xl px-6 sm:px-8">
        <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.22em] text-crd-muted">
          {t.club.gallery}
        </p>
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          {EVENTS.map((src) => (
            <div key={src} className="group overflow-hidden rounded-xl ring-1 ring-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt=""
                loading="lazy"
                className="aspect-[4/5] w-full object-cover transition-transform duration-[900ms] [transition-timing-function:var(--ease-expo)] group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </PageHero>
  );
}
