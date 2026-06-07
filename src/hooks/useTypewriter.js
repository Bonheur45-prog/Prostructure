// ============================================
// PROSTRUCTURE ENGINEERING LTD
// src/hooks/useTypewriter.js
// Types out text one character at a time
// Resets and restarts automatically when text changes
// ============================================

import { useState, useEffect } from 'react'

export function useTypewriter(text = '', speed = 45) {
  const [displayed, setDisplayed] = useState('')
  const [isDone,    setIsDone]    = useState(false)

  useEffect(() => {
    // Reset immediately when text changes
    setDisplayed('')
    setIsDone(false)

    if (!text) return

    let index    = 0
    const interval = setInterval(() => {
      index += 1
      setDisplayed(text.slice(0, index))

      if (index >= text.length) {
        clearInterval(interval)
        setIsDone(true)
      }
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed])

  return { displayed, isDone }
}
