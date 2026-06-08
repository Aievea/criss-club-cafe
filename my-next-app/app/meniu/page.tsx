"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Coffee, GlassWater, Wine, UtensilsCrossed, type LucideProps } from "lucide-react";
import { BackButton } from "@/src/components/site/back-button";
import { SiteNav } from "@/src/components/site/site-nav";
import { MENU_TABS } from "@/src/data/cafe-menu";
import coffeeImg from "@/src/assets/meniu/coffe.jpeg";
import drinksImg from "@/src/assets/meniu/bauturi.jpeg";
import cocktailsImg from "@/src/assets/meniu/cocktailuri.jpeg";
import foodImg from "@/src/assets/meniu/mancare.jpeg";

const TAB_PHOTOS: Record<string, typeof coffeeImg> = {
  coffee: coffeeImg,
  drinks: drinksImg,
  cocktails: cocktailsImg,
  food: foodImg,
};

const TAB_ICONS: Record<string, React.ComponentType<LucideProps>> = {
  coffee: Coffee,
  drinks: GlassWater,
  cocktails: Wine,
  food: UtensilsCrossed,
};

export default function MeniuPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(MENU_TABS[0].id);
  const [prevTab, setPrevTab] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const tab = MENU_TABS.find((t) => t.id === activeTab)!;

  function switchTab(id: string) {
    if (id === activeTab) return;
    setPrevTab(activeTab);
    setActiveTab(id);
    setTimeout(() => {
      contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }

  return (
    <div className="min-h-screen bg-[#080706] font-body text-[#f5f0e8]">
      <SiteNav />

      <BackButton />

      {/* â”€â”€ Hero â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="relative flex flex-col items-center px-6 pb-16 pt-36 text-center">
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[460px] w-[800px] max-w-full -translate-x-1/2"
          style={{ background: "radial-gradient(ellipse at center top, rgba(201,168,106,0.11), transparent 60%)" }}
        />
        <p className="relative mb-3 font-serif italic text-[#c9a86a]/65" style={{ fontSize: "clamp(13px,1.3vw,16px)", animation: "crd-fade-up 1100ms var(--ease-expo) 0ms both" }}>
          Criss Cafe · Lounge & Pub
        </p>
        <h1
          className="relative font-display font-semibold leading-[0.9] tracking-[-0.04em] text-[#f5f0e8]"
          style={{ fontSize: "clamp(64px,12vw,140px)", animation: "crd-fade-up 1100ms var(--ease-expo) 80ms both" }}
        >
          Meniu
        </h1>
        <div className="relative mt-7 flex items-center gap-4">
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#c9a86a]/40" />
          <span className="text-[#c9a86a]/50 text-[10px]">✦</span>
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#c9a86a]/40" />
        </div>
      </section>

      {/* â”€â”€ Sticky tabs â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="sticky top-0 z-40 border-b border-[#c9a86a]/10 bg-[#080706]/95 backdrop-blur-[16px]">
        <div className="mx-auto grid max-w-5xl grid-cols-4 gap-2 px-4 py-3 sm:flex sm:justify-center sm:gap-2 sm:px-8">
          {MENU_TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => switchTab(t.id)}
              className={`flex flex-col items-center justify-center gap-1 rounded-xl px-2 py-2.5 text-center transition-all duration-300 sm:flex-row sm:gap-2.5 sm:rounded-full sm:px-6 sm:py-3 ${
                activeTab === t.id
                  ? "bg-[#c9a86a] text-[#1a1411] shadow-[0_6px_24px_-4px_rgba(201,168,106,0.55)]"
                  : "border border-white/10 text-[#f5f0e8]/60 hover:border-[#c9a86a]/30 hover:text-[#f5f0e8]/90"
              }`}
            >
              {(() => { const Icon = TAB_ICONS[t.id]; return <Icon className="h-5 w-5 sm:h-4 sm:w-4" strokeWidth={1.5} />; })()}
              <span className="text-[10px] font-semibold tracking-[0.08em] sm:text-[12px] sm:tracking-[0.12em]">{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* â”€â”€ Category photo â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div ref={contentRef} className="relative h-[42vh] min-h-[260px] overflow-hidden">
        <Image
          key={activeTab}
          src={TAB_PHOTOS[activeTab]}
          alt={tab.label}
          fill
          className="object-cover"
          style={{
            filter: "saturate(0.8) brightness(0.55) contrast(1.05)",
            animation: "crd-fade-up 600ms var(--ease-expo) both",
          }}
          priority
        />
        {/* bottom gradient into content */}
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(8,7,6,0.3) 0%, transparent 40%, rgba(8,7,6,0.95) 100%)" }}
        />
        {/* tab name over photo */}
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center pb-8">
          <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-none tracking-[-0.03em] text-[#f5f0e8]">
            {tab.label}
          </h2>
        </div>
      </div>

      {/* â”€â”€ Menu items â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8">
        {tab.categories.map((cat, ci) => (
          <div key={cat.id} className="mb-14 last:mb-0">
            <div className="mb-7 flex items-center gap-4">
              <span className="h-px flex-1 bg-gradient-to-r from-[#c9a86a]/25 to-transparent" />
              <span className="font-display text-[0.65rem] font-semibold uppercase tracking-[0.45em] text-[#c9a86a]/60">
                {cat.label}
              </span>
              <span className="h-px flex-1 bg-gradient-to-l from-[#c9a86a]/25 to-transparent" />
            </div>

            {cat.items.map((item, ii) => (
              <div
                key={ii}
                className="group flex items-baseline justify-between gap-6 border-b border-[#f5f0e8]/[0.055] py-4 transition-all duration-200 last:border-0 hover:border-[#c9a86a]/18"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className="font-serif text-[20px] font-medium leading-snug text-[#f5f0e8]/90 transition-colors duration-200 group-hover:text-[#f5f0e8] sm:text-[24px]">
                      {item.name}
                    </span>
                    {item.volume && (
                      <span className="text-[11px] text-[#a89f90]/80">{item.volume}</span>
                    )}
                  </div>
                  {item.desc && (
                    <p className="mt-0.5 font-serif italic text-[15px] leading-relaxed text-[#a89f90]/75 sm:text-[18px]">
                      {item.desc}
                    </p>
                  )}
                </div>
                <div className="shrink-0">
                  <span className="font-display text-[15px] font-semibold tracking-tight text-[#c9a86a] sm:text-[19px]">
                    {item.price}
                  </span>
                  <span className="ml-1 text-[9px] text-[#a89f90]/60">LEI</span>
                </div>
              </div>
            ))}
          </div>
        ))}

        {/* CTA */}
        <div className="mt-20 flex flex-col items-center gap-5 text-center">
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#c9a86a]/35" />
            <span className="font-serif italic text-xs text-[#a89f90]/70">alergeni la masă · servit cu atenție</span>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#c9a86a]/35" />
          </div>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <a href="tel:0746521799"
              className="inline-flex items-center gap-2 rounded-full bg-[#c9a86a] px-6 py-3 text-[11px] font-semibold tracking-[0.28em] uppercase text-[#1a1411] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-10px_rgba(201,168,106,0.5)]"
            >
              Rezervare →
            </a>
            <Link href="/criss-cafe"
              className="inline-flex items-center gap-2 rounded-full border border-white/12 px-6 py-3 text-[11px] font-medium tracking-[0.28em] uppercase text-[#f5f0e8]/55 transition-all duration-300 hover:border-white/25 hover:text-[#f5f0e8]"
            >
              Criss Cafe
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

