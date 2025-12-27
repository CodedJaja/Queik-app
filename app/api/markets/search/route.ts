import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q")?.toLowerCase() || ""

    // Mock search results
    const allAssets = [
      { symbol: "BTC", name: "Bitcoin", type: "crypto" },
      { symbol: "ETH", name: "Ethereum", type: "crypto" },
      { symbol: "SOL", name: "Solana", type: "crypto" },
      { symbol: "AAPL", name: "Apple Inc", type: "stock" },
      { symbol: "GOOGL", name: "Alphabet Inc", type: "stock" },
      { symbol: "MSFT", name: "Microsoft", type: "stock" },
      { symbol: "EURUSD", name: "Euro/US Dollar", type: "forex" },
      { symbol: "GBPUSD", name: "British Pound/US Dollar", type: "forex" },
    ]

    const results = allAssets.filter(
      (asset) => asset.symbol.toLowerCase().includes(query) || asset.name.toLowerCase().includes(query),
    )

    return NextResponse.json({
      success: true,
      results: results.slice(0, 10),
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Search failed" }, { status: 500 })
  }
}
