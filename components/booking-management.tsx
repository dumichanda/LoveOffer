"use client"

import { useState } from "react"
import {
  Edit,
  X,
  Calendar,
  User,
  MapPin,
  MessageCircle,
  AlertTriangle,
  CreditCard,
  CheckCircle,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useAppStore, type Booking } from "@/lib/store"
import { formatDateTime } from "@/lib/utils"
import { useRouter } from "next/navigation"

interface BookingManagementProps {
  booking: Booking
  userRole: "guest" | "host"
}

export function BookingManagement({ booking, userRole }: BookingManagementProps) {
  const router = useRouter()
  const { editBooking, requestBookingCancellation, confirmPayment } = useAppStore()
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showCancelDialog, setShowCancelDialog] = useState(false)
  const [showPaymentDialog, setShowPaymentDialog] = useState(false)
  const [editData, setEditData] = useState({
    guestCount: booking.guestCount,
    specialRequests: booking.specialRequests || "",
  })
  const [cancellationReason, setCancellationReason] = useState("")

  const canEdit = userRole === "guest" && booking.status === "confirmed" && new Date(booking.slot.date) > new Date()
  const canCancel = booking.status === "confirmed" && new Date(booking.slot.date) > new Date()
  const needsPaymentConfirmation = booking.status === "pending" && !booking.paymentConfirmed

  const handleEdit = () => {
    editBooking(booking.id, editData)
    setShowEditDialog(false)
  }

  const handleCancel = () => {
    requestBookingCancellation(booking.id, cancellationReason)
    setShowCancelDialog(false)
  }

  const handlePaymentConfirmation = () => {
    confirmPayment(booking.id)
    setShowPaymentDialog(false)
  }

  const handleChatOpen = () => {
    router.push(`/chats/${booking.chatId}`)
  }

  const otherUser = userRole === "guest" ? booking.host : booking.guest

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500"
      case "pending":
        return "bg-yellow-500"
      case "cancelled":
        return "bg-red-500"
      case "completed":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  const getCancellationPolicy = () => {
    const policy = booking.offer.cancellationPolicy
    const hoursUntil = Math.floor((new Date(booking.slot.date).getTime() - new Date().getTime()) / (1000 * 60 * 60))

    switch (policy) {
      case "flexible":
        return hoursUntil >= 24 ? "Free cancellation" : "50% refund"
      case "moderate":
        return hoursUntil >= 48 ? "Free cancellation" : hoursUntil >= 24 ? "50% refund" : "No refund"
      case "strict":
        return hoursUntil >= 72 ? "Free cancellation" : "No refund"
      default:
        return "Check policy"
    }
  }

  return (
    <>
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg text-gray-900 dark:text-white">{booking.offer.title}</CardTitle>
            <div className="flex items-center gap-2">
              <Badge className={`${getStatusColor(booking.status)} text-white`}>
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </Badge>
              {!booking.paymentConfirmed && booking.status === "pending" && (
                <Badge className="bg-orange-500 text-white">Payment Pending</Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Payment Status Alert */}
          {needsPaymentConfirmation && (
            <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-orange-600" />
                <span className="font-medium text-orange-800 dark:text-orange-200">Payment Required</span>
              </div>
              <p className="text-sm text-orange-700 dark:text-orange-300 mb-2">
                Please complete payment to confirm your booking.
              </p>
              <Button
                size="sm"
                onClick={() => setShowPaymentDialog(true)}
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                <CreditCard className="w-4 h-4 mr-1" />
                Confirm Payment
              </Button>
            </div>
          )}

          {/* Booking Details */}
          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="text-gray-900 dark:text-white">
                {formatDateTime(booking.slot.date, booking.slot.startTime, booking.slot.endTime)}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span className="text-gray-900 dark:text-white">{booking.offer.location}</span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <User className="w-4 h-4 text-gray-500" />
              <Avatar className="w-6 h-6">
                <AvatarFallback className="text-xs">{otherUser.initials}</AvatarFallback>
              </Avatar>
              <span className="text-gray-900 dark:text-white">
                {userRole === "guest" ? "Host" : "Guest"}: {otherUser.name}
              </span>
              {otherUser.isVerified && <Badge className="bg-green-500 text-white text-xs">✓</Badge>}
              <div className="ml-auto text-xs text-gray-500 dark:text-gray-400">
                {otherUser.bookingHistory.cancelationRate}% cancel rate
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500">Guests:</span>
              <span className="text-gray-900 dark:text-white">{booking.guestCount}</span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500">Total:</span>
              <span className="font-semibold text-gray-900 dark:text-white">R{booking.offer.price}</span>
              {booking.paymentConfirmed && (
                <div className="flex items-center gap-1 ml-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-xs text-green-600 dark:text-green-400">Paid</span>
                </div>
              )}
            </div>
          </div>

          {/* Special Requests */}
          {booking.specialRequests && (
            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-1">Special Requests</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">{booking.specialRequests}</p>
            </div>
          )}

          {/* Payment Confirmation Info */}
          {booking.paymentConfirmed && booking.paymentConfirmedAt && (
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="font-medium text-green-800 dark:text-green-200">Payment Confirmed</span>
              </div>
              <p className="text-xs text-green-700 dark:text-green-300">
                Confirmed on {new Date(booking.paymentConfirmedAt).toLocaleDateString()}
              </p>
            </div>
          )}

          {/* Cancellation Policy */}
          {canCancel && (
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="w-4 h-4 text-blue-600" />
                <span className="font-medium text-blue-900 dark:text-blue-100">Cancellation Policy</span>
              </div>
              <p className="text-sm text-blue-700 dark:text-blue-200">{getCancellationPolicy()}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleChatOpen} className="flex-1 flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Chat
            </Button>

            {canEdit && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowEditDialog(true)}
                className="flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit
              </Button>
            )}

            {canCancel && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCancelDialog(true)}
                className="flex items-center gap-2 text-red-500 border-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <X className="w-4 h-4" />
                Cancel
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Edit Booking Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-white">Edit Booking</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="text-gray-900 dark:text-white">Number of Guests</Label>
              <Input
                type="number"
                min="1"
                max={booking.offer.maxGuests || 10}
                value={editData.guestCount}
                onChange={(e) => setEditData({ ...editData, guestCount: Number(e.target.value) })}
                className="mt-1 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Maximum {booking.offer.maxGuests || 10} guests allowed
              </p>
            </div>

            <div>
              <Label className="text-gray-900 dark:text-white">Special Requests</Label>
              <Textarea
                value={editData.specialRequests}
                onChange={(e) => setEditData({ ...editData, specialRequests: e.target.value })}
                placeholder="Any special requests or dietary requirements..."
                className="mt-1 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white"
              />
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setShowEditDialog(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleEdit} className="flex-1 bg-red-500 hover:bg-red-600 text-white">
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Cancel Booking Dialog */}
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-white">Cancel Booking</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <p className="text-red-700 dark:text-red-200 font-medium mb-2">
                Are you sure you want to cancel this booking?
              </p>
              <p className="text-sm text-red-600 dark:text-red-300">Refund policy: {getCancellationPolicy()}</p>
            </div>

            <div>
              <Label className="text-gray-900 dark:text-white">Reason for cancellation</Label>
              <Textarea
                value={cancellationReason}
                onChange={(e) => setCancellationReason(e.target.value)}
                placeholder="Please provide a reason for cancellation..."
                className="mt-1 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white"
                required
              />
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setShowCancelDialog(false)} className="flex-1">
                Keep Booking
              </Button>
              <Button
                onClick={handleCancel}
                disabled={!cancellationReason.trim()}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white"
              >
                Cancel Booking
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Payment Confirmation Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-white">Confirm Payment</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CreditCard className="w-4 h-4 text-blue-600" />
                <span className="font-medium text-blue-900 dark:text-blue-100">Payment Confirmation</span>
              </div>
              <p className="text-sm text-blue-700 dark:text-blue-200">
                Please confirm that you have completed the payment for this booking.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Booking:</span>
                <span className="font-medium text-gray-900 dark:text-white">{booking.offer.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Amount:</span>
                <span className="font-semibold text-gray-900 dark:text-white">R{booking.offer.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Reference:</span>
                <span className="font-mono text-sm text-gray-900 dark:text-white">{booking.id}</span>
              </div>
            </div>

            <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="w-4 h-4 text-yellow-600" />
                <span className="font-medium text-yellow-800 dark:text-yellow-200">Important</span>
              </div>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                Only confirm payment if you have actually completed the payment. False confirmations may result in
                account suspension.
              </p>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setShowPaymentDialog(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handlePaymentConfirmation} className="flex-1 bg-green-500 hover:bg-green-600 text-white">
                <CheckCircle className="w-4 h-4 mr-2" />
                Confirm Payment
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
