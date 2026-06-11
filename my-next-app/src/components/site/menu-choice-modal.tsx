"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { X, UtensilsCrossed, Wine } from "lucide-react";
import { useLanguage } from "@/src/i18n/language-context";
import cafeImg from "@/src/assets/meniu/cafe/coffe.jpeg";
import clubImg from "@/src/assets/images/images-crissclub/djs/WhatsApp Image 2026-06-02 at 17.36.51.jpeg";

interface MenuChoiceModalProps {
  open: boolean;
  onClose: () => void;
}

export function MenuChoiceModal({ open, onClose }: MenuChoiceModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();
  const { lang } = useLanguage();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open) dialog.showModal();
    else dialog.close();
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleClose = () => onClose();
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [onClose]);

  function handleBackdropClick(e: React.MouseEvent<HTMLDialogElement>) {
    const rect = dialogRef.current?.getBoundingClientRect();
    if (!rect) return;
    if (
      e.clientX < rect.left || e.clientX > rect.right ||
      e.clientY < rect.top || e.clientY > rect.bottom
    ) onClose();
  }

  function navigate(path: string) {
    onClose();
    router.push(path);
  }

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      className="dialog-sheet m-auto w-full max-w-2xl overflow-hidden rounded-xl border border-white/[0.07] bg-[#080604] p-0 backdrop:bg-black/75 backdrop:backdrop-blur-sm open:animate-[fadeIn_260ms_cubic-bezier(0.16,1,0.3,1)]"
      style={{ boxShadow: "0 40px 100px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.05)" }}
    >
      {/* Gold accent line */}
      <div aria-hidden className="h-px bg-gradient-to-r from-transparent via-[#c9a86a]/40 to-transparent" />

      {/* Handle bar — mobile only */}
      <div className="flex justify-center pt-3 pb-1 sm:hidden" aria-hidden>
        <div className="h-1 w-10 rounded-full bg-white/15" />
      </div>

      {/* Header — mobile only */}
      <div className="flex items-center justify-between px-6 pb-3 pt-2 sm:hidden">
        <p className="text-[0.6rem] font-semibold uppercase tracking-[0.36em] text-white/35">
          {lang === "ro" ? "Alege meniul" : "Choose menu"}
        </p>
        <button
          onClick={onClose}
          aria-label="Închide"
          className="flex h-7 w-7 items-center justify-center rounded-md border border-white/10 bg-white/[0.05] text-white/40 transition-all hover:border-white/25 hover:text-white"
        >
          <X className="h-3 w-3" />
        </button>
      </div>

      {/* ── MOBILE: compact rows ── */}
      <div className="divide-y divide-white/[0.06] sm:hidden">

        {/* Cafe row */}
        <button
          onClick={() => navigate("/meniu/cafe")}
          className="group flex w-full items-center gap-4 px-6 py-5 text-left transition-colors duration-200 active:bg-white/[0.06] hover:bg-white/[0.04]"
        >
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-white/10">
            <Image
              src={cafeImg}
              alt="Criss Cafe"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="80px"
            />
            <div className="absolute inset-0 bg-[#080604]/30" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-display text-[1.15rem] font-semibold tracking-[-0.01em] text-[#f5f0e8]"
               style={{ fontFamily: "var(--font-cinzel)" }}>
              Criss Cafe
            </p>
            <p className="mt-0.5 text-[11px] text-[#f5f0e8]/38">
              {lang === "ro" ? "Cafea · Băuturi · Deserturi" : "Coffee · Drinks · Desserts"}
            </p>
          </div>
          <span className="shrink-0 text-[#c9a86a]/30 transition-transform duration-300 group-hover:translate-x-1">→</span>
        </button>

        {/* Club row */}
        <button
          onClick={() => navigate("/meniu/club")}
          className="group flex w-full items-center gap-4 px-6 py-5 text-left transition-colors duration-200 active:bg-white/[0.06] hover:bg-white/[0.04]"
        >
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-white/10">
            <Image
              src={clubImg}
              alt="Criss Club"
              fill
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              sizes="80px"
            />
            <div className="absolute inset-0 bg-[#080604]/30" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-display text-[1.15rem] font-semibold tracking-[-0.01em] text-[#f5f0e8]"
               style={{ fontFamily: "var(--font-cinzel)" }}>
              Criss Club
            </p>
            <p className="mt-0.5 text-[11px] text-[#f5f0e8]/38">
              {lang === "ro" ? "Cocktailuri · Sticle · Shots" : "Cocktails · Bottles · Shots"}
            </p>
          </div>
          <span className="shrink-0 text-[#ff3da3]/30 transition-transform duration-300 group-hover:translate-x-1">→</span>
        </button>
      </div>

      {/* Mobile footer spacing */}
      <div className="h-2 sm:hidden" />

      {/* ── DESKTOP: full split-image layout ── */}
      <div className="hidden sm:block">
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Închide"
          className="absolute right-4 top-4 z-30 flex h-8 w-8 items-center justify-center rounded-md border border-white/20 bg-black/50 text-white/70 backdrop-blur-sm transition-all duration-200 hover:border-white/40 hover:text-white"
        >
          <X className="h-3.5 w-3.5" />
        </button>

        <div className="flex">
          {/* Criss Cafe */}
          <button
            onClick={() => navigate("/meniu/cafe")}
            className="group relative flex-1 overflow-hidden text-left"
            style={{ minHeight: "340px" }}
          >
            <Image
              src={cafeImg}
              alt="Criss Cafe"
              fill
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              sizes="50vw"
              priority
            />
            <div
              className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-70"
              style={{ background: "linear-gradient(to top, rgba(8,6,4,0.88) 0%, rgba(8,6,4,0.4) 55%, rgba(8,6,4,0.18) 100%)" }}
            />
            <div
              className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: "radial-gradient(ellipse at 30% 80%, rgba(201,168,106,0.14), transparent 65%)" }}
            />
            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1.5 p-7">
              <h3 className="font-display text-[1.85rem] font-semibold leading-none tracking-[-0.02em] text-[#f5f0e8]"
                  style={{ fontFamily: "var(--font-cinzel)" }}>
                Criss Cafe
              </h3>
              <p className="mt-1 text-[11px] text-[#f5f0e8]/40 transition-colors duration-300 group-hover:text-[#f5f0e8]/60">
                {lang === "ro" ? "Cafea · Băuturi · Deserturi" : "Coffee · Drinks · Desserts"}
              </p>
              <span className="mt-3 flex items-center gap-2 text-[#c9a86a]/40 transition-all duration-300 group-hover:gap-3 group-hover:text-[#c9a86a]">
                <span className="text-sm">→</span>
                <span className="h-px flex-1 max-w-[40px] origin-left scale-x-0 bg-[#c9a86a]/50 transition-transform duration-500 group-hover:scale-x-100" />
              </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-[#c9a86a] to-transparent transition-transform duration-500 ease-out group-hover:scale-x-100" />
          </button>

          <div className="w-px bg-white/[0.06]" />

          {/* Criss Club */}
          <button
            onClick={() => navigate("/meniu/club")}
            className="group relative flex-1 overflow-hidden text-left"
            style={{ minHeight: "340px" }}
          >
            <Image
              src={clubImg}
              alt="Criss Club"
              fill
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              sizes="50vw"
            />
            <div
              className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-70"
              style={{ background: "linear-gradient(to top, rgba(8,6,4,0.90) 0%, rgba(8,6,4,0.45) 55%, rgba(8,6,4,0.20) 100%)" }}
            />
            <div
              className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: "radial-gradient(ellipse at 70% 80%, rgba(255,61,163,0.12), transparent 65%)" }}
            />
            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1.5 p-7">
              <h3 className="font-display text-[1.85rem] font-semibold leading-none tracking-[-0.02em] text-[#f5f0e8]"
                  style={{ fontFamily: "var(--font-cinzel)" }}>
                Criss Club
              </h3>
              <p className="mt-1 text-[11px] text-[#f5f0e8]/40 transition-colors duration-300 group-hover:text-[#f5f0e8]/60">
                {lang === "ro" ? "Cocktailuri · Sticle · Shots" : "Cocktails · Bottles · Shots"}
              </p>
              <span className="mt-3 flex items-center gap-2 text-[#ff3da3]/40 transition-all duration-300 group-hover:gap-3 group-hover:text-[#ff3da3]">
                <span className="text-sm">→</span>
                <span className="h-px flex-1 max-w-[40px] origin-left scale-x-0 bg-[#ff3da3]/50 transition-transform duration-500 group-hover:scale-x-100" />
              </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-[#ff3da3] to-transparent transition-transform duration-500 ease-out group-hover:scale-x-100" />
          </button>
        </div>

        <div className="border-t border-white/[0.05] px-7 py-4 text-center">
          <p className="text-[9.5px] uppercase tracking-[0.42em] text-white/45">
            {lang === "ro" ? "Alege destinația" : "Choose your destination"}
          </p>
        </div>
      </div>
    </dialog>
  );
}
