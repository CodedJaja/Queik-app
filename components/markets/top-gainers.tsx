"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp } from 'lucide-react'

export default function TopGainers({ gainers }: { gainers: any[] }) {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-600" />
          Top Gainers
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {gainers.map((gainer) => (
          <div key={gainer.id} className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors cursor-pointer">
            <div>
              <p className="font-semibold text-slate-900">{gainer.symbol}</p>
              <p className="text-xs text-slate-600">${gainer.price.toFixed(2)}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-emerald-600">+{gainer.change}%</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
