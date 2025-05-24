"use client"

import type React from "react"

import { useEffect } from "react"
import { useThemeStore } from "@/lib/theme-store"

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { isDarkMode } = useThemeStore()

  useEffect(() => {
    const root = window.document.documentElement
    if (isDarkMode) {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
  }, [isDarkMode])

  return <>{children}</>
}
