"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Mail, Lock, Eye, EyeOff, ShieldCheck } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showMfa, setShowMfa] = useState(false)
  const [mfaCode, setMfaCode] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const supabase = createClient()
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        if (error.message.includes("MFA") || error.message.includes("second factor")) {
          setShowMfa(true)
          setLoading(false)
          return
        }
        throw error
      }

      router.push("/dashboard")
      router.refresh()
    } catch (err: any) {
      setError(err.message || "Invalid credentials")
      setLoading(false)
    }
  }

  const handleMfaSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const supabase = createClient()
    try {
      const {
        data: { factors },
        error: factorsError,
      } = await supabase.auth.mfa.listFactors()
      if (factorsError) throw factorsError

      const totpFactor = factors.totp[0]
      if (!totpFactor) throw new Error("No MFA factor found")

      const { data: challengeData, error: challengeError } = await supabase.auth.mfa.challenge({
        factorId: totpFactor.id,
      })
      if (challengeError) throw challengeError

      const { error: verifyError } = await supabase.auth.mfa.verify({
        factorId: totpFactor.id,
        challengeId: challengeData.id,
        code: mfaCode,
      })
      if (verifyError) throw verifyError

      router.push("/dashboard")
      router.refresh()
    } catch (err: any) {
      setError(err.message || "Invalid verification code")
      setLoading(false)
    }
  }

  const handleOAuthLogin = async (provider: "google" | "apple") => {
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
      setError(err.message || `Failed to sign in with ${provider}`)
      setLoading(false)
    }
  }

  return (
    <div className="animate-scale-in">
      <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 max-w-md w-full mx-auto">
        <div className="mb-8 font-sans">
          <div className="mb-4">
            <Image
              src="/images/design-mode/queik2.0(1).jpg"
              alt="Queik Logo"
              width={48}
              height={48}
              className="object-contain"
            />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 font-sans">{showMfa ? "Security Check" : "Welcome Back"}</h1>
          <p className="text-slate-600 mt-2 font-sans">
            {showMfa ? "Enter the verification code from your authenticator app" : "Sign in to your Queik account"}
          </p>
        </div>

        {!showMfa ? (
          <div className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="font-sans">
                <label className="block text-sm font-medium text-slate-900 mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-smooth"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="font-sans">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-slate-900">Password</label>
                  <Link href="/auth/forgot-password" className="text-sm text-emerald-600 font-medium hover:underline">
                    Forgot password?
                  </Link>
                </div>
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

              {error && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-slate-900 to-emerald-600 text-white font-semibold hover:shadow-lg transition-smooth disabled:opacity-50 font-sans"
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-slate-600 font-sans">or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleOAuthLogin("google")}
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
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Google
              </button>
              <button
                onClick={() => handleOAuthLogin("apple")}
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
        ) : (
          <form onSubmit={handleMfaSubmit} className="space-y-6">
            <div className="font-sans">
              <label className="block text-sm font-medium text-slate-900 mb-2 text-center">Verification Code</label>
              <div className="relative">
                <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="text"
                  maxLength={6}
                  required
                  value={mfaCode}
                  onChange={(e) => setMfaCode(e.target.value.replace(/\D/g, ""))}
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-center text-xl tracking-[0.2em] font-mono transition-smooth"
                  placeholder="000000"
                  autoFocus
                />
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>
            )}

            <div className="space-y-3">
              <button
                type="submit"
                disabled={loading || mfaCode.length !== 6}
                className="w-full py-3 rounded-lg bg-emerald-600 text-white font-semibold hover:shadow-lg transition-smooth disabled:opacity-50 font-sans"
              >
                {loading ? "Verifying..." : "Verify Code"}
              </button>
              <button
                type="button"
                onClick={() => setShowMfa(false)}
                className="w-full py-2 text-sm text-slate-500 hover:text-slate-900 transition-smooth font-sans"
              >
                Back to login
              </button>
            </div>
          </form>
        )}

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-slate-600 font-sans">or</span>
          </div>
        </div>

        <p className="text-center text-slate-600 text-sm font-sans">
          Don't have an account?{" "}
          <Link href="/auth/signup" className="text-emerald-600 font-semibold hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
