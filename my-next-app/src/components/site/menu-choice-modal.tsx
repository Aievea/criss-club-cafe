"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Coffee, Music, X } from "lucide-react";
import { useLanguage } from "@/src/i18n/language-context";

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
    if (open) {
      dialog.showModal();
    } else {
      dialog.close();
    }
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
    ) {
      onClose();
    }
  }

  function navigate(path: string) {
    onClose();
    router.push(path);
  }

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      className="m-auto w-full max-w-lg rounded-2xl border border-white/10 bg-[#0e0c0a] p-0 backdrop:bg-black/70 backdrop:backdrop-blur-sm open:animate-[fadeIn_200ms_ease-out]"
      style={{ boxShadow: "0 32px 80px rgba(0,0,0,0.8)" }}
    >
      <div className="flex items-center justify-between border-b border-white/8 px-6 py-5">
        <div>
          <p className="text-[0.6rem] font-semibold uppercase tracking-[0.35em] text-[#c9a86a]/60">
            {lang === "ro" ? "Alege meniul" : "Choose menu"}
          </p>
          <h2 className="mt-0.5 font-display text-xl font-semibold tracking-[-0.01em] text-[#f5f0e8]"
              style={{ fontFamily: "var(--font-cinzel)" }}>
            {lang === "ro" ? "Unde vrei să mergi?" : "Where are you headed?"}
          </h2>
        </div>
        <button
          onClick={onClose}
          className="rounded-full p-2 text-white/30 transition-colors hover:bg-white/8 hover:text-white/70"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 p-5">
        <button
          onClick={() => navigate("/meniu/cafe")}
          className="group relative overflow-hidden rounded-xl border border-[#c9a86a]/20 bg-[#0a0806] p-6 text-left transition-all duration-300 hover:border-[#c9a86a]/50 hover:-translate-y-0.5"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: "radial-gradient(ellipse at top, rgba(201,168,106,0.12), transparent 70%)" }}
          />
          <Coffee className="mb-4 h-7 w-7 text-[#c9a86a]" />
          <p className="text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-[#c9a86a]/50">
            {lang === "ro" ? "Cafenea" : "Cafe"}
          </p>
          <h3 className="mt-1 font-display text-lg font-semibold text-[#f5f0e8]"
              style={{ fontFamily: "var(--font-cinzel)" }}>
            Criss Cafe
          </h3>
          <p className="mt-2 text-xs text-[#a89f90]">
            {lang === "ro" ? "Cafea, băuturi, deserturi" : "Coffee, drinks, desserts"}
          </p>
          <span className="mt-4 inline-block text-[#c9a86a]/40 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#c9a86a]">
            →
          </span>
        </button>

        <button
          onClick={() => navigate("/meniu/club")}
          className="group relative overflow-hidden rounded-xl border border-[#ff3da3]/15 bg-[#0a0806] p-6 text-left transition-all duration-300 hover:border-[#ff3da3]/40 hover:-translate-y-0.5"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: "radial-gradient(ellipse at top, rgba(255,61,163,0.08), transparent 70%)" }}
          />
          <Music className="mb-4 h-7 w-7 text-[#ff3da3]" />
          <p className="text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-[#ff3da3]/50">
            Club
          </p>
          <h3 className="mt-1 font-display text-lg font-semibold text-[#f5f0e8]"
              style={{ fontFamily: "var(--font-cinzel)" }}>
            Criss Club
          </h3>
          <p className="mt-2 text-xs text-[#a89f90]">
            {lang === "ro" ? "Sticle, cocktailuri, shots" : "Bottles, cocktails, shots"}
          </p>
          <span className="mt-4 inline-block text-[#ff3da3]/40 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#ff3da3]">
            →
          </span>
        </button>
      </div>
    </dialog>
  );
}
