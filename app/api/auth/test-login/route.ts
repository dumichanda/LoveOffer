import { type NextRequest, NextResponse } from "next/server"

// Test user credentials for development
const TEST_USERS = [
  {
    id: "test-user-1",
    email: "alice@test.com",
    name: "Alice Johnson",
    image: "/placeholder.svg?height=100&width=100&query=woman",
    role: "USER",
    subscription: "PREMIUM",
    isVerified: true,
    rating: 4.8,
    reviewCount: 24,
    bio: "Adventure seeker and coffee enthusiast. Love exploring new places and meeting interesting people!",
    age: 28,
    location: "Cape Town, South Africa",
  },
  {
    id: "test-user-2",
    email: "bob@test.com",
    name: "Bob Smith",
    image: "/placeholder.svg?height=100&width=100&query=man",
    role: "USER",
    subscription: "STANDARD",
    isVerified: true,
    rating: 4.6,
    reviewCount: 18,
    bio: "Outdoor enthusiast and foodie. Always up for a good conversation and new experiences.",
    age: 32,
    location: "Johannesburg, South Africa",
  },
  {
    id: "test-admin-1",
    email: "admin@test.com",
    name: "Admin User",
    image: "/placeholder.svg?height=100&width=100&query=admin",
    role: "ADMIN",
    subscription: "PREMIUM",
    isVerified: true,
    rating: 5.0,
    reviewCount: 5,
    bio: "Platform administrator",
    age: 30,
    location: "Durban, South Africa",
  },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")

  if (!userId) {
    return NextResponse.json({
      users: TEST_USERS.map((u) => ({ id: u.id, name: u.name, email: u.email, role: u.role })),
      message: "Available test users",
    })
  }

  const user = TEST_USERS.find((u) => u.id === userId)
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  return NextResponse.json({ user })
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json()

    const user = TEST_USERS.find((u) => u.id === userId)
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // In a real app, you'd create a session here
    // For now, we'll just return the user data
    return NextResponse.json({
      success: true,
      user,
      message: "Test login successful",
    })
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}
