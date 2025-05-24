"use client"

import { useState, useMemo } from "react"
import { Search, Filter, X, MapPin, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { useEnhancedStore } from "@/lib/enhanced-store"

export function EnhancedSearch() {
  const [showFilters, setShowFilters] = useState(false)
  const {
    searchQuery,
    selectedCategory,
    priceRange,
    locationFilter,
    setSearchQuery,
    setSelectedCategory,
    setPriceRange,
    setLocationFilter,
    clearFilters,
  } = useEnhancedStore()

  const categories = [
    "Dining",
    "Wine & Spirits",
    "Culture",
    "Adventure",
    "Entertainment",
    "Outdoor",
    "Wellness",
    "Learning",
  ]

  const locations = ["Cape Town", "Johannesburg", "Durban", "Pretoria", "Port Elizabeth", "Stellenbosch"]

  const activeFiltersCount = useMemo(() => {
    let count = 0
    if (searchQuery) count++
    if (selectedCategory) count++
    if (locationFilter) count++
    if (priceRange[0] > 0 || priceRange[1] < 1000) count++
    return count
  }, [searchQuery, selectedCategory, locationFilter, priceRange])

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search experiences, locations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="relative bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
        >
          <Filter className="w-4 h-4 mr-2" />
          Filters
          {activeFiltersCount > 0 && (
            <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </div>

      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">Active filters:</span>
          {searchQuery && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Search: {searchQuery}
              <button onClick={() => setSearchQuery("")}>
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          {selectedCategory && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {selectedCategory}
              <button onClick={() => setSelectedCategory("")}>
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          {locationFilter && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {locationFilter}
              <button onClick={() => setLocationFilter("")}>
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          {(priceRange[0] > 0 || priceRange[1] < 1000) && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <DollarSign className="w-3 h-3" />R{priceRange[0]} - R{priceRange[1]}
              <button onClick={() => setPriceRange([0, 1000])}>
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          <Button variant="ghost" size="sm" onClick={clearFilters} className="text-red-600 hover:text-red-700">
            Clear all
          </Button>
        </div>
      )}

      {/* Filter Panel */}
      {showFilters && (
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-4 space-y-6">
            {/* Categories */}
            <div>
              <h3 className="font-medium mb-3 text-gray-900 dark:text-white">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(selectedCategory === category ? "" : category)}
                    className="text-sm"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Location */}
            <div>
              <h3 className="font-medium mb-3 text-gray-900 dark:text-white">Location</h3>
              <div className="flex flex-wrap gap-2">
                {locations.map((location) => (
                  <Button
                    key={location}
                    variant={locationFilter === location ? "default" : "outline"}
                    size="sm"
                    onClick={() => setLocationFilter(locationFilter === location ? "" : location)}
                    className="text-sm"
                  >
                    <MapPin className="w-3 h-3 mr-1" />
                    {location}
                  </Button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="font-medium mb-3 text-gray-900 dark:text-white">Price Range</h3>
              <div className="space-y-3">
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={1000}
                  min={0}
                  step={25}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>R{priceRange[0]}</span>
                  <span>R{priceRange[1]}</span>
                </div>
              </div>
            </div>

            {/* Filter Actions */}
            <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button variant="outline" onClick={clearFilters} className="flex-1">
                Clear All
              </Button>
              <Button onClick={() => setShowFilters(false)} className="flex-1 bg-red-500 hover:bg-red-600">
                Apply Filters
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
