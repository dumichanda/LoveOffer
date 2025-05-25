import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Dynamic import to avoid build-time issues
    const { prisma } = await import("@/lib/prisma")

    const [userCount, offerCount, bookingCount, chatCount, messageCount, reviewCount] = await Promise.all([
      prisma.user.count(),
      prisma.offer.count(),
      prisma.booking.count(),
      prisma.chat.count(),
      prisma.message.count(),
      prisma.review.count(),
    ])

    const total = userCount + offerCount + bookingCount + chatCount + messageCount + reviewCount

    return NextResponse.json({
      users: userCount,
      offers: offerCount,
      bookings: bookingCount,
      chats: chatCount,
      messages: messageCount,
      reviews: reviewCount,
      total,
    })
  } catch (error) {
    console.error("Database stats error:", error)
    return NextResponse.json(
      {
        users: 0,
        offers: 0,
        bookings: 0,
        chats: 0,
        messages: 0,
        reviews: 0,
        total: 0,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
