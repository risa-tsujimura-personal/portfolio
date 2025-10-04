"use client"

import { useEffect, useState } from "react"

type ThemeColor = "red" | "green" | "blue"

export function useAccentTheme() {
  const [theme, setTheme] = useState<ThemeColor>("blue")

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem("accent-theme") as ThemeColor
    if (savedTheme && ["red", "green", "blue"].includes(savedTheme)) {
      setTheme(savedTheme)
      document.documentElement.className = `theme-${savedTheme}`
    } else {
      document.documentElement.className = "theme-blue"
    }
  }, [])

  const changeTheme = (newTheme: ThemeColor) => {
    setTheme(newTheme)
    localStorage.setItem("accent-theme", newTheme)
    document.documentElement.className = `theme-${newTheme}`
  }

  return { theme, changeTheme }
}
