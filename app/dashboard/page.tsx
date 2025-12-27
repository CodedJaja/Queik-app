"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, Send, Plus, Eye, EyeOff, ArrowUpRight, ArrowDownLeft, Globe, Lock } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  const { data: wallet } = await supabase
    .from("wallets")
    .select("*")
    .eq("user_id", user.id)
    .eq("currency", "USD")
    .single()

  const { data: transactions } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(5)

  // Map database transactions to UI format
  const recentTransactions =
    transactions?.map((tx) => ({
      id: tx.id,
      type: tx.type,
      description: tx.description,
      amount: `${tx.type === "deposit" || tx.type === "transfer_received" ? "+" : "-"}$${tx.amount}`,
      date: new Date(tx.created_at).toLocaleDateString(),
      status: tx.status,
    })) || []

  // Mock chart data for now based on current date
  const chartData = [
    { date: "Mon", balance: (wallet?.balance || 0) * 0.9, received: 1000 },
    { date: "Tue", balance: (wallet?.balance || 0) * 0.95, received: 800 },
    { date: "Wed", balance: (wallet?.balance || 0) * 0.92, received: 600 },
    { date: "Thu", balance: (wallet?.balance || 0) * 0.98, received: 1200 },
    { date: "Fri", balance: (wallet?.balance || 0) * 1.05, received: 900 },
    { date: "Sat", balance: (wallet?.balance || 0) * 1.02, received: 500 },
    { date: "Sun", balance: wallet?.balance || 0, received: 400 },
  ]

  const stats = [
    {
      label: "USD Balance",
      value: new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(wallet?.balance || 0),
      change: "+$234.50",
      positive: true,
      icon: "💰",
    },
    { label: "Received This Month", value: "$8,500", change: "+12 transactions", positive: true, icon: "📥" },
    { label: "Sent This Month", value: "$3,200", change: "-8 transactions", positive: true, icon: "📤" },
    { label: "Pending Transfers", value: "2", change: "Awaiting confirmation", positive: false, icon: "⏳" },
  ]

  const [showBalance, setShowBalance] = useState(true)

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="animate-slide-down">
        <h1 className="text-3xl font-bold text-slate-900">USD Wallet Dashboard</h1>
        <p className="text-slate-600 mt-2">Send and receive money globally with competitive rates</p>
      </div>

      {/* Main Balance Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="bg-gradient-to-br from-emerald-600 to-emerald-700 border-0 text-white">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-emerald-100 text-sm mb-2">Total USD Balance</p>
                    <h2 className="text-4xl font-bold tracking-tight">{showBalance ? stats[0].value : "••••••"}</h2>
                  </div>
                  <button
                    onClick={() => setShowBalance(!showBalance)}
                    className="p-2 hover:bg-emerald-500/30 rounded-lg transition-colors"
                  >
                    {showBalance ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Link href="/dashboard/wallet/add-money" className="flex-1">
                    <Button className="w-full bg-white text-emerald-600 hover:bg-emerald-50 font-semibold">
                      <Plus className="w-4 h-4 mr-2" /> Add Money
                    </Button>
                  </Link>
                  <Link href="/dashboard/wallet/send" className="flex-1">
                    <Button className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-semibold">
                      <Send className="w-4 h-4 mr-2" /> Send
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Account Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">KYC Status</span>
                <span className="text-green-600 font-semibold flex items-center gap-1">
                  <Lock className="w-4 h-4" /> Verified
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">2FA Status</span>
                <span className="text-green-600 font-semibold">Enabled</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Daily Limit</span>
                <span className="font-semibold">$10,000</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="animate-slide-up" style={{ animation: `slideUp 0.5s ease-out ${i * 50}ms both` }}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <span className="text-2xl">{stat.icon}</span>
              </div>
              <p className="text-slate-600 text-sm font-medium mb-2">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">{stat.value}</h3>
              <p className={`text-sm font-medium ${stat.positive ? "text-emerald-600" : "text-slate-600"}`}>
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Balance Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Balance Trend</CardTitle>
            <CardDescription>Last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="balance"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ fill: "#10b981", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Received Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Money Received</CardTitle>
            <CardDescription>Last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="received" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your latest activity</CardDescription>
            </div>
            <Link href="/dashboard/wallet/transactions">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTransactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      tx.type === "received" || tx.type === "conversion" ? "bg-emerald-50" : "bg-slate-100"
                    }`}
                  >
                    {tx.type === "received" && <ArrowDownLeft className="w-5 h-5 text-emerald-600" />}
                    {tx.type === "sent" && <ArrowUpRight className="w-5 h-5 text-slate-600" />}
                    {tx.type === "converted" && <TrendingUp className="w-5 h-5 text-emerald-600" />}
                    {tx.type === "withdrawal" && <Globe className="w-5 h-5 text-slate-600" />}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{tx.description}</p>
                    <p className="text-sm text-slate-600">{tx.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${tx.amount.includes("+") ? "text-emerald-600" : "text-slate-900"}`}>
                    {tx.amount}
                  </p>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      tx.status === "completed" ? "bg-green-50 text-green-600" : "bg-amber-50 text-amber-600"
                    }`}
                  >
                    {tx.status === "completed" ? "Completed" : "Pending"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link href="/dashboard/wallet/add-money">
          <Card className="hover:border-emerald-500 transition-colors cursor-pointer h-full">
            <CardContent className="p-6 flex flex-col items-center text-center gap-3">
              <div className="text-3xl">💳</div>
              <h3 className="font-semibold text-slate-900">Add Money</h3>
              <p className="text-sm text-slate-600">Deposit via card, bank, or crypto</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/wallet/send">
          <Card className="hover:border-emerald-500 transition-colors cursor-pointer h-full">
            <CardContent className="p-6 flex flex-col items-center text-center gap-3">
              <div className="text-3xl">🌍</div>
              <h3 className="font-semibold text-slate-900">Send Money</h3>
              <p className="text-sm text-slate-600">Send USD globally instantly</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/wallet/convert">
          <Card className="hover:border-emerald-500 transition-colors cursor-pointer h-full">
            <CardContent className="p-6 flex flex-col items-center text-center gap-3">
              <div className="text-3xl">💱</div>
              <h3 className="font-semibold text-slate-900">Convert</h3>
              <p className="text-sm text-slate-600">Real-time FX rates</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/wallet/withdraw">
          <Card className="hover:border-emerald-500 transition-colors cursor-pointer h-full">
            <CardContent className="p-6 flex flex-col items-center text-center gap-3">
              <div className="text-3xl">🏦</div>
              <h3 className="font-semibold text-slate-900">Withdraw</h3>
              <p className="text-sm text-slate-600">To local bank accounts</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}
