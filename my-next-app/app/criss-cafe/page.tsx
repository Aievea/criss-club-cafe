"use client";

import { useLanguage } from "@/src/i18n/language-context";
import { PageHero } from "@/src/components/site/page-hero";
import { ContactActions } from "@/src/components/site/contact-actions";
import { CafeMenu } from "@/src/components/site/cafe-menu";
import { AddressLink } from "@/src/components/site/address-link";
import estrelaSrc from "@/src/assets/bere/Estrela_Galiza.svg";
import erdingerSrc from "@/src/assets/bere/Erdinger_Weißbräu_logo.svg";
import krombacherSrc from "@/src/assets/bere/krombacher-vector-logo.svg";
import cafeVideo from "@/src/assets/video/video-crisscafee/WhatsApp Video 2026-06-01 at 21.26.11.mp4";
import menuPdf from "@/src/assets/meniu/Meniu Criss Cafe.pdf";
import p1 from "@/src/assets/images/images-crisscafee/WhatsApp Image 2026-06-01 at 21.25.25.jpeg";
import p2 from "@/src/assets/images/images-crisscafee/WhatsApp Image 2026-06-01 at 21.25.27.jpeg";
import p3 from "@/src/assets/images/images-crisscafee/WhatsApp Image 2026-06-01 at 21.28.55.jpeg";
import p4 from "@/src/assets/images/images-crisscafee/WhatsApp Image 2026-06-01 at 21.28.56.jpeg";
import p5 from "@/src/assets/images/images-crisscafee/WhatsApp Image 2026-06-01 at 21.28.57 (1).jpeg";
import p6 from "@/src/assets/images/images-crisscafee/WhatsApp Image 2026-06-01 at 21.29.01.jpeg";
import p7 from "@/src/assets/images/images-crisscafee/WhatsApp Image 2026-06-01 at 21.29.01 (1).jpeg";
import { PHONE_TEL, PHONE_DISPLAY } from "@/src/lib/contact";

const BEERS = [
  { src: estrelaSrc.src, name: "Estrela Galiza", dark: true },
  { src: erdingerSrc.src, name: "Erdinger Weißbräu", dark: false },
  { src: krombacherSrc.src, name: "Krombacher", dark: false },
];

const PHOTOS = [p1, p2, p3, p4, p5, p6, p7].map((img) => img.src);

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

