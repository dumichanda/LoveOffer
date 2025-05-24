"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function BulkOperations() {
  return (
    <Card className="dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="text-sm">Bulk Operations</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Bulk operations functionality will be available here.
        </p>
        <div className="flex gap-2">
          <Button size="sm" variant="outline">
            Select All
          </Button>
          <Button size="sm" variant="outline">
            Bulk Edit
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
