"use client"

import { useState } from "react"
import { Bell, Users, Gift, Calendar, Eye, Trash2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { BottomNav } from "@/components/bottom-nav"
import AnalyticsDashboard from "@/components/admin/analytics-dashboard"
import { PlatformSettings } from "@/components/admin/platform-settings"
import { PaymentSettings } from "@/components/admin/payment-settings"
import { NotificationSettings } from "@/components/admin/notification-settings"
import { AdminLogin } from "@/components/admin-login"
import { useAdmin } from "@/lib/admin-context"
// Import the new DatabaseManagement component
import { DatabaseManagement } from "@/components/admin/database-management"

// Update the adminTabs array to include Database
const adminTabs = ["Overview", "Analytics", "Users", "Offers", "Bookings", "Database", "Settings"]

// Mock data
const mockUsers = [
  { id: "1", name: "Alex Doe", email: "alex@example.com", initials: "AD", subscription: "premium", isAdmin: true },
  { id: "2", name: "Jane Smith", email: "jane@example.com", initials: "JS", subscription: "standard", isAdmin: false },
]

const mockOffers = [
  { id: "1", title: "Sunset Hike", host: { name: "Alex" }, location: "Cape Town", price: 900, status: "active" },
  { id: "2", title: "Wine Tasting", host: { name: "Jane" }, location: "Stellenbosch", price: 1200, status: "active" },
]

const mockBookings = [
  {
    id: "1",
    offer: { title: "Sunset Hike", price: 900 },
    guest: { name: "Jane" },
    host: { name: "Alex" },
    status: "confirmed",
  },
]

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("Overview")
  const [activeSettingsTab, setActiveSettingsTab] = useState("overview")
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Mock current user - for demo purposes, we'll simulate an admin user
  const currentUser = {
    isAdmin: true,
    name: "Admin User",
    email: "admin@datecraft.com",
    id: "admin_1",
  }

  // Add state for authentication
  const { admin, login, logout } = useAdmin()

  // Add this before the return statement
  if (!isAuthenticated) {
    return (
      <AdminLogin
        onLogin={async (credentials) => {
          const success = await login(credentials)
          if (!success) {
            alert("Invalid credentials. Use admin@datecraft.com / admin123")
          } else {
            setIsAuthenticated(true)
          }
        }}
      />
    )
  }

  const stats = [
    { title: "Total Users", value: mockUsers.length.toString(), icon: Users },
    { title: "Total Offers", value: mockOffers.length.toString(), icon: Gift },
    { title: "Active Bookings", value: mockBookings.length.toString(), icon: Calendar },
    { title: "Pending Reviews", value: "0", icon: Calendar },
  ]

  const settingsTabs = [
    { id: "overview", label: "Overview", description: "Settings overview and quick access" },
    { id: "platform", label: "Platform", description: "Global platform configuration" },
    { id: "payment", label: "Payment", description: "Payment processing settings" },
    { id: "notifications", label: "Notifications", description: "Email and push notifications" },
    { id: "security", label: "Security", description: "Security and access controls" },
    { id: "integrations", label: "Integrations", description: "Third-party integrations" },
  ]

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" })
      setIsAuthenticated(false)
    } catch (error) {
      console.error("Logout failed:", error)
      setIsAuthenticated(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <div className="bg-white border-b px-4 py-3 flex items-center justify-between dark:bg-gray-800 dark:border-gray-700">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600 dark:text-gray-400">Welcome, {admin?.name || "Admin User"}</span>
          <Button variant="outline" size="sm" onClick={logout}>
            Logout
          </Button>
          <div className="relative">
            <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Page Title */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Admin Dashboard</h2>
          <p className="text-gray-600 dark:text-gray-400">Comprehensive platform management and monitoring.</p>
        </div>

        {/* Admin Tabs */}
        <div className="flex gap-1 bg-white rounded-lg p-1 overflow-x-auto dark:bg-gray-800">
          {adminTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-shrink-0 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === tab
                  ? "bg-red-500 text-white"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Overview Tab Content */}
        {activeTab === "Overview" && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <Card key={index} className="dark:bg-gray-800">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <stat.icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1 dark:text-gray-100">{stat.value}</div>
                    <div className="text-sm font-medium text-gray-600 mb-1 dark:text-gray-400">{stat.title}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Activity */}
            <Card className="dark:bg-gray-800">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 dark:text-gray-100">Recent Activity</h3>
                <div className="space-y-3">
                  {mockBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg dark:bg-gray-700"
                    >
                      <div>
                        <p className="font-medium dark:text-gray-100">{booking.offer.title}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {booking.guest.name} booked with {booking.host.name}
                        </p>
                      </div>
                      <Badge variant="default">{booking.status}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Analytics Tab */}
        {activeTab === "Analytics" && <AnalyticsDashboard />}

        {/* Users Tab */}
        {activeTab === "Users" && (
          <div className="space-y-6">
            {/* User Management Header */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">User Management</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Manage users, send communications, and moderate accounts
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Export Users
                </Button>
                <Button size="sm">Add User</Button>
              </div>
            </div>

            {/* Search and Filters */}
            <Card className="dark:bg-gray-800">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Search users by name, email, or ID..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div className="flex gap-2">
                    <select className="px-3 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                      <option value="">All Subscriptions</option>
                      <option value="free">Free</option>
                      <option value="standard">Standard</option>
                      <option value="premium">Premium</option>
                    </select>
                    <select className="px-3 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                      <option value="">All Status</option>
                      <option value="active">Active</option>
                      <option value="suspended">Suspended</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bulk Actions */}
            <Card className="dark:bg-gray-800">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <div className="flex items-center gap-4">
                    <input type="checkbox" className="rounded border-gray-300 dark:border-gray-600" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">0 users selected</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" disabled>
                      Email Selected
                    </Button>
                    <Button variant="outline" size="sm" disabled>
                      Suspend
                    </Button>
                    <Button variant="outline" size="sm" disabled>
                      Activate
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-500" disabled>
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced User List */}
            <div className="space-y-3">
              {[
                {
                  id: "1",
                  name: "Alex Doe",
                  email: "alex@example.com",
                  initials: "AD",
                  subscription: "premium",
                  isAdmin: true,
                  status: "active",
                  joinDate: "2023-08-15",
                  lastActive: "2024-01-15",
                  totalBookings: 12,
                  totalOffers: 5,
                  rating: 4.8,
                  verified: true,
                },
                {
                  id: "2",
                  name: "Jane Smith",
                  email: "jane@example.com",
                  initials: "JS",
                  subscription: "standard",
                  isAdmin: false,
                  status: "active",
                  joinDate: "2023-09-22",
                  lastActive: "2024-01-14",
                  totalBookings: 8,
                  totalOffers: 2,
                  rating: 4.6,
                  verified: true,
                },
                {
                  id: "3",
                  name: "Mike Johnson",
                  email: "mike@example.com",
                  initials: "MJ",
                  subscription: "free",
                  isAdmin: false,
                  status: "suspended",
                  joinDate: "2023-10-05",
                  lastActive: "2024-01-10",
                  totalBookings: 3,
                  totalOffers: 0,
                  rating: 4.2,
                  verified: false,
                },
                {
                  id: "4",
                  name: "Sarah Wilson",
                  email: "sarah@example.com",
                  initials: "SW",
                  subscription: "premium",
                  isAdmin: false,
                  status: "active",
                  joinDate: "2023-07-12",
                  lastActive: "2024-01-15",
                  totalBookings: 15,
                  totalOffers: 8,
                  rating: 4.9,
                  verified: true,
                },
              ].map((user) => (
                <Card key={user.id} className="dark:bg-gray-800">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      {/* Selection Checkbox */}
                      <input type="checkbox" className="rounded border-gray-300 dark:border-gray-600" />

                      {/* User Avatar */}
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className={user.status === "suspended" ? "bg-red-100 text-red-600" : ""}>
                          {user.initials}
                        </AvatarFallback>
                      </Avatar>

                      {/* User Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-gray-900 dark:text-gray-100 truncate">{user.name}</h4>
                          {user.verified && (
                            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs">✓</span>
                            </div>
                          )}
                          {user.status === "suspended" && (
                            <Badge variant="destructive" className="text-xs">
                              Suspended
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{user.email}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                          <span>Joined: {new Date(user.joinDate).toLocaleDateString()}</span>
                          <span>Last active: {new Date(user.lastActive).toLocaleDateString()}</span>
                          <span>{user.totalBookings} bookings</span>
                          <span>{user.totalOffers} offers</span>
                          <span>★ {user.rating}</span>
                        </div>
                      </div>

                      {/* Subscription Badge */}
                      <div className="flex flex-col items-end gap-2">
                        <Badge
                          variant={
                            user.subscription === "premium"
                              ? "default"
                              : user.subscription === "standard"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {user.subscription}
                        </Badge>
                        {user.isAdmin && (
                          <Badge variant="destructive" className="text-xs">
                            Admin
                          </Badge>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline" title="View Profile">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" title="Send Email">
                          <Bell className="w-4 h-4" />
                        </Button>
                        {user.status === "active" ? (
                          <Button size="sm" variant="outline" className="text-orange-500" title="Suspend User">
                            <Users className="w-4 h-4" />
                          </Button>
                        ) : (
                          <Button size="sm" variant="outline" className="text-green-500" title="Activate User">
                            <Users className="w-4 h-4" />
                          </Button>
                        )}
                        {!user.isAdmin && (
                          <Button size="sm" variant="outline" className="text-red-500" title="Delete User">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <Card className="dark:bg-gray-800">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Showing 1-4 of 1,234 users</span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" disabled>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm">
                      1
                    </Button>
                    <Button variant="outline" size="sm">
                      2
                    </Button>
                    <Button variant="outline" size="sm">
                      3
                    </Button>
                    <Button variant="outline" size="sm">
                      Next
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Offers Tab */}
        {activeTab === "Offers" && (
          <div className="space-y-6">
            {/* Offer Management Header */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Offer Management</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Review, moderate, and manage all platform offers
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Export Offers
                </Button>
                <Button variant="outline" size="sm">
                  Bulk Review
                </Button>
                <Button size="sm">Featured Offers</Button>
              </div>
            </div>

            {/* Search and Filters */}
            <Card className="dark:bg-gray-800">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Search offers by title, location, or host..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div className="flex gap-2">
                    <select className="px-3 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                      <option value="">All Categories</option>
                      <option value="dining">Dining</option>
                      <option value="wine">Wine & Spirits</option>
                      <option value="culture">Culture</option>
                      <option value="adventure">Adventure</option>
                      <option value="wellness">Wellness</option>
                    </select>
                    <select className="px-3 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                      <option value="">All Status</option>
                      <option value="active">Active</option>
                      <option value="pending Review">Pending Review</option>
                      <option value="suspended">Suspended</option>
                      <option value="featured">Featured</option>
                    </select>
                    <select className="px-3 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                      <option value="">Price Range</option>
                      <option value="0-500">R0 - R500</option>
                      <option value="500-1000">R500 - R1000</option>
                      <option value="1000-2000">R1000 - R2000</option>
                      <option value="2000+">R2000+</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bulk Actions */}
            <Card className="dark:bg-gray-800">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <div className="flex items-center gap-4">
                    <input type="checkbox" className="rounded border-gray-300 dark:border-gray-600" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">0 offers selected</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" disabled>
                      Approve
                    </Button>
                    <Button variant="outline" size="sm" disabled>
                      Feature
                    </Button>
                    <Button variant="outline" size="sm" disabled>
                      Suspend
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-500" disabled>
                      Remove
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Offer List */}
            <div className="space-y-3">
              {[
                {
                  id: "1",
                  title: "Sunset Wine Tasting Experience",
                  description:
                    "Join us for an exclusive wine tasting session overlooking the beautiful Cape Town sunset...",
                  host: { name: "Sarah Wilson", id: "4", rating: 4.9, verified: true },
                  location: "Stellenbosch, Western Cape",
                  price: 1200,
                  category: "wine",
                  status: "active",
                  featured: true,
                  createdAt: "2024-01-10",
                  views: 245,
                  likes: 32,
                  bookings: 8,
                  rating: 4.8,
                  reviewCount: 12,
                  image: "/placeholder.svg?height=80&width=120&query=wine+tasting+sunset",
                },
                {
                  id: "2",
                  title: "Traditional Braai & Stories",
                  description: "Experience authentic South African culture with traditional braai and local stories...",
                  host: { name: "Alex Doe", id: "1", rating: 4.8, verified: true },
                  location: "Cape Town, Western Cape",
                  price: 800,
                  category: "dining",
                  status: "active",
                  featured: false,
                  createdAt: "2024-01-08",
                  views: 189,
                  likes: 28,
                  bookings: 12,
                  rating: 4.7,
                  reviewCount: 15,
                  image: "/placeholder.svg?height=80&width=120&query=braai+traditional+food",
                },
                {
                  id: "3",
                  title: "Art Gallery Walking Tour",
                  description: "Discover Cape Town's vibrant art scene with a guided tour through local galleries...",
                  host: { name: "Mike Johnson", id: "3", rating: 4.2, verified: false },
                  location: "Cape Town, Western Cape",
                  price: 450,
                  category: "culture",
                  status: "pending",
                  featured: false,
                  createdAt: "2024-01-12",
                  views: 67,
                  likes: 8,
                  bookings: 0,
                  rating: 0,
                  reviewCount: 0,
                  image: "/placeholder.svg?height=80&width=120&query=art+gallery+tour",
                },
                {
                  id: "4",
                  title: "Mountain Hiking Adventure",
                  description: "Challenge yourself with a guided hike up Table Mountain with breathtaking views...",
                  host: { name: "Jane Smith", id: "2", rating: 4.6, verified: true },
                  location: "Cape Town, Western Cape",
                  price: 650,
                  category: "adventure",
                  status: "suspended",
                  featured: false,
                  createdAt: "2024-01-05",
                  views: 156,
                  likes: 19,
                  bookings: 5,
                  rating: 4.4,
                  reviewCount: 8,
                  image: "/placeholder.svg?height=80&width=120&query=table+mountain+hiking",
                },
                {
                  id: "5",
                  title: "Spa & Wellness Retreat",
                  description: "Relax and rejuvenate with our premium spa treatments and wellness activities...",
                  host: { name: "Emma Davis", id: "5", rating: 4.9, verified: true },
                  location: "Hermanus, Western Cape",
                  price: 1800,
                  category: "wellness",
                  status: "active",
                  featured: true,
                  createdAt: "2024-01-07",
                  views: 312,
                  likes: 45,
                  bookings: 15,
                  rating: 4.9,
                  reviewCount: 22,
                  image: "/placeholder.svg?height=80&width=120&query=spa+wellness+retreat",
                },
              ].map((offer) => (
                <Card key={offer.id} className="dark:bg-gray-800">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      {/* Selection Checkbox */}
                      <input type="checkbox" className="rounded border-gray-300 dark:border-gray-600 mt-2" />

                      {/* Offer Image */}
                      <img
                        src={offer.image || "/placeholder.svg"}
                        alt={offer.title}
                        className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                      />

                      {/* Offer Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium text-gray-900 dark:text-gray-100 truncate">{offer.title}</h4>
                              {offer.featured && (
                                <Badge variant="default" className="text-xs bg-yellow-500">
                                  Featured
                                </Badge>
                              )}
                              <Badge
                                variant={
                                  offer.status === "active"
                                    ? "default"
                                    : offer.status === "pending"
                                      ? "secondary"
                                      : "destructive"
                                }
                                className="text-xs"
                              >
                                {offer.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
                              {offer.description}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                              <span>📍 {offer.location}</span>
                              <span>💰 R{offer.price}</span>
                              <span>📅 {new Date(offer.createdAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>

                        {/* Host Info */}
                        <div className="flex items-center gap-2 mb-3">
                          <Avatar className="w-6 h-6">
                            <AvatarFallback className="text-xs">
                              {offer.host.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-gray-600 dark:text-gray-400">{offer.host.name}</span>
                          {offer.host.verified && (
                            <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs">✓</span>
                            </div>
                          )}
                          <span className="text-xs text-gray-500">★ {offer.host.rating}</span>
                        </div>

                        {/* Performance Metrics */}
                        <div className="flex items-center gap-6 text-xs text-gray-500 dark:text-gray-400">
                          <span>👁️ {offer.views} views</span>
                          <span>❤️ {offer.likes} likes</span>
                          <span>📅 {offer.bookings} bookings</span>
                          {offer.rating > 0 && (
                            <span>
                              ⭐ {offer.rating} ({offer.reviewCount} reviews)
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Category Badge */}
                      <div className="flex flex-col items-end gap-2">
                        <Badge variant="outline" className="text-xs capitalize">
                          {offer.category}
                        </Badge>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col gap-1">
                        <Button size="sm" variant="outline" title="View Details">
                          <Eye className="w-4 h-4" />
                        </Button>
                        {offer.status === "pending" && (
                          <>
                            <Button size="sm" variant="outline" className="text-green-500" title="Approve">
                              ✓
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-500" title="Reject">
                              ✗
                            </Button>
                          </>
                        )}
                        {offer.status === "active" && (
                          <>
                            <Button size="sm" variant="outline" className="text-yellow-500" title="Feature">
                              ⭐
                            </Button>
                            <Button size="sm" variant="outline" className="text-orange-500" title="Suspend">
                              ⏸️
                            </Button>
                          </>
                        )}
                        {offer.status === "suspended" && (
                          <Button size="sm" variant="outline" className="text-green-500" title="Reactivate">
                            ▶️
                          </Button>
                        )}
                        <Button size="sm" variant="outline" className="text-red-500" title="Remove">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <Card className="dark:bg-gray-800">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Showing 1-5 of 247 offers</span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" disabled>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm">
                      1
                    </Button>
                    <Button variant="outline" size="sm">
                      2
                    </Button>
                    <Button variant="outline" size="sm">
                      3
                    </Button>
                    <Button variant="outline" size="sm">
                      Next
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === "Bookings" && (
          <div className="space-y-6">
            {/* Booking Management Header */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Booking Management</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Monitor transactions, resolve disputes, and manage booking lifecycle
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Export Bookings
                </Button>
                <Button variant="outline" size="sm">
                  Financial Report
                </Button>
                <Button size="sm">Dispute Center</Button>
              </div>
            </div>

            {/* Search and Filters */}
            <Card className="dark:bg-gray-800">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Search by booking ID, guest, host, or offer..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div className="flex gap-2">
                    <select className="px-3 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                      <option value="">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="disputed">Disputed</option>
                    </select>
                    <select className="px-3 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                      <option value="">Date Range</option>
                      <option value="today">Today</option>
                      <option value="week">This Week</option>
                      <option value="month">This Month</option>
                      <option value="custom">Custom Range</option>
                    </select>
                    <select className="px-3 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                      <option value="">Payment Status</option>
                      <option value="paid">Paid</option>
                      <option value="pending">Payment Pending</option>
                      <option value="refunded">Refunded</option>
                      <option value="failed">Failed</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bulk Actions */}
            <Card className="dark:bg-gray-800">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <div className="flex items-center gap-4">
                    <input type="checkbox" className="rounded border-gray-300 dark:border-gray-600" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">0 bookings selected</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" disabled>
                      Confirm Selected
                    </Button>
                    <Button variant="outline" size="sm" disabled>
                      Send Reminders
                    </Button>
                    <Button variant="outline" size="sm" disabled>
                      Export Selected
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-500" disabled>
                      Cancel Selected
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Booking List */}
            <div className="space-y-3">
              {[
                {
                  id: "BK001",
                  offer: {
                    title: "Sunset Wine Tasting Experience",
                    image: "/placeholder.svg?height=60&width=80&query=wine+tasting+sunset",
                    category: "wine",
                  },
                  host: { name: "Sarah Wilson", id: "4", rating: 4.9, verified: true },
                  guest: { name: "Michael Chen", id: "6", rating: 4.7, verified: true },
                  status: "confirmed",
                  paymentStatus: "paid",
                  bookingDate: "2024-01-15T14:30:00Z",
                  eventDate: "2024-01-20T18:00:00Z",
                  amount: 1200,
                  commission: 120,
                  guests: 2,
                  location: "Stellenbosch, Western Cape",
                  createdAt: "2024-01-15T10:30:00Z",
                  lastUpdate: "2024-01-15T14:30:00Z",
                  hasDispute: false,
                  hasReview: false,
                },
                {
                  id: "BK002",
                  offer: {
                    title: "Traditional Braai & Stories",
                    image: "/placeholder.svg?height=60&width=80&query=braai+traditional+food",
                    category: "dining",
                  },
                  host: { name: "Alex Doe", id: "1", rating: 4.8, verified: true },
                  guest: { name: "Emma Thompson", id: "7", rating: 4.5, verified: true },
                  status: "pending",
                  paymentStatus: "pending",
                  bookingDate: "2024-01-16T09:15:00Z",
                  eventDate: "2024-01-22T19:00:00Z",
                  amount: 800,
                  commission: 80,
                  guests: 4,
                  location: "Cape Town, Western Cape",
                  createdAt: "2024-01-16T09:15:00Z",
                  lastUpdate: "2024-01-16T09:15:00Z",
                  hasDispute: false,
                  hasReview: false,
                },
                {
                  id: "BK003",
                  offer: {
                    title: "Mountain Hiking Adventure",
                    image: "/placeholder.svg?height=60&width=80&query=table+mountain+hiking",
                    category: "adventure",
                  },
                  host: { name: "Jane Smith", id: "2", rating: 4.6, verified: true },
                  guest: { name: "David Wilson", id: "8", rating: 4.3, verified: false },
                  status: "completed",
                  paymentStatus: "paid",
                  bookingDate: "2024-01-10T16:45:00Z",
                  eventDate: "2024-01-14T08:00:00Z",
                  amount: 650,
                  commission: 65,
                  guests: 1,
                  location: "Cape Town, Western Cape",
                  createdAt: "2024-01-10T16:45:00Z",
                  lastUpdate: "2024-01-14T20:00:00Z",
                  hasDispute: false,
                  hasReview: true,
                },
                {
                  id: "BK004",
                  offer: {
                    title: "Art Gallery Walking Tour",
                    image: "/placeholder.svg?height=60&width=80&query=art+gallery+tour",
                    category: "culture",
                  },
                  host: { name: "Mike Johnson", id: "3", rating: 4.2, verified: false },
                  guest: { name: "Lisa Anderson", id: "9", rating: 4.8, verified: true },
                  status: "disputed",
                  paymentStatus: "refunded",
                  bookingDate: "2024-01-08T11:20:00Z",
                  eventDate: "2024-01-12T14:00:00Z",
                  amount: 450,
                  commission: 45,
                  guests: 2,
                  location: "Cape Town, Western Cape",
                  createdAt: "2024-01-08T11:20:00Z",
                  lastUpdate: "2024-01-13T10:30:00Z",
                  hasDispute: true,
                  hasReview: false,
                },
                {
                  id: "BK005",
                  offer: {
                    title: "Spa & Wellness Retreat",
                    image: "/placeholder.svg?height=60&width=80&query=spa+wellness+retreat",
                    category: "wellness",
                  },
                  host: { name: "Emma Davis", id: "5", rating: 4.9, verified: true },
                  guest: { name: "Sophie Martin", id: "10", rating: 4.6, verified: true },
                  status: "cancelled",
                  paymentStatus: "refunded",
                  bookingDate: "2024-01-12T13:10:00Z",
                  eventDate: "2024-01-25T10:00:00Z",
                  amount: 1800,
                  commission: 180,
                  guests: 1,
                  location: "Hermanus, Western Cape",
                  createdAt: "2024-01-12T13:10:00Z",
                  lastUpdate: "2024-01-14T15:20:00Z",
                  hasDispute: false,
                  hasReview: false,
                },
              ].map((booking) => (
                <Card key={booking.id} className="dark:bg-gray-800">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      {/* Selection Checkbox */}
                      <input type="checkbox" className="rounded border-gray-300 dark:border-gray-600 mt-2" />

                      {/* Offer Image */}
                      <img
                        src={booking.offer.image || "/placeholder.svg"}
                        alt={booking.offer.title}
                        className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                      />

                      {/* Booking Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium text-gray-900 dark:text-gray-100 truncate">
                                {booking.offer.title}
                              </h4>
                              <Badge
                                variant={
                                  booking.status === "confirmed"
                                    ? "default"
                                    : booking.status === "completed"
                                      ? "secondary"
                                      : booking.status === "pending"
                                        ? "outline"
                                        : "destructive"
                                }
                                className="text-xs"
                              >
                                {booking.status}
                              </Badge>
                              {booking.hasDispute && (
                                <Badge variant="destructive" className="text-xs">
                                  Dispute
                                </Badge>
                              )}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                              <span className="font-medium">#{booking.id}</span> • {booking.location}
                            </div>
                            <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-2">
                              <span>📅 Event: {new Date(booking.eventDate).toLocaleDateString()}</span>
                              <span>👥 {booking.guests} guests</span>
                              <span>💰 R{booking.amount}</span>
                              <span>📊 Commission: R{booking.commission}</span>
                            </div>
                          </div>
                        </div>

                        {/* Participants */}
                        <div className="flex items-center gap-6 mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500 dark:text-gray-400">Host:</span>
                            <Avatar className="w-5 h-5">
                              <AvatarFallback className="text-xs">
                                {booking.host.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-gray-600 dark:text-gray-400">{booking.host.name}</span>
                            {booking.host.verified && (
                              <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs">✓</span>
                              </div>
                            )}
                            <span className="text-xs text-gray-500">★ {booking.host.rating}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500 dark:text-gray-400">Guest:</span>
                            <Avatar className="w-5 h-5">
                              <AvatarFallback className="text-xs">
                                {booking.guest.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-gray-600 dark:text-gray-400">{booking.guest.name}</span>
                            {booking.guest.verified && (
                              <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs">✓</span>
                              </div>
                            )}
                            <span className="text-xs text-gray-500">★ {booking.guest.rating}</span>
                          </div>
                        </div>

                        {/* Timeline */}
                        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                          <span>Created: {new Date(booking.createdAt).toLocaleDateString()}</span>
                          <span>Updated: {new Date(booking.lastUpdate).toLocaleDateString()}</span>
                          <Badge
                            variant={
                              booking.paymentStatus === "paid"
                                ? "default"
                                : booking.paymentStatus === "pending"
                                  ? "outline"
                                  : booking.paymentStatus === "refunded"
                                    ? "secondary"
                                    : "destructive"
                            }
                            className="text-xs"
                          >
                            {booking.paymentStatus}
                          </Badge>
                          {booking.hasReview && (
                            <Badge variant="outline" className="text-xs">
                              Reviewed
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Category Badge */}
                      <div className="flex flex-col items-end gap-2">
                        <Badge variant="outline" className="text-xs capitalize">
                          {booking.offer.category}
                        </Badge>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col gap-1">
                        <Button size="sm" variant="outline" title="View Details">
                          <Eye className="w-4 h-4" />
                        </Button>
                        {booking.status === "pending" && (
                          <>
                            <Button size="sm" variant="outline" className="text-green-500" title="Confirm">
                              ✓
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-500" title="Cancel">
                              ✗
                            </Button>
                          </>
                        )}
                        {booking.hasDispute && (
                          <Button size="sm" variant="outline" className="text-orange-500" title="Resolve Dispute">
                            ⚖️
                          </Button>
                        )}
                        {booking.status === "confirmed" && (
                          <Button size="sm" variant="outline" className="text-blue-500" title="Send Reminder">
                            📧
                          </Button>
                        )}
                        {booking.paymentStatus === "paid" && booking.status !== "completed" && (
                          <Button size="sm" variant="outline" className="text-orange-500" title="Refund">
                            💰
                          </Button>
                        )}
                        <Button size="sm" variant="outline" className="text-gray-500" title="Chat">
                          💬
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Booking Statistics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Card className="dark:bg-gray-800">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">R12,450</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</div>
                </CardContent>
              </Card>
              <Card className="dark:bg-gray-800">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">R1,245</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Commission</div>
                </CardContent>
              </Card>
              <Card className="dark:bg-gray-800">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">3</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Pending</div>
                </CardContent>
              </Card>
              <Card className="dark:bg-gray-800">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-red-600 dark:text-red-400">1</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Disputes</div>
                </CardContent>
              </Card>
            </div>

            {/* Pagination */}
            <Card className="dark:bg-gray-800">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Showing 1-5 of 156 bookings</span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" disabled>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm">
                      1
                    </Button>
                    <Button variant="outline" size="sm">
                      2
                    </Button>
                    <Button variant="outline" size="sm">
                      3
                    </Button>
                    <Button variant="outline" size="sm">
                      Next
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Database Tab */}
        {activeTab === "Database" && <DatabaseManagement />}

        {/* Settings Tab */}
        {activeTab === "Settings" && (
          <div className="space-y-6">
            {/* Settings Header */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">System Settings</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Configure platform settings, payments, and notifications
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Export Config
                </Button>
                <Button variant="outline" size="sm">
                  Import Settings
                </Button>
                <Button size="sm">Backup Settings</Button>
              </div>
            </div>

            {/* Settings Navigation */}
            <Card className="dark:bg-gray-800">
              <CardContent className="p-4">
                <div className="flex gap-1 overflow-x-auto">
                  {settingsTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveSettingsTab(tab.id)}
                      className={`flex-shrink-0 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                        activeSettingsTab === tab.id
                          ? "bg-red-500 text-white"
                          : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Settings Content */}
            {activeSettingsTab === "overview" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {settingsTabs.slice(1).map((tab) => (
                  <Card key={tab.id} className="dark:bg-gray-800 cursor-pointer hover:shadow-lg transition-shadow">
                    <CardContent className="p-6" onClick={() => setActiveSettingsTab(tab.id)}>
                      <h4 className="font-medium mb-2 dark:text-gray-100">{tab.label} Settings</h4>
                      <p className="text-sm text-gray-600 mb-4 dark:text-gray-400">{tab.description}</p>
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {activeSettingsTab === "platform" && <PlatformSettings />}
            {activeSettingsTab === "payment" && <PaymentSettings />}
            {activeSettingsTab === "notifications" && <NotificationSettings />}

            {activeSettingsTab === "security" && (
              <Card className="dark:bg-gray-800">
                <CardContent className="p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 dark:text-gray-100">Security Settings</h4>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg dark:border-gray-700">
                      <h5 className="font-medium mb-2 dark:text-gray-100">Two-Factor Authentication</h5>
                      <p className="text-sm text-gray-600 mb-3 dark:text-gray-400">Require 2FA for admin accounts</p>
                      <Button variant="outline" size="sm">
                        Configure 2FA
                      </Button>
                    </div>
                    <div className="p-4 border rounded-lg dark:border-gray-700">
                      <h5 className="font-medium mb-2 dark:text-gray-100">Session Management</h5>
                      <p className="text-sm text-gray-600 mb-3 dark:text-gray-400">Manage user sessions and timeouts</p>
                      <Button variant="outline" size="sm">
                        Session Settings
                      </Button>
                    </div>
                    <div className="p-4 border rounded-lg dark:border-gray-700">
                      <h5 className="font-medium mb-2 dark:text-gray-100">API Security</h5>
                      <p className="text-sm text-gray-600 mb-3 dark:text-gray-400">
                        Configure API rate limiting and security
                      </p>
                      <Button variant="outline" size="sm">
                        API Settings
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeSettingsTab === "integrations" && (
              <Card className="dark:bg-gray-800">
                <CardContent className="p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 dark:text-gray-100">
                    Third-Party Integrations
                  </h4>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg dark:border-gray-700">
                      <h5 className="font-medium mb-2 dark:text-gray-100">Analytics Integration</h5>
                      <p className="text-sm text-gray-600 mb-3 dark:text-gray-400">
                        Connect Google Analytics, Mixpanel, or other analytics tools
                      </p>
                      <Button variant="outline" size="sm">
                        Setup Analytics
                      </Button>
                    </div>
                    <div className="p-4 border rounded-lg dark:border-gray-700">
                      <h5 className="font-medium mb-2 dark:text-gray-100">Social Media</h5>
                      <p className="text-sm text-gray-600 mb-3 dark:text-gray-400">
                        Configure social media login and sharing
                      </p>
                      <Button variant="outline" size="sm">
                        Social Settings
                      </Button>
                    </div>
                    <div className="p-4 border rounded-lg dark:border-gray-700">
                      <h5 className="font-medium mb-2 dark:text-gray-100">External APIs</h5>
                      <p className="text-sm text-gray-600 mb-3 dark:text-gray-400">
                        Manage external API connections and webhooks
                      </p>
                      <Button variant="outline" size="sm">
                        API Management
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Other tabs with placeholder content */}
        {activeTab !== "Overview" &&
          activeTab !== "Users" &&
          activeTab !== "Settings" &&
          activeTab !== "Analytics" &&
          activeTab !== "Offers" &&
          activeTab !== "Bookings" &&
          activeTab !== "Database" && (
            <Card className="dark:bg-gray-800">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 dark:text-gray-100">{activeTab}</h3>
                <p className="text-gray-600 dark:text-gray-400">{activeTab} functionality will be implemented here.</p>
              </CardContent>
            </Card>
          )}
      </div>

      <BottomNav currentPage="admin" />
    </div>
  )
}
