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
    slot: { id: "slot_1", date: "2024-01-20", startTime: "18:00", endTime: "21:00" },
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
    slot: { id: "slot_2", date: "2024-01-21", startTime: "14:00", endTime: "17:00" },
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
    slot: { id: "slot_3", date: "2024-01-22", startTime: "08:00", endTime: "12:00" },
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
    slot: { id: "slot_9", date: "2024-01-23", startTime: "10:00", endTime: "14:00" },
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
    slot: { id: "slot_11", date: "2024-01-24", startTime: "19:00", endTime: "23:00" },
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
    slot: { id: "slot_13", date: "2024-01-25", startTime: "18:00", endTime: "20:00" },
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
    slot: { id: "slot_15", date: "2024-01-26", startTime: "16:00", endTime: "20:00" },
    offer: { title: "Traditional Braai Experience", location: "Alberton", price: 200, cancellationPolicy: "moderate" },
    guest: mockUser,
    host: mockUsers[7],
    createdAt: "2024-01-20T13:00:00Z",
    chatId: "chat_7",
  },
  // Host requests (where current user is the host)
  {
    id: "booking_8",
    offerId: "1",
    guestId: "host_2",
    hostId: "user_1",
    status: "pending",
    paymentConfirmed: false,
    guestCount: 2,
    specialRequests: "Anniversary celebration",
    slot: { id: "slot_1b", date: "2024-01-28", startTime: "19:00", endTime: "22:00" },
    offer: { title: "Romantic Dinner at Sunset", location: "Sandton City", price: 450, cancellationPolicy: "moderate" },
    guest: mockUsers[1],
    host: mockUser,
    createdAt: "2024-01-21T14:00:00Z",
    chatId: "chat_8",
  },
  {
    id: "booking_9",
    offerId: "5",
    guestId: "host_3",
    hostId: "user_1",
    status: "confirmed",
    paymentConfirmedAt: "2024-01-22T10:00:00Z",
    guestCount: 4,
    specialRequests: "Group of friends visiting from Cape Town",
    slot: { id: "slot_5b", date: "2024-01-29", startTime: "16:00", endTime: "20:00" },
    offer: { title: "Traditional Braai & Stories", location: "Soweto", price: 320, cancellationPolicy: "moderate" },
    guest: mockUsers[2],
    host: mockUser,
    createdAt: "2024-01-22T09:00:00Z",
    chatId: "chat_9",
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
