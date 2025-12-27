"use client"

import { useState, useEffect } from "react"
import type { PriceData } from "@/lib/market-data"

export function useMarketData(symbols: string[], type: "crypto" | "stocks" | "forex" = "crypto") {
  const [data, setData] = useState<PriceData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const endpoint = `/api/markets/${type}?symbols=${symbols.join(",")}`
        const response = await fetch(endpoint)
        const result = await response.json()

        if (result.success) {
          setData(result.data)
        } else {
          setError(result.error)
        }
      } catch (err) {
        setError("Failed to fetch market data")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (symbols.length > 0) {
      fetchData()
      const interval = setInterval(fetchData, 30000) // Refresh every 30 seconds

      return () => clearInterval(interval)
    }
  }, [symbols, type])

  return { data, loading, error }
}
