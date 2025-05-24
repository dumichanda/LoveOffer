"use client"

import { useEffect, useState } from "react"
import { Bell, MessageCircle, Heart } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BottomNav } from "@/components/bottom-nav"
import { useAppStore } from "@/lib/store"
import { getTimeAgo } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"

export default function ChatsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"chats" | "favorites">("chats")
  const { chats, currentUser, initializeData, markMessagesRead, getFavoriteOffers } = useAppStore()
  const favoriteOffers = getFavoriteOffers()

  useEffect(() => {
    if (chats.length === 0) {
      initializeData()
    }
  }, [chats.length, initializeData])

  const totalUnreadChats = chats.reduce((total, chat) => total + chat.unreadCount, 0)

  // Get user's chats
  const userChats = chats
    .filter((chat) => chat.participants.includes(currentUser?.id || ""))
    .sort((a, b) => {
      const aTime = a.lastMessage?.timestamp || a.booking.createdAt
      const bTime = b.lastMessage?.timestamp || b.booking.createdAt
      return new Date(bTime).getTime() - new Date(aTime).getTime()
    })

  const handleChatClick = (chat: any) => {
    markMessagesRead(chat.id)
    router.push(`/chats/${chat.id}`)
  }

  const getOtherParticipant = (chat: any) => {
    const otherParticipantId = chat.participants.find((id: string) => id !== currentUser?.id)
    if (otherParticipantId === chat.booking.hostId) {
      return chat.booking.host
    } else {
      return chat.booking.guest
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header with Tabs */}
      <div className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
        <div className="px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">My Chats</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              {totalUnreadChats > 0 && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-bold">{totalUnreadChats}</span>
                </div>
              )}
            </div>
            <ThemeToggle />
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b dark:border-gray-700">
          <button
            onClick={() => setActiveTab("chats")}
            className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
              activeTab === "chats"
                ? "text-red-500 border-b-2 border-red-500 bg-red-50 dark:bg-red-900/20"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
            }`}
          >
            Chats ({userChats.length})
          </button>
          <button
            onClick={() => setActiveTab("favorites")}
            className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
              activeTab === "favorites"
                ? "text-red-500 border-b-2 border-red-500 bg-red-50 dark:bg-red-900/20"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
            }`}
          >
            Favorites ({favoriteOffers.length}/10)
          </button>
        </div>
      </div>

      <div className="p-4">
        {activeTab === "chats" ? (
          // Existing chats content
          userChats.length > 0 ? (
            <div className="space-y-1">
              {userChats.map((chat) => {
                const otherParticipant = getOtherParticipant(chat)
                const lastMessage = chat.lastMessage
                const lastMessageTime = lastMessage?.timestamp || chat.booking.createdAt

                return (
                  <Card
                    key={chat.id}
                    className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    onClick={() => handleChatClick(chat)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Avatar className="w-12 h-12 bg-gray-300 dark:bg-gray-700">
                          <AvatarFallback className="font-semibold text-gray-900 dark:text-gray-100">
                            {otherParticipant.initials}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold text-gray-900 dark:text-gray-100">{otherParticipant.name}</h3>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {getTimeAgo(lastMessageTime)}
                              </span>
                              {chat.unreadCount > 0 && (
                                <Badge variant="secondary" className="bg-red-500 text-white">
                                  {chat.unreadCount}
                                </Badge>
                              )}
                            </div>
                          </div>

                          <p className="text-sm text-red-500 font-medium mb-1">{chat.booking.offer.title}</p>

                          <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                            {lastMessage?.content || "No messages yet"}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          ) : (
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="p-8 text-center">
                <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-400 dark:text-gray-600" />
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">No Chats Yet</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Start chatting when you book or host a date experience!
                </p>
                <Button onClick={() => router.push("/")}>Browse Offers</Button>
              </CardContent>
            </Card>
          )
        ) : // Favorites content
        favoriteOffers.length > 0 ? (
          <div className="space-y-3">
            {favoriteOffers.map((offer) => (
              <Card
                key={offer.id}
                className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                onClick={() => router.push(`/offers/${offer.id}`)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-16 h-16 bg-cover bg-center rounded-lg"
                      style={{ backgroundImage: `url(${offer.images[0] || "/placeholder.svg?height=64&width=64"})` }}
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">{offer.title}</h3>
                        <Badge className="bg-red-500 text-white">R{offer.price}</Badge>
                      </div>

                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">📍 {offer.location}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">by {offer.host.name}</p>

                      <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                        <span>⭐ {offer.rating}</span>
                        <span>👁 {offer.views} views</span>
                        <span>❤ {offer.likes} likes</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-8 text-center">
              <Heart className="w-12 h-12 mx-auto mb-4 text-gray-400 dark:text-gray-600" />
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">No Favorites Yet</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Tap the bookmark icon on offers you love to save them here. You can save up to 10 favorites!
              </p>
              <Button onClick={() => router.push("/")}>Browse Offers</Button>
            </CardContent>
          </Card>
        )}
      </div>

      <BottomNav currentPage="chats" />
    </div>
  )
}
