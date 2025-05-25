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

// Expanded Mock Users - South African names and locations
const mockUser: User = {
  id: "user_1",
  name: "Thabo Mthembu",
  email: "thabo@example.com",
  initials: "TM",
  isVerified: true,
  rating: 4.7,
  reviewCount: 23,
  bio: "Adventure seeker and food enthusiast from Johannesburg. Love exploring new places and meeting interesting people!",
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
    listedOffers: 0,
  },
  favoriteOffers: ["2", "5", "8", "12"],
}

const mockUsers: User[] = [
  {
    id: "host_1",
    name: "Nomsa Dlamini",
    email: "nomsa@example.com",
    initials: "ND",
    isVerified: true,
    rating: 4.8,
    reviewCount: 34,
    bio: "Professional chef and wine enthusiast from Sandton",
    subscription: "premium",
    bookingHistory: { totalConfirmed: 42, totalCanceled: 3, cancelationRate: 6.7 },
    stats: { datesHosted: 45, datesAttended: 12, activeBids: 0, listedOffers: 8 },
  },
  {
    id: "host_2",
    name: "Sipho Ndaba",
    email: "sipho@example.com",
    initials: "SN",
    isVerified: true,
    rating: 4.9,
    reviewCount: 28,
    bio: "Wine sommelier and cultural guide from Pretoria",
    subscription: "premium",
    bookingHistory: { totalConfirmed: 38, totalCanceled: 2, cancelationRate: 5.0 },
    stats: { datesHosted: 32, datesAttended: 8, activeBids: 1, listedOffers: 6 },
  },
  {
    id: "host_3",
    name: "Lerato Mokwena",
    email: "lerato@example.com",
    initials: "LM",
    isVerified: true,
    rating: 4.7,
    reviewCount: 31,
    bio: "Adventure guide and outdoor enthusiast from Roodepoort",
    subscription: "premium",
    bookingHistory: { totalConfirmed: 35, totalCanceled: 2, cancelationRate: 5.4 },
    stats: { datesHosted: 38, datesAttended: 15, activeBids: 2, listedOffers: 7 },
  },
  {
    id: "host_4",
    name: "Mandla Khumalo",
    email: "mandla@example.com",
    initials: "MK",
    isVerified: true,
    rating: 4.6,
    reviewCount: 22,
    bio: "Art curator and culture enthusiast from Melville",
    subscription: "standard",
    bookingHistory: { totalConfirmed: 25, totalCanceled: 3, cancelationRate: 10.7 },
    stats: { datesHosted: 28, datesAttended: 20, activeBids: 1, listedOffers: 4 },
  },
  {
    id: "host_5",
    name: "Zanele Mahlangu",
    email: "zanele@example.com",
    initials: "ZM",
    isVerified: true,
    rating: 4.9,
    reviewCount: 19,
    bio: "Massage therapist and wellness coach from Rosebank",
    subscription: "premium",
    bookingHistory: { totalConfirmed: 31, totalCanceled: 1, cancelationRate: 3.1 },
    stats: { datesHosted: 25, datesAttended: 8, activeBids: 0, listedOffers: 5 },
  },
  {
    id: "host_6",
    name: "Kagiso Molefe",
    email: "kagiso@example.com",
    initials: "KM",
    isVerified: true,
    rating: 4.8,
    reviewCount: 26,
    bio: "DJ and music producer from Soweto",
    subscription: "premium",
    bookingHistory: { totalConfirmed: 29, totalCanceled: 2, cancelationRate: 6.5 },
    stats: { datesHosted: 22, datesAttended: 12, activeBids: 1, listedOffers: 6 },
  },
  {
    id: "host_7",
    name: "Palesa Mokoena",
    email: "palesa@example.com",
    initials: "PM",
    isVerified: true,
    rating: 4.7,
    reviewCount: 33,
    bio: "Dance instructor and fitness enthusiast from Centurion",
    subscription: "standard",
    bookingHistory: { totalConfirmed: 27, totalCanceled: 4, cancelationRate: 12.9 },
    stats: { datesHosted: 20, datesAttended: 15, activeBids: 2, listedOffers: 4 },
  },
  {
    id: "host_8",
    name: "Bongani Sithole",
    email: "bongani@example.com",
    initials: "BS",
    isVerified: true,
    rating: 4.5,
    reviewCount: 18,
    bio: "Braai master and sports enthusiast from Alberton",
    subscription: "standard",
    bookingHistory: { totalConfirmed: 22, totalCanceled: 3, cancelationRate: 12.0 },
    stats: { datesHosted: 18, datesAttended: 10, activeBids: 1, listedOffers: 3 },
  },
]

