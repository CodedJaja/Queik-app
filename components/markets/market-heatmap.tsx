"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const HEATMAP_DATA = [
  { name: "Bitcoin", size: 150, change: 5.2, color: "bg-emerald-500" },
  { name: "Ethereum", size: 100, change: 3.1, color: "bg-emerald-400" },
  { name: "Solana", size: 45, change: 8.3, color: "bg-emerald-600" },
  { name: "XRP", size: 38, change: 4.5, color: "bg-emerald-400" },
  { name: "Cardano", size: 32, change: 2.8, color: "bg-emerald-300" },
  { name: "Dogecoin", size: 28, change: -2.1, color: "bg-red-400" },
]

export default function MarketHeatmap() {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle>Market Heatmap</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {HEATMAP_DATA.map((item) => (
            <div
              key={item.name}
              className={`${item.color} rounded-lg p-4 text-white transition-transform hover:scale-105 cursor-pointer`}
              style={{ minHeight: `${item.size}px` }}
            >
              <p className="font-semibold text-sm">{item.name}</p>
              <p className="text-xs opacity-90 mt-2">{item.change >= 0 ? '+' : ''}{item.change}%</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
