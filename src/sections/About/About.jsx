// ============================================
// PROSTRUCTURE ENGINEERING LTD
// src/sections/About/About.jsx
// White section — text left, image right
// Scroll-triggered: text slides from left, image from right
// Background: scattered gold SVG service illustrations
// ============================================

import { motion } from 'framer-motion'
import { useInView } from '@hooks/useInView'
import about from '@data/about'
import styles from './About.module.css'

// ── Animation variants ────────────────────────────────────

const textVariants = {
  hidden:  { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
}

const imageVariants = {
  hidden:  { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.1 },
  },
}

const pillVariants = {
  hidden:  { opacity: 0, y: 16 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut', delay: 0.35 + i * 0.1 },
  }),
}

// ── Background SVG decorations ────────────────────────────
// Gold service-themed illustrations scattered across the section

function BackgroundDecorations() {
  return (
    <div className={styles.decorations} aria-hidden="true">

      {/* ── Electrical bolt — top left ── */}
      <svg className={`${styles.deco} ${styles.decoTopLeft}`} viewBox="0 0 64 64" fill="none">
        <polygon
          points="36,4 20,32 30,32 28,60 48,28 36,28"
          stroke="currentColor" strokeWidth="2"
          strokeLinejoin="round" fill="none"
        />
      </svg>

      {/* ── Electrical plug — top right ── */}
      <svg className={`${styles.deco} ${styles.decoTopRight}`} viewBox="0 0 64 64" fill="none">
        <rect x="20" y="28" width="24" height="18" rx="4" stroke="currentColor" strokeWidth="2"/>
        <line x1="32" y1="46" x2="32" y2="58" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="26" y1="22" x2="26" y2="28" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="38" y1="22" x2="38" y2="28" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="28" cy="36" r="2" fill="currentColor"/>
        <circle cx="36" cy="36" r="2" fill="currentColor"/>
      </svg>

      {/* ── Wrench / maintenance — middle left ── */}
      <svg className={`${styles.deco} ${styles.decoMidLeft}`} viewBox="0 0 64 64" fill="none">
        <path
          d="M44 8 C44 8 52 14 50 22 C48 30 40 30 40 30 L16 54 C14 56 11 56 9 54 C7 52 7 49 9 47 L33 23 C33 23 32 14 38 10 Z"
          stroke="currentColor" strokeWidth="2" strokeLinejoin="round"
        />
        <circle cx="13" cy="51" r="2" fill="currentColor"/>
      </svg>

      {/* ── Water drop / plumbing — bottom left ── */}
      <svg className={`${styles.deco} ${styles.decoBottomLeft}`} viewBox="0 0 64 64" fill="none">
        <path
          d="M32 8 C32 8 12 30 12 40 C12 51 21 58 32 58 C43 58 52 51 52 40 C52 30 32 8 32 8 Z"
          stroke="currentColor" strokeWidth="2" strokeLinejoin="round"
        />
        <path
          d="M22 42 C22 42 24 50 32 50"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round"
        />
      </svg>

      {/* ── Building / construction — bottom right ── */}
      <svg className={`${styles.deco} ${styles.decoBottomRight}`} viewBox="0 0 64 64" fill="none">
        <rect x="8"  y="28" width="12" height="28" stroke="currentColor" strokeWidth="2"/>
        <rect x="20" y="18" width="12" height="38" stroke="currentColor" strokeWidth="2"/>
        <rect x="32" y="24" width="12" height="32" stroke="currentColor" strokeWidth="2"/>
        <rect x="44" y="12" width="12" height="44" stroke="currentColor" strokeWidth="2"/>
        <line x1="6" y1="56" x2="58" y2="56" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <rect x="23" y="42" width="6" height="14" stroke="currentColor" strokeWidth="1.5"/>
      </svg>

      {/* ── Circuit / electrical lines — center right ── */}
      <svg className={`${styles.deco} ${styles.decoCenterRight}`} viewBox="0 0 80 80" fill="none">
        <line x1="10" y1="40" x2="30" y2="40" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="30" y1="40" x2="30" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="30" y1="20" x2="50" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="50" cy="20" r="4" stroke="currentColor" strokeWidth="2"/>
        <line x1="30" y1="40" x2="30" y2="60" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="30" y1="60" x2="50" y2="60" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="50" cy="60" r="4" stroke="currentColor" strokeWidth="2"/>
        <line x1="54" y1="60" x2="70" y2="60" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="54" y1="20" x2="70" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="70" y1="20" x2="70" y2="60" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>

      {/* ── Gear / maintenance — top center ── */}
      <svg className={`${styles.deco} ${styles.decoTopCenter}`} viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="8" stroke="currentColor" strokeWidth="2"/>
        <path
          d="M32 10 L34 18 L38 15 L40 22 L46 20 L46 26 L54 28 L50 32 L54 36 L46 38 L46 44 L40 42 L38 49 L34 46 L32 54 L30 46 L26 49 L24 42 L18 44 L18 38 L10 36 L14 32 L10 28 L18 26 L18 20 L24 22 L26 15 L30 18 Z"
          stroke="currentColor" strokeWidth="2" strokeLinejoin="round"
        />
      </svg>

      {/* ── Pipe / plumbing lines — mid right ── */}
      <svg className={`${styles.deco} ${styles.decoMidRight}`} viewBox="0 0 64 64" fill="none">
        <line x1="8"  y1="20" x2="40" y2="20" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
        <line x1="8"  y1="28" x2="40" y2="28" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
        <path d="M40 20 Q52 20 52 32" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round"/>
        <path d="M40 28 Q48 28 48 36" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round"/>
        <line x1="48" y1="36" x2="48" y2="56" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
        <line x1="52" y1="32" x2="52" y2="56" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      </svg>

    </div>
  )
}

