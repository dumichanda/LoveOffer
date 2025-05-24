"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  ArrowLeft,
  Bell,
  MapPin,
  Star,
  Calendar,
  Heart,
  CreditCard,
  CheckCircle,
  AlertTriangle,
  Users,
  TrendingUp,
  TrendingDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { BottomNav } from "@/components/bottom-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { useAppStore } from "@/lib/store"
import { formatDateTime } from "@/lib/utils"

export default function OfferDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { offers, bookOffer, likeOffer, currentUser } = useAppStore()

  const offerId = params.id as string
  // Debug logging
  console.log("All offers:", offers)
  console.log("Looking for offer ID:", offerId)
  console.log(
    "Offer found:",
    offers.find((o) => o.id === offerId),
  )

  const [selectedSlotId, setSelectedSlotId] = useState<string>("")
  const [showBookingDialog, setShowBookingDialog] = useState(false)
  const [showPaymentDialog, setShowPaymentDialog] = useState(false)
  const [guestCount, setGuestCount] = useState(1)
  const [specialRequests, setSpecialRequests] = useState("")
  const [pendingBookingId, setPendingBookingId] = useState<string>("")

  const offer = offers.find((o) => o.id === offerId)

  const totalUnreadChats = useAppStore((state) => state.chats.reduce((total, chat) => total + chat.unreadCount, 0))

  if (!offer) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Card className="p-8 text-center bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Offer Not Found</h2>
          <Button onClick={() => router.back()}>Go Back</Button>
        </Card>
      </div>
    )
  }

  const availableSlots = offer.availableSlots.filter((slot) => !slot.isBooked)
  const isOwnOffer = offer.hostId === currentUser?.id

  const handleBooking = () => {
    if (!selectedSlotId) {
      alert("Please select a time slot")
      return
    }

    if (guestCount > offer.maxGuests) {
      alert(`Maximum ${offer.maxGuests} guests allowed`)
      return
    }

    // Create booking with pending payment
    const bookingId = `booking_${Date.now()}`
    bookOffer(offerId, selectedSlotId, guestCount, specialRequests)
    setPendingBookingId(bookingId)
    setShowBookingDialog(false)
    setShowPaymentDialog(true)
  }

  const handlePaymentConfirmation = () => {
    // In a real app, this would update the booking status
    console.log("Payment confirmed for booking:", pendingBookingId)
    setShowPaymentDialog(false)
    router.push("/calendar")
  }

  const handleLike = () => {
    likeOffer(offerId)
    router.back()
  }

  const getBookingSuccessRate = () => {
    const { confirmedBookings, canceledBookings } = offer.bookingStats
    const total = confirmedBookings + canceledBookings
    return total > 0 ? Math.round((confirmedBookings / total) * 100) : 100
  }

  const getCancellationRate = () => {
    return offer.host.bookingHistory.cancelationRate
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()}>
            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Offer Details</h1>
        </div>
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
        {/* Main Image */}
        <Card className="overflow-hidden bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <div
            className="h-64 bg-cover bg-center relative"
            style={{ backgroundImage: `url(${offer.images[0] || "/placeholder.svg?height=400&width=600"})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <Badge className="absolute top-4 right-4 bg-red-500 text-white text-lg px-3 py-1">R{offer.price}</Badge>
          </div>
        </Card>

        {/* Booking Statistics - Transferred from Home Card */}
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">Booking Statistics</h3>
            <div className="grid grid-cols-3 gap-2 mb-3">
              <div className="text-center p-2 bg-green-500/20 backdrop-blur-sm rounded">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span className="font-bold text-green-700 dark:text-green-300 text-lg">
                    {offer.bookingStats.confirmedBookings}
                  </span>
                </div>
                <div className="text-green-600 dark:text-green-400 text-sm">Confirmed</div>
              </div>
              <div className="text-center p-2 bg-red-500/20 backdrop-blur-sm rounded">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
                  <span className="font-bold text-red-700 dark:text-red-300 text-lg">
                    {offer.bookingStats.canceledBookings}
                  </span>
                </div>
                <div className="text-red-600 dark:text-red-400 text-sm">Canceled</div>
              </div>
              <div className="text-center p-2 bg-blue-500/20 backdrop-blur-sm rounded">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="font-bold text-blue-700 dark:text-blue-300 text-lg">{getBookingSuccessRate()}%</span>
                </div>
                <div className="text-blue-600 dark:text-blue-400 text-sm">Success</div>
              </div>
            </div>

            {/* Host History - Transferred from Home Card */}
            <div className="flex items-center justify-between p-2 bg-gray-100 dark:bg-gray-700 rounded">
              <span className="text-sm text-gray-600 dark:text-gray-300">Host History:</span>
              <div className="flex items-center gap-3 text-sm">
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-green-500" />
                  <span className="text-gray-900 dark:text-white">
                    {offer.host.bookingHistory.totalConfirmed} confirmed
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <TrendingDown className="w-3 h-3 text-red-500" />
                  <span className="text-gray-900 dark:text-white">{getCancellationRate()}% cancel rate</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Offer Info */}
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <h1 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">{offer.title}</h1>

            <div className="flex items-center gap-2 mb-3">
              <Avatar className="w-8 h-8">
                <AvatarFallback>{offer.host.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900 dark:text-white">Hosted by {offer.host.name}</span>
                  {offer.host.isVerified && <Badge className="bg-green-500 text-white text-xs">✓</Badge>}
                </div>
              </div>
              {offer.reviewCount > 0 && (
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {offer.rating} ({offer.reviewCount})
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 mb-4 text-gray-600 dark:text-gray-300">
              <MapPin className="w-4 h-4" />
              <span>{offer.location}</span>
            </div>

            <div className="flex items-center gap-2 mb-4 text-gray-600 dark:text-gray-300">
              <Users className="w-4 h-4" />
              <span>Max {offer.maxGuests} guests</span>
            </div>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">{offer.description}</p>

            {/* Cancellation Policy */}
            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-1">Cancellation Policy</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 capitalize">{offer.cancellationPolicy}</p>
            </div>
          </CardContent>
        </Card>

        {/* Available Slots */}
        {availableSlots.length > 0 && (
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Available Time Slots</h3>
              <div className="space-y-2">
                {availableSlots.map((slot) => (
                  <div
                    key={slot.id}
                    className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-600 rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      <span className="font-medium text-gray-900 dark:text-white">
                        {formatDateTime(slot.date, slot.startTime, slot.endTime)}
                      </span>
                    </div>
                    {!isOwnOffer && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedSlotId(slot.id)
                          setShowBookingDialog(true)
                        }}
                      >
                        Book
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* No Available Slots */}
        {availableSlots.length === 0 && !isOwnOffer && (
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">No Available Slots</h3>
              <p className="text-gray-600 dark:text-gray-300">This offer is currently fully booked.</p>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        {!isOwnOffer && (
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={handleLike}>
              <Heart className="w-4 h-4 mr-2" />
              Like
            </Button>
            <Button
              className="flex-1 bg-red-500 hover:bg-red-600"
              disabled={availableSlots.length === 0}
              onClick={() => setShowBookingDialog(true)}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Book Now
            </Button>
          </div>
        )}

        {/* Own Offer Message */}
        {isOwnOffer && (
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">This is your offer</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">You can manage this offer from your profile.</p>
              <Button onClick={() => router.push("/profile")}>Go to Profile</Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Booking Dialog */}
      <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
        <DialogContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-white">Book This Experience</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">{offer.title}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">Hosted by {offer.host.name}</p>
            </div>

            <div className="space-y-2">
              <Label className="text-gray-900 dark:text-white">Select Time Slot:</Label>
              <div className="space-y-2">
                {availableSlots.map((slot) => (
                  <label key={slot.id} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="timeSlot"
                      value={slot.id}
                      checked={selectedSlotId === slot.id}
                      onChange={(e) => setSelectedSlotId(e.target.value)}
                      className="text-red-500"
                    />
                    <span className="text-gray-900 dark:text-white">
                      {formatDateTime(slot.date, slot.startTime, slot.endTime)}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-gray-900 dark:text-white">Number of Guests</Label>
              <Input
                type="number"
                min="1"
                max={offer.maxGuests}
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                className="mt-1 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Maximum {offer.maxGuests} guests allowed</p>
            </div>

            <div>
              <Label className="text-gray-900 dark:text-white">Special Requests (Optional)</Label>
              <Textarea
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                placeholder="Any special requests or dietary requirements..."
                className="mt-1 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white"
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <span className="font-medium text-gray-900 dark:text-white">Total Price:</span>
              <span className="text-xl font-bold text-red-500">R{offer.price}</span>
            </div>

            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CreditCard className="w-4 h-4 text-blue-600" />
                <span className="font-medium text-blue-900 dark:text-blue-100">Payment Information</span>
              </div>
              <p className="text-sm text-blue-700 dark:text-blue-200">
                Payment is processed offline. After booking, you'll receive payment instructions and need to confirm
                payment to secure your reservation.
              </p>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setShowBookingDialog(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleBooking} className="flex-1 bg-red-500 hover:bg-red-600">
                Create Booking
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Payment Confirmation Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-white">Payment Instructions</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-green-800 dark:text-green-200">Booking Created Successfully!</span>
              </div>
              <p className="text-sm text-green-700 dark:text-green-300">
                Your booking has been created and is pending payment confirmation.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 dark:text-white">Payment Details:</h4>
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Amount:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">R{offer.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Reference:</span>
                  <span className="font-mono text-sm text-gray-900 dark:text-white">{pendingBookingId}</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-yellow-600" />
                <span className="font-medium text-yellow-800 dark:text-yellow-200">Payment Instructions</span>
              </div>
              <div className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                <p>1. Transfer the amount to the host's preferred payment method</p>
                <p>2. Use the reference number provided above</p>
                <p>3. Confirm payment below once completed</p>
                <p>4. Your booking will be confirmed after payment verification</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setShowPaymentDialog(false)} className="flex-1">
                Pay Later
              </Button>
              <Button onClick={handlePaymentConfirmation} className="flex-1 bg-green-500 hover:bg-green-600">
                I've Made Payment
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <BottomNav currentPage="home" />
    </div>
  )
}
