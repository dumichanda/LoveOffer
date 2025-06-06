import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, formatDistanceToNowStrict } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDateTime(date: string | number | Date): string {
  try {
    return format(new Date(date), "MMMM d, yyyy 'at' h:mm a")
  } catch (error) {
    console.error("Error formatting dateTime:", error)
    return "Invalid Date"
  }
}

export function formatDate(date: string | number | Date): string {
  try {
    return format(new Date(date), "MMMM d, yyyy")
  } catch (error) {
    console.error("Error formatting date:", error)
    return "Invalid Date"
  }
}

export function formatTime(date: string | number | Date): string {
  try {
    return format(new Date(date), "h:mm a")
  } catch (error) {
    console.error("Error formatting time:", error)
    return "Invalid Date"
  }
}

export function getTimeAgo(date: string | number | Date): string {
  try {
    return formatDistanceToNowStrict(new Date(date), { addSuffix: true })
  } catch (error) {
    console.error("Error getting time ago:", error)
    return "Invalid Date"
  }
}

export function generateId(prefix = "id"): string {
  return `${prefix}_${Math.random().toString(36).substr(2, 9)}_${Date.now()}`
}

// You can add other utility functions here if needed.
