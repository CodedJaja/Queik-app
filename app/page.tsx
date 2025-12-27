"use client"

import { useState, useEffect } from "react"
import { ArrowRight, TrendingUp, Shield, Zap, BarChart3, Lock, Smartphone } from 'lucide-react'
import Link from "next/link"
import Navigation from "@/components/landing/navigation"
import HeroSection from "@/components/landing/hero-section"
import FeaturesSection from "@/components/landing/features-section"
import StatsSection from "@/components/landing/stats-section"
import CTASection from "@/components/landing/cta-section"
import Footer from "@/components/landing/footer"

export default function Home() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <main className="min-h-screen bg-white">
      <Navigation scrolled={scrolled} />
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <CTASection />
      <Footer />
    </main>
  )
}
