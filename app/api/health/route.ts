import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Basic health check without database dependency
    return NextResponse.json({
      status: "healthy",
      app: "running",
      timestamp: new Date().toISOString(),
      version: "1.0.0",
    })
  } catch (error) {
    console.error("Health check failed:", error)

    return NextResponse.json(
      {
        status: "unhealthy",
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
