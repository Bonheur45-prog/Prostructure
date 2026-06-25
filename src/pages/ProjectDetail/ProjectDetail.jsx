// ============================================
// PROSTRUCTURE ENGINEERING LTD
// src/pages/ProjectDetail/ProjectDetail.jsx
// Individual project detail page
// Back arrow + photo gallery grid + overview + services + specs
// ============================================

import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
// navigate('/#projects') ignores the hash in React Router.
// We use window.location.href instead for correct hash scroll.
import { motion } from 'framer-motion'
import { ArrowLeft, MapPin, Calendar, User, Clock } from 'lucide-react'
import { projects } from '@data/projects'
import styles from './ProjectDetail.module.css'

// ── Animation variants ────────────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

// ── Gallery image ─────────────────────────────────────────────
function GalleryImage({ src, alt, className }) {
  return (
    <div className={`${styles.galleryItem} ${className || ''}`}>
      {src ? (
        <img src={src} alt={alt} className={styles.galleryImg} loading="lazy" decoding="async" />
      ) : (
        <div className={styles.galleryPlaceholder}>
          <svg viewBox="0 0 64 64" fill="none" className={styles.galleryPlaceholderIcon} aria-hidden="true">
            <rect x="3"  y="3"  width="58" height="58" rx="4" stroke="currentColor" strokeWidth="2"/>
            <circle cx="20" cy="20" r="6" stroke="currentColor" strokeWidth="2"/>
            <path d="M3 42 L18 27 L30 39 L42 28 L61 42" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
          </svg>
        </div>
      )}
    </div>
  )
}

// ── Main ProjectDetail component ──────────────────────────────
export default function ProjectDetail() {
  const { slug }   = useParams()
  const project    = projects.find((p) => p.slug === slug)

  const goBack = () => { window.location.href = '/#projects' }

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  // 404 — project not found
  if (!project) {
    return (
      <div className={styles.notFound}>
        <h1>Project Not Found</h1>
        <button onClick={() => { window.location.href = '/#projects' }} className={styles.backBtn}>
          <ArrowLeft size={18} aria-hidden="true" />
          Back to Projects
        </button>
      </div>
    )
  }

  return (
    <div className={styles.page}>

      {/* ── Back navigation ────────────────── */}
      <div className={styles.backBar}>
        <div className={styles.backInner}>
          <button
            className={styles.backBtn}
            onClick={goBack}
            aria-label="Back to projects"
          >
            <ArrowLeft size={18} aria-hidden="true" />
            Back to Projects
          </button>
        </div>
      </div>

      {/* ── Hero header ────────────────────── */}
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <motion.span
            className={styles.heroCategory}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            {project.category}
          </motion.span>
          <motion.h1
            className={styles.heroTitle}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            {project.name}
          </motion.h1>
          <motion.div
            className={styles.heroMeta}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            <span className={styles.metaItem}>
              <MapPin size={15} aria-hidden="true" />
              {project.location}
            </span>
            <span className={styles.metaItem}>
              <Calendar size={15} aria-hidden="true" />
              {project.year}
            </span>
            <span className={styles.metaItem}>
              <User size={15} aria-hidden="true" />
              {project.client}
            </span>
            <span className={styles.metaItem}>
              <Clock size={15} aria-hidden="true" />
              {project.duration}
            </span>
            <span className={`${styles.statusPill} ${project.status === 'Ongoing' ? styles.statusOngoing : styles.statusCompleted}`}>
              {project.status}
            </span>
          </motion.div>
        </div>
      </div>

      {/* ── Page body ──────────────────────── */}
      <div className={styles.body}>
        <div className={styles.bodyInner}>

          {/* ── Photo gallery grid ─────────── */}
          <motion.section
            className={styles.gallerySection}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            aria-label="Project photo gallery"
          >
            <div className={styles.galleryGrid}>
              {/* Large featured image */}
              <GalleryImage
                src={project.image}
                alt={`${project.name} — main view`}
                className={styles.galleryFeatured}
              />
              {/* Remaining gallery images with varied sizes */}
              {project.gallery.map((src, i) => (
                <GalleryImage
                  key={i}
                  src={src}
                  alt={`${project.name} — view ${i + 2}`}
                  className={i === 0 ? styles.galleryTall : ''}
                />
              ))}
            </div>
          </motion.section>

          {/* ── Two-column: overview + sidebar ── */}
          <div className={styles.contentGrid}>

            {/* Left: overview + services */}
            <div className={styles.mainContent}>

              {/* Project overview */}
              <motion.section
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={4}
              >
                <h2 className={styles.sectionHeading}>Project Overview</h2>
                <div className={styles.rule} aria-hidden="true" />
                <p className={styles.overviewText}>{project.overview}</p>
              </motion.section>

              {/* Services delivered */}
              <motion.section
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={5}
              >
                <h2 className={styles.sectionHeading}>Services Delivered</h2>
                <div className={styles.rule} aria-hidden="true" />
                <ul className={styles.servicesList}>
                  {project.services.map((service, i) => (
                    <li key={i} className={styles.serviceItem}>
                      <span className={styles.serviceDot} aria-hidden="true" />
                      {service}
                    </li>
                  ))}
                </ul>
              </motion.section>

            </div>

            {/* Right: project specs sidebar */}
            <motion.aside
              className={styles.sidebar}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={5}
              aria-label="Project specifications"
            >
              <h2 className={styles.sidebarHeading}>Project Specifications</h2>
              <div className={styles.specsList}>
                {project.specs.map((spec, i) => (
                  <div key={i} className={styles.specItem}>
                    <span className={styles.specLabel}>{spec.label}</span>
                    <span className={styles.specValue}>{spec.value}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className={styles.sidebarCta}>
                <p className={styles.sidebarCtaText}>
                  Interested in a similar project?
                </p>
                <a href="/#contact" className={styles.sidebarCtaBtn}>
                  Get in Touch
                </a>
              </div>
            </motion.aside>

          </div>
        </div>
      </div>

    </div>
  )
}