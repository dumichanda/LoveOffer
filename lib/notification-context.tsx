"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"
import { toast } from "@/hooks/use-toast"
import { MessageCircle, Calendar, Heart, CreditCard, AlertTriangle, CheckCircle, Info } from "lucide-react"

export interface InAppNotification {
  id: string
  type: "success" | "error" | "warning" | "info" | "message" | "booking" | "payment" | "match"
  title: string
  message: string
  timestamp: Date
  actionUrl?: string
  autoClose?: boolean
  duration?: number
  sound?: boolean
  vibrate?: boolean
}

interface NotificationContextType {
  notifications: InAppNotification[]
  showNotification: (notification: Omit<InAppNotification, "id" | "timestamp">) => void
  clearNotification: (id: string) => void
  clearAllNotifications: () => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<InAppNotification[]>([])

  const getNotificationIcon = (type: InAppNotification["type"]) => {
    switch (type) {
      case "message":
        return MessageCircle
      case "booking":
        return Calendar
      case "payment":
        return CreditCard
      case "match":
        return Heart
      case "success":
        return CheckCircle
      case "error":
        return AlertTriangle
      case "warning":
        return AlertTriangle
      default:
        return Info
    }
  }

  const getNotificationColor = (type: InAppNotification["type"]) => {
    switch (type) {
      case "success":
      case "payment":
        return "text-green-600 dark:text-green-400"
      case "error":
        return "text-red-600 dark:text-red-400"
      case "warning":
        return "text-orange-600 dark:text-orange-400"
      case "message":
        return "text-blue-600 dark:text-blue-400"
      case "booking":
        return "text-purple-600 dark:text-purple-400"
      case "match":
        return "text-pink-600 dark:text-pink-400"
      default:
        return "text-gray-600 dark:text-gray-400"
    }
  }

  const playNotificationSound = () => {
    try {
      // Create a simple notification sound using Web Audio API
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
      oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1)
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.3)
    } catch (error) {
      console.log("Audio not supported")
    }
  }

  const triggerVibration = () => {
    if ("vibrate" in navigator) {
      navigator.vibrate([100, 50, 100])
    }
  }

  const showNotification = useCallback((notificationData: Omit<InAppNotification, "id" | "timestamp">) => {
    const notification: InAppNotification = {
      ...notificationData,
      id: `notification_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      autoClose: notificationData.autoClose ?? true,
      duration: notificationData.duration ?? 5000,
      sound: notificationData.sound ?? true,
      vibrate: notificationData.vibrate ?? true,
    }

    // Add to notifications list
    setNotifications((prev) => [notification, ...prev].slice(0, 50)) // Keep only last 50

    // Play sound if enabled
    if (notification.sound) {
      playNotificationSound()
    }

    // Trigger vibration if enabled
    if (notification.vibrate) {
      triggerVibration()
    }

    // Show toast notification
    const Icon = getNotificationIcon(notification.type)
    const iconColor = getNotificationColor(notification.type)

    toast({
      title: (
        <div className="flex items-center gap-2">
          <Icon className={`w-4 h-4 ${iconColor}`} />
          <span>{notification.title}</span>
        </div>
      ),
      description: notification.message,
      duration: notification.duration,
      action: notification.actionUrl
        ? {
            altText: "View",
            onClick: () => {
              window.location.href = notification.actionUrl!
            },
          }
        : undefined,
    })

    // Auto-clear if enabled
    if (notification.autoClose && notification.duration) {
      setTimeout(() => {
        clearNotification(notification.id)
      }, notification.duration)
    }
  }, [])

  const clearNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }, [])

  const clearAllNotifications = useCallback(() => {
    setNotifications([])
  }, [])

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        showNotification,
        clearNotification,
        clearAllNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider")
  }
  return context
}
