import { PrismaClient, Category, OfferStatus, BookingStatus, PaymentStatus } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Starting database seeding...")

  try {
    // Clear existing data in development
    if (process.env.NODE_ENV !== "production") {
      console.log("🧹 Cleaning existing data...")
      await prisma.favorite.deleteMany()
      await prisma.review.deleteMany()
      await prisma.message.deleteMany()
      await prisma.chatParticipant.deleteMany()
      await prisma.chat.deleteMany()
      await prisma.booking.deleteMany()
      await prisma.timeSlot.deleteMany()
      await prisma.offer.deleteMany()
      await prisma.account.deleteMany()
      await prisma.session.deleteMany()
      await prisma.user.deleteMany()
    }

    // Create Users (mirroring mock data)
    console.log("👥 Creating users...")
    const users = await Promise.all([
      prisma.user.create({
        data: {
          id: "user1",
          name: "John Doe",
          email: "john@example.com",
          image: "/placeholder.svg?height=100&width=100",
          bio: "Adventure seeker and coffee enthusiast",
          age: 28,
          location: "Cape Town, South Africa",
          interests: ["coffee", "art", "hiking"],
          isVerified: true,
          isActive: true,
        },
      }),
      prisma.user.create({
        data: {
          id: "user2",
          name: "Sarah Wilson",
          email: "sarah@example.com",
          image: "/placeholder.svg?height=100&width=100",
          bio: "Love hiking and trying new restaurants",
          age: 26,
          location: "Johannesburg, South Africa",
          interests: ["hiking", "food", "photography"],
          isVerified: true,
          isActive: true,
        },
      }),
      prisma.user.create({
        data: {
          id: "user3",
          name: "Mike Chen",
          email: "mike@example.com",
          image: "/placeholder.svg?height=100&width=100",
          bio: "Tech enthusiast and wine lover",
          age: 32,
          location: "Durban, South Africa",
          interests: ["technology", "wine", "music"],
          isVerified: true,
          isActive: true,
        },
      }),
      prisma.user.create({
        data: {
          id: "user4",
          name: "Emma Thompson",
          email: "emma@example.com",
          image: "/placeholder.svg?height=100&width=100",
          bio: "Yoga instructor and nature lover",
          age: 29,
          location: "Cape Town, South Africa",
          interests: ["yoga", "nature", "wellness"],
          isVerified: true,
          isActive: true,
        },
      }),
    ])

    // Create Offers (mirroring mock data structure)
    console.log("🎯 Creating offers...")
    const offers = await Promise.all([
      prisma.offer.create({
        data: {
          id: "1",
          title: "Coffee & Art Gallery Tour",
          description:
            "Let's explore the local art scene over great coffee. We'll visit 3 galleries and 2 specialty coffee shops.",
          shortDescription: "Art galleries and specialty coffee in the city center",
          price: 150,
          category: Category.CULTURE,
          subcategory: "Art & Coffee",
          location: "V&A Waterfront, Cape Town",
          address: "V&A Waterfront, Cape Town, South Africa",
          images: ["/placeholder.svg?height=300&width=400"],
          maxGuests: 2,
          duration: 120,
          tags: ["coffee", "art", "culture", "walking"],
          hostId: "user1",
          status: OfferStatus.ACTIVE,
          isPublished: true,
          isFeatured: true,
          viewCount: 45,
          likeCount: 12,
          bookingCount: 3,
        },
      }),
      prisma.offer.create({
        data: {
          id: "2",
          title: "Sunset Hike & Picnic",
          description:
            "Beautiful sunset views with a romantic picnic setup. Includes gourmet snacks and sparkling wine.",
          shortDescription: "Romantic sunset hike with gourmet picnic",
          price: 200,
          category: Category.ADVENTURE,
          subcategory: "Hiking",
          location: "Table Mountain, Cape Town",
          address: "Table Mountain National Park, Cape Town",
          images: ["/placeholder.svg?height=300&width=400"],
          maxGuests: 2,
          duration: 180,
          tags: ["hiking", "sunset", "picnic", "romantic"],
          hostId: "user2",
          status: OfferStatus.ACTIVE,
          isPublished: true,
          isFeatured: true,
          viewCount: 67,
          likeCount: 23,
          bookingCount: 5,
        },
      }),
      prisma.offer.create({
        data: {
          id: "3",
          title: "Wine Tasting Experience",
          description: "Private wine tasting session at a boutique winery with cheese pairings.",
          shortDescription: "Private wine tasting with cheese pairings",
          price: 300,
          category: Category.DINING,
          subcategory: "Wine",
          location: "Stellenbosch, Western Cape",
          address: "Stellenbosch Wine Route, Western Cape",
          images: ["/placeholder.svg?height=300&width=400"],
          maxGuests: 4,
          duration: 150,
          tags: ["wine", "tasting", "cheese", "vineyard"],
          hostId: "user3",
          status: OfferStatus.ACTIVE,
          isPublished: true,
          viewCount: 34,
          likeCount: 8,
          bookingCount: 2,
        },
      }),
      prisma.offer.create({
        data: {
          id: "4",
          title: "Beach Yoga & Meditation",
          description: "Start your day with peaceful yoga and meditation by the ocean.",
          shortDescription: "Morning yoga session on the beach",
          price: 80,
          category: Category.WELLNESS,
          subcategory: "Yoga",
          location: "Camps Bay, Cape Town",
          address: "Camps Bay Beach, Cape Town",
          images: ["/placeholder.svg?height=300&width=400"],
          maxGuests: 6,
          duration: 90,
          tags: ["yoga", "meditation", "beach", "wellness"],
          hostId: "user4",
          status: OfferStatus.ACTIVE,
          isPublished: true,
          viewCount: 28,
          likeCount: 15,
          bookingCount: 4,
        },
      }),
    ])

    // Create Time Slots for each offer
    console.log("⏰ Creating time slots...")
    const timeSlots = []
    for (const offer of offers) {
      const slots = await Promise.all([
        prisma.timeSlot.create({
          data: {
            offerId: offer.id,
            date: new Date("2024-01-15"),
            startTime: "10:00",
            endTime: "12:00",
            isBooked: false,
            maxGuests: offer.maxGuests,
          },
        }),
        prisma.timeSlot.create({
          data: {
            offerId: offer.id,
            date: new Date("2024-01-16"),
            startTime: "14:00",
            endTime: "16:00",
            isBooked: false,
            maxGuests: offer.maxGuests,
          },
        }),
        prisma.timeSlot.create({
          data: {
            offerId: offer.id,
            date: new Date("2024-01-17"),
            startTime: "11:00",
            endTime: "13:00",
            isBooked: false,
            maxGuests: offer.maxGuests,
          },
        }),
      ])
      timeSlots.push(...slots)
    }

    // Create Sample Bookings
    console.log("📅 Creating sample bookings...")
    const bookings = await Promise.all([
      prisma.booking.create({
        data: {
          offerId: "1",
          timeSlotId: timeSlots[0].id,
          userId: "user2",
          guestCount: 2,
          totalAmount: 150,
          status: BookingStatus.CONFIRMED,
          paymentStatus: PaymentStatus.PAID,
          specialRequests: "Please include vegetarian options",
          confirmedAt: new Date(),
        },
      }),
      prisma.booking.create({
        data: {
          offerId: "2",
          timeSlotId: timeSlots[3].id,
          userId: "user1",
          guestCount: 2,
          totalAmount: 200,
          status: BookingStatus.PENDING,
          paymentStatus: PaymentStatus.PENDING,
        },
      }),
    ])

    // Create Sample Reviews
    console.log("⭐ Creating reviews...")
    await Promise.all([
      prisma.review.create({
        data: {
          bookingId: bookings[0].id,
          offerId: "1",
          authorId: "user2",
          targetId: "user1",
          rating: 5,
          comment: "Amazing experience! John was a great host and the coffee was excellent.",
          isPublic: true,
          isVerified: true,
        },
      }),
    ])

    // Create Sample Favorites
    console.log("❤️ Creating favorites...")
    await Promise.all([
      prisma.favorite.create({
        data: {
          userId: "user1",
          offerId: "3",
        },
      }),
      prisma.favorite.create({
        data: {
          userId: "user2",
          offerId: "4",
        },
      }),
    ])

    console.log("✅ Database seeding completed successfully!")
    console.log(`👥 Created ${users.length} users`)
    console.log(`🎯 Created ${offers.length} offers`)
    console.log(`⏰ Created ${timeSlots.length} time slots`)
    console.log(`📅 Created ${bookings.length} bookings`)
    console.log("⭐ Created sample reviews and favorites")
  } catch (error) {
    console.error("❌ Seeding failed:", error)
    throw error
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
