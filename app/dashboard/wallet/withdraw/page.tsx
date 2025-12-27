"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, Smartphone, WalletIcon, Clock } from "lucide-react"

interface WithdrawalRecipient {
  id: string
  type: "bank" | "mobile" | "crypto"
  name: string
  accountNumber?: string
  phoneNumber?: string
  cryptoAddress?: string
  currency: string
  country: string
}

const mockRecipients: WithdrawalRecipient[] = [
  {
    id: "1",
    type: "bank",
    name: "First Bank Account - NGN",
    accountNumber: "****5678",
    currency: "NGN",
    country: "Nigeria",
  },
  {
    id: "2",
    type: "mobile",
    name: "MTN Mobile Money",
    phoneNumber: "****123456",
    currency: "NGN",
    country: "Nigeria",
  },
]

export default function WithdrawPage() {
  const [step, setStep] = useState<"select" | "details" | "confirm">("select")
  const [amount, setAmount] = useState("100")
  const [selectedRecipient, setSelectedRecipient] = useState<WithdrawalRecipient | null>(null)
  const [recipientType, setRecipientType] = useState<"bank" | "mobile" | "crypto" | "user">("bank")
  const [fxRate, setFxRate] = useState(1.0)
  const [loading, setLoading] = useState(false)

  const fee = calculateFee(Number.parseFloat(amount))
  const totalWithFee = Number.parseFloat(amount) + fee

  function calculateFee(amount: number): number {
    return amount * 0.005 // 0.5% fee
  }

  const getFXRate = (currency: string) => {
    const rates: Record<string, number> = {
      NGN: 1500.5,
      INR: 83.4,
      GHS: 13.5,
      KES: 138.4,
    }
    return rates[currency] || 1.0
  }

  const handleWithdraw = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/wallet/withdraw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Number.parseFloat(amount),
          recipientId: selectedRecipient?.id,
          recipientType,
          fee,
        }),
      })
      // TODO: Handle response
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 font-sans">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Withdraw Money</h1>
        <p className="text-slate-600">Send USD to your bank account or mobile wallet</p>
      </div>

      {step === "select" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recipients */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Select Recipient</CardTitle>
                <CardDescription>Choose where to send your money</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockRecipients.map((recipient) => (
                  <button
                    key={recipient.id}
                    onClick={() => {
                      setSelectedRecipient(recipient)
                      setStep("details")
                    }}
                    className="w-full p-4 border-2 border-slate-200 rounded-lg hover:border-emerald-500 transition-colors text-left"
                  >
                    <div className="flex items-center gap-4">
                      {recipient.type === "bank" && <CreditCard className="w-6 h-6 text-slate-600" />}
                      {recipient.type === "mobile" && <Smartphone className="w-6 h-6 text-slate-600" />}
                      {recipient.type === "crypto" && <WalletIcon className="w-6 h-6 text-slate-600" />}
                      <div className="flex-1">
                        <p className="font-semibold text-slate-900">{recipient.name}</p>
                        <p className="text-sm text-slate-600">{recipient.accountNumber || recipient.phoneNumber}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-slate-900">{recipient.currency}</p>
                        <p className="text-xs text-slate-600">{recipient.country}</p>
                      </div>
                    </div>
                  </button>
                ))}

                {/* Add New Recipient */}
                <Card className="border-dashed">
                  <CardContent className="p-4">
                    <Button onClick={() => setStep("details")} variant="outline" className="w-full">
                      + Add New Recipient
                    </Button>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>

          {/* Info */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Quick Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="text-slate-600 mb-1">Available Balance</p>
                  <p className="font-bold text-lg text-emerald-600">$5,342.50</p>
                </div>
                <div className="bg-slate-50 p-3 rounded">
                  <p className="text-slate-600 mb-1">Daily Limit</p>
                  <p className="font-semibold">$10,000 remaining</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {step === "details" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Recipient Type */}
            <Card>
              <CardHeader>
                <CardTitle>Recipient Type</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={recipientType} onValueChange={(v) => setRecipientType(v as any)}>
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="user">User</TabsTrigger>
                    <TabsTrigger value="bank">Bank</TabsTrigger>
                    <TabsTrigger value="mobile">Mobile</TabsTrigger>
                    <TabsTrigger value="crypto">Crypto</TabsTrigger>
                  </TabsList>

                  <TabsContent value="user" className="space-y-4 mt-4">
                    <div>
                      <Label>Username or Email</Label>
                      <Input placeholder="@username or email@example.com" className="mt-2" />
                    </div>
                  </TabsContent>

                  <TabsContent value="bank" className="space-y-4 mt-4">
                    <div>
                      <Label>Country</Label>
                      <Select defaultValue="NG">
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="NG">Nigeria (NGN)</SelectItem>
                          <SelectItem value="IN">India (INR)</SelectItem>
                          <SelectItem value="GH">Ghana (GHS)</SelectItem>
                          <SelectItem value="US">United States (USD)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Account Number</Label>
                      <Input placeholder="Enter bank account number" className="mt-2" />
                    </div>
                    <div>
                      <Label>Bank Name</Label>
                      <Input placeholder="e.g., First Bank" className="mt-2" />
                    </div>
                  </TabsContent>

                  <TabsContent value="mobile" className="space-y-4 mt-4">
                    <div>
                      <Label>Provider</Label>
                      <Select defaultValue="mtn">
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mtn">MTN Mobile Money</SelectItem>
                          <SelectItem value="airtel">Airtel Money</SelectItem>
                          <SelectItem value="mpesa">M-Pesa</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Phone Number</Label>
                      <Input placeholder="+234..." className="mt-2" />
                    </div>
                  </TabsContent>

                  <TabsContent value="crypto" className="space-y-4 mt-4">
                    <div>
                      <Label>Crypto Type</Label>
                      <Select defaultValue="usdt">
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="usdt">USDT (Tether)</SelectItem>
                          <SelectItem value="usdc">USDC</SelectItem>
                          <SelectItem value="btc">Bitcoin</SelectItem>
                          <SelectItem value="eth">Ethereum</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Wallet Address</Label>
                      <Input placeholder="0x..." className="mt-2 font-mono text-sm" />
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Amount */}
            <Card>
              <CardHeader>
                <CardTitle>Withdrawal Amount</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Amount (USD)</Label>
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="100.00"
                    className="text-lg mt-2"
                    min="10"
                  />
                </div>

                {/* Quick Amounts */}
                <div className="flex gap-2 flex-wrap">
                  {[100, 500, 1000, 5000].map((val) => (
                    <Button
                      key={val}
                      variant={amount === val.toString() ? "default" : "outline"}
                      onClick={() => setAmount(val.toString())}
                      className="text-sm"
                    >
                      ${val}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-2">
              <Button onClick={() => setStep("select")} variant="outline" className="flex-1">
                Back
              </Button>
              <Button
                onClick={() => setStep("confirm")}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                Review & Confirm
              </Button>
            </div>
          </div>

          {/* FX Breakdown */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Exchange Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-slate-600 text-sm mb-2">Exchange Rate</p>
                  <p className="font-bold text-lg">1 USD = ₦{fxRate}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">You Send</span>
                    <span className="font-semibold">${amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">You'll Get</span>
                    <span className="font-semibold">₦{(Number.parseFloat(amount) * fxRate).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Fee</span>
                    <span>${fee.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {step === "confirm" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" /> Review Withdrawal
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Summary */}
                <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-lg space-y-4">
                  <div className="flex justify-between">
                    <span className="text-slate-600">From</span>
                    <span className="font-semibold">USD Wallet</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">To</span>
                    <span className="font-semibold">{selectedRecipient?.name || "New Account"}</span>
                  </div>
                  <div className="border-t pt-4 flex justify-between text-lg">
                    <span className="font-semibold">Amount</span>
                    <span className="font-bold text-emerald-600">${amount}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Fee</span>
                    <span>${fee.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-4 flex justify-between text-lg">
                    <span>Total Debit</span>
                    <span className="font-bold">${totalWithFee.toFixed(2)}</span>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-slate-600">
                    <span>Processing Time</span>
                    <span className="font-semibold">1-3 business days</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Reference</span>
                    <span className="font-mono">WD-{Date.now().toString().slice(-8)}</span>
                  </div>
                </div>

                {/* Confirm Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button onClick={() => setStep("details")} variant="outline" className="flex-1">
                    Back
                  </Button>
                  <Button
                    onClick={handleWithdraw}
                    disabled={loading}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    {loading ? "Processing..." : "Confirm Withdrawal"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Disclaimer */}
          <div>
            <Card className="border-amber-200 bg-amber-50">
              <CardHeader>
                <CardTitle className="text-base text-amber-900">Important</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-amber-900">
                <p>Double-check your recipient details. Errors may result in lost funds.</p>
                <p>Withdrawal cannot be reversed once processed.</p>
                <p>We're not responsible for incorrect recipient information.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
