import { SiteNav } from "@/src/components/site/site-nav";
import { HomepageHero } from "@/src/components/site/homepage-hero";
import { MarqueeStrip } from "@/src/components/site/marquee-strip";
import { MenuShowcase } from "@/src/components/site/menu-showcase";
import { ClubLineup } from "@/src/components/site/club-lineup";
import { VisitSection } from "@/src/components/site/visit-section";

export default function Home() {
  return (
    <main className="overflow-hidden bg-crd-bg font-body text-crd-ink">
      <SiteNav />
      <HomepageHero />
      <MarqueeStrip />
      <MenuShowcase />
      <ClubLineup />
      <VisitSection />
    </main>
  );
}
