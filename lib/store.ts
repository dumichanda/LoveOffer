export interface User {
  id: string
  name: string
  email: string
  initials: string
  isVerified: boolean
  rating: number
  reviewCount: number
  bio: string
  subscription: "free" | "standard" | "premium"
  bookingHistory: {
    totalConfirmed: number
    totalCanceled: number
    cancelationRate: number
  }
  stats: {
    datesHosted: number
    datesAttended: number
    activeBids: number
    listedOffers: number
  }
  favoriteOffers?: string[]
}

export interface Message {
  id: string
  chatId: string
  senderId: string
  content: string
  timestamp: string
  read: boolean
}

export interface Chat {
  id: string
  participants: string[]
  lastMessage?: {
    id: string
    content: string
    senderId: string
    timestamp: string
  }
  unreadCount: number
  messages: Message[]
  booking: {
    id: string
    offerId: string
    hostId: string
    guestId: string
    createdAt: string
    slot: {
      id: string
      date: string
      startTime: string
      endTime: string
    }
    offer: {
      title: string
      location: string
      price: number
    }
    host: User
    guest: User
  }
}

export interface Offer {
  id: string
  title: string
  description: string
  price: number
  location: string
  category: string
  images: string[]
  hostId: string
  host: User
  maxGuests: number
  rating: number
  reviewCount: number
  views: number
  likes: number
  tags: string[]
  status: "active" | "paused" | "draft" | "completed"
  cancellationPolicy: "flexible" | "moderate" | "strict"
  bookingStats: {
    totalBookings: number
    confirmedBookings: number
    canceledBookings: number
    pendingPayments: number
  }
  analytics: {
    totalViews: number
    totalLikes: number
    totalBookings: number
  }
  availableSlots: Array<{
    id: string
    date: string
    startTime: string
    endTime: string
    isBooked: boolean
  }>
}

export interface Notification {
  id: string
  userId: string
  title: string
  message: string
  type: string
  category: string
  priority: string
  read: boolean
  timestamp: string
  actionUrl?: string
}

export interface AuditLog {
  id: string
  timestamp: string
  action: string
  entityType: string
  entityId: string
  adminId: string | null
  severity: "info" | "warning" | "error"
  details: string
}

export interface BlockedDate {
  id: string
  date: string
  reason: string
  hostId: string
}

export interface Booking {
  id: string
  offerId: string
  guestId: string
  hostId: string
  status: "pending" | "confirmed" | "completed" | "cancelled"
  paymentConfirmed: boolean
  paymentConfirmedAt?: string
  cancellationReason?: string
  slot: {
    id: string
    date: string
    startTime: string
    endTime: string
  }
  offer: {
    title: string
    location: string
    price: number
    cancellationPolicy: "flexible" | "moderate" | "strict"
  }
  guest: User
  host: User
  guestCount: number
  specialRequests?: string
  createdAt: string
  chatId: string
}

// Mock data
const mockUser: User = {
  id: "user_1",
  name: "John Doe",
  email: "john@example.com",
  initials: "JD",
  isVerified: true,
  rating: 4.7,
  reviewCount: 23,
  bio: "Adventure seeker and food enthusiast. Love exploring new places and meeting interesting people!",
  subscription: "standard",
  bookingHistory: {
    totalConfirmed: 15,
    totalCanceled: 2,
    cancelationRate: 11.8,
  },
  stats: {
    datesHosted: 12,
    datesAttended: 18,
    activeBids: 3,
    listedOffers: 5,
  },
  favoriteOffers: [],
}

const mockHostUser: User = {
  id: "host_1",
  name: "Sarah Wilson",
  email: "sarah@example.com",
  initials: "SW",
  isVerified: true,
  rating: 4.8,
  reviewCount: 24,
  bio: "Professional chef and wine enthusiast",
  subscription: "premium",
  bookingHistory: {
    totalConfirmed: 42,
    totalCanceled: 3,
    cancelationRate: 6.7,
  },
  stats: {
    datesHosted: 45,
    datesAttended: 12,
    activeBids: 0,
    listedOffers: 8,
  },
}

