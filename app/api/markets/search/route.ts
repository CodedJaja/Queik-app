export async function GET(request: Request) {
  try {
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

    return Response.json({
      success: true,
      results: results.slice(0, 10),
    })
  } catch (error) {
    return Response.json({ success: false, error: "Search failed" }, { status: 500 })
  }
}
