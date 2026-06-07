// ============================================
// PROSTRUCTURE ENGINEERING LTD
// App-wide Constants — config only
// All content lives in src/data/
// ============================================

export const COMPANY_NAME = 'Prostructure Engineering Ltd'

export const WHATSAPP_MESSAGE =
  'Hello%20Prostructure%20Engineering%2C%20I%20would%20like%20to%20request%20a%20quote.'

// Build WhatsApp URL from a phone number string (digits only)
export const buildWhatsAppUrl = (phone) =>
  `https://wa.me/${phone}?text=${WHATSAPP_MESSAGE}`

// Section IDs — used for nav scroll targets and anchor links
export const SECTION_IDS = {
  home:     'home',
  about:    'about',
  services: 'services',
  projects: 'projects',
  process:  'process',
  whyUs:    'why-us',
  testimonials: 'testimonials',
  faq:      'faq',
  contact:  'contact',
}

// Animation defaults for Framer Motion
export const ANIMATION = {
  fadeUp: {
    hidden:  { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  },
  fadeIn: {
    hidden:  { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  },
  fadeLeft: {
    hidden:  { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  },
  fadeRight: {
    hidden:  { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  },
  staggerContainer: {
    hidden:  {},
    visible: {
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  },
}
