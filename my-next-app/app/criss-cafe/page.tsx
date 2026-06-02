"use client";

import { useLanguage } from "@/src/i18n/language-context";
import { PageHero } from "@/src/components/site/page-hero";
import { ContactActions } from "@/src/components/site/contact-actions";
import { VideoFrame } from "@/src/components/site/video";
import { AddressLink } from "@/src/components/site/address-link";

const BEERS = [
  { src: "/beers/estrela.svg", name: "Estrela Galiza", dark: true },
  { src: "/beers/erdinger.svg", name: "Erdinger Weißbräu", dark: false },
  { src: "/beers/krombacher.svg", name: "Krombacher", dark: false },
];

export default function CrissCafePage() {
  const { t } = useLanguage();

  return (
    <PageHero eyebrow={t.cafe.kind} title="Criss Cafe" lead={t.pages.cafe}>
      <div className="mx-auto flex max-w-md flex-col items-center gap-9">
        <p className="text-sm text-crd-ink/80">{t.cafe.seats}</p>

        <VideoFrame src="/videos/criss-cafe.mp4" className="w-full max-w-xs" />

        <div className="w-full border-y border-white/[0.08] py-6 text-left">
          <span className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-crd-gold/80">
            {t.cafe.hoursLabel}
          </span>
          <dl className="mt-4 space-y-2">
            {t.cafe.hours.map((row) => (
              <div
                key={row.days}
                className="flex items-baseline justify-between gap-4 text-sm"
              >
                <dt className="text-crd-ink/75">{row.days}</dt>
                <dd className="tabular-nums tracking-wide text-crd-ink/90">
                  {row.time}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Beers on tap */}
        <div className="w-full">
          <span className="block text-center text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-crd-gold/80">
            {t.cafe.beers}
          </span>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            {BEERS.map((beer) => (
              <div
                key={beer.name}
                title={beer.name}
                className={`flex h-20 w-32 items-center justify-center rounded-2xl px-5 ring-1 transition-transform duration-[450ms] [transition-timing-function:var(--ease-spring)] hover:-translate-y-0.5 ${
                  beer.dark
                    ? "bg-white/[0.04] ring-white/10"
                    : "bg-white ring-black/5"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={beer.src}
                  alt={beer.name}
                  loading="lazy"
                  className="max-h-12 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        <ContactActions />
        <p className="text-xs text-crd-muted">{t.cafe.reservations}</p>
        <AddressLink />
      </div>
    </PageHero>
  );
}
