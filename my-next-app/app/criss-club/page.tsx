"use client";

import { useLanguage } from "@/src/i18n/language-context";
import { SiteNav } from "@/src/components/site/site-nav";
import { BackButton } from "@/src/components/site/back-button";
import { Reveal } from "@/src/components/footer/reveal";
import clubVideo from "@/src/assets/video/video-crissclub/WhatsApp Video 2026-06-02 at 17.35.15.mp4";
import clubLogoIg from "@/src/assets/images/logos/crisclublogoig.jpeg";
import Link from "next/link";
import { WHATSAPP_URL } from "@/src/lib/contact";
import { ReservationTrigger } from "@/src/components/site/reservation-modal";
import { AddressLink } from "@/src/components/site/address-link";

function Divider() {
  return (
    <div className="mx-auto max-w-5xl px-6 sm:px-8">
      <span className="block h-px bg-gradient-to-r from-transparent via-[#a855f7]/30 to-transparent" />
    </div>
  );
}

function IgIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" aria-hidden>
      <defs>
        <radialGradient id="ig-club" cx="30%" cy="107%" r="150%">
          <stop offset="0%" stopColor="#ffd600" />
          <stop offset="30%" stopColor="#ff6930" />
          <stop offset="60%" stopColor="#fe3b96" />
          <stop offset="100%" stopColor="#a60dca" />
        </radialGradient>
      </defs>
      <path fill="url(#ig-club)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

