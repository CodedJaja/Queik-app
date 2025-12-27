"use client"

import { useRef } from "react"
import { useInView } from "@/hooks/use-in-view"
import { CountUp } from "@/components/ui/count-up"

export default function StatsSection() {
  const ref = useRef(null)
  const inView = useInView(ref)

  return (
    <section id="stats" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-4 gap-8 p-8 md:p-12 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white font-sans"
        >
          <div className="text-center">
            <h3 className="text-5xl font-bold mb-2">
              {inView && <CountUp end={500} suffix="K" />}
            </h3>
            <p className="text-white/75">Active Users</p>
          </div>
          <div className="text-center">
            <h3 className="text-5xl font-bold mb-2">
              {inView && <CountUp end={50} suffix="B" />}
            </h3>
            <p className="text-white/75">Assets Managed</p>
          </div>
          <div className="text-center">
            <h3 className="text-5xl font-bold mb-2">
              {inView && <CountUp end={150} suffix="M" />}
            </h3>
            <p className="text-white/75">Daily Transactions</p>
          </div>
          <div className="text-center">
            <h3 className="text-5xl font-bold mb-2">
              {inView && <CountUp end={99} suffix="%" />}
            </h3>
            <p className="text-white/75">Uptime</p>
          </div>
        </div>
      </div>
    </section>
  )
}
