"use client"

import { useState } from "react"
import { ArrowUpRight, ArrowDownLeft, TrendingUp, Search, Filter, ChevronDown } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import TradingChart from "@/components/trading/trading-chart"
import BuySellModal from "@/components/trading/buy-sell-modal"
import WatchlistSection from "@/components/trading/watchlist-section"

const ASSETS = [
  { id: 1, symbol: "BTC", name: "Bitcoin", price: 42350.50, change: 5.2, marketCap: "$830B" },
  { id: 2, symbol: "ETH", name: "Ethereum", price: 2245.80, change: 3.1, marketCap: "$270B" },
  { id: 3, symbol: "AAPL", name: "Apple Inc.", price: 189.95, change: 2.1, marketCap: "$2.8T" },
  { id: 4, symbol: "GOOGL", name: "Alphabet Inc.", price: 140.25, change: 1.8, marketCap: "$1.9T" },
  { id: 5, symbol: "MSFT", name: "Microsoft", price: 425.10, change: 2.5, marketCap: "$3.2T" },
  { id: 6, symbol: "GOLD", name: "Gold Spot", price: 2045.30, change: 0.8, marketCap: "-" },
  { id: 7, symbol: "EUR/USD", name: "Euro/US Dollar", price: 1.0920, change: -0.3, marketCap: "-" },
  { id: 8, symbol: "XRP", name: "Ripple", price: 2.45, change: 4.5, marketCap: "$130B" },
]

export default function TradingPage() {
  const [selectedAsset, setSelectedAsset] = useState(ASSETS[0])
  const [searchTerm, setSearchTerm] = useState("")
  const [showBuySellModal, setShowBuySellModal] = useState(false)
  const [tradeType, setTradeType] = useState<"buy" | "sell">("buy")

  const filteredAssets = ASSETS.filter(asset =>
    asset.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleBuySell = (type: "buy" | "sell") => {
    setTradeType(type)
    setShowBuySellModal(true)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6 font-sans">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Trading</h1>
          <p className="text-slate-600">Buy and sell crypto, stocks, commodities, and forex globally</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Trading Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Asset Chart and Info */}
            <Card className="border-0 shadow-sm hover-lift">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <span className="text-emerald-600 font-bold text-sm">{selectedAsset.symbol[0]}</span>
                      </div>
                      <div>
                        <CardTitle className="text-xl">{selectedAsset.name}</CardTitle>
                        <p className="text-sm text-slate-600">{selectedAsset.symbol}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-slate-900">${selectedAsset.price.toFixed(2)}</p>
                    <p className={`text-sm font-medium ${selectedAsset.change >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                      {selectedAsset.change >= 0 ? '+' : ''}{selectedAsset.change}%
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <TradingChart asset={selectedAsset} />
              </CardContent>
            </Card>

            {/* Trade Buttons */}
            <div className="flex gap-4 font-sans">
              <Button
                onClick={() => handleBuySell("buy")}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white h-12 rounded-lg transition-smooth"
              >
                <ArrowDownLeft className="w-5 h-5 mr-2" />
                Buy {selectedAsset.symbol}
              </Button>
              <Button
                onClick={() => handleBuySell("sell")}
                className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-900 h-12 rounded-lg transition-smooth"
              >
                <ArrowUpRight className="w-5 h-5 mr-2" />
                Sell {selectedAsset.symbol}
              </Button>
            </div>

            {/* Watch List */}
            <WatchlistSection />
          </div>

          {/* Asset List Sidebar */}
          <div className="space-y-4">
            {/* Search and Filter */}
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <Input
                  placeholder="Search assets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 bg-white border-slate-200"
                />
              </div>
              <Button variant="outline" size="icon" className="border-slate-200">
                <Filter className="w-4 h-4" />
              </Button>
            </div>

            {/* Assets List */}
            <Card className="border-0 shadow-sm font-sans">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Top Assets</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-slate-100">
                  {filteredAssets.map((asset) => (
                    <button
                      key={asset.id}
                      onClick={() => setSelectedAsset(asset)}
                      className={`w-full p-4 text-left hover:bg-slate-50 transition-colors ${
                        selectedAsset.id === asset.id ? 'bg-emerald-50' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-slate-900">{asset.symbol}</p>
                          <p className="text-xs text-slate-600">{asset.name}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-slate-900">${asset.price.toFixed(2)}</p>
                          <p className={`text-xs font-medium ${asset.change >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                            {asset.change >= 0 ? '+' : ''}{asset.change}%
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Buy/Sell Modal */}
      <BuySellModal
        isOpen={showBuySellModal}
        onClose={() => setShowBuySellModal(false)}
        asset={selectedAsset}
        tradeType={tradeType}
      />
    </main>
  )
}
