import type { SVGProps } from "react";

/**
 * Hand-tuned line icons (1.5px stroke, currentColor) used across the footer.
 * Kept stroke-based and uniform so the gold accent reads as one icon family
 * rather than a pile of mismatched emoji.
 */

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function BalloonIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 14c2.76 0 5-2.69 5-6s-2.24-5-5-5-5 1.69-5 5 2.24 6 5 6Z" />
      <path d="M12 14v2" />
      <path d="M12 16c0 1.5 1.2 1.6 1.2 3 0 .8-.6 1.5-1.6 1.5" />
      <path d="m10.6 16.4 1.4-.4 1.4.4" />
    </svg>
  );
}

export function TruckIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 7h11v8H3z" />
      <path d="M14 10h4l3 3v2h-7z" />
      <circle cx="7" cy="17.5" r="1.6" />
      <circle cx="17" cy="17.5" r="1.6" />
    </svg>
  );
}

export function CateringIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 18h16" />
      <path d="M5 18a7 7 0 0 1 14 0" />
      <path d="M12 8V5" />
      <path d="M9.5 5h5" />
    </svg>
  );
}

export function MusicIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M9 18V6l10-2v12" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="16" cy="16" r="3" />
    </svg>
  );
}

export function CocktailIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 5h14l-7 8z" />
      <path d="M12 13v6" />
      <path d="M8.5 20h7" />
      <path d="m15 5-1 3" />
    </svg>
  );
}

export function BouquetIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="6" r="2.4" />
      <circle cx="7.5" cy="8.5" r="2" />
      <circle cx="16.5" cy="8.5" r="2" />
      <path d="M9 11.5 7 20" />
      <path d="m15 11.5 2 8.5" />
      <path d="M12 10v10" />
      <path d="M6 20h12" />
    </svg>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3 5 6v5c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6z" />
      <path d="m9.2 11.8 1.9 1.9 3.7-3.9" />
    </svg>
  );
}

export function CameraIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="7" width="13" height="10" rx="2" />
      <path d="m16 10 5-2.5v9L16 14z" />
      <circle cx="8.5" cy="12" r="2" />
    </svg>
  );
}

export function BadgeCheckIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m12 3 2.2 1.6 2.7-.2.9 2.6 2.2 1.6-.8 2.6.8 2.6-2.2 1.6-.9 2.6-2.7-.2L12 21l-2.2-1.6-2.7.2-.9-2.6L4 15.4l.8-2.6L4 10.2l2.2-1.6.9-2.6 2.7.2z" />
      <path d="m9.3 12 1.9 1.9 3.5-3.8" />
    </svg>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 1.8" />
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6.5 4h3l1.3 3.6-1.8 1.4a11 11 0 0 0 4.5 4.5l1.4-1.8L18 13v3a1.5 1.5 0 0 1-1.6 1.5C9.7 17 6.9 14.2 6.5 7.6A1.5 1.5 0 0 1 6.5 4Z" />
    </svg>
  );
}

export function HeartIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 20.7 4.5 13a4.6 4.6 0 0 1 6.5-6.5l1 .9 1-.9A4.6 4.6 0 0 1 19.5 13z" />
    </svg>
  );
}

export function WhatsAppIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.9c0 1.76.46 3.48 1.34 5L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.9C21.95 6.45 17.5 2 12.04 2Zm0 18.13h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.37c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.69 8.23-8.23 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.16 0-.43.06-.65.31-.22.25-.86.84-.86 2.05s.88 2.38 1 2.54c.12.17 1.74 2.66 4.22 3.73.59.25 1.05.4 1.4.52.59.19 1.13.16 1.55.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z" />
    </svg>
  );
}
