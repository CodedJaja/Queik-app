"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CreditCard, Plus, Trash2, Check } from 'lucide-react'

interface BankAccount {
  id: string
  name: string
  accountNumber: string
  bank: string
  isDefault: boolean
}

export default function BankAccountsSection() {
  const [accounts, setAccounts] = useState<BankAccount[]>([
    { id: "1", name: "Checking Account", accountNumber: "****1234", bank: "Chase Bank", isDefault: true },
    { id: "2", name: "Savings Account", accountNumber: "****5678", bank: "Bank of America", isDefault: false }
  ])
  const [showAddForm, setShowAddForm] = useState(false)

  const handleSetDefault = (id: string) => {
    setAccounts(accounts.map(acc => ({
      ...acc,
      isDefault: acc.id === id
    })))
  }

  const handleRemove = (id: string) => {
    setAccounts(accounts.filter(acc => acc.id !== id))
  }

  return (
    <div className="space-y-4">
      {/* Bank Accounts List */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-emerald-600" />
            Linked Bank Accounts
          </CardTitle>
          <Button
            onClick={() => setShowAddForm(!showAddForm)}
            size="sm"
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Bank
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {accounts.map(account => (
            <div key={account.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
              <div className="flex-1">
                <p className="font-medium text-slate-900">{account.name}</p>
                <p className="text-sm text-slate-600">{account.bank} • {account.accountNumber}</p>
              </div>
              <div className="flex items-center gap-2">
                {account.isDefault ? (
                  <div className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    <Check className="w-4 h-4" />
                    Default
                  </div>
                ) : (
                  <Button
                    onClick={() => handleSetDefault(account.id)}
                    variant="outline"
                    size="sm"
                    className="border-slate-300"
                  >
                    Set Default
                  </Button>
                )}
                <Button
                  onClick={() => handleRemove(account.id)}
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Add Bank Form */}
      {showAddForm && (
        <Card className="border-0 shadow-sm bg-blue-50 border-l-4 border-blue-600">
          <CardContent className="pt-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Account Holder Name"
                className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <input
                type="text"
                placeholder="Account Number"
                className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <input
                type="text"
                placeholder="Bank Name"
                className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <input
                type="text"
                placeholder="Routing Number"
                className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => setShowAddForm(false)}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                Add Bank Account
              </Button>
              <Button
                onClick={() => setShowAddForm(false)}
                variant="outline"
                className="border-slate-300"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
