// ============================================
// PROSTRUCTURE ENGINEERING LTD
// src/data/hero.js
// Hero section — slides, CTAs, stats strip
// ============================================
import hero1 from '@assets/images/hero-1.jpg'
import hero2 from '@assets/images/hero-2.jpg'
import hero3 from '@assets/images/hero-3.jpg'
import hero4 from '@assets/images/hero-4.jpg'

export const heroSlides = [
  {
    id:         1,
    accent:     'Construction',
    headline:   'Building Rwanda\'s Future With Precision & Excellence',
    subheadline:'Residential, commercial and industrial construction delivered to the highest engineering standards.',
    image:      hero1,
    alt:        'Prostructure construction site in Kigali, Rwanda',
  },
  {
    id:         2,
    accent:     'Electrical',
    headline:   'Safe & Efficient Electrical Systems for Modern Buildings',
    subheadline:'Professional electrical installations designed for performance, safety and long-term reliability.',
    image:      hero2,
    alt:        'Prostructure electrical installation project',
  },
  {
    id:         3,
    accent:     'Plumbing',
    headline:   'Reliable Water Systems Built for Long-Term Performance',
    subheadline:'Expert plumbing solutions for residential, commercial and institutional projects across Rwanda.',
    image:      hero3,
    alt:        'Prostructure plumbing project',
  },
  {
    id:         4,
    accent:     'Waterproofing',
    headline:   'Protecting Your Building Against Water Damage',
    subheadline:'Advanced waterproofing and humidity solutions that preserve structural integrity for decades.',
    image:      hero4,
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