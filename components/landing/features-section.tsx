"use client"

import { BarChart3, Lock, Zap, Smartphone, TrendingUp, Shield } from 'lucide-react'
import { useInView } from "@/hooks/use-in-view"
import { useRef } from "react"

interface FeatureProps {
  icon: React.ReactNode
  title: string
  description: string
  index: number
}

function FeatureCard({ icon, title, description, index }: FeatureProps) {
  const ref = useRef(null)
  const inView = useInView(ref)

  return (
    <div
      ref={ref}
      className={`p-6 rounded-xl border border-slate-200 hover:border-emerald-500 hover:shadow-lg transition-smooth bg-white group hover-lift font-sans`}
      style={{
        animation: inView ? `slideUp 0.5s ease-out ${index * 0.1}s both` : "none",
      }}
    >
      <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-smooth">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-slate-900 mt-4 mb-2 font-sans">{title}</h3>
      <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
    </div>
  )
}

export default function FeaturesSection() {
  const ref = useRef(null)
  const inView = useInView(ref)

  const features = [
    {
      icon: <BarChart3 size={24} />,
      title: "Real-Time Analytics",
      description: "Monitor your portfolio with live market data and intelligent insights powered by AI.",
    },
    {
      icon: <Lock size={24} />,
      title: "Bank-Grade Security",
      description: "Military-grade encryption and multi-factor authentication protect your assets 24/7.",
    },
    {
      icon: <Zap size={24} />,
      title: "Instant Transactions",
      description: "Execute trades and transfers in milliseconds with our optimized infrastructure.",
    },
    {
      icon: <Smartphone size={24} />,
      title: "Mobile First",
      description: "Manage everything on the go with our intuitive and responsive mobile application.",
    },
    {
      icon: <TrendingUp size={24} />,
      title: "Smart Recommendations",
      description: "AI-driven personalized recommendations based on your goals and risk profile.",
    },
    {
      icon: <Shield size={24} />,
      title: "Regulatory Compliant",
      description: "Full compliance with global financial regulations and standards.",
    },
  ]

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className={`text-center mb-16 font-sans ${inView ? "animate-slide-up" : ""}`}>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4 font-sans">
            Powerful Features
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Everything you need to manage your wealth and grow your investments with confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
