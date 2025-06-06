"use client"

import { useState } from "react"

export default function HomePage() {
  const [showWelcome, setShowWelcome] = useState(true)

  if (showWelcome) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50 p-4">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
          <div className="text-center space-y-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              DateCraft
            </h1>
            <p className="text-lg text-gray-600">Discover unique dating experiences in South Africa</p>

            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="space-y-2">
                <div className="mx-auto h-8 w-8 text-pink-500 text-2xl">❤️</div>
                <p className="text-sm font-medium">Unique Dates</p>
              </div>
              <div className="space-y-2">
                <div className="mx-auto h-8 w-8 text-purple-500 text-2xl">🔍</div>
                <p className="text-sm font-medium">Local Hosts</p>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => setShowWelcome(false)}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Get Started
              </button>
              <button className="w-full border border-gray-300 bg-transparent py-3 px-4 rounded-md hover:bg-gray-100 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold">DateCraft</h1>
        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="text-sm font-medium">U</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-3">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden w-full cursor-pointer">
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
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium">H</span>
                </div>
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
                <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full">Coffee</span>
                <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full">Casual</span>
                <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full">Outdoor</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-6 flex justify-center gap-8 bg-white">
            <button className="w-16 h-16 rounded-full border-2 border-gray-300 flex items-center justify-center text-2xl hover:bg-gray-50 transition-colors">
              ✕
            </button>
            <button className="w-16 h-16 rounded-full bg-red-500 text-white flex items-center justify-center text-2xl hover:bg-red-600 transition-colors">
              ❤️
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3 px-4 flex justify-around">
        <div className="flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <span className="text-xs mt-1">Home</span>
        </div>
        <div className="flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          <span className="text-xs mt-1">Chats</span>
        </div>
        <div className="flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="8" r="5"></circle>
            <path d="M20 21a8 8 0 1 0-16 0"></path>
          </svg>
          <span className="text-xs mt-1">Profile</span>
        </div>
      </div>
    </div>
  )
}
