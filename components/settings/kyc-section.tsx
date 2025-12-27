"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, CheckCircle, Clock, AlertCircle, Upload } from 'lucide-react'

type KYCStatus = "not_started" | "pending" | "verified"

export default function KYCSection() {
  const [kycStatus, setKycStatus] = useState<KYCStatus>("pending")
  const [uploadedDocs, setUploadedDocs] = useState({
    id: false,
    selfie: false,
    address: false
  })

  const handleFileUpload = (docType: keyof typeof uploadedDocs) => {
    setUploadedDocs(prev => ({ ...prev, [docType]: true }))
  }

  const getStatusIcon = (status: KYCStatus) => {
    switch(status) {
      case "verified": return <CheckCircle className="w-5 h-5 text-green-600" />
      case "pending": return <Clock className="w-5 h-5 text-yellow-600" />
      default: return <AlertCircle className="w-5 h-5 text-slate-400" />
    }
  }

  const getStatusText = (status: KYCStatus) => {
    switch(status) {
      case "verified": return "Verified"
      case "pending": return "Pending Review"
      default: return "Not Started"
    }
  }

  const getStatusColor = (status: KYCStatus) => {
    switch(status) {
      case "verified": return "bg-green-50 border-green-200 text-green-900"
      case "pending": return "bg-yellow-50 border-yellow-200 text-yellow-900"
      default: return "bg-slate-50 border-slate-200 text-slate-600"
    }
  }

  return (
    <div className="space-y-4">
      {/* KYC Status Overview */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-emerald-600" />
            Verification Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`flex items-center justify-between p-4 rounded-lg border ${getStatusColor(kycStatus)}`}>
            <div className="flex items-center gap-3">
              {getStatusIcon(kycStatus)}
              <div>
                <p className="font-medium">KYC Verification</p>
                <p className="text-sm">{kycStatus === "verified" ? "Your identity has been verified" : kycStatus === "pending" ? "Your documents are under review" : "Complete your verification to unlock full features"}</p>
              </div>
            </div>
            <span className="font-medium">{getStatusText(kycStatus)}</span>
          </div>
        </CardContent>
      </Card>

      {/* Document Upload */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Required Documents</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { key: "id", label: "Government ID", desc: "Passport, Driver's License, or National ID" },
            { key: "selfie", label: "Selfie", desc: "Recent photo of you for face verification" },
            { key: "address", label: "Address Verification", desc: "Utility bill, lease agreement, or bank statement" }
          ].map(({ key, label, desc }) => (
            <div key={key} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-medium text-slate-900">{label}</p>
                  <p className="text-sm text-slate-600">{desc}</p>
                </div>
                {uploadedDocs[key as keyof typeof uploadedDocs] && (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                )}
              </div>
              {!uploadedDocs[key as keyof typeof uploadedDocs] && (
                <Button
                  onClick={() => handleFileUpload(key as keyof typeof uploadedDocs)}
                  variant="outline"
                  size="sm"
                  className="w-full border-slate-300"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Document
                </Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Continue Verification Button */}
      {kycStatus !== "verified" && (
        <Button
          onClick={() => setKycStatus("verified")}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          Continue Verification
        </Button>
      )}
    </div>
  )
}
