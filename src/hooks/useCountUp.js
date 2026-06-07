// ============================================
// PROSTRUCTURE ENGINEERING LTD
// src/hooks/useCountUp.js
// Animates a number from 0 → target
// Only starts when start=true (controlled by useInView)
// ============================================

import { useState, useEffect } from 'react'

export function useCountUp(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start || !target) return

    let startTime      = null
    let animationFrame = null

    // easeOutQuart — slow satisfying deceleration
    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4)

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp

      const elapsed  = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased    = easeOutQuart(progress)

      setCount(Math.round(eased * target))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      } else {
        setCount(target) // guarantee exact final value
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [start, target, duration])

  return count
}
