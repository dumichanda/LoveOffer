import { NextResponse } from "next/server"
import { getDatabaseStats } from "@/lib/database-setup"

export async function GET() {
  try {
    const stats = await getDatabaseStats()
    return NextResponse.json(stats)
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 })
  }
}
