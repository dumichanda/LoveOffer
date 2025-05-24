"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Server } from "lucide-react"

export function SystemHealth() {
  return (
    <Card className="dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Server className="w-5 h-5" />
          System Health
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm">System Status</span>
          <Badge variant="default">Healthy</Badge>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">CPU Usage</span>
          <span className="text-sm">45%</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">Memory Usage</span>
          <span className="text-sm">62%</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">Uptime</span>
          <span className="text-sm">99.9%</span>
        </div>
      </CardContent>
    </Card>
  )
}
