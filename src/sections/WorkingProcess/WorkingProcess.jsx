// ============================================
// PROSTRUCTURE ENGINEERING LTD
// src/sections/WorkingProcess/WorkingProcess.jsx
// SVG-based orbital layout — pixel-perfect ring alignment
// ============================================

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from '@hooks/useInView'
import { processContent, processSteps } from '@data/process'
import logo from '@assets/images/logo.png'
import styles from './WorkingProcess.module.css'

// ── SVG coordinate constants ─────────────────────────
// viewBox is 600×600. Centre = (300, 300).
const CX         = 300
const CY         = 300
const R_DASHED   = 320   // outer decorative dashed ring (increased to push it outward)
const R_STATIC   = 230   // solid ring — node centres sit EXACTLY here
const R_PULSE    = 100    // pulse halo radius
const R_HUB      = 60    // hub circle radius (visual diameter 120)
const NODE_R     = 28    // icon circle radius (visual diameter 56)
const TITLE_GAP  = 17    // gap between icon circle edge and title text

// ── Pre-compute node positions ───────────────────────
const total      = processSteps.length
const startAngle = -Math.PI / 2  // 12 o'clock

const nodeData = processSteps.map((step, index) => {
  const angle = startAngle + (index / total) * 2 * Math.PI
  const cx    = CX + R_STATIC * Math.cos(angle)
  const cy    = CY + R_STATIC * Math.sin(angle)
  return { ...step, cx, cy, angle }
})

// ── Animation variants ───────────────────────────────

const headerVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const nodeVariants = {
  hidden:  { opacity: 0, scale: 0.5 },
  visible: (i) => ({
    opacity: 1, scale: 1,
    transition: { duration: 0.5, delay: i * 0.09, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

const hubVariants = {
  hidden:  { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1, scale: 1,
    transition: { duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

// ── Component ────────────────────────────────────────

export default function WorkingProcess() {
  const sectionRef              = useRef(null)
  const [inViewRef, inView]     = useInView(0.08)

  const { scrollYProgress } = useScroll({
    target:  sectionRef,
    offset:  ['start end', 'end start'],
  })
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['-20%', '20%'])

  const setRefs = (el) => {
    sectionRef.current = el
    inViewRef.current  = el
  }

  return (
    <section
      id="working-process"
      ref={setRefs}
      className={styles.section}
      aria-labelledby="process-heading"
    >
      {/* ── Parallax background ── */}
      <div className={styles.parallaxClip} aria-hidden="true">
        <motion.div className={styles.parallaxBg} style={{ y: backgroundY }} />
        <div className={styles.overlay} />
      </div>

      <div className={styles.inner}>

        {/* ── Section header ── */}
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

        {/* ── SVG orbital diagram ── */}
        <div className={styles.orbitContainer}>
          {/*
            viewBox="0 0 600 600" + width="100%" = responsive scaling.
            Every element shares one coordinate space — rings, nodes, hub all
            reference the same (300,300) centre. No translate hacks needed.
          */}
          <svg
            className={styles.orbitSvg}
            viewBox="0 0 600 600"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {/* ── Ring: outer dashed rotating ── */}
            <circle
              cx={CX} cy={CY}
              r={R_DASHED}
              fill="none"
              stroke="rgba(201,168,76,0.25)"
              strokeWidth="4"
              strokeDasharray="8 6"
              className={styles.ringDashed}
            />

            {/* ── Ring: solid static — nodes sit on this ── */}
            <circle
              cx={CX} cy={CY}
              r={R_STATIC}
              fill="none"
              stroke="rgba(201,168,76,0.3)"
              strokeWidth="2.2"
            />

            {/* ── Ring: pulse halo around hub ── */}
            <circle
              cx={CX} cy={CY}
              r={R_PULSE}
              fill="none"
              stroke="rgba(201,168,76,0.7)"
              strokeWidth="2"
              className={styles.ringPulse}
            />

            {/* ── Hub circle ── */}
            <motion.g
              variants={hubVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              style={{ originX: `${CX}px`, originY: `${CY}px` }}
            >
              {/* Hub background fill */}
              <circle
                cx={CX} cy={CY}
                r={R_HUB}
                fill="url(#hubGradient)"
                stroke="rgba(201,168,76,0.9)"
                strokeWidth="2"
                filter="url(#hubGlow)"
              />
              {/* Hub logo — foreignObject lets us use the <img> tag inside SVG */}
              <foreignObject
                x={CX - 46} y={CY - 50}
                width="100" height="100"
                style={{ overflow: 'visible' }}
              >
                <img
                  src={logo}
                  alt=""
                  style={{
                    width: '90px',
                    height: 'auto',
                    display: 'block',
                    filter: 'brightness(0) invert(1)',
                  }}
                />
              </foreignObject>
              {/* Hub label */}
              <text
                x={CX} y={CY + 25}
                textAnchor="middle"
                className={styles.hubLabel}
              >
                <tspan x={CX} dy="0">OUR WORKING</tspan>
                <tspan x={CX} dy="12">PROCESS</tspan>
              </text>
            </motion.g>

            {/* ── 7 Orbiting nodes ── */}
            {nodeData.map((node, index) => {
              const Icon      = node.icon
              // Title sits directly below the icon circle
              const titleX    = node.cx
              const titleY    = node.cy + NODE_R + TITLE_GAP
              // Split multi-word titles for wrapping (max ~10 chars per line)
              const words     = node.title.split(' ')
              const line1     = words.slice(0, Math.ceil(words.length / 2)).join(' ')
              const line2     = words.length > 1
                                  ? words.slice(Math.ceil(words.length / 2)).join(' ')
                                  : null

              return (
                <motion.g
                  key={node.id}
                  custom={index}
                  variants={nodeVariants}
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                  // SVG motion.g scales from the node's own centre
                  style={{ originX: `${node.cx}px`, originY: `${node.cy}px` }}
                  className={styles.nodeGroup}
                >
                  {/* Icon circle background */}
                  <circle
                    cx={node.cx} cy={node.cy}
                    r={NODE_R}
                    fill="rgba(16, 16, 16, 0.86)"
                    stroke="rgba(201,168,76,0.5)"
                    strokeWidth="2"
                    className={styles.nodeCircle}
                  />

                  {/*
                    Lucide icon via foreignObject.
                    Positioned so its centre aligns with (node.cx, node.cy).
                    Width/height = NODE_R * 2 = 56px.
                  */}
                  <foreignObject
                    x={node.cx - NODE_R}
                    y={node.cy - NODE_R}
                    width={NODE_R * 2}
                    height={NODE_R * 2}
                    className={styles.nodeIconWrapper}
                    style={{ overflow: 'visible', pointerEvents: 'none' }}
                  >
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        pointerEvents: 'none',
                      }}
                    >
                      <Icon
                        style={{
                          width: '24px',
                          height: '24px',
                          stroke: 'rgba(201,168,76,1)',
                          strokeWidth: '1.8',
                          fill: 'none',
                          flexShrink: 0,
                        }}
                      />
                    </div>
                  </foreignObject>

                  {/* Node title — always below the icon circle */}
                  <text
                    x={titleX}
                    y={titleY}
                    textAnchor="middle"
                    className={styles.nodeTitle}
                  >
                    <tspan x={titleX} dy="0">{line1}</tspan>
                    {line2 && (
                      <tspan x={titleX} dy="13">{line2}</tspan>
                    )}
                  </text>
                </motion.g>
              )
            })}

            {/* ── SVG defs: gradients & filters ── */}
            <defs>
              <radialGradient id="hubGradient" cx="50%" cy="35%" r="65%">
                <stop offset="0%"   stopColor="#2a2a2a" />
                <stop offset="100%" stopColor="#0d0d0d" />
              </radialGradient>
              <filter id="hubGlow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
          </svg>
        </div>

      </div>
    </section>
  )
}