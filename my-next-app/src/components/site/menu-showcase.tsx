import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import img1 from "@/src/assets/images/images-crisscafee/WhatsApp Image 2026-06-01 at 21.25.25.jpeg";
import img2 from "@/src/assets/images/images-crisscafee/WhatsApp Image 2026-06-01 at 21.28.55.jpeg";
import img3 from "@/src/assets/images/images-crisscafee/WhatsApp Image 2026-06-01 at 21.28.56.jpeg";

type Item = { name: string; desc: string; price: string };
type Chapter = {
  num: string;
  stamp: string;
  title: string;
  titleEm: string;
  tag: string;
  items: Item[];
  img: StaticImageData;
};

const CHAPTERS: Chapter[] = [
  {
    num: "— Capitolul I —",
    stamp: "01 · Dimineața",
    title: "Cafea",
    titleEm: "& mic dejun",
    tag: "Servit zilnic 07:00 — 12:00",
    img: img1,
    items: [
      { name: "Espresso · Ristretto", desc: "boabe proaspăt prăjite, 30ml / 15ml", price: "11 lei" },
      { name: "Cappuccino", desc: "espresso, lapte spumat, 180ml", price: "15 lei" },
      { name: "Flat White", desc: "espresso dublu, lapte catifelat, 180ml", price: "18 lei" },
      { name: "Ice Coffee", desc: "espresso, cremă de lapte, frișcă, 180ml", price: "15 lei" },
    ],
  },
  {
    num: "— Capitolul II —",
    stamp: "02 · Prânz",
    title: "Din",
    titleEm: "cuptor",
    tag: "Pizza, paste & ceva în plus",
    img: img2,
    items: [
      { name: "Pizza casei", desc: "sos roșu, mozzarella, prosciutto, bacon, busuioc", price: "38 lei" },
      { name: "Margherita", desc: "sos San Marzano, mozzarella di bufala, busuioc", price: "32 lei" },
      { name: "Capricciosa", desc: "șuncă, ciuperci, ardei, măsline, mozzarella", price: "36 lei" },
      { name: "Paste napoletane", desc: "sos roșu copt încet, busuioc, parmezan", price: "29 lei" },
    ],
  },
  {
    num: "— Capitolul III —",
    stamp: "03 · Seara",
    title: "Bar",
    titleEm: "& cocktails",
    tag: "Open bar 17:00 — late",
    img: img3,
    items: [
      { name: "Strawberry Crush", desc: "frișcă, sos de căpșuni, lapte de fermă", price: "22 lei" },
      { name: "Aperol Spritz", desc: "Aperol, Prosecco, soda, portocală", price: "28 lei" },
      { name: "Bumbu Rum Old Fashioned", desc: "Bumbu Original, sirop demerara, bitter portocale", price: "42 lei" },
      { name: "Luc Belaire · sticlă", desc: "sparkling rosé, gheață, două pahare", price: "la cerere" },
    ],
  },
];

export function MenuShowcase() {
  return (
    <section id="meniu" className="relative overflow-hidden bg-crd-paper py-36 text-crd-ink-dark">
      {/* Section head */}
      <div className="mx-auto mb-20 max-w-[1100px] px-9 text-center">
        <div className="mb-6 inline-flex items-center gap-3.5 text-[11px] tracking-[0.42em] uppercase text-crd-gold-accent">
          <span className="h-px w-9 bg-crd-gold-accent opacity-55" aria-hidden />
          Meniul casei
          <span className="h-px w-9 bg-crd-gold-accent opacity-55" aria-hidden />
        </div>
        <h2
          className="font-serif font-light leading-[0.95] tracking-[-0.01em] text-crd-ink-dark"
          style={{ fontSize: "clamp(48px,7vw,88px)" }}
        >
          Mic <em className="italic text-crd-gold-accent">dejun.</em>
          <br />
          Prânz. <em className="italic text-crd-gold-accent">Noapte.</em>
        </h2>
        <p className="mx-auto mt-7 max-w-[640px] font-serif italic leading-[1.4] text-crd-ink-soft" style={{ fontSize: "clamp(18px,1.6vw,22px)" }}>
          Trei momente ale zilei, trei capitole. Tot ce trebuie să știi e că nimic nu pleacă din bucătărie până nu arată exact așa cum vrem noi.
        </p>
      </div>

      {/* Chapters */}
      <div className="mx-auto flex max-w-[1280px] flex-col gap-24 px-9">
        {CHAPTERS.map((ch, idx) => {
          const even = idx % 2 === 1;
          return (
            <div
              key={ch.num}
              className={`grid items-center gap-20 lg:grid-cols-2`}
            >
              {/* Image */}
              <div className={`relative aspect-[4/5] overflow-hidden rounded-sm ${even ? "lg:order-2" : ""}`}>
                <Image
                  src={ch.img}
                  alt={ch.title}
                  fill
                  className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(26,20,17,0.5)]" />
                <div className="absolute left-6 top-6 bg-crd-paper px-4 py-2.5 text-[10px] font-semibold tracking-[0.32em] uppercase text-crd-ink-dark">
                  {ch.stamp}
                </div>
              </div>

              {/* Body */}
              <div className={`py-6 ${even ? "lg:order-1" : ""}`}>
                <p className="mb-3.5 font-serif italic text-[15px] text-crd-gold-accent">{ch.num}</p>
                <h3
                  className="font-serif font-normal leading-[1] text-crd-ink-dark"
                  style={{ fontSize: "clamp(44px,5vw,64px)" }}
                >
                  {ch.title}{" "}
                  <span className="font-script text-crd-gold-accent" style={{ fontSize: "1.05em" }}>
                    {ch.titleEm}
                  </span>
                </h3>
                <span className="mt-2 inline-block border-b border-crd-gold-accent pb-1.5 text-[11px] tracking-[0.32em] uppercase text-crd-ink-soft">
                  {ch.tag}
                </span>
                <ul className="mt-3.5 grid gap-[18px]">
                  {ch.items.map((item, i) => (
                    <li
                      key={i}
                      className="grid grid-cols-[1fr_auto] items-baseline gap-[18px] border-b border-dashed border-crd-ink-soft/20 pb-4"
                    >
                      <div>
                        <div className="font-serif text-[22px] font-medium text-crd-ink-dark">{item.name}</div>
                        <div className="mt-1 font-serif italic text-[13px] text-crd-ink-soft">{item.desc}</div>
                      </div>
                      <div className="whitespace-nowrap text-[14px] font-semibold tracking-[0.08em] text-crd-gold-accent">{item.price}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mx-auto mt-20 max-w-[1280px] px-9 text-center">
        <p className="inline-block font-serif italic text-[16px] text-crd-ink-soft before:mx-3 before:text-crd-gold-accent before:content-['·'] after:mx-3 after:text-crd-gold-accent after:content-['·']">
          Meniul complet disponibil la masă · alergeni la cerere
        </p>
        <div className="mt-10">
          <Link
            href="/criss-cafe"
            className="inline-flex items-center gap-3 rounded-full border border-crd-ink-dark/30 px-7 py-4 text-[11px] tracking-[0.28em] uppercase text-crd-ink-dark transition-all duration-200 hover:border-crd-gold-accent hover:bg-crd-gold-accent hover:text-crd-ink-dark hover:-translate-y-px"
          >
            Meniu complet <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
