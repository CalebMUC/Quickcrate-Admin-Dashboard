"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Notification } from "@/lib/types"
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface NotificationListProps {
  notifications: Notification[]
  onMarkAsRead: (id: string) => void
  onDelete: (id: string) => void
}

const typeConfig = {
  info: { icon: Info, color: "text-blue-500", bg: "bg-blue-500/10" },
  success: { icon: CheckCircle, color: "text-green-500", bg: "bg-green-500/10" },
  warning: { icon: AlertTriangle, color: "text-yellow-500", bg: "bg-yellow-500/10" },
  error: { icon: AlertCircle, color: "text-red-500", bg: "bg-red-500/10" },
}

export function NotificationList({ notifications, onMarkAsRead, onDelete }: NotificationListProps) {
  return (
    <div className="space-y-3">
      {notifications.map((notification) => {
        const config = typeConfig[notification.type]
        const Icon = config.icon

        return (
          <Card
            key={notification.id}
            className={cn("transition-colors", !notification.read && "border-primary/50 bg-primary/5")}
          >
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-lg", config.bg)}>
                  <Icon className={cn("h-5 w-5", config.color)} />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-semibold">{notification.title}</h4>
                        {!notification.read && <Badge className="h-5 px-1.5 text-xs">New</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {new Date(notification.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onDelete(notification.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex gap-2 mt-3">
                    {!notification.read && (
                      <Button variant="outline" size="sm" onClick={() => onMarkAsRead(notification.id)}>
                        Mark as Read
                      </Button>
                    )}
                    {notification.actionUrl && (
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
