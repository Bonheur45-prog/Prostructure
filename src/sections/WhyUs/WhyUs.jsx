// ============================================
// PROSTRUCTURE ENGINEERING LTD
// src/sections/WhyUs/WhyUs.jsx
// White section — 4 cards in one row
// Gold icon + bold title + description
// Convincing statement + CTA below cards
// ============================================

import { motion } from 'framer-motion'
import { Users, Award, BadgeCheck, Clock } from 'lucide-react'
import { useInView } from '@hooks/useInView'
import { reasons, whyUsContent } from '@data/whyUs'
import styles from './WhyUs.module.css'

// ── Icon map ──────────────────────────────────────────────────
const ICON_MAP = { Users, Award, BadgeCheck, Clock }

// ── Animation variants ────────────────────────────────────────

const headerVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const cardVariants = {
  hidden:  { opacity: 0, y: 36 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: i * 0.12,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
}

const bottomVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: reasons.length * 0.12 + 0.1,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

// ── Single reason card ────────────────────────────────────────
function ReasonCard({ reason, index, inView }) {
  const Icon = ICON_MAP[reason.icon]

  return (
    <motion.div
      className={styles.card}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      {/* Gold icon */}
      <div className={styles.iconWrap} aria-hidden="true">
        {Icon && <Icon size={28} strokeWidth={1.8} />}
      </div>

      {/* Title */}
      <h3 className={styles.cardTitle}>{reason.title}</h3>

      {/* Description */}
      <p className={styles.cardDesc}>{reason.description}</p>
    </motion.div>
  )
}

// ── Main WhyUs component ──────────────────────────────────────
export default function WhyUs() {
  const [headerRef, headerInView] = useInView(0.2)
  const [cardsRef,  cardsInView]  = useInView(0.1)
  const [bottomRef, bottomInView] = useInView(0.2)

  return (
    <section
      id="why-us"
      className={styles.section}
      aria-labelledby="why-us-heading"
    >
      <div className={styles.inner}>

        {/* ── Section header ─────────────────── */}
        <motion.div
          ref={headerRef}
          className={styles.header}
          variants={headerVariants}
          initial="hidden"
          animate={headerInView ? 'visible' : 'hidden'}
        >
          <span className="section-label">{whyUsContent.sectionLabel}</span>
          <h2
            className={`section-title ${styles.heading}`}
            id="why-us-heading"
          >
            {whyUsContent.headline}
          </h2>
        </motion.div>

        {/* ── 4-card row ─────────────────────── */}
        <div ref={cardsRef} className={styles.grid}>
          {reasons.map((reason, i) => (
            <ReasonCard
              key={reason.id}
              reason={reason}
              index={i}
              inView={cardsInView}
            />
          ))}
        </div>

        {/* ── Bottom: statement + CTA ─────────── */}
        <motion.div
          ref={bottomRef}
          className={styles.bottom}
          variants={bottomVariants}
          initial="hidden"
          animate={bottomInView ? 'visible' : 'hidden'}
        >
          <p className={styles.statement}>{whyUsContent.statement}</p>
          <a
            href={whyUsContent.cta.href}
            className={`btn btn-primary ${styles.cta}`}
          >
            {whyUsContent.cta.label}
          </a>
        </motion.div>

      </div>
    </section>
  )
}