import Image from "next/image";
import Link from "next/link";
import logo from "@/src/assets/images/logos/hf_20260602_144114_5656652d-1766-480e-b3ef-6e216da8e55f.jpeg";
import clubVideo from "@/src/assets/video/video-crissclub/WhatsApp Video 2026-06-02 at 17.35.15.mp4";

export function HomepageHero() {
  return (
    <section className="relative isolate flex min-h-screen min-h-[100svh] flex-col overflow-hidden">
      {/* Video background */}
      <video
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        style={{ filter: "saturate(0.85) brightness(0.52) contrast(1.08)" }}
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
            radial-gradient(120% 80% at 50% 40%, transparent 0%, rgba(10,8,6,0.55) 65%, rgba(10,8,6,0.92) 100%),
            linear-gradient(180deg, rgba(10,8,6,0.5) 0%, rgba(10,8,6,0.08) 35%, rgba(10,8,6,0.82) 100%)
          `,
        }}
      />

      {/* Content — flex-1 so it fills space above the scroll cue */}
      <div className="relative z-10 flex flex-1 items-center justify-center">
        <div className="flex max-w-[980px] flex-col items-center gap-7 px-6 pt-[120px] pb-10 text-center">
          {/* Kicker */}
          <div className="flex items-center gap-3.5 text-[11px] tracking-[0.42em] uppercase text-[#e6c787]">
            <span className="h-px w-9 bg-[#e6c787] opacity-55" aria-hidden />
            Piața Trandafirilor 43 · Tg Mureș
            <span className="h-px w-9 bg-[#e6c787] opacity-55" aria-hidden />
          </div>

          {/* Logo — white on black JPEG; screen blend makes black transparent */}
          <Image
            src={logo}
            alt="Criss Club · Social Club"
            className="w-[min(520px,76vw)]"
            style={{ mixBlendMode: "screen" }}
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
      </div>

      {/* Scroll cue — always anchored at the visual bottom */}
      <div className="relative z-10 flex flex-col items-center gap-3 pb-7 text-[10px] tracking-[0.4em] uppercase text-white/55">
        <span>scroll</span>
        <div
          className="h-14 w-px origin-top bg-gradient-to-b from-transparent to-[#e6c787] animate-[scrollLine_2.4s_ease-in-out_infinite]"
          aria-hidden
        />
      </div>
    </section>
  );
}
