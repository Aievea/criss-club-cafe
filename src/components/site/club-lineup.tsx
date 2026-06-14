"use client";

import { Reveal } from "@/src/components/footer/reveal";
import { useLanguage } from "@/src/i18n/language-context";
import { DJGrid } from "@/src/components/site/dj-grid";

export function ClubLineup() {
  const { t } = useLanguage();
  const l = t.lineup;

  return (
    <section
      id="noapte"
      className="relative overflow-hidden py-28 text-crd-ink"
      style={{ background: "#050402" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(50% 40% at 20% 20%, rgba(255,61,163,0.14) 0%, transparent 70%),
            radial-gradient(40% 40% at 90% 80%, rgba(168,85,247,0.10) 0%, transparent 70%)
          `,
        }}
      />

      <Reveal>
        <div className="relative z-10 mx-auto mb-16 max-w-5xl px-6 text-center sm:px-8">
          <h2
            className="font-serif font-light italic leading-[0.95] tracking-[-0.01em] text-crd-ink"
            style={{ fontSize: "clamp(2.4rem,5vw,4rem)" }}
          >
            {l.h1plain}{" "}
            <em className="not-italic text-[#ff3da3]">{l.h1em}</em>
            <br />
            {l.h2plain}{" "}
            <span className="italic text-[#a855f7]">{l.h2script}</span>
          </h2>
          <p
            className="mx-auto mt-6 max-w-lg font-serif italic leading-relaxed text-[#f5f0e8]/55"
            style={{ fontSize: "clamp(1rem,1.6vw,1.2rem)" }}
          >
            {l.lead}
          </p>
        </div>
      </Reveal>

      <Reveal>
        <div className="relative z-10 mx-auto max-w-5xl px-6 sm:px-8">
          <DJGrid />
        </div>
      </Reveal>
    </section>
  );
}
