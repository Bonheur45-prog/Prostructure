// ============================================
// PROSTRUCTURE ENGINEERING LTD
// src/components/ui/PageLoader/PageLoader.jsx
// Full-screen loading screen shown on initial app load
// ============================================

import styles from './PageLoader.module.css'

export default function PageLoader() {
  return (
    <div className={styles.wrapper} role="status" aria-label="Loading Prostructure Engineering">
      <div className={styles.content}>
        {/* Logo mark */}
        <div className={styles.logoMark} aria-hidden="true">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4"  y="34" width="5" height="14" fill="currentColor"/>
            <rect x="11" y="26" width="5" height="22" fill="currentColor"/>
            <rect x="18" y="18" width="5" height="30" fill="currentColor"/>
            <rect x="25" y="22" width="5" height="26" fill="currentColor"/>
            <path d="M32 10 L44 22 L44 48 L32 48 Z" fill="currentColor" opacity="0.85"/>
          </svg>
        </div>
        {/* Company name */}
        <span className={styles.name}>PROSTRUCTURE</span>
        {/* Gold loading bar */}
        <div className={styles.bar} aria-hidden="true" />
      </div>
    </div>
  )
}
