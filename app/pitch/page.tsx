"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ChevronLeft,
  ChevronRight,
  X,
  TrendingUp,
  Globe,
  Users,
  DollarSign,
  Target,
  BarChart3,
  Zap,
} from "lucide-react"

export default function PitchDeckPage() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      title: "Queik",
      subtitle: "Global USD Banking for Emerging Markets",
      content: (
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          <Image src="/queik-logo-2.png" alt="Queik" width={120} height={120} className="animate-float" />
          <h1 className="text-6xl font-bold text-slate-900 animate-slide-up">Queik</h1>
          <p className="text-2xl text-slate-600 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            Global USD Banking for Nigeria, India & Remote Workers Worldwide
          </p>
          <div className="flex gap-4 mt-8 animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <div className="px-6 py-3 bg-emerald-100 rounded-lg">
              <p className="text-sm text-emerald-800 font-medium">Series A</p>
            </div>
            <div className="px-6 py-3 bg-slate-100 rounded-lg">
              <p className="text-sm text-slate-800 font-medium">Q1 2025</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "The Problem",
      subtitle: "Financial exclusion limits global opportunity",
      content: (
        <div className="grid md:grid-cols-2 gap-8 h-full">
          <div className="space-y-6">
            <div className="p-6 bg-red-50 rounded-xl border border-red-200 animate-slide-left">
              <h3 className="text-xl font-bold text-red-900 mb-3">Limited USD Access</h3>
              <p className="text-red-700">
                350M+ people in Nigeria and India cannot easily access, hold, or transact in USD despite working
                globally
              </p>
            </div>
            <div
              className="p-6 bg-orange-50 rounded-xl border border-orange-200 animate-slide-left"
              style={{ animationDelay: "0.2s" }}
            >
              <h3 className="text-xl font-bold text-orange-900 mb-3">High Fees & Delays</h3>
              <p className="text-orange-700">
                Traditional banks charge 5-15% fees with 3-5 day delays for international transfers
              </p>
            </div>
            <div
              className="p-6 bg-yellow-50 rounded-xl border border-yellow-200 animate-slide-left"
              style={{ animationDelay: "0.4s" }}
            >
              <h3 className="text-xl font-bold text-yellow-900 mb-3">Currency Volatility</h3>
              <p className="text-yellow-700">
                Local currencies depreciate 20-40% annually, destroying savings and purchasing power
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center space-y-6 animate-slide-right">
            <div className="text-center p-8 bg-slate-100 rounded-2xl">
              <p className="text-5xl font-bold text-slate-900">$2.3T</p>
              <p className="text-slate-600 mt-2">Annual remittance market</p>
            </div>
            <div className="text-center p-8 bg-slate-100 rounded-2xl">
              <p className="text-5xl font-bold text-slate-900">850M+</p>
              <p className="text-slate-600 mt-2">Underserved users globally</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Our Solution",
      subtitle: "Instant USD accounts for everyone, everywhere",
      content: (
        <div className="h-full flex flex-col justify-center space-y-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-200 animate-scale-in">
              <DollarSign className="w-12 h-12 text-emerald-600 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">USD Wallet</h3>
              <p className="text-slate-600">Virtual US bank account with routing number, SWIFT code, and IBAN</p>
            </div>
            <div
              className="p-6 bg-blue-50 rounded-xl border border-blue-200 animate-scale-in"
              style={{ animationDelay: "0.1s" }}
            >
              <Globe className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Global Transfers</h3>
              <p className="text-slate-600">Send money to 50+ countries with 0.5-2% fees in under 30 seconds</p>
            </div>
            <div
              className="p-6 bg-purple-50 rounded-xl border border-purple-200 animate-scale-in"
              style={{ animationDelay: "0.2s" }}
            >
              <TrendingUp className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">FX Trading</h3>
              <p className="text-slate-600">Convert between USD, NGN, INR, GHS with live market rates</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div
              className="p-6 bg-slate-50 rounded-xl border border-slate-200 animate-slide-up"
              style={{ animationDelay: "0.3s" }}
            >
              <Target className="w-10 h-10 text-slate-700 mb-3" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">Multi-Method Deposits</h3>
              <p className="text-slate-600">Add money via Stripe, Flutterwave, Paystack, Payoneer, Wise</p>
            </div>
            <div
              className="p-6 bg-slate-50 rounded-xl border border-slate-200 animate-slide-up"
              style={{ animationDelay: "0.4s" }}
            >
              <Zap className="w-10 h-10 text-slate-700 mb-3" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">Instant Payouts</h3>
              <p className="text-slate-600">Withdraw to local bank accounts with real-time settlement</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Market Opportunity",
      subtitle: "Massive TAM in high-growth markets",
      content: (
        <div className="h-full flex flex-col justify-center">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="p-6 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-2xl animate-scale-in">
                <p className="text-sm opacity-90 mb-2">Total Addressable Market</p>
                <p className="text-5xl font-bold">$47B</p>
                <p className="text-sm opacity-90 mt-2">Global neobanking market by 2028</p>
              </div>
              <div
                className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl animate-scale-in"
                style={{ animationDelay: "0.2s" }}
              >
                <p className="text-sm opacity-90 mb-2">Serviceable Available Market</p>
                <p className="text-5xl font-bold">$12B</p>
                <p className="text-sm opacity-90 mt-2">Nigeria & India fintech revenue</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between animate-slide-left">
                <div>
                  <p className="font-bold text-slate-900">Nigeria</p>
                  <p className="text-sm text-slate-600">220M population, 45% unbanked</p>
                </div>
                <p className="text-2xl font-bold text-emerald-600">$8B</p>
              </div>
              <div
                className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between animate-slide-left"
                style={{ animationDelay: "0.1s" }}
              >
                <div>
                  <p className="font-bold text-slate-900">India</p>
                  <p className="text-sm text-slate-600">1.4B population, 190M unbanked</p>
                </div>
                <p className="text-2xl font-bold text-emerald-600">$28B</p>
              </div>
              <div
                className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between animate-slide-left"
                style={{ animationDelay: "0.2s" }}
              >
                <div>
                  <p className="font-bold text-slate-900">Remote Workers</p>
                  <p className="text-sm text-slate-600">50M+ freelancers worldwide</p>
                </div>
                <p className="text-2xl font-bold text-emerald-600">$11B</p>
              </div>
              <div
                className="mt-6 p-4 bg-emerald-50 rounded-xl border border-emerald-200 animate-slide-up"
                style={{ animationDelay: "0.3s" }}
              >
                <p className="text-sm text-emerald-800 mb-2">Market Growth Rate (CAGR)</p>
                <p className="text-3xl font-bold text-emerald-600">23.4%</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Business Model",
      subtitle: "Multiple revenue streams with strong unit economics",
      content: (
        <div className="h-full flex flex-col justify-center">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 bg-emerald-50 rounded-xl border-2 border-emerald-300 animate-scale-in">
              <BarChart3 className="w-10 h-10 text-emerald-600 mb-3" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">Transaction Fees</h3>
              <p className="text-3xl font-bold text-emerald-600 mb-2">0.5-2%</p>
              <p className="text-sm text-slate-600">On transfers, deposits, withdrawals</p>
            </div>
            <div
              className="p-6 bg-blue-50 rounded-xl border-2 border-blue-300 animate-scale-in"
              style={{ animationDelay: "0.1s" }}
            >
              <DollarSign className="w-10 h-10 text-blue-600 mb-3" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">FX Spread</h3>
              <p className="text-3xl font-bold text-blue-600 mb-2">0.3-1%</p>
              <p className="text-sm text-slate-600">On currency conversions</p>
            </div>
            <div
              className="p-6 bg-purple-50 rounded-xl border-2 border-purple-300 animate-scale-in"
              style={{ animationDelay: "0.2s" }}
            >
              <Users className="w-10 h-10 text-purple-600 mb-3" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">Premium Plans</h3>
              <p className="text-3xl font-bold text-purple-600 mb-2">$5-15/mo</p>
              <p className="text-sm text-slate-600">Advanced features & limits</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-slate-100 rounded-xl animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <p className="text-sm text-slate-600 mb-1">Customer Acquisition Cost (CAC)</p>
              <p className="text-4xl font-bold text-slate-900">$12</p>
            </div>
            <div className="p-6 bg-slate-100 rounded-xl animate-slide-up" style={{ animationDelay: "0.4s" }}>
              <p className="text-sm text-slate-600 mb-1">Lifetime Value (LTV)</p>
              <p className="text-4xl font-bold text-slate-900">$240</p>
            </div>
            <div className="p-6 bg-emerald-100 rounded-xl animate-slide-up" style={{ animationDelay: "0.5s" }}>
              <p className="text-sm text-emerald-800 mb-1">LTV:CAC Ratio</p>
              <p className="text-4xl font-bold text-emerald-600">20:1</p>
            </div>
            <div className="p-6 bg-emerald-100 rounded-xl animate-slide-up" style={{ animationDelay: "0.6s" }}>
              <p className="text-sm text-emerald-800 mb-1">Payback Period</p>
              <p className="text-4xl font-bold text-emerald-600">2.5 mo</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Competitive Landscape",
      subtitle: "Clear differentiation in emerging markets",
      content: (
        <div className="h-full flex flex-col justify-center">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-300">
                  <th className="text-left p-4 font-bold text-slate-900">Feature</th>
                  <th className="text-center p-4 font-bold text-emerald-600">Queik</th>
                  <th className="text-center p-4 font-bold text-slate-600">Wise</th>
                  <th className="text-center p-4 font-bold text-slate-600">Payoneer</th>
                  <th className="text-center p-4 font-bold text-slate-600">Local Banks</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-200 animate-slide-up">
                  <td className="p-4 font-medium text-slate-900">USD Virtual Account</td>
                  <td className="text-center p-4 text-2xl">✅</td>
                  <td className="text-center p-4 text-2xl">✅</td>
                  <td className="text-center p-4 text-2xl">✅</td>
                  <td className="text-center p-4 text-2xl">❌</td>
                </tr>
                <tr className="border-b border-slate-200 animate-slide-up" style={{ animationDelay: "0.1s" }}>
                  <td className="p-4 font-medium text-slate-900">Nigeria/India KYC</td>
                  <td className="text-center p-4 text-2xl">✅</td>
                  <td className="text-center p-4 text-2xl">⚠️</td>
                  <td className="text-center p-4 text-2xl">⚠️</td>
                  <td className="text-center p-4 text-2xl">✅</td>
                </tr>
                <tr className="border-b border-slate-200 animate-slide-up" style={{ animationDelay: "0.2s" }}>
                  <td className="p-4 font-medium text-slate-900">Local Payouts (NGN/INR)</td>
                  <td className="text-center p-4 text-2xl">✅</td>
                  <td className="text-center p-4 text-2xl">❌</td>
                  <td className="text-center p-4 text-2xl">⚠️</td>
                  <td className="text-center p-4 text-2xl">✅</td>
                </tr>
                <tr className="border-b border-slate-200 animate-slide-up" style={{ animationDelay: "0.3s" }}>
                  <td className="p-4 font-medium text-slate-900">FX Trading</td>
                  <td className="text-center p-4 text-2xl">✅</td>
                  <td className="text-center p-4 text-2xl">❌</td>
                  <td className="text-center p-4 text-2xl">❌</td>
                  <td className="text-center p-4 text-2xl">⚠️</td>
                </tr>
                <tr className="border-b border-slate-200 animate-slide-up" style={{ animationDelay: "0.4s" }}>
                  <td className="p-4 font-medium text-slate-900">Multi-Provider Deposits</td>
                  <td className="text-center p-4 text-2xl">✅</td>
                  <td className="text-center p-4 text-2xl">⚠️</td>
                  <td className="text-center p-4 text-2xl">❌</td>
                  <td className="text-center p-4 text-2xl">❌</td>
                </tr>
                <tr className="animate-slide-up" style={{ animationDelay: "0.5s" }}>
                  <td className="p-4 font-medium text-slate-900">Fees</td>
                  <td className="text-center p-4 font-bold text-emerald-600">0.5-2%</td>
                  <td className="text-center p-4 text-slate-600">1-3%</td>
                  <td className="text-center p-4 text-slate-600">2-3%</td>
                  <td className="text-center p-4 text-slate-600">5-15%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ),
    },
    {
      title: "Financial Projections",
      subtitle: "Path to profitability in 18 months",
      content: (
        <div className="h-full flex flex-col justify-center">
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-center animate-scale-in">
              <p className="text-sm text-slate-600 mb-1">Year 1</p>
              <p className="text-3xl font-bold text-slate-900">50K</p>
              <p className="text-xs text-slate-500">Users</p>
            </div>
            <div
              className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-center animate-scale-in"
              style={{ animationDelay: "0.1s" }}
            >
              <p className="text-sm text-slate-600 mb-1">Year 2</p>
              <p className="text-3xl font-bold text-slate-900">250K</p>
              <p className="text-xs text-slate-500">Users</p>
            </div>
            <div
              className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-center animate-scale-in"
              style={{ animationDelay: "0.2s" }}
            >
              <p className="text-sm text-slate-600 mb-1">Year 3</p>
              <p className="text-3xl font-bold text-slate-900">1.2M</p>
              <p className="text-xs text-slate-500">Users</p>
            </div>
            <div
              className="p-4 bg-emerald-50 rounded-lg border border-emerald-200 text-center animate-scale-in"
              style={{ animationDelay: "0.3s" }}
            >
              <p className="text-sm text-emerald-800 mb-1">Year 5</p>
              <p className="text-3xl font-bold text-emerald-600">5M+</p>
              <p className="text-xs text-emerald-700">Users</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900 mb-4 animate-slide-left">Revenue Projections</h3>
              <div
                className="flex items-center justify-between p-4 bg-blue-50 rounded-lg animate-slide-left"
                style={{ animationDelay: "0.1s" }}
              >
                <span className="text-slate-700">Year 1</span>
                <span className="text-xl font-bold text-blue-600">$2.4M</span>
              </div>
              <div
                className="flex items-center justify-between p-4 bg-blue-50 rounded-lg animate-slide-left"
                style={{ animationDelay: "0.2s" }}
              >
                <span className="text-slate-700">Year 2</span>
                <span className="text-xl font-bold text-blue-600">$12M</span>
              </div>
              <div
                className="flex items-center justify-between p-4 bg-blue-50 rounded-lg animate-slide-left"
                style={{ animationDelay: "0.3s" }}
              >
                <span className="text-slate-700">Year 3</span>
                <span className="text-xl font-bold text-blue-600">$54M</span>
              </div>
              <div
                className="flex items-center justify-between p-4 bg-emerald-100 rounded-lg animate-slide-left"
                style={{ animationDelay: "0.4s" }}
              >
                <span className="text-emerald-800 font-medium">Year 5</span>
                <span className="text-2xl font-bold text-emerald-600">$250M</span>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900 mb-4 animate-slide-right">Key Metrics</h3>
              <div className="p-4 bg-purple-50 rounded-lg animate-slide-right" style={{ animationDelay: "0.1s" }}>
                <p className="text-sm text-purple-800 mb-1">Gross Margin</p>
                <p className="text-2xl font-bold text-purple-600">68%</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg animate-slide-right" style={{ animationDelay: "0.2s" }}>
                <p className="text-sm text-purple-800 mb-1">Break-even</p>
                <p className="text-2xl font-bold text-purple-600">Month 18</p>
              </div>
              <div className="p-4 bg-emerald-100 rounded-lg animate-slide-right" style={{ animationDelay: "0.3s" }}>
                <p className="text-sm text-emerald-800 mb-1">EBITDA Margin (Y3)</p>
                <p className="text-2xl font-bold text-emerald-600">35%</p>
              </div>
              <div className="p-4 bg-emerald-100 rounded-lg animate-slide-right" style={{ animationDelay: "0.4s" }}>
                <p className="text-sm text-emerald-800 mb-1">Annual Growth Rate</p>
                <p className="text-2xl font-bold text-emerald-600">280%</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "The Ask",
      subtitle: "Series A funding to accelerate growth",
      content: (
        <div className="h-full flex flex-col justify-center space-y-8">
          <div className="text-center animate-scale-in">
            <p className="text-slate-600 text-xl mb-4">We are raising</p>
            <p className="text-7xl font-bold text-emerald-600 mb-4">$15M</p>
            <p className="text-slate-600 text-xl">Series A at $75M pre-money valuation</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-slate-900 mb-4 animate-slide-left">Use of Funds</h3>
              <div className="space-y-3">
                <div
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-lg animate-slide-left"
                  style={{ animationDelay: "0.1s" }}
                >
                  <span className="text-slate-700">Product & Engineering</span>
                  <span className="font-bold text-slate-900">$6M (40%)</span>
                </div>
                <div
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-lg animate-slide-left"
                  style={{ animationDelay: "0.2s" }}
                >
                  <span className="text-slate-700">Marketing & Growth</span>
                  <span className="font-bold text-slate-900">$4.5M (30%)</span>
                </div>
                <div
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-lg animate-slide-left"
                  style={{ animationDelay: "0.3s" }}
                >
                  <span className="text-slate-700">Compliance & Licensing</span>
                  <span className="font-bold text-slate-900">$2.25M (15%)</span>
                </div>
                <div
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-lg animate-slide-left"
                  style={{ animationDelay: "0.4s" }}
                >
                  <span className="text-slate-700">Operations & Support</span>
                  <span className="font-bold text-slate-900">$2.25M (15%)</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-slate-900 mb-4 animate-slide-right">18-Month Milestones</h3>
              <div className="space-y-3">
                <div
                  className="p-4 bg-emerald-50 rounded-lg border border-emerald-200 animate-slide-right"
                  style={{ animationDelay: "0.1s" }}
                >
                  <p className="font-bold text-emerald-900">500K Users</p>
                  <p className="text-sm text-emerald-700">Across Nigeria, India, and global markets</p>
                </div>
                <div
                  className="p-4 bg-emerald-50 rounded-lg border border-emerald-200 animate-slide-right"
                  style={{ animationDelay: "0.2s" }}
                >
                  <p className="font-bold text-emerald-900">$25M ARR</p>
                  <p className="text-sm text-emerald-700">Achieve cash flow positive status</p>
                </div>
                <div
                  className="p-4 bg-emerald-50 rounded-lg border border-emerald-200 animate-slide-right"
                  style={{ animationDelay: "0.3s" }}
                >
                  <p className="font-bold text-emerald-900">5 Countries</p>
                  <p className="text-sm text-emerald-700">Expand to Ghana, Kenya, Philippines</p>
                </div>
                <div
                  className="p-4 bg-emerald-50 rounded-lg border border-emerald-200 animate-slide-right"
                  style={{ animationDelay: "0.4s" }}
                >
                  <p className="font-bold text-emerald-900">Full Banking License</p>
                  <p className="text-sm text-emerald-700">Secure regulatory approval in key markets</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Thank You",
      subtitle: "Let's build the future of global banking together",
      content: (
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          <Image src="/queik-logo-2.png" alt="Queik" width={100} height={100} className="animate-float" />
          <h2 className="text-5xl font-bold text-slate-900 animate-scale-in">Let's Connect</h2>
          <div className="space-y-4 text-center animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <p className="text-xl text-slate-600">contact@queik.com</p>
            <p className="text-xl text-slate-600">www.queik.com</p>
          </div>
          <div className="flex gap-4 mt-8 animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <Link
              href="/dashboard"
              className="px-8 py-4 bg-gradient-to-r from-slate-900 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-lg transition-smooth"
            >
              View Live Platform
            </Link>
          </div>
        </div>
      ),
    },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 font-sans">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-white border-b border-slate-200 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/queik-logo-2.png" alt="Queik" width={32} height={32} />
            <span className="font-bold text-slate-900">Queik Pitch Deck</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-600">
              {currentSlide + 1} / {slides.length}
            </span>
            <Link href="/" className="p-2 hover:bg-slate-100 rounded-lg transition-smooth">
              <X size={20} />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Slide Content */}
      <div className="pt-20 px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-12 min-h-[600px]">
            {/* Slide Header */}
            <div className="mb-8">
              <h2 className="text-4xl font-bold text-slate-900 mb-2">{slides[currentSlide].title}</h2>
              <p className="text-xl text-slate-600">{slides[currentSlide].subtitle}</p>
            </div>

            {/* Slide Content */}
            <div className="min-h-[400px]">{slides[currentSlide].content}</div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-smooth"
          >
            <ChevronLeft size={20} />
            <span className="hidden sm:inline">Previous</span>
          </button>

          {/* Slide Indicators */}
          <div className="flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-smooth ${
                  index === currentSlide ? "bg-emerald-600 w-8" : "bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-smooth"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}
