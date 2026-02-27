// ─── Menu ───────────────────────────────────────────────────────────────────

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
      tag: 'Chef\'s Signature',
      badge: 'Most Loved',
      desc: 'Premium smoked bacon, triple mozzarella, caramelised onion jam, maple-BBQ drizzle on a 48-hour cold-ferment base.',
      price: 'Rs. 1,450',
      accent: '#8B4513',
      icon: '🍕',
      featured: true,
    },
    {
      id: 'margherita-royale',
      name: 'Margherita Royale',
      tag: 'Classic',
      desc: 'DOP San Marzano tomatoes, buffalo mozzarella fior di latte, fresh basil, cold-pressed EVOO.',
      price: 'Rs. 1,200',
      accent: '#6B3A2A',
      icon: '🍕',
    },
    {
      id: 'smoked-chicken',
      name: 'Smoked Chicken',
      tag: 'House Special',
      badge: 'Popular',
      desc: 'In-house smoked chicken, jalapeños, aged gouda, honey-sriracha lacquer, toasted sesame.',
      price: 'Rs. 1,350',
      accent: '#5C3018',
      icon: '🍕',
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
      accent: '#5A4A00',
      icon: '🍜',
      featured: true,
    },
    {
      id: 'seafood-pad-thai',
      name: 'Seafood Pad Thai',
      tag: 'Coastal Fusion',
      badge: 'Premium',
      desc: 'Tiger prawns, baby squid, glass noodles, kaffir lime leaf, bird\'s eye chilli oil, fresh bean sprouts.',
      price: 'Rs. 1,800',
      accent: '#003A4A',
      icon: '🦐',
    },
    {
      id: 'royal-biryani',
      name: 'Royal Dum Biryani',
      tag: 'Heritage',
      desc: 'Slow-cooked Awadhi style — saffron-steeped aged basmati, tender lamb, fried shallots, mint raita.',
      price: 'Rs. 1,700',
      accent: '#4A2800',
      icon: '🍛',
    },
  ],
  specialties: [
    {
      id: 'glazed-pork',
      name: 'Glazed Pork Belly',
      tag: 'Chef\'s Table',
      badge: 'Award Winning',
      desc: '48-hour sous-vide pork belly, shiro miso glaze, pickled daikon, toasted sesame, microgreen salad.',
      price: 'Rs. 1,900',
      accent: '#4A0A0A',
      icon: '🥩',
      featured: true,
    },
    {
      id: 'mango-fizz',
      name: 'Mango Elderflower Fizz',
      tag: 'Signature Mocktail',
      desc: 'Cold-pressed Alphonso mango, St. Germain elderflower cordial, yuzu, gold-shimmer sparkling water.',
      price: 'Rs. 450',
      accent: '#4A3800',
      icon: '🥭',
    },
    {
      id: 'cocktails',
      name: 'Artisan Cocktails',
      tag: 'Bar Selection',
      desc: 'Rotating seasonal programme — house-infused spirits, clarified juices, hand-carved ice. From Rs. 550.',
      price: 'From Rs. 550',
      accent: '#0A0A3A',
      icon: '🍹',
    },
  ],
}

// ─── Gallery ────────────────────────────────────────────────────────────────

export const GALLERY_ITEMS = [
  {
    id: 'dining-hall',
    icon: '🏛️',
    label: 'The Grand Dining Hall',
    caption: 'Soaring ceilings, warm walnut tones, statement lighting',
    bg: 'linear-gradient(145deg, #1C1508 0%, #2E1F08 55%, #180F04 100%)',
    w: 520,
  },
  {
    id: 'evening',
    icon: '🕯️',
    label: 'Evening Ambiance',
    caption: 'Candlelit tables, curated soundscapes',
    bg: 'linear-gradient(145deg, #120608 0%, #1E0808 100%)',
    w: 340,
  },
  {
    id: 'bar',
    icon: '🍷',
    label: 'Bar & Lounge',
    caption: 'Rare reserves, handcrafted pours',
    bg: 'linear-gradient(145deg, #06080F 0%, #0A1020 100%)',
    w: 440,
  },
  {
    id: 'terrace',
    icon: '🌿',
    label: 'Garden Terrace',
    caption: 'Al fresco dining under the stars',
    bg: 'linear-gradient(145deg, #060F06 0%, #0A1A08 100%)',
    w: 320,
  },
  {
    id: 'kitchen',
    icon: '👨‍🍳',
    label: 'Open Kitchen Theatre',
    caption: 'Watch masters at work through glass',
    bg: 'linear-gradient(145deg, #080808 0%, #181410 100%)',
    w: 480,
  },
]

// ─── Stats ───────────────────────────────────────────────────────────────────

export const STATS = [
  { num: '50+',  label: 'Signature Dishes'   },
  { num: '4.9',  label: 'Google Rating'      },
  { num: '200',  label: 'Seats Available'    },
  { num: '3+',   label: 'Years of Craft'     },
]

// ─── Marquee ─────────────────────────────────────────────────────────────────

export const MARQUEE_ITEMS = [
  'Bacon Special',
  'Glazed Pork Belly',
  'Seafood Pad Thai',
  'Royal Biryani',
  'Artisan Cocktails',
  'Open Daily 10:30 AM – 12 AM',
]
