"use client"

import { useState } from "react"
import { Shield, Phone, MapPin, AlertTriangle, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

interface EmergencyContact {
  id: string
  name: string
  phone: string
  relationship: string
  isPrimary: boolean
}

export function SafetyCenter() {
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([])
  const [showAddContact, setShowAddContact] = useState(false)
  const [newContact, setNewContact] = useState({
    name: "",
    phone: "",
    relationship: "",
    isPrimary: false,
  })
  const [safetySettings, setSafetySettings] = useState({
    checkInEnabled: false,
    shareLocationEnabled: false,
    safetyTips: true,
  })

  const handleAddContact = () => {
    if (newContact.name && newContact.phone && newContact.relationship) {
      const contact: EmergencyContact = {
        id: `contact_${Date.now()}`,
        ...newContact,
      }
      setEmergencyContacts((prev) => [...prev, contact])
      setNewContact({ name: "", phone: "", relationship: "", isPrimary: false })
      setShowAddContact(false)
    }
  }

  const handleRemoveContact = (contactId: string) => {
    setEmergencyContacts((prev) => prev.filter((contact) => contact.id !== contactId))
  }

  const handleSafetySettingChange = (key: string, value: boolean) => {
    setSafetySettings((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const safetyTips = [
    {
      icon: "🏛️",
      title: "Meet in Public",
      description: "Always meet your date in a public place for the first time.",
    },
    {
      icon: "👥",
      title: "Tell Someone",
      description: "Let a friend or family member know where you're going and when.",
    },
    {
      icon: "📱",
      title: "Keep Your Phone Charged",
      description: "Ensure your phone is fully charged before your date.",
    },
    {
      icon: "🚗",
      title: "Arrange Your Own Transport",
      description: "Drive yourself or use your own ride-sharing service.",
    },
    {
      icon: "🍷",
      title: "Stay Alert",
      description: "Don't leave your drink unattended and know your limits.",
    },
    {
      icon: "🆔",
      title: "Verify Identity",
      description: "Look for verified profiles and trust your instincts.",
    },
  ]

  // Calculate safety score based on settings and contacts
  const safetyScore = emergencyContacts.length > 0 ? (emergencyContacts.length >= 2 ? 95 : 85) : 75

  return (
    <div className="space-y-6">
      {/* Safety Overview */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
            <Shield className="w-5 h-5 text-green-500" />
            Safety Center
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">{safetyScore}%</div>
              <div className="text-sm text-green-700 dark:text-green-300">Safety Score</div>
            </div>
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{emergencyContacts.length}</div>
              <div className="text-sm text-blue-700 dark:text-blue-300">Emergency Contacts</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contacts */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
              <Phone className="w-5 h-5 text-red-500" />
              Emergency Contacts
            </CardTitle>
            <Button size="sm" onClick={() => setShowAddContact(true)}>
              <Plus className="w-4 h-4 mr-1" />
              Add Contact
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {emergencyContacts.length > 0 ? (
            <div className="space-y-3">
              {emergencyContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-600 rounded-lg"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900 dark:text-white">{contact.name}</span>
                      {contact.isPrimary && <Badge className="bg-red-500 text-white text-xs">Primary</Badge>}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {contact.phone} • {contact.relationship}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveContact(contact.id)}
                    className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <Phone className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <p className="text-gray-500 dark:text-gray-400 mb-4">No emergency contacts added yet</p>
              <Button onClick={() => setShowAddContact(true)}>Add Your First Contact</Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Safety Settings */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
            <Shield className="w-5 h-5 text-blue-500" />
            Safety Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
            <div>
              <Label className="text-sm font-medium text-gray-900 dark:text-white">Safety Check-ins</Label>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Automatically remind you to check in during dates
              </p>
            </div>
            <Switch
              checked={safetySettings.checkInEnabled}
              onCheckedChange={(checked) => handleSafetySettingChange("checkInEnabled", checked)}
            />
          </div>

          <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
            <div>
              <Label className="text-sm font-medium text-gray-900 dark:text-white">Share Location</Label>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Share your location with emergency contacts during dates
              </p>
            </div>
            <Switch
              checked={safetySettings.shareLocationEnabled}
              onCheckedChange={(checked) => handleSafetySettingChange("shareLocationEnabled", checked)}
            />
          </div>

          <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
            <div>
              <Label className="text-sm font-medium text-gray-900 dark:text-white">Safety Tips</Label>
              <p className="text-xs text-gray-500 dark:text-gray-400">Show safety tips and reminders</p>
            </div>
            <Switch
              checked={safetySettings.safetyTips}
              onCheckedChange={(checked) => handleSafetySettingChange("safetyTips", checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Safety Tips */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
            <AlertTriangle className="w-5 h-5 text-yellow-500" />
            Safety Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {safetyTips.map((tip, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="text-2xl">{tip.icon}</span>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">{tip.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{tip.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Emergency Actions */}
      <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-300">
            <AlertTriangle className="w-5 h-5" />
            Emergency Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
            <Phone className="w-4 h-4 mr-2" />
            Call Emergency Services (112)
          </Button>
          <Button
            variant="outline"
            className="w-full border-red-500 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <MapPin className="w-4 h-4 mr-2" />
            Share Location with Emergency Contact
          </Button>
          <Button
            variant="outline"
            className="w-full border-red-500 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <AlertTriangle className="w-4 h-4 mr-2" />
            Report Safety Concern
          </Button>
        </CardContent>
      </Card>

      {/* Add Emergency Contact Dialog */}
      <Dialog open={showAddContact} onOpenChange={setShowAddContact}>
        <DialogContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-white">Add Emergency Contact</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="text-gray-900 dark:text-white">Name</Label>
              <Input
                value={newContact.name}
                onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                placeholder="Contact name"
                className="mt-1 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <Label className="text-gray-900 dark:text-white">Phone Number</Label>
              <Input
                value={newContact.phone}
                onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                placeholder="+27123456789"
                className="mt-1 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <Label className="text-gray-900 dark:text-white">Relationship</Label>
              <Select
                value={newContact.relationship}
                onValueChange={(value) => setNewContact({ ...newContact, relationship: value })}
              >
                <SelectTrigger className="mt-1 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white">
                  <SelectValue placeholder="Select relationship" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <SelectItem value="parent" className="text-gray-900 dark:text-white">
                    Parent
                  </SelectItem>
                  <SelectItem value="sibling" className="text-gray-900 dark:text-white">
                    Sibling
                  </SelectItem>
                  <SelectItem value="friend" className="text-gray-900 dark:text-white">
                    Friend
                  </SelectItem>
                  <SelectItem value="partner" className="text-gray-900 dark:text-white">
                    Partner
                  </SelectItem>
                  <SelectItem value="other" className="text-gray-900 dark:text-white">
                    Other
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Switch
                checked={newContact.isPrimary}
                onCheckedChange={(checked) => setNewContact({ ...newContact, isPrimary: checked })}
              />
              <Label className="text-gray-900 dark:text-white">Set as primary contact</Label>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setShowAddContact(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleAddContact} className="flex-1 bg-red-500 hover:bg-red-600 text-white">
                Add Contact
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
