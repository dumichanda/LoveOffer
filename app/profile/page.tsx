"use client"

import { useState, useEffect } from "react"
import { Bell, Edit, Gift, Calendar, Target, Layers, Plus, Trash2, Eye, BarChart3, Pause, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { BottomNav } from "@/components/bottom-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { OfferManagement } from "@/components/offer-management"
import { useAppStore } from "@/lib/store"
import { useRouter } from "next/navigation"
import { BookingManagement } from "@/components/booking-management"

const profileTabs = ["My Offers", "My Bids", "My Bookings", "Host Requests"]

export default function ProfilePage() {
  const router = useRouter()
  const { currentUser, offers, bookings, chats, deleteOffer, pauseOffer, activateOffer, initializeData } = useAppStore()
  const [activeTab, setActiveTab] = useState("My Offers")
  const [selectedOffer, setSelectedOffer] = useState<string | null>(null)

  useEffect(() => {
    if (!currentUser) {
      initializeData()
    }
  }, [currentUser, initializeData])

  const totalUnreadChats = chats.reduce((total, chat) => total + chat.unreadCount, 0)

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Card className="p-8 text-center bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Loading Profile...</h2>
        </Card>
      </div>
    )
  }

  // Get user's offers
  const userOffers = offers.filter((offer) => offer.hostId === currentUser.id)
  const activeOffers = userOffers.filter((offer) => offer.status === "active")
  const pausedOffers = userOffers.filter((offer) => offer.status === "paused")
  const draftOffers = userOffers.filter((offer) => offer.status === "draft")

  // Get user's bookings as guest
  const userBookings = bookings.filter((booking) => booking.guestId === currentUser.id)

  // Get user's bookings as host (host requests)
  const hostRequests = bookings.filter((booking) => booking.hostId === currentUser.id)

  const handleDeleteOffer = (offerId: string) => {
    if (confirm("Are you sure you want to delete this offer?")) {
      deleteOffer(offerId)
    }
  }

  const handleToggleOfferStatus = (offerId: string, currentStatus: string) => {
    if (currentStatus === "active") {
      pauseOffer(offerId)
    } else {
      activateOffer(offerId)
    }
  }

  const handleViewOffer = (offerId: string) => {
    router.push(`/offers/${offerId}`)
  }

  const handleUpgrade = (plan: "standard" | "premium") => {
    // In a real app, this would integrate with payment processing
    alert(`Upgrading to ${plan} plan... (This would integrate with payment processing)`)
  }

  const getOfferStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "paused":
        return "bg-yellow-500"
      case "completed":
        return "bg-blue-500"
      case "draft":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">My Profile</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            {totalUnreadChats > 0 && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold">{totalUnreadChats}</span>
              </div>
            )}
          </div>
          <ThemeToggle />
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Profile Header */}
        <Card className="bg-gradient-to-r from-red-400 to-orange-400 text-white border-0">
          <CardContent className="p-6 text-center">
            <Avatar className="w-20 h-20 mx-auto mb-4 bg-white/20">
              <AvatarFallback className="text-white text-xl font-bold">{currentUser.initials}</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-bold mb-2">{currentUser.name}</h2>
            <div className="flex items-center justify-center gap-1 mb-3">
              <span className="text-yellow-300">⭐</span>
              <span>
                {currentUser.rating} ({currentUser.reviewCount} host reviews)
              </span>
              {currentUser.isVerified && <Badge className="ml-2 bg-green-500 text-white">✓ Verified</Badge>}
            </div>
            <p className="text-sm mb-4 opacity-90">{currentUser.bio}</p>
            <Button variant="secondary" className="bg-white/20 hover:bg-white/30 border-white/30">
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-3">
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="p-4 text-center">
              <Gift className="w-6 h-6 mx-auto mb-2 text-red-500" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{currentUser.stats.datesHosted}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Dates Hosted</div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="p-4 text-center">
              <Calendar className="w-6 h-6 mx-auto mb-2 text-red-500" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{currentUser.stats.datesAttended}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Dates Attended</div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="p-4 text-center">
              <Target className="w-6 h-6 mx-auto mb-2 text-red-500" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{currentUser.stats.activeBids}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Active Bids</div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="p-4 text-center">
              <Layers className="w-6 h-6 mx-auto mb-2 text-red-500" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{currentUser.stats.listedOffers}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Listed Offers</div>
            </CardContent>
          </Card>
        </div>

        {/* Offer Summary */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="p-4 text-center">
              <div className="text-lg font-bold text-green-600">{activeOffers.length}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Active Offers</div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="p-4 text-center">
              <div className="text-lg font-bold text-yellow-600">{pausedOffers.length}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Paused Offers</div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="p-4 text-center">
              <div className="text-lg font-bold text-gray-600">{draftOffers.length}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Draft Offers</div>
            </CardContent>
          </Card>
        </div>

        {/* Create New Offer Button */}
        <Button
          className="w-full bg-red-500 hover:bg-red-600 rounded-full py-6 text-lg font-semibold"
          onClick={() => router.push("/create")}
        >
          <Plus className="w-5 h-5 mr-2" />
          Create New Offer
        </Button>

        {/* Upgrade Section */}
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-bold text-red-500 mb-2">Upgrade Your Experience</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Choose a plan that suits your dating journey.</p>

            <div className="grid grid-cols-2 gap-4">
              <Card className="border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700">
                <CardContent className="p-4">
                  <h4 className="font-bold text-red-500 mb-2">Standard Plan</h4>
                  <div className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                    R1000 <span className="text-sm font-normal text-gray-500 dark:text-gray-400">/ month</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-gray-700 dark:text-gray-300">Bid on unlimited profiles</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-gray-700 dark:text-gray-300">Set and manage your offers</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-gray-700 dark:text-gray-300">Get verified for free</span>
                    </div>
                  </div>
                  <Button
                    className="w-full mt-4"
                    variant="outline"
                    onClick={() => handleUpgrade("standard")}
                    disabled={currentUser.subscription === "standard"}
                  >
                    {currentUser.subscription === "standard" ? "Current Plan" : "Choose Standard"}
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-orange-400 relative bg-white dark:bg-gray-700">
                <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-orange-500">Popular</Badge>
                <CardContent className="p-4">
                  <h4 className="font-bold text-orange-500 mb-2">Premium Plan</h4>
                  <div className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                    R2500 <span className="text-sm font-normal text-gray-500 dark:text-gray-400">/ month</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-gray-700 dark:text-gray-300">Everything in Standard</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-gray-700 dark:text-gray-300">Dedicated Concierge Service</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-gray-700 dark:text-gray-300">Exclusive VIP seats</span>
                    </div>
                  </div>
                  <Button
                    className="w-full mt-4 bg-orange-500 hover:bg-orange-600"
                    onClick={() => handleUpgrade("premium")}
                    disabled={currentUser.subscription === "premium"}
                  >
                    {currentUser.subscription === "premium" ? "Current Plan" : "Choose Premium"}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Profile Tabs */}
        <div className="flex gap-1 bg-white dark:bg-gray-800 rounded-lg p-1 overflow-x-auto border border-gray-200 dark:border-gray-700">
          {profileTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-shrink-0 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === tab
                  ? "bg-red-500 text-white"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "My Offers" && (
          <div className="space-y-3">
            {userOffers.length > 0 ? (
              userOffers.map((offer) => (
                <Card key={offer.id} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <CardContent className="p-0">
                    <div className="relative">
                      <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-t-lg flex items-center justify-center">
                        <span className="text-gray-500 dark:text-gray-400 font-medium">
                          {offer.title.slice(0, 15)}...
                        </span>
                      </div>
                      <div className="absolute top-2 right-2 flex gap-2">
                        <Badge className="bg-red-500">R{offer.price}</Badge>
                        <Badge className={`${getOfferStatusColor(offer.status)} text-white`}>{offer.status}</Badge>
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="font-bold mb-2 text-gray-900 dark:text-white">{offer.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">📍 {offer.location}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                        ⭐ {offer.reviewCount > 0 ? `${offer.rating} (${offer.reviewCount} reviews)` : "No reviews yet"}
                      </p>

                      {/* Analytics Summary */}
                      <div className="grid grid-cols-3 gap-2 mb-3 text-xs">
                        <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded">
                          <div className="font-bold text-gray-900 dark:text-white">{offer.analytics.totalViews}</div>
                          <div className="text-gray-500 dark:text-gray-400">Views</div>
                        </div>
                        <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded">
                          <div className="font-bold text-gray-900 dark:text-white">{offer.analytics.totalLikes}</div>
                          <div className="text-gray-500 dark:text-gray-400">Likes</div>
                        </div>
                        <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded">
                          <div className="font-bold text-gray-900 dark:text-white">{offer.analytics.totalBookings}</div>
                          <div className="text-gray-500 dark:text-gray-400">Bookings</div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1"
                          onClick={() => handleViewOffer(offer.id)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedOffer(selectedOffer === offer.id ? null : offer.id)}
                        >
                          <BarChart3 className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleToggleOfferStatus(offer.id, offer.status)}
                        >
                          {offer.status === "active" ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-500 border-red-500"
                          onClick={() => handleDeleteOffer(offer.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>

                  {/* Expanded Management Panel */}
                  {selectedOffer === offer.id && (
                    <div className="border-t border-gray-200 dark:border-gray-600 p-4">
                      <OfferManagement offerId={offer.id} />
                    </div>
                  )}
                </Card>
              ))
            ) : (
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardContent className="p-8 text-center">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">No Offers Yet</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">Create your first date offer to get started!</p>
                  <Button onClick={() => router.push("/create")}>Create Offer</Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {activeTab === "My Bookings" && (
          <div className="space-y-3">
            {userBookings.length > 0 ? (
              userBookings.map((booking) => <BookingManagement key={booking.id} booking={booking} userRole="guest" />)
            ) : (
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardContent className="p-8 text-center">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">No Bookings Yet</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">Book your first date experience!</p>
                  <Button onClick={() => router.push("/")}>Browse Offers</Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {activeTab === "Host Requests" && (
          <div className="space-y-3">
            {hostRequests.length > 0 ? (
              hostRequests.map((booking) => <BookingManagement key={booking.id} booking={booking} userRole="host" />)
            ) : (
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardContent className="p-8 text-center">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">No Host Requests</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">No one has booked your offers yet.</p>
                  <Button onClick={() => router.push("/create")}>Create Offer</Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {activeTab === "My Bids" && (
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="p-8 text-center">
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Bidding Feature</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Bidding functionality would be implemented here for auction-type offers.
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      <BottomNav currentPage="profile" />
    </div>
  )
}
