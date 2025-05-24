import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

// Simple in-memory storage for now (will be replaced with database later)
const messages: any[] = []

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const chatId = searchParams.get("chatId")

    if (!chatId) {
      return NextResponse.json({ error: "Chat ID required" }, { status: 400 })
    }

    const chatMessages = messages.filter((msg) => msg.chatId === chatId)
    return NextResponse.json({ messages: chatMessages })
  } catch (error) {
    console.error("Error fetching messages:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { chatId, content } = body

    if (!chatId || !content) {
      return NextResponse.json({ error: "Chat ID and content required" }, { status: 400 })
    }

    const newMessage = {
      id: Date.now().toString(),
      chatId,
      content,
      senderId: session.user.id,
      senderName: session.user.name,
      senderImage: session.user.image,
      createdAt: new Date().toISOString(),
      read: false,
    }

    messages.push(newMessage)
    return NextResponse.json({ message: newMessage })
  } catch (error) {
    console.error("Error sending message:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
