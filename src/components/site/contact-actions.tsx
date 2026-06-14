"use client";

import { PHONE_DISPLAY, PHONE_TEL, WHATSAPP_URL } from "@/src/lib/contact";
import { PhoneIcon, WhatsAppIcon } from "@/src/components/footer/icons";

/** Call + WhatsApp buttons, button-in-button styling, shared across pages. */
export function ContactActions() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-2.5 rounded-full bg-crd-whatsapp py-1.5 pl-1.5 pr-5 text-sm font-semibold text-[#04210f] shadow-[0_8px_24px_-8px_rgba(37,211,102,0.6)] transition-[transform,box-shadow] duration-[450ms] [transition-timing-function:var(--ease-spring)] hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-8px_rgba(37,211,102,0.75)] active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crd-whatsapp"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#04210f]/15 transition-transform duration-300 [transition-timing-function:var(--ease-spring)] group-hover:scale-110">
          <WhatsAppIcon className="h-4 w-4" />
        </span>
        WhatsApp
      </a>

      <a
        href={`tel:${PHONE_TEL}`}
        className="group inline-flex items-center gap-2.5 rounded-full border border-crd-gold/30 py-1.5 pl-1.5 pr-5 text-sm font-medium text-crd-ink transition-[transform,border-color,background-color] duration-[450ms] [transition-timing-function:var(--ease-spring)] hover:-translate-y-0.5 hover:border-crd-gold/60 hover:bg-crd-gold/[0.06] active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crd-gold"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-crd-gold/30 text-crd-gold transition-transform duration-300 [transition-timing-function:var(--ease-spring)] group-hover:scale-110">
          <PhoneIcon className="h-4 w-4" />
        </span>
        <span className="tabular-nums tracking-wide">{PHONE_DISPLAY}</span>
      </a>
    </div>
  );
}
