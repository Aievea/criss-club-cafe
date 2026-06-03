type MarqueeItem = { text: string; italic: boolean; script?: boolean };

const ITEMS: MarqueeItem[] = [
  { text: "Tg Mureș", italic: false },
  { text: "Lounge", italic: true },
  { text: "Piața Trandafirilor 43", italic: false },
  { text: "Pub", italic: true },
  { text: "Social Club", italic: false },
  { text: "Criss", italic: false, script: true },
  { text: "Cocktails", italic: true },
  { text: "Espresso", italic: false },
  { text: "Live Music", italic: true },
  { text: "Manele All Night", italic: false },
];

function Dot() {
  return (
    <span className="self-center text-sm text-[#e6c787]" aria-hidden>
      ●
    </span>
  );
}

export function MarqueeStrip() {
  const all = [...ITEMS, ...ITEMS];

  return (
    <div
      className="overflow-hidden border-y border-white/[0.08] bg-crd-bg py-6"
      aria-hidden="true"
    >
      <div className="flex w-max animate-[marqueeScroll_38s_linear_infinite] gap-12">
        {all.map((item, i) => (
          <div key={i} className="flex items-center gap-12">
            <span
              className={`font-serif text-[28px] text-[#ece1c8] ${item.italic ? "italic" : ""} ${
                item.script ? "font-script text-[36px] text-[#e6c787]" : ""
              }`}
            >
              {item.text}
            </span>
            <Dot />
          </div>
        ))}
      </div>
    </div>
  );
}
