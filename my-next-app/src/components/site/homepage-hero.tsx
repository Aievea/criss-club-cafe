"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MenuChoiceModal } from "@/src/components/site/menu-choice-modal";
import { MuteButton } from "@/src/components/site/audio-player";
import { ReservationTrigger } from "@/src/components/site/reservation-modal";
import { useLanguage } from "@/src/i18n/language-context";
import logo from "@/src/assets/images/logos/2cfd48d9-5856-4b6b-90cc-a9e14fc021d8_removalai_preview.png";
import clubVideo from "@/src/assets/video/video-crissclub/WhatsApp Video 2026-06-02 at 17.35.15.mp4";
import cafeVideo from "@/src/assets/video/video-crisscafee/WhatsApp Video 2026-06-01 at 21.26.11.mp4";

export function HomepageHero() {
  const cafeRef = useRef<HTMLVideoElement>(null);
  const clubRef = useRef<HTMLVideoElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const tryPlay = (v: HTMLVideoElement | null) => {
      if (!v) return;
      v.setAttribute("muted", "");
      v.muted = true;
      v.play().catch(() => {});
    };
    tryPlay(cafeRef.current);
    tryPlay(clubRef.current);
  }, []);

  return (
    <section className="relative isolate flex min-h-screen min-h-[100svh] flex-col overflow-hidden">

      {/* ── Videos ── */}
      <div className="absolute inset-0 -z-20 flex">
        <video
          ref={cafeRef}
          className="h-full w-1/2 object-cover"
          style={{ filter: "saturate(0.82) brightness(0.48) contrast(1.1)" }}
          autoPlay loop muted playsInline preload="metadata"
        >
          <source src={cafeVideo} type="video/mp4" />
        </video>
        <video
          ref={clubRef}
          className="h-full w-1/2 object-cover"
          style={{ filter: "saturate(0.82) brightness(0.48) contrast(1.1)" }}
          autoPlay loop muted playsInline preload="metadata"
        >
          <source src={clubVideo} type="video/mp4" />
        </video>
      </div>

      {/* ── Vignette ── */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background: `
            radial-gradient(130% 90% at 50% 50%, transparent 0%, rgba(10,8,6,0.5) 60%, rgba(10,8,6,0.95) 100%),
            linear-gradient(180deg, rgba(10,8,6,0.55) 0%, rgba(10,8,6,0.0) 30%, rgba(10,8,6,0.0) 60%, rgba(10,8,6,0.88) 100%)
          `,
        }}
      />

      {/* ── Per-side ambient color tints ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 -z-10 w-1/2"
        style={{ background: "radial-gradient(ellipse 80% 55% at 30% 54%, rgba(201,168,106,0.09) 0%, transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-1/2"
        style={{ background: "radial-gradient(ellipse 80% 55% at 70% 54%, rgba(168,85,247,0.10) 0%, transparent 70%)" }}
      />

      {/* ── Center divider — gold top half, purple bottom half ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-1/2 -z-10 w-px -translate-x-1/2"
        style={{
          background: "linear-gradient(to bottom, transparent 0%, rgba(201,168,106,0.30) 25%, rgba(201,168,106,0.20) 48%, rgba(168,85,247,0.20) 52%, rgba(168,85,247,0.28) 75%, transparent 100%)",
        }}
      />


      {/* ── Main content ── */}
      <div className="pointer-events-none relative z-20 flex flex-1 flex-col items-center px-6 text-center">

        {/* Address + Logo */}
        <div className="flex flex-col items-center gap-4 pt-24 lg:pt-20">
          <div
            className="flex items-center gap-4 text-[10px] tracking-[0.46em] uppercase text-[#e6c787]/65"
            style={{ animation: "crd-fade-up 1100ms var(--ease-expo) 0ms both" }}
          >
            <span className="h-px w-8 bg-[#e6c787]/35" aria-hidden />
            Piața Trandafirilor 43 · Tg Mureș
            <span className="h-px w-8 bg-[#e6c787]/35" aria-hidden />
          </div>

          <div style={{ animation: "crd-fade-up 1200ms var(--ease-expo) 100ms both" }}>
            <Image
              src={logo}
              alt="Criss Club · Social Club"
              className="w-[min(420px,68vw)] brightness-0 invert drop-shadow-[0_4px_32px_rgba(230,199,135,0.22)]"
              priority
            />
          </div>
        </div>

        {/* Tagline + CTAs */}
        <div className="mt-auto flex flex-col items-center gap-6 pb-16">

          <MuteButton />

          <p
            className="font-serif italic text-[#ece1c8]/85"
            style={{
              fontSize: "clamp(17px,2vw,24px)",
              letterSpacing: "0.04em",
              animation: "crd-fade-up 1100ms var(--ease-expo) 280ms both",
            }}
          >
            Lounge
            <span className="mx-3 font-normal not-italic text-[#e6c787]/50">·</span>
            Pub
            <span className="mx-3 font-normal not-italic text-[#e6c787]/50">·</span>
            Social Club
          </p>

          {/* CTA row */}
          <div
            className="pointer-events-auto flex flex-wrap items-center justify-center gap-3"
            style={{ animation: "crd-fade-up 1100ms var(--ease-expo) 400ms both" }}
          >
            {/* Primary — gold fill with glow */}
            <button
              onClick={() => setMenuOpen(true)}
              className="
                group relative overflow-hidden
                inline-flex items-center gap-3
                rounded-lg bg-[#c9a86a] px-7 py-3.5
                text-[11px] font-semibold tracking-[0.3em] uppercase text-[#100d08]
                transition-all duration-300 ease-out
                hover:-translate-y-px
                hover:shadow-[0_16px_48px_-8px_rgba(201,168,106,0.55)]
              "
            >
              {/* shimmer sweep */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-white/20 transition-transform duration-700 ease-out group-hover:translate-x-full"
              />
              <span className="relative">{t.hero.discoverMenu}</span>
              <svg
                width="14" height="14" viewBox="0 0 14 14" fill="none"
                aria-hidden
                className="relative transition-transform duration-300 group-hover:translate-x-0.5"
              >
                <path d="M2.5 7h9M8 3.5L11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <MenuChoiceModal open={menuOpen} onClose={() => setMenuOpen(false)} />

            {/* Divider dot */}
            <span aria-hidden className="hidden h-1 w-1 rounded-full bg-white/20 sm:block" />

            {/* Secondary — ghost */}
            <ReservationTrigger
              className="
                group inline-flex items-center gap-2.5
                rounded-lg border border-white/18 px-7 py-3.5
                text-[11px] font-medium tracking-[0.28em] uppercase text-[#ece1c8]/60
                transition-all duration-300
                hover:border-white/35 hover:text-[#ece1c8]
              "
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden className="opacity-50 group-hover:opacity-80 transition-opacity">
                <path d="M10.5 8.5c0 .28-.06.55-.19.8a1.56 1.56 0 0 1-.52.62c-.26.18-.55.27-.85.27C7.88 10.19 4.07 6.38 3.81 5.06c0-.3.09-.6.27-.85A1.56 1.56 0 0 1 5.16 3.7c.08 0 .16.01.23.04l1.3 2.6a.3.3 0 0 1-.07.35l-.5.5a5.11 5.11 0 0 0 1.7 1.69l.5-.5a.3.3 0 0 1 .35-.07l2.6 1.3c.02.07.03.15.03.23Z" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
              {t.hero.reserve}
            </ReservationTrigger>
          </div>
        </div>
      </div>

      {/* ── Venue labels — mid-screen ── */}

      <Link
        href="/criss-cafe"
        className="pointer-events-auto group absolute inset-y-0 left-0 z-10 flex w-1/2 flex-col items-center justify-center gap-3"
        aria-label="Criss Cafe"
      >
        <span className="text-[8px] font-medium tracking-[0.5em] uppercase text-[#c9a86a]/45 transition-colors duration-300 group-hover:text-[#c9a86a]/85">
          ← {t.hero.cafeLabel}
        </span>
        <span className="select-none whitespace-nowrap font-display text-[clamp(1rem,2.3vw,1.9rem)] font-semibold tracking-[0.13em] uppercase text-[#f5f0e8]/38 transition-colors duration-300 group-hover:text-[#f5f0e8]/95">
          Criss Cafe
        </span>
        <span className="h-px w-5 bg-[#c9a86a]/35 transition-all duration-500 group-hover:w-14 group-hover:bg-[#c9a86a]/70" />
      </Link>

      <Link
        href="/criss-club"
        className="pointer-events-auto group absolute inset-y-0 right-0 z-10 flex w-1/2 flex-col items-center justify-center gap-3"
        aria-label="Criss Club"
      >
        <span className="text-[8px] font-medium tracking-[0.5em] uppercase text-[#ff3da3]/45 transition-colors duration-300 group-hover:text-[#ff3da3]/85">
          Club →
        </span>
        <span className="select-none whitespace-nowrap font-display text-[clamp(1rem,2.3vw,1.9rem)] font-semibold tracking-[0.13em] uppercase text-[#f5f0e8]/38 transition-colors duration-300 group-hover:text-[#f5f0e8]/95">
          Criss&nbsp;Club
        </span>
        <span className="h-px w-5 bg-[#ff3da3]/35 transition-all duration-500 group-hover:w-14 group-hover:bg-[#ff3da3]/70" />
      </Link>

      {/* ── Scroll indicator ── */}
      <div
        className="relative z-10 flex flex-col items-center gap-2.5 pb-7"
        style={{ animation: "crd-fade-up 1000ms var(--ease-expo) 700ms both" }}
      >
        <span className="text-[9px] tracking-[0.44em] uppercase text-white/30">scroll</span>
        <div className="relative h-10 w-px overflow-hidden">
          <div
            className="absolute inset-x-0 top-0 h-full origin-top bg-gradient-to-b from-[#e6c787]/60 to-transparent animate-[scrollLine_2.4s_cubic-bezier(0.4,0,0.6,1)_infinite]"
            aria-hidden
          />
        </div>
      </div>
    </section>
  );
}
