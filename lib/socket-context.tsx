"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { io, type Socket } from "socket.io-client"
import { useSession } from "next-auth/react"

interface SocketContextType {
  socket: Socket | null
  isConnected: boolean
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
})

export const useSocket = () => {
  const context = useContext(SocketContext)
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider")
  }
  return context
}

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const { data: session } = useSession()

  useEffect(() => {
    if (session?.user) {
      // Initialize socket connection
      const socketInstance = io(process.env.NODE_ENV === "production" ? "" : "http://localhost:3000", {
        path: "/api/socket/io",
        addTrailingSlash: false,
      })

      socketInstance.on("connect", () => {
        console.log("Socket connected:", socketInstance.id)
        setIsConnected(true)

        // Join user room for personal notifications
        socketInstance.emit("join-user-room", session.user.id)
      })

      socketInstance.on("disconnect", () => {
        console.log("Socket disconnected")
        setIsConnected(false)
      })

      socketInstance.on("connect_error", (error) => {
        console.error("Socket connection error:", error)
        setIsConnected(false)
      })

      setSocket(socketInstance)

      return () => {
        socketInstance.close()
      }
    }
  }, [session])

  return <SocketContext.Provider value={{ socket, isConnected }}>{children}</SocketContext.Provider>
}
