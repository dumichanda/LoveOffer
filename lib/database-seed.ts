import { prisma } from "./prisma"
import { Category, OfferStatus, BookingStatus, PaymentStatus, CancellationPolicy } from "@prisma/client"

const sampleUsers = [
  {
    name: "Alex Thompson",
    email: "alex.thompson@example.com",
    image: "/placeholder.svg?height=100&width=100&query=alex+profile",
    bio: "Adventure enthusiast and wine connoisseur. Love exploring Cape Town's hidden gems!",
    age: 28,
    location: "Cape Town, Western Cape",
    interests: ["hiking", "wine", "photography", "cooking"],
    phone: "+27 82 123 4567",
    isVerified: true,
    isActive: true,
  },
  {
    name: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    image: "/placeholder.svg?height=100&width=100&query=sarah+profile",
    bio: "Professional chef and wellness coach. Creating memorable culinary experiences.",
    age: 32,
    location: "Stellenbosch, Western Cape",
    interests: ["cooking", "wellness", "yoga", "organic farming"],
    phone: "+27 83 234 5678",
    isVerified: true,
    isActive: true,
  },
  {
    name: "Michael Chen",
    email: "michael.chen@example.com",
    image: "/placeholder.svg?height=100&width=100&query=michael+profile",
    bio: "Tech entrepreneur and culture enthusiast. Always up for new experiences!",
    age: 29,
    location: "Cape Town, Western Cape",
    interests: ["technology", "art", "music", "travel"],
    phone: "+27 84 345 6789",
    isVerified: true,
    isActive: true,
  },
  {
    name: "Emma Davis",
    email: "emma.davis@example.com",
    image: "/placeholder.svg?height=100&width=100&query=emma+profile",
    bio: "Spa owner and wellness expert. Helping people find balance and relaxation.",
    age: 35,
    location: "Hermanus, Western Cape",
    interests: ["wellness", "meditation", "spa treatments", "nature"],
    phone: "+27 85 456 7890",
    isVerified: true,
    isActive: true,
  },
  {
    name: "David Johnson",
    email: "david.johnson@example.com",
    image: "/placeholder.svg?height=100&width=100&query=david+profile",
    bio: "Local historian and tour guide. Passionate about sharing Cape Town's rich heritage.",
    age: 41,
    location: "Cape Town, Western Cape",
    interests: ["history", "culture", "storytelling", "walking tours"],
    phone: "+27 86 567 8901",
    isVerified: true,
    isActive: true,
  },
  {
    name: "Lisa Anderson",
    email: "lisa.anderson@example.com",
    image: "/placeholder.svg?height=100&width=100&query=lisa+profile",
    bio: "Fitness instructor and outdoor adventure guide. Let's get active together!",
    age: 26,
    location: "Cape Town, Western Cape",
    interests: ["fitness", "hiking", "rock climbing", "surfing"],
    phone: "+27 87 678 9012",
    isVerified: true,
    isActive: true,
  },
  {
    name: "James Miller",
    email: "james.miller@example.com",
    image: "/placeholder.svg?height=100&width=100&query=james+profile",
    bio: "Wine farmer and sommelier. Sharing the passion for South African wines.",
    age: 38,
    location: "Franschhoek, Western Cape",
    interests: ["wine making", "viticulture", "food pairing", "farming"],
    phone: "+27 88 789 0123",
    isVerified: true,
    isActive: true,
  },
  {
    name: "Sophie Martin",
    email: "sophie.martin@example.com",
    image: "/placeholder.svg?height=100&width=100&query=sophie+profile",
    bio: "Artist and creative workshop facilitator. Let's create something beautiful!",
    age: 30,
    location: "Cape Town, Western Cape",
    interests: ["painting", "pottery", "crafts", "teaching"],
    phone: "+27 89 890 1234",
    isVerified: true,
    isActive: true,
  },
]

