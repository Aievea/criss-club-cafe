"use client";

import { useEffect, useState, type SVGProps } from "react";
import Image from "next/image";
import Link from "next/link";
import aieveaLogo from "@/images/logos/aievea.svg";
import { useLanguage } from "@/src/i18n/language-context";
import { DJS } from "@/src/i18n/dictionary";
import { Reveal } from "./footer/reveal";
import { LanguageToggle } from "./footer/language-toggle";
import { useInView } from "./footer/use-in-view";
import { useMagnetic } from "./footer/use-magnetic";
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

/** A column heading wordmark, typeset rather than a raster logo. */
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
      <span className="font-serif text-base italic tracking-wide text-crd-gold">
        {kind}
      </span>
    </div>
  );
}

/** Gold hairline that draws itself open when it scrolls into view. */
function GoldRule({ className = "" }: { className?: string }) {
  return (
    <Reveal className={className}>
      <span
        aria-hidden
        className="block h-px origin-left bg-gradient-to-r from-crd-gold/60 via-crd-gold/25 to-transparent"
        style={{ animation: "crd-rule-grow 900ms cubic-bezier(0.16,1,0.3,1) both" }}
      />
    </Reveal>
  );
}

/* -------------------------------------------------------------------------- */
/*  Footer                                                                     */
/* -------------------------------------------------------------------------- */

