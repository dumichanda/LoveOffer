"use client"

import { useState } from "react"
import { X, Send, Users, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface EmailModalProps {
  isOpen: boolean
  onClose: () => void
  selectedUsers: any[]
}

export function EmailModal({ isOpen, onClose, selectedUsers }: EmailModalProps) {
  const [emailData, setEmailData] = useState({
    subject: "",
    message: "",
    template: "custom",
  })

  if (!isOpen) return null

  const templates = [
    { id: "welcome", name: "Welcome Message", subject: "Welcome to DateCraft!" },
    { id: "promotion", name: "Promotion", subject: "Special Offer Just for You!" },
    { id: "update", name: "Platform Update", subject: "Important Platform Updates" },
    { id: "reminder", name: "Activity Reminder", subject: "We Miss You!" },
    { id: "custom", name: "Custom Message", subject: "" },
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto dark:bg-gray-800">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold dark:text-white">
            Send Email to {selectedUsers.length} Users
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Recipients */}
          <div>
            <label className="block text-sm font-medium mb-2 dark:text-white">Recipients</label>
            <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-md dark:bg-gray-700">
              {selectedUsers.slice(0, 5).map((user) => (
                <Badge key={user.id} variant="secondary">
                  {user.name}
                </Badge>
              ))}
              {selectedUsers.length > 5 && <Badge variant="outline">+{selectedUsers.length - 5} more</Badge>}
            </div>
          </div>

          {/* Template Selection */}
          <div>
            <label className="block text-sm font-medium mb-2 dark:text-white">Email Template</label>
            <select
              value={emailData.template}
              onChange={(e) => {
                const template = templates.find((t) => t.id === e.target.value)
                setEmailData({
                  ...emailData,
                  template: e.target.value,
                  subject: template?.subject || emailData.subject,
                })
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              {templates.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))}
            </select>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium mb-2 dark:text-white">Subject</label>
            <input
              type="text"
              value={emailData.subject}
              onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
              placeholder="Enter email subject..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium mb-2 dark:text-white">Message</label>
            <textarea
              value={emailData.message}
              onChange={(e) => setEmailData({ ...emailData, message: e.target.value })}
              placeholder="Enter your message..."
              rows={8}
              className="w-full px-3 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button className="flex-1">
              <Send className="w-4 h-4 mr-2" />
              Send Email
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

interface SuspendModalProps {
  isOpen: boolean
  onClose: () => void
  selectedUsers: any[]
  action: "suspend" | "activate"
}

export function SuspendModal({ isOpen, onClose, selectedUsers, action }: SuspendModalProps) {
  const [reason, setReason] = useState("")

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 dark:text-white">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            {action === "suspend" ? "Suspend Users" : "Activate Users"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {action === "suspend"
              ? `Are you sure you want to suspend ${selectedUsers.length} user(s)? They will lose access to the platform.`
              : `Are you sure you want to activate ${selectedUsers.length} user(s)? They will regain full platform access.`}
          </p>

          {action === "suspend" && (
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-white">Reason for Suspension</label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Enter reason for suspension..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
          )}

          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button variant={action === "suspend" ? "destructive" : "default"} className="flex-1">
              <Users className="w-4 h-4 mr-2" />
              {action === "suspend" ? "Suspend" : "Activate"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