const mockMessages: Message[] = [
  // Chat 1 - Nomsa (Romantic Dinner)
  {
    id: "msg_1",
    chatId: "chat_1",
    senderId: "host_1",
    content: "Hi Thabo! Thanks for booking the romantic dinner. I'm excited to host you!",
    timestamp: "2024-01-15T09:30:00Z",
    read: true,
  },
  {
    id: "msg_2",
    chatId: "chat_1",
    senderId: "user_1",
    content: "Looking forward to it! Should I bring anything special?",
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

  // Chat 2 - Sipho (Wine Tasting)
  {
    id: "msg_4",
    chatId: "chat_2",
    senderId: "host_2",
    content: "Sawubona Thabo! Welcome to the wine tasting experience!",
    timestamp: "2024-01-14T14:30:00Z",
    read: true,
  },
  {
    id: "msg_5",
    chatId: "chat_2",
    senderId: "user_1",
    content: "Yebo! What time should we meet?",
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

  // Chat 3 - Lerato (Hiking)
  {
    id: "msg_7",
    chatId: "chat_3",
    senderId: "host_3",
    content: "Hey! Ready for our hiking adventure tomorrow?",
    timestamp: "2024-01-16T18:00:00Z",
    read: true,
  },
  {
    id: "msg_8",
    chatId: "chat_3",
    senderId: "user_1",
    content: "What should I bring?",
    timestamp: "2024-01-16T18:15:00Z",
    read: true,
  },
  {
    id: "msg_9",
    chatId: "chat_3",
    senderId: "host_3",
    content: "Just comfortable shoes and water. I'll handle the rest!",
    timestamp: "2024-01-16T18:30:00Z",
    read: false,
  },

  // Chat 4 - Zanele (Spa Day)
  {
    id: "msg_10",
    chatId: "chat_4",
    senderId: "host_5",
    content: "Hi! Looking forward to our spa and wellness session 🧘‍♀️",
    timestamp: "2024-01-17T10:00:00Z",
    read: true,
  },
  {
    id: "msg_11",
    chatId: "chat_4",
    senderId: "user_1",
    content: "Me too! I really need this relaxation time",
    timestamp: "2024-01-17T10:30:00Z",
    read: true,
  },
  {
    id: "msg_12",
    chatId: "chat_4",
    senderId: "host_5",
    content: "Perfect! We'll start with aromatherapy massage then meditation",
    timestamp: "2024-01-17T11:00:00Z",
    read: false,
  },

  // Chat 5 - Kagiso (Music Session)
  {
    id: "msg_13",
    chatId: "chat_5",
    senderId: "host_6",
    content: "Eish bro! Ready for some serious Amapiano vibes? 🎵",
    timestamp: "2024-01-18T16:00:00Z",
    read: true,
  },
  {
    id: "msg_14",
    chatId: "chat_5",
    senderId: "user_1",
    content: "Can't wait! Will there be other people joining?",
    timestamp: "2024-01-18T16:15:00Z",
    read: true,
  },
  {
    id: "msg_15",
    chatId: "chat_5",
    senderId: "host_6",
    content: "Just us and the music! I've got some exclusive tracks to share",
    timestamp: "2024-01-18T16:30:00Z",
    read: false,
  },

  // Chat 6 - Palesa (Dance Class)
  {
    id: "msg_16",
    chatId: "chat_6",
    senderId: "host_7",
    content: "Hey! Ready to learn some moves? 💃",
    timestamp: "2024-01-19T12:00:00Z",
    read: true,
  },
  {
    id: "msg_17",
    chatId: "chat_6",
    senderId: "user_1",
    content: "I'm nervous but excited! I have two left feet 😅",
    timestamp: "2024-01-19T12:15:00Z",
    read: true,
  },
  {
    id: "msg_18",
    chatId: "chat_6",
    senderId: "host_7",
    content: "Don't worry! Everyone starts somewhere. We'll have fun!",
    timestamp: "2024-01-19T12:30:00Z",
    read: false,
  },

  // Chat 7 - Bongani (Braai)
  {
    id: "msg_19",
    chatId: "chat_7",
    senderId: "host_8",
    content: "Howzit! Ready for a proper South African braai? 🔥",
    timestamp: "2024-01-20T14:00:00Z",
    read: true,
  },
  {
    id: "msg_20",
    chatId: "chat_7",
    senderId: "user_1",
    content: "Should I bring anything?",
    timestamp: "2024-01-20T14:15:00Z",
    read: true,
  },
  {
    id: "msg_21",
    chatId: "chat_7",
    senderId: "host_8",
    content: "Just bring your appetite! I've got boerewors, lamb chops, and cold beers",
    timestamp: "2024-01-20T14:30:00Z",
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
      offerId: "1",
      hostId: "host_1",
      guestId: "user_1",
      createdAt: "2024-01-15T09:00:00Z",
      slot: { id: "slot_1", date: "2024-01-20", startTime: "18:00", endTime: "21:00" },
      offer: { title: "Romantic Dinner at Sunset", location: "Sandton City", price: 450 },
      host: mockUsers[0],
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
      offerId: "2",
      hostId: "host_2",
      guestId: "user_1",
      createdAt: "2024-01-14T14:00:00Z",
      slot: { id: "slot_2", date: "2024-01-21", startTime: "14:00", endTime: "17:00" },
      offer: { title: "Wine Tasting Adventure", location: "Pretoria East", price: 280 },
      host: mockUsers[1],
      guest: mockUser,
    },
  },
  {
    id: "chat_3",
    participants: ["user_1", "host_3"],
    lastMessage: {
      id: "msg_9",
      content: "Just comfortable shoes and water. I'll handle the rest!",
      senderId: "host_3",
      timestamp: "2024-01-16T18:30:00Z",
    },
    unreadCount: 1,
    messages: mockMessages.filter((msg) => msg.chatId === "chat_3"),
    booking: {
      id: "booking_3",
      offerId: "3",
      hostId: "host_3",
      guestId: "user_1",
      createdAt: "2024-01-16T17:00:00Z",
      slot: { id: "slot_3", date: "2024-01-22", startTime: "08:00", endTime: "12:00" },
      offer: { title: "Hiking & Coffee Date", location: "Magaliesberg", price: 180 },
      host: mockUsers[2],
      guest: mockUser,
    },
  },
  {
    id: "chat_4",
    participants: ["user_1", "host_5"],
    lastMessage: {
      id: "msg_12",
      content: "Perfect! We'll start with aromatherapy massage then meditation",
      senderId: "host_5",
      timestamp: "2024-01-17T11:00:00Z",
    },
    unreadCount: 1,
    messages: mockMessages.filter((msg) => msg.chatId === "chat_4"),
    booking: {
      id: "booking_4",
      offerId: "9",
      hostId: "host_5",
      guestId: "user_1",
      createdAt: "2024-01-17T09:00:00Z",
      slot: { id: "slot_9", date: "2024-01-23", startTime: "10:00", endTime: "14:00" },
      offer: { title: "Spa & Wellness Retreat", location: "Rosebank", price: 380 },
      host: mockUsers[4],
      guest: mockUser,
    },
  },
  {
    id: "chat_5",
    participants: ["user_1", "host_6"],
    lastMessage: {
      id: "msg_15",
      content: "Just us and the music! I've got some exclusive tracks to share",
      senderId: "host_6",
      timestamp: "2024-01-18T16:30:00Z",
    },
    unreadCount: 1,
    messages: mockMessages.filter((msg) => msg.chatId === "chat_5"),
    booking: {
      id: "booking_5",
      offerId: "11",
      hostId: "host_6",
      guestId: "user_1",
      createdAt: "2024-01-18T15:00:00Z",
      slot: { id: "slot_11", date: "2024-01-24", startTime: "19:00", endTime: "23:00" },
      offer: { title: "Amapiano Music Session", location: "Soweto", price: 220 },
      host: mockUsers[5],
      guest: mockUser,
    },
  },
  {
    id: "chat_6",
    participants: ["user_1", "host_7"],
    lastMessage: {
      id: "msg_18",
      content: "Don't worry! Everyone starts somewhere. We'll have fun!",
      senderId: "host_7",
      timestamp: "2024-01-19T12:30:00Z",
    },
    unreadCount: 1,
    messages: mockMessages.filter((msg) => msg.chatId === "chat_6"),
    booking: {
      id: "booking_6",
      offerId: "13",
      hostId: "host_7",
      guestId: "user_1",
      createdAt: "2024-01-19T11:00:00Z",
      slot: { id: "slot_13", date: "2024-01-25", startTime: "18:00", endTime: "20:00" },
      offer: { title: "Dance Class & Chill", location: "Centurion", price: 150 },
      host: mockUsers[6],
      guest: mockUser,
    },
  },
  {
    id: "chat_7",
    participants: ["user_1", "host_8"],
    lastMessage: {
      id: "msg_21",
      content: "Just bring your appetite! I've got boerewors, lamb chops, and cold beers",
      senderId: "host_8",
      timestamp: "2024-01-20T14:30:00Z",
    },
    unreadCount: 1,
    messages: mockMessages.filter((msg) => msg.chatId === "chat_7"),
    booking: {
      id: "booking_7",
      offerId: "15",
      hostId: "host_8",
      guestId: "user_1",
      createdAt: "2024-01-20T13:00:00Z",
      slot: { id: "slot_15", date: "2024-01-26", startTime: "16:00", endTime: "20:00" },
      offer: { title: "Traditional Braai Experience", location: "Alberton", price: 200 },
      host: mockUsers[7],
      guest: mockUser,
    },
  },
]

const mockOffers: Offer[] = [
  {
    id: "1",
    title: "Romantic Dinner at Sunset",
    description:
      "A beautiful dinner experience with city views and gourmet cuisine. Perfect for couples looking for an intimate evening together.",
    price: 450,
    location: "Sandton City",
    category: "Dining",
    images: ["/placeholder.svg?height=500&width=400&text=Romantic+Dinner"],
    hostId: "host_1",
    host: mockUsers[0],
    maxGuests: 2,
    rating: 4.8,
    reviewCount: 24,
    views: 156,
    likes: 42,
    tags: ["romantic", "dinner", "sunset"],
    status: "active",
    cancellationPolicy: "moderate",
    bookingStats: { totalBookings: 12, confirmedBookings: 10, canceledBookings: 2, pendingPayments: 1 },
    analytics: { totalViews: 156, totalLikes: 42, totalBookings: 8 },
    availableSlots: [
      { id: "slot_1", date: "2024-01-20", startTime: "18:00", endTime: "21:00", isBooked: false },
      { id: "slot_1a", date: "2024-01-22", startTime: "19:00", endTime: "22:00", isBooked: false },
    ],
  },
  {
    id: "2",
    title: "Wine Tasting Adventure",
    description: "Explore local wines with an expert sommelier in the beautiful Pretoria wine region.",
    price: 280,
    location: "Pretoria East",
    category: "Wine & Spirits",
    images: ["/placeholder.svg?height=500&width=400&text=Wine+Tasting"],
    hostId: "host_2",
    host: mockUsers[1],
    maxGuests: 4,
    rating: 4.9,
    reviewCount: 18,
    views: 89,
    likes: 31,
    tags: ["wine", "tasting", "adventure"],
    status: "active",
    cancellationPolicy: "flexible",
    bookingStats: { totalBookings: 8, confirmedBookings: 7, canceledBookings: 1, pendingPayments: 0 },
    analytics: { totalViews: 89, totalLikes: 31, totalBookings: 5 },
    availableSlots: [{ id: "slot_2", date: "2024-01-21", startTime: "14:00", endTime: "17:00", isBooked: false }],
  },
  {
    id: "3",
    title: "Hiking & Coffee Date",
    description: "Start with a scenic hike in Magaliesberg followed by artisanal coffee. Perfect for active couples.",
    price: 180,
    location: "Magaliesberg",
    category: "Adventure",
    images: ["/placeholder.svg?height=500&width=400&text=Hiking+Coffee"],
    hostId: "host_3",
    host: mockUsers[2],
    maxGuests: 2,
    rating: 4.7,
    reviewCount: 31,
    views: 134,
    likes: 28,
    tags: ["hiking", "coffee", "adventure", "nature"],
    status: "active",
    cancellationPolicy: "flexible",
    bookingStats: { totalBookings: 15, confirmedBookings: 13, canceledBookings: 2, pendingPayments: 1 },
    analytics: { totalViews: 134, totalLikes: 28, totalBookings: 12 },
    availableSlots: [{ id: "slot_3", date: "2024-01-22", startTime: "08:00", endTime: "12:00", isBooked: false }],
  },
  {
    id: "4",
    title: "Art Gallery Evening",
    description: "Discover local art while enjoying premium coffee and light snacks in Melville.",
    price: 120,
    location: "Melville",
    category: "Culture",
    images: ["/placeholder.svg?height=500&width=400&text=Art+Gallery"],
    hostId: "host_4",
    host: mockUsers[3],
    maxGuests: 3,
    rating: 4.6,
    reviewCount: 22,
    views: 67,
    likes: 18,
    tags: ["art", "coffee", "culture"],
    status: "paused",
    cancellationPolicy: "strict",
    bookingStats: { totalBookings: 5, confirmedBookings: 4, canceledBookings: 1, pendingPayments: 0 },
    analytics: { totalViews: 67, totalLikes: 18, totalBookings: 3 },
    availableSlots: [{ id: "slot_4", date: "2024-01-23", startTime: "18:00", endTime: "21:00", isBooked: false }],
  },
  {
    id: "5",
    title: "Traditional Braai & Stories",
    description: "Experience authentic South African braai culture with traditional stories and local music.",
    price: 320,
    location: "Soweto",
    category: "Cultural",
    images: ["/placeholder.svg?height=500&width=400&text=Braai+Stories"],
    hostId: "host_8",
    host: mockUsers[7],
    maxGuests: 6,
    rating: 4.9,
    reviewCount: 16,
    views: 98,
    likes: 35,
    tags: ["braai", "traditional", "cultural", "music"],
    status: "active",
    cancellationPolicy: "moderate",
    bookingStats: { totalBookings: 8, confirmedBookings: 7, canceledBookings: 1, pendingPayments: 0 },
    analytics: { totalViews: 98, totalLikes: 35, totalBookings: 6 },
    availableSlots: [{ id: "slot_5", date: "2024-01-25", startTime: "16:00", endTime: "20:00", isBooked: false }],
  },
  {
    id: "6",
    title: "Shisa Nyama & Live Music",
    description: "Enjoy grilled meat and live Amapiano music in the heart of Johannesburg.",
    price: 250,
    location: "Johannesburg CBD",
    category: "Entertainment",
    images: ["/placeholder.svg?height=500&width=400&text=Shisa+Nyama"],
    hostId: "host_6",
    host: mockUsers[5],
    maxGuests: 4,
    rating: 4.7,
    reviewCount: 29,
    views: 145,
    likes: 52,
    tags: ["shisa nyama", "music", "amapiano", "entertainment"],
    status: "active",
    cancellationPolicy: "flexible",
    bookingStats: { totalBookings: 11, confirmedBookings: 9, canceledBookings: 2, pendingPayments: 1 },
    analytics: { totalViews: 145, totalLikes: 52, totalBookings: 9 },
    availableSlots: [{ id: "slot_6", date: "2024-01-26", startTime: "18:00", endTime: "22:00", isBooked: false }],
  },
  {
    id: "7",
    title: "Couples Massage & Relaxation",
    description: "Unwind together with a professional couples massage and meditation session.",
    price: 480,
    location: "Rosebank",
    category: "Wellness",
    images: ["/placeholder.svg?height=500&width=400&text=Couples+Massage"],
    hostId: "host_5",
    host: mockUsers[4],
    maxGuests: 2,
    rating: 4.8,
    reviewCount: 21,
    views: 78,
    likes: 33,
    tags: ["massage", "relaxation", "couples", "wellness"],
    status: "active",
    cancellationPolicy: "strict",
    bookingStats: { totalBookings: 6, confirmedBookings: 6, canceledBookings: 0, pendingPayments: 0 },
    analytics: { totalViews: 78, totalLikes: 33, totalBookings: 6 },
    availableSlots: [{ id: "slot_7", date: "2024-01-27", startTime: "14:00", endTime: "17:00", isBooked: false }],
  },
  {
    id: "8",
    title: "Rooftop Sundowners",
    description: "Watch the sunset from a beautiful rooftop in Sandton with cocktails and good vibes.",
    price: 180,
    location: "Sandton",
    category: "Social",
    images: ["/placeholder.svg?height=500&width=400&text=Rooftop+Sundowners"],
    hostId: "host_7",
    host: mockUsers[6],
    maxGuests: 8,
    rating: 4.6,
    reviewCount: 34,
    views: 167,
    likes: 48,
    tags: ["rooftop", "sundowners", "cocktails", "social"],
    status: "draft",
    cancellationPolicy: "flexible",
    bookingStats: { totalBookings: 0, confirmedBookings: 0, canceledBookings: 0, pendingPayments: 0 },
    analytics: { totalViews: 167, totalLikes: 48, totalBookings: 0 },
    availableSlots: [{ id: "slot_8", date: "2024-01-28", startTime: "17:00", endTime: "20:00", isBooked: false }],
  },
  {
    id: "9",
    title: "Spa & Wellness Retreat",
    description: "Relax and rejuvenate with a full spa day including massage, facial, and meditation session.",
    price: 380,
    location: "Rosebank",
    category: "Wellness",
    images: ["/placeholder.svg?height=500&width=400&text=Spa+Wellness"],
    hostId: "host_5",
    host: mockUsers[4],
    maxGuests: 2,
    rating: 4.9,
    reviewCount: 19,
    views: 78,
    likes: 33,
    tags: ["spa", "wellness", "relaxation", "massage"],
    status: "active",
    cancellationPolicy: "moderate",
    bookingStats: { totalBookings: 6, confirmedBookings: 6, canceledBookings: 0, pendingPayments: 0 },
    analytics: { totalViews: 78, totalLikes: 33, totalBookings: 6 },
    availableSlots: [{ id: "slot_9", date: "2024-01-23", startTime: "10:00", endTime: "14:00", isBooked: false }],
  },
  {
    id: "10",
    title: "Photography Walk & Coffee",
    description: "Explore Johannesburg's street art scene while learning photography basics. Includes coffee break.",
    price: 220,
    location: "Maboneng",
    category: "Creative",
    images: ["/placeholder.svg?height=500&width=400&text=Photography+Walk"],
    hostId: "host_4",
    host: mockUsers[3],
    maxGuests: 3,
    rating: 4.7,
    reviewCount: 15,
    views: 92,
    likes: 28,
    tags: ["photography", "art", "coffee", "creative"],
    status: "active",
    cancellationPolicy: "flexible",
    bookingStats: { totalBookings: 8, confirmedBookings: 7, canceledBookings: 1, pendingPayments: 0 },
    analytics: { totalViews: 92, totalLikes: 28, totalBookings: 7 },
    availableSlots: [{ id: "slot_10", date: "2024-01-24", startTime: "09:00", endTime: "13:00", isBooked: false }],
  },
  {
    id: "11",
    title: "Amapiano Music Session",
    description: "Private music session with a local DJ. Learn about Amapiano culture and enjoy exclusive tracks.",
    price: 220,
    location: "Soweto",
    category: "Music",
    images: ["/placeholder.svg?height=500&width=400&text=Amapiano+Session"],
    hostId: "host_6",
    host: mockUsers[5],
    maxGuests: 2,
    rating: 4.8,
    reviewCount: 22,
    views: 134,
    likes: 45,
    tags: ["amapiano", "music", "culture", "exclusive"],
    status: "active",
    cancellationPolicy: "flexible",
    bookingStats: { totalBookings: 12, confirmedBookings: 11, canceledBookings: 1, pendingPayments: 0 },
    analytics: { totalViews: 134, totalLikes: 45, totalBookings: 11 },
    availableSlots: [{ id: "slot_11", date: "2024-01-24", startTime: "19:00", endTime: "23:00", isBooked: false }],
  },
  {
    id: "12",
    title: "Cooking Class & Market Tour",
    description: "Learn to cook traditional South African dishes after a guided tour of local markets.",
    price: 350,
    location: "Fordsburg",
    category: "Culinary",
    images: ["/placeholder.svg?height=500&width=400&text=Cooking+Class"],
    hostId: "host_1",
    host: mockUsers[0],
    maxGuests: 4,
    rating: 4.9,
    reviewCount: 27,
    views: 156,
    likes: 52,
    tags: ["cooking", "market", "traditional", "food"],
    status: "active",
    cancellationPolicy: "moderate",
    bookingStats: { totalBookings: 15, confirmedBookings: 14, canceledBookings: 1, pendingPayments: 0 },
    analytics: { totalViews: 156, totalLikes: 52, totalBookings: 14 },
    availableSlots: [{ id: "slot_12", date: "2024-01-25", startTime: "10:00", endTime: "15:00", isBooked: false }],
  },
  {
    id: "13",
    title: "Dance Class & Chill",
    description: "Learn Afrobeats and Amapiano dance moves in a fun, relaxed environment with snacks included.",
    price: 150,
    location: "Centurion",
    category: "Dance",
    images: ["/placeholder.svg?height=500&width=400&text=Dance+Class"],
    hostId: "host_7",
    host: mockUsers[6],
    maxGuests: 6,
    rating: 4.6,
    reviewCount: 18,
    views: 89,
    likes: 31,
    tags: ["dance", "afrobeats", "amapiano", "fun"],
    status: "active",
    cancellationPolicy: "flexible",
    bookingStats: { totalBookings: 9, confirmedBookings: 8, canceledBookings: 1, pendingPayments: 0 },
    analytics: { totalViews: 89, totalLikes: 31, totalBookings: 8 },
    availableSlots: [{ id: "slot_13", date: "2024-01-25", startTime: "18:00", endTime: "20:00", isBooked: false }],
  },
  {
    id: "14",
    title: "Sunset Picnic & Games",
    description: "Romantic picnic setup with board games and stunning sunset views over Johannesburg.",
    price: 280,
    location: "Northcliff Hill",
    category: "Romantic",
    images: ["/placeholder.svg?height=500&width=400&text=Sunset+Picnic"],
    hostId: "host_2",
    host: mockUsers[1],
    maxGuests: 2,
    rating: 4.8,
    reviewCount: 24,
    views: 167,
    likes: 48,
    tags: ["picnic", "sunset", "romantic", "games"],
    status: "active",
    cancellationPolicy: "moderate",
    bookingStats: { totalBookings: 11, confirmedBookings: 10, canceledBookings: 1, pendingPayments: 0 },
    analytics: { totalViews: 167, totalLikes: 48, totalBookings: 10 },
    availableSlots: [{ id: "slot_14", date: "2024-01-26", startTime: "17:00", endTime: "20:00", isBooked: false }],
  },
  {
    id: "15",
    title: "Traditional Braai Experience",
    description: "Authentic South African braai with traditional sides, stories, and local beer tasting.",
    price: 200,
    location: "Alberton",
    category: "Cultural",
    images: ["/placeholder.svg?height=500&width=400&text=Braai+Experience"],
    hostId: "host_8",
    host: mockUsers[7],
    maxGuests: 8,
    rating: 4.5,
    reviewCount: 16,
    views: 123,
    likes: 39,
    tags: ["braai", "traditional", "beer", "cultural"],
    status: "active",
    cancellationPolicy: "moderate",
    bookingStats: { totalBookings: 7, confirmedBookings: 6, canceledBookings: 1, pendingPayments: 0 },
    analytics: { totalViews: 123, totalLikes: 39, totalBookings: 6 },
    availableSlots: [{ id: "slot_15", date: "2024-01-26", startTime: "16:00", endTime: "20:00", isBooked: false }],
  },
  {
    id: "16",
    title: "Yoga & Meditation Sunrise",
    description: "Start your day with peaceful yoga and meditation session as the sun rises over the city.",
    price: 120,
    location: "Zoo Lake",
    category: "Wellness",
    images: ["/placeholder.svg?height=500&width=400&text=Sunrise+Yoga"],
    hostId: "host_5",
    host: mockUsers[4],
    maxGuests: 10,
    rating: 4.7,
    reviewCount: 31,
    views: 98,
    likes: 42,
    tags: ["yoga", "meditation", "sunrise", "peaceful"],
    status: "active",
    cancellationPolicy: "flexible",
    bookingStats: { totalBookings: 18, confirmedBookings: 17, canceledBookings: 1, pendingPayments: 0 },
    analytics: { totalViews: 98, totalLikes: 42, totalBookings: 17 },
    availableSlots: [{ id: "slot_16", date: "2024-01-27", startTime: "06:00", endTime: "08:00", isBooked: false }],
  },
  {
    id: "17",
    title: "Craft Beer & Pub Quiz",
    description: "Enjoy local craft beers while participating in a fun pub quiz with prizes and good vibes.",
    price: 180,
    location: "Braamfontein",
    category: "Social",
    images: ["/placeholder.svg?height=500&width=400&text=Craft+Beer+Quiz"],
    hostId: "host_3",
    host: mockUsers[2],
    maxGuests: 6,
    rating: 4.6,
    reviewCount: 19,
    views: 145,
    likes: 37,
    tags: ["beer", "quiz", "social", "prizes"],
    status: "active",
    cancellationPolicy: "flexible",
    bookingStats: { totalBookings: 8, confirmedBookings: 7, canceledBookings: 1, pendingPayments: 0 },
    analytics: { totalViews: 145, totalLikes: 37, totalBookings: 7 },
    availableSlots: [{ id: "slot_17", date: "2024-01-27", startTime: "19:00", endTime: "22:00", isBooked: false }],
  },
  {
    id: "18",
    title: "Vintage Car Tour & Lunch",
    description: "Scenic drive in a classic vintage car through Johannesburg's historic areas with lunch stop.",
    price: 420,
    location: "Parktown",
    category: "Adventure",
    images: ["/placeholder.svg?height=500&width=400&text=Vintage+Car+Tour"],
    hostId: "host_6",
    host: mockUsers[5],
    maxGuests: 3,
    rating: 4.9,
    reviewCount: 12,
    views: 87,
    likes: 29,
    tags: ["vintage", "car", "tour", "historic"],
    status: "active",
    cancellationPolicy: "strict",
    bookingStats: { totalBookings: 5, confirmedBookings: 5, canceledBookings: 0, pendingPayments: 0 },
    analytics: { totalViews: 87, totalLikes: 29, totalBookings: 5 },
    availableSlots: [{ id: "slot_18", date: "2024-01-28", startTime: "11:00", endTime: "16:00", isBooked: false }],
  },
  {
    id: "19",
    title: "Stargazing & Astronomy",
    description: "Learn about constellations and planets with professional telescope equipment and hot chocolate.",
    price: 250,
    location: "Hartebeespoort",
    category: "Educational",
    images: ["/placeholder.svg?height=500&width=400&text=Stargazing"],
    hostId: "host_4",
    host: mockUsers[3],
    maxGuests: 4,
    rating: 4.8,
    reviewCount: 14,
    views: 76,
    likes: 25,
    tags: ["stargazing", "astronomy", "telescope", "educational"],
    status: "active",
    cancellationPolicy: "moderate",
    bookingStats: { totalBookings: 6, confirmedBookings: 6, canceledBookings: 0, pendingPayments: 0 },
    analytics: { totalViews: 76, totalLikes: 25, totalBookings: 6 },
    availableSlots: [{ id: "slot_19", date: "2024-01-28", startTime: "20:00", endTime: "23:00", isBooked: false }],
  },
  {
    id: "20",
    title: "Pottery & Wine Evening",
    description: "Create your own pottery pieces while enjoying local wines in a relaxed studio setting.",
    price: 320,
    location: "Melville",
    category: "Creative",
    images: ["/placeholder.svg?height=500&width=400&text=Pottery+Wine"],
    hostId: "host_7",
    host: mockUsers[6],
    maxGuests: 8,
    rating: 4.7,
    reviewCount: 21,
    views: 112,
    likes: 38,
    tags: ["pottery", "wine", "creative", "art"],
    status: "active",
    cancellationPolicy: "moderate",
    bookingStats: { totalBookings: 9, confirmedBookings: 8, canceledBookings: 1, pendingPayments: 0 },
    analytics: { totalViews: 112, totalLikes: 38, totalBookings: 8 },
    availableSlots: [{ id: "slot_20", date: "2024-01-29", startTime: "18:00", endTime: "21:00", isBooked: false }],
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
    actionUrl: "/offers/2",
  },
  {
    id: "notif_2",
    userId: "user_1",
    title: "Booking Confirmed",
    message: "Your spa session with Zanele has been confirmed for tomorrow",
    type: "booking",
    category: "booking",
    priority: "high",
    read: false,
    timestamp: "2024-01-17T12:00:00Z",
    actionUrl: "/calendar",
  },
  {
    id: "notif_3",
    userId: "user_1",
    title: "New Message",
    message: "Kagiso sent you a message about the music session",
    type: "message",
    category: "chat",
    priority: "medium",
    read: true,
    timestamp: "2024-01-18T16:35:00Z",
    actionUrl: "/chats/chat_5",
  },
]

const mockBlockedDates: BlockedDate[] = [
  {
    id: "blocked_1",
    date: "2024-01-25",
    reason: "Personal commitment",
    hostId: "user_1",
  },
  {
    id: "blocked_2",
    date: "2024-02-14",
    reason: "Valentine's Day - family time",
    hostId: "user_1",
  },
  {
    id: "blocked_3",
    date: "2024-02-20",
    reason: "Business trip to Cape Town",
    hostId: "user_1",
  },
  {
    id: "blocked_4",
    date: "2024-03-15",
    reason: "Medical appointment",
    hostId: "user_1",
  },
  {
    id: "blocked_5",
    date: "2024-03-21",
    reason: "Human Rights Day - public holiday",
    hostId: "user_1",
  },
]

const mockBookings: Booking[] = [
  // GUEST BOOKINGS (where current user is attending others' offers)
  {
    id: "booking_1",
    offerId: "1",
    guestId: "user_1",
    hostId: "host_1",
    status: "confirmed",
    paymentConfirmed: true,
    paymentConfirmedAt: "2024-01-15T11:00:00Z",
    guestCount: 2,
    specialRequests: "Window table preferred",
    slot: { id: "slot_1", date: "2025-05-28", startTime: "18:00", endTime: "21:00" },
    offer: { title: "Romantic Dinner at Sunset", location: "Sandton City", price: 450, cancellationPolicy: "moderate" },
    guest: mockUser,
    host: mockUsers[0],
    createdAt: "2024-01-15T10:00:00Z",
    chatId: "chat_1",
  },
  {
    id: "booking_2",
    offerId: "2",
    guestId: "user_1",
    hostId: "host_2",
    status: "confirmed",
    paymentConfirmed: true,
    paymentConfirmedAt: "2024-01-14T16:00:00Z",
    guestCount: 1,
    slot: { id: "slot_2", date: "2025-05-30", startTime: "14:00", endTime: "17:00" },
    offer: { title: "Wine Tasting Adventure", location: "Pretoria East", price: 280, cancellationPolicy: "flexible" },
    guest: mockUser,
    host: mockUsers[1],
    createdAt: "2024-01-14T14:00:00Z",
    chatId: "chat_2",
  },
  {
    id: "booking_3",
    offerId: "3",
    guestId: "user_1",
    hostId: "host_3",
    status: "confirmed",
    paymentConfirmed: true,
    paymentConfirmedAt: "2024-01-16T18:00:00Z",
    guestCount: 2,
    specialRequests: "Early morning start preferred",
    slot: { id: "slot_3", date: "2025-06-02", startTime: "08:00", endTime: "12:00" },
    offer: { title: "Hiking & Coffee Date", location: "Magaliesberg", price: 180, cancellationPolicy: "flexible" },
    guest: mockUser,
    host: mockUsers[2],
    createdAt: "2024-01-16T17:00:00Z",
    chatId: "chat_3",
  },
  {
    id: "booking_4",
    offerId: "9",
    guestId: "user_1",
    hostId: "host_5",
    status: "confirmed",
    paymentConfirmed: true,
    paymentConfirmedAt: "2024-01-17T11:30:00Z",
    guestCount: 2,
    specialRequests: "Aromatherapy oils preferred",
    slot: { id: "slot_9", date: "2025-06-05", startTime: "10:00", endTime: "14:00" },
    offer: { title: "Spa & Wellness Retreat", location: "Rosebank", price: 380, cancellationPolicy: "moderate" },
    guest: mockUser,
    host: mockUsers[4],
    createdAt: "2024-01-17T09:00:00Z",
    chatId: "chat_4",
  },
  {
    id: "booking_5",
    offerId: "11",
    guestId: "user_1",
    hostId: "host_6",
    status: "confirmed",
    paymentConfirmed: true,
    paymentConfirmedAt: "2024-01-18T17:00:00Z",
    guestCount: 1,
    slot: { id: "slot_11", date: "2025-06-07", startTime: "19:00", endTime: "23:00" },
    offer: { title: "Amapiano Music Session", location: "Soweto", price: 220, cancellationPolicy: "flexible" },
    guest: mockUser,
    host: mockUsers[5],
    createdAt: "2024-01-18T15:00:00Z",
    chatId: "chat_5",
  },
  {
    id: "booking_6",
    offerId: "13",
    guestId: "user_1",
    hostId: "host_7",
    status: "confirmed",
    paymentConfirmed: true,
    paymentConfirmedAt: "2024-01-19T13:00:00Z",
    guestCount: 1,
    slot: { id: "slot_13", date: "2025-06-10", startTime: "18:00", endTime: "20:00" },
    offer: { title: "Dance Class & Chill", location: "Centurion", price: 150, cancellationPolicy: "flexible" },
    guest: mockUser,
    host: mockUsers[6],
    createdAt: "2024-01-19T11:00:00Z",
    chatId: "chat_6",
  },
  {
    id: "booking_7",
    offerId: "15",
    guestId: "user_1",
    hostId: "host_8",
    status: "pending",
    paymentConfirmed: false,
    guestCount: 2,
    specialRequests: "Vegetarian options please",
    slot: { id: "slot_15", date: "2025-06-12", startTime: "16:00", endTime: "20:00" },
    offer: { title: "Traditional Braai Experience", location: "Alberton", price: 200, cancellationPolicy: "moderate" },
    guest: mockUser,
    host: mockUsers[7],
    createdAt: "2024-01-20T13:00:00Z",
    chatId: "chat_7",
  },
  {
    id: "booking_8",
    offerId: "16",
    guestId: "user_1",
    hostId: "host_5",
    status: "confirmed",
    paymentConfirmed: true,
    paymentConfirmedAt: "2024-01-21T08:00:00Z",
    guestCount: 1,
    slot: { id: "slot_16", date: "2025-06-15", startTime: "06:00", endTime: "08:00" },
    offer: { title: "Yoga & Meditation Sunrise", location: "Zoo Lake", price: 120, cancellationPolicy: "flexible" },
    guest: mockUser,
    host: mockUsers[4],
    createdAt: "2024-01-21T07:00:00Z",
    chatId: "chat_8",
  },
  {
    id: "booking_9",
    offerId: "17",
    guestId: "user_1",
    hostId: "host_3",
    status: "confirmed",
    paymentConfirmed: true,
    paymentConfirmedAt: "2024-01-22T14:00:00Z",
    guestCount: 3,
    specialRequests: "Team trivia challenge",
    slot: { id: "slot_17", date: "2025-06-18", startTime: "19:00", endTime: "22:00" },
    offer: { title: "Craft Beer & Pub Quiz", location: "Braamfontein", price: 180, cancellationPolicy: "flexible" },
    guest: mockUser,
    host: mockUsers[2],
    createdAt: "2024-01-22T13:00:00Z",
    chatId: "chat_9",
  },
  {
    id: "booking_10",
    offerId: "19",
    guestId: "user_1",
    hostId: "host_4",
    status: "confirmed",
    paymentConfirmed: true,
    paymentConfirmedAt: "2024-01-23T16:00:00Z",
    guestCount: 2,
    specialRequests: "Interested in learning about Saturn",
    slot: { id: "slot_19", date: "2025-06-20", startTime: "20:00", endTime: "23:00" },
    offer: { title: "Stargazing & Astronomy", location: "Hartebeespoort", price: 250, cancellationPolicy: "moderate" },
    guest: mockUser,
    host: mockUsers[3],
    createdAt: "2024-01-23T15:00:00Z",
    chatId: "chat_10",
  },

  // HOST BOOKINGS (where current user is hosting and others are attending)
  {
    id: "booking_host_1",
    offerId: "user_offer_1",
    guestId: "host_2",
    hostId: "user_1",
    status: "confirmed",
    paymentConfirmed: true,
    paymentConfirmedAt: "2024-01-21T14:00:00Z",
    guestCount: 2,
    specialRequests: "Anniversary celebration",
    slot: { id: "slot_user_1", date: "2025-05-29", startTime: "19:00", endTime: "22:00" },
    offer: { title: "Rooftop Dinner Experience", location: "Sandton", price: 380, cancellationPolicy: "moderate" },
    guest: mockUsers[1],
    host: mockUser,
    createdAt: "2024-01-21T14:00:00Z",
    chatId: "chat_host_1",
  },
  {
    id: "booking_host_2",
    offerId: "user_offer_2",
    guestId: "host_3",
    hostId: "user_1",
    status: "confirmed",
    paymentConfirmed: true,
    paymentConfirmedAt: "2024-01-22T10:00:00Z",
    guestCount: 4,
    specialRequests: "Group of friends visiting from Cape Town",
    slot: { id: "slot_user_2", date: "2025-06-01", startTime: "16:00", endTime: "20:00" },
    offer: {
      title: "Traditional Braai & Stories",
      location: "Johannesburg",
      price: 320,
      cancellationPolicy: "moderate",
    },
    guest: mockUsers[2],
    host: mockUser,
    createdAt: "2024-01-22T09:00:00Z",
    chatId: "chat_host_2",
  },
  {
    id: "booking_host_3",
    offerId: "user_offer_3",
    guestId: "host_4",
    hostId: "user_1",
    status: "pending",
    paymentConfirmed: false,
    guestCount: 1,
    specialRequests: "First time trying this activity",
    slot: { id: "slot_user_3", date: "2025-06-04", startTime: "10:00", endTime: "13:00" },
    offer: { title: "Photography Workshop", location: "Maboneng", price: 250, cancellationPolicy: "flexible" },
    guest: mockUsers[3],
    host: mockUser,
    createdAt: "2024-01-23T11:00:00Z",
    chatId: "chat_host_3",
  },
  {
    id: "booking_host_4",
    offerId: "user_offer_4",
    guestId: "host_5",
    hostId: "user_1",
    status: "confirmed",
    paymentConfirmed: true,
    paymentConfirmedAt: "2024-01-24T15:00:00Z",
    guestCount: 2,
    specialRequests: "Couple's cooking session",
    slot: { id: "slot_user_4", date: "2025-06-08", startTime: "11:00", endTime: "15:00" },
    offer: { title: "Cooking Masterclass", location: "Rosebank", price: 420, cancellationPolicy: "moderate" },
    guest: mockUsers[4],
    host: mockUser,
    createdAt: "2024-01-24T14:00:00Z",
    chatId: "chat_host_4",
  },
  {
    id: "booking_host_5",
    offerId: "user_offer_5",
    guestId: "host_6",
    hostId: "user_1",
    status: "confirmed",
    paymentConfirmed: true,
    paymentConfirmedAt: "2024-01-25T12:00:00Z",
    guestCount: 3,
    specialRequests: "Music production enthusiasts",
    slot: { id: "slot_user_5", date: "2025-06-11", startTime: "18:00", endTime: "22:00" },
    offer: { title: "Music Production Workshop", location: "Soweto", price: 300, cancellationPolicy: "flexible" },
    guest: mockUsers[5],
    host: mockUser,
    createdAt: "2024-01-25T11:00:00Z",
    chatId: "chat_host_5",
  },
  {
    id: "booking_host_6",
    offerId: "user_offer_6",
    guestId: "host_7",
    hostId: "user_1",
    status: "confirmed",
    paymentConfirmed: true,
    paymentConfirmedAt: "2024-01-26T09:00:00Z",
    guestCount: 2,
    specialRequests: "Fitness beginners",
    slot: { id: "slot_user_6", date: "2025-06-14", startTime: "07:00", endTime: "09:00" },
    offer: { title: "Morning Fitness Bootcamp", location: "Zoo Lake", price: 180, cancellationPolicy: "flexible" },
    guest: mockUsers[6],
    host: mockUser,
    createdAt: "2024-01-26T08:00:00Z",
    chatId: "chat_host_6",
  },
  {
    id: "booking_host_7",
    offerId: "user_offer_7",
    guestId: "host_8",
    hostId: "user_1",
    status: "pending",
    paymentConfirmed: false,
    guestCount: 4,
    specialRequests: "Corporate team building",
    slot: { id: "slot_user_7", date: "2025-06-17", startTime: "14:00", endTime: "18:00" },
    offer: { title: "Team Building Adventure", location: "Magaliesberg", price: 350, cancellationPolicy: "moderate" },
    guest: mockUsers[7],
    host: mockUser,
    createdAt: "2024-01-27T10:00:00Z",
    chatId: "chat_host_7",
  },
  {
    id: "booking_host_8",
    offerId: "user_offer_8",
    guestId: "host_1",
    hostId: "user_1",
    status: "confirmed",
    paymentConfirmed: true,
    paymentConfirmedAt: "2024-01-28T13:00:00Z",
    guestCount: 1,
    specialRequests: "Wine pairing expertise needed",
    slot: { id: "slot_user_8", date: "2025-06-21", startTime: "17:00", endTime: "21:00" },
    offer: { title: "Wine & Cheese Pairing", location: "Pretoria", price: 280, cancellationPolicy: "moderate" },
    guest: mockUsers[0],
    host: mockUser,
    createdAt: "2024-01-28T12:00:00Z",
    chatId: "chat_host_8",
  },
]

// Store with message management and notification triggers
const allMessages = [...mockMessages]
const favoriteOffersList: string[] = ["2", "5", "8", "12"]

// Global notification function (will be set by the provider)
let globalShowNotification: ((notification: any) => void) | null = null

export const setGlobalNotificationFunction = (fn: (notification: any) => void) => {
  globalShowNotification = fn
}

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

    // Actions with notification triggers
    likeOffer: (offerId: string) => {
      const offer = mockOffers.find((o) => o.id === offerId)
      if (offer && globalShowNotification) {
        globalShowNotification({
          type: "match",
          title: "New Match! 💕",
          message: `You liked "${offer.title}" by ${offer.host.name}`,
          actionUrl: `/offers/${offerId}`,
        })
      }
      console.log("Liked offer:", offerId)
    },

    passOffer: (offerId: string) => {
      console.log("Passed offer:", offerId)
    },

    toggleFavorite: (offerId: string) => {
      const isFavorited = favoriteOffersList.includes(offerId)
      const offer = mockOffers.find((o) => o.id === offerId)

      if (isFavorited) {
        // Remove from favorites
        const index = favoriteOffersList.indexOf(offerId)
        favoriteOffersList.splice(index, 1)
        if (offer && globalShowNotification) {
          globalShowNotification({
            type: "info",
            title: "Removed from Favorites",
            message: `"${offer.title}" removed from your favorites`,
          })
        }
        console.log("Removed from favorites:", offerId)
      } else {
        // Add to favorites (with 10-offer limit)
        if (favoriteOffersList.length >= 10) {
          if (globalShowNotification) {
            globalShowNotification({
              type: "warning",
              title: "Favorites Limit Reached",
              message: "You can only have 10 favorites. Remove some to add more.",
            })
          }
          console.log("Cannot add more favorites - limit of 10 reached")
          return false // Indicate limit reached
        }
        favoriteOffersList.push(offerId)
        if (offer && globalShowNotification) {
          globalShowNotification({
            type: "success",
            title: "Added to Favorites ⭐",
            message: `"${offer.title}" added to your favorites`,
          })
        }
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
      if (globalShowNotification) {
        globalShowNotification({
          type: "info",
          title: "Date Blocked",
          message: `${date} has been blocked: ${reason}`,
          actionUrl: "/calendar",
        })
      }
      console.log("Added blocked date:", date, reason)
    },

    removeBlockedDate: (id: string) => {
      console.log("Removed blocked date:", id)
    },

    // Chat actions with notifications
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

        // Trigger notification for new message
        const chat = mockChats[chatIndex]
        const otherParticipant = chat.booking.host.id === mockUser.id ? chat.booking.guest : chat.booking.host

        if (messageData.senderId !== mockUser.id && globalShowNotification) {
          globalShowNotification({
            type: "message",
            title: "New Message 💬",
            message: `${otherParticipant.name}: ${newMessage.content.substring(0, 50)}${newMessage.content.length > 50 ? "..." : ""}`,
            actionUrl: `/chats/${chatId}`,
          })
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

    // Booking actions with notifications
    bookOffer: (offerId: string, slotId: string, guestCount = 1, specialRequests?: string) => {
      const offer = mockOffers.find((o) => o.id === offerId)
      if (offer && globalShowNotification) {
        globalShowNotification({
          type: "booking",
          title: "Booking Request Sent! 📅",
          message: `Your booking request for "${offer.title}" has been sent to ${offer.host.name}`,
          actionUrl: "/calendar",
        })
      }
      console.log("Created booking for offer:", offerId, "slot:", slotId)
    },

    confirmPayment: (bookingId: string) => {
      const booking = mockBookings.find((b) => b.id === bookingId)
      if (booking && globalShowNotification) {
        globalShowNotification({
          type: "payment",
          title: "Payment Confirmed! 💳",
          message: `Payment confirmed for "${booking.offer.title}" - R${booking.offer.price}`,
          actionUrl: "/calendar",
        })
      }
      console.log("Payment confirmed for booking:", bookingId)
    },

    requestBookingCancellation: (bookingId: string, reason: string) => {
      const booking = mockBookings.find((b) => b.id === bookingId)
      if (booking && globalShowNotification) {
        globalShowNotification({
          type: "warning",
          title: "Cancellation Requested",
          message: `Cancellation request sent for "${booking.offer.title}"`,
          actionUrl: "/calendar",
        })
      }
      console.log("Cancellation requested for booking:", bookingId, "reason:", reason)
    },

    editBooking: (bookingId: string, updates: { guestCount?: number; specialRequests?: string }) => {
      const booking = mockBookings.find((b) => b.id === bookingId)
      if (booking && globalShowNotification) {
        globalShowNotification({
          type: "info",
          title: "Booking Updated",
          message: `Your booking for "${booking.offer.title}" has been updated`,
          actionUrl: "/calendar",
        })
      }
      console.log("Edited booking:", bookingId, updates)
    },
  }
}
