"use client";

import { useLanguage } from "@/src/i18n/language-context";
import { SiteNav } from "@/src/components/site/site-nav";
import { BackButton } from "@/src/components/site/back-button";
import { ContactActions } from "@/src/components/site/contact-actions";
import { AddressLink } from "@/src/components/site/address-link";
import { Reveal } from "@/src/components/footer/reveal";
import clubVideo from "@/src/assets/video/video-crissclub/WhatsApp Video 2026-06-02 at 17.35.15.mp4";
import clubLogoIg from "@/src/assets/images/logos/crisclublogoig.jpeg";
import { PHONE_TEL, PHONE_DISPLAY } from "@/src/lib/contact";

function GoldDivider() {
  return (
    <div className="mx-auto max-w-5xl px-6 sm:px-8">
      <span className="block h-px bg-gradient-to-r from-transparent via-[#c9a86a]/30 to-transparent" />
    </div>
  );
}

function IgIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" aria-hidden>
      <defs>
        <radialGradient id="ig-club" cx="30%" cy="107%" r="150%">
          <stop offset="0%" stopColor="#ffd600"/>
          <stop offset="30%" stopColor="#ff6930"/>
          <stop offset="60%" stopColor="#fe3b96"/>
          <stop offset="100%" stopColor="#a60dca"/>
        </radialGradient>
      </defs>
      <path fill="url(#ig-club)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

