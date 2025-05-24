import type { NextRequest } from "next/server"
import type { Server as NetServer } from "http"
import { Server as ServerIO } from "socket.io"

let io: ServerIO

export async function GET(req: NextRequest) {
  if (!io) {
    const httpServer = (global as any).httpServer as NetServer

    if (!httpServer) {
      return new Response("Server not available", { status: 503 })
    }

    io = new ServerIO(httpServer, {
      path: "/api/socket/io",
      addTrailingSlash: false,
      cors: {
        origin: process.env.NODE_ENV === "production" ? false : ["http://localhost:3000"],
        methods: ["GET", "POST"],
      },
    })

    io.on("connection", (socket) => {
      console.log("Socket connected:", socket.id)

      socket.on("join-user-room", (userId) => {
        socket.join(`user_${userId}`)
        console.log(`User ${userId} joined their room`)
      })

      socket.on("join-chat", (chatId) => {
        socket.join(`chat_${chatId}`)
        console.log(`Socket joined chat ${chatId}`)
      })

      socket.on("leave-chat", (chatId) => {
        socket.leave(`chat_${chatId}`)
        console.log(`Socket left chat ${chatId}`)
      })

      socket.on("typing-start", ({ chatId, userId, userName }) => {
        socket.to(`chat_${chatId}`).emit("user-typing", { userId, userName })
      })

      socket.on("typing-stop", ({ chatId, userId }) => {
        socket.to(`chat_${chatId}`).emit("user-stopped-typing", { userId })
      })

      socket.on("disconnect", () => {
        console.log("Socket disconnected:", socket.id)
      })
    })
    ;(global as any).io = io
  }

  return new Response("Socket.IO server running", { status: 200 })
}
