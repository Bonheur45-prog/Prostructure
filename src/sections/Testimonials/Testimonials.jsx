// ============================================
// PROSTRUCTURE ENGINEERING LTD
// src/sections/Testimonials/Testimonials.jsx
// White section — two-column card with fade transition
// Gold L-corner accents, prev/next arrows, vertical dots
// ============================================

import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useInView } from '@hooks/useInView'
import { testimonials, testimonialsContent } from '@data/testimonials'
import styles from './Testimonials.module.css'

const AUTOPLAY_DELAY = 6000

// ── Animation variants ────────────────────────────────────────
const headerVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const fadeVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.55, ease: 'easeInOut' } },
  exit:    { opacity: 0, transition: { duration: 0.35, ease: 'easeInOut' } },
}

// ── Quote icon SVG ────────────────────────────────────────────
function QuoteIcon() {
  return (
    <svg
      className={styles.quoteIcon}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 30c0-6.627 5.373-12 12-12V12C13.163 12 6 19.163 6 28v8h12v-6zm18 0c0-6.627 5.373-12 12-12V12c-10.837 0-18 7.163-18 16v8h12v-6z"
        fill="currentColor"
        opacity="0.15"
      />
    </svg>
  )
}

// ── Avatar — initials or photo ────────────────────────────────
function Avatar({ testimonial }) {
  return (
    <div className={styles.avatarCol}>
      <div
        className={styles.avatarBox}
        style={{ backgroundColor: testimonial.avatarColor }}
        aria-label={`${testimonial.name} avatar`}
      >
        {testimonial.image ? (
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className={styles.avatarImg}
          />
        ) : (
          <span className={styles.avatarInitials}>
            {testimonial.initials}
          </span>
        )}
      </div>
    </div>
  )
}

// ── Main Testimonials component ───────────────────────────────
export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [ref, inView]         = useInView(0.2)

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)
  }, [])

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % testimonials.length)
  }, [])

  // Auto-play
  useEffect(() => {
    if (!inView) return
    const timer = setInterval(next, AUTOPLAY_DELAY)
    return () => clearInterval(timer)
  }, [inView, next])

  const t = testimonials[current]

  return (
    <section
      id="testimonials"
      className={styles.section}
      aria-labelledby="testimonials-heading"
      ref={ref}
    >
      <div className={styles.inner}>

        {/* ── Section header ─────────────────── */}
        <motion.div
          className={styles.header}
          variants={headerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <span className={styles.pill}>{testimonialsContent.sectionLabel}</span>
          <h2
            className={`section-title ${styles.heading}`}
            id="testimonials-heading"
          >
            {testimonialsContent.headline}
          </h2>
          <p className={styles.subtext}>{testimonialsContent.subtext}</p>
        </motion.div>

        {/* ── Card wrapper with L-corner accents ── */}
        <motion.div
          className={styles.cardWrap}
          variants={headerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Gold L-corner — top left */}
          <div className={styles.cornerTL} aria-hidden="true">
            <div className={styles.cornerH} />
            <div className={styles.cornerV} />
          </div>

          {/* Gold L-corner — bottom right */}
          <div className={styles.cornerBR} aria-hidden="true">
            <div className={styles.cornerH} />
            <div className={styles.cornerV} />
          </div>

          {/* ── Slide card ───────────────────── */}
          <div className={styles.card}>
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                className={styles.cardInner}
                variants={fadeVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {/* LEFT: quote + author */}
                <div className={styles.quoteCol}>
                  <QuoteIcon />

                  <blockquote className={styles.quote}>
                    "{t.quote}"
                  </blockquote>

                  {/* Author */}
                  <div className={styles.author}>
                    <div
                      className={styles.authorAccent}
                      aria-hidden="true"
                    />
                    <div className={styles.authorText}>
                      <span className={styles.authorName}>{t.name}</span>
                      <span className={styles.authorRole}>{t.role}</span>
                    </div>
                  </div>

                  {/* Prev / Next buttons */}
                  <div className={styles.controls} role="group" aria-label="Testimonial navigation">
                    <button
                      className={styles.controlBtn}
                      onClick={prev}
                      aria-label="Previous testimonial"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M10 3L5 8l5 5" />
                      </svg>
                    </button>
                    <button
                      className={styles.controlBtn}
                      onClick={next}
                      aria-label="Next testimonial"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M6 3l5 5-5 5" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* RIGHT: avatar */}
                <Avatar testimonial={t} />

              </motion.div>
            </AnimatePresence>
          </div>

          {/* Vertical dots — right side */}
          <div
            className={styles.dots}
            role="tablist"
            aria-label="Testimonial indicators"
          >
            {testimonials.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === current}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
                onClick={() => setCurrent(i)}
              />
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  )
}