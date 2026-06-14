import { SiteNav } from "@/src/components/site/site-nav";

export default function Loading() {
  return (
    <main className="min-h-screen bg-crd-bg font-body text-crd-ink">
      <SiteNav />
      <div className="pt-28 pb-10 text-center px-6">
        <h1 className="font-display text-[clamp(2.5rem,7vw,5rem)] font-semibold leading-[1] tracking-[-0.02em] text-[#f5f0e8]">
          Criss Cafe
        </h1>
        <p className="mt-3 font-serif italic text-[#c9a86a]/80">Meniu</p>
      </div>
      <div className="flex items-center justify-center py-32">
        <div className="h-px w-24 animate-pulse bg-[#c9a86a]/50" />
      </div>
    </main>
  );
}
