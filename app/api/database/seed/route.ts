import { NextResponse } from "next/server"
import { seedDatabase } from "@/lib/database-seed"

export async function POST() {
  try {
    const result = await seedDatabase()
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
