"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/src/i18n/language-context";
import { SiteNav } from "@/src/components/site/site-nav";
import { BackButton } from "@/src/components/site/back-button";
import { AddressLink } from "@/src/components/site/address-link";
import { Reveal } from "@/src/components/footer/reveal";
import estrelaImg from "@/src/assets/bere/Estrela_Galiza.svg";
import erdingerImg from "@/src/assets/bere/Erdinger_Weißbräu_logo.svg";
import krombacherImg from "@/src/assets/bere/krombacher-vector-logo.svg";
import cafeVideo from "@/src/assets/video/video-crisscafee/WhatsApp Video 2026-06-01 at 21.26.11.mp4";
import cafeLogoIg from "@/src/assets/images/logos/criscafelogoig.jpeg";
import p1 from "@/src/assets/images/images-crisscafee/WhatsApp Image 2026-06-01 at 21.25.25.jpeg";
import p2 from "@/src/assets/images/images-crisscafee/WhatsApp Image 2026-06-01 at 21.25.27.jpeg";
import p3 from "@/src/assets/images/images-crisscafee/WhatsApp Image 2026-06-01 at 21.28.55.jpeg";
import p4 from "@/src/assets/images/images-crisscafee/WhatsApp Image 2026-06-01 at 21.28.56.jpeg";
import p5 from "@/src/assets/images/images-crisscafee/WhatsApp Image 2026-06-01 at 21.28.57 (1).jpeg";
import p6 from "@/src/assets/images/images-crisscafee/WhatsApp Image 2026-06-01 at 21.29.01.jpeg";
import p7 from "@/src/assets/images/images-crisscafee/WhatsApp Image 2026-06-01 at 21.29.01 (1).jpeg";
import p8 from "@/src/assets/images/images-crisscafee/WhatsApp Image 2026-06-01 at 19.28.56.jpeg";
import p9 from "@/src/assets/images/images-crisscafee/WhatsApp Image 2026-06-01 at 21.28.56 (4).jpeg";
import p10 from "@/src/assets/images/images-crisscafee/WhatsApp Image 2026-06-01 at 21.28.56 (5).jpeg";
import p11 from "@/src/assets/images/images-crisscafee/WhatsApp Image 2026-06-01 at 21.29.01 (2).jpeg";
import { WHATSAPP_URL } from "@/src/lib/contact";
import { ReservationTrigger } from "@/src/components/site/reservation-modal";

const BEERS = [
  { img: estrelaImg, name: "Estrela Galiza", dark: true },
  { img: erdingerImg, name: "Erdinger Weißbräu", dark: false },
  { img: krombacherImg, name: "Krombacher", dark: false },
];

const PHOTOS = [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11].map((img) => img.src);

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
        <radialGradient id="ig-cafe" cx="30%" cy="107%" r="150%">
          <stop offset="0%" stopColor="#ffd600"/>
          <stop offset="30%" stopColor="#ff6930"/>
          <stop offset="60%" stopColor="#fe3b96"/>
          <stop offset="100%" stopColor="#a60dca"/>
        </radialGradient>
      </defs>
      <path fill="url(#ig-cafe)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

