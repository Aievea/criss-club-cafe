"use client";

import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { Reveal } from "@/src/components/footer/reveal";
import { useLanguage } from "@/src/i18n/language-context";
import { ReservationModal } from "@/src/components/site/reservation-modal";
import dj2 from "@/src/assets/images/images-crissclub/djs/WhatsApp Image 2026-06-02 at 17.36.51.jpeg";
import dj3 from "@/src/assets/images/images-crissclub/djs/WhatsApp Image 2026-06-02 at 17.36.51 (1).jpeg";
import dj4 from "@/src/assets/images/images-crissclub/djs/WhatsApp Image 2026-06-02 at 17.36.51 (2).jpeg";
import dj5 from "@/src/assets/images/images-crissclub/djs/WhatsApp Image 2026-06-02 at 17.36.52.jpeg";
import dj6 from "@/src/assets/images/images-crissclub/djs/WhatsApp Image 2026-06-02 at 17.36.52 (1).jpeg";
import dj7 from "@/src/assets/images/images-crissclub/djs/WhatsApp Image 2026-06-02 at 17.36.52 (2).jpeg";
import dj8 from "@/src/assets/images/images-crissclub/djs/WhatsApp Image 2026-06-02 at 17.36.52 (3).jpeg";
import dj9 from "@/src/assets/images/images-crissclub/djs/WhatsApp Image 2026-06-02 at 17.38.10.jpeg";

type Event = { date: string; title: string; who: string; img: StaticImageData };

const EVENTS: Event[] = [
  { date: "06 iunie · 22:00", title: "Everybody's Night",           who: "DJ Criss Club",        img: dj2 },
  { date: "07 iunie · 22:00", title: "Charisma Night",              who: "DJ Criss Club",        img: dj3 },
  { date: "12 iunie · 22:00", title: "Live Music · Special Guests", who: "Special Guests",       img: dj4 },
  { date: "13 iunie · 22:00", title: "Latino Night",                who: "DJ Criss Club",        img: dj5 },
  { date: "19 iunie · 22:00", title: "Retro Night",                 who: "DJ Criss Club",        img: dj6 },
  { date: "20 iunie · 22:00", title: "Anniversary Night · Live",    who: "Criss Club",           img: dj7 },
  { date: "26 iunie · 22:00", title: "Summer Night",                who: "DJ Criss Club",        img: dj8 },
  { date: "27 iunie · 22:00", title: "Special Event",               who: "DJ Criss Club",        img: dj9 },
];

export function ClubLineup() {
  const { t } = useLanguage();
  const l = t.lineup;
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <ReservationModal open={modalOpen} onClose={() => setModalOpen(false)} />

      <section
        id="noapte"
        className="relative overflow-hidden py-40 text-crd-ink"
        style={{ background: "#050402" }}
      >
        {/* Background gradients */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: `
              radial-gradient(50% 40% at 20% 20%, rgba(255,61,163,0.18) 0%, transparent 70%),
              radial-gradient(40% 40% at 90% 80%, rgba(28,177,194,0.14) 0%, transparent 70%)
            `,
          }}
        />

        {/* Section head */}
        <Reveal>
        <div className="relative z-10 mx-auto mb-20 max-w-[1100px] px-9 text-center">
          <div className="mb-6 inline-flex items-center gap-3.5 text-[11px] tracking-[0.42em] uppercase text-crd-pink">
            <span className="h-px w-9 bg-crd-pink opacity-55" aria-hidden />
            Criss Club Night
            <span className="h-px w-9 bg-crd-pink opacity-55" aria-hidden />
          </div>
          <h2
            className="font-serif font-light leading-[0.95] tracking-[-0.01em] text-crd-ink"
            style={{ fontSize: "clamp(48px,7vw,96px)" }}
          >
            {l.h1plain}{" "}
            <em className="italic text-crd-teal">{l.h1em}</em>
            <br />
            {l.h2plain}{" "}
            <span className="font-script text-crd-pink" style={{ fontSize: "1.15em" }}>
              {l.h2script}
            </span>
          </h2>
          <p className="mx-auto mt-7 max-w-[640px] font-serif italic leading-[1.4] text-[rgba(236,225,200,0.65)]" style={{ fontSize: "clamp(20px,1.8vw,28px)" }}>
            {l.lead}
          </p>
        </div>
        </Reveal>

        {/* Events rail */}
        <Reveal>
        <div className="relative z-10 mx-auto max-w-[1280px] px-9">
          <div className="mb-9 flex items-baseline justify-between border-b border-white/10 pb-[18px]">
            <h4 className="font-serif font-normal italic text-[28px] tracking-[-0.01em] text-crd-ink">{l.eventsLabel}</h4>
            <button
              onClick={() => setModalOpen(true)}
              className="text-[11px] tracking-[0.32em] uppercase text-crd-pink transition-opacity hover:opacity-70"
            >
              {l.reserveLink} →
            </button>
          </div>

          <div className="grid grid-cols-2 gap-[22px] md:grid-cols-4">
            {EVENTS.map((ev, i) => (
              <button
                key={i}
                onClick={() => setModalOpen(true)}
                aria-label={`${ev.title} – rezervare`}
                className="group relative aspect-[4/5] cursor-pointer overflow-hidden rounded-[4px] bg-crd-bg-2"
              >
                <Image
                  src={ev.img}
                  alt={ev.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.05]"
                />
              </button>
            ))}
          </div>
        </div>
        </Reveal>
      </section>
    </>
  );
}
