"use client"

import type React from "react"

import { useState } from "react"
import { Bell, X, MessageCircle, Calendar, Star, Settings, Trash2, CheckCheck, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAppStore } from "@/lib/store"
import { getTimeAgo } from "@/lib/utils"
import { useRouter } from "next/navigation"

interface NotificationCenterProps {
  isOpen: boolean
  onClose: () => void
}

export function NotificationCenter({ isOpen, onClose }: NotificationCenterProps) {
  const router = useRouter()
  const { notifications, currentUser, markNotificationRead, markAllNotificationsRead, deleteNotification } =
    useAppStore()
  const [filter, setFilter] = useState<string>("all")

  const userNotifications = notifications.filter((notif) => notif.userId === currentUser?.id)

  const filteredNotifications = userNotifications.filter((notif) => {
    if (filter === "all") return true
    if (filter === "unread") return !notif.read
    return notif.category === filter
  })

  const unreadCount = userNotifications.filter((notif) => !notif.read).length

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "booking":
        return <Calendar className="w-4 h-4 text-blue-500" />
      case "message":
        return <MessageCircle className="w-4 h-4 text-green-500" />
      case "review":
        return <Star className="w-4 h-4 text-yellow-500" />
      case "payment":
        return <span className="w-4 h-4 text-green-600 font-bold">R</span>
      case "cancellation":
        return <X className="w-4 h-4 text-red-500" />
      case "reminder":
        return <Bell className="w-4 h-4 text-orange-500" />
      case "offer_update":
        return <Star className="w-4 h-4 text-purple-500" />
      default:
        return <Settings className="w-4 h-4 text-gray-500" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "border-l-red-600"
      case "high":
        return "border-l-orange-500"
      case "medium":
        return "border-l-blue-500"
      default:
        return "border-l-gray-300"
    }
  }

  const handleNotificationClick = (notification: any) => {
    if (!notification.read) {
      markNotificationRead(notification.id)
    }
    if (notification.actionUrl) {
      router.push(notification.actionUrl)
    }
    onClose()
  }

  const handleDeleteNotification = (e: React.MouseEvent, notificationId: string) => {
    e.stopPropagation()
    deleteNotification(notificationId)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50" onClick={onClose}>
      <div
        className="fixed right-4 top-16 w-96 max-h-[80vh] bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-600">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
            {unreadCount > 0 && (
              <Badge variant="secondary" className="bg-red-500 text-white">
                {unreadCount}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllNotificationsRead} title="Mark all as read">
                <CheckCheck className="w-4 h-4" />
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Filter */}
        <div className="p-3 border-b border-gray-200 dark:border-gray-600">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-full bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <SelectItem value="all" className="text-gray-900 dark:text-white">
                All Notifications
              </SelectItem>
              <SelectItem value="unread" className="text-gray-900 dark:text-white">
                Unread Only
              </SelectItem>
              <SelectItem value="booking" className="text-gray-900 dark:text-white">
                Bookings
              </SelectItem>
              <SelectItem value="social" className="text-gray-900 dark:text-white">
                Social
              </SelectItem>
              <SelectItem value="financial" className="text-gray-900 dark:text-white">
                Financial
              </SelectItem>
              <SelectItem value="system" className="text-gray-900 dark:text-white">
                System
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <Card
                key={notification.id}
                className={`m-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-l-4 ${getPriorityColor(notification.priority)} ${
                  !notification.read ? "bg-blue-50 dark:bg-blue-900/20" : ""
                }`}
                onClick={() => handleNotificationClick(notification)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-gray-900 dark:text-white text-sm line-clamp-1">
                          {notification.title}
                        </h4>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {getTimeAgo(notification.timestamp)}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 hover:bg-red-100 dark:hover:bg-red-900/20"
                            onClick={(e) => handleDeleteNotification(e, notification.id)}
                          >
                            <Trash2 className="w-3 h-3 text-red-500" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{notification.message}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge
                          variant="secondary"
                          className={`text-xs ${
                            notification.priority === "urgent"
                              ? "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300"
                              : notification.priority === "high"
                                ? "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300"
                                : notification.priority === "medium"
                                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
                                  : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                          }`}
                        >
                          {notification.priority}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {notification.category}
                        </Badge>
                      </div>
                    </div>
                    {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2" />}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="p-8 text-center">
              <Bell className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <p className="text-gray-500 dark:text-gray-400">
                {filter === "unread" ? "No unread notifications" : "No notifications yet"}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-gray-200 dark:border-gray-600">
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => {
              router.push("/settings/notifications")
              onClose()
            }}
          >
            <Settings className="w-4 h-4 mr-2" />
            Notification Settings
          </Button>
        </div>
      </div>
    </div>
  )
}
