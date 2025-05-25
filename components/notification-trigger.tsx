"use client"

import { useEffect } from "react"
import { useNotifications } from "@/lib/notification-context"
import { setGlobalNotificationFunction } from "@/lib/store"

export function NotificationTrigger() {
  const { showNotification } = useNotifications()

  useEffect(() => {
    // Set the global notification function so the store can trigger notifications
    setGlobalNotificationFunction(showNotification)

    // Simulate some random notifications for demo purposes
    const intervals = [
      setTimeout(() => {
        showNotification({
          type: "message",
          title: "New Message from Nomsa",
          message: "Hey! Just confirming our dinner tonight at 7 PM 🍽️",
          actionUrl: "/chats/chat_1",
        })
      }, 10000), // 10 seconds

      setTimeout(() => {
        showNotification({
          type: "match",
          title: "Someone Liked Your Profile! 💕",
          message: "Kagiso from Soweto is interested in your music taste",
          actionUrl: "/profile",
        })
      }, 25000), // 25 seconds

      setTimeout(() => {
        showNotification({
          type: "booking",
          title: "Booking Reminder 📅",
          message: "Your hiking adventure with Lerato is tomorrow at 8 AM",
          actionUrl: "/calendar",
        })
      }, 40000), // 40 seconds
    ]

    return () => {
      intervals.forEach(clearTimeout)
      setGlobalNotificationFunction(() => {})
    }
  }, [showNotification])

  return null
}
