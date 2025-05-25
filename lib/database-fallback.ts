// Fallback utilities for when database is not available
export const fallbackStats = {
  users: 0,
  offers: 0,
  bookings: 0,
  chats: 0,
  messages: 0,
  reviews: 0,
  total: 0,
}

export const fallbackStatus = {
  connected: false,
  tables: [],
  tableCount: 0,
  error: "Database not available during build",
}

export function isDatabaseAvailable(): boolean {
  try {
    return !!process.env.DATABASE_URL && process.env.NODE_ENV !== "build"
  } catch {
    return false
  }
}

export async function safeDbOperation<T>(operation: () => Promise<T>, fallback: T): Promise<T> {
  try {
    if (!isDatabaseAvailable()) {
      return fallback
    }
    return await operation()
  } catch (error) {
    console.warn("Database operation failed, using fallback:", error)
    return fallback
  }
}
