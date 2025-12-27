"use client"

import { Check, Trash2, Send, TrendingUp, Download, CreditCard, AlertCircle, Shield } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const ICON_MAP: { [key: string]: any } = {
  send: Send,
  buy: TrendingUp,
  receive: Download,
  card: CreditCard,
  alert: AlertCircle,
  security: Shield,
}

interface Notification {
  id: number
  type: string
  title: string
  message: string
  timestamp: string
  read: boolean
  icon: string
  amount?: string
}

interface NotificationsListProps {
  notifications: Notification[]
  selectedNotifications: number[]
  onSelectNotification: (id: number) => void
  onMarkAsRead: (id: number) => void
  onDelete: (id: number) => void
}

export default function NotificationsList({
  notifications,
  selectedNotifications,
  onSelectNotification,
  onMarkAsRead,
  onDelete,
}: NotificationsListProps) {
  if (notifications.length === 0) {
    return (
      <Card className="border-0 shadow-sm">
        <CardContent className="p-12 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-slate-400" />
          </div>
          <p className="text-slate-600">No notifications</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-3">
      {notifications.map((notification) => {
        const IconComponent = ICON_MAP[notification.icon]

        return (
          <Card
            key={notification.id}
            className={`border-0 shadow-sm transition-all cursor-pointer hover-lift ${
              notification.read ? "bg-white" : "bg-emerald-50 border-l-4 border-emerald-600"
            }`}
            onClick={() => !notification.read && onMarkAsRead(notification.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                {/* Checkbox */}
                <input
                  type="checkbox"
                  checked={selectedNotifications.includes(notification.id)}
                  onChange={() => onSelectNotification(notification.id)}
                  onClick={(e) => e.stopPropagation()}
                  className="w-5 h-5 rounded border-slate-300 cursor-pointer mt-1 accent-emerald-600"
                />

                {/* Icon */}
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    notification.type === "security_alert"
                      ? "bg-red-100"
                      : notification.type === "market_alert"
                      ? "bg-blue-100"
                      : "bg-emerald-100"
                  }`}
                >
                  {IconComponent ? (
                    <IconComponent
                      className={`w-5 h-5 ${
                        notification.type === "security_alert"
                          ? "text-red-600"
                          : notification.type === "market_alert"
                          ? "text-blue-600"
                          : "text-emerald-600"
                      }`}
                    />
                  ) : null}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className={`font-semibold ${!notification.read ? "text-slate-900" : "text-slate-700"}`}>
                      {notification.title}
                    </h3>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-emerald-600 rounded-full flex-shrink-0 mt-2" />
                    )}
                  </div>
                  <p className="text-sm text-slate-600 mb-2">{notification.message}</p>
                  <p className="text-xs text-slate-500">{notification.timestamp}</p>
                </div>

                {/* Amount or Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  {notification.amount && (
                    <span className={`font-semibold text-sm ${
                      notification.amount.startsWith("+") ? "text-emerald-600" : "text-red-600"
                    }`}>
                      {notification.amount}
                    </span>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-1">
                    {!notification.read && (
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation()
                          onMarkAsRead(notification.id)
                        }}
                        className="h-8 w-8 hover:bg-slate-100"
                        title="Mark as read"
                      >
                        <Check className="w-4 h-4 text-emerald-600" />
                      </Button>
                    )}
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation()
                        onDelete(notification.id)
                      }}
                      className="h-8 w-8 hover:bg-red-50"
                      title="Delete notification"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
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
