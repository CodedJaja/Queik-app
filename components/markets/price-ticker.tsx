"use client"

import { TrendingUp, TrendingDown } from "lucide-react"

interface PriceTickerProps {
  symbol: string
  price: number
  change: number
  changePercent: number
}

export default function PriceTicker({ symbol, price, change, changePercent }: PriceTickerProps) {
  const isPositive = change >= 0

  return (
    <div className="flex items-center gap-2 animate-fade-in">
      <div>
        <p className="text-sm font-medium text-slate-600">{symbol}</p>
        <p className="text-2xl font-bold text-slate-900">${price.toFixed(2)}</p>
      </div>
      <div
        className={`flex items-center gap-1 px-2 py-1 rounded-full ${
          isPositive ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
        }`}
      >
        {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
        <span className="text-sm font-medium">
          {isPositive ? "+" : ""}
          {change.toFixed(2)} ({changePercent.toFixed(2)}%)
        </span>
      </div>
    </div>
  )
}
