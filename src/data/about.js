// ============================================
// PROSTRUCTURE ENGINEERING LTD
// src/data/about.js
// About section content
// ============================================
import aboutImage from '@assets/images/about.jpg'

const about = {
  sectionLabel: 'Who We Are',

  headline: 'Building Rwanda\'s Future With Engineering Excellence',

  story: [
    'Prostructure Engineering Ltd is a professional engineering and construction company based in Kigali, Rwanda. We deliver reliable, high-quality, and complete building solutions for residential, commercial, institutional, and infrastructure projects across the country.',
    'Founded on a commitment to precision and integrity, our team of certified engineers and skilled professionals brings technical expertise to every project — from initial consultation to final handover. We combine modern engineering practices with a deep understanding of the local environment to deliver structures that stand the test of time.',
    'At Prostructure, quality is not optional. Every project we undertake is executed with the highest standards of workmanship, safety, and client satisfaction.',
  ],

  highlights: [
    { id: 1, label: 'Licensed & Certified' },
    { id: 2, label: 'Safety First' },
    { id: 3, label: 'Quality Assured' },
  ],

  // Replace with real team or site photo once available
  // e.g. '/src/assets/images/about.jpg'
  image:    aboutImage,
  imageAlt: 'Prostructure Engineering team at work on a construction site in Kigali, Rwanda',

  cta: {
    label: 'Get in Touch',
    href:  '#contact',
  },
}

export default about