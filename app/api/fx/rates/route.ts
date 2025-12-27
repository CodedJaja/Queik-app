import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const from = searchParams.get("from") || "USD"
  const to = searchParams.get("to") || "NGN"

  try {
    // Mock FX rates - in production, integrate with AlphaVantage, TwelveData, or Binance
    const rates: Record<string, Record<string, number>> = {
      USD: {
        NGN: 1500.5,
        INR: 83.4,
        GHS: 13.5,
        KES: 138.4,
        USDT: 1.0,
        USDC: 1.0,
      },
      NGN: {
        USD: 0.000667,
        INR: 0.0556,
        USDT: 0.000667,
      },
      INR: {
        USD: 0.012,
        NGN: 18.0,
        USDT: 0.012,
      },
      USDT: {
        USD: 1.0,
        NGN: 1500.5,
        INR: 83.4,
      },
    }

    const rate = rates[from]?.[to] || 1.0

    return NextResponse.json({
      from,
      to,
      rate,
      timestamp: new Date().toISOString(),
      source: "mock-provider",
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch exchange rates" }, { status: 500 })
  }
}