export default function CrissCafePage() {
  const { t, lang } = useLanguage();

  return (
    <main className="overflow-hidden bg-crd-bg font-body text-crd-ink">
      <SiteNav />
      <BackButton />

      {/* Hero — full-bleed video, content anchored right */}
      <section className="relative isolate flex min-h-screen min-h-[100svh] overflow-hidden">

        {/* Video — always full coverage */}
        <video
          className="absolute inset-0 -z-20 h-full w-full object-cover"
          style={{ filter: "saturate(0.88) brightness(0.54) contrast(1.06)" }}
          autoPlay muted loop playsInline preload="metadata"
        >
          <source src={cafeVideo} type="video/mp4" />
        </video>

        {/* Overlay: dark on right (content side), fades to transparent left so video shows */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background: [
              "linear-gradient(to left, rgba(10,8,6,0.96) 0%, rgba(10,8,6,0.80) 25%, rgba(10,8,6,0.42) 50%, rgba(10,8,6,0.08) 70%, transparent 88%)",
              "linear-gradient(to top, rgba(10,8,6,0.72) 0%, transparent 38%)",
              "linear-gradient(to bottom, rgba(10,8,6,0.55) 0%, transparent 22%)",
              "radial-gradient(ellipse 55% 60% at 78% 55%, rgba(201,168,106,0.08) 0%, transparent 70%)",
            ].join(", "),
          }}
        />

        {/* Content — centered on mobile, right-anchored on desktop */}
        <div className="relative z-10 flex min-h-screen min-h-[100svh] w-full flex-col items-center justify-center gap-10 px-8 pb-20 text-center lg:ml-auto lg:w-[54%] lg:items-start lg:px-16 lg:text-left">

          {/* Wordmark */}
          <div
            className="flex flex-col items-center lg:items-start"
            style={{ animation: "crd-fade-up 1000ms var(--ease-expo) 60ms both" }}
          >
            <div className="mb-4 h-px w-10 bg-[#c9a86a]/55 lg:ml-0" aria-hidden />
            <h1
              className="font-display leading-[0.9] text-[#f5f0e8]"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              <span className="block text-[clamp(1rem,2.4vw,1.6rem)] font-light tracking-[0.35em] text-[#f5f0e8]/52">
                Criss
              </span>
              <span
                className="block text-[clamp(3.8rem,8.5vw,6rem)] font-semibold tracking-[-0.02em]"
                style={{ textShadow: "0 2px 40px rgba(201,168,106,0.38), 0 0 80px rgba(201,168,106,0.15)" }}
              >
                Cafe
              </span>
            </h1>
          </div>

          {/* Buttons */}
          <div
            className="flex flex-wrap justify-center gap-3 lg:justify-start"
            style={{ animation: "crd-fade-up 1000ms var(--ease-expo) 200ms both" }}
          >
            <Link
              href="/meniu/cafe"
              className="inline-flex items-center gap-2 rounded-lg bg-[#c9a86a] px-7 py-3.5 text-[11px] font-semibold tracking-[0.26em] uppercase text-[#1a1411] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-8px_rgba(201,168,106,0.5)]"
            >
              {t.cafe.viewMenuHero} &rarr;
            </Link>
            <ReservationTrigger
              className="inline-flex items-center gap-2 rounded-lg px-7 py-3.5 text-[11px] font-medium tracking-[0.26em] uppercase text-[#c9a86a]/72 transition-all duration-300 hover:text-[#c9a86a]"
              style={{ border: "1px solid rgba(201,168,106,0.28)" }}
            >
              {t.cafe.reserveCta}
            </ReservationTrigger>
          </div>

          {/* Scroll — mouse icon */}
          <div
            className="flex flex-col items-center gap-0 text-white/30 lg:items-start"
            style={{ animation: "crd-fade-up 1000ms var(--ease-expo) 340ms both" }}
            aria-hidden
          >
            <svg width="20" height="32" viewBox="0 0 20 32" fill="none" className="text-white/28">
              <rect x="1" y="1" width="18" height="30" rx="9" stroke="currentColor" strokeWidth="1.2" />
              <rect
                x="9" y="6" width="2" height="7" rx="1" fill="currentColor"
                className="animate-[mouseScroll_2s_ease-in-out_infinite]"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* ── Info row ── */}
      <div className="bg-crd-bg">
        <Reveal>
          <div className="mx-auto grid max-w-5xl gap-10 px-6 py-16 sm:px-8 md:grid-cols-2">
            <div className="flex flex-col items-center border-t border-[#c9a86a]/20 pt-5 text-center">
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.3em] text-[#c9a86a]/60 sm:text-sm">{t.cafe.capacityLabel}</p>
              <p className="font-serif text-xl text-[#f5f0e8]">{t.cafe.seats}</p>
            </div>
            <div className="flex flex-col items-center border-t border-[#c9a86a]/20 pt-5 text-center">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#c9a86a]/60 sm:text-sm">{t.cafe.hoursLabel}</p>
              <dl className="w-full space-y-1.5">
                {t.cafe.hours.map((row) => (
                  <div key={row.days} className="flex justify-between text-base sm:text-lg">
                    <dt className="text-[#f5f0e8]/55">{row.days}</dt>
                    <dd className="tabular-nums text-[#f5f0e8]">{row.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Reveal>

        <GoldDivider />

        {/* ── SEO story section ── */}
        <Reveal>
          <div className="mx-auto mt-20 max-w-3xl px-6 sm:px-8 text-center">
            <p className="mb-4 text-[0.62rem] font-semibold uppercase tracking-[0.38em] text-[#c9a86a]/60">
              {lang === "ro" ? "Povestea noastră" : "Our story"}
            </p>
            <h2 className="font-serif font-light leading-[1.1] text-[#f5f0e8] text-balance"
                style={{ fontSize: "clamp(2rem,4.5vw,3.2rem)" }}>
              {lang === "ro"
                ? <>Nu vindem cafea.<br /><em className="italic text-[#c9a86a]">Vindem 20 de minute de pace.</em></>
                : <>We don&apos;t sell coffee.<br /><em className="italic text-[#c9a86a]">We sell 20 minutes of peace.</em></>
              }
            </h2>
            <p className="mx-auto mt-7 max-w-xl font-serif italic text-[1.1rem] leading-[1.7] text-[#f5f0e8]/65 text-pretty">
              {lang === "ro"
                ? "Criss Cafe e o afacere de familie construită pe un principiu simplu: dacă nu e bun, nu iese din bucătărie. De la espresso la cocktailuri, de la pizza la paste — totul e făcut cu grijă, pentru oameni care știu diferența."
                : "Criss Cafe is a family business built on one principle: if it isn't good, it doesn't leave the kitchen. From espresso to cocktails, from pizza to pasta — everything is made with care, for people who know the difference."
              }
            </p>
            <p className="mx-auto mt-4 max-w-xl font-serif italic text-[1.05rem] leading-[1.7] text-[#f5f0e8]/45 text-pretty">
              {lang === "ro"
                ? "Lounge, pub, social club — în inima Târgu Mureșului, pe Piața Trandafirilor. Vino o dată și înțelegi de ce lumea revine."
                : "Lounge, pub, social club — in the heart of Târgu Mureș, on Piața Trandafirilor. Come once and you'll understand why people keep coming back."
              }
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <ReservationTrigger
                className="inline-flex items-center gap-2.5 rounded-lg bg-[#c9a86a] px-7 py-3.5 text-[11px] font-semibold tracking-[0.28em] uppercase text-[#1a1411] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-10px_rgba(201,168,106,0.5)]"
              >
                {t.cafe.reserveCta} →
              </ReservationTrigger>
              <AddressLink className="inline-flex items-center gap-2.5 rounded-lg border border-white/15 px-7 py-3.5 text-[11px] font-medium tracking-[0.28em] uppercase text-[#f5f0e8]/60 transition-all duration-300 hover:border-[#c9a86a]/40 hover:text-[#c9a86a]" />
            </div>
          </div>
        </Reveal>

        <div className="mt-20"><GoldDivider /></div>

        {/* ── Beers ── */}
        <div className="mx-auto mt-16 max-w-5xl px-6 sm:px-8">
          <Reveal>
            <h2 className="mb-10 text-center font-display text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-tight tracking-[-0.02em] text-[#f5f0e8]">
              {t.cafe.beers}
            </h2>
          </Reveal>
          <div className="flex flex-wrap justify-center gap-12">
            {BEERS.map((beer, i) => (
              <Reveal key={beer.name} delay={i * 70}>
                <div
                  title={beer.name}
                  className="group flex h-20 w-44 items-center justify-center rounded-xl bg-white px-4 transition-all duration-500 hover:-translate-y-1"
                >
                  <Image
                    src={beer.img}
                    alt={beer.name}
                    height={56}
                    unoptimized
                    className="max-h-14 w-auto object-contain opacity-95"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ── Instagram ── */}
        <Reveal>
          <div className="mx-auto mt-10 max-w-5xl px-6 sm:px-8">
            <a href="https://www.instagram.com/criss.cafe" target="_blank" rel="noopener noreferrer"
              className="group flex items-center gap-5 rounded-2xl border border-[#c9a86a]/15 bg-[#0e0c0a] px-5 py-4 transition-all duration-300 hover:border-[#c9a86a]/30"
            >
              <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full bg-white p-1 shadow-[0_4px_16px_rgba(0,0,0,0.35)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={cafeLogoIg.src} alt="Criss Cafe" className="h-full w-full rounded-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="mb-1 flex items-center gap-2">
                  <IgIcon />
                  <span className="text-sm font-medium text-[#f5f0e8]">@criss.cafe</span>
                </div>
                <p className="text-xs text-[#a89f90]">{t.cafe.followIg}</p>
              </div>
              <span className="text-[#c9a86a]/50 transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>
        </Reveal>

        <div className="mt-16"><GoldDivider /></div>

        {/* ── Menu button ── */}
        <Reveal>
          <div className="mx-auto mt-16 max-w-5xl px-6 sm:px-8 text-center">
            <h2 className="mb-6 font-display text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-tight tracking-[-0.02em] text-[#f5f0e8]">
              {t.cafe.menuHeading}
            </h2>
            <Link href="/meniu/cafe"
              className="inline-flex items-center gap-3 rounded-full bg-[#c9a86a] px-8 py-4 text-[11.5px] font-semibold tracking-[0.28em] uppercase text-[#1a1411] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-10px_rgba(201,168,106,0.5)]"
            >
              {t.cafe.viewMenuCta} →
            </Link>
          </div>
        </Reveal>

        <div className="mt-16"><GoldDivider /></div>

        {/* ── Gallery ── */}
        <div className="mx-auto mt-16 max-w-5xl px-6 sm:px-8">
          <Reveal>
            <h2 className="mb-10 font-display text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-tight tracking-[-0.02em] text-[#f5f0e8]">
              {t.cafe.galleryHeading}
            </h2>
          </Reveal>
          <Reveal delay={60}>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              <div className="group col-span-2 overflow-hidden rounded-xl border border-[#c9a86a]/12 shadow-[0_8px_32px_rgba(0,0,0,0.35)]">
                <div className="relative aspect-[16/9]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={PHOTOS[0]} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-[1000ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.04]" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1a1411]/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>
              </div>
              {PHOTOS.slice(1).map((src) => (
                <div key={src} className="group overflow-hidden rounded-xl border border-[#c9a86a]/12 shadow-[0_4px_16px_rgba(0,0,0,0.3)]">
                  <div className="relative aspect-square">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-[1000ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.04]" />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1a1411]/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* ── CTA band ── */}
        <Reveal>
          <div className="mx-auto max-w-5xl px-6 py-24 sm:px-8 text-center">
            <p className="font-serif italic text-lg text-[#f5f0e8]/60 mb-8">
              {t.cafe.bookTableNote}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <ReservationTrigger
                className="inline-flex items-center gap-3 rounded-full bg-[#c9a86a] px-7 py-3.5 text-[11px] font-semibold tracking-[0.28em] uppercase text-[#1a1411] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-10px_rgba(201,168,106,0.5)]"
              >
                {t.cafe.reserveCta} →
              </ReservationTrigger>
              <Link href="/meniu/cafe"
                className="inline-flex items-center gap-3 rounded-full border border-white/20 px-7 py-3.5 text-[11px] font-medium tracking-[0.28em] uppercase text-[#f5f0e8]/75 transition-all duration-300 hover:border-[#c9a86a]/50 hover:text-[#c9a86a]"
              >
                {t.cafe.menuHeading} →
              </Link>
            </div>
          </div>
        </Reveal>
      </div>

    </main>
  );
}
