"use client"

import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, MapPin, Star, Calendar, Users, AlertCircle } from "lucide-react"
import Link from "next/link"
import BottomNav from "@/components/bottom-nav"
import { LoadingSkeleton } from "@/components/loading-skeleton"
import { getTimeAgo } from "@/lib/utils"

// Mock data for demonstration
const mockOffers = [
  {
    id: "1",
    title: "Sunset Picnic at Table Mountain",
    description: "Romantic picnic with stunning city views",
    price: 450,
    location: "Cape Town",
    rating: 4.8,
    reviewCount: 24,
    imageUrl: "/placeholder.svg?height=200&width=300&query=sunset+picnic+table+mountain",
    host: {
      name: "Sarah",
      avatar: "/placeholder.svg?height=40&width=40&query=woman+profile",
    },
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: "2",
    title: "Wine Tasting in Stellenbosch",
    description: "Private wine tasting experience",
    price: 680,
    location: "Stellenbosch",
    rating: 4.9,
    reviewCount: 18,
    imageUrl: "/placeholder.svg?height=200&width=300&query=wine+tasting+stellenbosch",
    host: {
      name: "Michael",
      avatar: "/placeholder.svg?height=40&width=40&query=man+profile",
    },
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
]

export default function HomePage() {
  const { data: session, status } = useSession()
  const [offers, setOffers] = useState(mockOffers)
  const [authError, setAuthError] = useState(false)

  useEffect(() => {
    // Check if there's an auth error
    if (status === "unauthenticated") {
      const urlParams = new URLSearchParams(window.location.search)
      if (urlParams.get("error")) {
        setAuthError(true)
      }
    }
  }, [status])

  if (status === "loading") {
    return <LoadingSkeleton />
  }

  // Show error state if auth is broken
  if (authError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <AlertCircle className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
            <CardTitle className="text-xl">Authentication Issue</CardTitle>
            <CardDescription>
              We're experiencing some technical difficulties. You can still browse offers without signing in.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={() => {
                setAuthError(false)
                window.location.href = "/"
              }}
              className="w-full"
            >
              Continue Browsing
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Mavuso
            </CardTitle>
            <CardDescription className="text-lg">Discover unique dating experiences in South Africa</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="space-y-2">
                <Heart className="mx-auto h-8 w-8 text-pink-500" />
                <p className="text-sm font-medium">Unique Dates</p>
              </div>
              <div className="space-y-2">
                <Users className="mx-auto h-8 w-8 text-purple-500" />
                <p className="text-sm font-medium">Local Hosts</p>
              </div>
            </div>
            <div className="space-y-2">
              <Button asChild className="w-full" size="lg">
                <Link href="/auth/signin">Sign In with Google</Link>
              </Button>
              <Button variant="outline" onClick={() => setAuthError(false)} className="w-full">
                Browse Without Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Mavuso
            </h1>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Welcome, {session?.user?.name?.split(" ")[0]}</span>
              <img
                src={session?.user?.image || "/placeholder.svg?height=32&width=32&query=user+avatar"}
                alt="Profile"
                className="h-8 w-8 rounded-full"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Hero Section */}
        <section className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Discover Amazing Date Ideas</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From romantic picnics to adventure activities, find unique experiences hosted by locals in your city.
          </p>
        </section>

        {/* Quick Stats */}
        <section className="grid grid-cols-3 gap-4">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Calendar className="mx-auto h-8 w-8 text-pink-500 mb-2" />
              <p className="text-2xl font-bold">150+</p>
              <p className="text-sm text-muted-foreground">Experiences</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Users className="mx-auto h-8 w-8 text-purple-500 mb-2" />
              <p className="text-2xl font-bold">500+</p>
              <p className="text-sm text-muted-foreground">Happy Couples</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Star className="mx-auto h-8 w-8 text-yellow-500 mb-2" />
              <p className="text-2xl font-bold">4.8</p>
              <p className="text-sm text-muted-foreground">Avg Rating</p>
            </CardContent>
          </Card>
        </section>

        {/* Featured Offers */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Featured Experiences</h3>
            <Button variant="outline" size="sm" asChild>
              <Link href="/offers">View All</Link>
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {offers.map((offer) => (
              <Card key={offer.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video relative">
                  <img
                    src={offer.imageUrl || "/placeholder.svg"}
                    alt={offer.title}
                    className="object-cover w-full h-full"
                  />
                  <Badge className="absolute top-2 right-2 bg-white/90 text-black">R{offer.price}</Badge>
                </div>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold line-clamp-1">{offer.title}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-2">{offer.description}</p>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{offer.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{offer.rating}</span>
                        <span className="text-sm text-muted-foreground">({offer.reviewCount})</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{getTimeAgo(offer.createdAt)}</span>
                    </div>
                    <div className="flex items-center space-x-2 pt-2">
                      <img
                        src={offer.host.avatar || "/placeholder.svg"}
                        alt={offer.host.name}
                        className="h-6 w-6 rounded-full"
                      />
                      <span className="text-sm text-muted-foreground">Hosted by {offer.host.name}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center space-y-4 py-8">
          <h3 className="text-2xl font-bold">Ready to Create Your Own Experience?</h3>
          <p className="text-muted-foreground">
            Share your unique date idea and earn money while helping couples create memories.
          </p>
          <Button size="lg" asChild>
            <Link href="/create">
              <Heart className="mr-2 h-4 w-4" />
              Create Experience
            </Link>
          </Button>
        </section>
      </main>

      <BottomNav />
    </div>
  )
}
