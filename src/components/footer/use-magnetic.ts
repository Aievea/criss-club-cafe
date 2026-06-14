"use client";

import { useEffect, useRef } from "react";

/**
 * Magnetic pull toward the pointer — a rare-interaction delighter for the
 * floating CTA. Gated to fine pointers (no touch) and disabled under
 * prefers-reduced-motion. The element should carry its own
 * `transition: transform` so both the follow and the spring-back are eased.
 */
export function useMagnetic<T extends HTMLElement>(strength = 0.32, max = 10) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!finePointer || reduced) return;

    let raf = 0;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      let dx = (e.clientX - cx) * strength;
      let dy = (e.clientY - cy) * strength;
      const dist = Math.hypot(dx, dy);
      if (dist > max) {
        const k = max / dist;
        dx *= k;
        dy *= k;
      }
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
      });
    };

    const reset = () => {
      cancelAnimationFrame(raf);
      el.style.transform = "translate3d(0, 0, 0)";
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", reset);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", reset);
      cancelAnimationFrame(raf);
    };
  }, [strength, max]);

  return ref;
}
