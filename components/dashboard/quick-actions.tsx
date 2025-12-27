"use client"

import { Send, Plus, RefreshCw, Download } from 'lucide-react'

export default function QuickActions() {
  const actions = [
    { icon: Plus, label: "Buy", color: "from-blue-500 to-blue-600" },
    { icon: Send, label: "Sell", color: "from-red-500 to-red-600" },
    { icon: RefreshCw, label: "Transfer", color: "from-purple-500 to-purple-600" },
    { icon: Download, label: "Export", color: "from-emerald-500 to-emerald-600" },
  ]

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 h-full font-sans">
      <h2 className="text-lg font-bold text-slate-900 mb-6">Quick Actions</h2>
      <div className="space-y-3">
        {actions.map((action, i) => {
          const Icon = action.icon
          return (
            <button
              key={i}
              className={`w-full p-4 rounded-lg bg-gradient-to-br ${action.color} text-white font-medium flex items-center justify-center gap-2 hover:shadow-lg transition-smooth hover:scale-105 group`}
            >
              <Icon size={20} className="group-hover:scale-110 transition-smooth" />
              {action.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
