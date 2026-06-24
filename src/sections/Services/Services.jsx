// ============================================
// PROSTRUCTURE ENGINEERING LTD
// src/sections/Services/Services.jsx
// Adapted from reference WhyChooseUs pattern
// Sticky media card LEFT, services list RIGHT
// ============================================

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from '@hooks/useInView'
import {
  services,
  servicesContent,
  servicesMedia,
  servicesBackground,
} from '@data/services'
import styles from './Services.module.css'

// ── Animation variants ────────────────────────────────────────

const headerVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const serviceVariants = {
  hidden:  { opacity: 0, y: 28 },
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

// ── Single service row with circle-draw animation ─────────────
function ServiceItem({ service, index, sectionInView }) {
  const [ref, inView] = useInView(0.4)
  const animated = sectionInView && inView

  return (
    <motion.div
      ref={ref}
      className={`${styles.reason} ${animated ? styles.animated : ''}`}
      custom={index}
      variants={serviceVariants}
      initial="hidden"
      animate={sectionInView ? 'visible' : 'hidden'}
    >
      <div className={styles.iconWrap} aria-hidden="true">
        <svg
          className={styles.iconCircle}
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle className={styles.circlePath} cx="16" cy="16" r="14" />
          <polyline className={styles.checkPath} points="10,16 14,20 22,12" />
        </svg>
      </div>

      <div className={styles.reasonText}>
        <h3 className={styles.reasonTitle}>{service.title}</h3>
        <p className={styles.reasonDesc}>{service.description}</p>
      </div>
    </motion.div>
  )
}

// ── Left sticky media card ────────────────────────────────────
function MediaCard({ media }) {
  const hasSource = !!media.src

  return (
    <div className={styles.mediaCol}>
      <div className={styles.mediaCard}>
        {!hasSource ? (
          <div className={styles.placeholder}>
            <svg
              className={styles.placeholderIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {media.type === 'video' ? (
                <>
                  <polygon points="23 7 16 12 23 17 23 7" />
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                </>
              ) : (
                <>
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </>
              )}
            </svg>
            <p className={styles.placeholderLabel}>
              {media.type === 'video'
                ? 'Set servicesMedia.src to your video path'
                : 'Set servicesMedia.src to your image path'}
            </p>
          </div>
        ) : media.type === 'video' ? (
          <video
            className={styles.mediaVideo}
            src={media.src}
            poster={media.poster || undefined}
            autoPlay
            muted
            loop
            playsInline
            aria-label="Prostructure Engineering services showcase"
          />
        ) : (
          <img
            className={styles.mediaAsset}
            src={media.src}
            alt={media.alt}
            loading="lazy"
            decoding="async"
          />
        )}
      </div>
    </div>
  )
}

// ── Main Services component ───────────────────────────────────
export default function Services() {
  const sectionRef = useRef(null)
  const [inViewRef, inView] = useInView(0.08)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['-25%', '25%'])

  const setRefs = (el) => {
    sectionRef.current = el
    inViewRef.current  = el
  }

  return (
    <section
      id="services"
      ref={setRefs}
      className={styles.section}
      aria-labelledby="services-heading"
    >
      {/* parallaxClip: overflow:hidden lives here (not on .section) so
          position:sticky on the media card isn't blocked by overflow:hidden */}
      <div className={styles.parallaxClip} aria-hidden="true">
        <motion.div
          className={styles.parallaxBg}
          style={{
            y: backgroundY,
            backgroundImage: servicesBackground.src
              ? `url(${servicesBackground.src})`
              : undefined,
          }}
        />
        {/* Gradient overlay — lighter left (behind card), darker right (behind list) */}
        <div className={styles.overlay} />
      </div>

      <div className={styles.inner}>

        {/* ── LEFT: sticky media card ── */}
        <MediaCard media={servicesMedia} />

        {/* ── RIGHT: services content ── */}
        <div className={styles.content}>

          <motion.div
            variants={headerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <span className={styles.eyebrow}>{servicesContent.sectionLabel}</span>
            <h2 className={styles.heading} id="services-heading">
              {servicesContent.headline}
            </h2>
            <p className={styles.subtext}>{servicesContent.subtext}</p>
          </motion.div>

          <div className={styles.reasons}>
            {services.map((service, i) => (
              <ServiceItem
                key={service.id}
                service={service}
                index={i}
                sectionInView={inView}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}