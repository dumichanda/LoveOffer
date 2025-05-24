"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Save, RotateCcw, Mail, Bell, MessageSquare, Send, TestTube, CheckCircle, AlertCircle } from "lucide-react"

export function NotificationSettings() {
  const [settings, setSettings] = useState({
    // Email Configuration
    emailEnabled: true,
    smtpHost: "smtp.gmail.com",
    smtpPort: 587,
    smtpUsername: "noreply@datecraft.com",
    smtpPassword: "",
    fromEmail: "noreply@datecraft.com",
    fromName: "Datecraft",

    // Push Notifications
    pushEnabled: true,
    firebaseApiKey: "AIzaSyC...",

    // SMS Configuration
    smsEnabled: false,
    smsProvider: "twilio",
    twilioAccountSid: "",
    twilioAuthToken: "",
    twilioPhoneNumber: "",

    clickatellApiKey: "",
    bulkSmsUsername: "",
    bulkSmsPassword: "",
  })

  const [templates, setTemplates] = useState({
    welcomeEmail: {
      subject: "Welcome to Datecraft! 🎉",
      content:
        "Hi {{name}},\n\nWelcome to Datecraft! We're excited to have you join our community of amazing people looking for meaningful connections.\n\nGet started by:\n- Completing your profile\n- Browsing exciting date offers\n- Creating your first offer\n\nHappy dating!\nThe Datecraft Team",
    },
    bookingConfirmation: {
      subject: "Booking Confirmed - {{offerTitle}}",
      content:
        'Hi {{guestName}},\n\nYour booking for "{{offerTitle}}" has been confirmed!\n\nDate: {{date}}\nTime: {{time}}\nHost: {{hostName}}\nLocation: {{location}}\n\nWe hope you have an amazing time!\n\nBest regards,\nDatecraft',
    },
    newMessage: {
      subject: "New message from {{senderName}}",
      content:
        'Hi {{recipientName}},\n\nYou have a new message from {{senderName}}:\n\n"{{messagePreview}}"\n\nReply now to keep the conversation going!\n\nDatecraft',
    },
  })

  const [hasChanges, setHasChanges] = useState(false)
  const [saving, setSaving] = useState(false)
  const [testResults, setTestResults] = useState<Record<string, boolean>>({})

  const handleSettingsChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
    setHasChanges(true)
  }

  const handleTemplateChange = (templateKey: string, field: string, value: string) => {
    setTemplates((prev) => ({
      ...prev,
      [templateKey]: { ...prev[templateKey as keyof typeof prev], [field]: value },
    }))
    setHasChanges(true)
  }

  const handleSave = async () => {
    setSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setSaving(false)
    setHasChanges(false)
  }

  const testConnection = async (service: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setTestResults((prev) => ({ ...prev, [service]: Math.random() > 0.2 }))
  }

  const sendTestNotification = async (type: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    alert(`Test ${type} sent successfully!`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Notification Settings</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Configure email and push notification templates</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setHasChanges(false)} disabled={!hasChanges}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button onClick={handleSave} disabled={!hasChanges || saving}>
            <Save className="w-4 h-4 mr-2" />
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      {/* Email Configuration */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Email Configuration
              {settings.emailEnabled && <Badge variant="default">Enabled</Badge>}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => testConnection("email")}
                disabled={!settings.emailEnabled}
              >
                <TestTube className="w-4 h-4 mr-2" />
                Test Connection
              </Button>
              {testResults.email !== undefined &&
                (testResults.email ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-500" />
                ))}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Enable Email Notifications</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">Send email notifications to users</p>
            </div>
            <Switch
              checked={settings.emailEnabled}
              onCheckedChange={(checked) => handleSettingsChange("emailEnabled", checked)}
            />
          </div>

          {settings.emailEnabled && (
            <>
              <Separator />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="smtpHost">SMTP Host</Label>
                  <Input
                    id="smtpHost"
                    value={settings.smtpHost}
                    onChange={(e) => handleSettingsChange("smtpHost", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="smtpPort">SMTP Port</Label>
                  <Input
                    id="smtpPort"
                    type="number"
                    value={settings.smtpPort}
                    onChange={(e) => handleSettingsChange("smtpPort", Number.parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="smtpUsername">SMTP Username</Label>
                  <Input
                    id="smtpUsername"
                    value={settings.smtpUsername}
                    onChange={(e) => handleSettingsChange("smtpUsername", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="smtpPassword">SMTP Password</Label>
                  <Input
                    id="smtpPassword"
                    type="password"
                    value={settings.smtpPassword}
                    onChange={(e) => handleSettingsChange("smtpPassword", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="fromEmail">From Email</Label>
                  <Input
                    id="fromEmail"
                    type="email"
                    value={settings.fromEmail}
                    onChange={(e) => handleSettingsChange("fromEmail", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="fromName">From Name</Label>
                  <Input
                    id="fromName"
                    value={settings.fromName}
                    onChange={(e) => handleSettingsChange("fromName", e.target.value)}
                  />
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Push Notifications */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Push Notifications
              {settings.pushEnabled && <Badge variant="default">Enabled</Badge>}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => testConnection("push")}
                disabled={!settings.pushEnabled}
              >
                <TestTube className="w-4 h-4 mr-2" />
                Test Connection
              </Button>
              {testResults.push !== undefined &&
                (testResults.push ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-500" />
                ))}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Enable Push Notifications</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">Send push notifications to mobile apps</p>
            </div>
            <Switch
              checked={settings.pushEnabled}
              onCheckedChange={(checked) => handleSettingsChange("pushEnabled", checked)}
            />
          </div>

          {settings.pushEnabled && (
            <>
              <Separator />
              <div>
                <Label htmlFor="firebaseApiKey">Firebase API Key</Label>
                <Input
                  id="firebaseApiKey"
                  type="password"
                  value={settings.firebaseApiKey}
                  onChange={(e) => handleSettingsChange("firebaseApiKey", e.target.value)}
                />
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* SMS Configuration */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              SMS Configuration
              {settings.smsEnabled && <Badge variant="default">Enabled</Badge>}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => testConnection("sms")} disabled={!settings.smsEnabled}>
                <TestTube className="w-4 h-4 mr-2" />
                Test Connection
              </Button>
              {testResults.sms !== undefined &&
                (testResults.sms ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-500" />
                ))}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Enable SMS Notifications</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">Send SMS notifications to users</p>
            </div>
            <Switch
              checked={settings.smsEnabled}
              onCheckedChange={(checked) => handleSettingsChange("smsEnabled", checked)}
            />
          </div>

          {settings.smsEnabled && (
            <>
              <Separator />
              <div>
                <Label htmlFor="smsProvider">SMS Provider</Label>
                <select
                  id="smsProvider"
                  value={settings.smsProvider}
                  onChange={(e) => handleSettingsChange("smsProvider", e.target.value)}
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                >
                  <option value="twilio">Twilio</option>
                  <option value="clickatell">Clickatell</option>
                  <option value="bulksms">BulkSMS</option>
                </select>
              </div>

              {settings.smsProvider === "twilio" && (
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="twilioAccountSid">Twilio Account SID</Label>
                    <Input
                      id="twilioAccountSid"
                      value={settings.twilioAccountSid}
                      onChange={(e) => handleSettingsChange("twilioAccountSid", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="twilioAuthToken">Twilio Auth Token</Label>
                    <Input
                      id="twilioAuthToken"
                      type="password"
                      value={settings.twilioAuthToken}
                      onChange={(e) => handleSettingsChange("twilioAuthToken", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="twilioPhoneNumber">Twilio Phone Number</Label>
                    <Input
                      id="twilioPhoneNumber"
                      value={settings.twilioPhoneNumber}
                      onChange={(e) => handleSettingsChange("twilioPhoneNumber", e.target.value)}
                      placeholder="+1234567890"
                    />
                  </div>
                </div>
              )}

              {settings.smsProvider === "clickatell" && (
                <div>
                  <Label htmlFor="clickatellApiKey">Clickatell API Key</Label>
                  <Input
                    id="clickatellApiKey"
                    type="password"
                    value={settings.clickatellApiKey}
                    onChange={(e) => handleSettingsChange("clickatellApiKey", e.target.value)}
                  />
                </div>
              )}

              {settings.smsProvider === "bulksms" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="bulkSmsUsername">BulkSMS Username</Label>
                    <Input
                      id="bulkSmsUsername"
                      value={settings.bulkSmsUsername}
                      onChange={(e) => handleSettingsChange("bulkSmsUsername", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bulkSmsPassword">BulkSMS Password</Label>
                    <Input
                      id="bulkSmsPassword"
                      type="password"
                      value={settings.bulkSmsPassword}
                      onChange={(e) => handleSettingsChange("bulkSmsPassword", e.target.value)}
                    />
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Email Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Email Templates</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Welcome Email */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">Welcome Email</Label>
              <Button variant="outline" size="sm" onClick={() => sendTestNotification("welcome email")}>
                <Send className="w-4 h-4 mr-2" />
                Send Test
              </Button>
            </div>
            <div>
              <Label htmlFor="welcomeSubject">Subject</Label>
              <Input
                id="welcomeSubject"
                value={templates.welcomeEmail.subject}
                onChange={(e) => handleTemplateChange("welcomeEmail", "subject", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="welcomeContent">Content</Label>
              <Textarea
                id="welcomeContent"
                value={templates.welcomeEmail.content}
                onChange={(e) => handleTemplateChange("welcomeEmail", "content", e.target.value)}
                rows={6}
              />
              <p className="text-xs text-gray-500 mt-1">Available variables: {`{{name}}, {{email}}`}</p>
            </div>
          </div>

          <Separator />

          {/* Booking Confirmation */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">Booking Confirmation</Label>
              <Button variant="outline" size="sm" onClick={() => sendTestNotification("booking confirmation")}>
                <Send className="w-4 h-4 mr-2" />
                Send Test
              </Button>
            </div>
            <div>
              <Label htmlFor="bookingSubject">Subject</Label>
              <Input
                id="bookingSubject"
                value={templates.bookingConfirmation.subject}
                onChange={(e) => handleTemplateChange("bookingConfirmation", "subject", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="bookingContent">Content</Label>
              <Textarea
                id="bookingContent"
                value={templates.bookingConfirmation.content}
                onChange={(e) => handleTemplateChange("bookingConfirmation", "content", e.target.value)}
                rows={6}
              />
              <p className="text-xs text-gray-500 mt-1">
                Available variables: {`{{guestName}}, {{offerTitle}}, {{date}}, {{time}}, {{hostName}}, {{location}}`}
              </p>
            </div>
          </div>

          <Separator />

          {/* New Message */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">New Message Notification</Label>
              <Button variant="outline" size="sm" onClick={() => sendTestNotification("message notification")}>
                <Send className="w-4 h-4 mr-2" />
                Send Test
              </Button>
            </div>
            <div>
              <Label htmlFor="messageSubject">Subject</Label>
              <Input
                id="messageSubject"
                value={templates.newMessage.subject}
                onChange={(e) => handleTemplateChange("newMessage", "subject", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="messageContent">Content</Label>
              <Textarea
                id="messageContent"
                value={templates.newMessage.content}
                onChange={(e) => handleTemplateChange("newMessage", "content", e.target.value)}
                rows={6}
              />
              <p className="text-xs text-gray-500 mt-1">
                Available variables: {`{{recipientName}}, {{senderName}}, {{messagePreview}}`}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
