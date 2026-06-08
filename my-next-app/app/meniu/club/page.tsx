"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/src/i18n/language-context";
import { SiteNav } from "@/src/components/site/site-nav";
import { BackButton } from "@/src/components/site/back-button";
import { getMenu, type CategoryWithItems } from "@/src/lib/supabase";
import {
  Wine, Zap, Beer, GlassWater, Music,
  type LucideIcon,
} from "lucide-react";

const CLUB_ICONS: Record<string, LucideIcon> = {
  "Sticle": Wine,
  "Cocktailuri": Music,
  "Shots": Zap,
  "Bere": Beer,
  "Băuturi nealcoolice": GlassWater,
};

function getClubIcon(nameRo: string): LucideIcon {
  return CLUB_ICONS[nameRo] ?? Wine;
}

export default function ClubMenuPage() {
  const { lang } = useLanguage();
  const [menu, setMenu] = useState<CategoryWithItems[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    getMenu("club").then((data) => {
      setMenu(data);
      if (data.length > 0) setActive(data[0].id);
      setLoading(false);
    });
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-crd-bg font-body text-crd-ink">
      <SiteNav />
      <BackButton />

      {/* Hero */}
      <div className="pt-28 pb-10 text-center px-6">
        <span className="inline-flex items-center rounded-full border border-[#ff3da3]/20 bg-[#ff3da3]/[0.06] px-3.5 py-1 text-[0.62rem] uppercase tracking-[0.28em] text-[#ff3da3]/70">
          {lang === "ro" ? "Club" : "Club"}
        </span>
        <h1 className="mt-4 font-display text-[clamp(2.5rem,7vw,5rem)] font-semibold leading-[1] tracking-[-0.02em] text-[#f5f0e8]">
          Criss Club
        </h1>
        <p className="mt-3 font-serif italic text-[#c9a86a]/80">
          {lang === "ro" ? "Meniu" : "Menu"}
        </p>
        <Link
          href="/meniu/cafe"
          className="mt-6 inline-flex items-center gap-2 text-[10.5px] tracking-[0.3em] uppercase text-[#f5f0e8]/40 transition-colors hover:text-[#c9a86a]"
        >
          ← {lang === "ro" ? "Vezi meniul cafenelei" : "View cafe menu"}
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-32">
          <div className="h-px w-24 animate-pulse bg-[#c9a86a]/50" />
        </div>
      ) : (
        <div className="mx-auto max-w-4xl px-4 pb-24 sm:px-8">
          {/* Category tabs */}
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {menu.map((cat) => {
              const Icon = getClubIcon(cat.name_ro);
              return (
                <button
                  key={cat.id}
                  onClick={() => setActive(cat.id)}
                  className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-[11px] font-semibold tracking-[0.22em] uppercase transition-all duration-200 ${
                    active === cat.id
                      ? "bg-[#ff3da3] text-white"
                      : "border border-white/15 text-[#f5f0e8]/50 hover:border-[#ff3da3]/40 hover:text-[#f5f0e8]"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {lang === "ro" ? cat.name_ro : cat.name_en}
                </button>
              );
            })}
          </div>

          {/* Active category items */}
          {menu
            .filter((cat) => cat.id === active)
            .map((cat) => (
              <div key={cat.id}>
                <h2 className="mb-6 font-display text-[clamp(1.5rem,3vw,2.5rem)] font-semibold tracking-[-0.02em] text-[#f5f0e8]">
                  {lang === "ro" ? cat.name_ro : cat.name_en}
                </h2>
                <div className="space-y-px">
                  {cat.items.map((item, i) => (
                    <div
                      key={item.id}
                      className="flex items-baseline justify-between gap-4 border-b border-[#ff3da3]/10 py-4 last:border-0"
                      style={{ animationDelay: `${i * 40}ms` }}
                    >
                      <div className="flex-1">
                        <span className="text-base text-[#f5f0e8]">
                          {lang === "ro" ? item.name_ro : item.name_en}
                        </span>
                        {(lang === "ro" ? item.description_ro : item.description_en) && (
                          <p className="mt-0.5 text-sm text-[#a89f90]">
                            {lang === "ro" ? item.description_ro : item.description_en}
                          </p>
                        )}
                        {item.unit && (
                          <span className="text-xs text-[#ff3da3]/50">{item.unit}</span>
                        )}
                      </div>
                      <span className="shrink-0 font-display text-lg font-semibold tabular-nums text-[#c9a86a]">
                        {item.price} <span className="text-sm font-normal text-[#c9a86a]/60">lei</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      )}
    </main>
  );
}
