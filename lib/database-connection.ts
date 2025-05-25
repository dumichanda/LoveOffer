import { PrismaClient } from "@prisma/client"

let prisma: PrismaClient

declare global {
  var __prisma: PrismaClient | undefined
}

// Singleton pattern for Prisma client
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient({
    log: ["error"],
  })
} else {
  if (!global.__prisma) {
    global.__prisma = new PrismaClient({
      log: ["query", "error", "warn"],
    })
  }
  prisma = global.__prisma
}

export async function connectToDatabase() {
  try {
    await prisma.$connect()
    console.log("✅ Database connected successfully")
    return { success: true, client: prisma }
  } catch (error) {
    console.error("❌ Database connection failed:", error)
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}

export async function disconnectFromDatabase() {
  try {
    await prisma.$disconnect()
    console.log("✅ Database disconnected successfully")
  } catch (error) {
    console.error("❌ Database disconnection failed:", error)
  }
}

export { prisma }
