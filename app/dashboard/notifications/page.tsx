"use client"

import { useState } from "react"
import { Bell, Check, Trash2, Filter, Archive } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import NotificationsList from "@/components/notifications/notifications-list"
import NotificationPreferences from "@/components/notifications/notification-preferences"

const NOTIFICATIONS = [
  {
    id: 1,
    type: "transaction_completed",
    title: "Transaction Completed",
    message: "You successfully sent $1,500 to Alice Johnson (EUR transfer)",
    timestamp: "2 minutes ago",
    read: false,
    icon: "send",
    amount: "-$1,500"
  },
  {
    id: 2,
    type: "purchase_confirmed",
    title: "Purchase Confirmed",
    message: "You bought 0.5 BTC at $42,350",
    timestamp: "1 hour ago",
    read: false,
    icon: "buy",
    amount: "-$21,175"
  },
  {
    id: 3,
    type: "deposit_received",
    title: "Deposit Received",
    message: "You received $5,000 from your bank account",
    timestamp: "3 hours ago",
    read: true,
    icon: "receive",
    amount: "+$5,000"
  },
  {
    id: 4,
    type: "card_added",
    title: "Card Successfully Added",
    message: "Your new Mastercard has been added and is ready to use",
    timestamp: "1 day ago",
    read: true,
    icon: "card",
  },
  {
    id: 5,
    type: "market_alert",
    title: "Market Alert",
    message: "Bitcoin reached your target price of $42,000",
    timestamp: "2 days ago",
    read: true,
    icon: "alert",
  },
  {
    id: 6,
    type: "security_alert",
    title: "Security Alert",
    message: "New login detected from Chrome on macOS. Was this you?",
    timestamp: "3 days ago",
    read: true,
    icon: "security",
  },
]

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState<"all" | "preferences">("all")
  const [notifications, setNotifications] = useState(NOTIFICATIONS)
  const [selectedNotifications, setSelectedNotifications] = useState<number[]>([])

  const unreadCount = notifications.filter(n => !n.read).length

  const markAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const deleteSelected = () => {
    setNotifications(prev => prev.filter(n => !selectedNotifications.includes(n.id)))
    setSelectedNotifications([])
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-6 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Bell className="w-8 h-8" />
              Notifications
            </h1>
            <p className="text-slate-600">
              {unreadCount > 0 ? `You have ${unreadCount} unread notifications` : "All caught up!"}
            </p>
          </div>
          {unreadCount > 0 && (
            <Button
              onClick={markAllAsRead}
              variant="outline"
              className="border-slate-200"
            >
              Mark all as read
            </Button>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-slate-200">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-3 font-medium transition-colors ${
              activeTab === "all"
                ? "text-emerald-600 border-b-2 border-emerald-600"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            All Notifications
          </button>
          <button
            onClick={() => setActiveTab("preferences")}
            className={`px-4 py-3 font-medium transition-colors ${
              activeTab === "preferences"
                ? "text-emerald-600 border-b-2 border-emerald-600"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Preferences
          </button>
        </div>

        {/* Notifications Tab */}
        {activeTab === "all" && (
          <div className="space-y-4">
            {/* Action Buttons */}
            {selectedNotifications.length > 0 && (
              <Card className="border-0 shadow-sm bg-blue-50 border-l-4 border-blue-600">
                <CardContent className="p-4 flex items-center justify-between">
                  <p className="font-medium text-blue-900">
                    {selectedNotifications.length} selected
                  </p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-blue-200 text-blue-600"
                    >
                      <Archive className="w-4 h-4 mr-2" />
                      Archive
                    </Button>
                    <Button
                      size="sm"
                      onClick={deleteSelected}
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Notifications List */}
            <NotificationsList
              notifications={notifications}
              selectedNotifications={selectedNotifications}
              onSelectNotification={(id) => {
                setSelectedNotifications(prev =>
                  prev.includes(id)
                    ? prev.filter(n => n !== id)
                    : [...prev, id]
                )
              }}
              onMarkAsRead={markAsRead}
              onDelete={deleteNotification}
            />
          </div>
        )}

        {/* Preferences Tab */}
        {activeTab === "preferences" && (
          <NotificationPreferences />
        )}
      </div>
    </main>
  )
}
