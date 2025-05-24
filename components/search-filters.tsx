"use client"

import { useState } from "react"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAppStore } from "@/lib/store"

interface SearchFiltersProps {
  onClose?: () => void
}

export function SearchFilters({ onClose }: SearchFiltersProps) {
  const { searchFilters, updateSearchFilters } = useAppStore()
  const [isExpanded, setIsExpanded] = useState(false)

  const categories = ["All", "Adventure", "Casual", "Fine Dining", "Culture", "Sports", "Entertainment"]

  const handleFilterChange = (key: string, value: any) => {
    updateSearchFilters({ [key]: value })
  }

  const clearFilters = () => {
    updateSearchFilters({
      query: "",
      location: "",
      priceRange: [0, 5000],
      dateRange: ["", ""],
      category: "",
      sortBy: "newest",
    })
  }

  const activeFiltersCount =
    [
      searchFilters.query,
      searchFilters.location,
      searchFilters.category,
      searchFilters.dateRange[0],
      searchFilters.dateRange[1],
    ].filter(Boolean).length + (searchFilters.priceRange[0] > 0 || searchFilters.priceRange[1] < 5000 ? 1 : 0)

  return (
    <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <CardContent className="p-4">
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search offers..."
            value={searchFilters.query}
            onChange={(e) => handleFilterChange("query", e.target.value)}
            className="pl-10 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white"
          />
        </div>

        {/* Quick Filters */}
        <div className="flex items-center gap-2 mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-1">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>

          {activeFiltersCount > 0 && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="w-4 h-4 mr-1" />
              Clear
            </Button>
          )}

          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose} className="ml-auto">
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Expanded Filters */}
        {isExpanded && (
          <div className="space-y-4 border-t border-gray-200 dark:border-gray-600 pt-4">
            {/* Location */}
            <div>
              <Label className="text-sm font-medium text-gray-900 dark:text-white">Location</Label>
              <Input
                placeholder="Enter city or area..."
                value={searchFilters.location}
                onChange={(e) => handleFilterChange("location", e.target.value)}
                className="mt-1 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white"
              />
            </div>

            {/* Category */}
            <div>
              <Label className="text-sm font-medium text-gray-900 dark:text-white">Category</Label>
              <Select value={searchFilters.category} onValueChange={(value) => handleFilterChange("category", value)}>
                <SelectTrigger className="mt-1 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  {categories.map((category) => (
                    <SelectItem
                      key={category}
                      value={category === "All" ? "" : category}
                      className="text-gray-900 dark:text-white"
                    >
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Price Range */}
            <div>
              <Label className="text-sm font-medium text-gray-900 dark:text-white">Price Range (R)</Label>
              <div className="grid grid-cols-2 gap-2 mt-1">
                <Input
                  type="number"
                  placeholder="Min"
                  value={searchFilters.priceRange[0]}
                  onChange={(e) =>
                    handleFilterChange("priceRange", [Number(e.target.value), searchFilters.priceRange[1]])
                  }
                  className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white"
                />
                <Input
                  type="number"
                  placeholder="Max"
                  value={searchFilters.priceRange[1]}
                  onChange={(e) =>
                    handleFilterChange("priceRange", [searchFilters.priceRange[0], Number(e.target.value)])
                  }
                  className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            {/* Date Range */}
            <div>
              <Label className="text-sm font-medium text-gray-900 dark:text-white">Date Range</Label>
              <div className="grid grid-cols-2 gap-2 mt-1">
                <Input
                  type="date"
                  value={searchFilters.dateRange[0]}
                  onChange={(e) => handleFilterChange("dateRange", [e.target.value, searchFilters.dateRange[1]])}
                  className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white"
                />
                <Input
                  type="date"
                  value={searchFilters.dateRange[1]}
                  onChange={(e) => handleFilterChange("dateRange", [searchFilters.dateRange[0], e.target.value])}
                  className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            {/* Sort By */}
            <div>
              <Label className="text-sm font-medium text-gray-900 dark:text-white">Sort By</Label>
              <Select value={searchFilters.sortBy} onValueChange={(value) => handleFilterChange("sortBy", value)}>
                <SelectTrigger className="mt-1 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <SelectItem value="newest" className="text-gray-900 dark:text-white">
                    Newest First
                  </SelectItem>
                  <SelectItem value="price_low" className="text-gray-900 dark:text-white">
                    Price: Low to High
                  </SelectItem>
                  <SelectItem value="price_high" className="text-gray-900 dark:text-white">
                    Price: High to Low
                  </SelectItem>
                  <SelectItem value="rating" className="text-gray-900 dark:text-white">
                    Highest Rated
                  </SelectItem>
                  <SelectItem value="distance" className="text-gray-900 dark:text-white">
                    Distance
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
