"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users, Calendar, DollarSign, Eye, Heart } from "lucide-react"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export default function AnalyticsDashboard() {
  const stats = [
    { title: "Total Users", value: "1,234", icon: Users, change: "+12%" },
    { title: "Total Bookings", value: "567", icon: Calendar, change: "+8%" },
    { title: "Revenue", value: "R45,678", icon: DollarSign, change: "+15%" },
    { title: "Growth Rate", value: "23%", icon: TrendingUp, change: "+3%" },
  ]

  // Mock data for charts
  const userGrowthData = [
    { month: "Jan", users: 850, newUsers: 120 },
    { month: "Feb", users: 920, newUsers: 140 },
    { month: "Mar", users: 1050, newUsers: 180 },
    { month: "Apr", users: 1150, newUsers: 160 },
    { month: "May", users: 1200, newUsers: 145 },
    { month: "Jun", users: 1234, newUsers: 134 },
  ]

  const revenueData = [
    { month: "Jan", revenue: 28500, bookings: 95 },
    { month: "Feb", revenue: 32100, bookings: 107 },
    { month: "Mar", revenue: 38750, bookings: 129 },
    { month: "Apr", revenue: 41200, bookings: 137 },
    { month: "May", revenue: 43900, bookings: 146 },
    { month: "Jun", revenue: 45678, bookings: 152 },
  ]

  const categoryData = [
    { name: "Dining", value: 35, color: "#8884d8" },
    { name: "Wine & Spirits", value: 25, color: "#82ca9d" },
    { name: "Culture", value: 20, color: "#ffc658" },
    { name: "Adventure", value: 12, color: "#ff7c7c" },
    { name: "Entertainment", value: 8, color: "#8dd1e1" },
  ]

  const engagementData = [
    { day: "Mon", views: 1240, likes: 89, bookings: 23 },
    { day: "Tue", views: 1380, likes: 95, bookings: 28 },
    { day: "Wed", views: 1520, likes: 112, bookings: 31 },
    { day: "Thu", views: 1680, likes: 128, bookings: 35 },
    { day: "Fri", views: 1890, likes: 145, bookings: 42 },
    { day: "Sat", views: 2100, likes: 167, bookings: 48 },
    { day: "Sun", views: 1950, likes: 156, bookings: 45 },
  ]

  const chartConfig = {
    users: {
      label: "Total Users",
      color: "hsl(var(--chart-1))",
    },
    newUsers: {
      label: "New Users",
      color: "hsl(var(--chart-2))",
    },
    revenue: {
      label: "Revenue",
      color: "hsl(var(--chart-3))",
    },
    bookings: {
      label: "Bookings",
      color: "hsl(var(--chart-4))",
    },
    views: {
      label: "Views",
      color: "hsl(var(--chart-1))",
    },
    likes: {
      label: "Likes",
      color: "hsl(var(--chart-2))",
    },
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Analytics Dashboard</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">Platform performance metrics and insights</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="dark:bg-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <stat.icon className="w-5 h-5 text-blue-500" />
                <Badge variant="secondary">{stat.change}</Badge>
              </div>
              <div className="text-2xl font-bold mt-2">{stat.value}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{stat.title}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <Card className="dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              User Growth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="users"
                    stackId="1"
                    stroke="var(--color-users)"
                    fill="var(--color-users)"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="newUsers"
                    stackId="2"
                    stroke="var(--color-newUsers)"
                    fill="var(--color-newUsers)"
                    fillOpacity={0.8}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Revenue Chart */}
        <Card className="dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Revenue & Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="revenue"
                    stroke="var(--color-revenue)"
                    strokeWidth={3}
                    dot={{ fill: "var(--color-revenue)" }}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="bookings"
                    stroke="var(--color-bookings)"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ fill: "var(--color-bookings)" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card className="dark:bg-gray-800">
          <CardHeader>
            <CardTitle>Offer Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Engagement */}
        <Card className="dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Weekly Engagement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="views" fill="var(--color-views)" />
                  <Bar dataKey="likes" fill="var(--color-likes)" />
                  <Bar dataKey="bookings" fill="var(--color-bookings)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="dark:bg-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <Eye className="w-5 h-5 text-green-500" />
              <Badge variant="outline" className="text-green-600">
                +18%
              </Badge>
            </div>
            <div className="text-2xl font-bold mt-2">12.4K</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Views</div>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <Heart className="w-5 h-5 text-red-500" />
              <Badge variant="outline" className="text-red-600">
                +22%
              </Badge>
            </div>
            <div className="text-2xl font-bold mt-2">3.2K</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Likes</div>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <TrendingUp className="w-5 h-5 text-purple-500" />
              <Badge variant="outline" className="text-purple-600">
                +5%
              </Badge>
            </div>
            <div className="text-2xl font-bold mt-2">4.7</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Avg Rating</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
