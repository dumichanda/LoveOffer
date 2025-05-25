import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"

// Generic validation middleware
export function validateRequest<T>(schema: z.ZodSchema<T>) {
  return async (request: NextRequest, handler: (data: T) => Promise<NextResponse>) => {
    try {
      let data: unknown

      // Handle different request methods
      if (request.method === "GET") {
        const { searchParams } = new URL(request.url)
        data = Object.fromEntries(searchParams.entries())

        // Convert string numbers to actual numbers for GET requests
        Object.keys(data as Record<string, any>).forEach((key) => {
          const value = (data as Record<string, any>)[key]
          if (typeof value === "string" && !isNaN(Number(value)) && value !== "") {
            ;(data as Record<string, any>)[key] = Number(value)
          }
        })
      } else {
        data = await request.json()
      }

      // Validate the data
      const validatedData = schema.parse(data)

      // Call the handler with validated data
      return await handler(validatedData)
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          {
            success: false,
            error: "Validation failed",
            details: error.errors.map((err) => ({
              field: err.path.join("."),
              message: err.message,
            })),
          },
          { status: 400 },
        )
      }

      if (error instanceof SyntaxError) {
        return NextResponse.json(
          {
            success: false,
            error: "Invalid JSON format",
          },
          { status: 400 },
        )
      }

      console.error("Validation middleware error:", error)
      return NextResponse.json(
        {
          success: false,
          error: "Internal server error",
        },
        { status: 500 },
      )
    }
  }
}

// Input sanitization utilities
export function sanitizeString(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, "") // Remove potential HTML tags
    .replace(/javascript:/gi, "") // Remove javascript: protocols
    .replace(/on\w+=/gi, "") // Remove event handlers
}

export function sanitizeObject<T extends Record<string, any>>(obj: T): T {
  const sanitized = { ...obj }

  Object.keys(sanitized).forEach((key) => {
    if (typeof sanitized[key] === "string") {
      sanitized[key] = sanitizeString(sanitized[key])
    } else if (typeof sanitized[key] === "object" && sanitized[key] !== null) {
      sanitized[key] = sanitizeObject(sanitized[key])
    }
  })

  return sanitized
}

// Rate limiting helper (for future Redis implementation)
export function createRateLimiter(windowMs: number, maxRequests: number) {
  const requests = new Map<string, { count: number; resetTime: number }>()

  return (identifier: string): { allowed: boolean; remaining: number; resetTime: number } => {
    const now = Date.now()
    const windowStart = now - windowMs

    // Clean up old entries
    for (const [key, value] of requests.entries()) {
      if (value.resetTime < now) {
        requests.delete(key)
      }
    }

    const current = requests.get(identifier)

    if (!current || current.resetTime < now) {
      // New window
      const resetTime = now + windowMs
      requests.set(identifier, { count: 1, resetTime })
      return { allowed: true, remaining: maxRequests - 1, resetTime }
    }

    if (current.count >= maxRequests) {
      return { allowed: false, remaining: 0, resetTime: current.resetTime }
    }

    current.count++
    requests.set(identifier, current)
    return { allowed: true, remaining: maxRequests - current.count, resetTime: current.resetTime }
  }
}

// Basic rate limiter instances
export const apiRateLimiter = createRateLimiter(60 * 1000, 100) // 100 requests per minute
export const authRateLimiter = createRateLimiter(15 * 60 * 1000, 5) // 5 requests per 15 minutes
export const uploadRateLimiter = createRateLimiter(60 * 1000, 10) // 10 uploads per minute
