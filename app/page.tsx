"use client"

import { useState } from "react"

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(true)

  if (showWelcome) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-pink-50 to-purple-100">
        <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg border">
          <div className="text-center space-y-6">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              DateCraft
            </h1>
            <p className="text-lg text-gray-600">Discover unique dating experiences in South Africa</p>

            <div className="grid grid-cols-2 gap-4 text-center py-4">
              <div className="space-y-2">
                <div className="text-3xl">❤️</div>
                <p className="text-sm font-medium text-gray-700">Unique Dates</p>
              </div>
              <div className="space-y-2">
                <div className="text-3xl">🔍</div>
                <p className="text-sm font-medium text-gray-700">Local Hosts</p>
              </div>
            </div>

            <div className="space-y-3">
              <button
                className="w-full px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors font-medium"
                onClick={() => setShowWelcome(false)}
              >
                Get Started
              </button>
              <button className="w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <h1 className="text-xl font-bold text-gray-900">DateCraft</h1>
        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="text-sm font-medium text-gray-600">U</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border max-w-md mx-auto">
          {/* Image Section */}
          <div className="h-80 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-2xl font-bold">Coffee Date</h2>
                <div className="flex items-center gap-1 bg-black/30 px-2 py-1 rounded-full">
                  <span className="text-yellow-400">⭐</span>
                  <span className="text-sm font-bold">4.8</span>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <span className="text-sm font-medium">JH</span>
                </div>
                <span className="text-sm">Hosted by John</span>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm">📍 Cape Town, South Africa</span>
              </div>

              <p className="text-white/90 text-sm mb-4 leading-relaxed">
                Enjoy a relaxed coffee date at one of Cape Town's most scenic cafes with stunning ocean views and
                artisanal coffee.
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">Coffee</span>
                <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">Casual</span>
                <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">Scenic</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-6 flex justify-center gap-8 bg-white">
            <button className="w-16 h-16 rounded-full border-2 border-gray-300 flex items-center justify-center text-2xl text-gray-400 hover:bg-gray-50 hover:border-gray-400 transition-all">
              ✕
            </button>
            <button className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-red-500 text-white flex items-center justify-center text-2xl hover:from-pink-600 hover:to-red-600 transition-all shadow-lg">
              ❤️
            </button>
          </div>
        </div>

        {/* Additional Info */}
        <div className="max-w-md mx-auto mt-6 text-center">
          <p className="text-gray-600 text-sm">Swipe right to like, left to pass</p>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around items-center max-w-md mx-auto">
          <button className="flex flex-col items-center p-2 text-pink-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span className="text-xs mt-1">Home</span>
          </button>

          <button className="flex flex-col items-center p-2 text-gray-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span className="text-xs mt-1">Create</span>
          </button>

          <button className="flex flex-col items-center p-2 text-gray-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <span className="text-xs mt-1">Chats</span>
          </button>

          <button className="flex flex-col items-center p-2 text-gray-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-xs mt-1">Calendar</span>
          </button>

          <button className="flex flex-col items-center p-2 text-gray-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span className="text-xs mt-1">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  )
}
