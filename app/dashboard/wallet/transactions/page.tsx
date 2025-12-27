"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowUpRight, ArrowDownLeft, TrendingUp, Globe, Download, Filter } from "lucide-react"

interface Transaction {
  id: string
  type: "sent" | "received" | "converted" | "withdrawal" | "deposit"
  description: string
  amount: number
  currency: string
  date: string
  status: "completed" | "pending" | "failed"
  reference: string
}

const mockTransactions: Transaction[] = [
  {
    id: "1",
    type: "received",
    description: "Received from John Doe",
    amount: 500,
    currency: "USD",
    date: "2024-11-25T14:30:00",
    status: "completed",
    reference: "RCV-001",
  },
  {
    id: "2",
    type: "sent",
    description: "Sent to Sarah Smith",
    amount: 200,
    currency: "USD",
    date: "2024-11-24T10:15:00",
    status: "completed",
    reference: "SND-001",
  },
  {
    id: "3",
    type: "converted",
    description: "USD to NGN Conversion",
    amount: 1000,
    currency: "USD",
    date: "2024-11-23T09:45:00",
    status: "completed",
    reference: "CVT-001",
  },
  {
    id: "4",
    type: "deposit",
    description: "Card deposit via Stripe",
    amount: 2000,
    currency: "USD",
    date: "2024-11-22T16:20:00",
    status: "completed",
    reference: "DEP-001",
  },
  {
    id: "5",
    type: "withdrawal",
    description: "Withdrawal to First Bank NGN",
    amount: 1500,
    currency: "USD",
    date: "2024-11-21T11:00:00",
    status: "pending",
    reference: "WD-001",
  },
]

export default function TransactionsPage() {
  const [filter, setFilter] = useState("all")
  const [search, setSearch] = useState("")
  const [sortBy, setSortBy] = useState("date")

  const filteredTransactions = mockTransactions.filter((tx) => {
    const matchesFilter = filter === "all" || tx.type === filter
    const matchesSearch = tx.description.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "received":
        return <ArrowDownLeft className="w-5 h-5 text-emerald-600" />
      case "sent":
        return <ArrowUpRight className="w-5 h-5 text-slate-600" />
      case "converted":
        return <TrendingUp className="w-5 h-5 text-emerald-600" />
      case "withdrawal":
        return <Globe className="w-5 h-5 text-slate-600" />
      case "deposit":
        return <ArrowDownLeft className="w-5 h-5 text-emerald-600" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-50 text-green-600"
      case "pending":
        return "bg-amber-50 text-amber-600"
      case "failed":
        return "bg-red-50 text-red-600"
      default:
        return "bg-slate-50 text-slate-600"
    }
  }

  return (
    <div className="space-y-6 font-sans">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Transactions</h1>
        <p className="text-slate-600">View and manage all your transactions</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search transactions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="md:w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="received">Received</SelectItem>
                <SelectItem value="sent">Sent</SelectItem>
                <SelectItem value="deposit">Deposits</SelectItem>
                <SelectItem value="withdrawal">Withdrawals</SelectItem>
                <SelectItem value="converted">Conversions</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Filter className="w-4 h-4" /> More Filters
            </Button>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Download className="w-4 h-4" /> Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="p-4 text-left font-semibold text-slate-900">Description</th>
                  <th className="p-4 text-left font-semibold text-slate-900">Date</th>
                  <th className="p-4 text-left font-semibold text-slate-900">Amount</th>
                  <th className="p-4 text-left font-semibold text-slate-900">Reference</th>
                  <th className="p-4 text-left font-semibold text-slate-900">Status</th>
                  <th className="p-4 text-left font-semibold text-slate-900">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((tx) => (
                  <tr key={tx.id} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                          {getTypeIcon(tx.type)}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{tx.description}</p>
                          <p className="text-xs text-slate-600">{tx.type}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-slate-600">
                      {new Date(tx.date).toLocaleDateString()} {new Date(tx.date).toLocaleTimeString()}
                    </td>
                    <td className="p-4">
                      <span
                        className={`font-semibold ${tx.type === "received" || tx.type === "deposit" ? "text-emerald-600" : "text-slate-900"}`}
                      >
                        {tx.type === "received" || tx.type === "deposit" ? "+" : "-"}${tx.amount.toLocaleString()}
                      </span>
                    </td>
                    <td className="p-4 font-mono text-sm text-slate-600">{tx.reference}</td>
                    <td className="p-4">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(tx.status)}`}>
                        {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                      </span>
                    </td>
                    <td className="p-4">
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-600">Showing {filteredTransactions.length} transactions</p>
        <div className="flex gap-2">
          <Button variant="outline" disabled>
            Previous
          </Button>
          <Button variant="outline">Next</Button>
        </div>
      </div>
    </div>
  )
}
