"use client";

import Link from "next/link";

function DiagonalArrow() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

/** Linked, autoplaying video tile — cinematic double-bezel card. */
export function VideoCard({
  src,
  title,
  kind,
  href,
  cta,
}: {
  src: string;
  title: string;
  kind: string;
  href: string;
  cta: string;
}) {
  return (
    /* Outer shell — double-bezel */
    <Link
      href={href}
      className="group relative block min-h-[58vh] p-1.5 rounded-[2rem] ring-1 ring-white/[0.08] bg-white/[0.025] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:ring-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:min-h-[72vh]"
    >
      {/* Inner core */}
      <div className="relative h-full overflow-hidden rounded-[calc(2rem-0.375rem)] shadow-[inset_0_1px_0_rgba(255,255,255,0.07)]">
        <video
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src={src} type="video/mp4" />
        </video>

        {/* Cinematic gradient — darker at top for logo legibility */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(10,10,10,0.97) 0%, rgba(10,10,10,0.08) 48%, rgba(10,10,10,0.38) 100%)",
          }}
        />

        {/* Content */}
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-2 p-7 pb-12 sm:p-8 sm:pb-8 lg:p-10">
          <span className="font-serif text-sm italic text-white/50 sm:text-base">
            {kind}
          </span>

          <h3 className="font-display text-4xl leading-[0.92] tracking-[-0.02em] text-crd-ink sm:text-5xl lg:text-6xl">
            {title}
          </h3>

          {/* Button-in-button CTA */}
          <span className="mt-4 inline-flex items-center gap-2.5 rounded-full bg-white/20 pl-5 pr-2 py-2 text-sm font-medium text-crd-ink ring-1 ring-white/25 backdrop-blur-sm transition-all duration-[500ms] ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.97] sm:bg-white/[0.1] sm:ring-white/[0.12] group-hover:-translate-y-1 group-hover:bg-white/[0.18] group-hover:ring-white/25">
            {cta}
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/[0.12] ring-1 ring-white/[0.15] transition-transform duration-[500ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-105">
              <DiagonalArrow />
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}

/** Plain autoplaying video in a rounded frame, for venue pages. */
export function VideoFrame({
  src,
  className = "",
}: {
  src: string;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-3xl ring-1 ring-white/10 ${className}`}
    >
      <video
        className="aspect-[3/4] w-full object-cover sm:aspect-[4/5]"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}
