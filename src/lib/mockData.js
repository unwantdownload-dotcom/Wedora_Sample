// Initial seed and fallback data mirroring the exact flyer uploaded by the user
// Structured to showcase rich design variations across each price category:
// Rs. 85 (Model A), Rs. 125 (Model A1), Rs. 165 (Model C1), and Rs. 700 (Model D1)

export const initialCategories = [
  {
    id: "cat-1",
    name: "Wedding Chocolates",
    description: "Exquisite personalized chocolate bars for weddings and anniversary guest favors.",
    display_order: 1
  },
  {
    id: "cat-2",
    name: "Birthday Favors",
    description: "Vibrant, customized chocolate bars to celebrate memorable birthdays.",
    display_order: 2
  },
  {
    id: "cat-3",
    name: "Graduation Specials",
    description: "Celebrate academic milestones and convocations with sweet elegance.",
    display_order: 3
  },
  {
    id: "cat-4",
    name: "Corporate Gifts",
    description: "Branded bespoke chocolates for corporate events, clients, and team appreciation.",
    display_order: 4
  },
  {
    id: "cat-5",
    name: "Custom Designs",
    description: "Tailor-made customized wrapper artworks and dimensions for any celebration.",
    display_order: 5
  }
];

export const initialProducts = [
  // =================== RS. 85 SAMPLES (Model A: 12.5 cm x 5.5 cm | 12g | Min 50) ===================
  {
    id: "prod-a-wedding",
    category_id: "cat-1",
    product_code: "A-01",
    name: "Classic Floral Wedding Favor (Design A)",
    description: "Bespoke 'Thank You' illustration with bride & groom portrait and pastel blue botanical borders. Size: 12.5 cm × 5.5 cm.",
    minimum_order: 50,
    is_active: true,
    created_at: new Date().toISOString(),
    images: [
      {
        id: "img-a-1",
        image_url: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=1000&q=80",
        is_primary: true
      },
      {
        id: "img-a-flyer",
        image_url: "/wedora-price-chart.jpg",
        is_primary: false
      }
    ],
    variants: [
      { id: "var-a-1", size: "12.5 cm × 5.5 cm", weight: "12 g", price: 85.00 }
    ]
  },
  {
    id: "prod-a-gold",
    category_id: "cat-1",
    product_code: "A-02",
    name: "Golden Royale Wedding Monogram (Design A)",
    description: "Gold embossed calligraphy monogram featuring couple initials, reception date, and champagne background foil wrapper.",
    minimum_order: 50,
    is_active: true,
    created_at: new Date().toISOString(),
    images: [
      {
        id: "img-a-2",
        image_url: "https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=1000&q=80",
        is_primary: true
      }
    ],
    variants: [
      { id: "var-a-2", size: "12.5 cm × 5.5 cm", weight: "12 g", price: 85.00 }
    ]
  },
  {
    id: "prod-a-birthday",
    category_id: "cat-2",
    product_code: "A-03",
    name: "Sweet Celebration Birthday Treat (Design A)",
    description: "Joyful birthday wrapper design with custom milestone age, personalized photo, and vibrant festive ribbons.",
    minimum_order: 50,
    is_active: true,
    created_at: new Date().toISOString(),
    images: [
      {
        id: "img-a-3",
        image_url: "https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&w=1000&q=80",
        is_primary: true
      }
    ],
    variants: [
      { id: "var-a-3", size: "12.5 cm × 5.5 cm", weight: "12 g", price: 85.00 }
    ]
  },
  {
    id: "prod-a-minimal",
    category_id: "cat-5",
    product_code: "A-04",
    name: "Minimalist Ivory Romance (Design A)",
    description: "Clean aesthetic with modern serif typography, subtle gold foil line art, and textured matte paper.",
    minimum_order: 50,
    is_active: true,
    created_at: new Date().toISOString(),
    images: [
      {
        id: "img-a-4",
        image_url: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=1000&q=80",
        is_primary: true
      }
    ],
    variants: [
      { id: "var-a-4", size: "12.5 cm × 5.5 cm", weight: "12 g", price: 85.00 }
    ]
  },

  // =================== RS. 125 SAMPLES (Model A1: 13.5 cm x 6 cm | 25g | Min 50) ===================
  {
    id: "prod-a1-botanical",
    category_id: "cat-1",
    product_code: "A1-01",
    name: "Sweet Harmony Couple Bar (Design A1)",
    description: "Generous single-serve chocolate bar featuring customized couple naming, date, and delicate border graphics. Size: 13.5 cm × 6 cm.",
    minimum_order: 50,
    is_active: true,
    created_at: new Date().toISOString(),
    images: [
      {
        id: "img-a1-1",
        image_url: "https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&w=1000&q=80",
        is_primary: true
      },
      {
        id: "img-a1-flyer",
        image_url: "/wedora-price-chart.jpg",
        is_primary: false
      }
    ],
    variants: [
      { id: "var-a1-1", size: "13.5 cm × 6 cm", weight: "25 g", price: 125.00 }
    ]
  },
  {
    id: "prod-a1-rustic",
    category_id: "cat-1",
    product_code: "A1-02",
    name: "Rustic Eucalyptus & Gold Foil (Design A1)",
    description: "Eucalyptus botanical wreath artwork with couple names and customized sweet message on the reverse.",
    minimum_order: 50,
    is_active: true,
    created_at: new Date().toISOString(),
    images: [
      {
        id: "img-a1-2",
        image_url: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=1000&q=80",
        is_primary: true
      }
    ],
    variants: [
      { id: "var-a1-2", size: "13.5 cm × 6 cm", weight: "25 g", price: 125.00 }
    ]
  },
  {
    id: "prod-a1-graduation",
    category_id: "cat-3",
    product_code: "A1-03",
    name: "Academic Milestone Tribute (Design A1)",
    description: "Specially designed graduation keepsake bar featuring university crest, degree title, graduate name, and class year.",
    minimum_order: 50,
    is_active: true,
    created_at: new Date().toISOString(),
    images: [
      {
        id: "img-a1-3",
        image_url: "https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=1000&q=80",
        is_primary: true
      }
    ],
    variants: [
      { id: "var-a1-3", size: "13.5 cm × 6 cm", weight: "25 g", price: 125.00 }
    ]
  },
  {
    id: "prod-a1-corporate",
    category_id: "cat-4",
    product_code: "A1-04",
    name: "Executive Brand Greeting (Design A1)",
    description: "Professional corporate wrapper featuring embossed company logo, brand color accents, and holiday appreciation greeting.",
    minimum_order: 50,
    is_active: true,
    created_at: new Date().toISOString(),
    images: [
      {
        id: "img-a1-4",
        image_url: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=1000&q=80",
        is_primary: true
      }
    ],
    variants: [
      { id: "var-a1-4", size: "13.5 cm × 6 cm", weight: "25 g", price: 125.00 }
    ]
  },

  // =================== RS. 165 SAMPLES (Model C1: 17 cm x 6.5 cm | 38g | Min 20) ===================
  {
    id: "prod-c1-luxury",
    category_id: "cat-1",
    product_code: "C1-01",
    name: "Signature Elegance Table Placement (Design C1)",
    description: "Luxury medium chocolate bar crafted for premium wedding favors and VIP banquet table placements. Size: 17 cm × 6.5 cm.",
    minimum_order: 20,
    is_active: true,
    created_at: new Date().toISOString(),
    images: [
      {
        id: "img-c1-1",
        image_url: "https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=1000&q=80",
        is_primary: true
      },
      {
        id: "img-c1-flyer",
        image_url: "/wedora-price-chart.jpg",
        is_primary: false
      }
    ],
    variants: [
      { id: "var-c1-1", size: "17 cm × 6.5 cm", weight: "38 g", price: 165.00 }
    ]
  },
  {
    id: "prod-c1-portrait",
    category_id: "cat-1",
    product_code: "C1-02",
    name: "Full Couple Portrait Keepsake (Design C1)",
    description: "High-definition custom photo printing with couple vows, bridal party names, and gilded metallic borders.",
    minimum_order: 20,
    is_active: true,
    created_at: new Date().toISOString(),
    images: [
      {
        id: "img-c1-2",
        image_url: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=1000&q=80",
        is_primary: true
      }
    ],
    variants: [
      { id: "var-c1-2", size: "17 cm × 6.5 cm", weight: "38 g", price: 165.00 }
    ]
  },
  {
    id: "prod-c1-velvet",
    category_id: "cat-4",
    product_code: "C1-03",
    name: "Corporate VIP Banquet Favor (Design C1)",
    description: "Sleek matte black and gold foil packaging for corporate annual meetings, product launches, and client thank-you gifts.",
    minimum_order: 20,
    is_active: true,
    created_at: new Date().toISOString(),
    images: [
      {
        id: "img-c1-3",
        image_url: "https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&w=1000&q=80",
        is_primary: true
      }
    ],
    variants: [
      { id: "var-c1-3", size: "17 cm × 6.5 cm", weight: "38 g", price: 165.00 }
    ]
  },

  // =================== RS. 700 SAMPLES (Model D1: 20.5 cm x 9 cm | 85g | Min 1) ===================
  {
    id: "prod-d1-grand",
    category_id: "cat-1",
    product_code: "D1-01",
    name: "Grand Luxury Slab - Wedding Head Table (Design D1)",
    description: "Showstopper centerpiece chocolate slab. Premium souvenir or personal gift with full custom wedding illustration. Size: 20.5 cm × 9 cm.",
    minimum_order: 1,
    is_active: true,
    created_at: new Date().toISOString(),
    images: [
      {
        id: "img-d1-1",
        image_url: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=1000&q=80",
        is_primary: true
      },
      {
        id: "img-d1-flyer",
        image_url: "/wedora-price-chart.jpg",
        is_primary: false
      }
    ],
    variants: [
      { id: "var-d1-1", size: "20.5 cm × 9 cm", weight: "85 g", price: 700.00 }
    ]
  },
  {
    id: "prod-d1-anniversary",
    category_id: "cat-5",
    product_code: "D1-02",
    name: "Milestone Golden Anniversary Slab (Design D1)",
    description: "Deluxe 85g chocolate slab in custom wooden presentation box wrapper with gold foil calligraphy and anniversary vows.",
    minimum_order: 1,
    is_active: true,
    created_at: new Date().toISOString(),
    images: [
      {
        id: "img-d1-2",
        image_url: "https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=1000&q=80",
        is_primary: true
      }
    ],
    variants: [
      { id: "var-d1-2", size: "20.5 cm × 9 cm", weight: "85 g", price: 700.00 }
    ]
  },
  {
    id: "prod-d1-corporate-gift",
    category_id: "cat-4",
    product_code: "D1-03",
    name: "Presidential Corporate Trophy Chocolate (Design D1)",
    description: "Substantial 85g premium artisan slab crafted for board members, keynote speakers, and luxury gift hampers.",
    minimum_order: 1,
    is_active: true,
    created_at: new Date().toISOString(),
    images: [
      {
        id: "img-d1-3",
        image_url: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=1000&q=80",
        is_primary: true
      }
    ],
    variants: [
      { id: "var-d1-3", size: "20.5 cm × 9 cm", weight: "85 g", price: 700.00 }
    ]
  }
];

