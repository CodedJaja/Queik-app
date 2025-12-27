"use client"

import { useState } from "react"
import { ArrowRight, Globe, Clock, Shield, ChevronDown } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import TransferRecentContacts from "@/components/transfer/recent-contacts"
import ExchangeRateWidget from "@/components/transfer/exchange-rate-widget"

const CURRENCIES = [
  { code: "USD", symbol: "$", name: "US Dollar", rate: 1.0 },
  { code: "EUR", symbol: "€", name: "Euro", rate: 0.92 },
  { code: "GBP", symbol: "£", name: "British Pound", rate: 0.79 },
  { code: "JPY", symbol: "¥", name: "Japanese Yen", rate: 149.50 },
  { code: "AUD", symbol: "A$", name: "Australian Dollar", rate: 1.52 },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar", rate: 1.36 },
  { code: "INR", symbol: "₹", name: "Indian Rupee", rate: 83.12 },
  { code: "MXN", symbol: "$", name: "Mexican Peso", rate: 20.50 },
]

export default function TransferPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [fromCurrency, setFromCurrency] = useState("USD")
  const [toCurrency, setToCurrency] = useState("EUR")
  const [amount, setAmount] = useState("")
  const [recipientEmail, setRecipientEmail] = useState("")
  const [recipientName, setRecipientName] = useState("")
  const [transferFee] = useState(2.50)

  const exchangeRate = CURRENCIES.find(c => c.code === toCurrency)?.rate || 0.92
  const convertedAmount = parseFloat(amount) * exchangeRate || 0
  const totalAmount = parseFloat(amount) + transferFee || 0

  const handleTransfer = () => {
    if (step < 3) {
      setStep((step + 1) as 1 | 2 | 3)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-6 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Global Money Transfer</h1>
          <p className="text-slate-600">Send money worldwide instantly with competitive rates</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Transfer Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Steps */}
            <div className="flex gap-4 mb-8">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                      step >= s
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {s}
                  </div>
                  {s < 3 && <div className={`w-12 h-1 ${step > s ? "bg-emerald-600" : "bg-slate-200"}`} />}
                </div>
              ))}
            </div>

            {/* Step 1: Amount and Currency */}
            {step === 1 && (
              <Card className="border-0 shadow-sm hover-lift">
                <CardHeader>
                  <CardTitle>How much do you want to send?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* From Amount */}
                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-3">You send</label>
                    <div className="flex gap-2">
                      <div className="flex-1 relative">
                        <span className="absolute left-3 top-3 text-slate-600 font-semibold">
                          {CURRENCIES.find(c => c.code === fromCurrency)?.symbol}
                        </span>
                        <Input
                          type="number"
                          placeholder="0.00"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="pl-8 bg-white border-slate-200"
                        />
                      </div>
                      <select
                        value={fromCurrency}
                        onChange={(e) => setFromCurrency(e.target.value)}
                        className="px-4 bg-white border border-slate-200 rounded-lg font-medium"
                      >
                        {CURRENCIES.map((c) => (
                          <option key={c.code} value={c.code}>
                            {c.code}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex justify-center">
                    <div className="bg-emerald-100 rounded-full p-3">
                      <ArrowRight className="w-5 h-5 text-emerald-600" />
                    </div>
                  </div>

                  {/* To Amount */}
                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-3">Recipient gets</label>
                    <div className="flex gap-2">
                      <div className="flex-1 relative">
                        <span className="absolute left-3 top-3 text-slate-600 font-semibold">
                          {CURRENCIES.find(c => c.code === toCurrency)?.symbol}
                        </span>
                        <Input
                          type="number"
                          placeholder="0.00"
                          value={convertedAmount.toFixed(2)}
                          disabled
                          className="pl-8 bg-slate-50 border-slate-200"
                        />
                      </div>
                      <select
                        value={toCurrency}
                        onChange={(e) => setToCurrency(e.target.value)}
                        className="px-4 bg-white border border-slate-200 rounded-lg font-medium"
                      >
                        {CURRENCIES.map((c) => (
                          <option key={c.code} value={c.code}>
                            {c.code}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Fee Info */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm text-blue-900">Transfer fee</p>
                      <p className="font-semibold text-blue-900">${transferFee.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between items-center border-t border-blue-200 pt-2">
                      <p className="text-sm font-medium text-blue-900">Total amount</p>
                      <p className="font-bold text-blue-900">${totalAmount.toFixed(2)}</p>
                    </div>
                  </div>

                  <Button
                    onClick={handleTransfer}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-12 rounded-lg"
                  >
                    Continue
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Recipient Details */}
            {step === 2 && (
              <Card className="border-0 shadow-sm hover-lift">
                <CardHeader>
                  <CardTitle>Who are you sending to?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-2">
                      Recipient's Full Name
                    </label>
                    <Input
                      placeholder="John Doe"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      className="bg-white border-slate-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-2">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      value={recipientEmail}
                      onChange={(e) => setRecipientEmail(e.target.value)}
                      className="bg-white border-slate-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-2">
                      Recipient's IBAN or Account Number
                    </label>
                    <Input
                      placeholder="DE89370400440532013000"
                      className="bg-white border-slate-200"
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={() => setStep(1)}
                      variant="outline"
                      className="flex-1 border-slate-200"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={handleTransfer}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                    >
                      Continue
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Review and Confirm */}
            {step === 3 && (
              <Card className="border-0 shadow-sm hover-lift">
                <CardHeader>
                  <CardTitle>Review and confirm</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Transfer Summary */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-slate-50 rounded-lg">
                      <span className="text-slate-600">You send</span>
                      <span className="font-bold text-slate-900">
                        {CURRENCIES.find(c => c.code === fromCurrency)?.symbol}{parseFloat(amount).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-slate-50 rounded-lg">
                      <span className="text-slate-600">Recipient gets</span>
                      <span className="font-bold text-emerald-600">
                        {CURRENCIES.find(c => c.code === toCurrency)?.symbol}{convertedAmount.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-slate-50 rounded-lg">
                      <span className="text-slate-600">Transfer fee</span>
                      <span className="font-bold text-slate-900">${transferFee.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Recipient Info */}
                  <div className="border-t border-slate-200 pt-4">
                    <p className="text-sm text-slate-600 mb-3">Sending to</p>
                    <div className="bg-slate-50 rounded-lg p-4">
                      <p className="font-semibold text-slate-900">{recipientName}</p>
                      <p className="text-sm text-slate-600">{recipientEmail}</p>
                    </div>
                  </div>

                  {/* Estimated Delivery */}
                  <div className="flex gap-3 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                    <Clock className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-emerald-900">Estimated delivery</p>
                      <p className="text-sm text-emerald-700">1-2 business days</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button
                      onClick={() => setStep(2)}
                      variant="outline"
                      className="flex-1 border-slate-200"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={() => {
                        setStep(1)
                        setAmount("")
                      }}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                    >
                      Send Money Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Exchange Rate Info */}
            <ExchangeRateWidget fromCurrency={fromCurrency} toCurrency={toCurrency} />

            {/* Recent Contacts */}
            <TransferRecentContacts />

            {/* Transfer Benefits */}
            <Card className="border-0 shadow-sm font-sans">
              <CardHeader>
                <CardTitle className="text-base">Why FinFlow?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-3">
                  <Shield className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">Secure</p>
                    <p className="text-xs text-slate-600">Bank-level encryption</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Globe className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">Global</p>
                    <p className="text-xs text-slate-600">200+ countries supported</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <ArrowRight className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">Fast</p>
                    <p className="text-xs text-slate-600">1-2 business days</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
