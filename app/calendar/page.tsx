"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Bell, CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BottomNav } from "@/components/bottom-nav"
import { useAppStore } from "@/lib/store"
import { useRouter } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { BookingManagement } from "@/components/booking-management"
import { DateBlocking } from "@/components/date-blocking"

export default function CalendarPage() {
  const router = useRouter()
  const { bookings, currentUser, chats, initializeData, blockedDates } = useAppStore()
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [currentMonth, setCurrentMonth] = useState(new Date())

  useEffect(() => {
    if (bookings.length === 0) {
      initializeData()
    }
  }, [bookings.length, initializeData])

  const totalUnreadChats = chats.reduce((total, chat) => total + chat.unreadCount, 0)

  // Get user's bookings (both as host and guest)
  const userBookings = bookings.filter(
    (booking) => booking.guestId === currentUser?.id || booking.hostId === currentUser?.id,
  )

  // Get upcoming bookings
  const upcomingBookings = userBookings
    .filter((booking) => {
      const bookingDate = new Date(booking.slot.date)
      return bookingDate >= new Date() && booking.status !== "cancelled"
    })
    .sort((a, b) => new Date(a.slot.date).getTime() - new Date(b.slot.date).getTime())

  // Calendar logic
  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startDate = new Date(firstDay)
  startDate.setDate(startDate.getDate() - firstDay.getDay())

  const calendarDays = []
  const currentDate = new Date(startDate)

  for (let i = 0; i < 42; i++) {
    calendarDays.push(new Date(currentDate))
    currentDate.setDate(currentDate.getDate() + 1)
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const isSelected = (date: Date) => {
    return date.toDateString() === selectedDate.toDateString()
  }

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === month
  }

  const hasBooking = (date: Date) => {
    return userBookings.some((booking) => {
      const bookingDate = new Date(booking.slot.date)
      return bookingDate.toDateString() === date.toDateString()
    })
  }

  const navigateMonth = (direction: "prev" | "next") => {
    const newMonth = new Date(currentMonth)
    if (direction === "prev") {
      newMonth.setMonth(newMonth.getMonth() - 1)
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1)
    }
    setCurrentMonth(newMonth)
  }

  const getBookingsForDate = (date: Date) => {
    return userBookings.filter((booking) => {
      const bookingDate = new Date(booking.slot.date)
      return bookingDate.toDateString() === date.toDateString()
    })
  }

  const selectedDateBookings = getBookingsForDate(selectedDate)

  const handleChatOpen = (booking: any) => {
    router.push(`/chats/${booking.chatId}`)
  }

  const isBlockedDate = (date: Date) => {
    return blockedDates.some((blocked) => {
      const blockedDate = new Date(blocked.date)
      return blockedDate.toDateString() === date.toDateString() && blocked.hostId === currentUser?.id
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">My Calendar</h1>
        <ThemeToggle />
        <div className="relative">
          <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          {totalUnreadChats > 0 && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-bold">{totalUnreadChats}</span>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Calendar */}
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-4">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </h2>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => navigateMonth("prev")}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => navigateMonth("next")}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 text-center">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                <div key={day} className="p-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                  {day}
                </div>
              ))}

              {calendarDays.map((date, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedDate(date)}
                  className={`p-2 text-sm rounded-lg hover:bg-gray-100 relative ${
                    isSelected(date)
                      ? "bg-red-500 text-white"
                      : isToday(date)
                        ? "bg-blue-100 text-blue-600 font-bold"
                        : !isCurrentMonth(date)
                          ? "text-gray-300"
                          : isBlockedDate(date)
                            ? "bg-gray-200 text-gray-400 line-through"
                            : ""
                  }`}
                  disabled={isBlockedDate(date)}
                >
                  {date.getDate()}
                  {hasBooking(date) && (
                    <div
                      className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full ${
                        isSelected(date) ? "bg-white" : "bg-red-500"
                      }`}
                    />
                  )}
                  {isBlockedDate(date) && <div className="absolute top-0 right-0 w-2 h-2 bg-gray-400 rounded-full" />}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Today Info */}
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-red-500">
              <CalendarIcon className="w-5 h-5" />
              <span className="font-medium text-gray-900 dark:text-white">
                Selected:{" "}
                {selectedDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Selected Date Details */}
        {selectedDateBookings.length > 0 ? (
          <div className="space-y-3">
            <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">
              Bookings for {selectedDate.toLocaleDateString("en-US", { month: "long", day: "numeric" })}
            </h3>
            {selectedDateBookings.map((booking) => (
              <BookingManagement
                key={booking.id}
                booking={booking}
                userRole={booking.guestId === currentUser?.id ? "guest" : "host"}
              />
            ))}
          </div>
        ) : (
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="p-4 text-center">
              <p className="text-gray-500 dark:text-gray-400">No bookings for this date</p>
              <Button className="mt-2" variant="outline" onClick={() => router.push("/")}>
                Browse Offers
              </Button>
            </CardContent>
          </Card>
        )}

        <DateBlocking />

        {/* Upcoming Bookings */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Upcoming Bookings</h2>
          {upcomingBookings.length > 0 ? (
            <div className="space-y-3">
              {upcomingBookings.map((booking) => (
                <BookingManagement
                  key={booking.id}
                  booking={booking}
                  userRole={booking.guestId === currentUser?.id ? "guest" : "host"}
                />
              ))}
            </div>
          ) : (
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">No Upcoming Bookings</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">You don't have any upcoming dates scheduled.</p>
                <Button onClick={() => router.push("/")}>Browse Offers</Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <BottomNav currentPage="calendar" />
    </div>
  )
}