export default function CrissClubPage() {
  const { t, lang } = useLanguage();

  return (
    <main className="overflow-hidden bg-crd-bg font-body text-crd-ink">
      <SiteNav />
      <BackButton />

      {/* â”€â”€ Cinematic video hero with text overlay â”€â”€ */}
      <section className="relative isolate flex min-h-screen min-h-[100svh] flex-col overflow-hidden">
        {/* Video */}
        <video
          className="absolute inset-0 h-full w-full object-cover -z-20"
          style={{ filter: "saturate(0.85) brightness(0.52) contrast(1.08)" }}
          autoPlay muted loop playsInline preload="metadata"
        >
          <source src={clubVideo} type="video/mp4" />
        </video>

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background: `
              radial-gradient(120% 80% at 50% 40%, transparent 0%, rgba(10,8,6,0.55) 65%, rgba(10,8,6,0.92) 100%),
              linear-gradient(180deg, rgba(10,8,6,0.5) 0%, rgba(10,8,6,0.08) 35%, rgba(10,8,6,0.85) 100%)
            `,
          }}
        />

        {/* Hero text â€” centered over video */}
        <div className="relative z-10 flex flex-1 flex-col items-center justify-start px-6 pt-32 pb-10 text-center">
          <span
            className="inline-flex items-center rounded-full border border-white/20 bg-white/[0.05] px-3.5 py-1 text-[0.62rem] uppercase tracking-[0.28em] text-white/70"
            style={{ animation: "crd-fade-up 1100ms var(--ease-expo) 0ms both" }}
          >
            {t.club.kind}
          </span>
          <h1
            className="mt-5 font-display text-[clamp(3rem,9vw,7rem)] font-semibold leading-[0.95] tracking-[-0.02em] text-[#f5f0e8] text-balance"
            style={{ animation: "crd-fade-up 1200ms var(--ease-expo) 110ms both" }}
          >
            Criss Club
          </h1>
          <p
            className="mx-auto mt-6 max-w-2xl text-[clamp(1.1rem,1.6vw,1.4rem)] leading-[1.75] text-[#f5f0e8]/75 text-pretty"
            style={{ animation: "crd-fade-up 1200ms var(--ease-expo) 220ms both" }}
          >
            {t.pages.club}
          </p>
        </div>

        {/* Buttons + scroll cue â€” pinned to bottom */}
        <div className="relative z-10 mt-auto flex flex-col items-center gap-5 pb-8">
          <div
            className="flex flex-wrap justify-center gap-3"
            style={{ animation: "crd-fade-up 1100ms var(--ease-expo) 330ms both" }}
          >
            <a
              href={`tel:${PHONE_TEL}`}
              className="inline-flex items-center gap-2 rounded-full bg-[#c9a86a] px-6 py-3 text-[11px] font-semibold tracking-[0.28em] uppercase text-[#1a1411] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-8px_rgba(201,168,106,0.5)]"
            >
              {lang === "ro" ? "Rezervare" : "Book now"} →
            </a>
          </div>
          <div className="flex flex-col items-center gap-3 text-[10px] tracking-[0.4em] uppercase text-white/45">
            <span>scroll</span>
            <div className="h-12 w-px origin-top bg-gradient-to-b from-transparent to-[#c9a86a] animate-[scrollLine_2.4s_ease-in-out_infinite]" aria-hidden />
          </div>
        </div>
      </section>

      {/* â”€â”€ Content â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="bg-crd-bg">

        {/* Info row */}
        <Reveal>
          <div className="mx-auto grid max-w-5xl gap-10 px-6 py-16 sm:px-8 md:grid-cols-3">
            <div className="flex flex-col items-center border-t border-[#c9a86a]/20 pt-5 text-center">
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.3em] text-[#c9a86a]/60 sm:text-sm">Capacitate</p>
              <div className="mt-1 flex items-baseline gap-3">
                <span className="font-display text-3xl font-semibold tracking-[-0.02em] text-[#c9a86a]">220+</span>
                <span className="text-base text-[#a89f90]">{lang === "ro" ? "persoane" : "guests"}</span>
              </div>
            </div>
            <div className="flex flex-col items-center border-t border-[#c9a86a]/20 pt-5 text-center">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#c9a86a]/60 sm:text-sm">{lang === "ro" ? "Program" : "Hours"}</p>
              <div className="flex items-baseline gap-3">
                <span className="font-display text-3xl font-semibold tracking-[-0.02em] text-[#c9a86a]">04:00</span>
                <span className="text-sm text-[#a89f90]">{lang === "ro" ? "nocturn" : "closing"}</span>
              </div>
              <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                {t.club.events.split(" â€¢ ").map((ev) => (
                  <span key={ev} className="rounded-full border border-[#ff3da3]/20 bg-[#ff3da3]/[0.06] px-3 py-1.5 text-sm text-[#f5f0e8]/75">
                    {ev}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center border-t border-[#c9a86a]/20 pt-5 text-center">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#c9a86a]/60 sm:text-sm">Contact</p>
              <ContactActions />
              <div className="mt-3"><AddressLink /></div>
            </div>
          </div>
        </Reveal>

        <GoldDivider />

        {/* Selective notice */}
        <Reveal>
          <div className="mx-auto mt-12 max-w-5xl px-6 sm:px-8">
            <div className="relative overflow-hidden rounded-xl border border-[#c9a86a]/15 bg-[#0e0c0a]/60 px-6 py-4">
              <div aria-hidden className="pointer-events-none absolute inset-0 opacity-50"
                style={{ background: "radial-gradient(ellipse at left, rgba(201,168,106,0.06), transparent 60%)" }}
              />
              <p className="relative font-serif text-base italic leading-relaxed text-[#c9a86a]/85">✦ {t.club.selective}</p>
            </div>
          </div>
        </Reveal>

        {/* Instagram */}
        <Reveal>
          <div className="mx-auto mt-6 max-w-5xl px-6 sm:px-8">
            <a href="https://www.instagram.com/criss.club" target="_blank" rel="noopener noreferrer"
              className="group flex items-center gap-5 rounded-2xl border border-[#c9a86a]/15 bg-[#0e0c0a] px-5 py-4 transition-all duration-300 hover:border-[#c9a86a]/30"
            >
              <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full bg-black shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={clubLogoIg.src} alt="Criss Club" className="h-full w-full rounded-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="mb-1 flex items-center gap-2">
                  <IgIcon />
                  <span className="text-sm font-medium text-[#f5f0e8]">@criss.club</span>
                </div>
                <p className="text-xs text-[#a89f90]">{lang === "ro" ? "Urmărește-ne pe Instagram" : "Follow us on Instagram"}</p>
              </div>
              <span className="text-[#c9a86a]/50 transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>
        </Reveal>

        <div className="mt-12"><GoldDivider /></div>

        {/* Next Party */}
        <Reveal>
          <div className="mx-auto mt-16 max-w-5xl px-6 sm:px-8">
            <div className="relative overflow-hidden rounded-2xl border border-[#ff3da3]/18 bg-[#ff3da3]/[0.04] px-8 py-12 text-center">
              <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full"
                style={{ background: "radial-gradient(circle, rgba(255,61,163,0.14), transparent 70%)" }}
              />
              <div aria-hidden className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full"
                style={{ background: "radial-gradient(circle, rgba(201,168,106,0.08), transparent 70%)" }}
              />
              <p className="relative mb-3 text-[0.62rem] font-semibold uppercase tracking-[0.36em] text-[#ff3da3]/60">
                {lang === "ro" ? "Evenimente viitoare" : "Upcoming events"}
              </p>
              <h2 className="relative mb-8 font-display text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-tight tracking-[-0.02em] text-[#f5f0e8]">
                {lang === "ro" ? "Află cÃ¢nd e următoarea petrecere" : "Find out when's the next party"}
              </h2>
              <div className="relative flex flex-wrap justify-center gap-3">
                <a href="https://www.instagram.com/criss.club" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-full bg-[#ff3da3] px-6 py-3 text-[11px] font-semibold tracking-[0.24em] uppercase text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_36px_-10px_rgba(255,61,163,0.55)]"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white" aria-hidden>
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        {/* CTA band */}
        <Reveal>
          <div className="mx-auto max-w-5xl px-6 py-24 sm:px-8 text-center">
            <p className="font-serif italic text-lg text-[#f5f0e8]/60 mb-8">
              {lang === "ro" ? "Rezervă-ți locul pentru seara perfectă" : "Book your spot for the perfect night"}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a href={`tel:${PHONE_TEL}`}
                className="inline-flex items-center gap-3 rounded-full bg-[#c9a86a] px-7 py-3.5 text-[11px] font-semibold tracking-[0.28em] uppercase text-[#1a1411] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-10px_rgba(201,168,106,0.5)]"
              >
                {lang === "ro" ? "Rezervare" : "Book now"} · {PHONE_DISPLAY}
              </a>
              <a href="https://wa.me/40746521799" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-full border border-[#25d366]/30 px-7 py-3.5 text-[11px] font-medium tracking-[0.28em] uppercase text-[#25d366]/80 transition-all duration-300 hover:border-[#25d366]/60 hover:text-[#25d366]"
              >
                WhatsApp →
              </a>
            </div>
          </div>
        </Reveal>
      </div>

    </main>
  );
}

