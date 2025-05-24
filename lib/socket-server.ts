import type { Server as NetServer } from "http"
import { Server as ServerIO } from "socket.io"

export const config = {
  api: {
    bodyParser: false,
  },
}

let io: ServerIO

export const initSocket = (server: NetServer) => {
  if (!io) {
    io = new ServerIO(server, {
      path: "/api/socket/io",
      addTrailingSlash: false,
      cors: {
        origin: process.env.NODE_ENV === "production" ? false : ["http://localhost:3000"],
        methods: ["GET", "POST"],
      },
    })

    io.on("connection", async (socket) => {
      console.log("Socket connected:", socket.id)

      // Handle user authentication and room joining
      socket.on("authenticate", async (token) => {
        try {
          // In a real implementation, you'd verify the token here
          // For now, we'll use a simple user ID
          const userId = token.userId
          if (userId) {
            socket.join(`user_${userId}`)
            console.log(`User ${userId} joined their room`)
          }
        } catch (error) {
          console.error("Authentication error:", error)
        }
      })

      // Handle joining chat rooms
      socket.on("join_chat", (chatId) => {
        socket.join(`chat_${chatId}`)
        console.log(`Socket ${socket.id} joined chat ${chatId}`)
      })

      // Handle leaving chat rooms
      socket.on("leave_chat", (chatId) => {
        socket.leave(`chat_${chatId}`)
        console.log(`Socket ${socket.id} left chat ${chatId}`)
      })

      // Handle typing indicators
      socket.on("typing_start", ({ chatId, userId, userName }) => {
        socket.to(`chat_${chatId}`).emit("user_typing", { userId, userName })
      })

      socket.on("typing_stop", ({ chatId, userId }) => {
        socket.to(`chat_${chatId}`).emit("user_stopped_typing", { userId })
      })

      socket.on("disconnect", () => {
        console.log("Socket disconnected:", socket.id)
      })
    })
  }

  return io
}

export { io }
