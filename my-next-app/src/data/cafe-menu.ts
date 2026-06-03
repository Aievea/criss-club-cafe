export type MenuItem = {
  name: string;
  volume?: string;
  desc?: string;
  price: number;
};

export type MenuCategory = {
  id: string;
  label: string;
  items: MenuItem[];
};

export type MenuTab = {
  id: string;
  label: string;
  labelEn: string;
  emoji: string;
  categories: MenuCategory[];
};

export const MENU_TABS: MenuTab[] = [
  {
    id: "coffee",
    label: "Cafea",
    labelEn: "Coffee",
    emoji: "☕",
    categories: [
      {
        id: "espresso",
        label: "Espresso & Cafea",
        items: [
          { name: "Ristretto", volume: "15ml", price: 11 },
          { name: "Espresso", volume: "30/60ml", price: 11 },
          { name: "Espresso Doppio", volume: "60ml", price: 14 },
          { name: "Espresso Macchiato", volume: "40ml", price: 12 },
          { name: "Americano", volume: "60ml", desc: "espresso, cremă de lapte", price: 12 },
          { name: "Cappuccino", volume: "180ml", price: 15 },
          { name: "Cappuccino Vienez", volume: "180ml", price: 16 },
          { name: "Ice Coffee", volume: "180ml", desc: "espresso, cremă de lapte, frișcă", price: 15 },
          { name: "Flat White", volume: "180ml", price: 18 },
          { name: "Latte Macchiato", volume: "180ml", desc: "espresso, cremă de lapte", price: 19 },
          { name: "Flavored Latte", volume: "180ml", desc: "espresso, cremă de lapte, sirop vanilie / caramel / caramel sărat / cocos / ciocolată", price: 19 },
        ],
      },
      {
        id: "frappe",
        label: "Frappé",
        items: [
          { name: "Classic Frappé", volume: "150ml", desc: "cafea instant, lapte, gheață, frișcă", price: 25 },
          { name: "Oreo Frappé", volume: "150ml", desc: "cafea instant, lapte, oreo, gheață, frișcă", price: 26 },
          { name: "Flavoured Frappé", volume: "150ml", desc: "cafea instant, lapte, sirop ciocolată / vanilie / caramel / caramel sărat / cocos, gheață, frișcă", price: 29 },
        ],
      },
      {
        id: "alcoholic-coffee",
        label: "Cafea cu alcool",
        items: [
          { name: "Bumbu Cream Coffee", volume: "90ml", desc: "Bumbu Cream, ciocolată caldă, bezele, frișcă", price: 23 },
          { name: "Irish Coffee", volume: "90ml", desc: "espresso, whiskey, frișcă lichidă", price: 18 },
        ],
      },
      {
        id: "hot-choc",
        label: "Ciocolată caldă",
        items: [
          { name: "White Hot Chocolate", volume: "180ml", price: 21 },
          { name: "Dark Hot Chocolate", volume: "180ml", price: 21 },
        ],
      },
      {
        id: "hot-tea",
        label: "Ceai cald",
        items: [
          { name: "Fruit Symphony", volume: "300ml", price: 16 },
          { name: "Refreshing Mint", volume: "300ml", price: 16 },
          { name: "Pure Chnu Mee", volume: "300ml", price: 16 },
          { name: "Earl Grey Blossom", volume: "300ml", price: 16 },
        ],
      },
    ],
  },
  {
    id: "drinks",
    label: "Băuturi",
    labelEn: "Drinks",
    emoji: "🥤",
    categories: [
      {
        id: "fresh",
        label: "Fresh",
        items: [
          { name: "Portocale", volume: "250ml", price: 20 },
          { name: "Grapefruit", volume: "250ml", price: 20 },
          { name: "Fresh Mix", volume: "250ml", desc: "portocale, grapefruit", price: 20 },
        ],
      },
      {
        id: "lemonade",
        label: "Limonade",
        items: [
          { name: "Classic Lemonade", volume: "300ml", desc: "suc lămâie, sirop, zahăr, apă plată", price: 23 },
          { name: "Mint & Honey Lemonade", volume: "300ml", desc: "lămâie, miere, sirop zahăr, mentă, apă minerală", price: 23 },
          { name: "Strawberry Lemonade", volume: "300ml", desc: "lămâie, sirop zahăr, piure căpșuni, apă minerală", price: 23 },
          { name: "Watermelon Lemonade", volume: "300ml", desc: "lămâie, sirop zahăr, pepene roșu, apă minerală", price: 23 },
          { name: "Elderflower Lemonade", volume: "300ml", desc: "lămâie, sirop zahăr, sirop soc, apă minerală", price: 26 },
          { name: "Forest Fruits Lemonade", volume: "300ml", desc: "lămâie, sirop zahăr, fructe de pădure, apă minerală", price: 26 },
          { name: "Passion Fruit Lemonade", volume: "300ml", desc: "lămâie, sirop zahăr, fructul pasiunii, apă minerală", price: 21 },
        ],
      },
      {
        id: "milkshake",
        label: "Milkshake",
        items: [
          { name: "Banana Milkshake", volume: "300ml", desc: "banană, lapte, frișcă", price: 27 },
          { name: "Oreo Milkshake", volume: "300ml", desc: "oreo, topping ciocolată, lapte, frișcă", price: 27 },
          { name: "Strawberry Banana Milkshake", volume: "300ml", desc: "piure căpșuni, banană, lapte, frișcă", price: 27 },
          { name: "Chocolate Banana Milkshake", volume: "300ml", desc: "banană, lapte, frișcă", price: 27 },
        ],
      },
      {
        id: "smoothie",
        label: "Smoothies",
        items: [
          { name: "Strawberry", volume: "300ml", desc: "căpșune, gheață", price: 23 },
          { name: "Watermelon", volume: "300ml", desc: "pepene roșu, gheață", price: 23 },
          { name: "Forest Fruits", volume: "300ml", desc: "fructe de pădure, gheață", price: 23 },
        ],
      },
      {
        id: "soft",
        label: "Soft Drinks",
        items: [
          { name: "Apă plată Bucovina", volume: "250ml", price: 10 },
          { name: "Apă plată Bucovina", volume: "750ml", price: 20 },
          { name: "Apă minerală Bucovina", volume: "250ml", price: 10 },
          { name: "Apă minerală Bucovina", volume: "750ml", price: 20 },
          { name: "Coca Cola classic / zero", volume: "250ml", price: 12 },
          { name: "Fanta", volume: "250ml", price: 12 },
          { name: "Sprite", volume: "250ml", price: 12 },
          { name: "Cappy pere / portocale", volume: "250ml", price: 13 },
          { name: "Schweppes Mandarine / Bitter Lemon / Kinley", volume: "250ml", price: 12 },
          { name: "Three Cents", volume: "250ml", price: 15 },
          { name: "Three Cents Pink", volume: "250ml", price: 15 },
          { name: "Three Cents Cherry", volume: "250ml", price: 15 },
          { name: "Red Bull", volume: "250ml", price: 16 },
        ],
      },
    ],
  },
  {
    id: "cocktails",
    label: "Cocktailuri",
    labelEn: "Cocktails",
    emoji: "🍹",
    categories: [
      {
        id: "spritz",
        label: "Summer Spritz",
        items: [
          { name: "Hugo", volume: "180ml", desc: "sirop soc, mentă, Prosecco, gheață, apă minerală", price: 32 },
          { name: "Aperol Spritz", volume: "180ml", desc: "Aperol, Prosecco, gheață, apă minerală", price: 32 },
        ],
      },
      {
        id: "non-alcoholic",
        label: "Non-Alcoholic",
        items: [
          { name: "Green Apple", volume: "160ml", desc: "zahăr brun, suc mere, Blue Curaçao, gheață", price: 20 },
          { name: "Tropikal", volume: "160ml", desc: "suc portocale, suc ananas, grenadine", price: 20 },
          { name: "Cherry's Paradise", volume: "160ml", desc: "De Kuyper Raspberry, cherry soda, lămâie, zmeură, mentă", price: 23 },
          { name: "Pink my Ride", volume: "160ml", desc: "De Kuyper Elderflower, pink grapefruit soda, lămâie", price: 20 },
          { name: "Beefeater Zero & Tonic", volume: "160ml", desc: "Beefeater zero, gheață, tonic", price: 20 },
        ],
      },
      {
        id: "cocktails-list",
        label: "Cocktailuri clasice",
        items: [
          { name: "Vodka mix", volume: "160ml", price: 35 },
          { name: "Whiskey mix", volume: "160ml", price: 35 },
          { name: "The Deacon Sour", volume: "90ml", desc: "The Deacon Whisky, suc lămâie, sirop zahăr", price: 38 },
          { name: "Negroni", volume: "90ml", desc: "Vermouth Dulce, Campari, gheață", price: 35 },
          { name: "Whiskey Sour", volume: "90ml", desc: "whiskey, suc lămâie, sirop zahăr", price: 32 },
          { name: "Fyzee Pina Colada", volume: "160ml", desc: "Havana 7 Rom, lichior cocos, 3Cents pineapple", price: 38 },
          { name: "Ultra Violet Tonic", volume: "160ml", desc: "McQueen Ultraviolet, 3Cents Soda, portocală", price: 35 },
          { name: "Sex on The Beach", volume: "160ml", desc: "Vodka, Peachtree, cranberry, ananas", price: 32 },
          { name: "Pornstar Martini", volume: "120ml", desc: "Absolut Vanilia, passion fruit, lime, vin spumant", price: 40 },
          { name: "Espresso Martini", volume: "110ml", desc: "Vodka, lichior cafea, espresso, sirop zahăr", price: 32 },
          { name: "Skrewball Espresso Martini", volume: "110ml", desc: "Screwball, Kahlua, Espresso", price: 32 },
          { name: "Long Island", volume: "200ml", desc: "Vodka, Rom, Gin, Olmeca, Triplu Sec, Coca-Cola", price: 35 },
          { name: "Tequila Sunrise", volume: "160ml", desc: "Olmeca, suc portocale, grenadine, gheață", price: 32 },
          { name: "Cosmopolitan", volume: "100ml", desc: "Absolut Citron, Triplu Sec, suc cranberry", price: 32 },
          { name: "Gin Tonic", volume: "160ml", desc: "Beefeater, gheață, apă tonică", price: 32 },
          { name: "Gin Tonic Pink", volume: "160ml", desc: "Beefeater Pink, gheață, apă tonică", price: 32 },
          { name: "Cuba Libre", volume: "160ml", desc: "rom, Coca-Cola, lime, gheață", price: 32 },
          { name: "Mojito", volume: "160ml", desc: "rom, mentă, lime, zahăr brun, gheață, apă minerală", price: 32 },
        ],
      },
      {
        id: "shots",
        label: "Shots",
        items: [
          { name: "Kamikaze", volume: "30ml", price: 11 },
          { name: "Bubble", volume: "30ml", price: 11 },
          { name: "B52", volume: "30ml", price: 15 },
          { name: "Jagermeister", volume: "30ml", price: 11 },
          { name: "Jager Bomb", volume: "30ml", price: 22 },
          { name: "Tequila", volume: "30ml", price: 11 },
          { name: "Screwball", volume: "30ml", price: 20 },
          { name: "Bumbu Cream", volume: "30ml", price: 20 },
        ],
      },
      {
        id: "beers",
        label: "Beri",
        items: [
          { name: "Heineken", volume: "330ml", price: 15 },
          { name: "Corona", volume: "330ml", price: 17 },
          { name: "Paulaner FNA", volume: "330ml", price: 23 },
        ],
      },
      {
        id: "spirits",
        label: "Spirtoase",
        items: [
          { name: "Absolut Vodka", volume: "40ml / 40%", price: 15 },
          { name: "Ostoya Vodka", volume: "40ml / 40%", price: 20 },
          { name: "Grey Goose", volume: "40ml", price: 25 },
          { name: "Belvedere", volume: "40ml", price: 27 },
          { name: "Jameson", volume: "40ml", price: 17 },
          { name: "Chivas Regal", volume: "40ml", price: 20 },
          { name: "Gentleman Jack", volume: "40ml", price: 20 },
          { name: "The Glenlivet 12yo", volume: "40ml / 40%", price: 20 },
          { name: "The Deacon", volume: "40ml / 40%", price: 20 },
          { name: "Bumbu Rum", volume: "40ml / 40%", price: 25 },
          { name: "Havana Club 7yo", volume: "40ml / 40%", price: 28 },
          { name: "Bumbu XO Rum", volume: "40ml / 40%", price: 28 },
          { name: "Jidvei VSOP", volume: "40ml", price: 16 },
          { name: "Martell Cognac VS", volume: "40ml / 40%", price: 30 },
          { name: "Hennessy", volume: "40ml", price: 25 },
        ],
      },
      {
        id: "wine",
        label: "Vinuri",
        items: [
          { name: "Villa Vinea", volume: "150ml", price: 20 },
          { name: "Villa Vinea Rose", volume: "150ml", price: 20 },
          { name: "Villa Vinea Feteasca Neagră", volume: "150ml", price: 20 },
          { name: "LILIAC Sauvignon Blanc", volume: "0.75L", price: 130 },
          { name: "LILIAC Cuvee Antonia", volume: "0.75L", price: 120 },
          { name: "LILIAC Rose", volume: "0.75L", price: 120 },
          { name: "LILIAC Red Cuvee", volume: "0.75L", price: 140 },
          { name: "Domeniul Bogdan Organic Sauvignon Blanc", volume: "0.75L", price: 90 },
          { name: "Domeniul Bogdan Organic Cabernet", volume: "0.75L", price: 90 },
          { name: "Villa Vinea Gewurztraminer Sec", volume: "0.75L", price: 120 },
          { name: "Villa Vinea Feteasca Regala Sec", volume: "0.75L", price: 100 },
          { name: "Villa Vinea Rose Sec", volume: "0.75L", price: 100 },
          { name: "Villa Vinea Feteasca Neagra Sec", volume: "0.75L", price: 130 },
          { name: "Purcari Pinot Grigio", volume: "0.75L", price: 140 },
          { name: "Purcari Rose", volume: "0.75L", price: 130 },
          { name: "Purcari Rară Neagră", volume: "0.75L", price: 140 },
        ],
      },
      {
        id: "champagne",
        label: "Prosecco & Șampanie",
        items: [
          { name: "Collenovo Prosecco Extra", volume: "0.67L", price: 90 },
          { name: "La Tordera Saomì Brut Prosecco", volume: "0.75L", price: 110 },
          { name: "Asti Martini Dolce", volume: "0.75L", price: 180 },
          { name: "Astoria", volume: "0.75L", price: 280 },
          { name: "Luc Belaire", volume: "0.75L", price: 280 },
          { name: "Moet & Chandon Brut", volume: "0.75L", price: 500 },
          { name: "Moet Ice", volume: "0.75L", price: 650 },
          { name: "Moet Ice Rose", volume: "0.75L", price: 650 },
        ],
      },
    ],
  },
  {
    id: "food",
    label: "Mâncare",
    labelEn: "Food",
    emoji: "🍕",
    categories: [
      {
        id: "starters",
        label: "Aperitive",
        items: [
          { name: "Bruschete cu roșii și usturoi", volume: "160g", desc: "pâine, roșii, usturoi, ulei de măsline, condimente", price: 21 },
          { name: "Bruschete cu ton", volume: "160g", desc: "pâine, ton, condimente, măsline", price: 21 },
          { name: "Platou brânzeturi", volume: "300g", desc: "cașcaval afumat, Cheddar, gorgonzola, Emmentaler, fructe, camembert", price: 45 },
        ],
      },
      {
        id: "soups",
        label: "Supe",
        items: [
          { name: "Supă cremă de dovleac cu crutoane", volume: "400g", desc: "dovleac, ceapă, morcovi, țelină, semințe dovleac", price: 26 },
          { name: "Supă cremă de conopidă cu crutoane", volume: "400g", desc: "usturoi, conopidă, cartofi, condimente", price: 26 },
        ],
      },
      {
        id: "main",
        label: "Feluri principale",
        items: [
          { name: "Piept de pui la grătar", volume: "185g", price: 28 },
          { name: "Snițel de pui", volume: "200g", desc: "piept de pui, ou, făină, pesmet", price: 31 },
          { name: "Crispy cu cartofi prăjiți", volume: "200/200g", desc: "piept de pui, fulgi de porumb, sos", price: 39 },
          { name: "Brașovene", volume: "350g", desc: "carne tocată pui, ou, cașcaval, pesmet, sosuri", price: 40 },
          { name: "Cordon Bleu cu cartofi și cașcaval", volume: "150/200g", desc: "cotlet, șuncă, cașcaval, ardei, cartofi, sos", price: 45 },
          { name: "Coaste în sos BBQ cu cartofi și rozmarin", volume: "300/200g", price: 65 },
          { name: "Mușchiuleț de porc cu fistic și piure de țelină", volume: "160/30g", price: 70 },
          { name: "Platou Criss", volume: "6 persoane", desc: "cordon bleu, crispy, aripioare, șnițele, cartofi cu cașcaval și sosuri", price: 260 },
        ],
      },
      {
        id: "garnish",
        label: "Garnituri",
        items: [
          { name: "Cartofi prăjiți", volume: "200g", price: 14 },
          { name: "Cartofi Wedges", volume: "200g", price: 15 },
          { name: "Orez cu legume", volume: "200g", price: 17 },
        ],
      },
      {
        id: "pasta",
        label: "Paste",
        items: [
          { name: "Bolognese", volume: "350g", desc: "spaghete, carne tocată vită-porc, morcovi, țelină, sos roșii, parmezan", price: 42 },
          { name: "Carbonara", volume: "350g", desc: "paste, bacon, ou, smântână, parmezan", price: 37 },
          { name: "Paste cu ciuperci", volume: "350g", desc: "paste, ciuperci, smântână, ou, parmezan", price: 35 },
        ],
      },
      {
        id: "burgers",
        label: "Burgeri",
        items: [
          { name: "Burger Vită", volume: "250/200g", desc: "chiflă, carne vită, Cheddar, salată, roșii, castraveți, bacon, sos, ceapă caramelizată, cartofi prăjiți", price: 47 },
          { name: "Burger de pui", volume: "250/200g", desc: "chiflă, crispy de pui, Cheddar, salată, roșii, castraveți, ceapă caramelizată, sos, cartofi prăjiți", price: 45 },
        ],
      },
      {
        id: "pizza",
        label: "Pizza",
        items: [
          { name: "Margherita", volume: "300g", desc: "blat, sos, mozzarella, busuioc", price: 36 },
          { name: "Bambino", volume: "420g", desc: "blat, sos, mozzarella, șuncă, porumb", price: 38 },
          { name: "Prosciutto Funghi", volume: "400g", desc: "blat, sos, mozzarella, ciuperci, șuncă", price: 38 },
          { name: "Capriciosa", volume: "450g", desc: "blat, sos, mozzarella, șuncă, ardei, măsline, ciuperci", price: 39 },
          { name: "Chicken", volume: "450g", desc: "blat, sos, mozzarella, piept pui, porumb, usturoi", price: 39 },
          { name: "Quattro Formaggi", volume: "400g", desc: "blat, sos, mozzarella, cașcaval afumat, gorgonzola, parmezan", price: 42 },
          { name: "Quattro Carni", volume: "500g", desc: "blat, sos, mozzarella, cârnați, șuncă, salam, bacon", price: 42 },
          { name: "Diavolo", volume: "400g", desc: "blat, sos, mozzarella, salam picant, ardei iute", price: 38 },
          { name: "Pizza Criss", volume: "500g", desc: "blat, sos, mozzarella, șuncă, cârnați, porumb, ardei, ceapă, rucola", price: 42 },
          { name: "Vegetariană", volume: "400g", desc: "blat, sos, mozzarella, ciuperci, legume, porumb, ardei", price: 36 },
          { name: "Pizza Doner", volume: "450g", desc: "blat, sos, mozzarella, pui, roșii, condimente", price: 46 },
          { name: "Pizza Salami", volume: "400g", desc: "blat, sos, mozzarella, salam, ardei", price: 38 },
        ],
      },
      {
        id: "salads",
        label: "Salate",
        items: [
          { name: "Salată de varză proaspătă", volume: "180g", price: 9 },
          { name: "Salată Caesar", volume: "400g", desc: "salată iceberg, roșii, castraveți, piept pui, ulei măsline, crutoane, parmezan", price: 40 },
          { name: "Salată grecească", volume: "400g", desc: "salată, roșii, castraveți, ardei, ceapă roșie, măsline, brânză, ulei măsline", price: 37 },
        ],
      },
      {
        id: "sauces",
        label: "Sosuri",
        items: [
          { name: "Sos de roșii", volume: "50g", price: 6 },
          { name: "Sos de roșii picant", volume: "50g", price: 6 },
          { name: "Sos usturoi", volume: "50g", price: 6 },
          { name: "Sos crispy", volume: "50g", price: 6 },
          { name: "Sos Criss", volume: "50g", desc: "smântână, usturoi, condimente", price: 8 },
        ],
      },
      {
        id: "desserts",
        label: "Deserturi",
        items: [
          { name: "Clătite cu Nutella", volume: "280g", price: 22 },
          { name: "Lava Cake", volume: "120g", price: 25 },
          { name: "Cheesecake", volume: "140g", price: 28 },
        ],
      },
    ],
  },
];
