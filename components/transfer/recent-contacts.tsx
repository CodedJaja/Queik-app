"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User } from 'lucide-react'

const RECENT_CONTACTS = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", country: "UK" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", country: "Canada" },
  { id: 3, name: "Maria Garcia", email: "maria@example.com", country: "Spain" },
]

export default function TransferRecentContacts() {
  return (
    <Card className="border-0 shadow-sm font-sans">
      <CardHeader>
        <CardTitle className="text-base">Recent Contacts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {RECENT_CONTACTS.map((contact) => (
            <button
              key={contact.id}
              className="w-full flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg transition-colors text-left"
            >
              <div className="w-9 h-9 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="min-w-0">
                <p className="font-medium text-slate-900 text-sm">{contact.name}</p>
                <p className="text-xs text-slate-600 truncate">{contact.country}</p>
              </div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
