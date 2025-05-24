"use client"

import { useState } from "react"
import { Plus, X, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useAppStore } from "@/lib/store"
import { formatDate } from "@/lib/utils"

export function DateBlocking() {
  const { blockedDates, currentUser, addBlockedDate, removeBlockedDate } = useAppStore()
  const [showBlockDialog, setShowBlockDialog] = useState(false)
  const [blockData, setBlockData] = useState({
    date: "",
    reason: "",
  })

  const userBlockedDates = blockedDates.filter((blocked) => blocked.hostId === currentUser?.id)

  const handleBlockDate = () => {
    if (blockData.date && blockData.reason.trim()) {
      addBlockedDate(blockData.date, blockData.reason.trim())
      setBlockData({ date: "", reason: "" })
      setShowBlockDialog(false)
    }
  }

  const handleUnblockDate = (id: string) => {
    if (confirm("Are you sure you want to unblock this date?")) {
      removeBlockedDate(id)
    }
  }

  const isDateInPast = (date: string) => {
    return new Date(date) < new Date()
  }

  return (
    <>
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-gray-900 dark:text-white">Blocked Dates</CardTitle>
            <Button
              size="sm"
              onClick={() => setShowBlockDialog(true)}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              <Plus className="w-4 h-4 mr-1" />
              Block Date
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {userBlockedDates.length > 0 ? (
            <div className="space-y-3">
              {userBlockedDates.map((blocked) => (
                <div
                  key={blocked.id}
                  className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-600 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="font-medium text-gray-900 dark:text-white">{formatDate(blocked.date)}</span>
                      {isDateInPast(blocked.date) && (
                        <Badge variant="secondary" className="text-xs">
                          Past
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{blocked.reason}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleUnblockDate(blocked.id)}
                    className="text-red-500 border-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <Calendar className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <p className="text-gray-500 dark:text-gray-400">No blocked dates</p>
              <p className="text-sm text-gray-400 dark:text-gray-500">Block dates when you're not available to host</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Block Date Dialog */}
      <Dialog open={showBlockDialog} onOpenChange={setShowBlockDialog}>
        <DialogContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-white">Block Date</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="text-gray-900 dark:text-white">Date</Label>
              <Input
                type="date"
                value={blockData.date}
                onChange={(e) => setBlockData({ ...blockData, date: e.target.value })}
                min={new Date().toISOString().split("T")[0]}
                className="mt-1 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <Label className="text-gray-900 dark:text-white">Reason</Label>
              <Textarea
                value={blockData.reason}
                onChange={(e) => setBlockData({ ...blockData, reason: e.target.value })}
                placeholder="e.g., Personal commitment, Out of town, etc."
                className="mt-1 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white"
              />
            </div>

            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm text-blue-700 dark:text-blue-200">
                Blocking this date will prevent new bookings. Existing bookings will not be affected.
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setShowBlockDialog(false)
                  setBlockData({ date: "", reason: "" })
                }}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleBlockDate}
                disabled={!blockData.date || !blockData.reason.trim()}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white"
              >
                Block Date
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
