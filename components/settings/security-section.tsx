"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lock, Smartphone, Eye, EyeOff, LogOut, ShieldCheck } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

export default function SecuritySection() {
  const supabase = createClient()
  const [showPassword, setShowPassword] = useState(false)
  const [twoFAEnabled, setTwoFAEnabled] = useState(false)
  const [biometricEnabled, setBiometricEnabled] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [mfaEnrollment, setMfaEnrollment] = useState<{ id: string; qrCode: string; secret: string } | null>(null)
  const [mfaCode, setMfaCode] = useState("")

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match")
      return
    }
    setIsSaving(true)
    try {
      const response = await fetch("/api/security/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      })
      if (response.ok) {
        alert("Password changed successfully")
        setCurrentPassword("")
        setNewPassword("")
        setConfirmPassword("")
      }
    } catch (error) {
      console.error("[v0] Error changing password:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const startMfaEnrollment = async () => {
    try {
      const { data, error } = await supabase.auth.mfa.enroll({
        factorType: "totp",
        issuer: "Queik",
        friendlyName: "Authenticator App",
      })
      if (error) throw error
      setMfaEnrollment({
        id: data.id,
        qrCode: data.totp.qr_code,
        secret: data.totp.secret,
      })
    } catch (error: any) {
      console.error("[v0] MFA Enrollment Error:", error.message)
    }
  }

  const verifyMfaEnrollment = async () => {
    if (!mfaEnrollment) return
    setIsSaving(true)
    try {
      const { data: challengeData, error: challengeError } = await supabase.auth.mfa.challenge({
        factorId: mfaEnrollment.id,
      })
      if (challengeError) throw challengeError

      const { error: verifyError } = await supabase.auth.mfa.verify({
        factorId: mfaEnrollment.id,
        challengeId: challengeData.id,
        code: mfaCode,
      })
      if (verifyError) throw verifyError

      setTwoFAEnabled(true)
      setMfaEnrollment(null)
      setMfaCode("")
      alert("MFA successfully enabled!")
    } catch (error: any) {
      alert(error.message || "Invalid verification code")
    } finally {
      setIsSaving(false)
    }
  }

  const handleToggle2FA = async () => {
    if (!twoFAEnabled) {
      await startMfaEnrollment()
    } else {
      alert("Please contact support to disable MFA for your protection.")
    }
  }

  return (
    <div className="space-y-4">
      {/* Change Password Card */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-emerald-600" />
            Change Password
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Current Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">New Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2.5">
                {showPassword ? (
                  <EyeOff className="w-5 h-5 text-slate-400" />
                ) : (
                  <Eye className="w-5 h-5 text-slate-400" />
                )}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <Button
            onClick={handleChangePassword}
            disabled={isSaving || !currentPassword || !newPassword || !confirmPassword}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            {isSaving ? "Updating..." : "Update Password"}
          </Button>
        </CardContent>
      </Card>

      {/* Two-Factor Authentication */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-emerald-600" />
            Two-Factor Authentication
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-slate-600 text-sm">
            Add an extra layer of security to your account by requiring an additional verification method.
          </p>
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div>
              <p className="font-medium text-slate-900">Authenticator App</p>
              <p className="text-sm text-slate-600">Use an app like Google Authenticator or Authy</p>
            </div>
            <button
              onClick={handleToggle2FA}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                twoFAEnabled
                  ? "bg-red-100 text-red-700 hover:bg-red-200"
                  : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
              }`}
            >
              {twoFAEnabled ? "Active" : "Enable"}
            </button>
          </div>

          {mfaEnrollment && (
            <div className="p-6 border border-emerald-200 bg-emerald-50 rounded-xl space-y-6 animate-in fade-in slide-in-from-top-4 duration-300">
              <div className="text-center">
                <h3 className="text-lg font-bold text-slate-900 mb-2">Set up Authenticator App</h3>
                <p className="text-sm text-slate-600">Scan the QR code below with your authenticator app</p>
              </div>

              <div className="flex justify-center bg-white p-4 rounded-xl shadow-sm w-fit mx-auto border border-slate-100">
                <img src={mfaEnrollment.qrCode || "/placeholder.svg"} alt="MFA QR Code" className="w-48 h-48" />
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2 text-center">
                    Enter the 6-digit code from your app
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={mfaCode}
                    onChange={(e) => setMfaCode(e.target.value.replace(/\D/g, ""))}
                    className="w-full text-center text-2xl tracking-[0.5em] font-mono px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="000000"
                  />
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setMfaEnrollment(null)} className="flex-1 border-slate-200">
                    Cancel
                  </Button>
                  <Button
                    onClick={verifyMfaEnrollment}
                    disabled={mfaCode.length !== 6 || isSaving}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    {isSaving ? "Verifying..." : "Verify & Enable"}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {twoFAEnabled && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-sm text-emerald-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              2FA is currently enabled. Your account is protected.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Biometric Authentication */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-emerald-600" />
            Biometric Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div>
              <p className="font-medium text-slate-900">Face ID / Fingerprint</p>
              <p className="text-sm text-slate-600">Enable biometric authentication on supported devices</p>
            </div>
            <button
              onClick={() => setBiometricEnabled(!biometricEnabled)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                biometricEnabled
                  ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {biometricEnabled ? "Enabled" : "Disabled"}
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Login Activity */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Recent Login Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { device: "Chrome on macOS", location: "San Francisco, CA", time: "2 hours ago" },
              { device: "Safari on iPhone", location: "San Francisco, CA", time: "1 day ago" },
              { device: "Chrome on Windows", location: "New York, NY", time: "3 days ago" },
            ].map((login, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200"
              >
                <div>
                  <p className="font-medium text-slate-900">{login.device}</p>
                  <p className="text-sm text-slate-600">{login.location}</p>
                </div>
                <p className="text-sm text-slate-500">{login.time}</p>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4 border-red-200 text-red-600 hover:bg-red-50 bg-transparent">
            <LogOut className="w-4 h-4 mr-2" />
            Terminate All Sessions
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
