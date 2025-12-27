"use client"

import { useState } from "react"
import { ArrowUpRight, ArrowDownLeft, Loader } from 'lucide-react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const mockTransactions = [
  {
    id: 1,
    type: "top-up",
    description: "Bank Transfer",
    amount: 1000.00,
    status: "success",
    date: "Nov 18, 2024",
    time: "10:30 AM",
  },
  {
    id: 2,
    type: "withdrawal",
    description: "Withdrawal to Account",
    amount: 500.00,
    status: "success",
    date: "Nov 17, 2024",
    time: "3:15 PM",
  },
  {
    id: 3,
    type: "credit",
    description: "Credit Purchase",
    amount: 250.50,
    status: "pending",
    date: "Nov 17, 2024",
    time: "2:45 PM",
  },
  {
    id: 4,
    type: "repayment",
    description: "Loan Repayment",
    amount: 2000.00,
    status: "success",
    date: "Nov 16, 2024",
    time: "11:20 AM",
  },
  {
    id: 5,
    type: "top-up",
    description: "Card Refund",
    amount: 150.00,
    status: "success",
    date: "Nov 15, 2024",
    time: "9:10 AM",
  },
]

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState(mockTransactions)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-emerald-50 text-emerald-700"
      case "pending":
        return "bg-yellow-50 text-yellow-700"
      case "failed":
        return "bg-red-50 text-red-700"
      default:
        return "bg-slate-50 text-slate-700"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return "✓"
      case "pending":
        return "..."
      case "failed":
        return "✕"
      default:
        return "•"
    }
  }

  const getTransactionIcon = (type: string) => {
    return type === "top-up" || type === "credit" ? (
      <ArrowDownLeft className="h-5 w-5 text-emerald-500" />
    ) : (
      <ArrowUpRight className="h-5 w-5 text-red-500" />
    )
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-900">Transaction History</h3>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </div>

      <div className="space-y-3">
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-smooth"
          >
            <div className="flex items-center gap-4 flex-1">
              <div className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center">
                {getTransactionIcon(tx.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-slate-900">{tx.description}</p>
                <p className="text-sm text-slate-500">
                  {tx.date} at {tx.time}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-right">
              <div>
                <p className="font-semibold text-slate-900">
                  {tx.type === "top-up" || tx.type === "credit" ? "+" : "-"}
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(tx.amount)}
                </p>
                <div className={`inline-block px-2 py-1 rounded text-xs font-medium ${getStatusColor(tx.status)}`}>
                  {tx.status === "pending" && <Loader className="h-3 w-3 inline animate-spin mr-1" />}
                  {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button variant="outline" className="w-full mt-6">
        Load More Transactions
      </Button>
    </Card>
  )
}
