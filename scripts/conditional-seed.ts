import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function conditionalSeed() {
  try {
    // Check if database is already seeded
    const userCount = await prisma.user.count()
    const offerCount = await prisma.offer.count()

    if (userCount > 0 || offerCount > 0) {
      console.log("📊 Database already contains data, skipping seed")
      return
    }

    console.log("🌱 Database is empty, running seed...")

    // Import and run the main seed function
    const { main } = await import("../prisma/seed")
    await main()
  } catch (error) {
    console.error("❌ Conditional seeding failed:", error)
    // Don't throw error to prevent deployment failure
    console.log("⚠️ Continuing deployment without seeding")
  } finally {
    await prisma.$disconnect()
  }
}

conditionalSeed()