// ── Image placeholder ─────────────────────────────────────
function AboutImage({ image, imageAlt }) {
  return (
    <div className={styles.imageWrapper}>
      {image ? (
        <img src={image} alt={imageAlt} className={styles.image} />
      ) : (
        <div className={styles.imagePlaceholder}>
          <svg viewBox="0 0 80 80" fill="none" className={styles.placeholderIcon} aria-hidden="true">
            <rect x="8"  y="36" width="8"  height="36" fill="currentColor" opacity="0.6"/>
            <rect x="20" y="26" width="8"  height="46" fill="currentColor" opacity="0.7"/>
            <rect x="32" y="16" width="8"  height="56" fill="currentColor" opacity="0.8"/>
            <rect x="44" y="22" width="8"  height="50" fill="currentColor" opacity="0.7"/>
            <path d="M56 8 L72 24 L72 72 L56 72 Z" fill="currentColor" opacity="0.6"/>
            <rect x="59" y="44" width="6" height="10" fill="white" opacity="0.3"/>
          </svg>
          <span className={styles.placeholderText}>Your Photo Here</span>
          <span className={styles.placeholderHint}>Replace image in src/assets/images/about.jpg</span>
        </div>
      )}
      {/* Gold corner accent */}
      <div className={styles.imageCornerTL} />
      <div className={styles.imageCornerBR} />
    </div>
  )
}

// ── Main About component ──────────────────────────────────
export default function About() {
  const [ref, inView] = useInView(0.2)

  return (
    <section id="about" className={styles.about} ref={ref}>

      {/* Background service illustrations */}
      <BackgroundDecorations />

      <div className={`container ${styles.inner}`}>

        {/* ── Text column ─────────────────────── */}
        <motion.div
          className={styles.textCol}
          variants={textVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Section label */}
          <span className="section-label">{about.sectionLabel}</span>

          {/* Headline */}
          <h2 className={`section-title ${styles.headline}`}>
            {about.headline}
          </h2>

          {/* Gold rule */}
          <div className={styles.rule} aria-hidden="true" />

          {/* Story paragraphs */}
          <div className={styles.story}>
            {about.story.map((para, i) => (
              <p key={i} className={styles.para}>{para}</p>
            ))}
          </div>

          {/* Highlight pills */}
          <div className={styles.pills}>
            {about.highlights.map((h, i) => (
              <motion.span
                key={h.id}
                className={styles.pill}
                custom={i}
                variants={pillVariants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
              >
                <span className={styles.pillDot} aria-hidden="true" />
                {h.label}
              </motion.span>
            ))}
          </div>

          {/* CTA */}
          <a href={about.cta.href} className={`btn btn-primary ${styles.cta}`}>
            {about.cta.label}
          </a>
        </motion.div>

        {/* ── Image column ────────────────────── */}
        <motion.div
          variants={imageVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <AboutImage image={about.image} imageAlt={about.imageAlt} />
        </motion.div>

      </div>
    </section>
  )
}