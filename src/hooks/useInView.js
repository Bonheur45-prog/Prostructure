// ============================================
// PROSTRUCTURE ENGINEERING LTD
// src/hooks/useInView.js
// Returns [ref, inView] — fires once when element enters viewport
// Accepts either a number (threshold) or an options object {threshold}
// ============================================

import { useRef, useState, useEffect } from 'react'

export function useInView(thresholdOrOptions = 0.3) {
  // Accept both useInView(0.4) and useInView({ threshold: 0.4 })
  const threshold =
    typeof thresholdOrOptions === 'number'
      ? thresholdOrOptions
      : thresholdOrOptions?.threshold ?? 0.3

  const ref    = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect() // fire once, then stop
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, inView]
}