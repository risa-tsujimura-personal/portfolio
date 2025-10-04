"use client"

import { useEffect, useState } from "react"

export function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const updateScrollPosition = () => {
      const currentScrollY = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = Math.min(currentScrollY / maxScroll, 1)

      setScrollY(currentScrollY)
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", updateScrollPosition, { passive: true })
    updateScrollPosition()

    return () => window.removeEventListener("scroll", updateScrollPosition)
  }, [])

  return { scrollY, scrollProgress }
}
