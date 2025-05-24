"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { ArrowLeft, Send, Phone, Video, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { useSocket } from "@/lib/socket-context"
import { useChatStore } from "@/lib/store-persistent"
import { getTimeAgo } from "@/lib/utils"

export default function ChatDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { data: session } = useSession()
  const { socket } = useSocket()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { messages, fetchMessages, sendMessage, markMessagesRead, addMessage, updateMessageReadStatus } = useChatStore()

  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [typingUsers, setTypingUsers] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  const chatId = params.id as string
  const chatMessages = messages[chatId] || []

  useEffect(() => {
    if (chatId && session?.user?.id) {
      // Fetch messages for this chat
      fetchMessages(chatId).finally(() => setLoading(false))

      // Mark messages as read
      markMessagesRead(chatId)

      // Join chat room for real-time updates
      if (socket) {
        socket.emit("join-chat", chatId)

        // Listen for new messages
        socket.on("new_message", ({ chatId: messageChatId, message }) => {
          if (messageChatId === chatId) {
            addMessage(message)
            scrollToBottom()
          }
        })

        // Listen for read receipts
        socket.on("messages_read", ({ chatId: readChatId, readBy }) => {
          if (readChatId === chatId) {
            updateMessageReadStatus(chatId, readBy)
          }
        })

        // Listen for typing indicators
        socket.on("user-typing", ({ userId, userName }) => {
          if (userId !== session.user.id) {
            setTypingUsers((prev) => [...prev.filter((id) => id !== userId), userId])
          }
        })

        socket.on("user-stopped-typing", ({ userId }) => {
          setTypingUsers((prev) => prev.filter((id) => id !== userId))
        })

        return () => {
          socket.emit("leave-chat", chatId)
          socket.off("new_message")
          socket.off("messages_read")
          socket.off("user-typing")
          socket.off("user-stopped-typing")
        }
      }
    }
  }, [chatId, session?.user?.id, socket])

  useEffect(() => {
    scrollToBottom()
  }, [chatMessages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !session?.user?.id) return

    const messageContent = newMessage.trim()
    setNewMessage("")

    // Stop typing indicator
    if (socket && isTyping) {
      socket.emit("typing-stop", { chatId, userId: session.user.id })
      setIsTyping(false)
    }

    try {
      await sendMessage(chatId, messageContent)
    } catch (error) {
      console.error("Failed to send message:", error)
      // Optionally show error toast
    }
  }

  const handleTyping = (value: string) => {
    setNewMessage(value)

    if (socket && session?.user?.id) {
      if (value.trim() && !isTyping) {
        socket.emit("typing-start", {
          chatId,
          userId: session.user.id,
          userName: session.user.name,
        })
        setIsTyping(true)
      } else if (!value.trim() && isTyping) {
        socket.emit("typing-stop", { chatId, userId: session.user.id })
        setIsTyping(false)
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading chat...</p>
        </div>
      </div>
    )
  }

  if (!session?.user?.id) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Card className="p-8 text-center bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Authentication Required</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">Please sign in to access chat</p>
          <Button onClick={() => router.push("/auth/signin")}>Sign In</Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col transition-colors">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()}>
            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
          <Avatar className="w-8 h-8">
            <AvatarFallback>CH</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="font-semibold text-gray-900 dark:text-white">Chat</h1>
            {typingUsers.length > 0 && (
              <p className="text-xs text-green-500">
                {typingUsers.length === 1 ? "Typing..." : `${typingUsers.length} people typing...`}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Phone className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Video className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatMessages.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">No messages yet. Start the conversation!</p>
          </div>
        ) : (
          chatMessages.map((message) => {
            const isOwnMessage = message.senderId === session.user.id
            return (
              <div key={message.id} className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    isOwnMessage
                      ? "bg-red-500 text-white"
                      : "bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <div className="flex items-center justify-between mt-1">
                    <p className={`text-xs ${isOwnMessage ? "text-red-100" : "text-gray-500 dark:text-gray-400"}`}>
                      {getTimeAgo(message.createdAt)}
                    </p>
                    {isOwnMessage && (
                      <span className={`text-xs ${message.read ? "text-red-200" : "text-red-300"}`}>
                        {message.read ? "✓✓" : "✓"}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => handleTyping(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white"
          />
          <Button type="submit" disabled={!newMessage.trim()} className="bg-red-500 hover:bg-red-600">
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}
