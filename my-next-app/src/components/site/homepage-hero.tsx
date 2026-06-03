import Image from "next/image";
import Link from "next/link";
import logo from "@/src/assets/images/logos/logocriscafeclub.svg";
// @ts-expect-error — Next.js resolves video static imports via next.config
import clubVideo from "@/src/assets/video/video-crissclub/WhatsApp Video 2026-06-02 at 17.35.15.mp4";

export function HomepageHero() {
  return (
    <section className="relative isolate flex min-h-screen min-h-[100svh] items-center justify-center overflow-hidden">
      {/* Video background */}
      <video
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        style={{ filter: "saturate(0.85) brightness(0.55) contrast(1.05)" }}
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={clubVideo} type="video/mp4" />
      </video>

      {/* Vignette */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `
            radial-gradient(120% 80% at 50% 40%, transparent 0%, rgba(10,8,6,0.6) 70%, rgba(10,8,6,0.95) 100%),
            linear-gradient(180deg, rgba(10,8,6,0.55) 0%, rgba(10,8,6,0.1) 40%, rgba(10,8,6,0.85) 100%)
          `,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex max-w-[980px] flex-col items-center gap-7 px-6 pb-20 pt-[120px] text-center">
        {/* Kicker */}
        <div className="flex items-center gap-3.5 text-[11px] tracking-[0.42em] uppercase text-[#e6c787]">
          <span className="h-px w-9 bg-[#e6c787] opacity-55" aria-hidden />
          Piața Trandafirilor 43 · Tg Mureș
          <span className="h-px w-9 bg-[#e6c787] opacity-55" aria-hidden />
        </div>

        {/* Logo */}
        <Image
          src={logo}
          alt="Criss Café & Club"
          className="w-[min(560px,78vw)] brightness-0 invert drop-shadow-[0_6px_40px_rgba(0,0,0,0.7)]"
          priority
        />

        {/* Tagline */}
        <p className="font-serif italic tracking-[0.05em] text-[#ece1c8]" style={{ fontSize: "clamp(18px,2.2vw,26px)" }}>
          Lounge{" "}
          <span className="mx-2 font-normal not-italic text-[#e6c787] opacity-80">·</span>
          Pub{" "}
          <span className="mx-2 font-normal not-italic text-[#e6c787] opacity-80">·</span>
          Social Club
        </p>

        {/* CTAs */}
        <div className="mt-1.5 flex flex-wrap justify-center gap-3.5">
          <Link
            href="#meniu"
            className="inline-flex items-center gap-3 rounded-full border border-[#e6c787] bg-[#e6c787] px-6 py-3.5 text-[11.5px] font-semibold tracking-[0.28em] uppercase text-[#1a1411] transition-all duration-200 hover:-translate-y-px hover:shadow-[0_14px_40px_-10px_rgba(230,199,135,0.4)]"
          >
            Descoperă meniul <span className="inline-block transition-transform duration-200">→</span>
          </Link>
          <a
            href="tel:0746521799"
            className="inline-flex items-center gap-3 rounded-full border border-white/35 bg-transparent px-6 py-3.5 text-[11.5px] font-medium tracking-[0.28em] uppercase text-[#ece1c8] transition-all duration-200 hover:border-white hover:bg-white/[0.06]"
          >
            Rezervare · 0746 521 799
          </a>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-[10px] tracking-[0.4em] uppercase text-white/55">
        <span>scroll</span>
        <div
          className="h-14 w-px origin-top bg-gradient-to-b from-transparent to-[#e6c787] animate-[scrollLine_2.4s_ease-in-out_infinite]"
          aria-hidden
        />
      </div>
    </section>
  );
}
