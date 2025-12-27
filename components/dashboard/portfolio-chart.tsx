"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface PortfolioChartProps {
  timeframe: string
  setTimeframe: (timeframe: string) => void
}

export default function PortfolioChart({ timeframe, setTimeframe }: PortfolioChartProps) {
  const data = [
    { name: "Jan", value: 945000 },
    { name: "Feb", value: 1020000 },
    { name: "Mar", value: 980000 },
    { name: "Apr", value: 1095000 },
    { name: "May", value: 1180000 },
    { name: "Jun", value: 1284392 },
  ]

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 font-sans">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-slate-900">Portfolio Performance</h2>
        <div className="flex gap-2">
          {["1W", "1M", "3M", "1Y", "ALL"].map((period) => (
            <button
              key={period}
              onClick={() => setTimeframe(period)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-smooth ${
                timeframe === period
                  ? "bg-emerald-500 text-white"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="name" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: `1px solid #e2e8f0`,
              borderRadius: "8px",
            }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#10b981"
            strokeWidth={3}
            dot={false}
            isAnimationActive={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
