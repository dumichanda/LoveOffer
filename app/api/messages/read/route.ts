import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { io } from "@/lib/socket-server"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { chatId } = await request.json()

    if (!chatId) {
      return NextResponse.json({ error: "Chat ID required" }, { status: 400 })
    }

    // Verify user is participant in this chat
    const chatParticipant = await prisma.chatParticipant.findFirst({
      where: {
        chatId,
        userId: session.user.id,
      },
    })

    if (!chatParticipant) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 })
    }

    // Mark all messages in this chat as read for this user
    await prisma.message.updateMany({
      where: {
        chatId,
        senderId: { not: session.user.id }, // Don't mark own messages as read
        read: false,
      },
      data: { read: true },
    })

    // Emit read receipt to other participants
    const otherParticipants = await prisma.chatParticipant.findMany({
      where: {
        chatId,
        userId: { not: session.user.id },
      },
      select: { userId: true },
    })

    otherParticipants.forEach((participant) => {
      io.to(`user_${participant.userId}`).emit("messages_read", {
        chatId,
        readBy: session.user.id,
      })
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error marking messages as read:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
