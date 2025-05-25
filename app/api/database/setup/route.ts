import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Dynamic import to avoid build-time issues
    const { setupDatabase } = await import("@/lib/database-setup")
    const result = await setupDatabase()
    return NextResponse.json(result)
  } catch (error) {
    console.error("Database setup error:", error)
    return NextResponse.json(
      {
        connected: false,
        error: error instanceof Error ? error.message : "Unknown error",
        tables: [],
        tableCount: 0,
        message: "Database connection failed - check your DATABASE_URL environment variable",
      },
      { status: 500 },
    )
  }
}
