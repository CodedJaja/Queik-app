"use client"

import { useState } from "react"
import { Eye, EyeOff, ArrowUpRight, ArrowDownLeft, Plus, Minus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface WalletData {
  balance: number
  creditBalance: number
  inflow: number
  outflow: number
  isBalanceVisible: boolean
}

export default function WalletHeader({ walletData }: { walletData: WalletData }) {
  const [showBalance, setShowBalance] = useState(true)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      {/* Main Balance Card */}
      <Card className="bg-gradient-to-br from-slate-900 to-slate-800 text-white border-0 p-8 animate-slide-up">
        <div className="flex justify-between items-start mb-12">
          <div>
            <p className="text-slate-300 text-sm font-medium mb-2">Total Balance</p>
            <div className="flex items-center gap-3">
              <h2 className="text-4xl font-bold">
                {showBalance ? formatCurrency(walletData.balance) : "••••••"}
              </h2>
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="p-2 hover:bg-slate-700 rounded-lg transition-smooth"
              >
                {showBalance ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
          <div className="text-right">
            <p className="text-slate-300 text-sm font-medium mb-2">Credit Balance</p>
            <p className="text-2xl font-bold">{formatCurrency(walletData.creditBalance)}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button className="bg-emerald-500 hover:bg-emerald-600 text-white gap-2">
            <Plus className="h-4 w-4" />
            Top Up
          </Button>
          <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-700 gap-2">
            <Minus className="h-4 w-4" />
            Withdraw
          </Button>
        </div>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-6 hover-lift">
          <div className="flex items-center justify-between mb-2">
            <p className="text-slate-600 text-sm font-medium">Total Inflow</p>
            <ArrowDownLeft className="h-5 w-5 text-emerald-500" />
          </div>
          <p className="text-2xl font-bold text-slate-900">{formatCurrency(walletData.inflow)}</p>
          <p className="text-xs text-slate-500 mt-1">This month</p>
        </Card>

        <Card className="p-6 hover-lift">
          <div className="flex items-center justify-between mb-2">
            <p className="text-slate-600 text-sm font-medium">Total Outflow</p>
            <ArrowUpRight className="h-5 w-5 text-red-500" />
          </div>
          <p className="text-2xl font-bold text-slate-900">{formatCurrency(walletData.outflow)}</p>
          <p className="text-xs text-slate-500 mt-1">This month</p>
        </Card>

        <Card className="p-6 hover-lift">
          <div className="flex items-center justify-between mb-2">
            <p className="text-slate-600 text-sm font-medium">Net Flow</p>
            <TrendingUp className="h-5 w-5 text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-slate-900">
            {formatCurrency(walletData.inflow - walletData.outflow)}
          </p>
          <p className="text-xs text-slate-500 mt-1">This month</p>
        </Card>

        <Card className="p-6 hover-lift">
          <div className="flex items-center justify-between mb-2">
            <p className="text-slate-600 text-sm font-medium">Available</p>
            <span className="h-3 w-3 bg-emerald-500 rounded-full"></span>
          </div>
          <p className="text-2xl font-bold text-slate-900">
            {formatCurrency(walletData.balance + walletData.creditBalance)}
          </p>
          <p className="text-xs text-slate-500 mt-1">Balance + Credit</p>
        </Card>
      </div>
    </div>
  )
}
