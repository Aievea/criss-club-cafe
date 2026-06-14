"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, type LucideIcon } from "lucide-react";
import { type CategoryWithItems } from "@/src/lib/supabase";

interface CategoryTabsProps {
  menu: CategoryWithItems[];
  active: string | null;
  lang: string;
  getIcon: (nameRo: string) => LucideIcon;
  onSelect: (id: string) => void;
  activeClassName: string;
  inactiveClassName: string;
}

export function CategoryTabs({ menu, active, lang, getIcon, onSelect, activeClassName, inactiveClassName }: CategoryTabsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateArrows = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateArrows();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows, menu]);

  function scroll(direction: 1 | -1) {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: "smooth" });
  }

  return (
    <div className="sticky top-[calc(env(safe-area-inset-top)+4.75rem)] z-30 border-y border-white/[0.06] bg-crd-bg/85 backdrop-blur-md">
      <div className="relative flex items-center">
        {canScrollLeft && (
          <button
            onClick={() => scroll(-1)}
            aria-label="Scroll left"
            className="absolute left-0 z-10 hidden h-full items-center bg-gradient-to-r from-crd-bg via-crd-bg/95 to-transparent pl-3 pr-8 sm:flex"
          >
            <ChevronLeft className="h-4 w-4 text-white/60" />
          </button>
        )}
        <div ref={scrollRef} className="scrollbar-hide flex-1 overflow-x-auto px-4 py-3 sm:px-8">
          <div className="flex gap-2 mx-auto w-max">
          {menu.map((cat) => {
            const Icon = getIcon(cat.name_ro);
            return (
              <button
                key={cat.id}
                onClick={() => onSelect(cat.id)}
                className={`flex shrink-0 items-center gap-2 rounded-lg px-5 py-2.5 text-[11px] sm:text-[13px] font-semibold tracking-[0.22em] uppercase transition-all duration-200 ${
                  active === cat.id ? activeClassName : inactiveClassName
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {lang === "ro" ? cat.name_ro : cat.name_en}
              </button>
            );
          })}
          </div>
        </div>
        {canScrollRight && (
          <button
            onClick={() => scroll(1)}
            aria-label="Scroll right"
            className="absolute right-0 z-10 hidden h-full items-center bg-gradient-to-l from-crd-bg via-crd-bg/95 to-transparent pr-3 pl-8 sm:flex"
          >
            <ChevronRight className="h-4 w-4 text-white/60" />
          </button>
        )}
      </div>
    </div>
  );
}
