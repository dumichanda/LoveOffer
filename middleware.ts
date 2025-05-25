import { type NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

// Rate limiting storage (in production, use Redis)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

function getRateLimitKey(request: NextRequest): string {
  // Use IP address or user ID for rate limiting
  const forwarded = request.headers.get("x-forwarded-for")
  const ip = forwarded ? forwarded.split(",")[0] : request.ip || "unknown"
  return ip
}

function isRateLimited(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(key)

  if (!record || record.resetTime < now) {
    // New window or expired record
    rateLimitMap.set(key, { count: 1, resetTime: now + windowMs })
    return false
  }

  if (record.count >= limit) {
    return true
  }

  record.count++
  return false
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip middleware for admin routes
  if (pathname.startsWith("/admin")) {
    return NextResponse.next()
  }

  // Security headers for all requests
  const response = NextResponse.next()

  // Add security headers
  response.headers.set("X-DNS-Prefetch-Control", "on")
  response.headers.set("X-Frame-Options", "DENY")
  response.headers.set("X-Content-Type-Options", "nosniff")

  // Rate limiting for API routes
  if (pathname.startsWith("/api/")) {
    const rateLimitKey = getRateLimitKey(request)

    // Different limits for different endpoints
    let limit = 100 // Default: 100 requests per minute
    let windowMs = 60 * 1000 // 1 minute

    if (pathname.startsWith("/api/auth/")) {
      limit = 10 // Auth endpoints: 10 requests per 5 minutes
      windowMs = 5 * 60 * 1000
    } else if (pathname.includes("/upload")) {
      limit = 5 // Upload endpoints: 5 requests per minute
      windowMs = 60 * 1000
    }

    if (isRateLimited(rateLimitKey, limit, windowMs)) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many requests. Please try again later.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": "60",
            "X-RateLimit-Limit": limit.toString(),
            "X-RateLimit-Remaining": "0",
          },
        },
      )
    }

    // Add rate limit headers
    const record = rateLimitMap.get(rateLimitKey)
    if (record) {
      response.headers.set("X-RateLimit-Limit", limit.toString())
      response.headers.set("X-RateLimit-Remaining", Math.max(0, limit - record.count).toString())
      response.headers.set("X-RateLimit-Reset", record.resetTime.toString())
    }
  }

  // Protect admin routes
  if (pathname.startsWith("/admin")) {
    const token = await getToken({ req: request })

    if (!token) {
      return NextResponse.redirect(new URL("/auth/signin", request.url))
    }

    // Check if user is admin (you'll need to implement this logic)
    if (token.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", request.url))
    }
  }

  // Protect API routes that require authentication
  const protectedApiRoutes = ["/api/offers", "/api/bookings", "/api/messages"]
  const isProtectedApi = protectedApiRoutes.some((route) => pathname.startsWith(route))

  if (isProtectedApi && request.method !== "GET") {
    const token = await getToken({ req: request })

    if (!token) {
      return NextResponse.json({ success: false, error: "Authentication required" }, { status: 401 })
    }
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - admin (admin routes)
     */
    "/((?!_next/static|_next/image|favicon.ico|public/|admin).*)",
  ],
}