const sampleOffers = [
  {
    title: "Sunset Wine Tasting Experience",
    description:
      "Join us for an exclusive wine tasting session overlooking the beautiful Cape Town sunset. We'll sample 6 premium local wines paired with artisanal cheeses and charcuterie. Learn about the wine-making process while enjoying breathtaking views of the vineyards.",
    shortDescription: "Exclusive wine tasting with sunset views and premium local wines",
    price: 1200,
    category: Category.DINING,
    location: "Stellenbosch, Western Cape",
    address: "123 Wine Estate Road, Stellenbosch",
    coordinates: "-33.9321,18.8602",
    images: [
      "/placeholder.svg?height=400&width=600&query=wine+tasting+sunset+vineyard",
      "/placeholder.svg?height=400&width=600&query=wine+glasses+cheese+platter",
      "/placeholder.svg?height=400&width=600&query=stellenbosch+vineyard+view",
    ],
    maxGuests: 8,
    minAge: 21,
    duration: 180,
    tags: ["wine", "sunset", "romantic", "premium", "educational"],
    status: OfferStatus.ACTIVE,
    isPublished: true,
    isFeatured: true,
    cancellationPolicy: CancellationPolicy.MODERATE,
    instantBook: false,
    requiresApproval: true,
  },
  {
    title: "Traditional Braai & Stories",
    description:
      "Experience authentic South African culture with a traditional braai (barbecue) featuring local meats, sides, and stories. Learn about local traditions while enjoying delicious food in a relaxed outdoor setting.",
    shortDescription: "Authentic South African braai experience with local stories",
    price: 800,
    category: Category.DINING,
    location: "Cape Town, Western Cape",
    address: "456 Heritage Lane, Cape Town",
    coordinates: "-33.9249,18.4241",
    images: [
      "/placeholder.svg?height=400&width=600&query=traditional+braai+south+african",
      "/placeholder.svg?height=400&width=600&query=braai+meat+fire+outdoor",
      "/placeholder.svg?height=400&width=600&query=people+eating+braai+social",
    ],
    maxGuests: 12,
    minAge: 18,
    duration: 240,
    tags: ["traditional", "braai", "cultural", "social", "authentic"],
    status: OfferStatus.ACTIVE,
    isPublished: true,
    isFeatured: false,
    cancellationPolicy: CancellationPolicy.FLEXIBLE,
    instantBook: true,
    requiresApproval: false,
  },
  {
    title: "Table Mountain Hiking Adventure",
    description:
      "Challenge yourself with a guided hike up Table Mountain. We'll take the scenic route with stops for photos and local flora education. Includes safety equipment and refreshments at the top.",
    shortDescription: "Guided Table Mountain hike with breathtaking city views",
    price: 650,
    category: Category.ADVENTURE,
    location: "Cape Town, Western Cape",
    address: "Table Mountain National Park, Cape Town",
    coordinates: "-33.9628,18.4098",
    images: [
      "/placeholder.svg?height=400&width=600&query=table+mountain+hiking+cape+town",
      "/placeholder.svg?height=400&width=600&query=hikers+mountain+trail+adventure",
      "/placeholder.svg?height=400&width=600&query=cape+town+view+from+table+mountain",
    ],
    maxGuests: 6,
    minAge: 16,
    duration: 360,
    tags: ["hiking", "adventure", "nature", "fitness", "scenic"],
    status: OfferStatus.ACTIVE,
    isPublished: true,
    isFeatured: true,
    cancellationPolicy: CancellationPolicy.STRICT,
    instantBook: false,
    requiresApproval: true,
  },
  {
    title: "Art Gallery Walking Tour",
    description:
      "Discover Cape Town's vibrant art scene with a guided tour through local galleries and street art. Meet local artists and learn about the city's creative culture.",
    shortDescription: "Guided tour of Cape Town's best art galleries and street art",
    price: 450,
    category: Category.CULTURE,
    location: "Cape Town, Western Cape",
    address: "Woodstock Arts District, Cape Town",
    coordinates: "-33.9249,18.4241",
    images: [
      "/placeholder.svg?height=400&width=600&query=art+gallery+cape+town+paintings",
      "/placeholder.svg?height=400&width=600&query=street+art+mural+colorful",
      "/placeholder.svg?height=400&width=600&query=art+tour+group+gallery",
    ],
    maxGuests: 10,
    minAge: 18,
    duration: 150,
    tags: ["art", "culture", "walking", "galleries", "creative"],
    status: OfferStatus.ACTIVE,
    isPublished: true,
    isFeatured: false,
    cancellationPolicy: CancellationPolicy.FLEXIBLE,
    instantBook: true,
    requiresApproval: false,
  },
  {
    title: "Spa & Wellness Retreat",
    description:
      "Relax and rejuvenate with our premium spa treatments and wellness activities. Includes massage, meditation session, healthy lunch, and access to our wellness facilities.",
    shortDescription: "Full day spa and wellness retreat for ultimate relaxation",
    price: 1800,
    category: Category.WELLNESS,
    location: "Hermanus, Western Cape",
    address: "789 Wellness Way, Hermanus",
    coordinates: "-34.4187,19.2345",
    images: [
      "/placeholder.svg?height=400&width=600&query=spa+massage+wellness+relaxation",
      "/placeholder.svg?height=400&width=600&query=meditation+yoga+peaceful+nature",
      "/placeholder.svg?height=400&width=600&query=healthy+spa+lunch+organic",
    ],
    maxGuests: 4,
    minAge: 18,
    duration: 480,
    tags: ["spa", "wellness", "massage", "meditation", "luxury"],
    status: OfferStatus.ACTIVE,
    isPublished: true,
    isFeatured: true,
    cancellationPolicy: CancellationPolicy.MODERATE,
    instantBook: false,
    requiresApproval: true,
  },
  {
    title: "Craft Beer Tasting Tour",
    description:
      "Explore Cape Town's craft beer scene with visits to 3 local breweries. Learn about the brewing process and taste unique local flavors with expert guidance.",
    shortDescription: "Guided tour of Cape Town's best craft breweries",
    price: 750,
    category: Category.DINING,
    location: "Cape Town, Western Cape",
    address: "Craft Beer District, Cape Town",
    coordinates: "-33.9249,18.4241",
    images: [
      "/placeholder.svg?height=400&width=600&query=craft+beer+tasting+brewery",
      "/placeholder.svg?height=400&width=600&query=beer+glasses+flight+tasting",
      "/placeholder.svg?height=400&width=600&query=brewery+tour+equipment+tanks",
    ],
    maxGuests: 8,
    minAge: 21,
    duration: 240,
    tags: ["beer", "brewery", "tasting", "local", "educational"],
    status: OfferStatus.ACTIVE,
    isPublished: true,
    isFeatured: false,
    cancellationPolicy: CancellationPolicy.MODERATE,
    instantBook: true,
    requiresApproval: false,
  },
]

