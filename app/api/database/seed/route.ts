import { NextResponse } from "next/server"

export async function POST() {
  try {
    // Dynamic import to avoid build-time issues
    const { seedDatabase } = await import("@/lib/database-seed")
    const result = await seedDatabase()
    return NextResponse.json(result)
  } catch (error) {
    console.error("Seed API Error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        message: "Database seeding failed - this might be due to missing Prisma client or database connection issues",
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Database seed endpoint - use POST to seed database",
    available: true,
  })
}
