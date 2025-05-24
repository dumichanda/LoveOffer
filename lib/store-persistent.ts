import { create } from "zustand"

interface Message {
  id: string
  content: string
  senderId: string
  chatId: string
  read: boolean
  createdAt: string
  sender: {
    id: string
    name: string
    image?: string
  }
}

interface Chat {
  id: string
  participants: Array<{
    user: {
      id: string
      name: string
      image?: string
    }
  }>
  messages: Message[]
  lastMessage?: Message
  unreadCount: number
  booking?: any
}

interface ChatStore {
  chats: Chat[]
  messages: Record<string, Message[]>
  loading: boolean
  error: string | null

  // Actions
  fetchChats: () => Promise<void>
  fetchMessages: (chatId: string) => Promise<void>
  sendMessage: (chatId: string, content: string) => Promise<void>
  markMessagesRead: (chatId: string) => Promise<void>
  addMessage: (message: Message) => void
  updateMessageReadStatus: (chatId: string, readBy: string) => void
}

export const useChatStore = create<ChatStore>((set, get) => ({
  chats: [],
  messages: {},
  loading: false,
  error: null,

  fetchChats: async () => {
    set({ loading: true, error: null })
    try {
      const response = await fetch("/api/chats")
      if (!response.ok) throw new Error("Failed to fetch chats")

      const { chats } = await response.json()
      set({ chats, loading: false })
    } catch (error) {
      set({ error: (error as Error).message, loading: false })
    }
  },

  fetchMessages: async (chatId: string) => {
    set({ loading: true, error: null })
    try {
      const response = await fetch(`/api/messages?chatId=${chatId}`)
      if (!response.ok) throw new Error("Failed to fetch messages")

      const { messages } = await response.json()
      set((state) => ({
        messages: { ...state.messages, [chatId]: messages },
        loading: false,
      }))
    } catch (error) {
      set({ error: (error as Error).message, loading: false })
    }
  },

  sendMessage: async (chatId: string, content: string) => {
    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chatId, content }),
      })

      if (!response.ok) throw new Error("Failed to send message")

      const { message } = await response.json()

      // Message will be added via real-time update
      // No need to manually add here as Socket.IO will handle it
    } catch (error) {
      set({ error: (error as Error).message })
    }
  },

  markMessagesRead: async (chatId: string) => {
    try {
      const response = await fetch("/api/messages/read", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chatId }),
      })

      if (!response.ok) throw new Error("Failed to mark messages as read")

      // Update local state
      set((state) => ({
        messages: {
          ...state.messages,
          [chatId]: state.messages[chatId]?.map((msg) => ({ ...msg, read: true })) || [],
        },
        chats: state.chats.map((chat) => (chat.id === chatId ? { ...chat, unreadCount: 0 } : chat)),
      }))
    } catch (error) {
      set({ error: (error as Error).message })
    }
  },

  addMessage: (message: Message) => {
    set((state) => ({
      messages: {
        ...state.messages,
        [message.chatId]: [...(state.messages[message.chatId] || []), message],
      },
      chats: state.chats.map((chat) =>
        chat.id === message.chatId
          ? {
              ...chat,
              lastMessage: message,
              unreadCount: message.senderId !== getCurrentUserId() ? chat.unreadCount + 1 : chat.unreadCount,
            }
          : chat,
      ),
    }))
  },

  updateMessageReadStatus: (chatId: string, readBy: string) => {
    set((state) => ({
      messages: {
        ...state.messages,
        [chatId]:
          state.messages[chatId]?.map((msg) => (msg.senderId === getCurrentUserId() ? { ...msg, read: true } : msg)) ||
          [],
      },
    }))
  },
}))

// Helper function to get current user ID
function getCurrentUserId(): string {
  // This should be implemented based on your auth system
  // For now, return a placeholder
  return "current-user-id"
}
