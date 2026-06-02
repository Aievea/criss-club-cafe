"use client";

import type { SVGProps } from "react";
import { useLanguage } from "@/src/i18n/language-context";
import { PageHero } from "@/src/components/site/page-hero";
import { ContactActions } from "@/src/components/site/contact-actions";
import { AddressLink } from "@/src/components/site/address-link";
import {
  TruckIcon,
  CateringIcon,
  CocktailIcon,
  BouquetIcon,
} from "@/src/components/footer/icons";

const SERVICE_ICON: Record<string, (p: SVGProps<SVGSVGElement>) => React.ReactElement> = {
  delivery: TruckIcon,
  catering: CateringIcon,
  cocktail: CocktailIcon,
  events: BouquetIcon,
};

export default function ServiciiPage() {
  const { t } = useLanguage();

  return (
    <PageHero
      eyebrow={t.nav.services}
      title={t.services.heading}
      lead={t.pages.services}
    >
      <ul className="mx-auto grid max-w-2xl gap-x-8 gap-y-5 text-left sm:grid-cols-2">
        {t.services.items.map((item) => {
          const Icon = SERVICE_ICON[item.id] ?? CocktailIcon;
          return (
            <li key={item.id} className="group flex items-start gap-3.5">
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-crd-gold/20 bg-crd-gold/[0.06] text-crd-gold shadow-[inset_0_1px_0_rgba(245,240,232,0.06)] transition-[transform,border-color,background-color] duration-[450ms] [transition-timing-function:var(--ease-spring)] group-hover:-translate-y-0.5 group-hover:scale-105 group-hover:border-crd-gold/55 group-hover:bg-crd-gold/[0.13]">
                <Icon className="h-5 w-5" />
              </span>
              <span className="pt-2 text-sm leading-snug text-crd-ink/85 transition-colors duration-300 group-hover:text-crd-ink">
                {item.label}
              </span>
            </li>
          );
        })}
      </ul>

      <div className="mt-14 flex flex-col items-center gap-6">
        <ContactActions />
        <AddressLink />
      </div>
    </PageHero>
  );
}
