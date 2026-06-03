"use client";

import { useLanguage } from "@/src/i18n/language-context";
import { PageHero } from "@/src/components/site/page-hero";
import { ContactActions } from "@/src/components/site/contact-actions";
import { VideoFrame } from "@/src/components/site/video";
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
    <PageHero eyebrow={t.cafe.kind} title="Criss Cafe" lead={t.pages.cafe}>
      <div className="mx-auto flex w-full max-w-sm flex-col items-center gap-10">

        <VideoFrame src={cafeVideo} className="w-full" />

        <p className="text-sm font-medium tracking-wide text-crd-ink/70">{t.cafe.seats}</p>

        {/* Menu PDF — embedded */}
        <div className="w-full overflow-hidden rounded-2xl ring-1 ring-white/[0.08]">
          <iframe
            src={menuPdf}
            title={lang === "ro" ? "Meniu Criss Cafe" : "Criss Cafe Menu"}
            className="w-full"
            style={{ height: "780px", border: "none" }}
          />
        </div>

        {/* Hours */}
        <div className="w-full rounded-2xl border border-white/[0.08] bg-white/[0.02] px-6 py-5 text-left">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-crd-muted">
            {t.cafe.hoursLabel}
          </p>
          <dl className="space-y-3">
            {t.cafe.hours.map((row) => (
              <div key={row.days} className="flex items-center justify-between gap-4">
                <dt className="text-sm text-crd-ink/70">{row.days}</dt>
                <dd className="text-sm font-medium tabular-nums text-crd-ink">{row.time}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Beers on tap */}
        <div className="w-full">
          <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.22em] text-crd-muted">
            {t.cafe.beers}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {BEERS.map((beer) => (
              <div
                key={beer.name}
                title={beer.name}
                className={`flex h-20 w-32 items-center justify-center rounded-xl px-5 ring-1 transition-transform duration-[450ms] [transition-timing-function:var(--ease-spring)] hover:-translate-y-0.5 ${
                  beer.dark ? "bg-white/[0.04] ring-white/10" : "bg-white ring-black/5"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={beer.src} alt={beer.name} loading="lazy" className="max-h-12 w-auto object-contain" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          <ContactActions />
          <p className="text-xs text-crd-muted">{t.cafe.reservations}</p>
          <AddressLink />
        </div>
      </div>

      {/* Photo gallery */}
      <div className="mx-auto mt-14 max-w-2xl px-6 sm:px-8">
        <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.22em] text-crd-muted">
          {lang === "ro" ? "Galerie" : "Gallery"}
        </p>
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          {PHOTOS.map((src) => (
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
