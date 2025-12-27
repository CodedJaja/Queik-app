"use client"

import { useState, useEffect } from "react"
import { X, AlertCircle } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface BuySellModalProps {
  isOpen: boolean
  onClose: () => void
  tradeType: "buy" | "sell"
  assetId: string      // CoinGecko ID, e.g., 'bitcoin', 'ethereum'
  assetSymbol: string  // Display symbol, e.g., 'BTC', 'ETH'
}

export default function BuySellModal({
  isOpen,
  onClose,
  tradeType,
  assetId,
  assetSymbol,
}: BuySellModalProps) {
  const [amount, setAmount] = useState("")
  const [quantity, setQuantity] = useState("")
  const [price, setPrice] = useState(0)
  const [loading, setLoading] = useState(true)

  // Fetch live price from CoinGecko
  useEffect(() => {
    async function fetchPrice() {
      try {
        setLoading(true)
        const res = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${assetId}&vs_currencies=usd`
        )
        const data = await res.json()
        setPrice(data[assetId]?.usd ?? 0)
      } catch (error) {
        console.error("Error fetching price:", error)
      } finally {
        setLoading(false)
      }
    }

    if (isOpen) {
      fetchPrice()
      const interval = setInterval(fetchPrice, 10000) // refresh every 10s
      return () => clearInterval(interval)
    }
  }, [isOpen, assetId])

  // Update quantity automatically
  useEffect(() => {
    if (price && amount) {
      setQuantity((parseFloat(amount) / price).toFixed(6))
    } else {
      setQuantity("")
    }
  }, [amount, price])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md border-0 shadow-xl">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-slate-900">
              {tradeType === "buy" ? "Buy" : "Sell"} {assetSymbol}
            </h2>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Current Price Info */}
          <div className="bg-slate-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-slate-600 mb-1">Current Price</p>
            <p className="text-2xl font-bold text-slate-900">
              {loading ? "Loading..." : `$${price.toFixed(2)}`}
            </p>
          </div>

          {/* Amount Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Amount (USD)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-slate-400">$</span>
              <Input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-7 bg-white border-slate-200"
              />
            </div>
          </div>

          {/* Quantity Display */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Quantity ({assetSymbol})
            </label>
            <div className="bg-slate-100 rounded-lg p-3">
              <p className="font-semibold text-slate-900">{quantity || "0.000000"}</p>
            </div>
          </div>

          {/* Fees Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-900">Trading Fee</p>
              <p className="text-sm text-blue-700">0.5% applied at checkout</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button onClick={onClose} variant="outline" className="flex-1 border-slate-200">
              Cancel
            </Button>
            <Button
              onClick={onClose}
              className={`flex-1 text-white ${
                tradeType === "buy"
                  ? "bg-emerald-600 hover:bg-emerald-700"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              {tradeType === "buy" ? "Buy Now" : "Sell Now"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
