// ============================================
// PROSTRUCTURE ENGINEERING LTD
// src/data/process.js
// Working Process – Data & Icon Mapping
// ============================================

import {
  Handshake,
  Clipboard,
  FileText,
  Calendar,
  Wrench,
  BadgeCheck,
  Key,
} from 'lucide-react'

export const processContent = {
  sectionLabel: 'Our Workflow',
  headline:     'From Concept to Completion',
  subtext:      'A transparent, structured approach ensuring every project is delivered with precision, quality, and total client satisfaction.',
}

export const processSteps = [
  {
    id:          1,
    title:       'Consultation',
    description: 'We listen to your vision, understand your needs, and align our expertise with your goals.',
    icon:        Handshake,
  },
  {
    id:          2,
    title:       'Site Assessment',
    description: 'Thorough on‑site evaluation to analyze conditions, constraints, and opportunities.',
    icon:        Clipboard,
  },
  {
    id:          3,
    title:       'Proposal & Quotation',
    description: 'Detailed scope of work, transparent cost estimates, and clear project timelines.',
    icon:        FileText,
  },
  {
    id:          4,
    title:       'Project Planning',
    description: 'Comprehensive scheduling, resource allocation, and risk management strategies.',
    icon:        Calendar,
  },
  {
    id:          5,
    title:       'Execution',
    description: 'Skilled craftsmanship and rigorous project management bring the plan to life.',
    icon:        Wrench,
  },
  {
    id:          6,
    title:       'Quality Inspection',
    description: 'Meticulous checks at every stage to ensure compliance with the highest standards.',
    icon:        BadgeCheck,
  },
  {
    id:          7,
    title:       'Handover',
    description: 'Final walkthrough, documentation, and training to ensure a seamless transition.',
    icon:        Key,
  },
]