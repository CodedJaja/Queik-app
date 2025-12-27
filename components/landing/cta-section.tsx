import Link from "next/link"
import { ArrowRight } from 'lucide-react'

export default function CTASection() {
  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center font-sans">
        <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
          Ready to Transform Your Finances?
        </h2>
        <p className="text-lg text-slate-600 mb-8 max-w-xl mx-auto">
          Join thousands of investors who trust FinFlow to manage their wealth and achieve their financial goals.
        </p>
        <Link
          href="/auth/signup"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-slate-900 to-emerald-600 text-white font-semibold hover:shadow-lg transition-smooth group hover-lift"
        >
          Start Your Journey
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-smooth" />
        </Link>
      </div>
    </section>
  )
}
