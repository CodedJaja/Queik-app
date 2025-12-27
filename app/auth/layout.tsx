"use client"

import type React from "react"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-600/10 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          
        </div>

        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-smooth">
            <ArrowLeft size={20} />
            <span className="text-sm">Back to home</span>
          </Link>
        </div>
        {children}
      </div>
    </div>
  )
}
