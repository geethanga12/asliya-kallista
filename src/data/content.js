import { IMAGES } from './images'

export const MENU_TABS = [
  { key: 'pizzas',      label: 'Signature Pizzas' },
  { key: 'mains',       label: 'Fusion Mains'     },
  { key: 'specialties', label: 'Specialties'       },
]

export const MENU_DATA = {
  pizzas: [
    {
      id: 'bacon-special',
      name: 'Bacon Special',
      tag: "Chef's Signature",
      badge: 'Most Loved',
      desc: 'Premium smoked bacon, triple mozzarella, caramelised onion jam, maple-BBQ drizzle on a 48-hour cold-ferment base.',
      price: 'Rs. 1,450',
      img: IMAGES.menuBaconPizza,
      featured: true,
    },
    {
      id: 'margherita-royale',
      name: 'Margherita Royale',
      tag: 'Classic',
      desc: 'DOP San Marzano tomatoes, buffalo mozzarella fior di latte, fresh basil, cold-pressed EVOO.',
      price: 'Rs. 1,200',
      img: IMAGES.menuMargherita,
    },
    {
      id: 'smoked-chicken',
      name: 'Smoked Chicken',
      tag: 'House Special',
      badge: 'Popular',
      desc: 'In-house smoked chicken, jalapeños, aged gouda, honey-sriracha lacquer, toasted sesame.',
      price: 'Rs. 1,350',
      img: IMAGES.menuSmokedChicken,
    },
  ],
  mains: [
    {
      id: 'chicken-pad-thai',
      name: 'Chicken Pad Thai',
      tag: 'Asian Fusion',
      badge: 'Bestseller',
      desc: 'Free-range chicken, hand-cut rice noodles, tamarind concentrate, soft-boiled egg, crushed roasted peanuts.',
      price: 'Rs. 1,600',
      img: IMAGES.menuChickenPadThai,
      featured: true,
    },
    {
      id: 'seafood-pad-thai',
      name: 'Seafood Pad Thai',
      tag: 'Coastal Fusion',
      badge: 'Premium',
      desc: "Tiger prawns, baby squid, glass noodles, kaffir lime leaf, bird's eye chilli oil.",
      price: 'Rs. 1,800',
      img: IMAGES.menuSeafoodPadThai,
    },
    {
      id: 'royal-biryani',
      name: 'Royal Dum Biryani',
      tag: 'Heritage',
      desc: 'Slow-cooked Awadhi style — saffron-steeped aged basmati, tender lamb, fried shallots, mint raita.',
      price: 'Rs. 1,700',
      img: IMAGES.menuBiryani,
    },
  ],
  specialties: [
    {
      id: 'glazed-pork',
      name: 'Glazed Pork Belly',
      tag: "Chef's Table",
      badge: 'Award Winning',
      desc: '48-hour sous-vide pork belly, shiro miso glaze, pickled daikon, toasted sesame, microgreen salad.',
      price: 'Rs. 1,900',
      img: IMAGES.menuPorkBelly,
      featured: true,
    },
    {
      id: 'mango-fizz',
      name: 'Mango Elderflower Fizz',
      tag: 'Signature Mocktail',
      desc: 'Cold-pressed Alphonso mango, elderflower cordial, yuzu, gold-shimmer sparkling water.',
      price: 'Rs. 450',
      img: IMAGES.menuMango,
    },
    {
      id: 'cocktails',
      name: 'Artisan Cocktails',
      tag: 'Bar Selection',
      desc: 'Rotating seasonal programme — house-infused spirits, clarified juices, hand-carved ice.',
      price: 'From Rs. 550',
      img: IMAGES.menuCocktails,
    },
  ],
}

export const GALLERY_ITEMS = [
  { id: 'dining-hall', img: IMAGES.galleryDiningHall, label: 'The Grand Dining Hall', caption: 'Soaring ceilings, warm walnut tones, statement lighting', w: 520 },
  { id: 'evening',     img: IMAGES.galleryEvening,    label: 'Evening Ambiance',       caption: 'Candlelit tables, curated soundscapes',                   w: 340 },
  { id: 'bar',         img: IMAGES.galleryBar,         label: 'Bar & Lounge',           caption: 'Rare reserves, handcrafted pours',                        w: 440 },
  { id: 'terrace',     img: IMAGES.galleryTerrace,     label: 'Garden Terrace',         caption: 'Al fresco dining under the stars',                        w: 320 },
  { id: 'kitchen',     img: IMAGES.galleryKitchen,     label: 'Open Kitchen Theatre',   caption: 'Watch masters at work through glass',                     w: 480 },
]

export const STATS = [
  { num: '50+', label: 'Signature Dishes' },
  { num: '4.9', label: 'Google Rating'    },
  { num: '200', label: 'Seats Available'  },
  { num: '3+',  label: 'Years of Craft'  },
]

export const MARQUEE_ITEMS = [
  'Bacon Special Pizza',
  'Glazed Pork Belly',
  'Seafood Pad Thai',
  'Royal Dum Biryani',
  'Artisan Cocktails',
  'Family Restaurant · Kurunegala',
  'Open Daily 10:30 AM – 12 AM',
  'BYOB Events & Private Dining',
]