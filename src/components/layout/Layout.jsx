// ============================================
// PROSTRUCTURE ENGINEERING LTD
// src/components/layout/Layout.jsx
// Main layout wrapper — Navbar + main content + Footer
// ============================================

import Navbar from '@components/layout/Navbar/Navbar'
import styles from './Layout.module.css'

// Footer will be imported once built:
// import Footer from '@components/layout/Footer/Footer'

export default function Layout({ children }) {
  return (
    <div className={styles.layout}>
      <Navbar />
      <main className={styles.main}>
        {children}
      </main>
      {/* <Footer /> */}
    </div>
  )
}
