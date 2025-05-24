"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Heart, X, Bell, Bookmark, Eye, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import BottomNav from "@/components/bottom-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { SearchFilters } from "@/components/search-filters"
import { formatDateTime } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { useAppStore } from "@/lib/store"
import { NotificationCenter } from "@/components/notification-center"

export default function HomePage() {
  const router = useRouter()
  const [showNotifications, setShowNotifications] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0)

  const {
    offers,
    favoriteOffers,
    likeOffer,
    passOffer,
    toggleFavorite,
    incrementOfferViews,
    currentUser,
    chats,
    notifications,
    getFavoriteOffers,
  } = useAppStore()

  const filteredOffers = offers
  const unreadChats = chats.filter((chat) => chat.unreadCount > 0).length
  const unreadNotifications = notifications.filter((notif) => !notif.read).length

  useEffect(() => {}, [])

  const currentOffer = filteredOffers[currentOfferIndex]

  const handleSwipe = (action: "like" | "pass") => {
    if (!currentOffer) return

    if (action === "like") {
      likeOffer(currentOffer.id)
    } else {
      passOffer(currentOffer.id)
    }

    // Move to next offer or loop back
    if (currentOfferIndex >= filteredOffers.length - 1) {
      setCurrentOfferIndex(0)
    } else {
      setCurrentOfferIndex((prev) => prev + 1)
    }
  }

  const handleViewOffer = () => {
    if (currentOffer) {
      incrementOfferViews(currentOffer.id)
      router.push(`/offers/${currentOffer.id}`)
    }
  }

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (currentOffer) {
      const success = toggleFavorite(currentOffer.id)
      if (!success) {
        alert("You can only favorite up to 10 offers. Remove some favorites to add new ones.")
      }
    }
  }

  // No offers state
  if (!currentOffer) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Datecraft</h1>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => setShowSearch(!showSearch)}>
              <Search className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </Button>
            <ThemeToggle />
            <div className="relative">
              <Button variant="ghost" size="sm" onClick={() => setShowNotifications(true)}>
                <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                {unreadChats + unreadNotifications > 0 && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-bold">{unreadChats + unreadNotifications}</span>
                  </div>
                )}
              </Button>
            </div>
          </div>
        </div>

        {showSearch && (
          <div className="p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <SearchFilters />
          </div>
        )}

        <div className="p-4 flex-1 flex items-center justify-center">
          <Card className="w-full max-w-sm p-8 text-center bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">No offers found!</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Try adjusting your filters or check back later for new experiences!
            </p>
            <div className="space-y-2">
              <Button onClick={() => router.push("/create")} className="w-full bg-red-500 hover:bg-red-600 text-white">
                Create Your Own Offer
              </Button>
              <Button variant="outline" onClick={() => setShowSearch(true)} className="w-full">
                Adjust Filters
              </Button>
            </div>
          </Card>
        </div>

        <NotificationCenter isOpen={showNotifications} onClose={() => setShowNotifications(false)} />
        <BottomNav />
      </div>
    )
  }

  const nextSlot = currentOffer.availableSlots.find((slot) => !slot.isBooked)
  const isFavorited = favoriteOffers.includes(currentOffer.id)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Datecraft</h1>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => setShowSearch(!showSearch)}>
            <Search className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </Button>
          <ThemeToggle />
          <div className="relative">
            <Button variant="ghost" size="sm" onClick={() => setShowNotifications(true)}>
              <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              {unreadChats + unreadNotifications > 0 && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-bold">{unreadChats + unreadNotifications}</span>
                </div>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Search Panel */}
      {showSearch && (
        <div className="p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <SearchFilters />
        </div>
      )}

      {/* Main Content */}
      <div className="p-3">
        <Card
          className="relative overflow-hidden w-full cursor-pointer bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
          onClick={handleViewOffer}
        >
          {/* Image */}
          <div
            className="h-[500px] bg-cover bg-center relative"
            style={{ backgroundImage: `url(${currentOffer.images[0] || "/placeholder.svg?height=500&width=400"})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

            {/* Top Badges */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
              <div className="flex flex-col gap-2">
                <Badge className="bg-purple-500 text-white text-sm px-2 py-1 w-fit">{currentOffer.category}</Badge>
                {currentOffer.host.isVerified && (
                  <Badge className="bg-green-500 text-white text-sm px-2 py-1 w-fit">✓ Verified Host</Badge>
                )}
              </div>
              <div className="flex flex-col gap-2 items-end">
                <Badge className="bg-red-500 text-white text-lg px-3 py-1">R{currentOffer.price}</Badge>
                <Badge className="bg-green-500 text-white text-sm px-2 py-1">{currentOffer.status}</Badge>
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={handleToggleFavorite}
                  className={`w-12 h-12 rounded-full backdrop-blur-sm transition-all duration-200 ${
                    isFavorited ? "bg-yellow-400/90 hover:bg-yellow-500/90 shadow-lg" : "bg-white/20 hover:bg-white/30"
                  }`}
                >
                  <Bookmark
                    className={`w-6 h-6 transition-all duration-200 ${
                      isFavorited ? "fill-white text-white" : "text-white"
                    }`}
                  />
                </Button>
                {isFavorited && (
                  <div className="bg-yellow-400 text-black text-xs px-2 py-1 rounded-full font-bold">Favorited</div>
                )}
              </div>
            </div>

            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-2xl font-bold">{currentOffer.title}</h2>
                {currentOffer.reviewCount > 0 && (
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">⭐</span>
                    <span className="text-base font-bold">{currentOffer.rating}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 mb-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="text-sm">{currentOffer.host.initials}</AvatarFallback>
                </Avatar>
                <span className="text-base">by {currentOffer.host.name}</span>
                {currentOffer.host.isVerified && (
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 mb-3">
                <span className="text-base">📍 {currentOffer.location}</span>
              </div>

              {/* Booking Statistics */}
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="bg-green-500/80 backdrop-blur-sm rounded-lg p-2 text-center">
                  <div className="text-white text-lg font-bold">
                    ✓ {currentOffer.bookingStats?.confirmedBookings || 10}
                  </div>
                  <div className="text-white text-xs">Confirmed</div>
                </div>
                <div className="bg-red-500/80 backdrop-blur-sm rounded-lg p-2 text-center">
                  <div className="text-white text-lg font-bold">
                    ⚠ {currentOffer.bookingStats?.canceledBookings || 2}
                  </div>
                  <div className="text-white text-xs">Canceled</div>
                </div>
                <div className="bg-blue-500/80 backdrop-blur-sm rounded-lg p-2 text-center">
                  <div className="text-white text-lg font-bold">📊 83%</div>
                  <div className="text-white text-xs">Success</div>
                </div>
              </div>

              {/* Host History */}
              <div className="bg-black/30 backdrop-blur-sm rounded-lg p-2 mb-3">
                <div className="text-white/80 text-xs mb-1">Host History:</div>
                <div className="flex items-center justify-between">
                  <span className="text-green-400 text-sm">
                    ✓ {currentOffer.host.bookingHistory?.totalConfirmed || 42} confirmed
                  </span>
                  <span className="text-red-400 text-sm">
                    📉 {currentOffer.host.bookingHistory?.cancelationRate || 6.7}% cancel rate
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-3 text-sm">
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{currentOffer.views} views</span>
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  <span>{currentOffer.likes} likes</span>
                </div>
                <div>
                  <span>
                    Max {currentOffer.maxGuests} guest{currentOffer.maxGuests > 1 ? "s" : ""}
                  </span>
                </div>
              </div>

              {nextSlot && (
                <div className="flex items-center gap-2 text-base mb-3">
                  <span>🕐 Next: {formatDateTime(nextSlot.date, nextSlot.startTime, nextSlot.endTime)}</span>
                </div>
              )}

              <p className="text-white/90 text-sm mb-4">{currentOffer.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {currentOffer.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-white/20 text-white text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-6 flex justify-center gap-8 bg-white dark:bg-gray-800">
            <Button
              size="lg"
              variant="outline"
              className="w-20 h-20 rounded-full border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              onClick={(e) => {
                e.stopPropagation()
                handleSwipe("pass")
              }}
            >
              <X className="w-8 h-8 text-gray-600 dark:text-gray-300" />
            </Button>
            <Button
              size="lg"
              className="w-20 h-20 rounded-full bg-red-500 hover:bg-red-600"
              onClick={(e) => {
                e.stopPropagation()
                handleSwipe("like")
              }}
            >
              <Heart className="w-8 h-8 fill-white" />
            </Button>
          </div>
        </Card>
      </div>

      <NotificationCenter isOpen={showNotifications} onClose={() => setShowNotifications(false)} />
      <BottomNav />
    </div>
  )
}
