"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image, { type StaticImageData } from "next/image";
import { useLanguage } from "@/src/i18n/language-context";
import { SiteNav } from "@/src/components/site/site-nav";
import { BackButton } from "@/src/components/site/back-button";
import { getMenu, type CategoryWithItems } from "@/src/lib/supabase";
import {
  Wine, Zap, Beer, GlassWater, Music,
  type LucideIcon,
} from "lucide-react";
import club1 from "@/src/assets/images/images-crissclub/djs/WhatsApp Image 2026-06-02 at 17.36.51.jpeg";
import club2 from "@/src/assets/images/images-crissclub/djs/WhatsApp Image 2026-06-02 at 17.36.51 (1).jpeg";
import club3 from "@/src/assets/images/images-crissclub/djs/WhatsApp Image 2026-06-02 at 17.36.52.jpeg";
import club4 from "@/src/assets/images/images-crissclub/djs/WhatsApp Image 2026-06-02 at 17.36.52 (1).jpeg";
import club5 from "@/src/assets/images/images-crissclub/djs/WhatsApp Image 2026-06-02 at 17.38.10.jpeg";

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

const CLUB_PHOTOS: Record<string, StaticImageData> = {
  "Sticle": club1,
  "Cocktailuri": club2,
  "Shots": club3,
  "Bere": club4,
  "Băuturi nealcoolice": club5,
};

function getStaticPhoto(nameRo: string): StaticImageData | null {
  return CLUB_PHOTOS[nameRo] ?? null;
}

export default function ClubMenuPage() {
  const { lang } = useLanguage();
  const [menu, setMenu] = useState<CategoryWithItems[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<string | null>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getMenu("club").then((data) => {
      setMenu(data);
      if (data.length > 0) setActive(data[0].id);
      setLoading(false);
    });
  }, []);

  function handleTabClick(id: string) {
    setActive(id);
    setTimeout(() => {
      if (!itemsRef.current) return;
      const y = itemsRef.current.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }, 50);
  }

  return (
    <main className="min-h-screen overflow-hidden bg-crd-bg font-body text-crd-ink">
      <SiteNav />
      <BackButton />

      {/* Hero */}
      <div className="pt-28 pb-10 text-center px-6">
        <span className="inline-flex items-center rounded-full border border-white/20 bg-white/[0.05] px-3.5 py-1 text-[0.62rem] uppercase tracking-[0.28em] text-white/70">
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
                  onClick={() => handleTabClick(cat.id)}
                  className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-[11px] font-semibold tracking-[0.22em] uppercase transition-all duration-200 ${
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

          {/* Active category */}
          <div ref={itemsRef}>
            {menu
              .filter((cat) => cat.id === active)
              .map((cat) => {
                const photo: string | StaticImageData | null = cat.photo_url ?? getStaticPhoto(cat.name_ro);
                return (
                  <div key={cat.id}>
                    {/* Category photo */}
                    {photo && (
                      <div className="mb-8 overflow-hidden rounded-xl border border-[#ff3da3]/10 shadow-[0_8px_40px_rgba(0,0,0,0.4)]">
                        <div className="relative aspect-[16/7]">
                          <Image
                            src={photo}
                            alt={cat.name_ro}
                            fill
                            className="object-cover transition-transform duration-700"
                            style={{ filter: "saturate(0.85) brightness(0.82)" }}
                            sizes="(max-width: 768px) 100vw, 896px"
                          />
                          <div
                            className="absolute inset-0"
                            style={{ background: "linear-gradient(to top, rgba(10,8,6,0.72) 0%, transparent 50%)" }}
                          />
                          <div className="absolute bottom-5 left-6">
                            <h2 className="font-display text-[clamp(1.4rem,3vw,2.2rem)] font-semibold tracking-[-0.02em] text-[#f5f0e8]">
                              {lang === "ro" ? cat.name_ro : cat.name_en}
                            </h2>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Items directly in this category */}
                    {cat.items.length > 0 && (
                      <div className="space-y-px">
                        {cat.items.map((item, i) => (
                          <ItemRow key={item.id} item={item} lang={lang} accent="#ff3da3" index={i} />
                        ))}
                      </div>
                    )}

                    {/* Subcategories */}
                    {cat.subcategories.map((sub) => (
                      <div key={sub.id} className="mt-10">
                        <div className="mb-4 flex items-center gap-4">
                          <span className="block h-px flex-1 bg-gradient-to-r from-[#ff3da3]/20 to-transparent" />
                          <h3 className="font-display text-sm font-semibold tracking-[0.2em] uppercase text-[#ff3da3]/70">
                            {lang === "ro" ? sub.name_ro : sub.name_en}
                          </h3>
                          <span className="block h-px flex-1 bg-gradient-to-l from-[#ff3da3]/20 to-transparent" />
                        </div>
                        <div className="space-y-px">
                          {sub.items.map((item, i) => (
                            <ItemRow key={item.id} item={item} lang={lang} accent="#ff3da3" index={i} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </main>
  );
}

function ItemRow({ item, lang, accent, index }: {
  item: { id: string; name_ro: string; name_en: string; description_ro: string | null; description_en: string | null; price: number; unit: string | null };
  lang: string;
  accent: string;
  index: number;
}) {
  return (
    <div
      className="flex items-baseline justify-between gap-4 border-b border-white/8 py-4 last:border-0"
      style={{ animationDelay: `${index * 40}ms` }}
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
          <span className="text-xs" style={{ color: `${accent}80` }}>{item.unit}</span>
        )}
      </div>
      <span className="shrink-0 font-display text-lg font-semibold tabular-nums text-[#c9a86a]">
        {item.price} <span className="text-sm font-normal text-[#c9a86a]/60">lei</span>
      </span>
    </div>
  );
}
