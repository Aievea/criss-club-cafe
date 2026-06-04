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
import { PHONE_TEL, PHONE_DISPLAY } from "@/src/lib/contact";

const DJ_PHOTOS = [dj1, dj2, dj3, dj4, dj5, dj6, dj7, dj8, dj9].map((img) => img.src);

function GoldDivider() {
  return (
    <div className="mx-auto max-w-5xl px-6 sm:px-8">
      <span className="block h-px bg-gradient-to-r from-transparent via-[#c9a86a]/30 to-transparent" />
    </div>
  );
}

function SectionHead({ eyebrow, title }: { eyebrow: string; title: React.ReactNode }) {
  return (
    <div className="mb-10 flex flex-col items-start gap-2.5">
      <span className="flex items-center gap-2.5 text-[0.65rem] font-semibold uppercase tracking-[0.36em] text-[#c9a86a]/75">
        <span className="h-px w-6 bg-[#c9a86a]/50" />
        {eyebrow}
      </span>
      <h2 className="font-display text-[clamp(1.5rem,3.2vw,2.4rem)] font-semibold leading-tight tracking-[-0.02em] text-[#f5f0e8]">
        {title}
      </h2>
    </div>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col gap-1.5 rounded-2xl border border-[#c9a86a]/15 bg-white/[0.025] px-5 py-5 ring-1 ring-[#c9a86a]/[0.04]">
      <span className="font-display text-3xl font-semibold tracking-[-0.02em] text-[#c9a86a]">{value}</span>
      <span className="text-xs text-[#a89f90]">{label}</span>
    </div>
  );
}

export default function CrissClubPage() {
  const { t, lang } = useLanguage();

  return (
    <PageHero
      eyebrow={t.club.kind}
      title="Criss Club"
      lead={t.pages.club}
      below={
        <div className="w-full">
          {/* ── Video + Info ─────────────────────────── */}
          <div className="relative">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-16 left-1/2 h-[300px] w-[700px] max-w-full -translate-x-1/2"
              style={{ background: "radial-gradient(ellipse, rgba(255,61,163,0.06), transparent 65%)" }}
            />
            <div className="mx-auto grid max-w-5xl gap-5 px-6 sm:px-8 lg:grid-cols-2">
              {/* Video */}
              <div className="relative overflow-hidden rounded-3xl shadow-[0_24px_64px_rgba(0,0,0,0.55)] ring-1 ring-white/[0.08]">
                <video
                  className="aspect-video w-full object-cover"
                  autoPlay muted loop playsInline preload="metadata"
                >
                  <source src={clubVideo} type="video/mp4" />
                </video>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/30 via-transparent to-transparent" />
              </div>

              {/* Info stack */}
              <div className="flex flex-col gap-4">
                {/* Key stats */}
                <div className="grid grid-cols-2 gap-3">
                  <StatCard value="220+" label={lang === "ro" ? "Capacitate persoane" : "Guest capacity"} />
                  <StatCard value="04:00" label={lang === "ro" ? "Program nocturn" : "Closing time"} />
                </div>

                {/* DJs card */}
                <div className="rounded-2xl border border-[#c9a86a]/15 bg-white/[0.025] px-5 py-5 ring-1 ring-[#c9a86a]/[0.04]">
                  <p className="mb-4 flex items-center gap-2.5 text-[0.63rem] font-semibold uppercase tracking-[0.3em] text-[#c9a86a]/75">
                    <span className="h-px w-5 bg-[#c9a86a]/40" />
                    {t.club.djLabel}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {DJS.map((dj) => (
                      <span
                        key={dj}
                        className="rounded-full border border-[#c9a86a]/20 bg-[#c9a86a]/[0.06] px-3.5 py-1.5 text-sm font-medium text-[#f5f0e8]/90"
                      >
                        {dj}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Events card */}
                <div className="rounded-2xl border border-[#ff3da3]/15 bg-[#ff3da3]/[0.03] px-5 py-5 ring-1 ring-[#ff3da3]/[0.04]">
                  <p className="mb-4 flex items-center gap-2.5 text-[0.63rem] font-semibold uppercase tracking-[0.3em] text-[#ff3da3]/70">
                    <span className="h-px w-5 bg-[#ff3da3]/40" />
                    {lang === "ro" ? "Evenimente" : "Events"}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {t.club.events.split(" • ").map((ev) => (
                      <span key={ev} className="rounded-full border border-[#ff3da3]/20 bg-[#ff3da3]/[0.06] px-3.5 py-1.5 text-sm text-[#f5f0e8]/85">
                        {ev}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Contact card */}
                <div className="rounded-2xl border border-[#c9a86a]/15 bg-white/[0.025] px-5 py-5 ring-1 ring-[#c9a86a]/[0.04]">
                  <p className="mb-4 flex items-center gap-2.5 text-[0.63rem] font-semibold uppercase tracking-[0.3em] text-[#c9a86a]/75">
                    <span className="h-px w-5 bg-[#c9a86a]/40" />
                    {lang === "ro" ? "Contact" : "Contact"}
                  </p>
                  <ContactActions />
                  <div className="mt-3"><AddressLink /></div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Selective notice ─────────────────────── */}
          <div className="mx-auto mt-8 max-w-5xl px-6 sm:px-8">
            <div className="relative overflow-hidden rounded-2xl border border-[#c9a86a]/15 bg-white/[0.02] px-6 py-5">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-50"
                style={{ background: "radial-gradient(ellipse at left, rgba(201,168,106,0.06), transparent 60%)" }}
              />
              <p className="relative font-serif text-base italic leading-relaxed text-[#c9a86a]/85">
                ✦ {t.club.selective}
              </p>
            </div>
          </div>

          {/* ── Divider ─── */}
          <div className="mt-16"><GoldDivider /></div>

          {/* ── DJ Gallery ───────────────────────────── */}
          <div className="mx-auto mt-16 max-w-5xl px-6 sm:px-8">
            <SectionHead
              eyebrow={lang === "ro" ? "În cabine" : "In the booth"}
              title={lang === "ro" ? "Rezidenți & artişti" : "Residents & artists"}
            />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {/* First photo — wide span */}
              <div className="group col-span-2 overflow-hidden rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.45)] ring-1 ring-[#c9a86a]/15 sm:col-span-1">
                <div className="relative aspect-square">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={DJ_PHOTOS[0]}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1000ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.04]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1a1411]/55 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>
              </div>
              {DJ_PHOTOS.slice(1).map((src) => (
                <div key={src} className="group overflow-hidden rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.35)] ring-1 ring-[#c9a86a]/15">
                  <div className="relative aspect-square">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1000ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.04]"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1a1411]/55 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── CTA band ──────────────────────────────── */}
          <div className="relative mt-24 overflow-hidden pb-20">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{ background: "linear-gradient(180deg, transparent, rgba(255,61,163,0.04) 50%, transparent)" }}
            />
            <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8 text-center">
              <p className="font-serif italic text-lg text-[#f5f0e8]/65 mb-8">
                {lang === "ro"
                  ? "Rezervă-ți locul pentru seara perfectă"
                  : "Book your spot for the perfect night"}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href={`tel:${PHONE_TEL}`}
                  className="inline-flex items-center gap-3 rounded-full bg-[#c9a86a] px-7 py-3.5 text-[11px] font-semibold tracking-[0.28em] uppercase text-[#1a1411] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-10px_rgba(201,168,106,0.5)]"
                >
                  {lang === "ro" ? "Rezervare" : "Book now"} · {PHONE_DISPLAY}
                </a>
                <a
                  href="https://wa.me/40746521799"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-full border border-[#25d366]/30 px-7 py-3.5 text-[11px] font-medium tracking-[0.28em] uppercase text-[#25d366]/80 transition-all duration-300 hover:border-[#25d366]/60 hover:text-[#25d366]"
                >
                  WhatsApp →
                </a>
              </div>
            </div>
          </div>
        </div>
      }
    >
      {/* Hero CTAs */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <a
          href={`tel:${PHONE_TEL}`}
          className="inline-flex items-center gap-2 rounded-full bg-[#c9a86a] px-6 py-3 text-[11px] font-semibold tracking-[0.28em] uppercase text-[#1a1411] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-8px_rgba(201,168,106,0.5)]"
        >
          {lang === "ro" ? "Rezervare" : "Book now"} →
        </a>
        <a
          href="https://wa.me/40746521799"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-[11px] font-medium tracking-[0.28em] uppercase text-[#f5f0e8]/70 transition-all duration-300 hover:border-white/40 hover:text-[#f5f0e8]"
        >
          WhatsApp
        </a>
      </div>
    </PageHero>
  );
}
