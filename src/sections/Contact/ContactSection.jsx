// ============================================
// PROSTRUCTURE ENGINEERING LTD
// src/sections/Contact/ContactSection.jsx
//
// Contact section — glassmorphism card with
// gold corner brackets, WhatsApp as primary
// channel, contact info + social links.
// All text/links are placeholders — update
// the contactData object below.
// ============================================

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from '@hooks/useInView'
import {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
} from 'lucide-react'

// ── Inline SVG social icons ──────────────────────────
// Lucide removed brand icons in recent versions.
// We ship them inline so there is no external dependency.

function IconLinkedIn({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

function IconInstagram({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  )
}

function IconFacebook({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  )
}

function IconX({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  )
}
import styles from './ContactSection.module.css'

// ── Contact data — update placeholders here ──────────
const contactData = {
  eyebrow:   'Get In Touch',
  headline:  "Let's Build Something",
  accentWord: 'Extraordinary',
  subtext:
    'Whether you have detailed plans or just an idea — our team is ready to listen, advise, and deliver with precision. Reach out today and let us bring your vision to life.',
  whatsapp: {
    number:  '+250795263269',   // ← replace with real number (intl format, no spaces)
    message: 'Hello Prostructure, I would like to discuss a project.',
  },
  secondaryCta: {
    label: 'View Our Projects',
    href:  '#projects',
  },
  info: [
    { icon: Phone,   label: 'Phone',    value: '+250 700 000 000',       href: 'tel:+250700000000'         },
    { icon: Mail,    label: 'Email',    value: 'info@prostructure.rw',   href: 'mailto:info@prostructure.rw' },
    { icon: MapPin,  label: 'Location', value: 'Kigali, Rwanda',         href: null                         },
  ],
  social: [
    { icon: IconLinkedIn,  label: 'LinkedIn',    href: 'https://linkedin.com'  },
    { icon: IconInstagram, label: 'Instagram',   href: 'https://instagram.com' },
    { icon: IconFacebook,  label: 'Facebook',    href: 'https://facebook.com'  },
    { icon: IconX,         label: 'X / Twitter', href: 'https://x.com'         },
  ],
}

// ── WhatsApp link builder ────────────────────────────
function buildWhatsAppLink({ number, message }) {
  const encoded = encodeURIComponent(message)
  return `https://wa.me/${number.replace(/\D/g, '')}?text=${encoded}`
}

// ── Animation variants ───────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

const cardVariants = {
  hidden:  { opacity: 0, y: 48, scale: 0.97 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

// ── WhatsApp SVG icon (inline — no extra dependency) ─
function WhatsAppIcon({ size = 22 }) {
  return (
    <svg
      width={size} height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

// ── Component ────────────────────────────────────────
export default function ContactSection() {
  const sectionRef          = useRef(null)
  const [inViewRef, inView] = useInView(0.1)

  const { scrollYProgress } = useScroll({
    target:  sectionRef,
    offset:  ['start end', 'end start'],
  })
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['-15%', '15%'])

  const setRefs = (el) => {
    sectionRef.current = el
    inViewRef.current  = el
  }

  const waLink = buildWhatsAppLink(contactData.whatsapp)

  return (
    <section
      id="contact"
      ref={setRefs}
      className={styles.section}
      aria-labelledby="contact-heading"
    >
      {/* ── Parallax background ── */}
      <div className={styles.parallaxClip} aria-hidden="true">
        <motion.div className={styles.parallaxBg} style={{ y: backgroundY }} />
        <div className={styles.overlay} />
      </div>

      <div className={styles.inner}>

        {/* ── Glassmorphism card ── */}
        <motion.div
          className={styles.card}
          variants={cardVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* ── Corner brackets ── */}
          <span className={styles.cornerTL} aria-hidden="true" />
          <span className={styles.cornerBR} aria-hidden="true" />

          {/* ── Eyebrow ── */}
          <motion.span
            className={styles.eyebrow}
            variants={fadeUp}
            custom={0.1}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {contactData.eyebrow}
          </motion.span>

          {/* ── Headline ── */}
          <motion.h2
            id="contact-heading"
            className={styles.heading}
            variants={fadeUp}
            custom={0.2}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {contactData.headline}{' '}
            <span className={styles.accent}>{contactData.accentWord}</span>
          </motion.h2>

          {/* ── Subtext ── */}
          <motion.p
            className={styles.subtext}
            variants={fadeUp}
            custom={0.3}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {contactData.subtext}
          </motion.p>

          {/* ── CTA buttons ── */}
          <motion.div
            className={styles.ctaRow}
            variants={fadeUp}
            custom={0.4}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {/* Primary — WhatsApp */}
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnPrimary}
              aria-label="Chat with us on WhatsApp"
            >
              <WhatsAppIcon size={20} />
              <span>Chat on WhatsApp</span>
            </a>

            {/* Secondary */}
            <a
              href={contactData.secondaryCta.href}
              className={styles.btnSecondary}
            >
              <span>{contactData.secondaryCta.label}</span>
              <ArrowRight size={16} strokeWidth={2} />
            </a>
          </motion.div>

          {/* ── Divider ── */}
          <motion.div
            className={styles.divider}
            variants={fadeUp}
            custom={0.5}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            aria-hidden="true"
          />

          {/* ── Contact info row ── */}
          <motion.div
            className={styles.infoRow}
            variants={fadeUp}
            custom={0.55}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {contactData.info.map(({ icon: Icon, label, value, href }) => (
              <div key={label} className={styles.infoItem}>
                <div className={styles.infoIconWrap} aria-hidden="true">
                  <Icon size={16} strokeWidth={1.8} />
                </div>
                {href ? (
                  <a href={href} className={styles.infoLink} aria-label={`${label}: ${value}`}>
                    {value}
                  </a>
                ) : (
                  <span className={styles.infoText}>{value}</span>
                )}
              </div>
            ))}
          </motion.div>

          {/* ── Divider ── */}
          <motion.div
            className={styles.divider}
            variants={fadeUp}
            custom={0.6}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            aria-hidden="true"
          />

          {/* ── Social links ── */}
          <motion.div
            className={styles.socialRow}
            variants={fadeUp}
            custom={0.65}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <span className={styles.socialLabel}>Follow us</span>
            {contactData.social.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label={label}
              >
                <Icon size={18} strokeWidth={1.8} />
              </a>
            ))}
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}