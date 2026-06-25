// ============================================
// PROSTRUCTURE ENGINEERING LTD
// src/components/layout/Navbar/Navbar.jsx
// Sticky navbar — transparent over hero, solid black + gold border on scroll
// Delegates mobile menu to MobileDrawer component
// Logo: place your file at src/assets/images/logo.png
// ============================================

import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { useScrolled } from '@hooks/useScrolled'
import navLinks from '@data/navLinks'
import logo from '@assets/images/logo.png'
import MobileDrawer from '@components/layout/MobileDrawer/MobileDrawer'
import styles from './Navbar.module.css'

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('#home')
  const scrolled = useScrolled(60)
  const location = useLocation()
  const isHome = location.pathname === '/'

  // ── Active section via IntersectionObserver ──
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.replace('#', ''))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveLink(`#${entry.target.id}`)
          }
        })
      },
      { threshold: 0.4 }
    )

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const handleNavClick = (href) => setActiveLink(href)

  return (
    <>
      <nav
        className={`${styles.navbar} ${isHome && !scrolled ? styles.clear : styles.solid}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className={styles.inner}>

          {/* ── Logo ────────────────────────── */}
          <a
            href="#home"
            className={styles.logo}
            aria-label="Prostructure Engineering Ltd — return to home"
            onClick={() => handleNavClick('#home')}
          >
            <img
              src={logo}
              alt="Prostructure Engineering Ltd"
              className={styles.logoImg}
            />
          </a>

          {/* ── Desktop nav links ────────────── */}
          <ul className={styles.navLinks} role="list">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  className={`${styles.navLink} ${activeLink === link.href ? styles.navLinkActive : ''}`}
                  onClick={() => handleNavClick(link.href)}
                >
                  {link.label}
                  <span className={styles.navLinkUnderline} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>

          {/* ── Desktop CTA ─────────────────── */}
          <a
            href="#contact"
            className={styles.cta}
            onClick={() => handleNavClick('#contact')}
          >
            Get Started
          </a>

          {/* ── Hamburger (mobile only) ──────── */}
          <button
            className={styles.hamburger}
            onClick={() => setDrawerOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={drawerOpen}
            aria-controls="mobile-drawer"
          >
            <span className={styles.bar} />
            <span className={styles.bar} />
            <span className={styles.bar} />
          </button>

        </div>
      </nav>

      {/* ── Mobile Drawer ───────────────────── */}
      <AnimatePresence>
        {drawerOpen && (
          <MobileDrawer
            onClose={() => setDrawerOpen(false)}
            activeLink={activeLink}
            onNavClick={handleNavClick}
          />
        )}
      </AnimatePresence>
    </>
  )
}