export const PRICE_TIERS_CONFIG = [
  {
    id: "tier-85",
    price: 85,
    code: "A",
    title: "Rs. 85 Designs – Petite Favors (Model A)",
    size: "12.5 cm × 5.5 cm",
    weight: "12 g",
    minOrder: "50 pcs",
    badge: "Most Popular for Weddings",
    flavours: ["Milk Chocolate", "Dark Chocolate", "Roasted Almond", "Creamy White"]
  },
  {
    id: "tier-125",
    price: 125,
    code: "A1",
    title: "Rs. 125 Designs – Sweet Harmony Bars (Model A1)",
    size: "13.5 cm × 6 cm",
    weight: "25 g",
    minOrder: "50 pcs",
    badge: "Best Value & Size",
    flavours: ["Rich Milk Chocolate", "Semi-Sweet Dark 60%", "Caramel Crunch", "Hazelnut Praline"]
  },
  {
    id: "tier-165",
    price: 165,
    code: "C1",
    title: "Rs. 165 Designs – Signature Elegance (Model C1)",
    size: "17 cm × 6.5 cm",
    weight: "38 g",
    minOrder: "20 pcs",
    badge: "VIP & Banquet Placement",
    flavours: ["Dark Chocolate 70%", "Velvety Milk Truffle", "Roasted Cashew & Raisin", "Espresso Mocha"]
  },
  {
    id: "tier-700",
    price: 700,
    code: "D1",
    title: "Rs. 700 Designs – Grand Luxury Slabs (Model D1)",
    size: "20.5 cm × 9 cm",
    weight: "85 g",
    minOrder: "1 pc (No minimum!)",
    badge: "Showstopper Centerpiece",
    flavours: ["Artisan Dark Gold Leaf", "Triple Nut Royale", "Swiss Blend Milk", "Belgian Dark Truffle"]
  }
];

export const BUSINESS_INFO = {
  name: "WEDORA",
  tagline: "Exquisite Handcrafted Chocolates & Bespoke Event Favors",
  phone: "+94 78 359 0222",
  phoneRaw: "94783590222",
  whatsappUrl: "https://wa.me/94783590222",
  messengerUrl: "https://m.me/wedorachocolates",
  facebookUrl: "https://www.facebook.com/share/14t3PjDUnNG/?mibextid=wwXIfr",
  tiktokUrl: "https://www.tiktok.com/@wedorainvitation2?_r=1&_t=ZS-9BfW0UZxDYD",
  currency: "Rs.",
  deliveryNotice: "Prices may vary slightly based on raw materials & seasonal supplies. Islandwide Delivery Available across Sri Lanka."
};
