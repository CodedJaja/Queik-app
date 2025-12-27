"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const supabase = createClient()
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })
      if (error) throw error
      setSuccess(true)
    } catch (err: any) {
      setError(err.message || "An error occurred while sending the reset link")
    } finally {
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
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Check your email</h1>
          <p className="text-slate-600 mb-8">
            We've sent a password reset link to <span className="font-semibold">{email}</span>.
          </p>
          <Link
            href="/auth/login"
            className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:underline"
          >
            <ArrowLeft size={16} />
            Back to login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="animate-scale-in">
      <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 font-sans">
        <div className="mb-8">
          <Link
            href="/auth/login"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-6 transition-smooth"
          >
            <ArrowLeft size={16} />
            Back to login
          </Link>
          <h1 className="text-3xl font-bold text-slate-900">Reset Password</h1>
          <p className="text-slate-600 mt-2">Enter your email and we'll send you a link to reset your password.</p>
        </div>

        <form onSubmit={handleResetPassword} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-smooth"
                placeholder="you@example.com"
              />
            </div>
          </div>

          {error && <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-slate-900 to-emerald-600 text-white font-semibold hover:shadow-lg transition-smooth disabled:opacity-50"
          >
            {loading ? "Sending link..." : "Send reset link"}
          </button>
        </form>
      </div>
    </div>
  )
}
