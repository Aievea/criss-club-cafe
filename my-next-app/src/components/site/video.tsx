"use client";

import Link from "next/link";

function ArrowGlyph() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

/** Linked, autoplaying video tile with an overlaid title + enter button. */
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
    <Link
      href={href}
      className="group relative block overflow-hidden rounded-3xl ring-1 ring-white/10 transition-shadow duration-500 hover:ring-crd-gold/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crd-gold"
    >
      <video
        className="aspect-[3/4] w-full object-cover transition-transform duration-[1200ms] [transition-timing-function:var(--ease-expo)] group-hover:scale-[1.04] sm:aspect-[4/5]"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src={src} type="video/mp4" />
      </video>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(10,10,10,0.94) 4%, rgba(10,10,10,0.2) 42%, rgba(10,10,10,0.4) 100%)",
        }}
      />

      <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-2 p-6 sm:p-7">
        <span className="font-serif text-sm italic text-crd-gold">{kind}</span>
        <h3 className="font-display text-3xl leading-none tracking-tight text-crd-ink sm:text-4xl">
          {title}
        </h3>
        <span className="mt-2 inline-flex items-center gap-2 rounded-full bg-crd-ink px-4 py-2 text-sm font-semibold text-crd-bg transition-transform duration-[450ms] [transition-timing-function:var(--ease-spring)] group-hover:-translate-y-0.5">
          {cta}
          <span className="transition-transform duration-[450ms] [transition-timing-function:var(--ease-spring)] group-hover:translate-x-1">
            <ArrowGlyph />
          </span>
        </span>
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