export default function CrissCafePage() {
  const { t, lang } = useLanguage();

  return (
    <PageHero
      eyebrow={t.cafe.kind}
      title="Criss Cafe"
      lead={t.pages.cafe}
      below={
        <div className="w-full">
          {/* ── Video + Info ─────────────────────────── */}
          <div className="relative">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-16 left-1/2 h-[300px] w-[700px] max-w-full -translate-x-1/2"
              style={{ background: "radial-gradient(ellipse, rgba(201,168,106,0.07), transparent 65%)" }}
            />
            <div className="mx-auto grid max-w-5xl gap-5 px-6 sm:px-8 lg:grid-cols-2">
              {/* Video */}
              <div className="relative overflow-hidden rounded-3xl shadow-[0_24px_64px_rgba(0,0,0,0.55)] ring-1 ring-white/[0.08]">
                <video
                  className="aspect-video w-full object-cover"
                  autoPlay muted loop playsInline preload="metadata"
                >
                  <source src={cafeVideo} type="video/mp4" />
                </video>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/30 via-transparent to-transparent" />
              </div>

              {/* Info stack */}
              <div className="flex flex-col gap-4">
                {/* Seats card */}
                <div className="flex items-center gap-4 rounded-2xl border border-[#c9a86a]/15 bg-white/[0.025] px-5 py-4 ring-1 ring-[#c9a86a]/[0.04]">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#c9a86a]/25 bg-[#c9a86a]/[0.08] text-[#c9a86a]">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </span>
                  <div>
                    <div className="text-sm font-medium text-[#f5f0e8]">{t.cafe.seats}</div>
                    <div className="mt-0.5 text-xs text-[#a89f90]">Piața Trandafirilor 43, Tg. Mureș</div>
                  </div>
                </div>

                {/* Hours card */}
                <div className="flex-1 rounded-2xl border border-[#c9a86a]/15 bg-white/[0.025] px-5 py-5 ring-1 ring-[#c9a86a]/[0.04]">
                  <p className="mb-4 flex items-center gap-2.5 text-[0.63rem] font-semibold uppercase tracking-[0.3em] text-[#c9a86a]/75">
                    <span className="h-px w-5 bg-[#c9a86a]/40" />
                    {t.cafe.hoursLabel}
                  </p>
                  <dl className="space-y-2.5">
                    {t.cafe.hours.map((row) => (
                      <div key={row.days} className="flex items-center justify-between border-b border-[#c9a86a]/[0.09] pb-2.5 last:border-0 last:pb-0">
                        <dt className="text-sm text-[#f5f0e8]/60">{row.days}</dt>
                        <dd className="text-sm font-medium tabular-nums text-[#f5f0e8]">{row.time}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                {/* Contact card */}
                <div className="rounded-2xl border border-[#c9a86a]/15 bg-white/[0.025] px-5 py-5 ring-1 ring-[#c9a86a]/[0.04]">
                  <p className="mb-4 flex items-center gap-2.5 text-[0.63rem] font-semibold uppercase tracking-[0.3em] text-[#c9a86a]/75">
                    <span className="h-px w-5 bg-[#c9a86a]/40" />
                    {t.cafe.contactLabel}
                  </p>
                  <ContactActions />
                  <p className="mt-3 text-xs text-[#a89f90]">{t.cafe.reservations}</p>
                  <div className="mt-3"><AddressLink /></div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Divider ─── */}
          <div className="mt-16"><GoldDivider /></div>

          {/* ── Beers ─────────────────────────────────── */}
          <div className="mx-auto mt-16 max-w-5xl px-6 sm:px-8">
            <SectionHead
              eyebrow={lang === "ro" ? "La halbă" : "On tap"}
              title={t.cafe.beers}
            />
            <div className="flex flex-wrap gap-4">
              {BEERS.map((beer) => (
                <div
                  key={beer.name}
                  title={beer.name}
                  className={`group flex h-20 w-40 items-center justify-center rounded-2xl px-5 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_14px_36px_rgba(0,0,0,0.45)] ${
                    beer.dark
                      ? "bg-white/[0.04] ring-1 ring-[#c9a86a]/20"
                      : "bg-white ring-1 ring-black/5"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={beer.src} alt={beer.name} loading="lazy" className="max-h-12 w-auto object-contain" />
                </div>
              ))}
            </div>
          </div>

          {/* ── Divider ─── */}
          <div className="mt-16"><GoldDivider /></div>

          {/* ── Menu ──────────────────────────────────── */}
          <div className="mx-auto mt-16 max-w-5xl px-6 sm:px-8">
            <div className="mb-8 flex items-end justify-between">
              <SectionHead
                eyebrow={lang === "ro" ? "La masă" : "At the table"}
                title={lang === "ro" ? "Meniu" : "Menu"}
              />
              <a
                href={menuPdf}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-1 inline-flex items-center gap-2 rounded-full border border-[#c9a86a]/30 px-4 py-2 text-[0.68rem] tracking-[0.2em] uppercase text-[#c9a86a]/75 transition-all duration-300 hover:bg-[#c9a86a]/10 hover:text-[#c9a86a]"
              >
                {lang === "ro" ? "Descarcă PDF" : "Download PDF"} ↓
              </a>
            </div>
            <CafeMenu lang={lang} />
          </div>

          {/* ── Divider ─── */}
          <div className="mt-16"><GoldDivider /></div>

          {/* ── Gallery ───────────────────────────────── */}
          <div className="mx-auto mt-16 max-w-5xl px-6 sm:px-8">
            <SectionHead
              eyebrow={lang === "ro" ? "Spațiul nostru" : "Our space"}
              title={lang === "ro" ? "Galerie foto" : "Gallery"}
            />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              <div className="group col-span-2 overflow-hidden rounded-2xl ring-1 ring-[#c9a86a]/15 shadow-[0_8px_32px_rgba(0,0,0,0.35)]">
                <div className="relative aspect-[16/9]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={PHOTOS[0]} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-[1000ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.04]" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1a1411]/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>
              </div>
              {PHOTOS.slice(1).map((src) => (
                <div key={src} className="group overflow-hidden rounded-2xl ring-1 ring-[#c9a86a]/15 shadow-[0_4px_16px_rgba(0,0,0,0.3)]">
                  <div className="relative aspect-square">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-[1000ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.04]" />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1a1411]/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
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
              style={{ background: "linear-gradient(180deg, transparent, rgba(201,168,106,0.05) 50%, transparent)" }}
            />
            <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8 text-center">
              <p className="font-serif italic text-lg text-[#f5f0e8]/65 mb-8">
                {lang === "ro"
                  ? "Rezervă-ți masa sau descarcă meniul complet"
                  : "Reserve your table or download the full menu"}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href={`tel:${PHONE_TEL}`}
                  className="inline-flex items-center gap-3 rounded-full bg-[#c9a86a] px-7 py-3.5 text-[11px] font-semibold tracking-[0.28em] uppercase text-[#1a1411] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-10px_rgba(201,168,106,0.5)]"
                >
                  {lang === "ro" ? "Rezervare" : "Book a table"} · {PHONE_DISPLAY}
                </a>
                <a
                  href={menuPdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-full border border-white/20 px-7 py-3.5 text-[11px] font-medium tracking-[0.28em] uppercase text-[#f5f0e8]/75 transition-all duration-300 hover:border-[#c9a86a]/50 hover:text-[#c9a86a]"
                >
                  {lang === "ro" ? "Meniu PDF" : "PDF Menu"} →
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
          href={menuPdf}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-[#c9a86a] px-6 py-3 text-[11px] font-semibold tracking-[0.28em] uppercase text-[#1a1411] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-8px_rgba(201,168,106,0.5)]"
        >
          {lang === "ro" ? "Vezi meniul" : "View menu"} →
        </a>
        <a
          href={`tel:${PHONE_TEL}`}
          className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-[11px] font-medium tracking-[0.28em] uppercase text-[#f5f0e8]/70 transition-all duration-300 hover:border-white/40 hover:text-[#f5f0e8]"
        >
          {lang === "ro" ? "Rezervare" : "Book a table"}
        </a>
      </div>
    </PageHero>
  );
}
