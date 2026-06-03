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

const BEERS = [
  { src: estrelaSrc.src, name: "Estrela Galiza", dark: true },
  { src: erdingerSrc.src, name: "Erdinger Weißbräu", dark: false },
  { src: krombacherSrc.src, name: "Krombacher", dark: false },
];

const PHOTOS = [p1, p2, p3, p4, p5, p6, p7].map((img) => img.src);

export default function CrissCafePage() {
  const { t, lang } = useLanguage();

  return (
    <PageHero
      eyebrow={t.cafe.kind}
      title="Criss Cafe"
      lead={t.pages.cafe}
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
                <source src={cafeVideo} type="video/mp4" />
              </video>
            </div>

            {/* Info */}
            <div className="flex flex-col gap-4">
              {/* Seats */}
              <div className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.02] px-5 py-4">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-white/40" aria-hidden>
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
                <span className="text-sm text-crd-ink/80">{t.cafe.seats}</span>
              </div>

              {/* Hours */}
              <div className="flex-1 rounded-2xl border border-white/[0.08] bg-white/[0.02] px-5 py-5">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-crd-muted">
                  {t.cafe.hoursLabel}
                </p>
                <dl className="space-y-3">
                  {t.cafe.hours.map((row) => (
                    <div key={row.days} className="flex items-center justify-between gap-4 border-b border-white/[0.05] pb-3 last:border-0 last:pb-0">
                      <dt className="text-sm text-crd-ink/60">{row.days}</dt>
                      <dd className="text-sm font-medium tabular-nums text-crd-ink">{row.time}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Contact */}
              <div className="flex flex-col gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.02] px-5 py-4">
                <ContactActions />
                <p className="text-xs text-crd-muted">{t.cafe.reservations}</p>
                <AddressLink />
              </div>
            </div>
          </div>

          {/* ── Beers ─────────────────────────────────── */}
          <div className="mx-auto mt-16 max-w-5xl px-6 sm:px-8">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.22em] text-crd-muted">
              {t.cafe.beers}
            </p>
            <div className="flex flex-wrap gap-3">
              {BEERS.map((beer) => (
                <div
                  key={beer.name}
                  title={beer.name}
                  className={`flex h-20 w-36 items-center justify-center rounded-xl px-5 ring-1 transition-transform duration-300 hover:-translate-y-0.5 ${
                    beer.dark ? "bg-white/[0.04] ring-white/10" : "bg-white ring-black/5"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={beer.src} alt={beer.name} loading="lazy" className="max-h-12 w-auto object-contain" />
                </div>
              ))}
            </div>
          </div>

          {/* ── Menu ──────────────────────────────────── */}
          <div className="mx-auto mt-16 max-w-5xl px-6 sm:px-8">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-crd-muted">
                {lang === "ro" ? "Meniu" : "Menu"}
              </p>
              <a
                href={menuPdf}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-crd-muted underline-offset-2 hover:text-crd-ink hover:underline transition-colors"
              >
                {lang === "ro" ? "Descarcă PDF" : "Download PDF"}
              </a>
            </div>
            <CafeMenu lang={lang} />
          </div>

          {/* ── Photo gallery ─────────────────────────── */}
          <div className="mx-auto mt-16 max-w-5xl px-6 sm:px-8">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.22em] text-crd-muted">
              {lang === "ro" ? "Galerie" : "Gallery"}
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {/* First photo — double width */}
              <div className="group col-span-2 overflow-hidden rounded-2xl ring-1 ring-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={PHOTOS[0]} alt="" loading="lazy" className="aspect-[16/9] w-full object-cover transition-transform duration-[900ms] [transition-timing-function:var(--ease-expo)] group-hover:scale-105" />
              </div>
              {/* Rest */}
              {PHOTOS.slice(1).map((src) => (
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
      {/* Hero CTA */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <a
          href={menuPdf}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-white/[0.08] px-5 py-2.5 text-sm font-medium text-crd-ink ring-1 ring-white/15 transition-all duration-300 hover:bg-white/[0.14]"
        >
          {lang === "ro" ? "Vezi meniul" : "View menu"}
        </a>
        <a
          href="tel:+40"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 text-sm font-medium text-crd-ink/70 transition-all duration-300 hover:border-white/20 hover:text-crd-ink"
        >
          {lang === "ro" ? "Rezervare" : "Book a table"}
        </a>
      </div>
    </PageHero>
  );
}
