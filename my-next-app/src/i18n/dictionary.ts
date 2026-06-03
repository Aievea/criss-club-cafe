export type Lang = "ro" | "en";

export const LANGS: Lang[] = ["ro", "en"];

/**
 * Footer copy. Brand names (Criss Cafe, Criss Club, Cris Royal Delivery) and DJ
 * names are intentionally never translated. The tagline is the client's brand
 * line and is kept verbatim per language.
 */
export const dictionary = {
  ro: {
    langName: "Română",
    langShort: "RO",
    tagline:
      "De la baloane până la beat — totul sub un singur acoperiș",
    parentEyebrow: "Companie-mamă",

    cafe: {
      kind: "Lounge & Pub",
      seats: "80 de locuri + terasă 40 de locuri",
      hoursLabel: "Program",
      hours: [
        { days: "Luni – Joi", time: "07:30 – 22:00" },
        { days: "Vineri", time: "07:30 – 04:00" },
        { days: "Sâmbătă", time: "09:00 – 04:00" },
        { days: "Duminică", time: "09:00 – 22:00" },
      ],
      contactLabel: "Contact",
      call: "Sună acum",
      reservations: "Rezervări evenimente: telefonic / WhatsApp",
      beers: "Beri la halbă",
    },

    club: {
      kind: "Social Club",
      capacity: "Capacitate: 220+ persoane",
      open: "Deschis până la 04:00",
      djLabel: "Rezidenți",
      events: "Majorate • Zile de naștere • Evenimente private",
      selective: "Selectăm clientela pentru siguranța ta",
      gallery: "Afișe & evenimente",
    },

    services: {
      heading: "Servicii Cris Royal Delivery",
      items: [
        { id: "delivery", label: "Livrări & logistică" },
        { id: "catering", label: "Catering școli (autorizat DSV + DSP)" },
        { id: "cocktail", label: "Cocktail bar & aperitive" },
        {
          id: "events",
          label: "Evenimente complete (majorate, zile de naștere, conferințe)",
        },
      ],
    },

    badges: [
      "Firmă proprie de pază",
      "Filmat integral — siguranța clienților",
      "Autorizat DSV & DSP",
      "Autorizat până la 04:00",
    ],

    legal: {
      entity: "Cris Royal Delivery SRL • Târgu Mureș, România",
      rights: "Toate drepturile rezervate © 2025",
      clientele: "Clubul își rezervă dreptul de a selecta clientela.",
    },

    bottom: {
      copyright: "© 2025 Cris Royal Delivery",
      built: "Construit cu pasiune pentru Târgu Mureș",
      crafted: "made by",
    },

    nav: {
      home: "Acasă",
      cafe: "Criss Cafe",
      club: "Criss Club",
      services: "Servicii",
      back: "Înapoi acasă",
      openMenu: "Deschide meniul",
      closeMenu: "Închide meniul",
    },

    home: {
      lead: "Două spații, un singur acoperiș. Lounge & pub ziua, social club până dimineața, plus tot ce ține de evenimente, sub Cris Royal Delivery.",
      explore: "Descoperă",
      enter: "Intră",
    },

    pages: {
      cafe: "Lounge & pub în inima orașului. Cafea de specialitate, cocktailuri și o terasă pentru serile lungi.",
      club: "Social club deschis până la 04:00. DJ rezidenți, evenimente private și o clientelă atent selectată.",
      services: "Organizăm evenimentul cap-coadă: de la baloane și decor la catering, sonorizare și logistică.",
    },
  },

  en: {
    langName: "English",
    langShort: "EN",
    tagline:
      "From the first balloon to the last beat — all under one roof",
    parentEyebrow: "Parent company",

    cafe: {
      kind: "Lounge & Pub",
      seats: "80 seats + 40-seat terrace",
      hoursLabel: "Hours",
      hours: [
        { days: "Mon – Thu", time: "07:30 – 22:00" },
        { days: "Friday", time: "07:30 – 04:00" },
        { days: "Saturday", time: "09:00 – 04:00" },
        { days: "Sunday", time: "09:00 – 22:00" },
      ],
      contactLabel: "Contact",
      call: "Call now",
      reservations: "Event bookings: by phone / WhatsApp",
      beers: "Beers on tap",
    },

    club: {
      kind: "Social Club",
      capacity: "Capacity: 220+ guests",
      open: "Open till 4:00 AM",
      djLabel: "Residents",
      events: "Coming-of-age parties • Birthdays • Private events",
      selective: "We select our clientele for your safety",
      gallery: "Events & posters",
    },

    services: {
      heading: "Cris Royal Delivery services",
      items: [
        { id: "delivery", label: "Delivery & logistics" },
        { id: "catering", label: "School catering (DSV + DSP certified)" },
        { id: "cocktail", label: "Cocktail bar & appetizers" },
        {
          id: "events",
          label: "Full-scale events (coming-of-age, birthdays, conferences)",
        },
      ],
    },

    badges: [
      "In-house security team",
      "Fully recorded — guest safety",
      "DSV & DSP certified",
      "Licensed until 4:00 AM",
    ],

    legal: {
      entity: "Cris Royal Delivery SRL • Târgu Mureș, Romania",
      rights: "All rights reserved © 2025",
      clientele: "The club reserves the right to select its clientele.",
    },

    bottom: {
      copyright: "© 2025 Cris Royal Delivery",
      built: "Built with passion for Târgu Mureș",
      crafted: "made by",
    },

    nav: {
      home: "Home",
      cafe: "Criss Cafe",
      club: "Criss Club",
      services: "Services",
      back: "Back home",
      openMenu: "Open menu",
      closeMenu: "Close menu",
    },

    home: {
      lead: "Two spaces, one roof. Lounge & pub by day, social club till dawn, plus everything events under Cris Royal Delivery.",
      explore: "Explore",
      enter: "Enter",
    },

    pages: {
      cafe: "A lounge & pub in the heart of the city. Specialty coffee, cocktails and a terrace built for long evenings.",
      club: "A social club open till 4 AM. Resident DJs, private events and a carefully selected crowd.",
      services: "We run the whole event end to end: from balloons and decor to catering, sound and logistics.",
    },
  },
} as const;

export type Dictionary = (typeof dictionary)[Lang];

/** DJ residents — never translated. */
export const DJS = ["Tommy", "PCZ", "Gioată", "David Cervan"] as const;
