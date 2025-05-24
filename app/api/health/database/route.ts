import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Only check database if Prisma client is available
    const { prisma } = await import("@/lib/prisma")
    await prisma.$connect()
    await prisma.$disconnect()

    return NextResponse.json({
      status: "healthy",
      database: "connected",
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Database health check failed:", error)

    return NextResponse.json(
      {
        status: "unhealthy",
        database: "disconnected",
        error: error instanceof Error ? error.message : "Database connection failed",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