export default function CrissClubPage() {
  const { t, lang } = useLanguage();

  return (
    <main className="overflow-hidden bg-crd-bg font-body text-crd-ink">
      <SiteNav />
      <BackButton />

      {/* Hero — full-bleed video, content anchored left */}
      <section className="relative isolate flex min-h-screen min-h-[100svh] overflow-hidden">

        {/* Video — full background; visible only on right half on desktop */}
        <video
          className="absolute inset-0 -z-20 h-full w-full object-cover"
          style={{ filter: "saturate(0.82) brightness(0.55) contrast(1.1)" }}
          autoPlay muted loop playsInline preload="metadata"
        >
          <source src={clubVideo} type="video/mp4" />
        </video>

        {/* Desktop: dark panel on the LEFT (content side) */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 -z-10 hidden lg:block"
          style={{
            right: "54%",
            background: [
              "radial-gradient(ellipse 100% 40% at 0% 50%, rgba(7,5,16,0.6) 0%, transparent 70%)",
              "#07050F",
            ].join(", "),
          }}
        />
        {/* Desktop: gradient blending left panel into right video */}
        <div
          className="pointer-events-none absolute inset-y-0 -z-10 hidden lg:block"
          style={{ right: "40%", width: "18%", background: "linear-gradient(to left, transparent, #07050F)" }}
        />
        {/* Desktop: brand accent hairline at the right edge of the content panel */}
        <div
          className="pointer-events-none absolute inset-y-0 -z-[8] hidden lg:block"
          style={{
            left: "calc(46% - 1px)",
            width: "1px",
            background: "linear-gradient(to bottom, transparent 0%, rgba(168,85,247,0.5) 20%, rgba(255,61,163,0.6) 50%, rgba(168,85,247,0.5) 80%, transparent 100%)",
          }}
        />
        {/* Desktop: top/bottom vignettes on the RIGHT video area */}
        <div
          className="pointer-events-none absolute top-0 -z-10 hidden lg:block"
          style={{ left: "46%", right: 0, height: "12rem", background: "linear-gradient(to bottom, rgba(7,5,16,0.55), transparent)" }}
        />
        <div
          className="pointer-events-none absolute bottom-0 -z-10 hidden lg:block"
          style={{ left: "46%", right: 0, height: "12rem", background: "linear-gradient(to top, rgba(7,5,16,0.55), transparent)" }}
        />

        {/* Mobile overlay */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 lg:hidden"
          style={{
            background: [
              "linear-gradient(to right, rgba(7,5,16,0.96) 0%, rgba(7,5,16,0.80) 25%, rgba(7,5,16,0.42) 50%, rgba(7,5,16,0.08) 70%, transparent 88%)",
              "linear-gradient(to top, rgba(7,5,16,0.72) 0%, transparent 38%)",
              "linear-gradient(to bottom, rgba(7,5,16,0.55) 0%, transparent 22%)",
            ].join(", "),
          }}
        />

        {/* Content — centered on mobile, right-edge-of-left-panel on desktop (close to middle) */}
        <div className="relative z-10 flex min-h-screen min-h-[100svh] w-full flex-col items-center justify-center gap-10 px-8 pb-20 text-center lg:w-[46%] lg:items-end lg:px-0 lg:pr-14 lg:text-right">

          {/* Wordmark */}
          <div
            className="flex flex-col items-center lg:items-end"
            style={{ animation: "crd-fade-up 1000ms var(--ease-expo) 60ms both" }}
          >
            <div className="mb-4 h-px w-10 bg-[#ff3da3]/55" aria-hidden />
            <h1
              className="font-display leading-[0.9] text-[#f5f0e8]"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              <span className="block text-[clamp(1rem,2.4vw,1.6rem)] font-light tracking-[0.35em] text-[#f5f0e8]/52">
                Criss
              </span>
              <span
                className="block text-[clamp(3.8rem,8.5vw,6rem)] font-semibold tracking-[-0.02em]"
                style={{ textShadow: "0 2px 40px rgba(255,61,163,0.30), 0 0 80px rgba(139,92,246,0.16)" }}
              >
                Club
              </span>
            </h1>
          </div>

          {/* Buttons */}
          <div
            className="flex flex-wrap justify-center gap-3 lg:justify-end"
            style={{ animation: "crd-fade-up 1000ms var(--ease-expo) 200ms both" }}
          >
            <ReservationTrigger
              className="inline-flex items-center gap-2 rounded-lg px-7 py-3.5 text-[11px] font-semibold tracking-[0.26em] uppercase text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_-8px_rgba(168,85,247,0.65)]"
              style={{ background: "linear-gradient(135deg, #3b82f6 0%, #a855f7 52%, #ff3da3 100%)" }}
            >
              {t.club.bookCta} &rarr;
            </ReservationTrigger>
            <Link
              href="/meniu/club"
              className="inline-flex items-center gap-2 rounded-lg px-7 py-3.5 text-[11px] font-medium tracking-[0.26em] uppercase text-[#ff3da3]/70 transition-all duration-300 hover:text-[#ff3da3] hover:border-[rgba(255,61,163,0.5)]"
              style={{ border: "1px solid rgba(255,61,163,0.28)" }}
            >
              {lang === "ro" ? "Meniu" : "Menu"} &rarr;
            </Link>
          </div>

          {/* Scroll indicator */}
          <div
            className="flex flex-col items-center gap-2 lg:items-end"
            style={{ animation: "crd-fade-up 1000ms var(--ease-expo) 340ms both" }}
            aria-hidden
          >
            <span className="text-[8px] font-medium tracking-[0.44em] uppercase text-[#ff3da3]/40">scroll</span>
            <div className="relative h-10 w-px overflow-hidden">
              <div
                className="absolute inset-x-0 top-0 h-full origin-top animate-[scrollLine_2.4s_cubic-bezier(0.4,0,0.6,1)_infinite]"
                style={{ background: "linear-gradient(to bottom, #ff3da3, rgba(168,85,247,0.3), transparent)" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="bg-crd-bg">

        {/* Info row */}
        <Reveal>
          <div className="mx-auto grid max-w-5xl gap-10 px-6 py-16 sm:px-8 md:grid-cols-2">
            <div className="flex flex-col items-center border-t border-[#a855f7]/25 pt-5 text-center">
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.3em] text-[#a855f7]/60 sm:text-sm">{t.club.capacityLabel}</p>
              <div className="mt-1 flex items-baseline gap-3">
                <span className="font-display text-3xl font-semibold tracking-[-0.02em] text-[#a855f7]">220+</span>
                <span className="text-base text-[#a89f90]">{t.club.persoane}</span>
              </div>
            </div>
            <div className="flex flex-col items-center border-t border-[#a855f7]/25 pt-5 text-center">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#a855f7]/60 sm:text-sm">{t.club.hoursLabel}</p>
              <div className="flex items-baseline gap-3">
                <span className="font-display text-3xl font-semibold tracking-[-0.02em] text-[#a855f7]">04:00</span>
                <span className="text-sm text-[#a89f90]">{t.club.nocturn}</span>
              </div>
              <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                {t.club.events.split(" • ").map((ev) => (
                  <span key={ev} className="rounded-full border border-[#ff3da3]/20 bg-[#ff3da3]/[0.06] px-3 py-1.5 text-sm text-[#f5f0e8]/75">
                    {ev}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <Divider />

        {/* Story section */}
        <Reveal>
          <div className="mx-auto mt-20 max-w-3xl px-6 sm:px-8 text-center">
            <p className="mb-4 text-[0.62rem] font-semibold uppercase tracking-[0.38em] text-[#a855f7]/60">
              {t.club.storyEyebrow}
            </p>
            <h2
              className="font-serif font-light leading-[1.1] text-[#f5f0e8] text-balance"
              style={{ fontSize: "clamp(2rem,4.5vw,3.2rem)" }}
            >
              {t.club.storyHeadline}
              <br />
              <em className="italic text-[#ff3da3]">{t.club.storyEm}</em>
            </h2>
            <p className="mx-auto mt-7 max-w-xl font-serif italic text-[1.1rem] leading-[1.7] text-[#f5f0e8]/65 text-pretty">
              {t.club.storyP1}
            </p>
            <p className="mx-auto mt-4 max-w-xl font-serif italic text-[1.05rem] leading-[1.7] text-[#f5f0e8]/45 text-pretty">
              {t.club.storyP2}
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <ReservationTrigger
                className="inline-flex items-center gap-2.5 rounded-lg px-7 py-3.5 text-[11px] font-semibold tracking-[0.28em] uppercase text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-10px_rgba(168,85,247,0.6)]"
                style={{ background: "linear-gradient(135deg, #3b82f6 0%, #a855f7 52%, #ff3da3 100%)" }}
              >
                {t.club.bookCta} →
              </ReservationTrigger>
              <AddressLink className="inline-flex items-center gap-2.5 rounded-lg border border-white/15 px-7 py-3.5 text-[11px] font-medium tracking-[0.28em] uppercase text-[#f5f0e8]/60 transition-all duration-300 hover:border-[#a855f7]/40 hover:text-[#a855f7]" />
            </div>
          </div>
        </Reveal>

        <div className="mt-20"><Divider /></div>

        {/* Selective notice */}
        <Reveal>
          <div className="mx-auto mt-12 max-w-5xl px-6 sm:px-8">
            <div className="relative overflow-hidden rounded-xl border border-[#a855f7]/15 bg-[#0a0710]/60 px-6 py-4">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-50"
                style={{ background: "radial-gradient(ellipse at left, rgba(168,85,247,0.08), transparent 60%)" }}
              />
              <p className="relative font-serif text-base italic leading-relaxed text-[#a855f7]/85">&#10022; {t.club.selective}</p>
            </div>
          </div>
        </Reveal>

        {/* Instagram */}
        <Reveal>
          <div className="mx-auto mt-6 max-w-5xl px-6 sm:px-8">
            <a
              href="https://www.instagram.com/criss_club_/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-5 rounded-2xl border border-[#a855f7]/15 bg-[#0a0710] px-5 py-4 transition-all duration-300 hover:border-[#a855f7]/30 hover:shadow-[0_0_24px_rgba(168,85,247,0.08)]"
            >
              <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full bg-black shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={clubLogoIg.src} alt="Criss Club" className="h-full w-full rounded-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="mb-1 flex items-center gap-2">
                  <IgIcon />
                  <span className="text-sm font-medium text-[#f5f0e8]">@criss_club_</span>
                </div>
                <p className="text-xs text-[#a89f90]">{t.club.followIg}</p>
              </div>
              <span className="text-[#a855f7]/50 transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            </a>
          </div>
        </Reveal>

        <div className="mt-12"><Divider /></div>

        {/* Next Party */}
        <Reveal>
          <div className="mx-auto mt-16 max-w-5xl px-6 sm:px-8">
            <div className="relative overflow-hidden rounded-2xl border border-[#ff3da3]/[0.18] bg-[#ff3da3]/[0.04] px-8 py-12 text-center">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full"
                style={{ background: "radial-gradient(circle, rgba(255,61,163,0.14), transparent 70%)" }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full"
                style={{ background: "radial-gradient(circle, rgba(201,168,106,0.08), transparent 70%)" }}
              />
              <p className="relative mb-3 text-[0.62rem] font-semibold uppercase tracking-[0.36em] text-[#ff3da3]/60">
                {t.club.upcomingLabel}
              </p>
              <h2 className="relative mb-8 font-display text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-tight tracking-[-0.02em] text-[#f5f0e8]">
                {t.club.upcomingHeading}
              </h2>
              <div className="relative flex flex-wrap justify-center gap-3">
                <a
                  href="https://www.instagram.com/criss_club_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-full bg-[#ff3da3] px-6 py-3 text-[11px] font-semibold tracking-[0.24em] uppercase text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_36px_-10px_rgba(255,61,163,0.55)]"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white" aria-hidden>
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        {/* CTA band — club colors */}
        <Reveal>
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl px-6 py-20 sm:px-8 text-center">
            {/* Ambient glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-2xl"
              style={{ background: "radial-gradient(ellipse 70% 80% at 50% 50%, rgba(139,92,246,0.08) 0%, transparent 70%)" }}
            />
            <p className="relative font-serif italic text-lg text-[#a855f7]/70 mb-8">
              {t.club.bookNightNote}
            </p>
            <div className="relative flex flex-wrap items-center justify-center gap-4">
              <ReservationTrigger
                className="inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-[11px] font-semibold tracking-[0.28em] uppercase text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-10px_rgba(168,85,247,0.6)]"
                style={{ background: "linear-gradient(135deg, #3b82f6 0%, #a855f7 52%, #ff3da3 100%)" }}
              >
                {t.club.bookCta} &rarr;
              </ReservationTrigger>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-full border border-[#25d366]/30 px-7 py-3.5 text-[11px] font-medium tracking-[0.28em] uppercase text-[#25d366]/80 transition-all duration-300 hover:border-[#25d366]/60 hover:text-[#25d366]"
              >
                WhatsApp &rarr;
              </a>
            </div>
          </div>
        </Reveal>
      </div>

    </main>
  );
}
