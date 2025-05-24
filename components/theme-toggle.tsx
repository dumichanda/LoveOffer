"use client"

import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useThemeStore } from "@/lib/theme-store"

export function ThemeToggle() {
  const { isDarkMode, toggleDarkMode } = useThemeStore()

  return (
    <Button variant="ghost" size="sm" onClick={toggleDarkMode} className="w-9 h-9 rounded-full">
      {isDarkMode ? (
        <Sun className="w-5 h-5 text-yellow-500" />
      ) : (
        <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
