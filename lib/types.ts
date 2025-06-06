// Instead of linking to external types, define them locally
export interface User {
  id: string
  name: string
  email: string
  image?: string
  createdAt: Date
  updatedAt: Date
}

export interface Offer {
  id: string
  title: string
  description: string
  price: number
  location: string
  userId: string
  createdAt: Date
  updatedAt: Date
}

export interface Booking {
  id: string
  offerId: string
  userId: string
  status: "pending" | "confirmed" | "cancelled"
  scheduledFor: Date
  createdAt: Date
  updatedAt: Date
}

export interface Chat {
  id: string
  participants: string[]
  lastMessage?: string
  lastMessageAt?: Date
  createdAt: Date
  updatedAt: Date
}

export interface Message {
  id: string
  chatId: string
  senderId: string
  content: string
  type: "text" | "image" | "system"
  createdAt: Date
}
