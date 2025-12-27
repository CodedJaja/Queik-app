"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { ArrowRight, CheckCircle2, User, FileText } from "lucide-react"

type Country = "NG" | "IN" | "OTHER"
type OnboardingStep = "country" | "personal" | "verification" | "complete"

export default function OnboardingPage() {
  const [step, setStep] = useState<OnboardingStep>("country")
  const [country, setCountry] = useState<Country | "">("")
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    nationality: "",
  })
  const [verification, setVerification] = useState({
    bvn: "", // Nigeria
    aadhaar: "", // India
    pan: "", // India
    passport: "", // Global
  })

  const progress = {
    country: 25,
    personal: 50,
    verification: 75,
    complete: 100,
  }

  const handleCountrySelect = (value: string) => {
    setCountry(value as Country)
    setStep("personal")
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleVerificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setVerification((prev) => ({ ...prev, [name]: value }))
  }

  const handleNext = () => {
    if (step === "personal") setStep("verification")
    else if (step === "verification") setStep("complete")
  }

  const handleSubmit = async () => {
    const payload = {
      country,
      ...formData,
      ...verification,
    }
    console.log("Onboarding data:", payload)
    // TODO: Submit to /api/onboarding/complete
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-600/10 p-4 md:p-8 font-sans flex items-center justify-center">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center mb-4">
            <img src="/queik-logo-2.png" alt="Queik" className="h-12 w-auto" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Create Your USD Wallet</h1>
          <p className="text-slate-300">Join thousands sending and receiving money globally</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <Progress value={progress[step]} className="h-2" />
          <p className="text-slate-400 text-sm mt-2">{progress[step]}% complete</p>
        </div>

        {/* Steps */}
        {step === "country" && (
          <Card className="border-slate-700 bg-slate-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Select Your Country</CardTitle>
              <CardDescription className="text-slate-400">Choose where you're located</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                {[
                  { id: "NG", name: "Nigeria", flag: "🇳🇬" },
                  { id: "IN", name: "India", flag: "🇮🇳" },
                  { id: "OTHER", name: "Other Country", flag: "🌍" },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleCountrySelect(opt.id)}
                    className="p-4 border border-slate-600 rounded-lg hover:border-emerald-500 hover:bg-slate-700/50 transition-colors text-left text-white font-medium"
                  >
                    <span className="text-2xl mr-3">{opt.flag}</span>
                    {opt.name}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {step === "personal" && (
          <Card className="border-slate-700 bg-slate-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <User className="w-5 h-5" /> Personal Information
              </CardTitle>
              <CardDescription className="text-slate-400">Tell us about yourself</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-300">Full Name</Label>
                  <Input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleFormChange}
                    placeholder="John Doe"
                    className="bg-slate-700 border-slate-600 text-white mt-2"
                  />
                </div>
                <div>
                  <Label className="text-slate-300">Email</Label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    placeholder="john@example.com"
                    className="bg-slate-700 border-slate-600 text-white mt-2"
                  />
                </div>
                <div>
                  <Label className="text-slate-300">Phone</Label>
                  <Input
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    placeholder="+234..."
                    className="bg-slate-700 border-slate-600 text-white mt-2"
                  />
                </div>
                <div>
                  <Label className="text-slate-300">Date of Birth</Label>
                  <Input
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleFormChange}
                    className="bg-slate-700 border-slate-600 text-white mt-2"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label className="text-slate-300">Address</Label>
                  <Input
                    name="address"
                    value={formData.address}
                    onChange={handleFormChange}
                    placeholder="123 Main Street"
                    className="bg-slate-700 border-slate-600 text-white mt-2"
                  />
                </div>
                <div>
                  <Label className="text-slate-300">City</Label>
                  <Input
                    name="city"
                    value={formData.city}
                    onChange={handleFormChange}
                    placeholder="Lagos"
                    className="bg-slate-700 border-slate-600 text-white mt-2"
                  />
                </div>
                <div>
                  <Label className="text-slate-300">State/Province</Label>
                  <Input
                    name="state"
                    value={formData.state}
                    onChange={handleFormChange}
                    placeholder="Lagos State"
                    className="bg-slate-700 border-slate-600 text-white mt-2"
                  />
                </div>
              </div>
              <Button onClick={handleNext} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white mt-6">
                Continue <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        )}

        {step === "verification" && (
          <Card className="border-slate-700 bg-slate-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="w-5 h-5" /> Verification Documents
              </CardTitle>
              <CardDescription className="text-slate-400">Complete KYC verification</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {country === "NG" && (
                <div>
                  <Label className="text-slate-300">BVN (Bank Verification Number)</Label>
                  <Input
                    name="bvn"
                    value={verification.bvn}
                    onChange={handleVerificationChange}
                    placeholder="11-digit BVN"
                    maxLength={11}
                    className="bg-slate-700 border-slate-600 text-white mt-2"
                  />
                </div>
              )}
              {country === "IN" && (
                <>
                  <div>
                    <Label className="text-slate-300">Aadhaar Number</Label>
                    <Input
                      name="aadhaar"
                      value={verification.aadhaar}
                      onChange={handleVerificationChange}
                      placeholder="12-digit Aadhaar"
                      maxLength={12}
                      className="bg-slate-700 border-slate-600 text-white mt-2"
                    />
                  </div>
                  <div>
                    <Label className="text-slate-300">PAN</Label>
                    <Input
                      name="pan"
                      value={verification.pan}
                      onChange={handleVerificationChange}
                      placeholder="PAN Number"
                      className="bg-slate-700 border-slate-600 text-white mt-2"
                    />
                  </div>
                </>
              )}
              {country === "OTHER" && (
                <div>
                  <Label className="text-slate-300">Passport Number</Label>
                  <Input
                    name="passport"
                    value={verification.passport}
                    onChange={handleVerificationChange}
                    placeholder="Passport number"
                    className="bg-slate-700 border-slate-600 text-white mt-2"
                  />
                </div>
              )}
              <Button onClick={handleNext} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white mt-6">
                Complete <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        )}

        {step === "complete" && (
          <Card className="border-emerald-600/50 bg-slate-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Account Created!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4 text-emerald-400">
                Your account is being verified. This usually takes a few minutes.
              </div>
              <Button onClick={handleSubmit} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                Go to Dashboard
              </Button>
              <Link href="/" className="block text-center text-slate-400 hover:text-slate-300 text-sm">
                Back to home
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
