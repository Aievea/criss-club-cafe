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
      capacityLabel: "Capacitate",
      seats: "80 de locuri + terasă 40 de locuri",
      hoursLabel: "Program",
      hours: [
        { days: "Luni", time: "07:30 – 22:00" },
        { days: "Marți", time: "07:30 – 22:00" },
        { days: "Miercuri", time: "07:30 – 22:00" },
        { days: "Joi", time: "07:30 – 22:00" },
        { days: "Vineri", time: "07:30 – 04:00" },
        { days: "Sâmbătă", time: "09:00 – 04:00" },
        { days: "Duminică", time: "09:00 – 22:00" },
      ],
      contactLabel: "Contact",
      call: "Sună acum",
      reservations: "Rezervări evenimente: telefonic / WhatsApp",
      beers: "Beri la halbă",
      followIg: "Urmărește-ne pe Instagram",
      menuHeading: "Meniu",
      viewMenuCta: "Vezi meniul complet",
      viewMenuHero: "Vezi meniul",
      reserveCta: "Rezervare",
      bookTableNote: "Rezervă-ți masa sau explorează meniul",
      galleryHeading: "Galerie foto",
    },

    club: {
      kind: "Social Club",
      capacityLabel: "Capacitate",
      persoane: "persoane",
      hoursLabel: "Program",
      nocturn: "nocturn",
      capacity: "Capacitate: 220+ persoane",
      open: "Deschis până la 04:00",
      djLabel: "Rezidenți",
      events: "Majorate • Zile de naștere • Evenimente private • Petreceri",
      selective: "Selectăm clientela pentru siguranța ta",
      gallery: "Afișe & evenimente",
      followIg: "Urmărește-ne pe Instagram",
      upcomingLabel: "Evenimente viitoare",
      upcomingHeading: "Află când e următoarea petrecere",
      bookNightNote: "Rezervă-ți locul pentru seara perfectă",
      bookCta: "Rezervare",
      homeCta: "Acasă",
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
      rights: "Toate drepturile rezervate © 2026",
      clientele: "Clubul își rezervă dreptul de a selecta clientela.",
      age: "Acces permis persoanelor cu vârsta de minimum 18 ani în Criss Club.",
      anpcLabel: "Protecția consumatorilor: ANPC",
      solLabel: "Soluționare online a litigiilor: platforma SOL",
      privacyLabel: "Politica de confidențialitate",
      termsLabel: "Termeni și condiții",
      cookiesLabel: "Politica cookies",
      gdpr: "Prelucrăm datele personale în conformitate cu GDPR (Reg. UE 2016/679).",
    },

    bottom: {
      copyright: "© 2026 Cris Royal Delivery SRL",
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
      reserve: "Rezervare",
    },

    home: {
      lead: "Două spații, un singur acoperiș. Lounge & pub ziua, social club până dimineața, plus tot ce ține de evenimente, sub Cris Royal Delivery.",
      explore: "Descoperă",
      enter: "Intră",
    },

    hero: {
      discoverMenu: "Descoperă meniul",
      reserve: "Rezervare",
      cafeLabel: "Cafenea",
    },

    audio: {
      on: "Muzică",
      off: "Muzică oprită",
    },

    visit: {
      eyebrow: "Vizitează-ne",
      headingLine1Before: "Te",
      headingLine1Em: "așteptăm",
      headingLine2Before: "la",
      headingLine2Script: "masă.",
      addressLabel: "Adresa",
      addressVal: "Piața Trandafirilor, Nr. 43\nTg Mureș, jud. Mureș",
      phoneLabel: "Telefon",
      phoneNote: "Rezervări · Evenimente",
      cafeHoursLabel: "Café · Lounge",
      cafeHoursVal: "Luni → Joi\n07:00 — 23:00",
      cafeHoursSub: "Vineri & Sâmbătă — non-stop",
      clubLabel: "Criss Club Night",
      clubVal: "Joi · Vineri · Sâmbătă\n22:00 — late",
      callCta: "Sună pentru rezervare",
      mapCta: "Deschide harta",
    },

    showcase: {
      eyebrow: "Meniul casei",
      h1plain: "Mic",
      h1em: "dejun.",
      h2plain: "Prânz.",
      h2em: "Noapte.",
      lead: "Trei momente ale zilei, trei capitole. Tot ce trebuie să știi e că nimic nu pleacă din bucătărie până nu arată exact așa cum vrem noi.",
      footerNote: "Meniul complet disponibil la masă · alergeni la cerere",
      cta: "Meniu complet",
      chapters: [
        { num: "— Capitolul I —", stamp: "01 · Dimineața", title: "Cafea", titleEm: "& mic dejun", tag: "Servit zilnic 07:00 — 12:00" },
        { num: "— Capitolul II —", stamp: "02 · Prânz", title: "Din", titleEm: "cuptor", tag: "Pizza, paste & ceva în plus" },
        { num: "— Capitolul III —", stamp: "03 · Seara", title: "Bar", titleEm: "& cocktails", tag: "Open bar 17:00 — late" },
      ],
      items: [
        [
          { name: "Espresso · Ristretto", desc: "boabe proaspăt prăjite, 30ml / 15ml" },
          { name: "Cappuccino", desc: "espresso, lapte spumat, 180ml" },
          { name: "Flat White", desc: "espresso dublu, lapte catifelat, 180ml" },
          { name: "Ice Coffee", desc: "espresso, cremă de lapte, frișcă, 180ml" },
        ],
        [
          { name: "Pizza casei", desc: "sos roșu, mozzarella, prosciutto, bacon, busuioc" },
          { name: "Margherita", desc: "sos San Marzano, mozzarella di bufala, busuioc" },
          { name: "Capricciosa", desc: "șuncă, ciuperci, ardei, măsline, mozzarella" },
          { name: "Paste napoletane", desc: "sos roșu copt încet, busuioc, parmezan" },
        ],
        [
          { name: "Strawberry Crush", desc: "frișcă, sos de căpșuni, lapte de fermă" },
          { name: "Aperol Spritz", desc: "Aperol, Prosecco, soda, portocală" },
          { name: "Bumbu Rum Old Fashioned", desc: "Bumbu Original, sirop demerara, bitter portocale" },
          { name: "Luc Belaire · sticlă", desc: "sparkling rosé, gheață, două pahare" },
        ],
      ],
    },

    lineup: {
      h1plain: "Cea mai bună",
      h1em: "noapte",
      h2plain: "din",
      h2script: "Tg Mureș.",
      lead: "Joi, vineri, sâmbătă — line-up de DJ, live music, manele all night. Intrarea liberă cu rezervare.",
      eventsLabel: "Nopți ce nu le putem uita",
      reserveLink: "Rezervări",
    },

    reservation: {
      heading: "Rezervare",
      hint: "Alege un număr",
      num1sub: "rezervări · info · cafenea",
      num2sub: "rezervări · info · club",
      or: "Sau contactează-ne pe",
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
      capacityLabel: "Capacity",
      seats: "80 seats + 40-seat terrace",
      hoursLabel: "Hours",
      hours: [
        { days: "Monday", time: "07:30 – 22:00" },
        { days: "Tuesday", time: "07:30 – 22:00" },
        { days: "Wednesday", time: "07:30 – 22:00" },
        { days: "Thursday", time: "07:30 – 22:00" },
        { days: "Friday", time: "07:30 – 04:00" },
        { days: "Saturday", time: "09:00 – 04:00" },
        { days: "Sunday", time: "09:00 – 22:00" },
      ],
      contactLabel: "Contact",
      call: "Call now",
      reservations: "Event bookings: by phone / WhatsApp",
      beers: "Beers on tap",
      followIg: "Follow us on Instagram",
      menuHeading: "Menu",
      viewMenuCta: "View full menu",
      viewMenuHero: "View menu",
      reserveCta: "Book a table",
      bookTableNote: "Reserve your table or explore the menu",
      galleryHeading: "Photo gallery",
    },

    club: {
      kind: "Social Club",
      capacityLabel: "Capacity",
      persoane: "guests",
      hoursLabel: "Hours",
      nocturn: "closing",
      capacity: "Capacity: 220+ guests",
      open: "Open till 4:00 AM",
      djLabel: "Residents",
      events: "Coming-of-age parties • Birthdays • Private events • Parties",
      selective: "We select our clientele for your safety",
      gallery: "Events & posters",
      followIg: "Follow us on Instagram",
      upcomingLabel: "Upcoming events",
      upcomingHeading: "Find out when's the next party",
      bookNightNote: "Book your spot for the perfect night",
      bookCta: "Book now",
      homeCta: "Home",
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
      rights: "All rights reserved © 2026",
      clientele: "The club reserves the right to select its clientele.",
      age: "Criss Club entry restricted to persons aged 18 and over.",
      anpcLabel: "Consumer protection: ANPC",
      solLabel: "Online dispute resolution: SOL platform",
      privacyLabel: "Privacy policy",
      termsLabel: "Terms & conditions",
      cookiesLabel: "Cookie policy",
      gdpr: "We process personal data in accordance with GDPR (EU Reg. 2016/679).",
    },

    bottom: {
      copyright: "© 2026 Cris Royal Delivery SRL",
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
      reserve: "Reserve",
    },

    home: {
      lead: "Two spaces, one roof. Lounge & pub by day, social club till dawn, plus everything events under Cris Royal Delivery.",
      explore: "Explore",
      enter: "Enter",
    },

    hero: {
      discoverMenu: "Explore the menu",
      reserve: "Reserve",
      cafeLabel: "Cafe",
    },

    audio: {
      on: "Music",
      off: "Music off",
    },

    visit: {
      eyebrow: "Visit us",
      headingLine1Before: "We're",
      headingLine1Em: "waiting",
      headingLine2Before: "for",
      headingLine2Script: "you.",
      addressLabel: "Address",
      addressVal: "Piața Trandafirilor, Nr. 43\nTg Mureș, Romania",
      phoneLabel: "Phone",
      phoneNote: "Bookings · Events",
      cafeHoursLabel: "Café · Lounge",
      cafeHoursVal: "Mon → Thu\n07:00 — 23:00",
      cafeHoursSub: "Fri & Sat — non-stop",
      clubLabel: "Criss Club Night",
      clubVal: "Thu · Fri · Sat\n22:00 — late",
      callCta: "Call for a reservation",
      mapCta: "Open map",
    },

    showcase: {
      eyebrow: "House menu",
      h1plain: "",
      h1em: "Breakfast.",
      h2plain: "Lunch.",
      h2em: "Night.",
      lead: "Three moments in the day, three chapters. All you need to know is that nothing leaves the kitchen until it looks exactly the way we want it.",
      footerNote: "Full menu available at the table · allergens on request",
      cta: "Full menu",
      chapters: [
        { num: "— Chapter I —", stamp: "01 · Morning", title: "Coffee", titleEm: "& breakfast", tag: "Served daily 07:00 — 12:00" },
        { num: "— Chapter II —", stamp: "02 · Lunch", title: "From the", titleEm: "oven", tag: "Pizza, pasta & a little more" },
        { num: "— Chapter III —", stamp: "03 · Evening", title: "Bar", titleEm: "& cocktails", tag: "Open bar 17:00 — late" },
      ],
      items: [
        [
          { name: "Espresso · Ristretto", desc: "freshly roasted beans, 30ml / 15ml" },
          { name: "Cappuccino", desc: "espresso, steamed milk, 180ml" },
          { name: "Flat White", desc: "double espresso, velvety milk, 180ml" },
          { name: "Ice Coffee", desc: "espresso, cream, whipped cream, 180ml" },
        ],
        [
          { name: "House pizza", desc: "tomato sauce, mozzarella, prosciutto, bacon, basil" },
          { name: "Margherita", desc: "San Marzano sauce, buffalo mozzarella, basil" },
          { name: "Capricciosa", desc: "ham, mushrooms, peppers, olives, mozzarella" },
          { name: "Neapolitan pasta", desc: "slow-cooked tomato sauce, basil, parmesan" },
        ],
        [
          { name: "Strawberry Crush", desc: "whipped cream, strawberry sauce, farm milk" },
          { name: "Aperol Spritz", desc: "Aperol, Prosecco, soda, orange" },
          { name: "Bumbu Rum Old Fashioned", desc: "Bumbu Original, demerara syrup, orange bitters" },
          { name: "Luc Belaire · bottle", desc: "sparkling rosé, ice, two glasses" },
        ],
      ],
    },

    lineup: {
      h1plain: "The best",
      h1em: "night",
      h2plain: "in",
      h2script: "Tg Mureș.",
      lead: "Thu, Fri, Sat — DJ line-up, live music, all night. Free entry with reservation.",
      eventsLabel: "Nights to remember",
      reserveLink: "Book",
    },

    reservation: {
      heading: "Reservation",
      hint: "Choose a number",
      num1sub: "bookings · info · café",
      num2sub: "bookings · info · club",
      or: "Or reach us on",
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
