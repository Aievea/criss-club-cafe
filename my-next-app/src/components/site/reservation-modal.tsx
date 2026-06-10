"use client";

import { useEffect, useRef, useState } from "react";
import { X, Phone, MessageCircle } from "lucide-react";
import { useLanguage } from "@/src/i18n/language-context";
import { PHONE_DISPLAY, PHONE_TEL, PHONE2_DISPLAY, PHONE2_TEL, WHATSAPP_URL } from "@/src/lib/contact";

interface ReservationModalProps {
  open: boolean;
  onClose: () => void;
}

export function ReservationModal({ open, onClose }: ReservationModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { t } = useLanguage();
  const r = t.reservation;

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open) d.showModal(); else d.close();
  }, [open]);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    const h = () => onClose();
    d.addEventListener("close", h);
    return () => d.removeEventListener("close", h);
  }, [onClose]);

  function handleBackdropClick(e: React.MouseEvent<HTMLDialogElement>) {
    const rect = dialogRef.current?.getBoundingClientRect();
    if (!rect) return;
    if (
      e.clientX < rect.left || e.clientX > rect.right ||
      e.clientY < rect.top || e.clientY > rect.bottom
    ) onClose();
  }

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      className="dialog-sheet m-auto w-full max-w-sm overflow-hidden rounded-xl border border-white/[0.07] bg-[#0d0b09] p-0 sm:rounded-xl open:animate-[fadeIn_260ms_cubic-bezier(0.16,1,0.3,1)] backdrop:bg-black/75 backdrop:backdrop-blur-sm"
      style={{ boxShadow: "0 40px 100px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.05)" }}
    >
      {/* Gold accent line */}
      <div aria-hidden className="h-px bg-gradient-to-r from-transparent via-[#c9a86a]/50 to-transparent" />

      {/* Handle bar — mobile only */}
      <div className="flex justify-center pt-3 pb-1 sm:hidden" aria-hidden>
        <div className="h-1 w-10 rounded-full bg-white/15" />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/[0.06] px-6 pb-5 pt-4 sm:px-7 sm:pt-7">
        <div>
          <p className="text-[0.58rem] font-semibold uppercase tracking-[0.38em] text-[#c9a86a]/60">
            {r.heading}
          </p>
          <p className="mt-1 font-display text-[1.25rem] font-semibold tracking-[-0.01em] text-[#f5f0e8]">
            {r.hint}
          </p>
        </div>
        <button
          onClick={onClose}
          aria-label="Închide"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-white/12 bg-white/[0.05] text-white/50 transition-all duration-200 hover:border-white/25 hover:text-white"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Options */}
      <div className="divide-y divide-white/[0.05]">
        {/* Number 1 */}
        <a
          href={`tel:${PHONE_TEL}`}
          onClick={onClose}
          className="group flex items-center gap-4 px-6 py-5 transition-colors duration-200 active:bg-white/[0.06] sm:px-7 hover:bg-white/[0.04]"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#c9a86a]/25 bg-[#c9a86a]/[0.09] transition-colors group-hover:bg-[#c9a86a]/[0.18]">
            <Phone className="h-[18px] w-[18px] text-[#c9a86a]" strokeWidth={1.4} />
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] text-[#a89f90]/70">{r.num1sub}</p>
            <p className="mt-0.5 text-[1.08rem] font-semibold tabular-nums tracking-[0.03em] text-[#f5f0e8]">{PHONE_DISPLAY}</p>
          </div>
          <span className="shrink-0 text-[#c9a86a]/35 transition-transform duration-300 group-hover:translate-x-1">→</span>
        </a>

        {/* Number 2 */}
        <a
          href={`tel:${PHONE2_TEL}`}
          onClick={onClose}
          className="group flex items-center gap-4 px-6 py-5 transition-colors duration-200 active:bg-white/[0.06] sm:px-7 hover:bg-white/[0.04]"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#c9a86a]/25 bg-[#c9a86a]/[0.09] transition-colors group-hover:bg-[#c9a86a]/[0.18]">
            <Phone className="h-[18px] w-[18px] text-[#c9a86a]" strokeWidth={1.4} />
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] text-[#a89f90]/70">{r.num2sub}</p>
            <p className="mt-0.5 text-[1.08rem] font-semibold tabular-nums tracking-[0.03em] text-[#f5f0e8]">{PHONE2_DISPLAY}</p>
          </div>
          <span className="shrink-0 text-[#c9a86a]/35 transition-transform duration-300 group-hover:translate-x-1">→</span>
        </a>

        {/* WhatsApp row */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClose}
          className="group flex items-center gap-4 px-6 py-5 transition-colors duration-200 active:bg-white/[0.06] sm:px-7 hover:bg-white/[0.04]"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#25d366]/25 bg-[#25d366]/[0.09] transition-colors group-hover:bg-[#25d366]/[0.18]">
            <MessageCircle className="h-[18px] w-[18px] text-[#25d366]" strokeWidth={1.4} />
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-[1.08rem] font-semibold tracking-[0.01em] text-[#f5f0e8]">WhatsApp</p>
          </div>
          <span className="shrink-0 text-[#25d366]/35 transition-transform duration-300 group-hover:translate-x-1">→</span>
        </a>
      </div>
    </dialog>
  );
}

/** Drop-in replacement for <a href="tel:..."> — opens the reservation modal to choose a number. */
export function ReservationTrigger({
  className,
  style,
  children,
}: {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" className={className} style={style} onClick={() => setOpen(true)}>
        {children}
      </button>
      <ReservationModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
