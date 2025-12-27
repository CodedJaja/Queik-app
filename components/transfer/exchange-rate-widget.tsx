"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp } from 'lucide-react'

export default function ExchangeRateWidget({ fromCurrency, toCurrency }: { fromCurrency: string; toCurrency: string }) {
  const rates: { [key: string]: number } = {
    "USD": 1.0,
    "EUR": 0.92,
    "GBP": 0.79,
    "JPY": 149.50,
    "AUD": 1.52,
    "CAD": 1.36,
    "INR": 83.12,
    "MXN": 20.50,
  }

  const rate = (rates[toCurrency] || 1) / (rates[fromCurrency] || 1)

  return (
    <Card className="border-0 shadow-sm font-sans">
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-600" />
          Exchange Rate
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="bg-gradient-to-r from-emerald-50 to-slate-50 rounded-lg p-4">
            <p className="text-sm text-slate-600 mb-2">
              1 {fromCurrency} = {rate.toFixed(4)} {toCurrency}
            </p>
            <p className="text-xs text-slate-600">Updated just now</p>
          </div>
          <div className="text-xs text-slate-600">
            <p>Mid-market rate</p>
            <p className="text-emerald-600 font-medium">Lower fees than banks</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
