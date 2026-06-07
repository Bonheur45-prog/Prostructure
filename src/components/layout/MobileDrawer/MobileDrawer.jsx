// ============================================
// PROSTRUCTURE ENGINEERING LTD
// src/components/layout/MobileDrawer/MobileDrawer.jsx
// Slide-in drawer from right + dark backdrop
// Separate from Navbar for clean separation of concerns
// ============================================

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import navLinks from '@data/navLinks'
import logo from '@assets/images/logo.png'
import styles from './MobileDrawer.module.css'

// ── Animation variants ────────────────────
const backdropVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit:    { opacity: 0, transition: { duration: 0.25 } },
}

const drawerVariants = {
  hidden:  { x: '100%' },
  visible: {
    x: 0,
    transition: { type: 'tween', ease: [0.16, 1, 0.3, 1], duration: 0.42 },
  },
  exit: {
    x: '100%',
    transition: { type: 'tween', ease: [0.4, 0, 1, 1], duration: 0.3 },
  },
}

const linkListVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.18 } },
}

const linkItemVariants = {
  hidden:  { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'tween', ease: [0.16, 1, 0.3, 1], duration: 0.4 },
  },
}

export default function MobileDrawer({ onClose, activeLink, onNavClick }) {
  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // Close on Escape key
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const handleLinkClick = (href) => {
    onNavClick(href)
    onClose()
  }

  return (
    <>
      {/* ── Backdrop ────────────────────────── */}
      <motion.div
        className={styles.backdrop}
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* ── Drawer panel ────────────────────── */}
      <motion.aside
        className={styles.drawer}
        variants={drawerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >

        {/* Header: logo + close button */}
        <div className={styles.header}>
          <a href="#home" className={styles.drawerLogo} onClick={() => handleLinkClick('#home')}>
            <img src={logo} alt="Prostructure Engineering Ltd" className={styles.drawerLogoImg} />
          </a>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close navigation menu"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Gold divider */}
        <div className={styles.divider} />

        {/* Nav links */}
        <motion.nav
          variants={linkListVariants}
          initial="hidden"
          animate="visible"
        >
          <ul className={styles.linkList} role="list">
            {navLinks.map((link, i) => (
              <motion.li key={link.id} variants={linkItemVariants}>
                <a
                  href={link.href}
                  className={`${styles.link} ${activeLink === link.href ? styles.linkActive : ''}`}
                  onClick={() => handleLinkClick(link.href)}
                >
                  <span className={styles.linkNumber}>0{i + 1}</span>
                  {link.label}
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.nav>

        {/* Footer: CTA + contact info */}
        <motion.div
          className={styles.drawerFooter}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.4 } }}
        >
          <a
            href="#contact"
            className={styles.cta}
            onClick={() => handleLinkClick('#contact')}
          >
            Get a Quote
          </a>
        </motion.div>

        {/* Decorative left gold bar */}
        <div className={styles.accent} aria-hidden="true" />

      </motion.aside>
    </>
  )
}
