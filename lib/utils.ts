import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDateTime(
  date: Date | string,
  startTime?: string,
  endTime?: string,
): string {
  const d = new Date(date)
  const base = d.toLocaleDateString("en-US", {
    timeZone: "Africa/Johannesburg",
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  if (startTime && endTime) return `${base} at ${startTime} - ${endTime}`
  if (startTime) return `${base} at ${startTime}`
  return base
}

export function formatDate(date: Date | string): string {
  const d = new Date(date)
  return d.toLocaleDateString("en-US", {
    timeZone: "Africa/Johannesburg",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function formatTime(date: Date | string): string {
  if (typeof date === "string") {
    return date
  }
  const d = new Date(date)
  return d.toLocaleTimeString("en-US", {
    timeZone: "Africa/Johannesburg",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
}

export function getTimeAgo(date: Date | string): string {
  const now = new Date()
  const past = new Date(date)
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000)

  if (diffInSeconds < 60) return "just now"
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`
  return formatDate(date)
}

export function generateId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2)}`
}
