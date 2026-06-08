"use client";

import { type SVGProps } from "react";
import Image from "next/image";
import Link from "next/link";
import aieveaLogo from "@/images/logos/aievea.svg";
import { useLanguage } from "@/src/i18n/language-context";
import { DJS } from "@/src/i18n/dictionary";
import { Reveal } from "./footer/reveal";
import { LanguageToggle } from "./footer/language-toggle";
import { useInView } from "./footer/use-in-view";
import {
  BadgeCheckIcon,
  BouquetIcon,
  CameraIcon,
  CateringIcon,
  ClockIcon,
  CocktailIcon,
  HeartIcon,
  PhoneIcon,
  ShieldIcon,
  TruckIcon,
  WhatsAppIcon,
} from "./footer/icons";
import {
  PHONE_DISPLAY,
  PHONE_TEL,
  PHONE2_DISPLAY,
  PHONE2_TEL,
  WHATSAPP_URL,
  AIEVEA_URL,
  ADDRESS,
  MAPS_URL,
} from "@/src/lib/contact";

/* -------------------------------------------------------------------------- */
/*  Icon maps                                                                  */
/* -------------------------------------------------------------------------- */
type IconComponent = (props: SVGProps<SVGSVGElement>) => React.ReactElement;

const SERVICE_ICON: Record<string, IconComponent> = {
  delivery: TruckIcon,
  catering: CateringIcon,
  cocktail: CocktailIcon,
  events: BouquetIcon,
};

const BADGE_ICONS = [ShieldIcon, CameraIcon, BadgeCheckIcon, ClockIcon];

/* -------------------------------------------------------------------------- */
/*  Small building blocks                                                     */
/* -------------------------------------------------------------------------- */

function Wordmark({
  name,
  kind,
  href,
}: {
  name: string;
  kind: string;
  href: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <h3 className="font-display text-2xl leading-none tracking-[-0.01em] text-crd-ink">
        <Link href={href} className="crd-link inline-block">
          {name}
        </Link>
      </h3>
      <span className="font-serif text-base italic tracking-wide text-crd-gold-accent">
        {kind}
      </span>
    </div>
  );
}

function GoldRule({ className = "" }: { className?: string }) {
  return (
    <Reveal className={className}>
      <span
        aria-hidden
        className="block h-px origin-left bg-gradient-to-r from-crd-gold-accent/50 via-crd-gold-accent/20 to-transparent"
        style={{ animation: "crd-rule-grow 900ms cubic-bezier(0.16,1,0.3,1) both" }}
      />
    </Reveal>
  );
}

/* -------------------------------------------------------------------------- */
/*  Footer                                                                     */
/* -------------------------------------------------------------------------- */

