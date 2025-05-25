"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Heart, X, Bell, Bookmark, Search, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import BottomNav from "@/components/bottom-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { SearchFilters } from "@/components/search-filters"
import { formatDateTime } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { NotificationCenter } from "@/components/notification-center"
import { signIn, useSession } from "next-auth/react"

// Remove the hardcoded mockOffers array and import the store
import { useAppStore } from "@/lib/store"

// In the component, get offers from the store instead of hardcoded data
export default function HomePage() {
  const router = useRouter()
  const { data: session } = useSession()
  const { offers } = useAppStore() // Get offers from store
  const [showNotifications, setShowNotifications] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0)
  const [browseWithoutAccount, setBrowseWithoutAccount] = useState(false)
  const [favorites, setFavorites] = useState<string[]>([])

  const currentOffer = offers[currentOfferIndex] // Use store offers

  useEffect(() => {
    // Check if user chose to browse without account from URL params or localStorage
    const urlParams = new URLSearchParams(window.location.search)
    const browseParam = urlParams.get("browse")
    const storedBrowseState = localStorage.getItem("browseWithoutAccount")

    if (browseParam === "true" || storedBrowseState === "true") {
      setBrowseWithoutAccount(true)
      // Store the preference
      localStorage.setItem("browseWithoutAccount", "true")
    }
  }, [])

  // Update the handleSwipe function to work with store offers length
  const handleSwipe = (action: "like" | "pass") => {
    if (!currentOffer) return

    if (action === "like") {
      setFavorites((prev) => [...prev, currentOffer.id])
    }

    // Move to next offer or loop back
    if (currentOfferIndex >= offers.length - 1) {
      setCurrentOfferIndex(0)
    } else {
      setCurrentOfferIndex((prev) => prev + 1)
    }
  }

  const handleViewOffer = () => {
    if (currentOffer) {
      router.push(`/offers/${currentOffer.id}`)
    }
  }

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (currentOffer) {
      setFavorites((prev) =>
        prev.includes(currentOffer.id) ? prev.filter((id) => id !== currentOffer.id) : [...prev, currentOffer.id],
      )
    }
  }

  const handleSignIn = () => {
    signIn("google")
  }

  const handleBrowseWithoutAccount = () => {
    setBrowseWithoutAccount(true)
    localStorage.setItem("browseWithoutAccount", "true")
  }

  const isOfferFavorited = currentOffer ? favorites.includes(currentOffer.id) : false

  // Show landing page for unauthenticated users who haven't chosen to browse
  if (!session && !browseWithoutAccount) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-4">
        <Card className="w-full max-w-md p-6">
          <div className="text-center space-y-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Mavuso
            </h1>
            <p className="text-lg text-muted-foreground">Discover unique dating experiences in South Africa</p>

            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="space-y-2">
                <Heart className="mx-auto h-8 w-8 text-pink-500" />
                <p className="text-sm font-medium">Unique Dates</p>
              </div>
              <div className="space-y-2">
                <Search className="mx-auto h-8 w-8 text-purple-500" />
                <p className="text-sm font-medium">Local Hosts</p>
              </div>
            </div>

            <div className="space-y-3">
              <Button onClick={handleSignIn} className="w-full" size="lg">
                Sign In with Google
              </Button>
              <Button variant="outline" onClick={handleBrowseWithoutAccount} className="w-full">
                Browse Without Account
              </Button>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  // No offers state
  if (!currentOffer) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Mavuso</h1>
          <div className="flex items-center gap-3">
            {!session && (
              <Button onClick={handleSignIn} size="sm" className="bg-red-500 hover:bg-red-600 text-white">
                <LogIn className="w-4 h-4 mr-2" />
                Sign In
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={() => setShowSearch(!showSearch)}>
              <Search className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </Button>
            <ThemeToggle />
          </div>
        </div>

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

  const nextSlot = currentOffer.timeSlots?.find((slot) => !slot.isBooked)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Mavuso</h1>
        <div className="flex items-center gap-3">
          {!session ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Browsing as Guest</span>
              <Button onClick={handleSignIn} size="sm" className="bg-red-500 hover:bg-red-600 text-white">
                <LogIn className="w-4 h-4 mr-2" />
                Sign In
              </Button>
            </div>
          ) : (
            <Avatar className="w-8 h-8">
              <AvatarImage src={session.user?.image || ""} />
              <AvatarFallback>{session.user?.name?.[0] || "U"}</AvatarFallback>
            </Avatar>
          )}
          <Button variant="ghost" size="sm" onClick={() => setShowSearch(!showSearch)}>
            <Search className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </Button>
          <ThemeToggle />
          <div className="relative">
            <Button variant="ghost" size="sm" onClick={() => setShowNotifications(true)}>
              <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
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
            style={{ backgroundImage: `url(${currentOffer?.images[0] || "/placeholder.svg?height=500&width=400"})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

            {/* Top Badges */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
              <div className="flex flex-col gap-2">
                <Badge className="bg-purple-500 text-white text-sm px-2 py-1 w-fit">{currentOffer?.category}</Badge>
                {currentOffer?.host.isVerified && (
                  <Badge className="bg-green-500 text-white text-sm px-2 py-1 w-fit">✓ Verified Host</Badge>
                )}
              </div>
              <div className="flex flex-col gap-2 items-end">
                <Badge className="bg-red-500 text-white text-lg px-3 py-1">R{currentOffer?.price}</Badge>
                <Badge className="bg-green-500 text-white text-sm px-2 py-1">{currentOffer?.status}</Badge>
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={handleToggleFavorite}
                  className={`w-12 h-12 rounded-full backdrop-blur-sm transition-all duration-200 ${
                    isOfferFavorited
                      ? "bg-yellow-400/90 hover:bg-yellow-500/90 shadow-lg"
                      : "bg-white/20 hover:bg-white/30"
                  }`}
                >
                  <Bookmark
                    className={`w-6 h-6 transition-all duration-200 ${
                      isOfferFavorited ? "fill-white text-white" : "text-white"
                    }`}
                  />
                </Button>
                {isOfferFavorited && (
                  <div className="bg-yellow-400 text-black text-xs px-2 py-1 rounded-full font-bold">Favorited</div>
                )}
              </div>
            </div>

            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-2xl font-bold">{currentOffer?.title}</h2>
                {currentOffer?.host.rating > 0 && (
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">⭐</span>
                    <span className="text-base font-bold">{currentOffer?.host.rating}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 mb-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={currentOffer?.host.image || ""} />
                  <AvatarFallback className="text-sm">{currentOffer?.host.name?.[0] || "H"}</AvatarFallback>
                </Avatar>
                <span className="text-base">by {currentOffer?.host.name}</span>
                {currentOffer?.host.isVerified && (
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 mb-3">
                <span className="text-base">📍 {currentOffer?.location}</span>
              </div>

              <div className="flex items-center gap-4 mb-3 text-sm">
                <div>
                  <span>
                    Max {currentOffer?.maxGuests} guest{currentOffer?.maxGuests > 1 ? "s" : ""}
                  </span>
                </div>
              </div>

              {nextSlot && (
                <div className="flex items-center gap-2 text-base mb-3">
                  <span>🕐 Next: {formatDateTime(nextSlot.date, nextSlot.startTime, nextSlot.endTime)}</span>
                </div>
              )}

              <p className="text-white/90 text-sm mb-4">{currentOffer?.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {currentOffer?.tags.slice(0, 3).map((tag) => (
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
