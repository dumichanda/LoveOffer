"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Send, Phone, Video, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { useAppStore } from "@/lib/store"
import { getTimeAgo } from "@/lib/utils"

export default function ChatDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { chats, currentUser, addMessage, markMessagesRead } = useAppStore()
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const chatId = params.id as string
  const chat = chats.find((c) => c.id === chatId)

  useEffect(() => {
    if (chat) {
      markMessagesRead(chatId)
    }
  }, [chat, chatId, markMessagesRead])

  useEffect(() => {
    scrollToBottom()
  }, [chat?.messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  if (!chat || !currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Card className="p-8 text-center bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Chat Not Found</h2>
          <Button onClick={() => router.back()}>Go Back</Button>
        </Card>
      </div>
    )
  }

  const otherParticipant =
    chat.participants.find((id) => id !== currentUser.id) === chat.booking.hostId
      ? chat.booking.host
      : chat.booking.guest

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    addMessage(chatId, {
      chatId,
      senderId: currentUser.id,
      content: newMessage.trim(),
      read: false,
    })

    setNewMessage("")
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
            <AvatarFallback>{otherParticipant.initials}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="font-semibold text-gray-900 dark:text-white">{otherParticipant.name}</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">{chat.booking.offer.title}</p>
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

      {/* Booking Info */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border-b border-blue-200 dark:border-blue-800 px-4 py-3">
        <div className="text-sm">
          <p className="font-medium text-blue-900 dark:text-blue-100">{chat.booking.offer.title}</p>
          <p className="text-blue-700 dark:text-blue-200">
            📅 {new Date(chat.booking.slot.date).toLocaleDateString()} at {chat.booking.slot.startTime} -{" "}
            {chat.booking.slot.endTime}
          </p>
          <p className="text-blue-700 dark:text-blue-200">📍 {chat.booking.offer.location}</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chat.messages.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">No messages yet. Start the conversation!</p>
          </div>
        ) : (
          chat.messages.map((message) => {
            const isOwnMessage = message.senderId === currentUser.id
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
                  <p className={`text-xs mt-1 ${isOwnMessage ? "text-red-100" : "text-gray-500 dark:text-gray-400"}`}>
                    {getTimeAgo(message.timestamp)}
                  </p>
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
            onChange={(e) => setNewMessage(e.target.value)}
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