const mockHostUser2: User = {
  id: "host_2",
  name: "Michael Chen",
  email: "michael@example.com",
  initials: "MC",
  isVerified: true,
  rating: 4.9,
  reviewCount: 18,
  bio: "Wine sommelier and travel guide",
  subscription: "premium",
  bookingHistory: {
    totalConfirmed: 28,
    totalCanceled: 1,
    cancelationRate: 3.4,
  },
  stats: {
    datesHosted: 32,
    datesAttended: 8,
    activeBids: 1,
    listedOffers: 6,
  },
}

const mockMessages: Message[] = [
  {
    id: "msg_1",
    chatId: "chat_1",
    senderId: "host_1",
    content: "Hi! Thanks for booking the romantic dinner. I'm excited to host you!",
    timestamp: "2024-01-15T09:30:00Z",
    read: true,
  },
  {
    id: "msg_2",
    chatId: "chat_1",
    senderId: "user_1",
    content: "Looking forward to our dinner! Should I bring anything special?",
    timestamp: "2024-01-15T10:30:00Z",
    read: true,
  },
  {
    id: "msg_3",
    chatId: "chat_1",
    senderId: "host_1",
    content: "Just bring yourself and an appetite! I'll take care of everything else.",
    timestamp: "2024-01-15T11:00:00Z",
    read: false,
  },
  {
    id: "msg_4",
    chatId: "chat_2",
    senderId: "host_2",
    content: "Welcome to the wine tasting experience! What time should we meet?",
    timestamp: "2024-01-14T14:30:00Z",
    read: true,
  },
  {
    id: "msg_5",
    chatId: "chat_2",
    senderId: "user_1",
    content: "How about 2 PM? Is that good for you?",
    timestamp: "2024-01-14T15:00:00Z",
    read: true,
  },
  {
    id: "msg_6",
    chatId: "chat_2",
    senderId: "host_2",
    content: "Perfect! See you at 2 PM at the vineyard entrance.",
    timestamp: "2024-01-14T15:20:00Z",
    read: false,
  },
]

const mockChats: Chat[] = [
  {
    id: "chat_1",
    participants: ["user_1", "host_1"],
    lastMessage: {
      id: "msg_3",
      content: "Just bring yourself and an appetite! I'll take care of everything else.",
      senderId: "host_1",
      timestamp: "2024-01-15T11:00:00Z",
    },
    unreadCount: 1,
    messages: mockMessages.filter((msg) => msg.chatId === "chat_1"),
    booking: {
      id: "booking_1",
      offerId: "offer_1",
      hostId: "host_1",
      guestId: "user_1",
      createdAt: "2024-01-15T09:00:00Z",
      slot: {
        id: "slot_1",
        date: "2024-01-20",
        startTime: "18:00",
        endTime: "21:00",
      },
      offer: {
        title: "Romantic Dinner at Sunset",
        location: "Cape Town Waterfront",
        price: 250,
      },
      host: mockHostUser,
      guest: mockUser,
    },
  },
  {
    id: "chat_2",
    participants: ["user_1", "host_2"],
    lastMessage: {
      id: "msg_6",
      content: "Perfect! See you at 2 PM at the vineyard entrance.",
      senderId: "host_2",
      timestamp: "2024-01-14T15:20:00Z",
    },
    unreadCount: 1,
    messages: mockMessages.filter((msg) => msg.chatId === "chat_2"),
    booking: {
      id: "booking_2",
      offerId: "offer_2",
      hostId: "host_2",
      guestId: "user_1",
      createdAt: "2024-01-14T14:00:00Z",
      slot: {
        id: "slot_2",
        date: "2024-01-21",
        startTime: "14:00",
        endTime: "17:00",
      },
      offer: {
        title: "Wine Tasting Adventure",
        location: "Stellenbosch",
        price: 180,
      },
      host: mockHostUser2,
      guest: mockUser,
    },
  },
]

