"use client";

import type { SVGProps } from "react";
import { useLanguage } from "@/src/i18n/language-context";
import { SiteNav } from "@/src/components/site/site-nav";
import { BackButton } from "@/src/components/site/back-button";
import { ReservationTrigger } from "@/src/components/site/reservation-modal";
import { AddressLink } from "@/src/components/site/address-link";
import { Reveal } from "@/src/components/footer/reveal";
import {
  TruckIcon,
  CateringIcon,
  CocktailIcon,
  BouquetIcon,
  PhoneIcon,
} from "@/src/components/footer/icons";

type IconFn = (p: SVGProps<SVGSVGElement>) => React.ReactElement;

const SERVICE_ICON: Record<string, IconFn> = {
  delivery: TruckIcon,
  catering: CateringIcon,
  cocktail: CocktailIcon,
  events: BouquetIcon,
};

export default function ServiciiPage() {
  const { t } = useLanguage();

  return (
    <main className="relative min-h-screen overflow-hidden font-body text-[#f5f0e8]"
      style={{ background: "#06050400", backgroundColor: "#080706" }}
    >
      <SiteNav />
      <BackButton />

      {/* Fixed decorative orbs */}
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
        <div className="absolute left-[-20%] top-[10%] h-[700px] w-[700px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(201,168,106,0.06), transparent 70%)" }} />
        <div className="absolute right-[-15%] bottom-[5%] h-[500px] w-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(201,168,106,0.05), transparent 70%)" }} />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-10">

        {/* â”€â”€ Massive hero heading â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <div className="flex min-h-[55vh] flex-col justify-end pb-16 pt-40">
          <span
            className="mb-6 flex items-center gap-3 text-[0.6rem] uppercase tracking-[0.5em] text-[#c9a86a]/50"
            style={{ animation: "crd-fade-up 1100ms var(--ease-expo) 0ms both" }}
          >
            <span className="h-px w-10 bg-[#c9a86a]/30" />
            Cris Royal Delivery
          </span>

          <h1
            className="font-display font-semibold leading-[0.85] tracking-[-0.04em] text-[#f5f0e8]"
            style={{
              fontSize: "clamp(3.5rem,12vw,9rem)",
              animation: "crd-fade-up 1200ms var(--ease-expo) 60ms both",
            }}
          >
            {t.services.heading}
          </h1>

          <p
            className="mt-8 max-w-lg font-serif italic text-[1.05rem] leading-relaxed text-[#f5f0e8]/40"
            style={{ animation: "crd-fade-up 1100ms var(--ease-expo) 180ms both" }}
          >
            {t.pages.services}
          </p>
        </div>

        {/* â”€â”€ Gold rule â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <div className="h-px w-full bg-gradient-to-r from-[#c9a86a]/30 via-[#c9a86a]/10 to-transparent" />

        {/* â”€â”€ Service list â€” editorial rows â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <Reveal>
          <div className="divide-y divide-[#c9a86a]/8">
            {t.services.items.map((item, i) => {
              const Icon = SERVICE_ICON[item.id] ?? CocktailIcon;
              return (
                <div
                  key={item.id}
                  className="group flex items-center gap-8 py-8 transition-all duration-500 hover:pl-4"
                  style={{ transitionTimingFunction: "var(--ease-expo)" }}
                >
                  {/* Number */}
                  <span className="hidden font-display text-[0.7rem] font-semibold tracking-[0.3em] text-[#c9a86a]/30 sm:block w-8 shrink-0">
                    0{i + 1}
                  </span>

                  {/* Icon */}
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#c9a86a]/15 bg-[#c9a86a]/[0.05] text-[#c9a86a] transition-all duration-500 [transition-timing-function:var(--ease-spring)] group-hover:border-[#c9a86a]/40 group-hover:bg-[#c9a86a]/[0.1] group-hover:shadow-[0_0_24px_-4px_rgba(201,168,106,0.3)]">
                    <Icon className="h-5 w-5" />
                  </span>

                  {/* Label */}
                  <p className="flex-1 font-serif text-[1.1rem] leading-snug text-[#f5f0e8]/65 transition-colors duration-300 group-hover:text-[#f5f0e8]/90 sm:text-[1.2rem]">
                    {item.label}
                  </p>

                  {/* Arrow */}
                  <span className="text-[#c9a86a]/20 transition-all duration-500 group-hover:translate-x-1 group-hover:text-[#c9a86a]/60">
                    →
                  </span>
                </div>
              );
            })}
          </div>
        </Reveal>

        {/* â”€â”€ Gold rule â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <div className="h-px w-full bg-gradient-to-r from-[#c9a86a]/30 via-[#c9a86a]/10 to-transparent" />

        {/* â”€â”€ Contact â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <Reveal>
          <div className="flex flex-col items-center gap-5 py-24 text-center">
            <ReservationTrigger className="group inline-flex items-center gap-3 rounded-full border border-crd-gold/30 py-2.5 pl-2.5 pr-8 text-base font-medium text-crd-ink transition-[transform,border-color,background-color] duration-[450ms] [transition-timing-function:var(--ease-spring)] hover:-translate-y-0.5 hover:border-crd-gold/60 hover:bg-crd-gold/[0.06] active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crd-gold">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-crd-gold/30 text-crd-gold transition-transform duration-300 [transition-timing-function:var(--ease-spring)] group-hover:scale-110">
                <PhoneIcon className="h-5 w-5" />
              </span>
              {t.cafe.contactLabel}
            </ReservationTrigger>
            <AddressLink />
          </div>
        </Reveal>
      </div>
    </main>
  );
}

