"use client"

import { useState } from "react"
import { CreditCard, Plus, Lock, Eye, EyeOff, Trash2, Settings, Copy, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import CardCreationModal from "@/components/cards/card-creation-modal"
import BankAccountsSection from "@/components/cards/bank-accounts-section"

const CARDS = [
  {
    id: 1,
    type: "debit",
    brand: "Visa",
    lastFour: "4242",
    holder: "John Doe",
    expiry: "12/26",
    balance: 5240.50,
    status: "active",
    color: "from-emerald-500 to-teal-600"
  },
  {
    id: 2,
    type: "credit",
    brand: "Mastercard",
    lastFour: "5555",
    holder: "John Doe",
    expiry: "08/27",
    balance: 15000,
    status: "active",
    color: "from-blue-500 to-purple-600"
  },
]

const BANK_ACCOUNTS = [
  {
    id: 1,
    bank: "JPMorgan Chase",
    accountType: "Checking",
    accountNumber: "****1234",
    routing: "021000021",
    balance: 25000,
    isDefault: true,
    added: "Jan 15, 2024"
  },
  {
    id: 2,
    bank: "Bank of America",
    accountType: "Savings",
    accountNumber: "****5678",
    routing: "026009593",
    balance: 50000,
    isDefault: false,
    added: "Feb 20, 2024"
  },
]

export default function CardsPage() {
  const [showCardModal, setShowCardModal] = useState(false)
  const [visibleCardCVV, setVisibleCardCVV] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState<"cards" | "accounts">("cards")

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-6 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Cards & Accounts</h1>
            <p className="text-slate-600">Manage your cards and bank accounts</p>
          </div>
          <Button
            onClick={() => setShowCardModal(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Card
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-slate-200">
          <button
            onClick={() => setActiveTab("cards")}
            className={`px-4 py-3 font-medium transition-colors ${
              activeTab === "cards"
                ? "text-emerald-600 border-b-2 border-emerald-600"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <CreditCard className="w-5 h-5 inline mr-2" />
            Cards
          </button>
          <button
            onClick={() => setActiveTab("accounts")}
            className={`px-4 py-3 font-medium transition-colors ${
              activeTab === "accounts"
                ? "text-emerald-600 border-b-2 border-emerald-600"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <CreditCard className="w-5 h-5 inline mr-2" />
            Bank Accounts
          </button>
        </div>

        {/* Cards Tab */}
        {activeTab === "cards" && (
          <div className="space-y-6">
            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {CARDS.map((card) => (
                <div
                  key={card.id}
                  className={`relative h-64 rounded-2xl bg-gradient-to-br ${card.color} p-6 text-white shadow-lg hover-lift overflow-hidden group`}
                >
                  {/* Background pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-3xl" />
                  </div>

                  <div className="relative z-10 flex flex-col h-full justify-between">
                    {/* Top Section */}
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-semibold opacity-75">{card.type.toUpperCase()}</p>
                        <p className="text-2xl font-bold mt-2">{card.brand}</p>
                      </div>
                      <CreditCard className="w-8 h-8" />
                    </div>

                    {/* Middle Section - Card Number */}
                    <div>
                      <p className="text-lg font-mono tracking-widest">•••• •••• •••• {card.lastFour}</p>
                    </div>

                    {/* Bottom Section */}
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-xs opacity-75 mb-1">CARD HOLDER</p>
                        <p className="font-semibold">{card.holder}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs opacity-75 mb-1">VALID THRU</p>
                        <p className="font-semibold">{card.expiry}</p>
                      </div>
                    </div>
                  </div>

                  {/* Hover Actions */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 z-20 rounded-2xl">
                    <button className="bg-white/20 hover:bg-white/30 p-3 rounded-lg transition-colors" title="Lock Card">
                      <Lock className="w-5 h-5" />
                    </button>
                    <button className="bg-white/20 hover:bg-white/30 p-3 rounded-lg transition-colors" title="Delete Card">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Card Details and Settings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {CARDS.map((card) => (
                <Card key={`details-${card.id}`} className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-base">{card.brand} •••• {card.lastFour}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Card Info */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Balance</span>
                        <span className="font-bold text-slate-900">${card.balance.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Status</span>
                        <span className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
                          <div className="w-2 h-2 bg-emerald-600 rounded-full" />
                          {card.status.charAt(0).toUpperCase() + card.status.slice(1)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Expiry</span>
                        <span className="font-mono text-slate-900">{card.expiry}</span>
                      </div>
                    </div>

                    {/* CVV Section */}
                    <div className="border-t border-slate-200 pt-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-slate-600 text-sm font-medium">CVV</span>
                        <button
                          onClick={() => setVisibleCardCVV(visibleCardCVV === card.id ? null : card.id)}
                          className="text-slate-600 hover:text-slate-900"
                        >
                          {visibleCardCVV === card.id ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                      <div className="bg-slate-100 rounded-lg p-3 font-mono text-center">
                        {visibleCardCVV === card.id ? "***" : "•••"}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="border-t border-slate-200 pt-4 flex gap-2">
                      <Button variant="outline" className="flex-1 border-slate-200" size="sm">
                        <Settings className="w-4 h-4 mr-2" />
                        Settings
                      </Button>
                      <Button variant="outline" className="flex-1 border-slate-200" size="sm">
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Security Info */}
            <Card className="border-0 shadow-sm bg-blue-50 border-l-4 border-blue-600">
              <CardContent className="p-4 flex gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-blue-900">All transactions secured</p>
                  <p className="text-sm text-blue-700">Your cards use industry-leading encryption and fraud protection</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Bank Accounts Tab */}
        {activeTab === "accounts" && (
          <BankAccountsSection accounts={BANK_ACCOUNTS} />
        )}
      </div>

      {/* Card Creation Modal */}
      <CardCreationModal
        isOpen={showCardModal}
        onClose={() => setShowCardModal(false)}
      />
    </main>
  )
}
