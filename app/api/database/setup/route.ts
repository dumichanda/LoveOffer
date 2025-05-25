import { NextResponse } from "next/server"
import { setupDatabase } from "@/lib/database-setup"

export async function GET() {
  try {
    const result = await setupDatabase()
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json(
      {
        connected: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
