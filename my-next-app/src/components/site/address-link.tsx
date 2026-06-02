"use client";

import { ADDRESS, MAPS_URL } from "@/src/lib/contact";

function PinIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.4" />
    </svg>
  );
}

export function AddressLink() {
  return (
    <a
      href={MAPS_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="crd-link inline-flex items-center gap-2 text-xs text-crd-muted"
    >
      <span className="text-crd-gold">
        <PinIcon />
      </span>
      {ADDRESS}
    </a>
  );
}
