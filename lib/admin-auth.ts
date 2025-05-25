import { cookies } from "next/headers"

export interface AdminUser {
  id: string
  email: string
  role: string
}

export async function getAdminUser(): Promise<AdminUser | null> {
  try {
    const cookieStore = cookies()
    const adminSession = cookieStore.get("admin-session")

    if (!adminSession) {
      return null
    }

    // Decode admin token (simplified for demo)
    const adminData = JSON.parse(atob(adminSession.value))
    return adminData
  } catch (error) {
    return null
  }
}

export function isValidAdminSession(token: string): boolean {
  try {
    const adminData = JSON.parse(atob(token))
    return adminData && adminData.role && adminData.email
  } catch (error) {
    return false
  }
}
