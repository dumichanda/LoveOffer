"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CalendarIcon, Filter, X, RotateCcw } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

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

interface AnalyticsFiltersProps {
  filters: AnalyticsFilters
  onFiltersChange: (filters: AnalyticsFilters) => void
  onReset: () => void
}

export function AnalyticsFiltersComponent({ filters, onFiltersChange, onReset }: AnalyticsFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const updateFilter = <K extends keyof AnalyticsFilters>(key: K, value: AnalyticsFilters[K]) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const toggleArrayFilter = (key: keyof AnalyticsFilters, value: string) => {
    const currentArray = filters[key] as string[]
    const newArray = currentArray.includes(value)
      ? currentArray.filter((item) => item !== value)
      : [...currentArray, value]
    updateFilter(key, newArray as any)
  }

  const getActiveFiltersCount = () => {
    let count = 0
    if (filters.categories.length > 0) count++
    if (filters.subscriptionTypes.length > 0) count++
    if (filters.verificationStatus.length > 0) count++
    if (filters.bookingStatus.length > 0) count++
    if (filters.offerStatus.length > 0) count++
    if (filters.userTypes.length > 0) count++
    if (filters.location.trim() !== "") count++
    if (filters.hostExperience !== "all") count++
    if (filters.safetyFeatures.length > 0) count++
    if (filters.distanceRange[0] !== 0 || filters.distanceRange[1] !== 100) count++
    if (filters.priceRange[0] !== 0 || filters.priceRange[1] !== 5000) count++
    if (filters.ratingRange[0] !== 0 || filters.ratingRange[1] !== 5) count++
    return count
  }

  return (
    <Card className="dark:bg-gray-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Analytics Filters
            {getActiveFiltersCount() > 0 && (
              <Badge variant="secondary" className="ml-2">
                {getActiveFiltersCount()} active
              </Badge>
            )}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={onReset} className="gap-2">
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
            <Button variant="outline" size="sm" onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? "Collapse" : "Expand"}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Date Range Filter */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Date Range</Label>
          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "justify-start text-left font-normal",
                    !filters.dateRange[0] && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {filters.dateRange[0] ? format(filters.dateRange[0], "PPP") : "Start date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={filters.dateRange[0]}
                  onSelect={(date) => date && updateFilter("dateRange", [date, filters.dateRange[1]])}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "justify-start text-left font-normal",
                    !filters.dateRange[1] && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {filters.dateRange[1] ? format(filters.dateRange[1], "PPP") : "End date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={filters.dateRange[1]}
                  onSelect={(date) => date && updateFilter("dateRange", [filters.dateRange[0], date])}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Distance Range Slider */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">
            Distance Range: {filters.distanceRange[0]}km - {filters.distanceRange[1]}km
          </Label>
          <Slider
            value={filters.distanceRange}
            onValueChange={(value) => updateFilter("distanceRange", value as [number, number])}
            max={100}
            min={0}
            step={5}
            className="w-full"
          />
        </div>

        {/* Price Range Slider */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">
            Price Range: R{filters.priceRange[0]} - R{filters.priceRange[1]}
          </Label>
          <Slider
            value={filters.priceRange}
            onValueChange={(value) => updateFilter("priceRange", value as [number, number])}
            max={5000}
            min={0}
            step={50}
            className="w-full"
          />
        </div>

        {/* Rating Range Slider */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">
            Rating Range: {filters.ratingRange[0]}⭐ - {filters.ratingRange[1]}⭐
          </Label>
          <Slider
            value={filters.ratingRange}
            onValueChange={(value) => updateFilter("ratingRange", value as [number, number])}
            max={5}
            min={0}
            step={0.1}
            className="w-full"
          />
        </div>

        {isExpanded && (
          <>
            {/* Location Filter */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Location</Label>
              <Input
                placeholder="Filter by location..."
                value={filters.location}
                onChange={(e) => updateFilter("location", e.target.value)}
              />
            </div>

            {/* Categories Filter */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Categories</Label>
              <div className="flex flex-wrap gap-2">
                {["Adventure", "Food & Wine", "Arts & Culture", "Sports", "Entertainment", "Education"].map(
                  (category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${category}`}
                        checked={filters.categories.includes(category)}
                        onCheckedChange={() => toggleArrayFilter("categories", category)}
                      />
                      <Label htmlFor={`category-${category}`} className="text-sm">
                        {category}
                      </Label>
                    </div>
                  ),
                )}
              </div>
            </div>

            {/* Subscription Types */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Subscription Types</Label>
              <div className="flex flex-wrap gap-2">
                {["free", "standard", "premium"].map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={`subscription-${type}`}
                      checked={filters.subscriptionTypes.includes(type)}
                      onCheckedChange={() => toggleArrayFilter("subscriptionTypes", type)}
                    />
                    <Label htmlFor={`subscription-${type}`} className="text-sm capitalize">
                      {type}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Verification Status */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Verification Status</Label>
              <div className="flex flex-wrap gap-2">
                {["verified", "unverified", "pending"].map((status) => (
                  <div key={status} className="flex items-center space-x-2">
                    <Checkbox
                      id={`verification-${status}`}
                      checked={filters.verificationStatus.includes(status)}
                      onCheckedChange={() => toggleArrayFilter("verificationStatus", status)}
                    />
                    <Label htmlFor={`verification-${status}`} className="text-sm capitalize">
                      {status}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Booking Status */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Booking Status</Label>
              <div className="flex flex-wrap gap-2">
                {["pending", "confirmed", "completed", "cancelled"].map((status) => (
                  <div key={status} className="flex items-center space-x-2">
                    <Checkbox
                      id={`booking-${status}`}
                      checked={filters.bookingStatus.includes(status)}
                      onCheckedChange={() => toggleArrayFilter("bookingStatus", status)}
                    />
                    <Label htmlFor={`booking-${status}`} className="text-sm capitalize">
                      {status}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Offer Status */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Offer Status</Label>
              <div className="flex flex-wrap gap-2">
                {["active", "paused", "draft", "completed"].map((status) => (
                  <div key={status} className="flex items-center space-x-2">
                    <Checkbox
                      id={`offer-${status}`}
                      checked={filters.offerStatus.includes(status)}
                      onCheckedChange={() => toggleArrayFilter("offerStatus", status)}
                    />
                    <Label htmlFor={`offer-${status}`} className="text-sm capitalize">
                      {status}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* User Types */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">User Types</Label>
              <div className="flex flex-wrap gap-2">
                {["admin", "host", "guest", "both"].map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={`user-${type}`}
                      checked={filters.userTypes.includes(type)}
                      onCheckedChange={() => toggleArrayFilter("userTypes", type)}
                    />
                    <Label htmlFor={`user-${type}`} className="text-sm capitalize">
                      {type}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Host Experience */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Host Experience</Label>
              <Select value={filters.hostExperience} onValueChange={(value) => updateFilter("hostExperience", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="new">New (0-5 dates)</SelectItem>
                  <SelectItem value="experienced">Experienced (6-20 dates)</SelectItem>
                  <SelectItem value="expert">Expert (20+ dates)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Safety Features */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Safety Features</Label>
              <div className="flex flex-wrap gap-2">
                {["publicMeeting", "backgroundChecked", "emergencyContact", "gpsTracking"].map((feature) => (
                  <div key={feature} className="flex items-center space-x-2">
                    <Checkbox
                      id={`safety-${feature}`}
                      checked={filters.safetyFeatures.includes(feature)}
                      onCheckedChange={() => toggleArrayFilter("safetyFeatures", feature)}
                    />
                    <Label htmlFor={`safety-${feature}`} className="text-sm">
                      {feature.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Active Filters Summary */}
        {getActiveFiltersCount() > 0 && (
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <Label className="text-sm font-medium mb-2 block">Active Filters</Label>
            <div className="flex flex-wrap gap-2">
              {filters.categories.map((category) => (
                <Badge key={`active-category-${category}`} variant="secondary" className="gap-1">
                  {category}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => toggleArrayFilter("categories", category)} />
                </Badge>
              ))}
              {filters.subscriptionTypes.map((type) => (
                <Badge key={`active-sub-${type}`} variant="secondary" className="gap-1">
                  {type}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => toggleArrayFilter("subscriptionTypes", type)} />
                </Badge>
              ))}
              {filters.location && (
                <Badge variant="secondary" className="gap-1">
                  Location: {filters.location}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => updateFilter("location", "")} />
                </Badge>
              )}
              {(filters.distanceRange[0] !== 0 || filters.distanceRange[1] !== 100) && (
                <Badge variant="secondary" className="gap-1">
                  Distance: {filters.distanceRange[0]}-{filters.distanceRange[1]}km
                  <X className="w-3 h-3 cursor-pointer" onClick={() => updateFilter("distanceRange", [0, 100])} />
                </Badge>
              )}
              {(filters.priceRange[0] !== 0 || filters.priceRange[1] !== 5000) && (
                <Badge variant="secondary" className="gap-1">
                  Price: R{filters.priceRange[0]}-R{filters.priceRange[1]}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => updateFilter("priceRange", [0, 5000])} />
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
