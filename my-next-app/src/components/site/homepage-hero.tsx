"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MenuChoiceModal } from "@/src/components/site/menu-choice-modal";
import { MuteButton } from "@/src/components/site/audio-player";
import logo from "@/src/assets/images/logos/2cfd48d9-5856-4b6b-90cc-a9e14fc021d8_removalai_preview.png";
import clubVideo from "@/src/assets/video/video-crissclub/WhatsApp Video 2026-06-02 at 17.35.15.mp4";
import cafeVideo from "@/src/assets/video/video-crisscafee/WhatsApp Video 2026-06-01 at 21.26.11.mp4";

export function HomepageHero() {
  const cafeRef = useRef<HTMLVideoElement>(null);
  const clubRef = useRef<HTMLVideoElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const tryPlay = (v: HTMLVideoElement | null) => {
      if (!v) return;
      v.muted = true;
      v.play().catch(() => {});
    };
    tryPlay(cafeRef.current);
    tryPlay(clubRef.current);
  }, []);

  return (
    <section className="relative isolate flex min-h-screen min-h-[100svh] flex-col overflow-hidden">
      {/* Two videos side by side - no card, raw split-screen */}
      <div className="absolute inset-0 -z-20 flex">
        <video
          ref={cafeRef}
          className="h-full w-1/2 object-cover"
          style={{ filter: "saturate(0.85) brightness(0.52) contrast(1.08)" }}
          autoPlay loop muted playsInline preload="auto"
        >
          <source src={cafeVideo} type="video/mp4" />
        </video>
        <video
          ref={clubRef}
          className="h-full w-1/2 object-cover"
          style={{ filter: "saturate(0.85) brightness(0.52) contrast(1.08)" }}
          autoPlay loop muted playsInline preload="auto"
        >
          <source src={clubVideo} type="video/mp4" />
        </video>
      </div>

      {/* Vignette */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `
            radial-gradient(120% 80% at 50% 40%, transparent 0%, rgba(10,8,6,0.55) 65%, rgba(10,8,6,0.92) 100%),
            linear-gradient(180deg, rgba(10,8,6,0.5) 0%, rgba(10,8,6,0.08) 35%, rgba(10,8,6,0.82) 100%)
          `,
        }}
      />

      {/* Content - flex-1, column, kicker+logo at top, tagline+CTAs at bottom */}
      <div className="relative z-10 flex flex-1 flex-col items-center px-6 text-center">
        {/* Kicker + Logo - pinned toward top */}
        <div className="flex flex-col items-center gap-3 pt-24 lg:pt-[86px]">
          <div
            className="flex items-center gap-3.5 text-[11px] tracking-[0.42em] uppercase text-[#e6c787]"
            style={{ animation: "crd-fade-up 1100ms var(--ease-expo) 0ms both" }}
          >
            <span className="h-px w-9 bg-[#e6c787] opacity-55" aria-hidden />
            Piața Trandafirilor 43 · Tg Mureș
            <span className="h-px w-9 bg-[#e6c787] opacity-55" aria-hidden />
          </div>
          <div style={{ animation: "crd-fade-up 1200ms var(--ease-expo) 120ms both" }}>
            <Image
              src={logo}
              alt="Criss Club · Social Club"
              className="w-[min(480px,72vw)] brightness-0 invert drop-shadow-[0_2px_24px_rgba(230,199,135,0.18)]"
              priority
            />
          </div>
        </div>

        {/* Tagline + CTAs - pinned toward bottom */}
        <div className="mt-auto flex flex-col items-center gap-5 pb-16">
          <MuteButton />
          <p
            className="font-serif italic tracking-[0.05em] text-[#ece1c8]"
            style={{ fontSize: "clamp(18px,2.2vw,26px)", animation: "crd-fade-up 1100ms var(--ease-expo) 300ms both" }}
          >
            Lounge{" "}
            <span className="mx-2 font-normal not-italic text-[#e6c787] opacity-80">·</span>
            Pub{" "}
            <span className="mx-2 font-normal not-italic text-[#e6c787] opacity-80">·</span>
            Social Club
          </p>
          <div
            className="flex flex-wrap justify-center gap-3.5"
            style={{ animation: "crd-fade-up 1100ms var(--ease-expo) 420ms both" }}
          >
            <button
              onClick={() => setMenuOpen(true)}
              className="inline-flex items-center gap-3 rounded-full border border-[#e6c787] bg-[#e6c787] px-6 py-3.5 text-[11.5px] font-semibold tracking-[0.28em] uppercase text-[#1a1411] transition-all duration-200 hover:-translate-y-px hover:shadow-[0_14px_40px_-10px_rgba(230,199,135,0.4)]"
            >
              Descoperă meniul <span className="inline-block transition-transform duration-200">→</span>
            </button>
            <MenuChoiceModal open={menuOpen} onClose={() => setMenuOpen(false)} />
            <a
              href="tel:0746521799"
              className="inline-flex items-center gap-3 rounded-full border border-white/35 bg-transparent px-6 py-3.5 text-[11.5px] font-medium tracking-[0.28em] uppercase text-[#ece1c8] transition-all duration-200 hover:border-white hover:bg-white/[0.06]"
            >
              Rezervare · 0746 521 799
            </a>
          </div>
        </div>
      </div>

      {/* Half-video CTA labels — left = Cafe, right = Club */}
      <Link
        href="/criss-cafe"
        className="pointer-events-auto group absolute left-1/4 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3"
        aria-label="Criss Cafe"
      >
        <span className="font-display text-[clamp(1.1rem,2.5vw,2rem)] font-semibold tracking-[0.18em] uppercase text-[#f5f0e8]/50 transition-all duration-500 group-hover:text-[#f5f0e8] select-none whitespace-nowrap">
          ← Criss Cafe
        </span>
        <span className="block h-px w-8 bg-[#c9a86a]/50 transition-all duration-500 group-hover:w-24 group-hover:bg-[#c9a86a]" />
      </Link>
      <Link
        href="/criss-club"
        className="pointer-events-auto group absolute left-3/4 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3"
        aria-label="Criss Club"
      >
        <span className="font-display text-[clamp(1.1rem,2.5vw,2rem)] font-semibold tracking-[0.18em] uppercase text-[#f5f0e8]/50 transition-all duration-500 group-hover:text-[#f5f0e8] select-none whitespace-nowrap">
          Criss&nbsp;Club →
        </span>
        <span className="block h-px w-8 bg-[#c9a86a]/50 transition-all duration-500 group-hover:w-24 group-hover:bg-[#c9a86a]" />
      </Link>

      {/* Scroll cue - always anchored at the visual bottom */}
      <div className="relative z-10 flex flex-col items-center gap-3 pb-7 text-[10px] tracking-[0.4em] uppercase text-white/55">
        <span>scroll</span>
        <div
          className="h-14 w-px origin-top bg-gradient-to-b from-transparent to-[#e6c787] animate-[scrollLine_2.4s_ease-in-out_infinite]"
          aria-hidden
        />
      </div>
    </section>
  );
}
