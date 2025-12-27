"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRightLeft, TrendingUp, Clock, Info } from "lucide-react"

interface ExchangeRate {
  from: string
  to: string
  rate: number
  timestamp: number
}

const currencies = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "NGN", name: "Nigerian Naira", symbol: "₦" },
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
  { code: "GHS", name: "Ghanaian Cedi", symbol: "GHS" },
  { code: "KES", name: "Kenyan Shilling", symbol: "KES" },
  { code: "USDT", name: "Tether (USDT)", symbol: "USDT" },
  { code: "USDC", name: "USD Coin (USDC)", symbol: "USDC" },
]

export default function ConvertPage() {
  const [fromCurrency, setFromCurrency] = useState("USD")
  const [toCurrency, setToCurrency] = useState("NGN")
  const [fromAmount, setFromAmount] = useState("1000")
  const [exchangeRate, setExchangeRate] = useState(1500.5)
  const [fee, setFee] = useState(0)
  const [loading, setLoading] = useState(false)
  const [rateUpdated, setRateUpdated] = useState(new Date())

  useEffect(() => {
    // Fetch live exchange rates
    const fetchRates = async () => {
      setLoading(true)
      try {
        const response = await fetch(`/api/fx/rates?from=${fromCurrency}&to=${toCurrency}`)
        const data = await response.json()
        setExchangeRate(data.rate)
        setRateUpdated(new Date())
      } finally {
        setLoading(false)
      }
    }

    fetchRates()
  }, [fromCurrency, toCurrency])

  const toAmount = Number.parseFloat(fromAmount) * exchangeRate - fee

  const handleSwap = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  const handleConvert = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/fx/convert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fromCurrency,
          toCurrency,
          amount: Number.parseFloat(fromAmount),
        }),
      })
      // TODO: Handle response and execute conversion
    } finally {
      setLoading(false)
    }
  }

  const fromSymbol = currencies.find((c) => c.code === fromCurrency)?.symbol || "$"
  const toSymbol = currencies.find((c) => c.code === toCurrency)?.symbol || "$"

  return (
    <div className="space-y-6 font-sans">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Currency Converter</h1>
        <p className="text-slate-600">Convert between USD and 150+ currencies instantly</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Converter */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Live Exchange Rates</CardTitle>
              <CardDescription className="flex items-center gap-2 mt-2">
                <Clock className="w-4 h-4" />
                Last updated: {rateUpdated.toLocaleTimeString()}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* From Currency */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold">From</Label>
                <div className="flex gap-2">
                  <Select value={fromCurrency} onValueChange={setFromCurrency}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((curr) => (
                        <SelectItem key={curr.code} value={curr.code}>
                          {curr.code}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    type="number"
                    value={fromAmount}
                    onChange={(e) => setFromAmount(e.target.value)}
                    placeholder="0.00"
                    className="flex-1 text-lg"
                  />
                </div>
                <p className="text-xs text-slate-600">
                  {fromSymbol}
                  {Number.parseFloat(fromAmount).toLocaleString()} {fromCurrency}
                </p>
              </div>

              {/* Swap Button */}
              <button
                onClick={handleSwap}
                className="w-full py-2 bg-gradient-to-r from-slate-100 to-slate-50 hover:from-slate-200 hover:to-slate-100 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <ArrowRightLeft className="w-4 h-4" />
                Swap
              </button>

              {/* To Currency */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold">To</Label>
                <div className="flex gap-2">
                  <Select value={toCurrency} onValueChange={setToCurrency}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((curr) => (
                        <SelectItem key={curr.code} value={curr.code}>
                          {curr.code}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="flex-1 bg-slate-50 rounded-lg p-3 flex items-center">
                    <span className="text-lg font-semibold text-slate-900">
                      {toSymbol}
                      {toAmount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-600">
                  {toSymbol}
                  {toAmount.toLocaleString()} {toCurrency}
                </p>
              </div>

              {/* Rate Info */}
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-4 rounded-lg space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Exchange Rate</span>
                  <span className="font-semibold">
                    1 {fromCurrency} = {exchangeRate.toLocaleString()} {toCurrency}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Conversion Fee</span>
                  <span className="font-semibold">${fee.toFixed(2)} (0%)</span>
                </div>
                <div className="border-t pt-3 flex justify-between">
                  <span className="font-semibold text-slate-900">You'll Receive</span>
                  <span className="font-bold text-emerald-600 text-lg">
                    {toSymbol}
                    {toAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              <Button
                onClick={handleConvert}
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-lg py-6"
              >
                {loading ? "Converting..." : "Convert Now"}
              </Button>
            </CardContent>
          </Card>

          {/* Conversion History */}
          <Card>
            <CardHeader>
              <CardTitle>Conversion History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { from: "$1,000", to: "₦1,500,500", date: "Today at 2:30 PM", status: "Completed" },
                  { from: "$500", to: "₦750,250", date: "Yesterday at 10:15 AM", status: "Completed" },
                  { from: "$2,000", to: "₦3,001,000", date: "2 days ago", status: "Completed" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:bg-slate-50"
                  >
                    <div>
                      <p className="font-semibold text-slate-900">
                        {item.from} → {item.to}
                      </p>
                      <p className="text-sm text-slate-600">{item.date}</p>
                    </div>
                    <span className="text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Market Rates */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingUp className="w-4 h-4" /> Market Rates
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { pair: "USD → NGN", rate: "1,500.50" },
                { pair: "USD → INR", rate: "83.40" },
                { pair: "USD → GHS", rate: "13.50" },
              ].map((item) => (
                <div key={item.pair} className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">{item.pair}</span>
                  <span className="font-semibold text-slate-900">{item.rate}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Info */}
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-base text-blue-900 flex items-center gap-2">
                <Info className="w-4 h-4" /> Why Use Our Converter?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-blue-900">
              <p>✓ Real-time market rates</p>
              <p>✓ 0% conversion fees</p>
              <p>✓ 150+ currencies</p>
              <p>✓ Instant conversion</p>
            </CardContent>
          </Card>

          {/* Limits */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Daily Limits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Used Today</span>
                <span className="font-semibold">$3,500 / $10,000</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: "35%" }} />
              </div>
              <p className="text-xs text-slate-600 mt-2">$6,500 remaining today</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
