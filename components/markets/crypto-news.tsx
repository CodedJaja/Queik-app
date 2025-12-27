"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const NEWS_ITEMS = [
  { id: 1, title: "Bitcoin Reaches New High", date: "2 hours ago" },
  { id: 2, title: "Ethereum Upgrade Announced", date: "4 hours ago" },
  { id: 3, title: "Fed Signals Rate Pause", date: "1 day ago" },
]

export default function CryptoNews() {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-base">Market News</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {NEWS_ITEMS.map((news) => (
          <div key={news.id} className="pb-3 border-b border-slate-200 last:border-0 hover:bg-slate-50 p-2 rounded cursor-pointer transition-colors">
            <p className="font-medium text-slate-900 text-sm">{news.title}</p>
            <p className="text-xs text-slate-600">{news.date}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
