"use client"

import { useState, useEffect } from "react"
import { Wallet, CreditCard, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownLeft, Plus, Minus, Eye, EyeOff, AlertCircle, CheckCircle, Clock } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import WalletHeader from "@/components/wallet/wallet-header"
import QuickActions from "@/components/wallet/quick-actions"
import TransactionHistory from "@/components/wallet/transaction-history"
import BankAccountsSection from "@/components/wallet/bank-accounts-section"
import KYCStatusSection from "@/components/wallet/kyc-status-section"

export default function WalletPage() {
  const [loading, setLoading] = useState(true)
  const [walletData, setWalletData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setWalletData({
        balance: 15750.50,
        creditBalance: 5000.00,
        inflow: 45230.00,
        outflow: 22000.00,
        isBalanceVisible: true,
      })
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="h-10 bg-slate-200 rounded skeleton w-32"></div>
          <div className="h-48 bg-slate-200 rounded skeleton"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <Alert className="border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              {error}
            </AlertDescription>
          </Alert>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          <div className="flex items-center gap-3 mb-2">
            <Wallet className="h-8 w-8 text-emerald-600" />
            <h1 className="text-3xl font-bold text-slate-900">Wallet</h1>
          </div>
          <p className="text-slate-600">Manage your funds, view transactions, and control your accounts</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8">
        {/* Low Balance Warning */}
        {walletData?.balance < 1000 && (
          <Alert className="border-yellow-200 bg-yellow-50">
            <AlertCircle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-800">
              Your wallet balance is low. Top up your wallet to continue transactions.
            </AlertDescription>
          </Alert>
        )}

        {/* Wallet Summary Header */}
        <WalletHeader walletData={walletData} />

        {/* Quick Actions */}
        <QuickActions />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Transaction History */}
          <div className="lg:col-span-2">
            <TransactionHistory />
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Bank Accounts */}
            <BankAccountsSection />

            {/* KYC Status */}
            <KYCStatusSection />
          </div>
        </div>
      </div>
    </div>
  )
}
