"use client"

import { useState } from "react"
import { X, Check } from 'lucide-react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface CardCreationModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CardCreationModal({ isOpen, onClose }: CardCreationModalProps) {
  const [step, setStep] = useState<1 | 2>(1)
  const [cardDetails, setCardDetails] = useState({
    cardholderName: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: ""
  })

  if (!isOpen) return null

  const handleSubmit = () => {
    if (step === 1) {
      setStep(2)
    } else {
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md border-0 shadow-xl">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-slate-900">
              {step === 1 ? "Add New Card" : "Verify Card"}
            </h2>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Step 1 */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">Cardholder Name</label>
                <Input
                  placeholder="John Doe"
                  value={cardDetails.cardholderName}
                  onChange={(e) => setCardDetails({...cardDetails, cardholderName: e.target.value})}
                  className="bg-white border-slate-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">Card Number</label>
                <Input
                  placeholder="4242 4242 4242 4242"
                  value={cardDetails.cardNumber}
                  onChange={(e) => setCardDetails({...cardDetails, cardNumber: e.target.value})}
                  className="bg-white border-slate-200"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">Month</label>
                  <Input
                    placeholder="MM"
                    value={cardDetails.expiryMonth}
                    onChange={(e) => setCardDetails({...cardDetails, expiryMonth: e.target.value})}
                    className="bg-white border-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">Year</label>
                  <Input
                    placeholder="YY"
                    value={cardDetails.expiryYear}
                    onChange={(e) => setCardDetails({...cardDetails, expiryYear: e.target.value})}
                    className="bg-white border-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">CVV</label>
                  <Input
                    placeholder="•••"
                    type="password"
                    value={cardDetails.cvv}
                    onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                    className="bg-white border-slate-200"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={onClose}
                  variant="outline"
                  className="flex-1 border-slate-200"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  Next
                </Button>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="bg-emerald-50 rounded-lg p-6 text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-lg font-bold text-emerald-900">Card Added Successfully!</h3>
                <p className="text-sm text-emerald-700 mt-2">Your card is now ready to use</p>
              </div>

              <Button
                onClick={handleSubmit}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                Done
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
