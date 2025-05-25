"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ArrowLeft, Send, Phone, Video, MoreVertical } from "lucide-react"
import { useAppStore } from "@/lib/store"

export default function ChatDetailPage() {
  const params = useParams()
  const router = useRouter()
  const chatId = params.id as string

  const { chats, addMessage, currentUser } = useAppStore()
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const chat = chats.find((c) => c.id === chatId)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chat?.messages])

  if (!chat) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2 text-white">Chat Not Found</h2>
          <Button onClick={() => router.push("/chats")}>Go Back to Chats</Button>
        </div>
      </div>
    )
  }

  // Get the other participant (not the current user)
  const otherParticipantId = chat.participants.find((id) => id !== currentUser?.id)
  const otherParticipant = otherParticipantId === chat.booking.hostId ? chat.booking.host : chat.booking.guest

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    addMessage(chatId, {
      chatId,
      content: newMessage.trim(),
      senderId: currentUser?.id || "user_1",
      read: false,
    })

    setNewMessage("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-800">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => router.push("/chats")}>
            <ArrowLeft className="h-5 w-5 text-white" />
          </Button>
          <Avatar className="h-10 w-10 bg-gray-600">
            <AvatarFallback className="text-white font-semibold">{otherParticipant.initials}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="font-semibold text-white">{otherParticipant.name}</h1>
            <p className="text-sm text-gray-400">{chat.booking.offer.title}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Phone className="h-5 w-5 text-gray-400" />
          </Button>
          <Button variant="ghost" size="icon">
            <Video className="h-5 w-5 text-gray-400" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5 text-gray-400" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chat.messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.senderId === currentUser?.id ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[70%] rounded-lg px-3 py-2 ${
                message.senderId === currentUser?.id ? "bg-red-500 text-white" : "bg-gray-700 text-white"
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <p className="text-xs opacity-70 mt-1">
                {new Date(message.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-700 bg-gray-800">
        <div className="flex items-center gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            size="icon"
            className="bg-red-500 hover:bg-red-600"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
