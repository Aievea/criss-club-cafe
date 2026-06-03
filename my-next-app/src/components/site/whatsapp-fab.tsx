export function WhatsAppFab() {
  return (
    <a
      href="https://wa.me/40746521799"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactează-ne pe WhatsApp"
      className="group fixed bottom-6 right-6 z-[80] inline-flex items-center rounded-full bg-[#25d366] px-3.5 py-3.5 text-white shadow-[0_10px_30px_-6px_rgba(0,0,0,0.45),0_0_0_6px_rgba(37,211,102,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:pr-[22px] hover:shadow-[0_18px_40px_-6px_rgba(37,211,102,0.5),0_0_0_6px_rgba(37,211,102,0.24)] sm:bottom-6 sm:right-6"
      style={{ position: "fixed" }}
    >
      {/* Pulsing ring */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-[-6px] animate-[waPulse_2.4s_ease-out_infinite] rounded-full border-2 border-[#25d366]/40"
      />

      {/* Icon */}
      <span className="relative z-10 flex h-[30px] w-[30px] shrink-0 items-center justify-center sm:h-[30px] sm:w-[30px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-7 w-7"
          aria-hidden
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.845L.057 23.25a.75.75 0 0 0 .916.942l5.556-1.458A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.88 0-3.638-.5-5.157-1.373l-.369-.214-3.828 1.004 1.023-3.728-.233-.38A9.955 9.955 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
        </svg>
      </span>

      {/* Expanding label */}
      <span className="relative z-10 max-w-0 overflow-hidden whitespace-nowrap text-[11px] font-bold tracking-[0.28em] uppercase opacity-0 transition-all duration-[450ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:ml-3.5 group-hover:max-w-[280px] group-hover:opacity-100">
        WhatsApp
      </span>
    </a>
  );
}
