"use client"

import { useState } from "react"
import { Eye, Edit, Pause, Play, Copy, Trash2, BarChart3, Calendar, Heart, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useAppStore } from "@/lib/store"
import { formatDate, getTimeAgo } from "@/lib/utils"
import { useRouter } from "next/navigation"

interface OfferManagementProps {
  offerId: string
}

export function OfferManagement({ offerId }: OfferManagementProps) {
  const router = useRouter()
  const { offers, updateOffer, deleteOffer, pauseOffer, activateOffer, duplicateOffer, bookings } = useAppStore()
  const [showAnalytics, setShowAnalytics] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const offer = offers.find((o) => o.id === offerId)
  if (!offer) return null

  const offerBookings = bookings.filter((b) => b.offerId === offerId)
  const upcomingBookings = offerBookings.filter((b) => new Date(b.slot.date) >= new Date() && b.status !== "cancelled")

  const handleStatusToggle = () => {
    if (offer.status === "active") {
      pauseOffer(offerId)
    } else {
      activateOffer(offerId)
    }
  }

  const handleDuplicate = () => {
    duplicateOffer(offerId)
    router.push("/profile")
  }

  const handleDelete = () => {
    deleteOffer(offerId)
    setShowDeleteConfirm(false)
    router.push("/profile")
  }

  const getStatusColor = (status: string) => {
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
    <>
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-gray-900 dark:text-white">
            <span>Manage Offer</span>
            <Badge className={`${getStatusColor(offer.status)} text-white`}>
              {offer.status.charAt(0).toUpperCase() + offer.status.slice(1)}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{offer.analytics.totalViews}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Views</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{offer.analytics.totalLikes}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Likes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{offer.analytics.totalBookings}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Bookings</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{offer.analytics.conversionRate}%</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Conversion</div>
            </div>
          </div>

          {/* Upcoming Bookings */}
          {upcomingBookings.length > 0 && (
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                {upcomingBookings.length} Upcoming Booking{upcomingBookings.length > 1 ? "s" : ""}
              </h4>
              {upcomingBookings.slice(0, 2).map((booking) => (
                <div key={booking.id} className="text-sm text-blue-700 dark:text-blue-200">
                  {booking.guest.name} - {formatDate(booking.slot.date)} at {booking.slot.startTime}
                </div>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push(`/offers/${offerId}`)}
              className="flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              View
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAnalytics(true)}
              className="flex items-center gap-2"
            >
              <BarChart3 className="w-4 h-4" />
              Analytics
            </Button>
            <Button variant="outline" size="sm" onClick={handleStatusToggle} className="flex items-center gap-2">
              {offer.status === "active" ? (
                <>
                  <Pause className="w-4 h-4" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Activate
                </>
              )}
            </Button>
            <Button variant="outline" size="sm" onClick={handleDuplicate} className="flex items-center gap-2">
              <Copy className="w-4 h-4" />
              Duplicate
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => {
                // In a real app, this would open an edit form
                alert("Edit functionality would open here")
              }}
            >
              <Edit className="w-4 h-4" />
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDeleteConfirm(true)}
              className="flex items-center gap-2 text-red-500 border-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Analytics Dialog */}
      <Dialog open={showAnalytics} onOpenChange={setShowAnalytics}>
        <DialogContent className="max-w-2xl bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-white">Offer Analytics</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {/* Performance Overview */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="dark:bg-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Eye className="w-5 h-5 text-blue-500" />
                    <span className="font-medium text-gray-900 dark:text-white">Total Views</span>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">{offer.analytics.totalViews}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Last updated {getTimeAgo(offer.analytics.lastUpdated)}
                  </div>
                </CardContent>
              </Card>

              <Card className="dark:bg-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="w-5 h-5 text-red-500" />
                    <span className="font-medium text-gray-900 dark:text-white">Total Likes</span>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">{offer.analytics.totalLikes}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {offer.analytics.totalViews > 0
                      ? `${((offer.analytics.totalLikes / offer.analytics.totalViews) * 100).toFixed(1)}% like rate`
                      : "No views yet"}
                  </div>
                </CardContent>
              </Card>

              <Card className="dark:bg-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-5 h-5 text-green-500" />
                    <span className="font-medium text-gray-900 dark:text-white">Total Bookings</span>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    {offer.analytics.totalBookings}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    R{(offer.analytics.totalBookings * offer.price).toLocaleString()} earned
                  </div>
                </CardContent>
              </Card>

              <Card className="dark:bg-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-purple-500" />
                    <span className="font-medium text-gray-900 dark:text-white">Conversion Rate</span>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    {offer.analytics.conversionRate}%
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {offer.analytics.conversionRate > 5
                      ? "Excellent"
                      : offer.analytics.conversionRate > 2
                        ? "Good"
                        : "Needs improvement"}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div>
              <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">Recent Bookings</h3>
              {offerBookings.length > 0 ? (
                <div className="space-y-2">
                  {offerBookings.slice(0, 5).map((booking) => (
                    <div
                      key={booking.id}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{booking.guest.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {formatDate(booking.slot.date)} at {booking.slot.startTime}
                        </div>
                      </div>
                      <Badge variant={booking.status === "confirmed" ? "default" : "secondary"}>{booking.status}</Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-gray-500 dark:text-gray-400">No bookings yet</div>
              )}
            </div>

            {/* Recommendations */}
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 className="font-semibold mb-2 text-blue-900 dark:text-blue-100">Recommendations</h3>
              <ul className="text-sm text-blue-700 dark:text-blue-200 space-y-1">
                {offer.analytics.conversionRate < 2 && (
                  <li>• Consider updating your photos or description to improve conversion rate</li>
                )}
                {offer.analytics.totalViews < 50 && <li>• Add more relevant tags to increase visibility</li>}
                {offer.availableSlots.filter((s) => !s.isBooked).length < 2 && (
                  <li>• Add more time slots to accommodate more bookings</li>
                )}
                {offer.analytics.totalLikes > offer.analytics.totalBookings * 3 && (
                  <li>• High interest but low bookings - consider adjusting your price</li>
                )}
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-white">Delete Offer</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-300">
              Are you sure you want to delete "{offer.title}"? This action cannot be undone.
            </p>
            {upcomingBookings.length > 0 && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <p className="text-red-700 dark:text-red-200 font-medium">
                  Warning: This offer has {upcomingBookings.length} upcoming booking
                  {upcomingBookings.length > 1 ? "s" : ""}. Deleting will cancel all bookings.
                </p>
              </div>
            )}
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setShowDeleteConfirm(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleDelete} className="flex-1 bg-red-500 hover:bg-red-600 text-white">
                Delete Offer
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
