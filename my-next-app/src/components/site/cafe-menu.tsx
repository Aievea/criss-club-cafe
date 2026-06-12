"use client";

import { useState } from "react";
import { MENU_TABS } from "@/src/data/cafe-menu";
import { type Lang } from "@/src/i18n/dictionary";

export function CafeMenu({ lang }: { lang: Lang }) {
  const [activeTab, setActiveTab] = useState(MENU_TABS[0].id);

  const tab = MENU_TABS.find((t) => t.id === activeTab)!;

  return (
    <div className="w-full">
      {/* Tab bar */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {MENU_TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
              activeTab === t.id
                ? "bg-white/[0.12] text-crd-ink ring-1 ring-white/20"
                : "text-crd-muted hover:text-crd-ink"
            }`}
          >
            <span>{t.emoji}</span>
            <span>{lang === "ro" ? t.label : t.labelEn}</span>
          </button>
        ))}
      </div>

      {/* Categories + items */}
      <div className="mt-6 space-y-8">
        {tab.categories.map((cat) => (
          <div key={cat.id}>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-crd-muted">
              {cat.label}
            </h3>
            <div className="divide-y divide-white/[0.05] rounded-2xl border border-white/[0.07] bg-white/[0.02] overflow-hidden">
              {cat.items.map((item, i) => (
                <div key={i} className="flex items-start justify-between gap-4 px-4 py-3.5 transition-colors duration-200 hover:bg-white/[0.03]">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="text-sm font-medium text-crd-ink">{item.name}</span>
                      {item.volume && (
                        <span className="text-xs text-crd-muted shrink-0">{item.volume}</span>
                      )}
                    </div>
                    {item.desc && (
                      <p className="mt-0.5 text-xs leading-relaxed text-crd-muted/80 line-clamp-2">
                        {item.desc}
                      </p>
                    )}
                  </div>
                  <span className="shrink-0 text-sm font-semibold text-crd-ink tabular-nums">
                    {item.price} <span className="text-xs font-normal text-crd-muted">LEI</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
