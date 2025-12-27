"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, TrendingUp } from 'lucide-react'

const WATCHLIST = [
  { id: 1, symbol: "BTC", name: "Bitcoin", price: 42350.50, change: 5.2, favorite: true },
  { id: 2, symbol: "ETH", name: "Ethereum", price: 2245.80, change: 3.1, favorite: true },
  { id: 3, symbol: "SOL", name: "Solana", price: 195.45, change: 8.3, favorite: false },
]

export default function WatchlistSection() {
  return (
    <Card className="border-0 shadow-sm font-sans">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Star className="w-5 h-5 text-emerald-600" />
          My Watchlist
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {WATCHLIST.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <div>
                <p className="font-semibold text-slate-900">{item.symbol}</p>
                <p className="text-xs text-slate-600">{item.name}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-slate-900">${item.price.toFixed(2)}</p>
                <p className="text-xs font-medium text-emerald-600 flex items-center justify-end gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +{item.change}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
