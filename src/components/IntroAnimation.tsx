"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import aieveaLogo from "@/images/logos/aievea.svg"

const LETTERS = ["A", "i", "e", "v", "e", "a"]

const LETTER_IN_STAGGER  = 90
const LETTER_IN_DUR      = 700
const HOLD_DURATION      = 300
const LETTERS_IN_TOTAL   = LETTER_IN_STAGGER * (LETTERS.length - 1) + LETTER_IN_DUR + HOLD_DURATION

const LETTER_OUT_STAGGER = 55
const LETTER_OUT_DUR     = 450
const LETTERS_OUT_TOTAL  = LETTER_OUT_STAGGER * (LETTERS.length - 1) + LETTER_OUT_DUR

const CURTAIN_DELAY      = LETTERS_IN_TOTAL + 100
const CURTAIN_DURATION   = 1300
const ANIM_TOTAL         = CURTAIN_DELAY + LETTERS_OUT_TOTAL + 1400

export const INTRO_DURATION_MS = CURTAIN_DELAY + CURTAIN_DURATION
export const HERO_REVEAL_MS    = CURTAIN_DELAY + CURTAIN_DURATION - 150

type Phase = "idle" | "in" | "out" | "done"

export function IntroAnimation({ onDone }: { onDone: () => void }) {
  const [phase, setPhase]         = useState<Phase>("idle")
  const [curtainUp, setCurtainUp] = useState(false)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const t = setTimeout(() => { onDone(); setPhase("done") }, 80)
      return () => clearTimeout(t)
    }

    const t0 = setTimeout(() => setPhase("in"),     80)
    const t1 = setTimeout(() => setPhase("out"),    LETTERS_IN_TOTAL)
    const t2 = setTimeout(() => setCurtainUp(true), CURTAIN_DELAY)
    const t3 = setTimeout(() => onDone(),           HERO_REVEAL_MS)
    const t4 = setTimeout(() => setPhase("done"),   ANIM_TOTAL)

    return () => { clearTimeout(t0); clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4) }
  }, [onDone])

  if (phase === "done") return null

  const isIdle = phase === "idle"
  const isIn   = phase === "in"
  const isOut  = phase === "out"

  const logoDelay = LETTER_IN_STAGGER * (LETTERS.length - 1) + 120

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none" aria-hidden="true">

      {/* Curtain — retracts upward */}
      <div
        className="absolute inset-x-0 top-0"
        style={{
          bottom: curtainUp ? "100%" : "0%",
          transition: curtainUp ? "bottom 1.3s cubic-bezier(0.76, 0, 0.24, 1)" : "none",
          background: "#f5f4f1",
        }}
      />

      {/* Letters + logo — column layout */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-8">

        {/* AIEVEA letters */}
        <div className="flex" style={{ gap: "0.06em" }}>
          {LETTERS.map((letter, i) => {
            const inDelay  = i * LETTER_IN_STAGGER
            const outDelay = i * LETTER_OUT_STAGGER

            const opacity    = isIdle ? 0 : isIn ? 1 : 0
            const blur       = isIdle ? 20 : isIn ? 0 : 14
            const translateY = isIdle ? 48 : isIn ? 0 : -20

            const transition = isOut
              ? `opacity ${LETTER_OUT_DUR}ms cubic-bezier(0.4,0,1,1) ${outDelay}ms,
                 filter  ${LETTER_OUT_DUR}ms cubic-bezier(0.4,0,1,1) ${outDelay}ms,
                 transform ${LETTER_OUT_DUR}ms cubic-bezier(0.4,0,1,1) ${outDelay}ms`
              : isIn
              ? `opacity ${LETTER_IN_DUR}ms cubic-bezier(0.16,1,0.3,1) ${inDelay}ms,
                 filter  ${LETTER_IN_DUR}ms cubic-bezier(0.16,1,0.3,1) ${inDelay}ms,
                 transform ${LETTER_IN_DUR}ms cubic-bezier(0.16,1,0.3,1) ${inDelay}ms`
              : "none"

            return (
              <span
                key={i}
                className="font-sans font-bold text-[#111] leading-none select-none"
                style={{
                  fontSize: `calc((100vw - 64px) / ${LETTERS.length})`,
                  letterSpacing: "0.05em",
                  opacity,
                  filter: `blur(${blur}px)`,
                  transform: `translateY(${translateY}px)`,
                  transition,
                  willChange: "opacity, filter, transform",
                }}
              >
                {letter}
              </span>
            )
          })}
        </div>

        {/* Logo — bigger, fades in after all letters appear */}
        <Image
          src={aieveaLogo}
          alt="Aievea"
          width={160}
          height={160}
          priority
          style={{
            opacity:   isIn ? 1 : 0,
            filter:    isIn ? "blur(0px)" : "blur(12px)",
            transform: isIn ? "translateY(0px) scale(1)" : "translateY(16px) scale(0.85)",
            transition: isIn
              ? `opacity  ${LETTER_IN_DUR}ms  cubic-bezier(0.16,1,0.3,1) ${logoDelay}ms,
                 filter   ${LETTER_IN_DUR}ms  cubic-bezier(0.16,1,0.3,1) ${logoDelay}ms,
                 transform ${LETTER_IN_DUR}ms cubic-bezier(0.16,1,0.3,1) ${logoDelay}ms`
              : isOut
              ? `opacity  ${LETTER_OUT_DUR}ms cubic-bezier(0.4,0,1,1) 0ms,
                 filter   ${LETTER_OUT_DUR}ms cubic-bezier(0.4,0,1,1) 0ms,
                 transform ${LETTER_OUT_DUR}ms cubic-bezier(0.4,0,1,1) 0ms`
              : "none",
            willChange: "opacity, filter, transform",
          }}
        />

      </div>

    </div>
  )
}
