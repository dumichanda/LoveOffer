"use client"

import { useState, useEffect } from "react"

interface TestUser {
  id: string
  email: string
  name: string
  image: string
  role: string
  subscription: string
  isVerified: boolean
  rating: number
  reviewCount: number
  bio: string
  age: number
  location: string
}

export function useTestAuth() {
  const [testUser, setTestUser] = useState<TestUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Only in development
    if (process.env.NODE_ENV === "development") {
      const stored = localStorage.getItem("testUser")
      if (stored) {
        try {
          setTestUser(JSON.parse(stored))
        } catch (error) {
          console.error("Failed to parse test user:", error)
          localStorage.removeItem("testUser")
        }
      }
    }
    setIsLoading(false)
  }, [])

  const logout = () => {
    localStorage.removeItem("testUser")
    setTestUser(null)
    window.location.reload()
  }

  return {
    testUser,
    isLoading,
    logout,
    isTestMode: process.env.NODE_ENV === "development" && !!testUser,
  }
}
