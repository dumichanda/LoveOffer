import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, formatDistanceToNowStrict } from "date-fns"

// Function to conditionally join class names (standard for Tailwind CSS)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Formats a date and time string, e.g., "June 7, 2025 at 10:30 AM"
export function formatDateTime(date: string | number | Date): string {
  try {
    return format(new Date(date), "MMMM d, yyyy 'at' h:mm a")
  } catch (error) {
    console.error("Error formatting dateTime:", error)
    return "Invalid Date"
  }
}

// Formats a date string, e.g., "June 7, 2025"
export function formatDate(date: string | number | Date): string {
  try {
    return format(new Date(date), "MMMM d, yyyy")
  } catch (error) {
    console.error("Error formatting date:", error)
    return "Invalid Date"
  }
}

// Formats a time string, e.g., "10:30 AM"
export function formatTime(date: string | number | Date): string {
  try {
    return format(new Date(date), "h:mm a")
  } catch (error) {
    console.error("Error formatting time:", error)
    return "Invalid Time"
  }
}

// Returns a string representing how long ago a date was, e.g., "5 minutes ago"
export function getTimeAgo(date: string | number | Date): string {
  try {
    return formatDistanceToNowStrict(new Date(date), { addSuffix: true })
  } catch (error) {
    console.error("Error getting time ago:", error)
    return "Invalid Date"
  }
}

// Generates a simple unique ID string
export function generateId(prefix = "id"): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
}

// Example of another utility function you might have
export const capitalizeFirstLetter = (string: string): string => {
  if (!string) return ""
  return string.charAt(0).toUpperCase() + string.slice(1)
}

// If you have other utility functions in this file, ensure they are also correctly exported.
// For example:
// export const anotherUtil = () => { /* ... */ };
