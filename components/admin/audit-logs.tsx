"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FileText, Download, AlertTriangle, Info, CheckCircle, XCircle } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

export function AuditLogs() {
  const auditLogs = [
    {
      id: "1",
      timestamp: "2024-01-15T10:30:00Z",
      action: "User Created",
      entityType: "User",
      entityId: "user_123",
      adminId: "admin_001",
      severity: "info" as const,
      details: "New user account created successfully",
    },
    {
      id: "2",
      timestamp: "2024-01-15T09:15:00Z",
      action: "Offer Deleted",
      entityType: "Offer",
      entityId: "offer_456",
      adminId: "admin_002",
      severity: "warning" as const,
      details: "Offer removed due to policy violation",
    },
    {
      id: "3",
      timestamp: "2024-01-15T08:45:00Z",
      action: "Payment Failed",
      entityType: "Payment",
      entityId: "pay_789",
      adminId: null,
      severity: "error" as const,
      details: "Payment processing failed - insufficient funds",
    },
    {
      id: "4",
      timestamp: "2024-01-14T16:20:00Z",
      action: "Settings Updated",
      entityType: "System",
      entityId: "settings_001",
      adminId: "admin_001",
      severity: "info" as const,
      details: "Platform settings configuration updated",
    },
    {
      id: "5",
      timestamp: "2024-01-14T14:10:00Z",
      action: "User Suspended",
      entityType: "User",
      entityId: "user_456",
      adminId: "admin_003",
      severity: "warning" as const,
      details: "User account suspended for 7 days due to violations",
    },
  ]
  const [searchQuery, setSearchQuery] = useState("")
  const [severityFilter, setSeverityFilter] = useState<"all" | "info" | "warning" | "error">("all")
  const [actionFilter, setActionFilter] = useState<string>("all")

  // Add safety check for auditLogs
  const safeAuditLogs = auditLogs || []

  const filteredLogs = useMemo(() => {
    let filtered = safeAuditLogs

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (log) =>
          log.action.toLowerCase().includes(query) ||
          log.details.toLowerCase().includes(query) ||
          log.entityType.toLowerCase().includes(query) ||
          log.adminId?.toLowerCase().includes(query),
      )
    }

    if (severityFilter !== "all") {
      filtered = filtered.filter((log) => log.severity === severityFilter)
    }

    if (actionFilter !== "all") {
      filtered = filtered.filter((log) => log.action === actionFilter)
    }

    return filtered.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  }, [safeAuditLogs, searchQuery, severityFilter, actionFilter])

  const uniqueActions = useMemo(() => {
    if (!safeAuditLogs || safeAuditLogs.length === 0) {
      return []
    }
    const actions = [...new Set(safeAuditLogs.map((log) => log.action))]
    return actions.sort()
  }, [safeAuditLogs])

  const exportLogs = () => {
    const csvContent = [
      "Timestamp,Action,Entity Type,Entity ID,Admin ID,Severity,Details",
      ...filteredLogs.map(
        (log) =>
          `${log.timestamp},${log.action},${log.entityType},${log.entityId},${log.adminId || "System"},${log.severity},"${log.details}"`,
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `audit_logs_${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "error":
        return <XCircle className="w-4 h-4 text-red-500" />
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      case "info":
        return <Info className="w-4 h-4 text-blue-500" />
      default:
        return <CheckCircle className="w-4 h-4 text-green-500" />
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "error":
        return <Badge variant="destructive">Error</Badge>
      case "warning":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Warning
          </Badge>
        )
      case "info":
        return <Badge variant="outline">Info</Badge>
      default:
        return <Badge variant="default">Success</Badge>
    }
  }

  return (
    <div className="space-y-4">
      <Card className="dark:bg-gray-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Audit Logs ({filteredLogs.length})
            </CardTitle>
            <Button onClick={exportLogs} variant="outline" size="sm" className="gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filters */}
          <div className="flex gap-2 flex-wrap">
            <div className="flex-1 min-w-64">
              <Input
                placeholder="Search logs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>

            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value as any)}
              className="px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="all">All Severities</option>
              <option value="info">Info</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
            </select>

            <select
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
              className="px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="all">All Actions</option>
              {uniqueActions.map((action) => (
                <option key={action} value={action}>
                  {action}
                </option>
              ))}
            </select>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{safeAuditLogs.length}</div>
              <div className="text-xs text-gray-500">Total Logs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-500">
                {safeAuditLogs.filter((l) => l.severity === "error").length}
              </div>
              <div className="text-xs text-gray-500">Errors</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-500">
                {safeAuditLogs.filter((l) => l.severity === "warning").length}
              </div>
              <div className="text-xs text-gray-500">Warnings</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500">
                {safeAuditLogs.filter((l) => l.severity === "info").length}
              </div>
              <div className="text-xs text-gray-500">Info</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Logs List */}
      <Card className="dark:bg-gray-800">
        <CardContent className="p-0">
          <ScrollArea className="h-96">
            <div className="space-y-1 p-4">
              {filteredLogs.map((log) => (
                <div
                  key={log.id}
                  className="flex items-start gap-3 p-3 border rounded-lg dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <div className="mt-0.5">{getSeverityIcon(log.severity)}</div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{log.action}</span>
                      {getSeverityBadge(log.severity)}
                      <Badge variant="outline" className="text-xs">
                        {log.entityType}
                      </Badge>
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{log.details}</p>

                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>{formatDistanceToNow(new Date(log.timestamp), { addSuffix: true })}</span>
                      {log.adminId && <span>by {log.adminId}</span>}
                      <span>ID: {log.entityId}</span>
                    </div>
                  </div>
                </div>
              ))}

              {filteredLogs.length === 0 && (
                <div className="text-center py-8 text-gray-500">No audit logs found matching your criteria.</div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
