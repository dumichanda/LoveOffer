"use client"

import type React from "react"

import { createContext, useContext, useState } from "react"
import { useSession } from "next-auth/react"

interface SocketContextType {
  isConnected: boolean
  sendMessage: (chatId: string, message: string) => void
  joinChat: (chatId: string) => void
  leaveChat: (chatId: string) => void
}

const SocketContext = createContext<SocketContextType>({
  isConnected: false,
  sendMessage: () => {},
  joinChat: () => {},
  leaveChat: () => {},
})

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false)
  const { data: session } = useSession()

  // Simplified socket provider without actual Socket.IO for now
  const sendMessage = (chatId: string, message: string) => {
    console.log("Sending message:", { chatId, message })
    // This will be implemented with actual Socket.IO later
  }

  const joinChat = (chatId: string) => {
    console.log("Joining chat:", chatId)
  }

  const leaveChat = (chatId: string) => {
    console.log("Leaving chat:", chatId)
  }

  return (
    <SocketContext.Provider
      value={{
        isConnected,
        sendMessage,
        joinChat,
        leaveChat,
      }}
    >
      {children}
    </SocketContext.Provider>
  )
}

export const useSocket = () => useContext(SocketContext)
