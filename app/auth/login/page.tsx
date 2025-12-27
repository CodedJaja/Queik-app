"use client"

import { useState } from "react"
import { useRouter } from 'next/navigation'
import Link from "next/link"
import Image from "next/image"
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (email && password.length >= 6) {
      setTimeout(() => {
        const userData = { email, id: Math.random() }
        localStorage.setItem("user", JSON.stringify(userData))
        document.cookie = `user=${JSON.stringify(userData)}; path=/`
        router.push("/dashboard")
      }, 500)
    } else {
      setError("Please enter valid credentials")
      setLoading(false)
    }
  }

  return (
    <div className="animate-scale-in">
      <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
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
          <h1 className="text-3xl font-bold text-slate-900 font-sans">Welcome Back</h1>
          <p className="text-slate-600 mt-2 font-sans">Sign in to your Queik account</p>
        </div>

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
            <label className="block text-sm font-medium text-slate-900 mb-2">Password</label>
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
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
              {error}
            </div>
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

      <div className="mt-6 p-4 rounded-lg bg-white/10 border border-white/20 text-white text-sm font-sans">
        <p className="font-medium mb-2">Demo Credentials:</p>
        <p>Email: demo@queik.com</p>
        <p>Password: (any password)</p>
      </div>
    </div>
  )
}
