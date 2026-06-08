"use client";

import { useLanguage } from "@/src/i18n/language-context";
import { ReservationTrigger } from "@/src/components/site/reservation-modal";

export function VisitSection() {
  const { t } = useLanguage();
  const v = t.visit;

  const cells = [
    { lab: v.addressLabel, val: v.addressVal },
    { lab: v.phoneLabel, val: "0746 521 799", sub: v.phoneNote },
    { lab: v.cafeHoursLabel, val: v.cafeHoursVal, sub: v.cafeHoursSub },
    { lab: v.clubLabel, val: v.clubVal },
  ];

  return (
    <section id="vizita" className="relative bg-crd-bg py-40 text-crd-ink">
      <div className="mx-auto grid max-w-[1280px] items-start gap-20 px-9 lg:grid-cols-2">

        {/* Left — Info */}
        <div>
          <div className="mb-3 flex items-center gap-3 text-[11px] tracking-[0.42em] uppercase text-crd-gold-2">
            <span className="h-px w-9 bg-crd-gold-2 opacity-55" aria-hidden />
            {v.eyebrow}
          </div>
          <h2
            className="font-serif font-light leading-[0.95] tracking-[-0.01em] text-crd-ink"
            style={{ fontSize: "clamp(48px,6vw,84px)" }}
          >
            {v.headingLine1Before}{" "}
            <em className="italic text-crd-gold-2">{v.headingLine1Em}</em>
            <br />
            {v.headingLine2Before}{" "}
            <span className="font-script text-crd-gold-2" style={{ fontSize: "1.15em" }}>
              {v.headingLine2Script}
            </span>
          </h2>

          <div className="mt-12 grid grid-cols-2 gap-x-12 gap-y-9">
            {cells.map((cell) => (
              <div key={cell.lab}>
                <div className="mb-3.5 border-b border-[rgba(201,168,106,0.3)] pb-2.5 text-[11px] tracking-[0.32em] uppercase text-crd-gold-2">
                  {cell.lab}
                </div>
                <div className="font-serif text-[clamp(18px,2.2vw,24px)] leading-[1.5] text-crd-ink whitespace-pre-line">
                  {cell.val}
                </div>
                {cell.sub && (
                  <div className="mt-1 text-[clamp(14px,1.4vw,17px)] tracking-[0.04em] text-crd-ink/50 font-body">
                    {cell.sub}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-14 flex flex-wrap gap-3.5">
            <ReservationTrigger
              className="inline-flex items-center gap-3 rounded-lg border border-crd-gold-2 bg-crd-gold-2 px-7 py-4 text-[11px] font-semibold tracking-[0.28em] uppercase text-[#1a1411] transition-all duration-200 hover:-translate-y-px hover:shadow-[0_14px_40px_-10px_rgba(230,199,135,0.4)]"
            >
              {v.callCta} <span>→</span>
            </ReservationTrigger>
            <a
              href="https://maps.google.com/?q=Criss+Club+Cafe+Targu+Mures"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-lg border border-white/35 bg-transparent px-7 py-4 text-[11px] font-medium tracking-[0.28em] uppercase text-crd-ink transition-all duration-200 hover:border-white hover:bg-white/[0.06]"
            >
              {v.mapCta}
            </a>
          </div>
        </div>

        {/* Right — Real map embed with premium dark treatment */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-white/[0.07]"
             style={{ boxShadow: "0 32px 80px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(201,168,106,0.06)" }}>

          {/* Google Maps iframe — grayscale+invert = dark theme */}
          <iframe
            src="https://maps.google.com/maps?q=Criss+Club+Cafe+Targu+Mures&output=embed&z=17&hl=ro"
            className="absolute inset-0 h-full w-full border-0"
            style={{ filter: "grayscale(1) invert(1) brightness(0.82) contrast(1.08) sepia(0.18)" }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            title="Criss Café & Club — Piața Trandafirilor 43, Târgu Mureș"
          />

          {/* Edge vignette — depth */}
          <div aria-hidden className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(ellipse at center, transparent 38%, rgba(10,8,6,0.72) 100%)" }}
          />
          {/* Bottom fade — reveals CTA */}
          <div aria-hidden className="pointer-events-none absolute bottom-0 left-0 right-0 h-36"
            style={{ background: "linear-gradient(to top, rgba(10,8,6,0.95) 0%, rgba(10,8,6,0.6) 55%, transparent 100%)" }}
          />
          {/* Top fade */}
          <div aria-hidden className="pointer-events-none absolute top-0 left-0 right-0 h-16"
            style={{ background: "linear-gradient(to bottom, rgba(10,8,6,0.55), transparent)" }}
          />
          {/* Subtle gold center glow */}
          <div aria-hidden className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(201,168,106,0.07), transparent 70%)" }}
          />

          {/* Floating label card — above pin */}
          <div className="pointer-events-none absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-full flex flex-col items-center"
               style={{ marginTop: "-20px" }}>
            <div className="rounded-lg border border-[#c9a86a]/25 bg-[#0d0b09]/90 px-5 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.7),0_0_0_1px_rgba(201,168,106,0.08)]"
                 style={{ backdropFilter: "blur(12px)" }}>
              <p className="font-display text-[0.8rem] font-semibold tracking-[0.06em] text-[#f5f0e8]"
                 style={{ fontFamily: "var(--font-cinzel)" }}>
                Criss Café &amp; Club
              </p>
              <p className="mt-0.5 text-[10px] tracking-[0.03em] text-[#c9a86a]/75">
                Piața Trandafirilor 43
              </p>
            </div>
            {/* Connector line */}
            <div className="w-px h-4 bg-gradient-to-b from-[#c9a86a]/50 to-[#c9a86a]/20" />
          </div>

          {/* Pin dot */}
          <div className="pointer-events-none absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2">
            <div className="relative flex items-center justify-center">
              {/* Outer pulse ring */}
              <div className="absolute h-10 w-10 rounded-full border border-[#c9a86a]/30 animate-[waPulse_2s_ease-out_infinite]" />
              {/* Mid ring */}
              <div className="absolute h-6 w-6 rounded-full border border-[#c9a86a]/20 animate-[waPulse_2s_ease-out_0.6s_infinite]" />
              {/* Core dot */}
              <div className="relative h-3.5 w-3.5 rounded-full bg-[#c9a86a] shadow-[0_0_12px_rgba(201,168,106,0.8),0_0_24px_rgba(201,168,106,0.35)]" />
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-3 px-6 pb-6">
            <div>
              <p className="text-[9.5px] font-semibold uppercase tracking-[0.32em] text-[#c9a86a]/50">
                Târgu Mureș
              </p>
              <p className="mt-0.5 font-serif italic text-[0.95rem] text-[#f5f0e8]/70">
                Piața Trandafirilor 43
              </p>
            </div>
            <a
              href="https://maps.google.com/?q=Criss+Club+Cafe+Targu+Mures"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-2 rounded-lg border border-[#c9a86a]/25 bg-[#c9a86a]/[0.08] px-4 py-2.5 text-[10px] font-medium tracking-[0.22em] uppercase text-[#c9a86a]/80 backdrop-blur-sm transition-all duration-200 hover:border-[#c9a86a]/50 hover:bg-[#c9a86a]/[0.15] hover:text-[#c9a86a]"
            >
              {v.mapCta} →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
