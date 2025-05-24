"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Filter, RotateCcw, MapPin, DollarSign, Star, Calendar, Users, Shield, Settings } from "lucide-react"

export interface AnalyticsFilters {
  dateRange: [Date, Date]
  distanceRange: [number, number]
  priceRange: [number, number]
  categories: string[]
  subscriptionTypes: string[]
  verificationStatus: string[]
  bookingStatus: string[]
  offerStatus: string[]
  userTypes: string[]
  ratingRange: [number, number]
  location: string
  hostExperience: string
  safetyFeatures: string[]
}

interface AnalyticsFiltersPopupProps {
  filters: AnalyticsFilters
  onFiltersChange: (filters: AnalyticsFilters) => void
  onReset: () => void
}

export function AnalyticsFiltersPopup({ filters, onFiltersChange, onReset }: AnalyticsFiltersPopupProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [tempFilters, setTempFilters] = useState<AnalyticsFilters>(filters)

  const categories = ["Adventure", "Food & Wine", "Arts & Culture", "Sports", "Entertainment", "Education"]
  const subscriptionTypes = ["free", "standard", "premium"]
  const verificationStatuses = ["verified", "unverified", "pending"]
  const bookingStatuses = ["pending", "confirmed", "completed", "cancelled"]
  const offerStatuses = ["active", "paused", "draft", "completed"]
  const userTypes = ["admin", "host", "guest", "both"]
  const safetyFeatures = ["publicMeeting", "backgroundCheck", "emergencyContact", "gpsTracking"]

  const handleTempFilterChange = (key: keyof AnalyticsFilters, value: any) => {
    setTempFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleArrayFilterToggle = (key: keyof AnalyticsFilters, value: string) => {
    const currentArray = tempFilters[key] as string[]
    const newArray = currentArray.includes(value)
      ? currentArray.filter((item) => item !== value)
      : [...currentArray, value]
    handleTempFilterChange(key, newArray)
  }

  const applyFilters = () => {
    onFiltersChange(tempFilters)
    setIsOpen(false)
  }

  const resetFilters = () => {
    onReset()
    setTempFilters({
      dateRange: [new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), new Date()],
      distanceRange: [0, 100],
      priceRange: [0, 5000],
      categories: [],
      subscriptionTypes: [],
      verificationStatus: [],
      bookingStatus: [],
      offerStatus: [],
      userTypes: [],
      ratingRange: [0, 5],
      location: "",
      hostExperience: "all",
      safetyFeatures: [],
    })
  }

  const getActiveFilterCount = () => {
    let count = 0
    if (filters.location) count++
    if (filters.categories.length > 0) count++
    if (filters.subscriptionTypes.length > 0) count++
    if (filters.verificationStatus.length > 0) count++
    if (filters.bookingStatus.length > 0) count++
    if (filters.offerStatus.length > 0) count++
    if (filters.userTypes.length > 0) count++
    if (filters.hostExperience !== "all") count++
    if (filters.safetyFeatures.length > 0) count++
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 5000) count++
    if (filters.distanceRange[0] > 0 || filters.distanceRange[1] < 100) count++
    if (filters.ratingRange[0] > 0 || filters.ratingRange[1] < 5) count++
    return count
  }

  const activeFilterCount = getActiveFilterCount()

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Filter className="w-4 h-4" />
          Filters
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="ml-1">
              {activeFilterCount}
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Analytics Filters</span>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={resetFilters}>
                <RotateCcw className="w-4 h-4 mr-1" />
                Reset
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="ranges" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="ranges" className="gap-2">
              <MapPin className="w-4 h-4" />
              Ranges
            </TabsTrigger>
            <TabsTrigger value="types" className="gap-2">
              <Users className="w-4 h-4" />
              Types
            </TabsTrigger>
            <TabsTrigger value="status" className="gap-2">
              <Shield className="w-4 h-4" />
              Status
            </TabsTrigger>
            <TabsTrigger value="advanced" className="gap-2">
              <Settings className="w-4 h-4" />
              Advanced
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ranges" className="space-y-6 mt-6">
            {/* Location */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Location
              </Label>
              <Input
                placeholder="Enter city or area..."
                value={tempFilters.location}
                onChange={(e) => handleTempFilterChange("location", e.target.value)}
              />
            </div>

            {/* Price Range */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Price Range: R{tempFilters.priceRange[0]} - R{tempFilters.priceRange[1]}
              </Label>
              <Slider
                value={tempFilters.priceRange}
                onValueChange={(value) => handleTempFilterChange("priceRange", value)}
                max={5000}
                min={0}
                step={50}
                className="w-full"
              />
            </div>

            {/* Distance Range */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Distance Range: {tempFilters.distanceRange[0]}km - {tempFilters.distanceRange[1]}km
              </Label>
              <Slider
                value={tempFilters.distanceRange}
                onValueChange={(value) => handleTempFilterChange("distanceRange", value)}
                max={100}
                min={0}
                step={5}
                className="w-full"
              />
            </div>

            {/* Rating Range */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2">
                <Star className="w-4 h-4" />
                Rating Range: {tempFilters.ratingRange[0]} - {tempFilters.ratingRange[1]} stars
              </Label>
              <Slider
                value={tempFilters.ratingRange}
                onValueChange={(value) => handleTempFilterChange("ratingRange", value)}
                max={5}
                min={0}
                step={0.1}
                className="w-full"
              />
            </div>
          </TabsContent>

          <TabsContent value="types" className="space-y-6 mt-6">
            {/* Categories */}
            <div className="space-y-3">
              <Label>Categories</Label>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category}`}
                      checked={tempFilters.categories.includes(category)}
                      onCheckedChange={() => handleArrayFilterToggle("categories", category)}
                    />
                    <Label htmlFor={`category-${category}`} className="text-sm">
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Subscription Types */}
            <div className="space-y-3">
              <Label>Subscription Types</Label>
              <div className="grid grid-cols-3 gap-2">
                {subscriptionTypes.map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={`subscription-${type}`}
                      checked={tempFilters.subscriptionTypes.includes(type)}
                      onCheckedChange={() => handleArrayFilterToggle("subscriptionTypes", type)}
                    />
                    <Label htmlFor={`subscription-${type}`} className="text-sm capitalize">
                      {type}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* User Types */}
            <div className="space-y-3">
              <Label>User Types</Label>
              <div className="grid grid-cols-2 gap-2">
                {userTypes.map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={`usertype-${type}`}
                      checked={tempFilters.userTypes.includes(type)}
                      onCheckedChange={() => handleArrayFilterToggle("userTypes", type)}
                    />
                    <Label htmlFor={`usertype-${type}`} className="text-sm capitalize">
                      {type}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Host Experience */}
            <div className="space-y-3">
              <Label>Host Experience</Label>
              <div className="grid grid-cols-2 gap-2">
                {["all", "new", "experienced", "expert"].map((level) => (
                  <div key={level} className="flex items-center space-x-2">
                    <Checkbox
                      id={`experience-${level}`}
                      checked={tempFilters.hostExperience === level}
                      onCheckedChange={() => handleTempFilterChange("hostExperience", level)}
                    />
                    <Label htmlFor={`experience-${level}`} className="text-sm capitalize">
                      {level}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="status" className="space-y-6 mt-6">
            {/* Verification Status */}
            <div className="space-y-3">
              <Label>Verification Status</Label>
              <div className="grid grid-cols-3 gap-2">
                {verificationStatuses.map((status) => (
                  <div key={status} className="flex items-center space-x-2">
                    <Checkbox
                      id={`verification-${status}`}
                      checked={tempFilters.verificationStatus.includes(status)}
                      onCheckedChange={() => handleArrayFilterToggle("verificationStatus", status)}
                    />
                    <Label htmlFor={`verification-${status}`} className="text-sm capitalize">
                      {status}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Booking Status */}
            <div className="space-y-3">
              <Label>Booking Status</Label>
              <div className="grid grid-cols-2 gap-2">
                {bookingStatuses.map((status) => (
                  <div key={status} className="flex items-center space-x-2">
                    <Checkbox
                      id={`booking-${status}`}
                      checked={tempFilters.bookingStatus.includes(status)}
                      onCheckedChange={() => handleArrayFilterToggle("bookingStatus", status)}
                    />
                    <Label htmlFor={`booking-${status}`} className="text-sm capitalize">
                      {status}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Offer Status */}
            <div className="space-y-3">
              <Label>Offer Status</Label>
              <div className="grid grid-cols-2 gap-2">
                {offerStatuses.map((status) => (
                  <div key={status} className="flex items-center space-x-2">
                    <Checkbox
                      id={`offer-${status}`}
                      checked={tempFilters.offerStatus.includes(status)}
                      onCheckedChange={() => handleArrayFilterToggle("offerStatus", status)}
                    />
                    <Label htmlFor={`offer-${status}`} className="text-sm capitalize">
                      {status}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-6 mt-6">
            {/* Safety Features */}
            <div className="space-y-3">
              <Label>Safety Features</Label>
              <div className="grid grid-cols-2 gap-2">
                {safetyFeatures.map((feature) => (
                  <div key={feature} className="flex items-center space-x-2">
                    <Checkbox
                      id={`safety-${feature}`}
                      checked={tempFilters.safetyFeatures.includes(feature)}
                      onCheckedChange={() => handleArrayFilterToggle("safetyFeatures", feature)}
                    />
                    <Label htmlFor={`safety-${feature}`} className="text-sm">
                      {feature.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Date Range */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Date Range
              </Label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs text-gray-500">From</Label>
                  <Input
                    type="date"
                    value={tempFilters.dateRange[0].toISOString().split("T")[0]}
                    onChange={(e) =>
                      handleTempFilterChange("dateRange", [new Date(e.target.value), tempFilters.dateRange[1]])
                    }
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-500">To</Label>
                  <Input
                    type="date"
                    value={tempFilters.dateRange[1].toISOString().split("T")[0]}
                    onChange={(e) =>
                      handleTempFilterChange("dateRange", [tempFilters.dateRange[0], new Date(e.target.value)])
                    }
                  />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={applyFilters}>Apply Filters</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
