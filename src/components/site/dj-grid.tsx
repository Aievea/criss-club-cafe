"use client";

import { useEffect, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { getDJs, type DJ } from "@/src/lib/supabase";

// Static fallback images
import djDavidSerban from "@/src/assets/images/images-crissclub/djs/djdavidserban.jpeg";
import djSeft from "@/src/assets/images/images-crissclub/djs/djseft.jpeg";
import djAdrianStan from "@/src/assets/images/images-crissclub/djs/djadrianstan.jpeg";
import adrianTepes from "@/src/assets/images/images-crissclub/djs/adriantepes.jpeg";
// @ts-ignore
import tomasPcz from "@/src/assets/images/images-crissclub/djs/tomas pcz and c.a. strings.jpeg";
// @ts-ignore
import djMig from "@/src/assets/images/images-crissclub/djs/dj m.i.g.jpeg";
// @ts-ignore
import raulFurnea from "@/src/assets/images/images-crissclub/djs/raul furnea si formatia .jpeg";
// @ts-ignore
import soaDj from "@/src/assets/images/images-crissclub/djs/soa dj.jpeg";

const STATIC_FALLBACK: Array<{ name: string; sub: string | null; image: StaticImageData }> = [
  { name: "David Șerban",  sub: "DJ",             image: djDavidSerban },
  { name: "Tomas PCZ",     sub: "& C.A. Strings", image: tomasPcz as StaticImageData },
  { name: "Seft",          sub: "DJ",             image: djSeft },
  { name: "Adrian Stan",   sub: "DJ",             image: djAdrianStan },
  { name: "Adrian Tepeș",  sub: null,             image: adrianTepes },
  { name: "M.I.G.",        sub: "DJ",             image: djMig as StaticImageData },
  { name: "Raul Furnea",   sub: "& Formația",     image: raulFurnea as StaticImageData },
  { name: "SOA",           sub: "DJ",             image: soaDj as StaticImageData },
];

const STATIC_BY_NAME: Record<string, StaticImageData> = Object.fromEntries(
  STATIC_FALLBACK.map((d) => [d.name, d.image])
);

function resolvePhoto(dj: DJ): StaticImageData | string | null {
  if (dj.photo_url) return dj.photo_url;
  return STATIC_BY_NAME[dj.name] ?? null;
}

export function DJGrid() {
  const [djs, setDjs] = useState<DJ[] | null>(null);

  useEffect(() => {
    getDJs().then((data) => setDjs(data));
  }, []);

  const lineup =
    djs && djs.length > 0
      ? djs.map((dj) => ({ name: dj.name, sub: dj.sub, photo: resolvePhoto(dj) }))
      : STATIC_FALLBACK.map((d) => ({ name: d.name, sub: d.sub, photo: d.image as StaticImageData | string | null }));

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
      {lineup.map(({ name, sub, photo }) => (
        <DJCard key={name} name={name} sub={sub} photo={photo} />
      ))}
    </div>
  );
}

function DJCard({ name, sub, photo }: { name: string; sub: string | null; photo: StaticImageData | string | null }) {
  return (
    <div className="group relative aspect-[3/4] overflow-hidden rounded-xl">
      {photo ? (
        <Image
          src={photo}
          alt={name}
          fill
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          style={{ filter: "saturate(0.85) brightness(0.78)" }}
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, #1a0a2e 0%, #0d0d1a 100%)" }}
        />
      )}

      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "linear-gradient(to top, rgba(5,4,2,0.95) 0%, rgba(5,4,2,0.4) 38%, transparent 60%)" }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "radial-gradient(ellipse at 50% 110%, rgba(168,85,247,0.25) 0%, transparent 65%)" }}
      />

      <div className="absolute inset-x-0 bottom-0 px-4 pb-4 text-center">
        {sub && (
          <p className="mb-0.5 text-[9px] font-semibold uppercase tracking-[0.3em] text-[#ff3da3]/65 transition-colors duration-300 group-hover:text-[#ff3da3]">
            {sub}
          </p>
        )}
        <p
          className="font-display font-semibold leading-tight text-[#f5f0e8] transition-colors duration-300 group-hover:text-white"
          style={{
            fontSize: "clamp(0.85rem,1.8vw,1.05rem)",
            textShadow: "0 2px 16px rgba(0,0,0,0.9)",
            letterSpacing: "-0.01em",
          }}
        >
          {name}
        </p>
      </div>

      <div
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ boxShadow: "inset 0 0 0 1px rgba(168,85,247,0.4)" }}
      />
    </div>
  );
}
