"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Mail, Lock, User, Eye, EyeOff, CheckCircle2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

export default function SignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const passwordRequirements = [
    { label: "At least 8 characters", met: formData.password.length >= 8 },
    { label: "Contains uppercase letter", met: /[A-Z]/.test(formData.password) },
    { label: "Contains number", met: /\d/.test(formData.password) },
    { label: "Passwords match", met: formData.password === formData.confirmPassword && formData.password },
  ]

  const handleOAuthSignup = async (provider: "google" | "apple") => {
    setError("")
    setLoading(true)
    const supabase = createClient()
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      })
      if (error) throw error
    } catch (err: any) {
      setError(err.message || `Failed to sign up with ${provider}`)
      setLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!formData.name) {
      setError("Name is required")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (!passwordRequirements.every((r) => r.met)) {
      setError("Password does not meet requirements")
      return
    }

    setLoading(true)

    const supabase = createClient()
    const [firstName, ...lastNameParts] = formData.name.split(" ")
    const lastName = lastNameParts.join(" ")

    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/dashboard`,
          data: {
            first_name: firstName,
            last_name: lastName,
          },
        },
      })
      if (error) throw error
      router.push("/auth/sign-up-success")
    } catch (err: any) {
      setError(err.message || "An error occurred during signup")
      setLoading(false)
    }
  }

  return (
    <div className="animate-scale-in">
      <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 font-sans">
        <div className="mb-8 font-sans">
          <div className="flex justify-center mb-4">
            <Image src="/queik-logo-2.png" alt="Queik" width={80} height={80} className="h-16 w-auto" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 font-sans">Create Account</h1>
          <p className="text-slate-600 mt-2">Join Queik and start investing today</p>
        </div>

        <div className="space-y-4">
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-smooth"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-smooth"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
              <label className="block text-sm font-medium text-slate-900 mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type={showConfirm ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full pl-10 pr-12 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-smooth"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-smooth"
                >
                  {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
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
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-slate-900 to-emerald-600 text-white font-semibold hover:shadow-lg transition-smooth disabled:opacity-50"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-slate-600 font-sans">or sign up with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleOAuthSignup("google")}
              disabled={loading}
              className="flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-lg hover:bg-slate-50 transition-smooth font-sans text-sm font-medium disabled:opacity-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.5 3.32-4.5 1.12 0 1.9.68 2.68.68.75 0 1.37-.68 2.69-.68 1.57 0 2.72.76 3.47 1.83-3.17 1.32-2.66 5.5.5 6.66-.54 1.38-1.28 2.76-2.24 3.8zM12.03 5.3c-.02-2.33 1.93-4.3 4.22-4.3.16 2.73-2.63 4.65-4.22 4.3z"
                  fill="none"
                />
              </svg>
              Google
            </button>
            <button
              onClick={() => handleOAuthSignup("apple")}
              disabled={loading}
              className="flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-lg hover:bg-slate-50 transition-smooth font-sans text-sm font-medium disabled:opacity-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.96.95-2.1 1.72-3.41 1.72-1.28 0-1.66-.79-3.23-.79-1.55 0-2.02.77-3.21.79-1.33.02-2.54-.84-3.51-1.81-2-1.98-3.07-5.02-3.07-7.7 0-2.55 1.34-4.5 3.32-4.5 1.12 0 1.9.68 2.68.68.75 0 1.37-.68 2.69-.68 1.57 0 2.72.76 3.47 1.83-3.17 1.32-2.66 5.5.5 6.66-.54 1.38-1.28 2.76-2.24 3.8zM12.03 5.3c-.02-2.33 1.93-4.3 4.22-4.3.16 2.73-2.63 4.65-4.22 4.3z" />
              </svg>
              Apple
            </button>
          </div>
        </div>

        <p className="text-center text-slate-600 text-sm mt-6">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-emerald-600 font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
