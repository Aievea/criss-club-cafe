"use client";

import { LANGS } from "@/src/i18n/dictionary";
import { useLanguage } from "@/src/i18n/language-context";
import { dictionary } from "@/src/i18n/dictionary";

/**
 * Segmented RO / EN switch. The active pill slides between options with a
 * spring-ish ease; reduced-motion users get an instant swap via the global
 * media query (transition shorthand is overridden in CSS).
 */
export function LanguageToggle() {
  const { lang, setLang } = useLanguage();
  const activeIndex = LANGS.indexOf(lang);

  return (
    <div
      role="group"
      aria-label="Language"
      className="relative inline-flex items-center rounded-full border border-crd-gold/25 bg-white/[0.03] p-0.5"
    >
      {/* sliding indicator */}
      <span
        aria-hidden
        className="pointer-events-none absolute top-0.5 bottom-0.5 left-0.5 rounded-full bg-crd-gold/15 ring-1 ring-crd-gold/40"
        style={{
          width: `calc((100% - 4px) / ${LANGS.length})`,
          transform: `translateX(${activeIndex * 100}%)`,
          transition: "transform 420ms cubic-bezier(0.16,1,0.3,1)",
        }}
      />
      {LANGS.map((code) => {
        const isActive = code === lang;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            aria-pressed={isActive}
            className={`relative z-10 min-w-9 rounded-full px-3 py-1 font-[family-name:var(--font-body)] text-xs tracking-[0.18em] transition-colors duration-300 ${
              isActive
                ? "text-crd-gold"
                : "text-crd-muted hover:text-crd-ink"
            }`}
          >
            {dictionary[code].langShort}
          </button>
        );
      })}
    </div>
  );
}
