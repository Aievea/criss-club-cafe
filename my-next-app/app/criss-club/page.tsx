"use client";

import { useLanguage } from "@/src/i18n/language-context";
import { DJS } from "@/src/i18n/dictionary";
import { PageHero } from "@/src/components/site/page-hero";
import { ContactActions } from "@/src/components/site/contact-actions";
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
    <PageHero
      eyebrow={t.club.kind}
      title="Criss Club"
      lead={t.pages.club}
      below={
        <div className="w-full pb-20">

          {/* ── Video + Info row ───────────────────────── */}
          <div className="mx-auto grid max-w-5xl gap-5 px-6 sm:px-8 lg:grid-cols-2">
            {/* Video */}
            <div className="overflow-hidden rounded-2xl ring-1 ring-white/10">
              <video
                className="aspect-video w-full object-cover"
                autoPlay muted loop playsInline preload="metadata"
              >
                <source src={clubVideo} type="video/mp4" />
              </video>
            </div>

            {/* Info */}
            <div className="flex flex-col gap-4">
              {/* Key stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1 rounded-2xl border border-white/[0.08] bg-white/[0.02] px-5 py-4">
                  <span className="text-2xl font-display font-semibold text-crd-ink">220+</span>
                  <span className="text-xs text-crd-muted">{lang === "ro" ? "Capacitate" : "Capacity"}</span>
                </div>
                <div className="flex flex-col gap-1 rounded-2xl border border-white/[0.08] bg-white/[0.02] px-5 py-4">
                  <span className="text-2xl font-display font-semibold text-crd-ink">04:00</span>
                  <span className="text-xs text-crd-muted">{lang === "ro" ? "Program" : "Hours"}</span>
                </div>
              </div>

              {/* DJs */}
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] px-5 py-5">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-crd-muted">
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
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] px-5 py-5">
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
              </div>

              {/* Contact */}
              <div className="flex flex-col gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.02] px-5 py-4">
                <ContactActions />
                <AddressLink />
              </div>
            </div>
          </div>

          {/* ── Selective note ────────────────────────── */}
          <div className="mx-auto mt-8 max-w-5xl px-6 sm:px-8">
            <p className="rounded-2xl border border-white/[0.06] bg-white/[0.02] px-6 py-4 text-sm italic text-crd-muted">
              {t.club.selective}
            </p>
          </div>

          {/* ── DJs photo gallery ─────────────────────── */}
          <div className="mx-auto mt-16 max-w-5xl px-6 sm:px-8">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.22em] text-crd-muted">
              DJs
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-3">
              {/* First photo — wide */}
              <div className="group col-span-2 overflow-hidden rounded-2xl ring-1 ring-white/10 sm:col-span-1 lg:col-span-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={DJ_PHOTOS[0]} alt="" loading="lazy" className="aspect-square w-full object-cover transition-transform duration-[900ms] [transition-timing-function:var(--ease-expo)] group-hover:scale-105" />
              </div>
              {DJ_PHOTOS.slice(1).map((src) => (
                <div key={src} className="group overflow-hidden rounded-2xl ring-1 ring-white/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="" loading="lazy" className="aspect-square w-full object-cover transition-transform duration-[900ms] [transition-timing-function:var(--ease-expo)] group-hover:scale-105" />
                </div>
              ))}
            </div>
          </div>

        </div>
      }
    >
      {/* Hero CTAs */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <a
          href="tel:+40"
          className="inline-flex items-center gap-2 rounded-full bg-white/[0.08] px-5 py-2.5 text-sm font-medium text-crd-ink ring-1 ring-white/15 transition-all duration-300 hover:bg-white/[0.14]"
        >
          {lang === "ro" ? "Rezervare" : "Book now"}
        </a>
      </div>
    </PageHero>
  );
}
