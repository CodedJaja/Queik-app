import { Plus, Minus, CreditCard, RotateCw, FileText } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const actions = [
  {
    icon: Plus,
    label: "Add Money",
    description: "Top up your wallet",
    onClick: () => alert("Opening top-up modal"),
  },
  {
    icon: Minus,
    label: "Withdraw",
    description: "Send funds out",
    onClick: () => alert("Opening withdraw modal"),
  },
  {
    icon: CreditCard,
    label: "Bank Accounts",
    description: "Manage accounts",
    onClick: () => alert("Opening bank accounts"),
  },
  {
    icon: RotateCw,
    label: "Apply for Credit",
    description: "Get credit line",
    onClick: () => alert("Opening credit application"),
  },
  {
    icon: FileText,
    label: "Repay Loan",
    description: "Make repayment",
    onClick: () => alert("Opening repayment"),
  },
]

export default function QuickActions() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-900">Quick Actions</h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {actions.map((action, idx) => {
          const Icon = action.icon
          return (
            <Card
              key={idx}
              className="p-4 cursor-pointer hover-lift group"
              onClick={action.onClick}
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="h-12 w-12 bg-emerald-50 rounded-lg flex items-center justify-center group-hover:bg-emerald-100 transition-smooth">
                  <Icon className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-slate-900">{action.label}</p>
                  <p className="text-xs text-slate-500">{action.description}</p>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
