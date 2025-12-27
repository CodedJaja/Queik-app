"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from 'lucide-react'

interface NavigationProps {
  scrolled: boolean
}

export default function Navigation({ scrolled }: NavigationProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-smooth ${
        scrolled
          ? "bg-white shadow-lg border-b border-slate-200"
          : "bg-white/80 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/design-mode/queik2.0.jpg"
              alt="Queik Bank"
              width={32}
              height={32}
              className="font-bold w-10 h-10"
            />
            <span className="text-slate-900 hidden sm:inline font-bold">Queik</span>
          </Link>

          <div className="hidden md:flex items-center gap-8 font-sans">
            <Link href="#features" className="text-slate-600 hover:text-slate-900 transition-smooth text-sm font-medium">
              Features
            </Link>
            <Link href="#stats" className="text-slate-600 hover:text-slate-900 transition-smooth text-sm font-medium">
              Why Queik?
            </Link>
            <Link href="#contact" className="text-slate-600 hover:text-slate-900 transition-smooth text-sm font-medium">
              Contact
            </Link>
            <Link
              href="/auth/login"
              className="px-4 py-2 rounded-lg bg-slate-900 text-white font-medium hover:bg-slate-800 transition-smooth"
            >
              Sign In
            </Link>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden pb-4 space-y-3 border-t border-slate-200">
            <Link href="#features" className="block text-slate-600 hover:text-slate-900 py-2 text-sm">
              Features
            </Link>
            <Link href="#stats" className="block text-slate-600 hover:text-slate-900 py-2 text-sm">
              Why Queik
            </Link>
            <Link href="#contact" className="block text-slate-600 hover:text-slate-900 py-2 text-sm">
              Contact
            </Link>
            <Link href="/auth/login" className="block px-4 py-2 rounded-lg bg-slate-900 text-white font-medium text-center">
              Sign In
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
