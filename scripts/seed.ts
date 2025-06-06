import { prisma } from "../lib/prisma"

async function seed() {
  try {
    console.log("🌱 Starting database seed...")

    // Create sample users
    const user1 = await prisma.user.upsert({
      where: { email: "john@example.com" },
      update: {},
      create: {
        email: "john@example.com",
        name: "John Doe",
        image: "/placeholder.svg?height=100&width=100",
        bio: "Adventure seeker and coffee enthusiast",
        age: 28,
        location: "Cape Town, South Africa",
        verified: true,
        rating: 4.8,
        totalRatings: 15,
      },
    })

    const user2 = await prisma.user.upsert({
      where: { email: "sarah@example.com" },
      update: {},
      create: {
        email: "sarah@example.com",
        name: "Sarah Wilson",
        image: "/placeholder.svg?height=100&width=100",
        bio: "Love hiking and trying new restaurants",
        age: 26,
        location: "Johannesburg, South Africa",
        verified: true,
        rating: 4.9,
        totalRatings: 22,
      },
    })

    // Create sample offers
    await prisma.offer.upsert({
      where: { id: "offer-1" },
      update: {},
      create: {
        id: "offer-1",
        title: "Coffee & Art Gallery Tour",
        description: "Let's explore the local art scene over great coffee",
        price: 150,
        duration: 120,
        location: "V&A Waterfront, Cape Town",
        category: "Coffee",
        images: ["/placeholder.svg?height=300&width=400"],
        userId: user1.id,
        availableSlots: [
          new Date("2024-01-15T10:00:00Z"),
          new Date("2024-01-16T14:00:00Z"),
          new Date("2024-01-17T11:00:00Z"),
        ],
      },
    })

    await prisma.offer.upsert({
      where: { id: "offer-2" },
      update: {},
      create: {
        id: "offer-2",
        title: "Sunset Hike & Picnic",
        description: "Beautiful sunset views with a romantic picnic setup",
        price: 200,
        duration: 180,
        location: "Table Mountain, Cape Town",
        category: "Adventure",
        images: ["/placeholder.svg?height=300&width=400"],
        userId: user2.id,
        availableSlots: [
          new Date("2024-01-18T16:00:00Z"),
          new Date("2024-01-19T16:00:00Z"),
          new Date("2024-01-20T16:00:00Z"),
        ],
      },
    })

    console.log("✅ Database seeded successfully!")
    console.log(`👤 Created users: ${user1.name}, ${user2.name}`)
    console.log("🎯 Created sample offers")
  } catch (error) {
    console.error("❌ Seed failed:", error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

seed()
