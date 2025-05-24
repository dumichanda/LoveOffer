"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Shield, Crown } from "lucide-react"

interface TestUser {
  id: string
  email: string
  name: string
  role: string
  subscription: string
  bio: string
  age: number
  location: string
}

export function TestLogin() {
  const [users, setUsers] = useState<TestUser[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedUser, setSelectedUser] = useState<TestUser | null>(null)

  const loadTestUsers = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/auth/test-login")
      const data = await response.json()
      setUsers(data.users || [])
    } catch (error) {
      console.error("Failed to load test users:", error)
    } finally {
      setLoading(false)
    }
  }

  const loginAsUser = async (userId: string) => {
    try {
      const response = await fetch("/api/auth/test-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      })
      const data = await response.json()

      if (data.success) {
        setSelectedUser(data.user)
        // Store test user in localStorage for demo purposes
        localStorage.setItem("testUser", JSON.stringify(data.user))
        window.location.reload()
      }
    } catch (error) {
      console.error("Failed to login as test user:", error)
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "ADMIN":
        return <Shield className="h-4 w-4" />
      case "PREMIUM":
        return <Crown className="h-4 w-4" />
      default:
        return <User className="h-4 w-4" />
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "PREMIUM":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
    }
  }

  if (process.env.NODE_ENV === "production") {
    return null // Don't show in production
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Test Credentials (Development Only)
        </CardTitle>
        <CardDescription>Use these test accounts to explore authenticated features</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {users.length === 0 ? (
          <Button onClick={loadTestUsers} disabled={loading} className="w-full">
            {loading ? "Loading..." : "Load Test Users"}
          </Button>
        ) : (
          <div className="grid gap-3">
            {users.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </div>
                  <Badge className={getRoleColor(user.role)}>
                    {getRoleIcon(user.role)}
                    {user.role}
                  </Badge>
                </div>
                <Button size="sm" onClick={() => loginAsUser(user.id)} variant="outline">
                  Login as {user.name.split(" ")[0]}
                </Button>
              </div>
            ))}
          </div>
        )}

        {selectedUser && (
          <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <div className="text-sm text-green-800 dark:text-green-200">
              ✅ Logged in as <strong>{selectedUser.name}</strong> ({selectedUser.role})
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
