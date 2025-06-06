import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDateTime(date: string | Date, startTime: string, endTime: string): string {
  const dateObj = new Date(date)
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: "Africa/Johannesburg",
  }

  return `${dateObj.toLocaleDateString("en-ZA", options)}, ${startTime}-${endTime}`
}

export function formatDate(date: string | Date): string {
  const dateObj = new Date(date)
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Africa/Johannesburg",
  }

  return dateObj.toLocaleDateString("en-ZA", options)
}

export function formatTime(time: string): string {
  return time
}

export function getTimeAgo(date: string | Date): string {
  const now = new Date()
  const past = new Date(date)
  const diffMs = now.getTime() - past.getTime()

  const diffSecs = Math.floor(diffMs / 1000)
  const diffMins = Math.floor(diffSecs / 60)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffDays > 0) {
    return `${diffDays}d ago`
  } else if (diffHours > 0) {
    return `${diffHours}h ago`
  } else if (diffMins > 0) {
    return `${diffMins}m ago`
  } else {
    return "just now"
  }
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 10)
}
