"use client"

import { useState } from "react"
import { TrendingUp, TrendingDown, Search, Filter, Star, Globe } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import MarketHeatmap from "@/components/markets/market-heatmap"
import CryptoNews from "@/components/markets/crypto-news"
import TopGainers from "@/components/markets/top-gainers"

const MARKET_DATA = [
  { id: 1, symbol: "BTC", name: "Bitcoin", price: 42350, change: 5.2, volume: "28.5B", marketCap: "830B", chart: [41000, 41500, 41200, 41800, 42000, 42200, 42350] },
  { id: 2, symbol: "ETH", name: "Ethereum", price: 2245.80, change: 3.1, volume: "12.3B", marketCap: "270B", chart: [2180, 2200, 2210, 2230, 2240, 2245, 2245.80] },
  { id: 3, symbol: "SOL", name: "Solana", price: 195.45, change: 8.3, volume: "2.1B", marketCap: "89B", chart: [180, 185, 190, 192, 195, 195.45, 195.45] },
  { id: 4, symbol: "XRP", name: "Ripple", price: 2.45, change: 4.5, volume: "3.2B", marketCap: "130B", chart: [2.35, 2.37, 2.40, 2.43, 2.44, 2.45, 2.45] },
  { id: 5, symbol: "DOGE", name: "Dogecoin", price: 0.38, change: -2.1, volume: "1.8B", marketCap: "55B", chart: [0.40, 0.39, 0.39, 0.38, 0.38, 0.38, 0.38] },
  { id: 6, symbol: "ADA", name: "Cardano", price: 1.12, change: 2.8, volume: "0.9B", marketCap: "42B", chart: [1.08, 1.09, 1.10, 1.11, 1.12, 1.12, 1.12] },
]

const MARKET_STATS = [
  { label: "Global Market Cap", value: "$1.82T", change: "+3.2%" },
  { label: "24h Volume", value: "$78.5B", change: "+5.1%" },
  { label: "BTC Dominance", value: "45.8%", change: "+1.2%" },
  { label: "Fear & Greed", value: "72 (Greed)", change: "↑" },
]

export default function MarketsPage() {
  const [selectedAsset, setSelectedAsset] = useState(MARKET_DATA[0])
  const [searchTerm, setSearchTerm] = useState("")
  const [favorites, setFavorites] = useState<number[]>([1, 2])

  const filteredData = MARKET_DATA.filter(asset =>
    asset.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    )
  }

  const topGainers = MARKET_DATA.sort((a, b) => b.change - a.change).slice(0, 3)

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Markets & Crypto</h1>
          <p className="text-slate-600">Real-time market data and crypto analytics</p>
        </div>

        {/* Market Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {MARKET_STATS.map((stat, idx) => (
            <Card key={idx} className="border-0 shadow-sm hover-lift">
              <CardContent className="p-4">
                <p className="text-sm text-slate-600 mb-1">{stat.label}</p>
                <div className="flex items-end justify-between">
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                  <p className="text-sm font-medium text-emerald-600">{stat.change}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Market Heatmap */}
        <MarketHeatmap />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Crypto Table */}
          <div className="lg:col-span-2 space-y-4">
            {/* Search and Filter */}
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <Input
                  placeholder="Search coins..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 bg-white border-slate-200"
                />
              </div>
              <Button variant="outline" size="icon" className="border-slate-200">
                <Filter className="w-4 h-4" />
              </Button>
            </div>

            {/* Crypto Table */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Top Cryptocurrencies</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left p-4 text-xs font-semibold text-slate-600">Coin</th>
                        <th className="text-right p-4 text-xs font-semibold text-slate-600">Price</th>
                        <th className="text-right p-4 text-xs font-semibold text-slate-600">24h Change</th>
                        <th className="text-right p-4 text-xs font-semibold text-slate-600">Volume</th>
                        <th className="text-right p-4 text-xs font-semibold text-slate-600">Market Cap</th>
                        <th className="text-center p-4 text-xs font-semibold text-slate-600">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.map((asset) => (
                        <tr key={asset.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                                <span className="text-xs font-bold text-emerald-600">{asset.symbol[0]}</span>
                              </div>
                              <div>
                                <p className="font-semibold text-slate-900">{asset.symbol}</p>
                                <p className="text-xs text-slate-600">{asset.name}</p>
                              </div>
                            </div>
                          </td>
                          <td className="text-right p-4 font-semibold text-slate-900">${asset.price.toFixed(2)}</td>
                          <td className="text-right p-4">
                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                              asset.change >= 0
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-red-100 text-red-700"
                            }`}>
                              {asset.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                              {asset.change >= 0 ? '+' : ''}{asset.change}%
                            </span>
                          </td>
                          <td className="text-right p-4 text-sm text-slate-600">${asset.volume}</td>
                          <td className="text-right p-4 text-sm text-slate-600">${asset.marketCap}</td>
                          <td className="text-center p-4">
                            <button
                              onClick={() => toggleFavorite(asset.id)}
                              className="text-slate-400 hover:text-emerald-600 transition-colors"
                            >
                              <Star className={`w-4 h-4 ${favorites.includes(asset.id) ? "fill-emerald-600" : ""}`} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Top Gainers */}
            <TopGainers gainers={topGainers} />

            {/* Crypto News */}
            <CryptoNews />
          </div>
        </div>
      </div>
    </main>
  )
}
