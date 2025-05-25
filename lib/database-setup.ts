import { prisma } from "./prisma"

export async function setupDatabase() {
  try {
    // Test database connection
    await prisma.$connect()
    console.log("✅ Database connected successfully")

    // Check if tables exist
    const tables = (await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `) as Array<{ table_name: string }>

    console.log(
      `📊 Found ${tables.length} tables:`,
      tables.map((t) => t.table_name),
    )

    return {
      connected: true,
      tables: tables.map((t) => t.table_name),
      tableCount: tables.length,
    }
  } catch (error) {
    console.error("❌ Database connection failed:", error)
    return {
      connected: false,
      error: error instanceof Error ? error.message : "Unknown error",
      tables: [],
      tableCount: 0,
    }
  }
}

export async function getDatabaseStats() {
  try {
    const [userCount, offerCount, bookingCount, chatCount, messageCount, reviewCount] = await Promise.all([
      prisma.user.count(),
      prisma.offer.count(),
      prisma.booking.count(),
      prisma.chat.count(),
      prisma.message.count(),
      prisma.review.count(),
    ])

    return {
      users: userCount,
      offers: offerCount,
      bookings: bookingCount,
      chats: chatCount,
      messages: messageCount,
      reviews: reviewCount,
      total: userCount + offerCount + bookingCount + chatCount + messageCount + reviewCount,
    }
  } catch (error) {
    console.error("Error getting database stats:", error)
    return {
      users: 0,
      offers: 0,
      bookings: 0,
      chats: 0,
      messages: 0,
      reviews: 0,
      total: 0,
    }
  }
}
