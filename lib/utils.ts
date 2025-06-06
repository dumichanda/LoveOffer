import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Essential utility function for combining Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Date formatting utilities - using native Date methods to avoid external dependencies
export function formatDateTime(date: string | number | Date): string {
  try {
    const d = new Date(date)
    if (isNaN(d.getTime())) return "Invalid Date"

    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  } catch (error) {
    console.error("Error formatting dateTime:", error)
    return "Invalid Date"
  }
}

export function formatDate(date: string | number | Date): string {
  try {
    const d = new Date(date)
    if (isNaN(d.getTime())) return "Invalid Date"

    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  } catch (error) {
    console.error("Error formatting date:", error)
    return "Invalid Date"
  }
}

export function formatTime(date: string | number | Date): string {
  try {
    const d = new Date(date)
    if (isNaN(d.getTime())) return "Invalid Time"

    return d.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  } catch (error) {
    console.error("Error formatting time:", error)
    return "Invalid Time"
  }
}

export function getTimeAgo(date: string | number | Date): string {
  try {
    const d = new Date(date)
    if (isNaN(d.getTime())) return "Invalid Date"

    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000)

    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
    return `${Math.floor(diffInSeconds / 86400)} days ago`
  } catch (error) {
    console.error("Error getting time ago:", error)
    return "Invalid Date"
  }
}

export function generateId(prefix = "id"): string {
  return `${prefix}_${Math.random().toString(36).substr(2, 9)}_${Date.now()}`
}

// Additional utility functions that might be needed
export function capitalizeFirstLetter(string: string): string {
  if (!string) return ""
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + "..."
}
