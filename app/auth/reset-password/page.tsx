"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Lock, Eye, EyeOff, CheckCircle2, AlertCircle } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

export default function ResetPasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const passwordRequirements = [
    { label: "At least 8 characters", met: password.length >= 8 },
    { label: "Contains uppercase letter", met: /[A-Z]/.test(password) },
    { label: "Contains number", met: /\d/.test(password) },
  ]

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (!passwordRequirements.every((r) => r.met)) {
      setError("Password does not meet requirements")
      return
    }

    setLoading(true)

    const supabase = createClient()
    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      })
      if (error) throw error
      setSuccess(true)
      setTimeout(() => {
        router.push("/auth/login")
      }, 3000)
    } catch (err: any) {
      setError(err.message || "An error occurred while resetting your password")
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="animate-scale-in">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 text-center font-sans">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
              <CheckCircle2 size={32} />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Password reset successful</h1>
          <p className="text-slate-600 mb-8">
            Your password has been updated. You will be redirected to login shortly.
          </p>
          <Link href="/auth/login" className="text-emerald-600 font-semibold hover:underline">
            Go to login now
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="animate-scale-in">
      <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 font-sans">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Set New Password</h1>
          <p className="text-slate-600 mt-2">Enter your new secure password below.</p>
        </div>

        <form onSubmit={handleResetPassword} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">New Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-smooth"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-smooth"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">Confirm New Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-smooth"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="space-y-2 p-4 rounded-lg bg-slate-100">
            {passwordRequirements.map((req, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <CheckCircle2 size={16} className={`${req.met ? "text-emerald-600" : "text-slate-400"}`} />
                <span className={req.met ? "text-slate-900" : "text-slate-600"}>{req.label}</span>
              </div>
            ))}
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-2">
              <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-slate-900 to-emerald-600 text-white font-semibold hover:shadow-lg transition-smooth disabled:opacity-50"
          >
            {loading ? "Updating Password..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  )
}
