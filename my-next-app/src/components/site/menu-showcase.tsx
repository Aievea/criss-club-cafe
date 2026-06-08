"use client";

import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { Reveal } from "@/src/components/footer/reveal";
import { useLanguage } from "@/src/i18n/language-context";
import { MenuChoiceModal } from "@/src/components/site/menu-choice-modal";
import img1 from "@/src/assets/images/images-crisscafee/WhatsApp Image 2026-06-01 at 21.25.25.jpeg";
import img2 from "@/src/assets/images/images-crisscafee/WhatsApp Image 2026-06-01 at 19.28.56.jpeg";
import img3 from "@/src/assets/images/images-crisscafee/WhatsApp Image 2026-06-01 at 21.29.01 (1).jpeg";


const IMGS: StaticImageData[] = [img1, img2, img3];

export function MenuShowcase() {
  const { t } = useLanguage();
  const s = t.showcase;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
    <MenuChoiceModal open={menuOpen} onClose={() => setMenuOpen(false)} />
    <section id="meniu" className="relative overflow-hidden bg-crd-paper py-36 text-crd-ink-dark">
      {/* Section head */}
      <Reveal>
      <div className="mx-auto mb-20 max-w-[1100px] px-9 text-center">
        <div className="mb-6 inline-flex items-center gap-3.5 text-[11px] tracking-[0.42em] uppercase text-crd-gold-accent">
          <span className="h-px w-9 bg-crd-gold-accent opacity-55" aria-hidden />
          {s.eyebrow}
          <span className="h-px w-9 bg-crd-gold-accent opacity-55" aria-hidden />
        </div>
        <h2
          className="font-serif font-light leading-[0.95] tracking-[-0.01em] text-crd-ink-dark"
          style={{ fontSize: "clamp(48px,7vw,88px)" }}
        >
          {s.h1plain && <>{s.h1plain} </>}<em className="italic text-crd-gold-accent">{s.h1em}</em>
          <br />
          {s.h2plain} <em className="italic text-crd-gold-accent">{s.h2em}</em>
        </h2>
        <p className="mx-auto mt-7 max-w-[640px] font-serif italic leading-[1.4] text-crd-ink-soft" style={{ fontSize: "clamp(20px,1.8vw,28px)" }}>
          {s.lead}
        </p>
      </div>
      </Reveal>

      {/* Chapters */}
      <div className="mx-auto flex max-w-[1280px] flex-col gap-24 px-9">
        {s.chapters.map((ch, idx) => {
          const even = idx % 2 === 1;
          return (
            <Reveal key={ch.num} delay={idx * 60}>
            <div className="grid items-center gap-20 lg:grid-cols-2">
              {/* Image */}
              <div className={`relative aspect-[4/5] overflow-hidden rounded-sm ${even ? "lg:order-2" : ""}`}>
                <Image
                  src={IMGS[idx]}
                  alt={ch.title}
                  fill
                  className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(26,20,17,0.5)]" />
                <div className="absolute left-6 top-6 bg-crd-paper px-4 py-2.5 text-[10px] font-semibold tracking-[0.32em] uppercase text-crd-ink-dark">
                  {ch.stamp}
                </div>
              </div>

              {/* Body */}
              <div className={`py-6 ${even ? "lg:order-1" : ""}`}>
                <p className="mb-3.5 font-serif italic text-[15px] text-crd-gold-accent">{ch.num}</p>
                <h3
                  className="font-serif font-normal leading-[1] text-crd-ink-dark"
                  style={{ fontSize: "clamp(44px,5vw,64px)" }}
                >
                  {ch.title}{" "}
                  <span className="font-script text-crd-gold-accent" style={{ fontSize: "1.05em" }}>
                    {ch.titleEm}
                  </span>
                </h3>
                <span className="mt-2 inline-block border-b border-crd-gold-accent pb-1.5 text-[11px] tracking-[0.32em] uppercase text-crd-ink-soft">
                  {ch.tag}
                </span>
                <ul className="mt-3.5 grid gap-[18px]">
                  {s.items[idx].map((item, i) => (
                    <li
                      key={i}
                      className="border-b border-dashed border-crd-ink-soft/20 pb-4"
                    >
                      <div className="font-serif text-[26px] font-medium text-crd-ink-dark">{item.name}</div>
                      <div className="mt-1 font-serif italic text-[18px] text-crd-ink-soft">{item.desc}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            </Reveal>
          );
        })}
      </div>

      {/* Footer */}
      <Reveal>
      <div className="mx-auto mt-20 max-w-[1280px] px-9 text-center">
        <p className="inline-block font-serif italic text-[16px] text-crd-ink-soft before:mx-3 before:text-crd-gold-accent before:content-['·'] after:mx-3 after:text-crd-gold-accent after:content-['·']">
          {s.footerNote}
        </p>
        <div className="mt-10">
          <button
            onClick={() => setMenuOpen(true)}
            className="inline-flex items-center gap-3 rounded-lg border border-crd-ink-dark/30 px-7 py-4 text-[11px] tracking-[0.28em] uppercase text-crd-ink-dark transition-all duration-200 hover:border-crd-gold-accent hover:bg-crd-gold-accent hover:text-crd-ink-dark hover:-translate-y-px"
          >
            {s.cta} <span>→</span>
          </button>
        </div>
      </div>
      </Reveal>
    </section>
    </>
  );
}
