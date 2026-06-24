// ============================================
// PROSTRUCTURE ENGINEERING LTD
// src/data/services.js
// Services section content
// ============================================

export const servicesContent = {
  sectionLabel: 'What We Do',
  headline:     'Complete Engineering & Construction Solutions',
  subtext:      'From foundation to finish, Prostructure Engineering Ltd delivers every discipline of construction and engineering under one roof — giving you a single trusted partner for your entire project.',
}

// Media card — set src to a real image or video path when available
// type: 'image' | 'video'
export const servicesMedia = {
  type:   'image',
  src:    null,           // ← Replace: src/assets/images/services-media.jpg
  poster: null,           // ← For video: poster/thumbnail image path
  alt:    'Prostructure Engineering Ltd construction and engineering services in Rwanda',
}

// Parallax background image behind the whole section
export const servicesBackground = {
  src: null,              // ← Replace: src/assets/images/services-bg.jpg
}

export const services = [
  {
    id:          1,
    title:       'Construction',
    description: 'Residential, commercial and industrial construction delivered with engineering precision. We manage every phase from groundbreaking to handover.',
    href:        '#contact',
  },
  {
    id:          2,
    title:       'Waterproofing & Humidity Solutions',
    description: 'Protecting buildings against water damage and structural deterioration using advanced materials and proven techniques.',
    href:        '#contact',
  },
  {
    id:          3,
    title:       'Plumbing',
    description: 'Reliable water supply and drainage systems designed for long-term performance in residential, commercial and institutional buildings.',
    href:        '#contact',
  },
  {
    id:          4,
    title:       'Electrical Installation',
    description: 'Safe and efficient electrical systems for modern buildings — from wiring and distribution to full installation and commissioning.',
    href:        '#contact',
  },
  {
    id:          5,
    title:       'Maintenance & Repairing',
    description: 'Keeping facilities operational, efficient and safe. Scheduled and emergency maintenance services for all building types.',
    href:        '#contact',
  },
  {
    id:          6,
    title:       'Supply Services',
    description: 'Providing dependable access to quality engineering and construction materials sourced for reliability and value.',
    href:        '#contact',
  },
]