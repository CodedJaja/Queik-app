"use client"

import { useEffect } from "react"
import { AlertCircle, RotateCcw } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md text-center">
        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
          <AlertCircle size={32} className="text-red-600" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Application Error</h1>
        <p className="text-slate-600 mb-6">
          An unexpected error occurred. Our team has been notified.
        </p>
        <button
          onClick={() => reset()}
          className="px-6 py-3 rounded-lg bg-gradient-to-r from-slate-900 to-emerald-600 text-white font-semibold hover:shadow-lg transition-smooth flex items-center justify-center gap-2 mx-auto"
        >
          <RotateCcw size={20} />
          Try Again
        </button>
      </div>
    </div>
  )
}
