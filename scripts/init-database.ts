import { prisma } from "../lib/prisma"

async function initializeDatabase() {
  try {
    console.log("🔄 Checking database connection...")

    // Test database connection
    await prisma.$connect()
    console.log("✅ Database connection successful")

    // Check if tables exist
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `

    console.log("📊 Current tables:", tables)

    if (Array.isArray(tables) && tables.length === 0) {
      console.log("⚠️  No tables found. Database needs migration.")
      console.log("Run: npx prisma migrate deploy")
    } else {
      console.log("✅ Database tables exist")
    }
  } catch (error) {
    console.error("❌ Database initialization failed:", error)
  } finally {
    await prisma.$disconnect()
  }
}

initializeDatabase()