export function Footer({ variant }: { variant?: "club" }) {
  const { t } = useLanguage();
  const { ref: sweepRef, inView: sweepIn } = useInView<HTMLDivElement>();
  const isClub = variant === "club";

  return (
    <footer
      className="relative overflow-hidden font-body text-crd-ink"
      style={{
        background: isClub
          ? "linear-gradient(180deg, #060410 0%, #0b0818 45%, #0f0c20 100%)"
          : "linear-gradient(180deg, #111009 0%, #16120e 45%, #1d1813 100%)",
        "--crd-gold-accent": isClub ? "#a855f7" : undefined,
        "--crd-gold-2": isClub ? "#c084fc" : undefined,
      } as React.CSSProperties}
    >
      {/* top seam */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[2px]"
        style={{
          background: isClub
            ? "linear-gradient(90deg, transparent 0%, rgba(168,85,247,0.6) 35%, rgba(255,61,163,0.85) 50%, rgba(168,85,247,0.6) 65%, transparent 100%)"
            : "linear-gradient(90deg, transparent 0%, rgba(201,168,106,0.65) 40%, rgba(230,199,135,0.85) 50%, rgba(201,168,106,0.65) 60%, transparent 100%)",
        }}
      />

      {/* ambient aura */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[1000px] max-w-[130vw] -translate-x-1/2"
        style={{
          background: isClub
            ? "radial-gradient(ellipse at center top, rgba(168,85,247,0.18), rgba(168,85,247,0) 58%)"
            : "radial-gradient(ellipse at center top, rgba(201,168,106,0.22), rgba(201,168,106,0) 58%)",
        }}
      />
      {/* secondary fill */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[120px] h-[320px] w-[600px] max-w-[100vw] -translate-x-1/2"
        style={{
          background: isClub
            ? "radial-gradient(ellipse at center, rgba(255,61,163,0.07), transparent 70%)"
            : "radial-gradient(ellipse at center, rgba(201,168,106,0.07), transparent 70%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 pt-20 pb-10 sm:px-8 lg:px-10">
        {/* ---------------------------------------------------------------- */}
        {/*  Brand hierarchy                                                  */}
        {/* ---------------------------------------------------------------- */}
        <Reveal className="flex flex-col items-center text-center">
          <span className="inline-flex items-center rounded-full border border-crd-gold-accent/25 bg-crd-gold-accent/[0.07] px-3.5 py-1 font-body text-[0.62rem] uppercase tracking-[0.34em] text-crd-gold-accent/90">
            {t.parentEyebrow}
          </span>

          <h2 className="mt-4 font-display text-[clamp(2.4rem,6vw,3.8rem)] font-semibold leading-[0.95] tracking-[-0.02em] text-[#f5f0e8] text-balance">
            <Link
              href="/"
              className="inline-block transition-opacity duration-300 hover:opacity-90"
            >
              Cris Royal
              <span className="block text-crd-gold-accent">Delivery</span>
            </Link>
          </h2>

          {/* royal flourish */}
          <div className="mt-5 flex items-center gap-3 text-crd-gold-accent/80">
            <span className="h-px w-14 bg-gradient-to-r from-transparent to-crd-gold-accent/70" />
            <Diamond />
            <span className="h-px w-14 bg-gradient-to-l from-transparent to-crd-gold-accent/70" />
          </div>

          <p className="mt-5 w-full max-w-xl font-serif text-lg italic leading-snug text-[#f5f0e8]/90 text-pretty sm:text-xl">
            {t.tagline}
          </p>
        </Reveal>

        {/* ---------------------------------------------------------------- */}
        {/*  Three columns                                                    */}
        {/* ---------------------------------------------------------------- */}
        <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-0">
          {/* Column 1 — Criss Cafe */}
          <Reveal as="section" delay={0} className="md:px-9 md:first:pl-0">
            <Wordmark name="Criss Cafe" kind={t.cafe.kind} href="/criss-cafe" />

            <p className="mt-6 text-[0.95rem] leading-relaxed text-[#f5f0e8]/75">
              {t.cafe.seats}
            </p>

            <div className="mt-6">
              <SectionLabel>{t.cafe.hoursLabel}</SectionLabel>
              <dl className="mt-3 space-y-1.5">
                {t.cafe.hours.map((row) => (
                  <div
                    key={row.days}
                    className="flex items-baseline justify-between gap-4 text-[0.95rem]"
                  >
                    <dt className="text-[#f5f0e8]/65">{row.days}</dt>
                    <dd className="tabular-nums tracking-wide text-[#f5f0e8]">
                      {row.time}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-7">
              <SectionLabel>{t.cafe.contactLabel}</SectionLabel>
              <div className="mt-3 flex flex-col gap-3">
                <a
                  href={`tel:${PHONE_TEL}`}
                  className="crd-link inline-flex w-fit items-center gap-2.5 text-[0.95rem] text-[#f5f0e8]"
                >
                  <PhoneIcon className="h-4 w-4 text-crd-gold-accent" />
                  <span className="tabular-nums tracking-wide">{PHONE_DISPLAY}</span>
                </a>
                <a
                  href={`tel:${PHONE2_TEL}`}
                  className="crd-link inline-flex w-fit items-center gap-2.5 text-[0.95rem] text-[#f5f0e8]"
                >
                  <PhoneIcon className="h-4 w-4 text-crd-gold-accent" />
                  <span className="tabular-nums tracking-wide">{PHONE2_DISPLAY}</span>
                </a>
                <WhatsAppButton label="WhatsApp" />
              </div>
              <p className="mt-4 text-[0.88rem] leading-relaxed text-[#a89f90]">
                {t.cafe.reservations}
              </p>
            </div>
          </Reveal>

          {/* Column 2 — Criss Club */}
          <Reveal
            as="section"
            delay={90}
            className="md:border-l md:border-crd-gold-accent/[0.22] md:px-9"
          >
            <Wordmark name="Criss Club" kind={t.club.kind} href="/criss-club" />

            <ul className="mt-6 space-y-2.5 text-[0.95rem] text-[#f5f0e8]/90">
              <li className="flex items-center gap-2.5">
                <Dot /> {t.club.capacity}
              </li>
              <li className="flex items-center gap-2.5">
                <ClockIcon className="h-4 w-4 shrink-0 text-crd-gold-accent" />
                {t.club.open}
              </li>
            </ul>

            <p className="mt-6 text-[0.95rem] leading-relaxed text-[#f5f0e8]/75">
              {t.club.events}
            </p>

            <p className="mt-5 border-t border-crd-gold-accent/25 pt-4 font-serif text-[0.95rem] italic leading-snug text-crd-gold-accent">
              {t.club.selective}
            </p>
          </Reveal>

          {/* Column 3 — Services */}
          <Reveal
            as="section"
            delay={180}
            className="md:border-l md:border-crd-gold-accent/[0.22] md:px-9"
          >
            <h3 className="font-display text-2xl leading-tight tracking-[-0.01em] text-[#f5f0e8] text-balance">
              <Link href="/servicii" className="crd-link inline-block">
                {t.services.heading}
              </Link>
            </h3>

            <ul className="mt-7 space-y-4">
              {t.services.items.map((item) => {
                const Icon = SERVICE_ICON[item.id] ?? CocktailIcon;
                return (
                  <li key={item.id} className="group flex items-start gap-3.5">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-crd-gold-accent/30 bg-crd-gold-accent/[0.10] text-crd-gold-accent transition-[transform,border-color,background-color] duration-[450ms] [transition-timing-function:var(--ease-spring)] group-hover:-translate-y-0.5 group-hover:scale-105 group-hover:border-crd-gold-accent/60 group-hover:bg-crd-gold-accent/[0.18]">
                      <Icon className="h-[18px] w-[18px]" />
                    </span>
                    <span className="pt-1.5 text-[0.95rem] leading-snug text-[#f5f0e8]/80 transition-colors duration-300 group-hover:text-[#f5f0e8]">
                      {item.label}
                    </span>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/*  Trust badges                                                     */}
        {/* ---------------------------------------------------------------- */}
        <div className="mt-20">
          <GoldRule />
          <Reveal
            as="ul"
            className="grid grid-cols-2 gap-x-6 gap-y-8 py-10 md:grid-cols-4 md:gap-x-4"
          >
            {t.badges.map((badge, i) => {
              const Icon = BADGE_ICONS[i] ?? ShieldIcon;
              return (
                <li
                  key={badge}
                  className="group flex flex-col items-center gap-3 px-2 text-center md:flex-row md:gap-3.5 md:text-left"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-crd-gold-accent/35 bg-crd-gold-accent/[0.08] text-crd-gold-accent transition-[transform,border-color] duration-[450ms] [transition-timing-function:var(--ease-spring)] group-hover:-translate-y-0.5 group-hover:border-crd-gold-accent/65 group-hover:bg-crd-gold-accent/[0.15]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-[0.88rem] font-medium leading-snug text-[#f5f0e8]/85 text-balance">
                    {badge}
                  </span>
                </li>
              );
            })}
          </Reveal>
          <GoldRule />
        </div>

        {/* ---------------------------------------------------------------- */}
        {/*  Legal strip                                                      */}
        {/* ---------------------------------------------------------------- */}
        <div className="mt-10 flex flex-col items-center gap-2.5 text-center">
          {/* Entity + address */}
          <p className="text-[0.88rem] leading-relaxed text-[#a89f90]">{t.legal.entity}</p>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="crd-link text-[0.88rem] text-crd-gold-accent/70 transition-colors hover:text-crd-gold-accent"
          >
            {ADDRESS}
          </a>
          <p className="text-[0.88rem] text-[#a89f90]">{t.legal.rights}</p>

          {/* Age restriction */}
          <p className="mt-1 text-[0.88rem] font-medium text-crd-gold-accent/80">
            🔞 {t.legal.age}
          </p>

          {/* Legal links row */}
          <div className="mt-4">
            <a
              href="https://anpc.ro/ce-este-sal/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.88rem] text-[#a89f90] underline underline-offset-2 transition-colors hover:text-crd-gold-accent"
            >
              {t.legal.anpcLabel}
            </a>
          </div>

          <p className="mt-2 italic text-[0.88rem] text-[#a89f90]/70">{t.legal.clientele}</p>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/*  Bottom bar                                                         */}
      {/* ------------------------------------------------------------------ */}
      <div
        ref={sweepRef}
        className="relative"
        style={{ borderTop: isClub ? "1px solid rgba(168,85,247,0.22)" : "1px solid rgba(201,168,106,0.18)" }}
      >
        {/* one-time light sweep across the gold seam */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-px h-px overflow-hidden"
        >
          <span
            className={`crd-sweep block h-px w-1/3 ${sweepIn ? "is-in" : ""}`}
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(245,240,232,0.85), transparent)",
            }}
          />
        </div>

        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-5 px-6 py-7 text-center sm:px-8 md:flex-row md:justify-between md:gap-6 md:text-left lg:px-10">
          <p className="order-2 text-[0.88rem] tracking-wide text-[#a89f90] md:order-1">
            {t.bottom.copyright}
          </p>

          <p className="crd-beat-trigger order-1 flex items-center gap-2 text-[0.88rem] text-[#f5f0e8]/70 md:order-2">
            <HeartIcon className="crd-beat h-3.5 w-3.5 text-crd-gold-accent" />
            {t.bottom.built}
          </p>

          <div className="order-3 flex items-center gap-4">
            <LanguageToggle />
            <span className="hidden h-4 w-px bg-white/15 sm:block" />
            <a
              href={AIEVEA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-[0.88rem] text-[#a89f90] transition-colors hover:text-[#f5f0e8]"
              aria-label={`${t.bottom.crafted} Aievea`}
            >
              <span>{t.bottom.crafted}</span>
              <Image
                src={aieveaLogo}
                alt="Aievea"
                height={28}
                className="h-7 w-auto opacity-80 transition-opacity duration-300 group-hover:opacity-100"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* -------------------------------------------------------------------------- */
/*  Sub-components                                                            */
/* -------------------------------------------------------------------------- */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-crd-gold-accent">
      {children}
    </span>
  );
}

function Dot() {
  return (
    <span
      aria-hidden
      className="inline-block h-1.5 w-1.5 shrink-0 rotate-45 bg-crd-gold-accent/70"
    />
  );
}

function Diamond() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
      <path
        d="M6 0.5 11.5 6 6 11.5 0.5 6Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />
      <circle cx="6" cy="6" r="1.4" fill="currentColor" />
    </svg>
  );
}

function WhatsAppButton({ label }: { label: string }) {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex w-fit items-center gap-2.5 rounded-full bg-crd-whatsapp py-1.5 pl-1.5 pr-4 text-sm font-semibold text-[#04210f] shadow-[0_8px_24px_-8px_rgba(37,211,102,0.55)] transition-[transform,box-shadow] duration-[450ms] [transition-timing-function:var(--ease-spring)] hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-8px_rgba(37,211,102,0.75)] active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crd-whatsapp"
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#04210f]/15 transition-transform duration-300 [transition-timing-function:var(--ease-spring)] group-hover:scale-110">
        <WhatsAppIcon className="h-4 w-4" />
      </span>
      {label}
    </a>
  );
}
