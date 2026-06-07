// ============================================
// PROSTRUCTURE ENGINEERING LTD
// src/sections/Hero/Hero.jsx
// Full-viewport hero — image slideshow, Ken Burns zoom,
// per-slide headline/subheadline, floating stats pill
// ============================================

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CalendarCheck, Building2, Users, HardHat } from 'lucide-react'
import { useInView } from '@hooks/useInView'
import { useCountUp } from '@hooks/useCountUp'
import { heroSlides, heroCtas, SLIDE_DURATION } from '@data/hero'
import stats from '@data/stats'
import styles from './Hero.module.css'

// ── Icon map — resolves icon name string → component ──
const ICON_MAP = { CalendarCheck, Building2, Users, HardHat }

// ── Animation variants ────────────────────────────────

// Background slide crossfade
const bgVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 1.2, ease: 'easeInOut' } },
  exit:    { opacity: 0, transition: { duration: 1.2, ease: 'easeInOut' } },
}

// Headline + subheadline — slide in from left
const textVariants = {
  initial: { opacity: 0, x: -60 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    x: 40,
    transition: { duration: 0.3, ease: 'easeIn' },
  },
}

// Subheadline — slight delay after headline
const subVariants = {
  initial: { opacity: 0, x: -60 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 },
  },
  exit: {
    opacity: 0,
    x: 40,
    transition: { duration: 0.25, ease: 'easeIn' },
  },
}

// CTA buttons — fade up
const btnContainerVariants = {
  initial: {},
  animate: { transition: { staggerChildren: 0.1, delayChildren: 0.25 } },
  exit:    {},
}

const btnVariants = {
  initial: { opacity: 0, y: 24 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
}

// Accent label (e.g. "Construction") — fades in
const accentVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5, delay: 0.05 } },
  exit:    { opacity: 0, transition: { duration: 0.2 } },
}

// ── Stat item — uses useCountUp internally ─────────────
function StatItem({ stat }) {
  const [ref, inView] = useInView(0.3)
  const count = useCountUp(stat.value, 2000, inView)
  const Icon  = ICON_MAP[stat.icon]

  return (
    <div className={styles.statItem} ref={ref}>
      {Icon && <Icon className={styles.statIcon} size={20} strokeWidth={1.8} aria-hidden="true" />}
      <div className={styles.statText}>
        <span className={styles.statValue}>
          {count}{stat.suffix}
        </span>
        <span className={styles.statLabel}>{stat.label}</span>
      </div>
    </div>
  )
}

// ── Main Hero component ────────────────────────────────
export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const isAdvancingRef = useRef(false)
  const timerRef       = useRef(null)

  const currentSlide = heroSlides[currentIndex]

  // Advance to next slide — guarded against double-firing
  const advance = useCallback((toIndex = null) => {
    if (isAdvancingRef.current) return
    isAdvancingRef.current = true

    setCurrentIndex((prev) => {
      return toIndex !== null
        ? toIndex
        : (prev + 1) % heroSlides.length
    })

    // Unlock after crossfade completes
    setTimeout(() => { isAdvancingRef.current = false }, 1400)
  }, [])

  // Auto-advance timer
  useEffect(() => {
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => advance(), SLIDE_DURATION)
    return () => clearTimeout(timerRef.current)
  }, [currentIndex, advance])

  // Cleanup on unmount
  useEffect(() => () => clearTimeout(timerRef.current), [])

  const goToSlide = useCallback((index) => {
    if (index === currentIndex) return
    clearTimeout(timerRef.current)
    advance(index)
  }, [currentIndex, advance])

  return (
    <section
      id="home"
      className={styles.hero}
      aria-label="Prostructure Engineering hero"
    >

      {/* ── Slide backgrounds ─────────────────── */}
      <div className={styles.slidesContainer} aria-hidden="true">
        <AnimatePresence>
          <motion.div
            key={currentIndex}
            className={styles.slide}
            variants={bgVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {/* Image or placeholder gradient */}
            {currentSlide.image ? (
              <div
                className={styles.slideImage}
                style={{ backgroundImage: `url(${currentSlide.image})` }}
                role="img"
                aria-label={currentSlide.alt}
              />
            ) : (
              <div className={styles.slidePlaceholder} />
            )}

            {/* Dark gradient overlay */}
            <div className={styles.overlay} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Hero content ──────────────────────── */}
      <div className={styles.contentWrapper}>
        <div className={styles.container}>

          <AnimatePresence mode="wait">
            <div key={currentIndex} className={styles.textContent}>

              {/* Accent label */}
              <motion.span
                className={styles.accent}
                variants={accentVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                {currentSlide.accent}
              </motion.span>

              {/* Headline */}
              <motion.h1
                className={styles.headline}
                variants={textVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                {currentSlide.headline}
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                className={styles.subheadline}
                variants={subVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                {currentSlide.subheadline}
              </motion.p>

              {/* CTA buttons */}
              <motion.div
                className={styles.buttons}
                variants={btnContainerVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                {heroCtas.map((cta) => (
                  <motion.a
                    key={cta.id}
                    href={cta.href}
                    className={
                      cta.variant === 'primary'
                        ? styles.btnPrimary
                        : styles.btnOutline
                    }
                    variants={btnVariants}
                  >
                    {cta.label}
                  </motion.a>
                ))}
              </motion.div>

            </div>
          </AnimatePresence>

        </div>
      </div>

      {/* ── Dot indicators — bottom right ─────── */}
      <div
        className={styles.dots}
        role="tablist"
        aria-label="Slide navigation"
      >
        {heroSlides.map((slide, i) => (
          <button
            key={slide.id}
            role="tab"
            aria-selected={i === currentIndex}
            aria-label={`Go to slide ${i + 1}: ${slide.accent}`}
            className={`${styles.dot} ${i === currentIndex ? styles.dotActive : ''}`}
            onClick={() => goToSlide(i)}
          />
        ))}
      </div>

      {/* ── Floating stats pill — bottom center ── */}
      <div className={styles.statsPill} aria-label="Company statistics">
        {stats.map((stat, i) => (
          <div key={stat.id} className={styles.statWrapper}>
            <StatItem stat={stat} />
            {i < stats.length - 1 && (
              <div className={styles.statDivider} aria-hidden="true" />
            )}
          </div>
        ))}
      </div>

    </section>
  )
}