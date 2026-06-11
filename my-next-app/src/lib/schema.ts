/**
 * JSON-LD structured-data builders for the Criss Cafe & Club venues.
 *
 * Single source of truth for the entity markup Google reads. NAP fields come
 * from `contact.ts` so they stay consistent with the rest of the site.
 *
 * TODO (needs Google Business Profile data — omitted rather than guessed so we
 * never publish a wrong map pin or postcode):
 *   - `geo` (latitude/longitude) for each venue
 *   - `postalCode` on the address
 *   - a hosted `image` URL per venue (a real photo, ≥1200px wide)
 *   - Criss Club opening hours (only "open until 04:00" is known today)
 */
import { MAPS_URL, PHONE_TEL } from "./contact";
import { SITE_NAME, SITE_URL, absoluteUrl } from "./site";

const CAFE_IG = "https://www.instagram.com/criss_cafe_/";
const CLUB_IG = "https://www.instagram.com/criss_club_/";

/** Shared postal address. postalCode intentionally omitted (see TODO above). */
const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: "Piața Trandafirilor 43",
  addressLocality: "Târgu Mureș",
  addressRegion: "Mureș",
  addressCountry: "RO",
} as const;

function openingHours(
  days: string[],
  opens: string,
  closes: string,
): Record<string, unknown> {
  return {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: days,
    opens,
    closes,
  };
}

/** Parent company — rendered site-wide in the root layout. */
export function organizationSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Cris Royal Delivery SRL",
    alternateName: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl("/favicon.png"),
    image: absoluteUrl("/favicon.png"),
    telephone: PHONE_TEL,
    address: postalAddress,
    sameAs: [CAFE_IG, CLUB_IG],
  };
}

/** Criss Cafe — lounge & pub serving food, coffee, beer and cocktails. */
export function cafeSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": ["Restaurant", "BarOrPub", "CafeOrCoffeeShop"],
    name: "Criss Cafe",
    url: absoluteUrl("/criss-cafe"),
    telephone: PHONE_TEL,
    priceRange: "$$",
    currenciesAccepted: "RON",
    servesCuisine: ["Cafea", "Cocktailuri", "Pizza", "Paste", "Bere"],
    address: postalAddress,
    hasMap: MAPS_URL,
    acceptsReservations: true,
    hasMenu: absoluteUrl("/meniu/cafe"),
    sameAs: [CAFE_IG],
    parentOrganization: { "@type": "Organization", name: "Cris Royal Delivery SRL" },
    openingHoursSpecification: [
      openingHours(["Monday", "Tuesday", "Wednesday", "Thursday"], "07:30", "22:00"),
      openingHours(["Friday"], "07:30", "04:00"),
      openingHours(["Saturday"], "09:00", "04:00"),
      openingHours(["Sunday"], "09:00", "22:00"),
    ],
  };
}

/** Criss Club — selective social club / nightclub, open until 04:00. */
export function clubSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "NightClub",
    name: "Criss Club",
    url: absoluteUrl("/criss-club"),
    telephone: PHONE_TEL,
    priceRange: "$$",
    currenciesAccepted: "RON",
    address: postalAddress,
    hasMap: MAPS_URL,
    maximumAttendeeCapacity: 220,
    acceptsReservations: true,
    hasMenu: absoluteUrl("/meniu/club"),
    sameAs: [CLUB_IG],
    parentOrganization: { "@type": "Organization", name: "Cris Royal Delivery SRL" },
    // openingHoursSpecification omitted — exact opening time unknown (see TODO).
  };
}
