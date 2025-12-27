"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, Smartphone, DollarSign, RefreshCw } from "lucide-react"

type DepositMethod = "card" | "bank" | "crypto" | "mobile"

const providers = [
  { id: "stripe", name: "Stripe", icon: "💳", fee: "2.9% + $0.30" },
  { id: "flutterwave", name: "Flutterwave", icon: "🌊", fee: "1.4% + Fixed" },
  { id: "paystack", name: "Paystack", icon: "🎯", fee: "1.5% + ₦50" },
  { id: "payoneer", name: "Payoneer", icon: "💰", fee: "2%" },
  { id: "wise", name: "Wise", icon: "🌐", fee: "Competitive" },
]

export default function AddMoneyPage() {
  const [amount, setAmount] = useState("100")
  const [method, setMethod] = useState<DepositMethod>("card")
  const [selectedProvider, setSelectedProvider] = useState("stripe")
  const [loading, setLoading] = useState(false)

  const fee = calculateFee(Number.parseFloat(amount))

  function calculateFee(amount: number): number {
    // Mock fee calculation: 2.9% + $0.30 for Stripe
    return amount * 0.029 + 0.3
  }

  const handleDeposit = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/wallet/deposit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, method, provider: selectedProvider }),
      })

      const data = await response.json()

      if (data.url) {
        window.location.href = data.url
      } else if (data.error) {
        alert(data.error)
      }
    } catch (error) {
      console.error("[v0] Deposit error:", error)
      alert("Failed to initiate deposit. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 font-sans">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Add Money</h1>
        <p className="text-slate-600">Deposit USD to your wallet</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Amount Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" /> Enter Amount
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="amount">Amount (USD)</Label>
                <Input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="100.00"
                  className="text-lg mt-2"
                  min="10"
                  step="0.01"
                />
              </div>

              {/* Quick Amounts */}
              <div className="flex gap-2 flex-wrap">
                {[50, 100, 500, 1000].map((val) => (
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

              {/* Fee Breakdown */}
              <div className="bg-slate-50 rounded-lg p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Amount</span>
                  <span className="font-semibold">${Number.parseFloat(amount).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Fee</span>
                  <span className="text-slate-600">${fee.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 flex justify-between">
                  <span className="font-semibold">You'll Receive</span>
                  <span className="font-bold text-emerald-600">${(Number.parseFloat(amount) - fee).toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Deposit Method */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>Choose how you want to fund your wallet</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={method} onValueChange={(v) => setMethod(v as DepositMethod)}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="card" className="flex items-center gap-1">
                    <CreditCard className="w-4 h-4" />
                    <span className="hidden sm:inline">Card</span>
                  </TabsTrigger>
                  <TabsTrigger value="bank" className="flex items-center gap-1">
                    <RefreshCw className="w-4 h-4" />
                    <span className="hidden sm:inline">Bank</span>
                  </TabsTrigger>
                  <TabsTrigger value="crypto" className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    <span className="hidden sm:inline">Crypto</span>
                  </TabsTrigger>
                  <TabsTrigger value="mobile" className="flex items-center gap-1">
                    <Smartphone className="w-4 h-4" />
                    <span className="hidden sm:inline">Mobile</span>
                  </TabsTrigger>
                </TabsList>

                {method === "card" && (
                  <TabsContent value="card" className="space-y-4 mt-4">
                    <div className="space-y-3">
                      {providers.slice(0, 3).map((provider) => (
                        <button
                          key={provider.id}
                          onClick={() => setSelectedProvider(provider.id)}
                          className={`w-full p-4 border-2 rounded-lg transition-all ${
                            selectedProvider === provider.id
                              ? "border-emerald-500 bg-emerald-50"
                              : "border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{provider.icon}</span>
                              <div className="text-left">
                                <p className="font-semibold text-slate-900">{provider.name}</p>
                                <p className="text-sm text-slate-600">Fee: {provider.fee}</p>
                              </div>
                            </div>
                            {selectedProvider === provider.id && (
                              <div className="w-4 h-4 bg-emerald-500 rounded-full" />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </TabsContent>
                )}

                {method === "bank" && (
                  <TabsContent value="bank" className="space-y-4 mt-4">
                    <div className="bg-slate-50 rounded-lg p-4">
                      <p className="text-sm text-slate-600">Bank transfers usually take 1-3 business days.</p>
                      <Button className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white">
                        Add Bank Account
                      </Button>
                    </div>
                  </TabsContent>
                )}

                {method === "crypto" && (
                  <TabsContent value="crypto" className="space-y-4 mt-4">
                    <div className="bg-slate-50 rounded-lg p-4">
                      <p className="text-sm text-slate-600">Send USDT or USDC to receive USD instantly.</p>
                      <Button className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white">
                        Get Deposit Address
                      </Button>
                    </div>
                  </TabsContent>
                )}

                {method === "mobile" && (
                  <TabsContent value="mobile" className="space-y-4 mt-4">
                    <div className="space-y-3">
                      {providers.slice(1, 3).map((provider) => (
                        <button
                          key={provider.id}
                          onClick={() => setSelectedProvider(provider.id)}
                          className={`w-full p-4 border-2 rounded-lg transition-all ${
                            selectedProvider === provider.id
                              ? "border-emerald-500 bg-emerald-50"
                              : "border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{provider.icon}</span>
                              <div className="text-left">
                                <p className="font-semibold text-slate-900">{provider.name}</p>
                                <p className="text-sm text-slate-600">Fee: {provider.fee}</p>
                              </div>
                            </div>
                            {selectedProvider === provider.id && (
                              <div className="w-4 h-4 bg-emerald-500 rounded-full" />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </TabsContent>
                )}
              </Tabs>
            </CardContent>
          </Card>

          <Button
            onClick={handleDeposit}
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-lg py-6"
            size="lg"
          >
            {loading ? "Processing..." : `Proceed to Payment (${selectedProvider})`}
          </Button>
        </div>

        {/* Info Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Why Choose Us?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-600">
              <div className="flex gap-2">
                <span className="text-emerald-600">✓</span>
                <span>Multiple payment methods</span>
              </div>
              <div className="flex gap-2">
                <span className="text-emerald-600">✓</span>
                <span>Competitive fees</span>
              </div>
              <div className="flex gap-2">
                <span className="text-emerald-600">✓</span>
                <span>Instant deposits</span>
              </div>
              <div className="flex gap-2">
                <span className="text-emerald-600">✓</span>
                <span>24/7 support</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Limits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Min. Deposit</span>
                <span className="font-semibold">$10</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Max. Daily</span>
                <span className="font-semibold">$10,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Max. Monthly</span>
                <span className="font-semibold">$50,000</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
