// ============================================
// PROSTRUCTURE ENGINEERING LTD
// src/hooks/useScrolled.js
// Returns true when page has scrolled past threshold
// Used by Navbar to switch transparent → solid
// ============================================

import { useState, useEffect } from 'react'

export function useScrolled(threshold = 60) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > threshold)

    // Set initial state immediately
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  return scrolled
}
