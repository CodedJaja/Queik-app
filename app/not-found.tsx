"use client"

import Link from "next/link"
import { ArrowLeft, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="text-center text-white">
        <h1 className="text-9xl font-bold mb-4 opacity-50">404</h1>
        <h2 className="text-3xl font-bold mb-2">Page Not Found</h2>
        <p className="text-white/80 mb-8 max-w-md">
          We couldn't find the page you're looking for. It might have been moved or deleted.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 rounded-lg bg-white text-slate-900 font-semibold hover:bg-white/90 transition-smooth flex items-center justify-center gap-2"
          >
            <Home size={20} />
            Go Home
          </Link>
          <Link
            href="/dashboard"
            className="px-6 py-3 rounded-lg border-2 border-white text-white font-semibold hover:bg-white/10 transition-smooth flex items-center justify-center gap-2"
          >
            <ArrowLeft size={20} />
            Back
          </Link>
        </div>
      </div>
    </div>
  )
}
