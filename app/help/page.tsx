"use client"

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BottomNav } from "@/components/bottom-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { HelpSupport } from "@/components/help-support"
import { useRouter } from "next/navigation"

export default function HelpPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Help & Support</h1>
        </div>
        <ThemeToggle />
      </div>

      <div className="p-4">
        <HelpSupport />
      </div>

      <BottomNav currentPage="profile" />
    </div>
  )
}
