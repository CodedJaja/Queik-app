"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function HeroSection() {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    setAnimate(true)
  }, [])

  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className={`${animate ? "animate-slide-up" : "opacity-0"}`}>
            <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 mb-6 leading-tight text-balance font-sans">
              Your Financial Future, <span className="gradient-text">Simplified</span>
            </h1>

            <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-lg text-pretty font-sans">
              Experience a modern approach to wealth management. Real-time insights, intelligent automation, and
              complete control—all in one platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                href="/auth/signup"
                className="px-8 py-4 rounded-lg bg-gradient-to-r from-slate-900 to-emerald-600 text-white font-semibold hover:shadow-lg transition-smooth flex items-center justify-center gap-2 group hover-lift"
              >
                Get Started
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-smooth" />
              </Link>
              <Link
                href="#features"
                className="px-8 py-4 rounded-lg border-2 border-slate-200 text-slate-900 font-semibold hover:border-emerald-500 transition-smooth hover-lift font-sans"
              >
                Learn More
              </Link>
            </div>

            <div className="flex flex-wrap gap-8 text-sm font-sans">
              <div className="hover-lift">
                <p className="font-bold text-slate-900">500K+</p>
                <p className="text-slate-600">Active Users</p>
              </div>
              <div className="hover-lift">
                <p className="font-bold text-slate-900">$50B+</p>
                <p className="text-slate-600">Assets Managed</p>
              </div>
              <div className="hover-lift">
                <p className="font-bold text-slate-900">24/7</p>
                <p className="text-slate-600">Support</p>
              </div>
            </div>
          </div>

          <div className={`${animate ? "animate-scale-in delay-200" : "opacity-0"}`}>
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-slate-900 rounded-3xl blur-xl opacity-25 group-hover:opacity-40 transition-smooth"></div>
              <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 text-white shadow-2xl hover-lift">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium opacity-75">Total Assets</span>
                    <span className="text-xs bg-emerald-500 px-2 py-1 rounded animate-pulse">+12.5%</span>
                  </div>
                  <h3 className="text-4xl font-bold font-sans">$1,284,392</h3>
                  <div className="h-32 bg-white/10 rounded-lg flex items-end justify-around gap-2 p-4">
                    {[40, 60, 45, 75, 55, 80, 50].map((height, i) => (
                      <div
                        key={i}
                        className="w-2 bg-gradient-to-t from-emerald-400 to-emerald-500 rounded-t opacity-75 hover:opacity-100 transition-smooth animate-slide-up"
                        style={{
                          height: `${height}%`,
                        }}
                      ></div>
                    ))}
                  </div>
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                    <div className="hover-lift">
                      <p className="text-xs opacity-75">Stocks</p>
                      <p className="font-semibold">$542K</p>
                    </div>
                    <div className="hover-lift">
                      <p className="text-xs opacity-75">Crypto</p>
                      <p className="font-semibold">$380K</p>
                    </div>
                    <div className="hover-lift">
                      <p className="text-xs opacity-75">Bonds</p>
                      <p className="font-semibold">$362K</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
