"use client"

import type React from "react"

import { useState } from "react"
import { Bell, Plus, ImageIcon, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { BottomNav } from "@/components/bottom-nav"
import { useAppStore, type TimeSlot } from "@/lib/store"
import { useRouter } from "next/navigation"
import { generateId } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"
import { createOfferSchema, type CreateOffer } from "@/lib/validations"
import { sanitizeObject } from "@/lib/validation-middleware"

interface FormData {
  title: string
  description: string
  location: string
  priceType: "fixed" | "auction" | "negotiable"
  price: string
  images: string[]
  timeSlots: Omit<TimeSlot, "id" | "isBooked" | "bookedBy">[]
  category: string
  maxGuests: string
}

interface ValidationError {
  field: string
  message: string
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
    category: "",
    maxGuests: "2",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([])

  const totalUnreadChats = useAppStore((state) => state.chats.reduce((total, chat) => total + chat.unreadCount, 0))

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Clear validation errors for this field
    setValidationErrors((prev) => prev.filter((error) => error.field !== field))
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
    try {
      // Prepare data for validation
      const dataToValidate: CreateOffer = {
        title: formData.title,
        description: formData.description,
        location: formData.location,
        price: Number.parseFloat(formData.price),
        priceType: formData.priceType,
        images: formData.images.filter((img) => img.trim() !== ""),
        timeSlots: formData.timeSlots,
        category: formData.category,
        maxGuests: Number.parseInt(formData.maxGuests),
      }

      // Sanitize the data
      const sanitizedData = sanitizeObject(dataToValidate)

      // Validate with Zod
      createOfferSchema.parse(sanitizedData)

      setValidationErrors([])
      return true
    } catch (error: any) {
      if (error.errors) {
        const errors: ValidationError[] = error.errors.map((err: any) => ({
          field: err.path.join("."),
          message: err.message,
        }))
        setValidationErrors(errors)
      }
      return false
    }
  }

  const getFieldError = (fieldName: string): string | undefined => {
    return validationErrors.find((error) => error.field === fieldName)?.message
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm() || !currentUser) {
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
        title: formData.title.trim(),
        description: formData.description.trim(),
        location: formData.location.trim(),
        price: Number.parseFloat(formData.price),
        priceType: formData.priceType,
        images: formData.images.filter((img) => img.trim() !== ""),
        hostId: currentUser.id,
        host: currentUser,
        rating: 0,
        reviewCount: 0,
        availableSlots,
        status: "active" as const,
        category: formData.category.trim(),
        maxGuests: Number.parseInt(formData.maxGuests),
      }

      addOffer(newOffer)

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      router.push("/profile")
    } catch (error) {
      console.error("Error creating offer:", error)
      setValidationErrors([{ field: "general", message: "Failed to create offer. Please try again." }])
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
        {/* General Error Alert */}
        {getFieldError("general") && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{getFieldError("general")}</AlertDescription>
          </Alert>
        )}

        {/* Offer Title */}
        <div className="space-y-2">
          <Label htmlFor="title" className="text-gray-900 dark:text-gray-100">
            Offer Title *
          </Label>
          <Input
            id="title"
            placeholder="e.g., Romantic Dinner by the Lake"
            className={`rounded-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white ${
              getFieldError("title") ? "border-red-500" : ""
            }`}
            value={formData.title}
            onChange={(e) => updateFormData("title", e.target.value)}
            required
          />
          {getFieldError("title") && <p className="text-sm text-red-600 dark:text-red-400">{getFieldError("title")}</p>}
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description" className="text-gray-900 dark:text-gray-100">
            Description *
          </Label>
          <Textarea
            id="description"
            placeholder="Describe your unique date experience..."
            className={`min-h-[100px] rounded-2xl bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white ${
              getFieldError("description") ? "border-red-500" : ""
            }`}
            value={formData.description}
            onChange={(e) => updateFormData("description", e.target.value)}
            required
          />
          {getFieldError("description") && (
            <p className="text-sm text-red-600 dark:text-red-400">{getFieldError("description")}</p>
          )}
        </div>

        {/* Location */}
        <div className="space-y-2">
          <Label htmlFor="location" className="text-gray-900 dark:text-gray-100">
            Location *
          </Label>
          <Input
            id="location"
            placeholder="e.g., Central Park Boathouse"
            className={`rounded-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white ${
              getFieldError("location") ? "border-red-500" : ""
            }`}
            value={formData.location}
            onChange={(e) => updateFormData("location", e.target.value)}
            required
          />
          {getFieldError("location") && (
            <p className="text-sm text-red-600 dark:text-red-400">{getFieldError("location")}</p>
          )}
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label htmlFor="category" className="text-gray-900 dark:text-gray-100">
            Category *
          </Label>
          <Select value={formData.category} onValueChange={(value) => updateFormData("category", value)}>
            <SelectTrigger
              className={`rounded-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white ${
                getFieldError("category") ? "border-red-500" : ""
              }`}
            >
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">
              <SelectItem value="romantic" className="text-gray-900 dark:text-white">
                Romantic
              </SelectItem>
              <SelectItem value="adventure" className="text-gray-900 dark:text-white">
                Adventure
              </SelectItem>
              <SelectItem value="cultural" className="text-gray-900 dark:text-white">
                Cultural
              </SelectItem>
              <SelectItem value="food" className="text-gray-900 dark:text-white">
                Food & Dining
              </SelectItem>
              <SelectItem value="outdoor" className="text-gray-900 dark:text-white">
                Outdoor
              </SelectItem>
              <SelectItem value="entertainment" className="text-gray-900 dark:text-white">
                Entertainment
              </SelectItem>
            </SelectContent>
          </Select>
          {getFieldError("category") && (
            <p className="text-sm text-red-600 dark:text-red-400">{getFieldError("category")}</p>
          )}
        </div>

        {/* Price Section */}
        <div className="grid grid-cols-3 gap-4">
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
              Price (R) *
            </Label>
            <Input
              id="price"
              type="number"
              placeholder="0"
              className={`rounded-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white ${
                getFieldError("price") ? "border-red-500" : ""
              }`}
              value={formData.price}
              onChange={(e) => updateFormData("price", e.target.value)}
              required
              min="10"
              max="50000"
              step="0.01"
            />
            {getFieldError("price") && (
              <p className="text-sm text-red-600 dark:text-red-400">{getFieldError("price")}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="maxGuests" className="text-gray-900 dark:text-gray-100">
              Max Guests *
            </Label>
            <Input
              id="maxGuests"
              type="number"
              placeholder="2"
              className={`rounded-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white ${
                getFieldError("maxGuests") ? "border-red-500" : ""
              }`}
              value={formData.maxGuests}
              onChange={(e) => updateFormData("maxGuests", e.target.value)}
              required
              min="1"
              max="20"
            />
            {getFieldError("maxGuests") && (
              <p className="text-sm text-red-600 dark:text-red-400">{getFieldError("maxGuests")}</p>
            )}
          </div>
        </div>

        {/* Offer Images */}
        <div className="space-y-3">
          <Label className="text-gray-900 dark:text-gray-100">Offer Images (URLs - max 5) *</Label>
          {formData.images.map((url, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={url}
                onChange={(e) => updateImageUrl(index, e.target.value)}
                placeholder="https://example.com/image.jpg"
                className={`rounded-full flex-1 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white ${
                  getFieldError(`images.${index}`) ? "border-red-500" : ""
                }`}
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
          {getFieldError("images") && (
            <p className="text-sm text-red-600 dark:text-red-400">{getFieldError("images")}</p>
          )}
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
                      className={`text-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white ${
                        getFieldError(`timeSlots.${index}.date`) ? "border-red-500" : ""
                      }`}
                      required
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-sm text-gray-900 dark:text-gray-100">From</Label>
                    <Input
                      type="time"
                      value={slot.startTime}
                      onChange={(e) => updateTimeSlot(index, "startTime", e.target.value)}
                      className={`text-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white ${
                        getFieldError(`timeSlots.${index}.startTime`) ? "border-red-500" : ""
                      }`}
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-sm text-gray-900 dark:text-gray-100">To</Label>
                    <Input
                      type="time"
                      value={slot.endTime}
                      onChange={(e) => updateTimeSlot(index, "endTime", e.target.value)}
                      className={`text-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white ${
                        getFieldError(`timeSlots.${index}.endTime`) ? "border-red-500" : ""
                      }`}
                      required
                    />
                  </div>
                </div>
                {getFieldError(`timeSlots.${index}`) && (
                  <p className="text-sm text-red-600 dark:text-red-400 mb-2">{getFieldError(`timeSlots.${index}`)}</p>
                )}
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
          {getFieldError("timeSlots") && (
            <p className="text-sm text-red-600 dark:text-red-400">{getFieldError("timeSlots")}</p>
          )}
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
          disabled={isSubmitting}
          className="w-full bg-red-500 hover:bg-red-600 rounded-full py-6 text-lg font-semibold disabled:opacity-50"
        >
          {isSubmitting ? "Creating Offer..." : "Create Offer"}
        </Button>
      </form>

      <BottomNav currentPage="create" />
    </div>
  )
}
