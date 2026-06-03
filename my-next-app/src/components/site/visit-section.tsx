export function VisitSection() {
  return (
    <section id="vizita" className="relative bg-crd-bg py-40 text-crd-ink">
      <div className="mx-auto grid max-w-[1280px] items-start gap-20 px-9 lg:grid-cols-2">

        {/* Left — Info */}
        <div>
          <div className="mb-3 flex items-center gap-3 text-[11px] tracking-[0.42em] uppercase text-crd-gold-2">
            <span className="h-px w-9 bg-crd-gold-2 opacity-55" aria-hidden />
            Vizitează-ne
          </div>
          <h2
            className="font-serif font-light leading-[0.95] tracking-[-0.01em] text-crd-ink"
            style={{ fontSize: "clamp(48px,6vw,84px)" }}
          >
            Te <em className="italic text-crd-gold-2">așteptăm</em>
            <br />
            la{" "}
            <span className="font-script text-crd-gold-2" style={{ fontSize: "1.15em" }}>
              masă.
            </span>
          </h2>

          <div className="mt-12 grid grid-cols-2 gap-x-12 gap-y-9">
            {[
              {
                lab: "Adresa",
                val: "Piața Trandafirilor, Nr. 43\nTg Mureș, jud. Mureș",
              },
              {
                lab: "Telefon",
                val: "0746 521 799",
                sub: "Rezervări · Evenimente",
              },
              {
                lab: "Café · Lounge",
                val: "Luni → Joi\n07:00 — 23:00",
                sub: "Vineri & Sâmbătă — non-stop",
              },
              {
                lab: "Criss Club Night",
                val: "Joi · Vineri · Sâmbătă\n22:00 — late",
              },
            ].map((cell) => (
              <div key={cell.lab}>
                <div className="mb-3.5 border-b border-[rgba(201,168,106,0.3)] pb-2.5 text-[11px] tracking-[0.32em] uppercase text-crd-gold-2">
                  {cell.lab}
                </div>
                <div className="font-serif text-[19px] leading-[1.5] text-crd-ink whitespace-pre-line">
                  {cell.val}
                </div>
                {cell.sub && (
                  <div className="mt-1 text-[12px] tracking-[0.04em] text-crd-ink/50 font-body">
                    {cell.sub}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-14 flex flex-wrap gap-3.5">
            <a
              href="tel:0746521799"
              className="inline-flex items-center gap-3 rounded-full border border-crd-gold-2 bg-crd-gold-2 px-7 py-4 text-[11px] font-semibold tracking-[0.28em] uppercase text-[#1a1411] transition-all duration-200 hover:-translate-y-px hover:shadow-[0_14px_40px_-10px_rgba(230,199,135,0.4)]"
            >
              Sună pentru rezervare <span>→</span>
            </a>
            <a
              href="https://maps.google.com/?q=Piata+Trandafirilor+43+Targu+Mures"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full border border-white/35 bg-transparent px-7 py-4 text-[11px] font-medium tracking-[0.28em] uppercase text-crd-ink transition-all duration-200 hover:border-white hover:bg-white/[0.06]"
            >
              Deschide harta
            </a>
          </div>
        </div>

        {/* Right — Decorative SVG map */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-[4px] border border-white/[0.08] bg-crd-bg-3">
          <svg
            viewBox="0 0 400 500"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
            className="h-full w-full"
          >
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(236,225,200,0.06)" strokeWidth="0.5" />
              </pattern>
              <linearGradient id="mapGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1d1813" />
                <stop offset="100%" stopColor="#0f0c09" />
              </linearGradient>
            </defs>
            <rect width="400" height="500" fill="url(#mapGrad)" />
            <rect width="400" height="500" fill="url(#grid)" />
            {/* Stylized streets */}
            <path d="M 0 180 Q 120 160 200 200 T 400 220" stroke="rgba(201,168,106,0.25)" strokeWidth="1.5" fill="none" />
            <path d="M 200 0 Q 220 120 200 250 T 240 500" stroke="rgba(201,168,106,0.25)" strokeWidth="1.5" fill="none" />
            <path d="M 0 340 L 400 320" stroke="rgba(201,168,106,0.15)" strokeWidth="1" fill="none" />
            <path d="M 60 0 L 80 500" stroke="rgba(201,168,106,0.15)" strokeWidth="1" fill="none" />
            <path d="M 320 0 L 300 500" stroke="rgba(201,168,106,0.15)" strokeWidth="1" fill="none" />
            {/* Plaza */}
            <ellipse cx="200" cy="250" rx="80" ry="50" fill="rgba(28,177,194,0.06)" stroke="rgba(28,177,194,0.2)" strokeWidth="0.8" />
            <text x="200" y="200" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontStyle="italic" fontSize="11" fill="rgba(236,225,200,0.4)">Piața Trandafirilor</text>
            <text x="30" y="170" fontFamily="Jost, sans-serif" fontSize="9" letterSpacing="2" fill="rgba(236,225,200,0.3)">STR. ENESCU</text>
            <text x="240" y="50" fontFamily="Jost, sans-serif" fontSize="9" letterSpacing="2" fill="rgba(236,225,200,0.3)">BD. 1 DEC.</text>
            <text x="250" y="340" fontFamily="Jost, sans-serif" fontSize="9" letterSpacing="2" fill="rgba(236,225,200,0.3)">STR. BOLYAI</text>
          </svg>

          {/* Pin label */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full font-serif italic text-[16px] whitespace-nowrap bg-[#f1e9d6] text-[#1a1411] px-[18px] py-3 shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
            style={{ marginTop: "-18px" }}
          >
            Criss Café & Club
            <span
              aria-hidden
              className="absolute bottom-[-6px] left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-[#f1e9d6]"
            />
          </div>

          {/* Pulsing pin */}
          <div
            className="absolute left-1/2 top-1/2 h-[18px] w-[18px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e6c787] animate-[pinPulse_2.4s_ease-in-out_infinite]"
          />
        </div>
      </div>
    </section>
  );
}
