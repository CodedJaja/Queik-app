"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const PREFERENCES = [
  {
    category: "Transactions",
    items: [
      { id: "send", label: "Money sent", enabled: true },
      { id: "receive", label: "Money received", enabled: true },
      { id: "transfer", label: "Transfer updates", enabled: true },
      { id: "pending", label: "Pending transactions", enabled: true },
    ]
  },
  {
    category: "Trading & Investments",
    items: [
      { id: "buy", label: "Buy/Sell confirmed", enabled: true },
      { id: "price_alert", label: "Price alerts", enabled: true },
      { id: "market", label: "Market news", enabled: false },
      { id: "portfolio", label: "Portfolio updates", enabled: true },
    ]
  },
  {
    category: "Security & Account",
    items: [
      { id: "login", label: "New login alerts", enabled: true },
      { id: "card_added", label: "Card added/removed", enabled: true },
      { id: "account_change", label: "Account changes", enabled: true },
      { id: "verification", label: "Verification requests", enabled: true },
    ]
  },
]

const DELIVERY_CHANNELS = [
  { id: "push", label: "Push Notifications", enabled: true },
  { id: "email", label: "Email", enabled: true },
  { id: "sms", label: "SMS", enabled: false },
]

export default function NotificationPreferences() {
  const [preferences, setPreferences] = useState(PREFERENCES)
  const [channels, setChannels] = useState(DELIVERY_CHANNELS)

  const togglePreference = (categoryIdx: number, itemId: string) => {
    setPreferences(prev => {
      const updated = [...prev]
      const itemIdx = updated[categoryIdx].items.findIndex(i => i.id === itemId)
      if (itemIdx !== -1) {
        updated[categoryIdx].items[itemIdx].enabled = !updated[categoryIdx].items[itemIdx].enabled
      }
      return updated
    })
  }

  const toggleChannel = (channelId: string) => {
    setChannels(prev =>
      prev.map(c => c.id === channelId ? { ...c, enabled: !c.enabled } : c)
    )
  }

  return (
    <div className="space-y-6">
      {/* Notification Categories */}
      {preferences.map((category, categoryIdx) => (
        <Card key={category.category} className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">{category.category}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {category.items.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-900">{item.label}</span>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={item.enabled}
                    onChange={() => togglePreference(categoryIdx, item.id)}
                    className="w-5 h-5 rounded accent-emerald-600"
                  />
                </label>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}

      {/* Delivery Channels */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-base">Delivery Channels</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {channels.map((channel) => (
            <div key={channel.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div>
                <p className="font-medium text-slate-900">{channel.label}</p>
                <p className="text-xs text-slate-600">
                  {channel.id === "push" && "In-app notifications"}
                  {channel.id === "email" && "Sent to your registered email"}
                  {channel.id === "sms" && "Sent to your registered phone number"}
                </p>
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={channel.enabled}
                  onChange={() => toggleChannel(channel.id)}
                  className="w-5 h-5 rounded accent-emerald-600"
                />
              </label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quiet Hours */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-base">Quiet Hours</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-slate-600">Notifications will be silenced during these hours</p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">Start Time</label>
              <input
                type="time"
                defaultValue="22:00"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">End Time</label>
              <input
                type="time"
                defaultValue="08:00"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex gap-2">
        <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white">
          Save Preferences
        </Button>
      </div>
    </div>
  )
}
