// ============================================
// PROSTRUCTURE ENGINEERING LTD
// src/sections/Projects/Projects.jsx
// Cinematic parallax bg + 3-col card grid
// Hover reveals overlay — click opens detail page
// Load more: shows 6 first, reveals remaining
// ============================================

import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { MapPin, CheckCircle, Clock } from 'lucide-react'
import { useInView } from '@hooks/useInView'
import { projects, projectsContent } from '@data/projects'
import styles from './Projects.module.css'

const INITIAL_COUNT = 6

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
  hidden:  { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: (i % 3) * 0.12,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
}

// ── Project card ──────────────────────────────────────────────
function ProjectCard({ project, index, inView }) {
  const navigate = useNavigate()

  const handleDiscover = () => {
    navigate(`/projects/${project.slug}`)
  }

  return (
    <motion.article
      className={styles.card}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      onClick={handleDiscover}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleDiscover()}
      aria-label={`View project: ${project.name}`}
    >
      {/* ── Card image ─────────────────────── */}
      <div className={styles.cardImage}>
        {project.image ? (
          <img
            src={project.image}
            alt={project.name}
            className={styles.cardImg}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className={styles.cardPlaceholder}>
            <svg viewBox="0 0 64 64" fill="none" className={styles.cardPlaceholderIcon} aria-hidden="true">
              <rect x="8"  y="36" width="8" height="28" fill="currentColor" opacity="0.4"/>
              <rect x="20" y="26" width="8" height="38" fill="currentColor" opacity="0.5"/>
              <rect x="32" y="16" width="8" height="48" fill="currentColor" opacity="0.6"/>
              <rect x="44" y="22" width="8" height="42" fill="currentColor" opacity="0.5"/>
            </svg>
          </div>
        )}

        {/* Category badge */}
        <span className={styles.categoryBadge}>{project.category}</span>

        {/* Status badge */}
        <span className={`${styles.statusBadge} ${project.status === 'Ongoing' ? styles.statusOngoing : styles.statusCompleted}`}>
          {project.status === 'Ongoing'
            ? <Clock size={11} aria-hidden="true" />
            : <CheckCircle size={11} aria-hidden="true" />
          }
          {project.status}
        </span>

        {/* Hover overlay */}
        <div className={styles.cardOverlay}>
          <div className={styles.overlayContent}>
            <p className={styles.overlayDesc}>{project.description}</p>
            <div className={styles.overlayMeta}>
              <span className={styles.overlayLocation}>
                <MapPin size={13} aria-hidden="true" />
                {project.location}
              </span>
              <span className={styles.overlayYear}>{project.year}</span>
            </div>
            <button className={styles.discoverBtn} onClick={handleDiscover}>
              Discover More
              <svg width="9" height="9" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M2 5h6M5 2l3 3-3 3" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ── Card body ──────────────────────── */}
      <div className={styles.cardBody}>
        <h3 className={styles.cardName}>{project.name}</h3>
        <div className={styles.cardLocation}>
          <MapPin size={13} aria-hidden="true" />
          {project.location}
        </div>
      </div>
    </motion.article>
  )
}

// ── Main Projects component ───────────────────────────────────
export default function Projects() {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT)
  const sectionRef = useRef(null)
  const [headerRef, headerInView] = useInView(0.1)
  const [gridRef, gridInView]     = useInView(0.05)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['-20%', '20%'])

  const visibleProjects = projects.slice(0, visibleCount)
  const hasMore         = visibleCount < projects.length

  return (
    <section
      id="projects"
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="projects-heading"
    >
      {/* ── Cinematic parallax background ─── */}
      <div className={styles.parallaxClip} aria-hidden="true">
        <motion.div
          className={styles.parallaxBg}
          style={{
            y: backgroundY,
            backgroundImage: projectsContent.background
              ? `url(${projectsContent.background})`
              : undefined,
          }}
        />
        {/* Light gray overlay as specified */}
        <div className={styles.overlay} />
      </div>

      <div className={styles.inner}>

        {/* ── Section header ─────────────────── */}
        <motion.div
          ref={headerRef}
          className={styles.header}
          variants={headerVariants}
          initial="hidden"
          animate={headerInView ? 'visible' : 'hidden'}
        >
          <span className={styles.eyebrow}>{projectsContent.sectionLabel}</span>
          <h2 className={styles.heading} id="projects-heading">
            {projectsContent.headline}
          </h2>
          <p className={styles.subtext}>{projectsContent.subtext}</p>
        </motion.div>

        {/* ── 3-column project grid ─────────── */}
        <div ref={gridRef} className={styles.grid}>
          {visibleProjects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              inView={gridInView}
            />
          ))}
        </div>

        {/* ── Load more button ──────────────── */}
        {hasMore && (
          <motion.div
            className={styles.loadMoreWrap}
            initial={{ opacity: 0, y: 16 }}
            animate={gridInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <button
              className={styles.loadMoreBtn}
              onClick={() => setVisibleCount((prev) => prev + 3)}
              aria-label="Load more projects"
            >
              Load More Projects
              <span className={styles.loadMoreArrow} aria-hidden="true">
                <svg width="9" height="9" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 2v6M2 5l3 3 3-3" />
                </svg>
              </span>
            </button>
          </motion.div>
        )}

      </div>
    </section>
  )
}