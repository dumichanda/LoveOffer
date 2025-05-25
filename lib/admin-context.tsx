"use client"

import type React from "react"

import { createContext, useContext, useState } from "react"

interface AdminUser {
  id: string
  email: string
  name: string
  role: string
}

interface AdminContextType {
  admin: AdminUser | null
  isAuthenticated: boolean
  login: (credentials: { email: string; password: string }) => Promise<boolean>
  logout: () => Promise<void>
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState<AdminUser | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const login = async (credentials: { email: string; password: string }): Promise<boolean> => {
    try {
      const response = await fetch("/api/admin/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      })

      const data = await response.json()

      if (data.success) {
        setAdmin(data.admin)
        setIsAuthenticated(true)
        return true
      }
      return false
    } catch (error) {
      return false
    }
  }

  const logout = async (): Promise<void> => {
    try {
      await fetch("/api/admin/logout", { method: "POST" })
    } catch (error) {
      console.error("Logout failed:", error)
    } finally {
      setAdmin(null)
      setIsAuthenticated(false)
    }
  }

  return <AdminContext.Provider value={{ admin, isAuthenticated, login, logout }}>{children}</AdminContext.Provider>
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider")
  }
  return context
}
