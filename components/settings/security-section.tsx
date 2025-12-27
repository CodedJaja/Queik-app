"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lock, Smartphone, Eye, EyeOff, LogOut } from 'lucide-react'

export default function SecuritySection() {
  const [showPassword, setShowPassword] = useState(false)
  const [twoFAEnabled, setTwoFAEnabled] = useState(false)
  const [biometricEnabled, setBiometricEnabled] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isSaving, setIsSaving] = useState(false)

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
        body: JSON.stringify({ currentPassword, newPassword })
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

  const handleToggle2FA = async () => {
    try {
      const response = await fetch("/api/security/2fa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled: !twoFAEnabled })
      })
      if (response.ok) {
        setTwoFAEnabled(!twoFAEnabled)
      }
    } catch (error) {
      console.error("[v0] Error toggling 2FA:", error)
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
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5"
              >
                {showPassword ? <EyeOff className="w-5 h-5 text-slate-400" /> : <Eye className="w-5 h-5 text-slate-400" />}
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
              {twoFAEnabled ? "Disable" : "Enable"}
            </button>
          </div>
          {twoFAEnabled && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-900">
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
              { device: "Chrome on Windows", location: "New York, NY", time: "3 days ago" }
            ].map((login, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div>
                  <p className="font-medium text-slate-900">{login.device}</p>
                  <p className="text-sm text-slate-600">{login.location}</p>
                </div>
                <p className="text-sm text-slate-500">{login.time}</p>
              </div>
            ))}
          </div>
          <Button
            variant="outline"
            className="w-full mt-4 border-red-200 text-red-600 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Terminate All Sessions
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
