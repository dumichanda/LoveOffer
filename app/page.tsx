"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BottomNav } from "@/components/bottom-nav"

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(true)

  if (showWelcome) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-pink-50 to-purple-100">
        <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold text-center text-pink-600 mb-6">DateCraft</h1>
          <p className="text-gray-600 text-center mb-8">Welcome to DateCraft - Your dating app is being set up.</p>
          <div className="flex justify-center">
            <button
              className="px-6 py-2 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition-colors"
              onClick={() => setShowWelcome(false)}
            >
              Get Started
            </button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold">DateCraft</h1>
        <Avatar className="w-8 h-8">
          <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>

      {/* Main Content */}
      <div className="p-3">
        <Card className="relative overflow-hidden w-full cursor-pointer">
          <div className="h-[400px] bg-gradient-to-br from-blue-400 to-purple-500 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-2xl font-bold">Coffee Date</h2>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400">⭐</span>
                  <span className="text-base font-bold">4.8</span>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback>H</AvatarFallback>
                </Avatar>
                <span className="text-base">by John Host</span>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <span className="text-base">📍 Cape Town, South Africa</span>
              </div>

              <p className="text-white/90 text-sm mb-4">
                Enjoy a relaxed coffee date at one of Cape Town's most scenic cafes with ocean views.
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                <Badge variant="secondary" className="bg-white/20 text-white border-white/20">
                  Coffee
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/20">
                  Casual
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/20">
                  Outdoor
                </Badge>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <CardContent className="flex justify-center gap-8 bg-white">
            <Button variant="outline" size="icon" className="w-16 h-16 rounded-full border-2">
              ✕
            </Button>
            <Button size="icon" className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600">
              ❤️
            </Button>
          </CardContent>
        </Card>
      </div>

      <BottomNav />
    </div>
  )
}
