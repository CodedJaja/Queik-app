import { CreditCard, Plus, Trash2 } from 'lucide-react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const mockBankAccounts = [
  {
    id: 1,
    bank: "First Bank",
    accountNumber: "****1234",
    accountType: "Savings",
    isDefault: true,
  },
  {
    id: 2,
    bank: "Mobile Money",
    accountNumber: "****5678",
    accountType: "Mobile Wallet",
    isDefault: false,
  },
]

export default function BankAccountsSection() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-900">Bank Accounts</h3>
        <Button
          variant="outline"
          size="sm"
          className="gap-1"
        >
          <Plus className="h-4 w-4" />
          Add
        </Button>
      </div>

      <div className="space-y-3">
        {mockBankAccounts.map((account) => (
          <div
            key={account.id}
            className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-smooth"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-sm text-slate-900">{account.bank}</p>
                <p className="text-xs text-slate-500">{account.accountNumber}</p>
              </div>
            </div>
            {account.isDefault && (
              <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded">
                Default
              </span>
            )}
          </div>
        ))}
      </div>

      <Button variant="outline" className="w-full mt-4">
        Manage Accounts
      </Button>
    </Card>
  )
}
