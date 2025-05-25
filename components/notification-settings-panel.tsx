"use client"

import { useState } from "react"
import { Bell, Volume2, VolumeX, Smartphone, SmartphoneNfc } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useNotifications } from "@/lib/notification-context"

interface NotificationSettings {
  messages: boolean
  bookings: boolean
  payments: boolean
  matches: boolean
  sound: boolean
  vibration: boolean
  pushNotifications: boolean
}

export function NotificationSettingsPanel() {
  const { showNotification } = useNotifications()
  const [settings, setSettings] = useState<NotificationSettings>({
    messages: true,
    bookings: true,
    payments: true,
    matches: true,
    sound: true,
    vibration: true,
    pushNotifications: false,
  })

  const updateSetting = (key: keyof NotificationSettings, value: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const testNotification = () => {
    showNotification({
      type: "success",
      title: "Test Notification",
      message: "This is a test notification to check your settings!",
      sound: settings.sound,
      vibrate: settings.vibration,
    })
  }

  return (
    <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
          <Bell className="w-5 h-5" />
          Notification Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Notification Types */}
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900 dark:text-white">Notification Types</h3>

          <div className="flex items-center justify-between">
            <Label htmlFor="messages" className="text-gray-700 dark:text-gray-300">
              New Messages
            </Label>
            <Switch
              id="messages"
              checked={settings.messages}
              onCheckedChange={(checked) => updateSetting("messages", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="bookings" className="text-gray-700 dark:text-gray-300">
              Booking Updates
            </Label>
            <Switch
              id="bookings"
              checked={settings.bookings}
              onCheckedChange={(checked) => updateSetting("bookings", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="payments" className="text-gray-700 dark:text-gray-300">
              Payment Confirmations
            </Label>
            <Switch
              id="payments"
              checked={settings.payments}
              onCheckedChange={(checked) => updateSetting("payments", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="matches" className="text-gray-700 dark:text-gray-300">
              New Matches & Likes
            </Label>
            <Switch
              id="matches"
              checked={settings.matches}
              onCheckedChange={(checked) => updateSetting("matches", checked)}
            />
          </div>
        </div>

        {/* Notification Methods */}
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900 dark:text-white">Notification Methods</h3>

          <div className="flex items-center justify-between">
            <Label htmlFor="sound" className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              {settings.sound ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              Sound
            </Label>
            <Switch
              id="sound"
              checked={settings.sound}
              onCheckedChange={(checked) => updateSetting("sound", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="vibration" className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              {settings.vibration ? <SmartphoneNfc className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
              Vibration
            </Label>
            <Switch
              id="vibration"
              checked={settings.vibration}
              onCheckedChange={(checked) => updateSetting("vibration", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="push" className="text-gray-700 dark:text-gray-300">
              Push Notifications
            </Label>
            <Switch
              id="push"
              checked={settings.pushNotifications}
              onCheckedChange={(checked) => updateSetting("pushNotifications", checked)}
            />
          </div>
        </div>

        {/* Test Button */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
          <Button onClick={testNotification} variant="outline" className="w-full">
            <Bell className="w-4 h-4 mr-2" />
            Test Notification
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
