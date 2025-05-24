"use client"

import { useState } from "react"
import { Bell, Mail, Smartphone, MessageSquare, Calendar, Star, Gift, Clock, Megaphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useAppStore } from "@/lib/store"

export function NotificationSettings() {
  const { currentUser, updateNotificationSettings } = useAppStore()
  const [settings, setSettings] = useState(
    currentUser?.notificationSettings || {
      bookings: true,
      messages: true,
      reviews: true,
      offers: true,
      reminders: true,
      marketing: false,
      push: true,
      email: true,
      sms: false,
    },
  )

  const handleSettingChange = (key: string, value: boolean) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    updateNotificationSettings({ [key]: value })
  }

  const notificationTypes = [
    {
      key: "bookings",
      title: "Bookings & Reservations",
      description: "New bookings, cancellations, and booking updates",
      icon: Calendar,
      color: "text-blue-500",
    },
    {
      key: "messages",
      title: "Messages & Chat",
      description: "New messages from hosts and guests",
      icon: MessageSquare,
      color: "text-green-500",
    },
    {
      key: "reviews",
      title: "Reviews & Ratings",
      description: "New reviews and rating notifications",
      icon: Star,
      color: "text-yellow-500",
    },
    {
      key: "offers",
      title: "Offer Updates",
      description: "Likes, views, and updates on your offers",
      icon: Gift,
      color: "text-purple-500",
    },
    {
      key: "reminders",
      title: "Date Reminders",
      description: "Upcoming date reminders and confirmations",
      icon: Clock,
      color: "text-orange-500",
    },
    {
      key: "marketing",
      title: "Marketing & Promotions",
      description: "Special offers, tips, and platform updates",
      icon: Megaphone,
      color: "text-red-500",
    },
  ]

  const deliveryMethods = [
    {
      key: "push",
      title: "Push Notifications",
      description: "Instant notifications on your device",
      icon: Bell,
    },
    {
      key: "email",
      title: "Email Notifications",
      description: "Notifications sent to your email address",
      icon: Mail,
    },
    {
      key: "sms",
      title: "SMS Notifications",
      description: "Text messages for urgent notifications",
      icon: Smartphone,
    },
  ]

  return (
    <div className="space-y-6">
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
            <Bell className="w-5 h-5" />
            Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Notification Types */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              What would you like to be notified about?
            </h3>
            <div className="space-y-4">
              {notificationTypes.map((type) => {
                const Icon = type.icon
                return (
                  <div
                    key={type.key}
                    className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-5 h-5 ${type.color}`} />
                      <div>
                        <Label className="text-sm font-medium text-gray-900 dark:text-white">{type.title}</Label>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{type.description}</p>
                      </div>
                    </div>
                    <Switch
                      checked={settings[type.key as keyof typeof settings]}
                      onCheckedChange={(checked) => handleSettingChange(type.key, checked)}
                    />
                  </div>
                )
              })}
            </div>
          </div>

          <Separator className="dark:bg-gray-600" />

          {/* Delivery Methods */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              How would you like to receive notifications?
            </h3>
            <div className="space-y-4">
              {deliveryMethods.map((method) => {
                const Icon = method.icon
                return (
                  <div
                    key={method.key}
                    className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      <div>
                        <Label className="text-sm font-medium text-gray-900 dark:text-white">{method.title}</Label>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{method.description}</p>
                      </div>
                    </div>
                    <Switch
                      checked={settings[method.key as keyof typeof settings]}
                      onCheckedChange={(checked) => handleSettingChange(method.key, checked)}
                    />
                  </div>
                )
              })}
            </div>
          </div>

          <Separator className="dark:bg-gray-600" />

          {/* Quick Actions */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => {
                const allOn = { ...settings }
                Object.keys(allOn).forEach((key) => {
                  if (key !== "marketing") {
                    allOn[key as keyof typeof allOn] = true
                  }
                })
                setSettings(allOn)
                updateNotificationSettings(allOn)
              }}
              className="flex-1"
            >
              Enable All
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                const allOff = { ...settings }
                Object.keys(allOff).forEach((key) => {
                  allOff[key as keyof typeof allOff] = false
                })
                setSettings(allOff)
                updateNotificationSettings(allOff)
              }}
              className="flex-1"
            >
              Disable All
            </Button>
          </div>

          {/* Info */}
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-blue-700 dark:text-blue-200">
              💡 <strong>Tip:</strong> You can always change these settings later. We recommend keeping booking and
              message notifications enabled for the best experience.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
