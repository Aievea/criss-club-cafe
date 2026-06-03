"use client";

import { useLanguage } from "@/src/i18n/language-context";
import { DJS } from "@/src/i18n/dictionary";
import { PageHero } from "@/src/components/site/page-hero";
import { ContactActions } from "@/src/components/site/contact-actions";
import { VideoFrame } from "@/src/components/site/video";
import { AddressLink } from "@/src/components/site/address-link";
import clubVideo from "@/src/assets/video/video-crissclub/WhatsApp Video 2026-06-02 at 17.35.15.mp4";
import dj1 from "@/src/assets/images/images-crissclub/djs/WhatsApp Image 2026-06-01 at 21.29.01 (1).jpeg";
import dj2 from "@/src/assets/images/images-crissclub/djs/WhatsApp Image 2026-06-02 at 17.36.51.jpeg";
import dj3 from "@/src/assets/images/images-crissclub/djs/WhatsApp Image 2026-06-02 at 17.36.51 (1).jpeg";
import dj4 from "@/src/assets/images/images-crissclub/djs/WhatsApp Image 2026-06-02 at 17.36.51 (2).jpeg";
import dj5 from "@/src/assets/images/images-crissclub/djs/WhatsApp Image 2026-06-02 at 17.36.52.jpeg";
import dj6 from "@/src/assets/images/images-crissclub/djs/WhatsApp Image 2026-06-02 at 17.36.52 (1).jpeg";
import dj7 from "@/src/assets/images/images-crissclub/djs/WhatsApp Image 2026-06-02 at 17.36.52 (2).jpeg";
import dj8 from "@/src/assets/images/images-crissclub/djs/WhatsApp Image 2026-06-02 at 17.36.52 (3).jpeg";
import dj9 from "@/src/assets/images/images-crissclub/djs/WhatsApp Image 2026-06-02 at 17.38.10.jpeg";

const DJ_PHOTOS = [dj1, dj2, dj3, dj4, dj5, dj6, dj7, dj8, dj9].map((img) => img.src);

export default function CrissClubPage() {
  const { t, lang } = useLanguage();

  return (
    <PageHero eyebrow={t.club.kind} title="Criss Club" lead={t.pages.club}>
      <div className="mx-auto flex w-full max-w-sm flex-col items-center gap-10">

        <VideoFrame src={clubVideo} className="w-full" />

        {/* Key info */}
        <div className="flex w-full flex-col gap-2.5">
          <div className="flex items-center justify-between rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3">
            <span className="text-sm text-crd-muted">{lang === "ro" ? "Capacitate" : "Capacity"}</span>
            <span className="text-sm font-medium text-crd-ink">220+</span>
          </div>
          <div className="flex items-center justify-between rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3">
            <span className="text-sm text-crd-muted">{lang === "ro" ? "Program" : "Hours"}</span>
            <span className="text-sm font-medium text-crd-ink">{lang === "ro" ? "Până la 04:00" : "Until 4:00 AM"}</span>
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
            {t.club.events.split(" • ").map((ev) => (
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

      {/* DJs section */}
      <div className="mx-auto mt-14 max-w-2xl px-6 sm:px-8">
        <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.22em] text-crd-muted">
          DJs
        </p>
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          {DJ_PHOTOS.map((src) => (
            <div key={src} className="group overflow-hidden rounded-xl ring-1 ring-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt=""
                loading="lazy"
                className="aspect-square w-full object-cover transition-transform duration-[900ms] [transition-timing-function:var(--ease-expo)] group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </PageHero>
  );
}
