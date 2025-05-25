import { NextResponse } from "next/server"
import { ZodError } from "zod"

// Error types
export class AppError extends Error {
  public readonly statusCode: number
  public readonly isOperational: boolean

  constructor(message: string, statusCode = 500, isOperational = true) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = isOperational

    Error.captureStackTrace(this, this.constructor)
  }
}

export class ValidationError extends AppError {
  constructor(message = "Validation failed") {
    super(message, 400)
  }
}

export class NotFoundError extends AppError {
  constructor(resource = "Resource") {
    super(`${resource} not found`, 404)
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized access") {
    super(message, 401)
  }
}

export class ForbiddenError extends AppError {
  constructor(message = "Access forbidden") {
    super(message, 403)
  }
}

export class ConflictError extends AppError {
  constructor(message = "Resource conflict") {
    super(message, 409)
  }
}

export class RateLimitError extends AppError {
  constructor(message = "Rate limit exceeded") {
    super(message, 429)
  }
}

// Error response formatter
export interface ErrorResponse {
  success: false
  error: string
  message: string
  statusCode: number
  timestamp: string
  path?: string
  details?: any
  errorId?: string
}

export function formatErrorResponse(error: Error, path?: string, includeStack = false): ErrorResponse {
  const errorId = `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

  let statusCode = 500
  let message = "Internal server error"

  if (error instanceof AppError) {
    statusCode = error.statusCode
    message = error.message
  } else if (error instanceof ZodError) {
    statusCode = 400
    message = "Validation failed"
  }

  const response: ErrorResponse = {
    success: false,
    error: error.constructor.name,
    message,
    statusCode,
    timestamp: new Date().toISOString(),
    errorId,
  }

  if (path) {
    response.path = path
  }

  if (error instanceof ZodError) {
    response.details = error.errors.map((err) => ({
      field: err.path.join("."),
      message: err.message,
      code: err.code,
    }))
  }

  // Include stack trace in development
  if (includeStack && process.env.NODE_ENV === "development") {
    response.details = {
      ...response.details,
      stack: error.stack,
    }
  }

  return response
}

// API error handler
export function handleApiError(error: Error, request?: Request): NextResponse {
  const path = request?.url

  // Log error
  console.error("API Error:", {
    error: error.message,
    stack: error.stack,
    path,
    timestamp: new Date().toISOString(),
  })

  const errorResponse = formatErrorResponse(error, path, process.env.NODE_ENV === "development")

  return NextResponse.json(errorResponse, { status: errorResponse.statusCode })
}

// Async error wrapper for API routes
export function asyncHandler(handler: (request: Request, context?: any) => Promise<NextResponse>) {
  return async (request: Request, context?: any): Promise<NextResponse> => {
    try {
      return await handler(request, context)
    } catch (error) {
      return handleApiError(error instanceof Error ? error : new Error("Unknown error"), request)
    }
  }
}

// Client-side error handler
export function handleClientError(error: Error, context?: string): void {
  console.error(`Client Error${context ? ` in ${context}` : ""}:`, error)

  // Log to external service in production
  if (process.env.NODE_ENV === "production") {
    // TODO: Send to error tracking service
    const errorData = {
      message: error.message,
      stack: error.stack,
      context,
      url: window.location.href,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
    }
    console.error("Client error logged:", errorData)
  }
}

// React error handler hook
export function useErrorHandler() {
  const handleError = (error: Error, context?: string) => {
    handleClientError(error, context)

    // Show user-friendly error message
    // This could integrate with a toast system
    console.error("Error occurred:", error.message)
  }

  return { handleError }
}

// Retry utility
export async function withRetry<T>(operation: () => Promise<T>, maxRetries = 3, delay = 1000): Promise<T> {
  let lastError: Error

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation()
    } catch (error) {
      lastError = error instanceof Error ? error : new Error("Unknown error")

      if (attempt === maxRetries) {
        throw lastError
      }

      // Wait before retrying
      await new Promise((resolve) => setTimeout(resolve, delay * attempt))
    }
  }

  throw lastError!
}

// Safe async operation wrapper
export async function safeAsync<T>(
  operation: () => Promise<T>,
  fallback?: T,
): Promise<{ data: T | null; error: Error | null }> {
  try {
    const data = await operation()
    return { data, error: null }
  } catch (error) {
    const err = error instanceof Error ? error : new Error("Unknown error")
    return { data: fallback || null, error: err }
  }
}