async function getDatabaseStats() {
  const userCount = await prisma.user.count()
  const offerCount = await prisma.offer.count()
  const bookingCount = await prisma.booking.count()
  const reviewCount = await prisma.review.count()
  const favoriteCount = await prisma.favorite.count()

  return {
    userCount,
    offerCount,
    bookingCount,
    reviewCount,
    favoriteCount,
  }
}

export async function seedDatabase() {
  try {
    console.log("🌱 Starting database seeding...")

    // Clear existing data
    await prisma.message.deleteMany()
    await prisma.chatParticipant.deleteMany()
    await prisma.chat.deleteMany()
    await prisma.review.deleteMany()
    await prisma.favorite.deleteMany()
    await prisma.booking.deleteMany()
    await prisma.timeSlot.deleteMany()
    await prisma.offer.deleteMany()
    await prisma.account.deleteMany()
    await prisma.session.deleteMany()
    await prisma.user.deleteMany()

    console.log("🗑️ Cleared existing data")

    // Create users
    const users = []
    for (const userData of sampleUsers) {
      const user = await prisma.user.create({
        data: userData,
      })
      users.push(user)
    }
    console.log(`👥 Created ${users.length} users`)

    // Create offers
    const offers = []
    for (let i = 0; i < sampleOffers.length; i++) {
      const offerData = sampleOffers[i]
      const hostIndex = i % users.length

      const offer = await prisma.offer.create({
        data: {
          ...offerData,
          hostId: users[hostIndex].id,
          viewCount: Math.floor(Math.random() * 500) + 50,
          likeCount: Math.floor(Math.random() * 100) + 10,
          bookingCount: Math.floor(Math.random() * 20) + 1,
        },
      })
      offers.push(offer)

      // Create time slots for each offer
      const dates = []
      for (let d = 0; d < 14; d++) {
        const date = new Date()
        date.setDate(date.getDate() + d + 1)
        dates.push(date)
      }

      for (const date of dates) {
        await prisma.timeSlot.create({
          data: {
            offerId: offer.id,
            date: date,
            startTime: "18:00",
            endTime: "21:00",
            isBooked: Math.random() > 0.7,
            maxGuests: offer.maxGuests,
          },
        })
      }
    }
    console.log(`🎯 Created ${offers.length} offers with time slots`)

    // Create bookings
    const bookings = []
    for (let i = 0; i < 15; i++) {
      const offer = offers[Math.floor(Math.random() * offers.length)]
      const guest = users[Math.floor(Math.random() * users.length)]

      // Get available time slot
      const timeSlot = await prisma.timeSlot.findFirst({
        where: {
          offerId: offer.id,
          isBooked: false,
        },
      })

      if (timeSlot) {
        const booking = await prisma.booking.create({
          data: {
            offerId: offer.id,
            timeSlotId: timeSlot.id,
            userId: guest.id,
            guestCount: Math.floor(Math.random() * 3) + 1,
            totalAmount: offer.price,
            status: [BookingStatus.CONFIRMED, BookingStatus.PENDING, BookingStatus.COMPLETED][
              Math.floor(Math.random() * 3)
            ],
            paymentStatus: PaymentStatus.PAID,
            paymentMethod: "card",
            bookedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
          },
        })
        bookings.push(booking)

        // Mark time slot as booked
        await prisma.timeSlot.update({
          where: { id: timeSlot.id },
          data: { isBooked: true },
        })
      }
    }
    console.log(`📅 Created ${bookings.length} bookings`)

    // Create chats for bookings
    for (const booking of bookings) {
      const chat = await prisma.chat.create({
        data: {
          bookingId: booking.id,
          lastMessageAt: new Date(),
          isActive: true,
        },
      })

      // Add participants
      const offer = await prisma.offer.findUnique({
        where: { id: booking.offerId },
      })

      if (offer) {
        await prisma.chatParticipant.createMany({
          data: [
            { chatId: chat.id, userId: booking.userId },
            { chatId: chat.id, userId: offer.hostId },
          ],
        })

        // Create some messages
        const messageCount = Math.floor(Math.random() * 10) + 2
        for (let m = 0; m < messageCount; m++) {
          const isFromGuest = Math.random() > 0.5
          const senderId = isFromGuest ? booking.userId : offer.hostId

          const messages = [
            "Hi! Looking forward to this experience!",
            "Thanks for booking! I'll send you the details soon.",
            "What should I bring?",
            "Just bring yourself and a good appetite!",
            "Can't wait! See you soon.",
            "Perfect! The weather looks great for tomorrow.",
            "Any dietary restrictions I should know about?",
            "No restrictions, we're excited to try everything!",
            "Great! I'll prepare something special.",
            "Thank you so much! This was amazing!",
          ]

          await prisma.message.create({
            data: {
              chatId: chat.id,
              senderId: senderId,
              content: messages[Math.floor(Math.random() * messages.length)],
              isRead: Math.random() > 0.3,
              createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
            },
          })
        }
      }
    }
    console.log(`💬 Created chats and messages`)

    // Create reviews for completed bookings
    const completedBookings = bookings.filter((b) => b.status === BookingStatus.COMPLETED)
    for (const booking of completedBookings.slice(0, 8)) {
      const offer = await prisma.offer.findUnique({
        where: { id: booking.offerId },
      })

      if (offer) {
        await prisma.review.create({
          data: {
            bookingId: booking.id,
            offerId: offer.id,
            authorId: booking.userId,
            targetId: offer.hostId,
            rating: Math.floor(Math.random() * 2) + 4, // 4-5 stars
            comment: [
              "Amazing experience! Highly recommend.",
              "Perfect evening, great host!",
              "Exceeded all expectations.",
              "Beautiful location and wonderful company.",
              "Will definitely book again!",
              "Outstanding service and attention to detail.",
              "A truly memorable experience.",
              "Professional and friendly host.",
            ][Math.floor(Math.random() * 8)],
            isPublic: true,
            isVerified: true,
          },
        })
      }
    }
    console.log(`⭐ Created reviews`)

    // Create favorites
    for (let i = 0; i < 20; i++) {
      const user = users[Math.floor(Math.random() * users.length)]
      const offer = offers[Math.floor(Math.random() * offers.length)]

      try {
        await prisma.favorite.create({
          data: {
            userId: user.id,
            offerId: offer.id,
          },
        })
      } catch (error) {
        // Ignore duplicate favorites
      }
    }
    console.log(`❤️ Created favorites`)

    const stats = await getDatabaseStats()
    console.log("✅ Database seeding completed!")
    console.log("📊 Final stats:", stats)

    return {
      success: true,
      stats,
      message: "Database seeded successfully with sample data",
    }
  } catch (error) {
    console.error("❌ Database seeding failed:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      message: "Database seeding failed",
    }
  }
}
