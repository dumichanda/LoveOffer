"use client"

import type React from "react"

import { useState } from "react"
import { Bell, Plus, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { BottomNav } from "@/components/bottom-nav"
import { useAppStore, type TimeSlot } from "@/lib/store"
import { useRouter } from "next/navigation"
import { generateId } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"

interface FormData {
  title: string
  description: string
  location: string
  priceType: "fixed" | "auction" | "negotiable"
  price: string
  images: string[]
  timeSlots: Omit<TimeSlot, "id" | "isBooked" | "bookedBy">[]
}

export default function CreateOfferPage() {
  const router = useRouter()
  const { addOffer, currentUser } = useAppStore()

  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    location: "",
    priceType: "fixed",
    price: "",
    images: [""],
    timeSlots: [{ date: "2025-05-24", startTime: "14:00", endTime: "16:00" }],
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const totalUnreadChats = useAppStore((state) => state.chats.reduce((total, chat) => total + chat.unreadCount, 0))

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addImageUrl = () => {
    if (formData.images.length < 5) {
      updateFormData("images", [...formData.images, ""])
    }
  }

  const updateImageUrl = (index: number, value: string) => {
    const newImages = [...formData.images]
    newImages[index] = value
    updateFormData("images", newImages)
  }

  const removeImageUrl = (index: number) => {
    if (formData.images.length > 1) {
      const newImages = formData.images.filter((_, i) => i !== index)
      updateFormData("images", newImages)
    }
  }

  const addTimeSlot = () => {
    if (formData.timeSlots.length < 10) {
      updateFormData("timeSlots", [...formData.timeSlots, { date: "", startTime: "", endTime: "" }])
    }
  }

  const updateTimeSlot = (index: number, field: string, value: string) => {
    const newSlots = [...formData.timeSlots]
    newSlots[index] = { ...newSlots[index], [field]: value }
    updateFormData("timeSlots", newSlots)
  }

  const removeTimeSlot = (index: number) => {
    if (formData.timeSlots.length > 1) {
      const newSlots = formData.timeSlots.filter((_, i) => i !== index)
      updateFormData("timeSlots", newSlots)
    }
  }

  const validateForm = (): boolean => {
    if (!formData.title.trim()) return false
    if (!formData.description.trim()) return false
    if (!formData.location.trim()) return false
    if (!formData.price || Number.parseFloat(formData.price) <= 0) return false
    if (formData.timeSlots.some((slot) => !slot.date || !slot.startTime || !slot.endTime)) return false
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm() || !currentUser) {
      alert("Please fill in all required fields")
      return
    }

    setIsSubmitting(true)

    try {
      const availableSlots: TimeSlot[] = formData.timeSlots.map((slot) => ({
        id: generateId("slot"),
        date: slot.date,
        startTime: slot.startTime,
        endTime: slot.endTime,
        isBooked: false,
      }))

      const newOffer = {
        title: formData.title,
        description: formData.description,
        location: formData.location,
        price: Number.parseFloat(formData.price),
        priceType: formData.priceType,
        images: formData.images.filter((img) => img.trim() !== ""),
        hostId: currentUser.id,
        host: currentUser,
        rating: 0,
        reviewCount: 0,
        availableSlots,
        status: "active" as const,
      }

      addOffer(newOffer)

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      router.push("/profile")
    } catch (error) {
      alert("Failed to create offer. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Create New Offer</h1>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            {totalUnreadChats > 0 && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold">{totalUnreadChats}</span>
              </div>
            )}
          </div>
          <ThemeToggle />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-6">
        {/* Offer Title */}
        <div className="space-y-2">
          <Label htmlFor="title" className="text-gray-900 dark:text-gray-100">
            Offer Title *
          </Label>
          <Input
            id="title"
            placeholder="e.g., Romantic Dinner by the Lake"
            className="rounded-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
            value={formData.title}
            onChange={(e) => updateFormData("title", e.target.value)}
            required
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description" className="text-gray-900 dark:text-gray-100">
            Description *
          </Label>
          <Textarea
            id="description"
            placeholder="Describe your unique date experience..."
            className="min-h-[100px] rounded-2xl bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
            value={formData.description}
            onChange={(e) => updateFormData("description", e.target.value)}
            required
          />
        </div>

        {/* Location */}
        <div className="space-y-2">
          <Label htmlFor="location" className="text-gray-900 dark:text-gray-100">
            Location *
          </Label>
          <Input
            id="location"
            placeholder="e.g., Central Park Boathouse"
            className="rounded-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
            value={formData.location}
            onChange={(e) => updateFormData("location", e.target.value)}
            required
          />
        </div>

        {/* Price Section */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-gray-900 dark:text-gray-100">Price Type</Label>
            <Select
              value={formData.priceType}
              onValueChange={(value: "fixed" | "auction" | "negotiable") => updateFormData("priceType", value)}
            >
              <SelectTrigger className="rounded-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">
                <SelectItem value="fixed" className="text-gray-900 dark:text-white">
                  Fixed Price
                </SelectItem>
                <SelectItem value="auction" className="text-gray-900 dark:text-white">
                  Auction
                </SelectItem>
                <SelectItem value="negotiable" className="text-gray-900 dark:text-white">
                  Negotiable
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="price" className="text-gray-900 dark:text-gray-100">
              Price / Starting Bid (R) *
            </Label>
            <Input
              id="price"
              type="number"
              placeholder="0"
              className="rounded-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
              value={formData.price}
              onChange={(e) => updateFormData("price", e.target.value)}
              required
              min="1"
            />
          </div>
        </div>

        {/* Offer Images */}
        <div className="space-y-3">
          <Label className="text-gray-900 dark:text-gray-100">Offer Images (URLs - max 5)</Label>
          {formData.images.map((url, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={url}
                onChange={(e) => updateImageUrl(index, e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="rounded-full flex-1 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
              />
              {formData.images.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeImageUrl(index)}
                  className="px-3 text-red-500 border-red-500"
                >
                  ×
                </Button>
              )}
            </div>
          ))}
          {formData.images.length < 5 && (
            <Button
              type="button"
              variant="outline"
              onClick={addImageUrl}
              className="rounded-full text-red-500 border-red-500"
            >
              <ImageIcon className="w-4 h-4 mr-2" />
              Add Image URL
            </Button>
          )}
        </div>

        {/* Available Slots */}
        <div className="space-y-3">
          <Label className="text-gray-900 dark:text-gray-100">Available Slots (max 10) *</Label>
          {formData.timeSlots.map((slot, index) => (
            <Card key={index} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardContent className="p-4">
                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div className="space-y-1">
                    <Label className="text-sm text-gray-900 dark:text-gray-100">Date</Label>
                    <Input
                      type="date"
                      value={slot.date}
                      onChange={(e) => updateTimeSlot(index, "date", e.target.value)}
                      className="text-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-sm text-gray-900 dark:text-gray-100">From</Label>
                    <Input
                      type="time"
                      value={slot.startTime}
                      onChange={(e) => updateTimeSlot(index, "startTime", e.target.value)}
                      className="text-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-sm text-gray-900 dark:text-gray-100">To</Label>
                    <Input
                      type="time"
                      value={slot.endTime}
                      onChange={(e) => updateTimeSlot(index, "endTime", e.target.value)}
                      className="text-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                </div>
                {formData.timeSlots.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeTimeSlot(index)}
                    className="text-red-500 border-red-500"
                  >
                    Remove Slot
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
          {formData.timeSlots.length < 10 && (
            <Button
              type="button"
              variant="outline"
              onClick={addTimeSlot}
              className="rounded-full text-red-500 border-red-500"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Slot
            </Button>
          )}
        </div>

        {/* Create Button */}
        <Button
          type="submit"
          disabled={isSubmitting || !validateForm()}
          className="w-full bg-red-500 hover:bg-red-600 rounded-full py-6 text-lg font-semibold disabled:opacity-50"
        >
          {isSubmitting ? "Creating Offer..." : "Create Offer"}
        </Button>
      </form>

      <BottomNav currentPage="create" />
    </div>
  )
}