const mockOffers: Offer[] = [
  {
    id: "offer_1",
    title: "Romantic Dinner at Sunset",
    description: "A beautiful dinner experience with city views",
    price: 250,
    location: "Cape Town Waterfront",
    category: "Dining",
    images: ["/placeholder.svg?height=500&width=400&text=Romantic+Dinner"],
    hostId: "host_1",
    host: mockHostUser,
    maxGuests: 2,
    rating: 4.8,
    reviewCount: 24,
    views: 156,
    likes: 42,
    tags: ["romantic", "dinner", "sunset"],
    status: "active",
    cancellationPolicy: "moderate",
    bookingStats: {
      totalBookings: 12,
      confirmedBookings: 10,
      canceledBookings: 2,
      pendingPayments: 1,
    },
    analytics: {
      totalViews: 156,
      totalLikes: 42,
      totalBookings: 8,
    },
    availableSlots: [
      {
        id: "slot_1",
        date: "2024-01-20",
        startTime: "18:00",
        endTime: "21:00",
        isBooked: false,
      },
    ],
  },
  {
    id: "offer_2",
    title: "Wine Tasting Adventure",
    description: "Explore local wines with an expert sommelier",
    price: 180,
    location: "Stellenbosch",
    category: "Wine & Spirits",
    images: ["/placeholder.svg?height=500&width=400&text=Wine+Tasting"],
    hostId: "host_2",
    host: mockHostUser2,
    maxGuests: 4,
    rating: 4.9,
    reviewCount: 18,
    views: 89,
    likes: 31,
    tags: ["wine", "tasting", "adventure"],
    status: "active",
    cancellationPolicy: "flexible",
    bookingStats: {
      totalBookings: 8,
      confirmedBookings: 7,
      canceledBookings: 1,
      pendingPayments: 0,
    },
    analytics: {
      totalViews: 89,
      totalLikes: 31,
      totalBookings: 5,
    },
    availableSlots: [
      {
        id: "slot_2",
        date: "2024-01-21",
        startTime: "14:00",
        endTime: "17:00",
        isBooked: false,
      },
    ],
  },
  {
    id: "offer_3",
    title: "Coffee & Art Gallery Tour",
    description: "Discover local art while enjoying premium coffee",
    price: 120,
    location: "Cape Town City Centre",
    category: "Culture",
    images: ["/placeholder.svg?height=500&width=400&text=Art+Gallery"],
    hostId: "user_1",
    host: mockUser,
    maxGuests: 3,
    rating: 4.6,
    reviewCount: 12,
    views: 67,
    likes: 18,
    tags: ["art", "coffee", "culture"],
    status: "paused",
    cancellationPolicy: "strict",
    bookingStats: {
      totalBookings: 5,
      confirmedBookings: 4,
      canceledBookings: 1,
      pendingPayments: 0,
    },
    analytics: {
      totalViews: 67,
      totalLikes: 18,
      totalBookings: 3,
    },
    availableSlots: [
      {
        id: "slot_3",
        date: "2024-01-22",
        startTime: "10:00",
        endTime: "13:00",
        isBooked: false,
      },
    ],
  },
]

const mockNotifications: Notification[] = [
  {
    id: "notif_1",
    userId: "user_1",
    title: "New Match!",
    message: "You have a new match for Wine Tasting Adventure",
    type: "match",
    category: "social",
    priority: "medium",
    read: false,
    timestamp: "2024-01-15T09:00:00Z",
    actionUrl: "/offers/offer_2",
  },
]

const mockBlockedDates: BlockedDate[] = [
  {
    id: "blocked_1",
    date: "2024-01-25",
    reason: "Personal commitment",
    hostId: "user_1",
  },
]

const mockBookings: Booking[] = [
  {
    id: "booking_1",
    offerId: "offer_1",
    guestId: "user_1",
    hostId: "host_1",
    status: "confirmed",
    paymentConfirmed: true,
    paymentConfirmedAt: "2024-01-15T11:00:00Z",
    guestCount: 2,
    specialRequests: "Window table preferred",
    slot: {
      id: "slot_1",
      date: "2024-01-20",
      startTime: "18:00",
      endTime: "21:00",
    },
    offer: {
      title: "Romantic Dinner at Sunset",
      location: "Cape Town Waterfront",
      price: 250,
      cancellationPolicy: "moderate",
    },
    guest: mockUser,
    host: mockHostUser,
    createdAt: "2024-01-15T10:00:00Z",
    chatId: "chat_1",
  },
]

// Store with message management
const allMessages = [...mockMessages]
const favoriteOffersList: string[] = []

