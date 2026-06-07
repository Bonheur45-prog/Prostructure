// ============================================
// PROSTRUCTURE ENGINEERING LTD
// src/data/hero.js
// Hero section — slides, CTAs, stats strip
// ============================================

export const heroSlides = [
  {
    id:         1,
    accent:     'Construction',
    headline:   'Building Rwanda\'s Future With Precision & Excellence',
    subheadline:'Residential, commercial and industrial construction delivered to the highest engineering standards.',
    image:      "src/assets/images/hero-1.jpg", // ← Replace: src/assets/images/hero-1.jpg
    alt:        'Prostructure construction site in Kigali, Rwanda',
  },
  {
    id:         2,
    accent:     'Electrical',
    headline:   'Safe & Efficient Electrical Systems for Modern Buildings',
    subheadline:'Professional electrical installations designed for performance, safety and long-term reliability.',
    image:      "src/assets/images/hero-2.jpg", // ← Replace: src/assets/images/hero-2.jpg
    alt:        'Prostructure electrical installation project',
  },
  {
    id:         3,
    accent:     'Plumbing',
    headline:   'Reliable Water Systems Built for Long-Term Performance',
    subheadline:'Expert plumbing solutions for residential, commercial and institutional projects across Rwanda.',
    image:      "src/assets/images/hero-3.jpg", // ← Replace: src/assets/images/hero-3.jpg
    alt:        'Prostructure plumbing project',
  },
  {
    id:         4,
    accent:     'Waterproofing',
    headline:   'Protecting Your Building Against Water Damage',
    subheadline:'Advanced waterproofing and humidity solutions that preserve structural integrity for decades.',
    image:      "src/assets/images/hero-4.jpg", // ← Replace: src/assets/images/hero-4.jpg
    alt:        'Prostructure waterproofing project',
  },
]

export const heroCtas = [
  {
    id:      1,
    label:   'Request a Quote',
    href:    '#contact',
    variant: 'primary',
  },
  {
    id:      2,
    label:   'View Projects',
    href:    '#projects',
    variant: 'outline',
  },
]

// Auto-advance interval per slide in milliseconds
export const SLIDE_DURATION = 6000