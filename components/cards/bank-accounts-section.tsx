"use client"

import { Plus, Building2, Trash2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface BankAccount {
  id: number
  bank: string
  accountType: string
  accountNumber: string
  routing: string
  balance: number
  isDefault: boolean
  added: string
}

export default function BankAccountsSection({ accounts }: { accounts: BankAccount[] }) {
  return (
    <div className="space-y-6">
      <Button className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2">
        <Plus className="w-5 h-5" />
        Add Bank Account
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {accounts.map((account) => (
          <Card key={account.id} className="border-0 shadow-sm hover-lift">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{account.bank}</CardTitle>
                    <p className="text-xs text-slate-600">{account.accountType}</p>
                  </div>
                </div>
                {account.isDefault && (
                  <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">
                    Default
                  </span>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-slate-600 mb-1">Account Number</p>
                  <p className="font-mono text-slate-900">{account.accountNumber}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-600 mb-1">Routing Number</p>
                  <p className="font-mono text-slate-900">{account.routing}</p>
                </div>
                <div className="pt-3 border-t border-slate-200">
                  <p className="text-xs text-slate-600 mb-1">Balance</p>
                  <p className="text-xl font-bold text-slate-900">${account.balance.toLocaleString()}</p>
                </div>
              </div>

              <div className="flex gap-2 pt-3 border-t border-slate-200">
                <Button variant="outline" className="flex-1 border-slate-200" size="sm">
                  Make Default
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-slate-200 text-red-600 hover:text-red-700"
                  size="sm"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <p className="text-xs text-slate-500">Added {account.added}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
