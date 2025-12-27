"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, Mail, MessageSquare, Smartphone } from 'lucide-react'

interface NotificationPreference {
  transactionAlerts: boolean
  loanUpdates: boolean
  promotions: boolean
  securityAlerts: boolean
  marketAlerts: boolean
}

export default function NotificationsSection() {
  const [preferences, setPreferences] = useState<NotificationPreference>({
    transactionAlerts: true,
    loanUpdates: true,
    promotions: false,
    securityAlerts: true,
    marketAlerts: true
  })

  const [deliveryChannels, setDeliveryChannels] = useState({
    email: true,
    sms: true,
    push: true
  })

  const handleToggle = (key: keyof NotificationPreference) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handleChannelToggle = (channel: keyof typeof deliveryChannels) => {
    setDeliveryChannels(prev => ({ ...prev, [channel]: !prev[channel] }))
  }

  return (
    <div className="space-y-4">
      {/* Notification Types */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-emerald-600" />
            Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { key: "transactionAlerts", label: "Transaction Alerts", desc: "Get notified when you send or receive money" },
            { key: "loanUpdates", label: "Loan Updates", desc: "Updates about your loans and repayment status" },
            { key: "promotions", label: "Promotions & Offers", desc: "Exclusive deals and promotional messages" },
            { key: "securityAlerts", label: "Security Alerts", desc: "Critical security updates and warnings" },
            { key: "marketAlerts", label: "Market Alerts", desc: "Price alerts for your watched assets" }
          ].map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
              <div className="flex-1">
                <p className="font-medium text-slate-900">{label}</p>
                <p className="text-sm text-slate-600">{desc}</p>
              </div>
              <input
                type="checkbox"
                checked={preferences[key as keyof NotificationPreference]}
                onChange={() => handleToggle(key as keyof NotificationPreference)}
                className="w-5 h-5 rounded border-slate-300 text-emerald-600 focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Delivery Channels */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-emerald-600" />
            Delivery Channels
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { key: "email", label: "Email", icon: Mail, desc: "Receive notifications via email" },
            { key: "sms", label: "SMS", icon: MessageSquare, desc: "Receive notifications via text message" },
            { key: "push", label: "Push Notifications", icon: Smartphone, desc: "Get app push notifications" }
          ].map(({ key, label, icon: Icon, desc }) => (
            <div key={key} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
              <div className="flex items-center gap-3 flex-1">
                <Icon className="w-5 h-5 text-slate-400" />
                <div>
                  <p className="font-medium text-slate-900">{label}</p>
                  <p className="text-sm text-slate-600">{desc}</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={deliveryChannels[key as keyof typeof deliveryChannels]}
                onChange={() => handleChannelToggle(key as keyof typeof deliveryChannels)}
                className="w-5 h-5 rounded border-slate-300 text-emerald-600 focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
