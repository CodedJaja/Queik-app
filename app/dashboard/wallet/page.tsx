"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Eye, EyeOff, Send, Plus, TrendingUp } from "lucide-react"
import Link from "next/link"

interface WalletData {
  balance: number
  currency: string
  accountNumber: string
  routingNumber: string
  swiftCode: string
  accountHolder: string
  bankName: string
}

const mockWallet: WalletData = {
  balance: 5342.5,
  currency: "USD",
  accountNumber: "1234567890",
  routingNumber: "021000021",
  swiftCode: "CHASUS33",
  accountHolder: "John Doe",
  bankName: "Chase Bank",
}

export default function WalletPage() {
  const [showBalance, setShowBalance] = useState(true)
  const [showAccountDetails, setShowAccountDetails] = useState(false)
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">USD Wallet</h1>
        <p className="text-slate-600">Send and receive USD globally</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Wallet Card */}
        <div className="lg:col-span-2">
          <Card className="bg-gradient-to-br from-emerald-600 to-emerald-700 border-0 text-white">
            <CardContent className="p-8">
              <div className="space-y-8">
                {/* Balance Section */}
                <div>
                  <p className="text-emerald-100 text-sm mb-2">Total Balance</p>
                  <div className="flex items-center justify-between">
                    <h2 className="text-4xl font-bold tracking-tight">
                      {showBalance ? `$${mockWallet.balance.toFixed(2)}` : "••••••"}
                    </h2>
                    <button
                      onClick={() => setShowBalance(!showBalance)}
                      className="p-2 hover:bg-emerald-500/30 rounded-lg transition-colors"
                    >
                      {showBalance ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Account Details */}
                <div className="space-y-3 pt-6 border-t border-emerald-500/30">
                  <p className="text-emerald-100 text-sm">{mockWallet.bankName}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-emerald-100 text-xs">Account Number</p>
                      <p className="text-sm font-mono mt-1">{mockWallet.accountNumber}</p>
                    </div>
                    <div>
                      <p className="text-emerald-100 text-xs">Routing Number</p>
                      <p className="text-sm font-mono mt-1">{mockWallet.routingNumber}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-3 gap-3 mt-6">
            <Link href="/dashboard/wallet/add-money">
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white" size="lg">
                <Plus className="w-4 h-4 mr-2" /> Add Money
              </Button>
            </Link>
            <Link href="/dashboard/wallet/send">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" size="lg">
                <Send className="w-4 h-4 mr-2" /> Send
              </Button>
            </Link>
            <Link href="/dashboard/wallet/convert">
              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white" size="lg">
                <TrendingUp className="w-4 h-4 mr-2" /> Convert
              </Button>
            </Link>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-4">
          {/* Account Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Account Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 text-sm">Verification</span>
                  <span className="text-green-600 font-semibold text-sm">Verified</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 text-sm">2FA Status</span>
                  <span className="text-green-600 font-semibold text-sm">Enabled</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 text-sm">Daily Limit</span>
                  <span className="text-slate-900 font-semibold text-sm">$10,000</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Virtual Account Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Virtual Account</CardTitle>
              <CardDescription className="text-xs">US Bank Account Details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: "Account Number", value: mockWallet.accountNumber },
                { label: "Routing", value: mockWallet.routingNumber },
                { label: "SWIFT", value: mockWallet.swiftCode },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-slate-600 text-xs mb-1">{item.label}</p>
                  <div className="flex items-center justify-between bg-slate-100 rounded p-2">
                    <span className="text-sm font-mono text-slate-900">{item.value}</span>
                    <button
                      onClick={() => handleCopy(item.value, item.label)}
                      className="text-slate-600 hover:text-slate-900"
                    >
                      {copiedField === item.label ? (
                        <span className="text-xs text-green-600">Copied</span>
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
              <Button className="w-full mt-4 bg-slate-200 text-slate-900 hover:bg-slate-300 text-sm">
                Share Account
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Transactions Section */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { type: "Received", amount: "+$500.00", date: "Today", status: "Completed", icon: "📥" },
              { type: "Sent", amount: "-$200.00", date: "Yesterday", status: "Completed", icon: "📤" },
              { type: "Withdrawal", amount: "-$1,000.00", date: "2 days ago", status: "Pending", icon: "💳" },
            ].map((tx, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{tx.icon}</span>
                  <div>
                    <p className="font-semibold text-slate-900">{tx.type}</p>
                    <p className="text-sm text-slate-600">{tx.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${tx.amount.includes("+") ? "text-green-600" : "text-slate-900"}`}>
                    {tx.amount}
                  </p>
                  <p className="text-xs text-slate-600">{tx.status}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
