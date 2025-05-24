"use client"

import type React from "react"

import { useState } from "react"
import { z } from "zod"

// Validation schemas
export const offerSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(100, "Title too long"),
  description: z.string().min(20, "Description must be at least 20 characters").max(500, "Description too long"),
  price: z.number().min(50, "Minimum price is R50").max(10000, "Maximum price is R10,000"),
  location: z.string().min(3, "Location is required"),
  category: z.string().min(1, "Category is required"),
  maxGuests: z.number().min(1, "At least 1 guest").max(10, "Maximum 10 guests"),
  date: z.string().min(1, "Date is required"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
})

export const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name too long"),
  bio: z.string().max(300, "Bio too long"),
  email: z.string().email("Invalid email address"),
})

export const messageSchema = z.object({
  content: z.string().min(1, "Message cannot be empty").max(1000, "Message too long"),
})

export const bookingSchema = z.object({
  guestCount: z.number().min(1, "At least 1 guest required"),
  specialRequests: z.string().max(200, "Special requests too long").optional(),
})

// Validation hook
export function useFormValidation<T>(schema: z.ZodSchema<T>) {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isValidating, setIsValidating] = useState(false)

  const validate = (data: unknown): data is T => {
    setIsValidating(true)
    try {
      schema.parse(data)
      setErrors({})
      setIsValidating(false)
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {}
        error.errors.forEach((err) => {
          if (err.path.length > 0) {
            fieldErrors[err.path[0] as string] = err.message
          }
        })
        setErrors(fieldErrors)
      }
      setIsValidating(false)
      return false
    }
  }

  const validateField = (field: string, value: unknown) => {
    try {
      const fieldSchema = schema.shape?.[field as keyof typeof schema.shape]
      if (fieldSchema) {
        fieldSchema.parse(value)
        setErrors((prev) => ({ ...prev, [field]: "" }))
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors((prev) => ({ ...prev, [field]: error.errors[0]?.message || "Invalid value" }))
      }
    }
  }

  const clearErrors = () => setErrors({})

  return {
    errors,
    isValidating,
    validate,
    validateField,
    clearErrors,
    hasErrors: Object.keys(errors).length > 0,
  }
}

// Form field component with validation
interface ValidatedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  required?: boolean
}

export function ValidatedInput({ label, error, required, className, ...props }: ValidatedInputProps) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
          error ? "border-red-500" : "border-gray-300 dark:border-gray-600"
        } ${className}`}
        {...props}
      />
      {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
    </div>
  )
}
