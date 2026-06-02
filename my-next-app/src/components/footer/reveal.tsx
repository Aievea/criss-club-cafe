"use client";

import { useEffect, useRef, useState } from "react";

type RevealProps = {
  children: React.ReactNode;
  /** ms delay applied to the transition once in view (for staggering). */
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "ul";
};

/**
 * Reveal-on-scroll that degrades safely.
 *
 * The server / no-JS / reduced-motion render is the FINAL visible state — we
 * never gate content behind a class that a headless renderer would leave off.
 * Only after mount, when motion is allowed and IntersectionObserver exists, do
 * we "arm" the hidden state and then release it as the element scrolls in.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(true);

  useEffect(() => {
    const node = ref.current;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced || !("IntersectionObserver" in window) || !node) {
      return;
    }

    // Only animate elements that are genuinely below the fold. Anything
    // already on screen at load stays sharp — we never hide visible content
    // behind an observer that might not fire (headless renders, hidden tabs).
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.95) {
      return;
    }

    // Arm: hide now, then reveal when it enters the viewport.
    setArmed(true);
    setShown(false);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const Tag = as;
  const hidden = armed && !shown;

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={className}
      style={{
        opacity: hidden ? 0 : 1,
        // Jakub's materialize: opacity + lift + a brief defocus that sharpens.
        transform: hidden ? "translateY(18px)" : "translateY(0)",
        filter: hidden ? "blur(8px)" : "blur(0px)",
        transition:
          "opacity 760ms var(--ease-expo), transform 760ms var(--ease-expo), filter 760ms var(--ease-expo)",
        transitionDelay: `${delay}ms`,
        willChange: armed ? "opacity, transform, filter" : undefined,
      }}
    >
      {children}
    </Tag>
  );
}
