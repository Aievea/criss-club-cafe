"use client";

import { useLanguage } from "@/src/i18n/language-context";
import { DJS } from "@/src/i18n/dictionary";
import { PageHero } from "@/src/components/site/page-hero";
import { ContactActions } from "@/src/components/site/contact-actions";
import { VideoFrame } from "@/src/components/site/video";
import { AddressLink } from "@/src/components/site/address-link";

const EVENTS = [1, 2, 3, 4, 5, 6].map((n) => `/events/event-${n}.jpg`);

export default function CrissClubPage() {
  const { t } = useLanguage();

  return (
    <PageHero eyebrow={t.club.kind} title="Criss Club" lead={t.pages.club}>
      <div className="mx-auto flex max-w-md flex-col items-center gap-8">
        <ul className="space-y-2.5 text-sm text-crd-ink/85">
          <li>{t.club.capacity}</li>
          <li>{t.club.open}</li>
        </ul>

        <VideoFrame src="/videos/criss-club.mp4" className="w-full max-w-xs" />

        <div className="w-full border-y border-white/[0.08] py-6">
          <span className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-crd-gold/80">
            {t.club.djLabel}
          </span>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm">
            {DJS.map((dj, i) => (
              <span key={dj} className="flex items-center gap-3">
                <span className="text-crd-ink/90">{dj}</span>
                {i < DJS.length - 1 && (
                  <span className="text-crd-gold/50">•</span>
                )}
              </span>
            ))}
          </div>
        </div>

        <p className="text-sm text-crd-ink/80">{t.club.events}</p>
        <p className="font-serif text-base italic text-crd-gold/90">
          {t.club.selective}
        </p>

        <ContactActions />
        <AddressLink />
      </div>

      {/* Event posters gallery */}
      <div className="mx-auto mt-16 max-w-3xl">
        <span className="block text-center text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-crd-gold/80">
          {t.club.gallery}
        </span>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {EVENTS.map((src) => (
            <div
              key={src}
              className="group overflow-hidden rounded-2xl ring-1 ring-white/10"
            >
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
