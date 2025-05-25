import { type NextRequest, NextResponse } from "next/server"

// Mock admin users - in production, this would be in a database
const adminUsers = [
  {
    id: "admin_1",
    email: "admin@datecraft.com",
    password: "admin123", // In production, this would be hashed
    name: "Admin User",
    role: "SUPER_ADMIN",
  },
]

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Find admin user
    const admin = adminUsers.find((user) => user.email === email && user.password === password)

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid admin credentials",
        },
        { status: 401 },
      )
    }

    // Create admin session token (simplified for demo)
    const adminToken = btoa(JSON.stringify({ id: admin.id, email: admin.email, role: admin.role }))

    const response = NextResponse.json({
      success: true,
      admin: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
    })

    // Set admin session cookie
    response.cookies.set("admin-session", adminToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
    })

    return response
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Authentication failed",
      },
      { status: 500 },
    )
  }
}
