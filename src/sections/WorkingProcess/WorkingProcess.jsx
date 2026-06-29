// ============================================
// PROSTRUCTURE ENGINEERING LTD
// src/sections/WorkingProcess/WorkingProcess.jsx
// Radial / Orbital layout – 7 steps with icons
// ============================================

import { useRef, useMemo } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from '@hooks/useInView'
import { processContent, processSteps } from '@data/process'
import logo from '@assets/images/logo.png' // ← your small logo
import styles from './WorkingProcess.module.css'

// ── Animation Variants ──────────────────────────────

const headerVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const nodeVariants = {
  hidden:  { opacity: 0, scale: 0.6 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: i * 0.09,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
}

const hubVariants = {
  hidden:  { scale: 0.5, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

// ── Main Component ──────────────────────────────────

export default function WorkingProcess() {
  const sectionRef = useRef(null)
  const [inViewRef, inView] = useInView(0.08)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['-20%', '20%'])

  const setRefs = (el) => {
    sectionRef.current = el
    inViewRef.current = el
  }

  // ── Calculate orbital positions ──────────────────
  // 7 nodes evenly spaced around a circle (radius = 220px)
  const nodes = useMemo(() => {
    const total = processSteps.length
    const radius = 220 // distance from center to node center
    const startAngle = -Math.PI / 2 // start at 12 o'clock

    return processSteps.map((step, index) => {
      const angle = startAngle + (index / total) * 2 * Math.PI
      const x = radius * Math.cos(angle)
      const y = radius * Math.sin(angle)

      return {
        ...step,
        style: {
          left: `calc(50% + ${x}px)`,
          top: `calc(50% + ${y}px)`,
          // X: centre the node div horizontally on the ring point.
          // Y: shift up by exactly half the nodeCircle height (56px / 2 = 28px)
          //    so the nodeCircle's centre — not the whole div's centre — sits on the ring.
          //    This is correct regardless of title height below the circle.
          transform: 'translate(-50%, -28px)',
        },
      }
    })
  }, [])

  return (
    <section
      id="working-process"
      ref={setRefs}
      className={styles.section}
      aria-labelledby="process-heading"
    >
      {/* Parallax background */}
      <div className={styles.parallaxClip} aria-hidden="true">
        <motion.div
          className={styles.parallaxBg}
          style={{ y: backgroundY }}
        />
        <div className={styles.overlay} />
      </div>

      <div className={styles.inner}>
        {/* ── Header ── */}
        <motion.div
          className={styles.header}
          variants={headerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <span className={styles.eyebrow}>{processContent.sectionLabel}</span>
          <h2 className={styles.heading} id="process-heading">
            {processContent.headline}
          </h2>
          <p className={styles.subtext}>{processContent.subtext}</p>
        </motion.div>

        {/* ── Orbital ── */}
        <div className={styles.orbitContainer}>
          <div className={styles.orbitWrapper}>

            {/* Ring 3 – Outer dashed (rotating) */}
            <div className={styles.ringDashed} />

            {/* Ring 2 – Middle solid (static, holds nodes) */}
            <div className={styles.ringStatic} />

            {/* Ring 1 – Inner pulsing heartbeat */}
            <div className={styles.ringPulse} />

            {/* ── Central Hub ── */}
            <motion.div
              className={styles.hub}
              variants={hubVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              <img src={logo} alt="Prostructure Engineering" className={styles.hubLogo} />
              <span className={styles.hubLabel}>OUR WORKING PROCESS</span>
            </motion.div>

            {/* ── 7 Orbiting Nodes ── */}
            {nodes.map((node, index) => {
              const Icon = node.icon
              return (
                <motion.div
                  key={node.id}
                  className={styles.node}
                  style={node.style}
                  custom={index}
                  variants={nodeVariants}
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                >
                  <div className={styles.nodeCircle}>
                    <Icon className={styles.nodeIcon} />
                  </div>
                  <span className={styles.nodeTitle}>{node.title}</span>
                </motion.div>
              )
            })}

          </div>
        </div>
      </div>
    </section>
  )
}