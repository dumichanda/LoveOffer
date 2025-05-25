import { z } from "zod"

// User validation schemas
export const userSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces")
    .trim(),
  email: z
    .string()
    .email("Invalid email address")
    .max(255, "Email must be less than 255 characters")
    .toLowerCase()
    .trim(),
  bio: z
    .string()
    .max(500, "Bio must be less than 500 characters")
    .optional()
    .transform((val) => val?.trim()),
  age: z
    .number()
    .int("Age must be a whole number")
    .min(18, "Must be at least 18 years old")
    .max(100, "Age must be less than 100")
    .optional(),
  location: z
    .string()
    .min(2, "Location must be at least 2 characters")
    .max(100, "Location must be less than 100 characters")
    .trim()
    .optional(),
})

// Offer validation schemas
export const offerSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(100, "Title must be less than 100 characters")
    .trim(),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters")
    .max(1000, "Description must be less than 1000 characters")
    .trim(),
  location: z
    .string()
    .min(3, "Location must be at least 3 characters")
    .max(100, "Location must be less than 100 characters")
    .trim(),
  price: z
    .number()
    .positive("Price must be positive")
    .min(10, "Minimum price is R10")
    .max(50000, "Maximum price is R50,000")
    .multipleOf(0.01, "Price can have at most 2 decimal places"),
  priceType: z.enum(["fixed", "auction", "negotiable"], {
    errorMap: () => ({ message: "Price type must be fixed, auction, or negotiable" }),
  }),
  images: z
    .array(
      z
        .string()
        .url("Invalid image URL")
        .regex(/\.(jpg|jpeg|png|webp|gif)$/i, "Image must be a valid image file"),
    )
    .min(1, "At least one image is required")
    .max(5, "Maximum 5 images allowed"),
  maxGuests: z
    .number()
    .int("Guest count must be a whole number")
    .min(1, "At least 1 guest required")
    .max(20, "Maximum 20 guests allowed"),
  category: z.string().min(1, "Category is required").max(50, "Category must be less than 50 characters"),
})

// Time slot validation
export const timeSlotSchema = z
  .object({
    date: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format")
      .refine((date) => {
        const selectedDate = new Date(date)
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        return selectedDate >= today
      }, "Date must be today or in the future"),
    startTime: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, "Start time must be in HH:MM format"),
    endTime: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, "End time must be in HH:MM format"),
  })
  .refine(
    (data) => {
      const start = new Date(`2000-01-01T${data.startTime}:00`)
      const end = new Date(`2000-01-01T${data.endTime}:00`)
      return end > start
    },
    {
      message: "End time must be after start time",
      path: ["endTime"],
    },
  )
  .refine(
    (data) => {
      const start = new Date(`2000-01-01T${data.startTime}:00`)
      const end = new Date(`2000-01-01T${data.endTime}:00`)
      const diffHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60)
      return diffHours >= 1 && diffHours <= 12
    },
    {
      message: "Duration must be between 1 and 12 hours",
      path: ["endTime"],
    },
  )

// Complete offer with time slots
export const createOfferSchema = offerSchema.extend({
  timeSlots: z
    .array(timeSlotSchema)
    .min(1, "At least one time slot is required")
    .max(10, "Maximum 10 time slots allowed"),
})

// Message validation
export const messageSchema = z.object({
  content: z.string().min(1, "Message cannot be empty").max(1000, "Message must be less than 1000 characters").trim(),
  chatId: z.string().min(1, "Chat ID is required"),
})

// Booking validation
export const bookingSchema = z.object({
  offerId: z.string().min(1, "Offer ID is required"),
  timeSlotId: z.string().min(1, "Time slot ID is required"),
  guestCount: z
    .number()
    .int("Guest count must be a whole number")
    .min(1, "At least 1 guest required")
    .max(20, "Maximum 20 guests allowed"),
  specialRequests: z
    .string()
    .max(500, "Special requests must be less than 500 characters")
    .optional()
    .transform((val) => val?.trim()),
})

// Search and filter validation
export const searchSchema = z
  .object({
    query: z.string().max(100, "Search query must be less than 100 characters").trim().optional(),
    location: z.string().max(100, "Location must be less than 100 characters").trim().optional(),
    minPrice: z.number().min(0, "Minimum price cannot be negative").optional(),
    maxPrice: z.number().min(0, "Maximum price cannot be negative").optional(),
    category: z.string().max(50, "Category must be less than 50 characters").optional(),
    date: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format")
      .optional(),
  })
  .refine(
    (data) => {
      if (data.minPrice && data.maxPrice) {
        return data.minPrice <= data.maxPrice
      }
      return true
    },
    {
      message: "Minimum price must be less than or equal to maximum price",
      path: ["maxPrice"],
    },
  )

// API response schemas
export const apiResponseSchema = z.object({
  success: z.boolean(),
  message: z.string().optional(),
  data: z.any().optional(),
  error: z.string().optional(),
})

// Pagination schema
export const paginationSchema = z.object({
  page: z.number().int("Page must be a whole number").min(1, "Page must be at least 1").default(1),
  limit: z
    .number()
    .int("Limit must be a whole number")
    .min(1, "Limit must be at least 1")
    .max(100, "Limit cannot exceed 100")
    .default(10),
})

// Export types
export type User = z.infer<typeof userSchema>
export type Offer = z.infer<typeof offerSchema>
export type CreateOffer = z.infer<typeof createOfferSchema>
export type TimeSlot = z.infer<typeof timeSlotSchema>
export type Message = z.infer<typeof messageSchema>
export type Booking = z.infer<typeof bookingSchema>
export type SearchParams = z.infer<typeof searchSchema>
export type ApiResponse = z.infer<typeof apiResponseSchema>
export type PaginationParams = z.infer<typeof paginationSchema>
