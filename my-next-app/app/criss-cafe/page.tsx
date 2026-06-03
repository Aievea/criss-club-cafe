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

const BEERS = [
  { src: estrelaSrc.src, name: "Estrela Galiza", dark: true },
  { src: erdingerSrc.src, name: "Erdinger Weißbräu", dark: false },
  { src: krombacherSrc.src, name: "Krombacher", dark: false },
];

export default function CrissCafePage() {
  const { t } = useLanguage();

  return (
    <PageHero eyebrow={t.cafe.kind} title="Criss Cafe" lead={t.pages.cafe}>
      <div className="mx-auto flex w-full max-w-sm flex-col items-center gap-10">

        <VideoFrame src={cafeVideo} className="w-full" />

        <p className="text-sm font-medium text-crd-ink/70 tracking-wide">{t.cafe.seats}</p>

        {/* Hours */}
        <div className="w-full rounded-2xl border border-white/[0.08] bg-white/[0.02] px-6 py-5 text-left">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-crd-muted">
            {t.cafe.hoursLabel}
          </p>
          <dl className="space-y-3">
            {t.cafe.hours.map((row) => (
              <div key={row.days} className="flex items-center justify-between gap-4">
                <dt className="text-sm text-crd-ink/70">{row.days}</dt>
                <dd className="text-sm font-medium tabular-nums text-crd-ink">
                  {row.time}
                </dd>
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
    </PageHero>
  );
}
