"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export function AdvancedSearch() {
  return (
    <Card className="dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="w-5 h-5" />
          Advanced Search
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input placeholder="Search users, offers, bookings..." />
        <Button>Search</Button>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Advanced search functionality will be available here.
        </p>
      </CardContent>
    </Card>
  )
}