export function Footer() {
  const { t } = useLanguage();
  const { ref: sweepRef, inView: sweepIn } = useInView<HTMLDivElement>();

  return (
    <>
      <FloatingWhatsApp />

      <footer
        className="relative overflow-hidden bg-crd-bg font-body text-crd-ink"
        style={{ borderTop: "1px solid var(--crd-gold-soft)" }}
      >
        {/* ambient gold aura behind the brand mark (static, no idle pulse) */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] max-w-[120vw] -translate-x-1/2"
          style={{
            background:
              "radial-gradient(ellipse at center top, rgba(200,146,42,0.16), rgba(200,146,42,0) 62%)",
          }}
        />
        {/* fine grain / vignette at the base */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0))",
          }}
        />

        <div className="relative mx-auto w-full max-w-6xl px-6 pt-20 pb-10 sm:px-8 lg:px-10">
          {/* ---------------------------------------------------------------- */}
          {/*  Brand hierarchy                                                  */}
          {/* ---------------------------------------------------------------- */}
          <Reveal className="flex flex-col items-center text-center">
            <span className="inline-flex items-center rounded-full border border-crd-gold/25 bg-crd-gold/[0.06] px-3.5 py-1 font-body text-[0.62rem] uppercase tracking-[0.34em] text-crd-gold/90">
              {t.parentEyebrow}
            </span>

            <h2 className="mt-4 font-display text-[clamp(2.2rem,6vw,3.6rem)] font-semibold leading-[0.95] tracking-[-0.02em] text-crd-ink text-balance">
              <Link
                href="/"
                className="inline-block transition-opacity duration-300 hover:opacity-90"
              >
                Cris Royal
                <span className="block text-crd-gold">Delivery</span>
              </Link>
            </h2>

            {/* royal flourish */}
            <div className="mt-5 flex items-center gap-3 text-crd-gold/70">
              <span className="h-px w-12 bg-gradient-to-r from-transparent to-crd-gold/60" />
              <Diamond />
              <span className="h-px w-12 bg-gradient-to-l from-transparent to-crd-gold/60" />
            </div>

            <p className="mt-5 w-full max-w-xl font-serif text-lg italic leading-snug text-crd-ink/85 text-pretty sm:text-xl">
              {t.tagline}
            </p>
          </Reveal>

          {/* ---------------------------------------------------------------- */}
          {/*  Three columns                                                    */}
          {/* ---------------------------------------------------------------- */}
          <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-0">
            {/* Column 1 — Criss Cafe */}
            <Reveal
              as="section"
              delay={0}
              className="md:px-9 md:first:pl-0"
            >
              <Wordmark name="Criss Cafe" kind={t.cafe.kind} href="/criss-cafe" />

              <p className="mt-6 text-sm leading-relaxed text-crd-ink/80">
                {t.cafe.seats}
              </p>

              {/* hours */}
              <div className="mt-6">
                <SectionLabel>{t.cafe.hoursLabel}</SectionLabel>
                <dl className="mt-3 space-y-1.5">
                  {t.cafe.hours.map((row) => (
                    <div
                      key={row.days}
                      className="flex items-baseline justify-between gap-4 text-sm"
                    >
                      <dt className="text-crd-ink/75">{row.days}</dt>
                      <dd className="font-[family-name:var(--font-body)] tabular-nums tracking-wide text-crd-ink/90">
                        {row.time}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* contact */}
              <div className="mt-7">
                <SectionLabel>{t.cafe.contactLabel}</SectionLabel>
                <div className="mt-3 flex flex-col gap-3">
                  <a
                    href={`tel:${PHONE_TEL}`}
                    className="crd-link inline-flex w-fit items-center gap-2.5 text-sm text-crd-ink/90"
                  >
                    <PhoneIcon className="h-4 w-4 text-crd-gold" />
                    <span className="tabular-nums tracking-wide">
                      {PHONE_DISPLAY}
                    </span>
                  </a>
                  <WhatsAppButton label="WhatsApp" />
                </div>
                <p className="mt-4 text-xs leading-relaxed text-crd-muted">
                  {t.cafe.reservations}
                </p>
              </div>
            </Reveal>

            {/* Column 2 — Criss Club */}
            <Reveal
              as="section"
              delay={90}
              className="md:border-l md:border-white/[0.07] md:px-9"
            >
              <Wordmark name="Criss Club" kind={t.club.kind} href="/criss-club" />

              <ul className="mt-6 space-y-2.5 text-sm text-crd-ink/85">
                <li className="flex items-center gap-2.5">
                  <Dot /> {t.club.capacity}
                </li>
                <li className="flex items-center gap-2.5">
                  <ClockIcon className="h-4 w-4 shrink-0 text-crd-gold" />
                  {t.club.open}
                </li>
              </ul>

              <div className="mt-6">
                <SectionLabel>{t.club.djLabel}</SectionLabel>
                <div className="mt-3 flex flex-wrap gap-x-2 gap-y-2 text-sm">
                  {DJS.map((dj, i) => (
                    <span key={dj} className="flex items-center gap-2">
                      <span className="text-crd-ink/90">{dj}</span>
                      {i < DJS.length - 1 && (
                        <span className="text-crd-gold/50">•</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>

              <p className="mt-6 text-sm leading-relaxed text-crd-ink/80">
                {t.club.events}
              </p>

              <p className="mt-5 border-t border-crd-gold/15 pt-4 font-serif text-base italic leading-snug text-crd-gold/90">
                {t.club.selective}
              </p>
            </Reveal>

            {/* Column 3 — Services */}
            <Reveal
              as="section"
              delay={180}
              className="md:border-l md:border-white/[0.07] md:px-9"
            >
              <h3 className="font-display text-2xl leading-tight tracking-[-0.01em] text-crd-ink text-balance">
                <Link href="/servicii" className="crd-link inline-block">
                  {t.services.heading}
                </Link>
              </h3>

              <ul className="mt-7 space-y-4">
                {t.services.items.map((item) => {
                  const Icon = SERVICE_ICON[item.id] ?? CocktailIcon;
                  return (
                    <li key={item.id} className="group flex items-start gap-3.5">
                      <span
                        className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-crd-gold/20 bg-crd-gold/[0.06] text-crd-gold shadow-[inset_0_1px_0_rgba(245,240,232,0.06)] transition-[transform,border-color,background-color] duration-[450ms] [transition-timing-function:var(--ease-spring)] group-hover:-translate-y-0.5 group-hover:scale-105 group-hover:border-crd-gold/55 group-hover:bg-crd-gold/[0.13]"
                      >
                        <Icon className="h-[18px] w-[18px]" />
                      </span>
                      <span className="pt-1.5 text-sm leading-snug text-crd-ink/85 transition-colors duration-300 group-hover:text-crd-ink">
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
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-crd-gold/25 text-crd-gold shadow-[inset_0_1px_0_rgba(245,240,232,0.06)] transition-[transform,border-color] duration-[450ms] [transition-timing-function:var(--ease-spring)] group-hover:-translate-y-0.5 group-hover:border-crd-gold/55">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-[0.82rem] font-medium leading-snug text-crd-ink/85 text-balance">
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
          <div className="mt-10 flex flex-col items-center gap-1.5 text-center text-xs leading-relaxed text-crd-muted">
            <p>{t.legal.entity}</p>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="crd-link"
            >
              {ADDRESS}
            </a>
            <p>{t.legal.rights}</p>
            <p className="italic">{t.legal.clientele}</p>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/*  Bottom bar                                                         */}
        {/* ------------------------------------------------------------------ */}
        <div
          ref={sweepRef}
          className="relative"
          style={{ borderTop: "1px solid rgba(200,146,42,0.55)" }}
        >
          {/* one-time light sweep across the gold seam when it scrolls in */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -top-px h-px overflow-hidden"
          >
            <span
              className={`crd-sweep block h-px w-1/3 ${sweepIn ? "is-in" : ""}`}
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(245,240,232,0.95), transparent)",
              }}
            />
          </div>

          <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-5 px-6 py-7 text-center sm:px-8 md:flex-row md:justify-between md:gap-6 md:text-left lg:px-10">
            <p className="order-2 text-xs tracking-wide text-crd-muted md:order-1">
              {t.bottom.copyright}
            </p>

            <p className="crd-beat-trigger order-1 flex items-center gap-2 text-xs text-crd-ink/80 md:order-2">
              <HeartIcon className="crd-beat h-3.5 w-3.5 text-crd-gold" />
              {t.bottom.built}
            </p>

            <div className="order-3 flex items-center gap-4">
              <LanguageToggle />
              <span className="hidden h-4 w-px bg-white/10 sm:block" />
              <a
                href={AIEVEA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-xs text-crd-muted transition-colors hover:text-crd-ink"
                aria-label={`${t.bottom.crafted} Aievea`}
              >
                <span>{t.bottom.crafted}</span>
                <Image
                  src={aieveaLogo}
                  alt="Aievea"
                  height={28}
                  className="h-7 w-auto opacity-90 transition-opacity duration-300 group-hover:opacity-100"
                />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  Sub-components                                                            */
/* -------------------------------------------------------------------------- */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-crd-gold/80">
      {children}
    </span>
  );
}

function Dot() {
  return (
    <span
      aria-hidden
      className="inline-block h-1.5 w-1.5 shrink-0 rotate-45 bg-crd-gold/70"
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
      className="group inline-flex w-fit items-center gap-2.5 rounded-full bg-crd-whatsapp py-1.5 pl-1.5 pr-4 text-sm font-semibold text-[#04210f] shadow-[0_8px_24px_-8px_rgba(37,211,102,0.6)] transition-[transform,box-shadow] duration-[450ms] [transition-timing-function:var(--ease-spring)] hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-8px_rgba(37,211,102,0.75)] active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crd-whatsapp"
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#04210f]/15 transition-transform duration-300 [transition-timing-function:var(--ease-spring)] group-hover:scale-110">
        <WhatsAppIcon className="h-4 w-4" />
      </span>
      {label}
    </a>
  );
}

/**
 * Fixed, always-visible WhatsApp action. No idle pulse loop — instead it
 * materializes once on mount, follows the pointer magnetically (fine pointers
 * only), and gives a spring scale on hover / press.
 */
function FloatingWhatsApp() {
  const magneticRef = useMagnetic<HTMLAnchorElement>();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <a
      ref={magneticRef}
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className="group fixed bottom-5 right-5 z-[var(--z-float)] block rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:bottom-7 sm:right-7"
      style={{ transition: "transform 0.45s var(--ease-spring)" }}
    >
      <span
        className={`flex h-14 w-14 items-center justify-center rounded-full bg-crd-whatsapp text-white shadow-[0_14px_34px_-8px_rgba(37,211,102,0.6)] ring-1 ring-white/15 transition-[transform,opacity,box-shadow] duration-500 [transition-timing-function:var(--ease-spring)] group-hover:scale-110 group-hover:shadow-[0_18px_44px_-8px_rgba(37,211,102,0.85)] group-active:scale-95 ${
          mounted ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
      >
        <WhatsAppIcon className="h-7 w-7" />
      </span>
    </a>
  );
}