export const useAppStore = () => {
  return {
    // User data
    currentUser: mockUser,

    // Offers data
    offers: mockOffers,
    likedOffers: [] as string[],
    passedOffers: [] as string[],
    favoriteOffers: favoriteOffersList,

    // Chat data
    chats: mockChats,

    // Notifications
    notifications: mockNotifications,

    // Calendar data
    blockedDates: mockBlockedDates,
    bookings: mockBookings,

    // Actions
    likeOffer: (offerId: string) => {
      console.log("Liked offer:", offerId)
    },

    passOffer: (offerId: string) => {
      console.log("Passed offer:", offerId)
    },

    toggleFavorite: (offerId: string) => {
      const isFavorited = favoriteOffersList.includes(offerId)

      if (isFavorited) {
        // Remove from favorites
        const index = favoriteOffersList.indexOf(offerId)
        favoriteOffersList.splice(index, 1)
        console.log("Removed from favorites:", offerId)
      } else {
        // Add to favorites (with 10-offer limit)
        if (favoriteOffersList.length >= 10) {
          console.log("Cannot add more favorites - limit of 10 reached")
          return false // Indicate limit reached
        }
        favoriteOffersList.push(offerId)
        console.log("Added to favorites:", offerId)
      }
      return true
    },

    getFavoriteOffers: () => {
      return mockOffers.filter((offer) => favoriteOffersList.includes(offer.id))
    },

    incrementOfferViews: (offerId: string) => {
      console.log("Incremented views for offer:", offerId)
    },

    initializeData: () => {
      console.log("Data initialized")
    },

    // Offer management actions
    deleteOffer: (offerId: string) => {
      console.log("Deleted offer:", offerId)
    },

    pauseOffer: (offerId: string) => {
      console.log("Paused offer:", offerId)
    },

    activateOffer: (offerId: string) => {
      console.log("Activated offer:", offerId)
    },

    // Calendar actions
    addBlockedDate: (date: string, reason: string) => {
      console.log("Added blocked date:", date, reason)
    },

    removeBlockedDate: (id: string) => {
      console.log("Removed blocked date:", id)
    },

    // Chat actions
    addMessage: (chatId: string, messageData: Omit<Message, "id" | "timestamp">) => {
      const newMessage: Message = {
        ...messageData,
        id: `msg_${Date.now()}`,
        timestamp: new Date().toISOString(),
      }
      allMessages.push(newMessage)

      // Update the chat's messages and last message
      const chatIndex = mockChats.findIndex((chat) => chat.id === chatId)
      if (chatIndex !== -1) {
        mockChats[chatIndex].messages.push(newMessage)
        mockChats[chatIndex].lastMessage = {
          id: newMessage.id,
          content: newMessage.content,
          senderId: newMessage.senderId,
          timestamp: newMessage.timestamp,
        }
      }

      console.log("Added message to chat:", chatId, newMessage)
    },

    markMessagesRead: (chatId: string) => {
      const chat = mockChats.find((c) => c.id === chatId)
      if (chat) {
        chat.messages.forEach((msg) => {
          if (!msg.read) {
            msg.read = true
          }
        })
        chat.unreadCount = 0
      }
      console.log("Marked messages read for chat:", chatId)
    },

    // Notification actions
    markNotificationRead: (notificationId: string) => {
      const notification = mockNotifications.find((n) => n.id === notificationId)
      if (notification) {
        notification.read = true
      }
      console.log("Marked notification read:", notificationId)
    },

    markAllNotificationsRead: () => {
      mockNotifications.forEach((notification) => {
        if (notification.userId === mockUser.id) {
          notification.read = true
        }
      })
      console.log("Marked all notifications read")
    },

    deleteNotification: (notificationId: string) => {
      const index = mockNotifications.findIndex((n) => n.id === notificationId)
      if (index !== -1) {
        mockNotifications.splice(index, 1)
      }
      console.log("Deleted notification:", notificationId)
    },

    // Admin data
    analyticsData: [],
    systemHealth: {
      cpuUsage: 65,
      memoryUsage: 40,
      diskUsage: 75,
      uptime: "2 days, 4 hours, 30 minutes",
    },
    users: [],
    auditLogs: [],

    // Booking actions
    bookOffer: (offerId: string, slotId: string, guestCount = 1, specialRequests?: string) => {
      console.log("Created booking for offer:", offerId, "slot:", slotId)
    },

    confirmPayment: (bookingId: string) => {
      console.log("Payment confirmed for booking:", bookingId)
    },

    requestBookingCancellation: (bookingId: string, reason: string) => {
      console.log("Cancellation requested for booking:", bookingId, "reason:", reason)
    },

    editBooking: (bookingId: string, updates: { guestCount?: number; specialRequests?: string }) => {
      console.log("Edited booking:", bookingId, updates)
    },
  }
}
