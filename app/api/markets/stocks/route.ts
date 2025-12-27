import { marketDataManager } from "@/lib/market-data"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const symbols = searchParams.get("symbols")?.split(",") || ["AAPL", "GOOGL", "MSFT"]

    const data = await marketDataManager.getStocks(symbols)

    return Response.json({
      success: true,
      data,
      timestamp: Date.now(),
    })
  } catch (error) {
    return Response.json({ success: false, error: "Failed to fetch stock data" }, { status: 500 })
  }
}
